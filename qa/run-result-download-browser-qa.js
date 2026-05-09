const assert = require('assert');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8'
};

const PROFILES = [
  {
    id: 'windows-chrome',
    title: '🖥️ Guarda tu resultado en Windows',
    width: 1366,
    height: 768,
    mobile: false,
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.91 Safari/537.36',
    platform: 'Win32',
    maxTouchPoints: 0
  },
  {
    id: 'android-chrome',
    title: '📲 Guarda tu resultado en Android',
    width: 412,
    height: 915,
    mobile: true,
    deviceScaleFactor: 2.75,
    userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.91 Mobile Safari/537.36',
    platform: 'Linux armv8l',
    maxTouchPoints: 5
  },
  {
    id: 'iphone-safari',
    title: '📲 Guarda tu resultado en iPhone',
    width: 393,
    height: 852,
    mobile: true,
    deviceScaleFactor: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
    platform: 'iPhone',
    maxTouchPoints: 5
  }
];

function log(message) {
  console.log(`[qa-browser] ${message}`);
}

function findBrowserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.EDGE_PATH,
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function startStaticServer() {
  const server = http.createServer((request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
      const relativePath = safePath === path.sep || safePath === '/' ? 'index.html' : safePath.replace(/^[/\\]/, '');
      const absolutePath = path.resolve(ROOT, relativePath);

      if (!absolutePath.startsWith(ROOT)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      fs.readFile(absolutePath, (error, data) => {
        if (error) {
          response.writeHead(404);
          response.end('Not found');
          return;
        }

        const type = MIME_TYPES[path.extname(absolutePath).toLowerCase()] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': type });
        response.end(data);
      });
    } catch (error) {
      response.writeHead(500);
      response.end(String(error.message || error));
    }
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}` });
    });
  });
}

function readJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForFile(filePath, timeout = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8');
    await delay(80);
  }
  throw new Error(`No se encontró ${filePath}`);
}

async function stopBrowserProcess(browser) {
  if (!browser || browser.killed) return;
  await new Promise((resolve) => {
    browser.once('exit', resolve);
    browser.kill();
    setTimeout(resolve, 1500);
  });
}

async function removeDirectoryBestEffort(directory) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      fs.rmSync(directory, { recursive: true, force: true });
      return;
    } catch (error) {
      await delay(250);
    }
  }
}

class CdpClient {
  constructor(webSocketUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
    this.socket = new WebSocket(webSocketUrl);
    this.ready = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => this.handleMessage(event));
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message || JSON.stringify(message.error)));
        return;
      }
      resolve(message.result || {});
      return;
    }

    if (message.method && this.waiters.has(message.method)) {
      const waiters = this.waiters.get(message.method);
      this.waiters.delete(message.method);
      waiters.forEach((resolve) => resolve(message.params || {}));
    }
  }

  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitFor(method, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timeout esperando ${method}`)), timeout);
      const wrappedResolve = (params) => {
        clearTimeout(timer);
        resolve(params);
      };
      const waiters = this.waiters.get(method) || [];
      waiters.push(wrappedResolve);
      this.waiters.set(method, waiters);
    });
  }

  close() {
    this.socket.close();
  }
}

async function launchBrowser() {
  const executable = findBrowserExecutable();
  assert.ok(executable, 'No se encontró Chrome o Edge para ejecutar QA de navegador.');

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ifr-result-qa-'));
  const browser = spawn(executable, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ], { stdio: 'ignore' });

  const portFile = path.join(userDataDir, 'DevToolsActivePort');
  const portText = await waitForFile(portFile);
  const debugPort = Number(portText.split(/\r?\n/)[0]);
  assert.ok(Number.isFinite(debugPort), 'No se pudo leer el puerto DevTools del navegador.');

  const pages = await readJson(`http://127.0.0.1:${debugPort}/json/list`);
  const page = pages.find((entry) => entry.type === 'page');
  assert.ok(page && page.webSocketDebuggerUrl, 'No se encontró una pestaña DevTools disponible.');

  return {
    browser,
    userDataDir,
    client: new CdpClient(page.webSocketDebuggerUrl)
  };
}

async function evaluate(client, fn, arg) {
  const source = `(${fn})(${JSON.stringify(arg)})`;
  const result = await client.send('Runtime.evaluate', {
    expression: source,
    awaitPromise: true,
    returnByValue: true
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Falló Runtime.evaluate');
  }

  return result.result.value;
}

async function runProfile(client, baseUrl, profile) {
  await client.send('Emulation.setUserAgentOverride', {
    userAgent: profile.userAgent,
    platform: profile.platform
  });
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: profile.width,
    height: profile.height,
    deviceScaleFactor: profile.deviceScaleFactor,
    mobile: profile.mobile,
    screenWidth: profile.width,
    screenHeight: profile.height
  });

  const loaded = client.waitFor('Page.loadEventFired');
  await client.send('Page.navigate', {
    url: `${baseUrl}/?qa=result-download-${profile.id}-${Date.now()}`
  });
  await loaded;

  const result = await evaluate(client, async (currentProfile) => {
    localStorage.clear();
    Object.defineProperty(navigator, 'platform', { value: currentProfile.platform, configurable: true });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: currentProfile.maxTouchPoints, configurable: true });
    Object.defineProperty(navigator, 'canShare', { value: () => true, configurable: true });
    Object.defineProperty(navigator, 'share', {
      value: async () => {
        window.__shareCalls = (window.__shareCalls || 0) + 1;
      },
      configurable: true
    });

    function waitFor(predicate, timeout = 4000) {
      const started = Date.now();
      return new Promise((resolve, reject) => {
        const tick = () => {
          if (predicate()) {
            resolve(true);
            return;
          }
          if (Date.now() - started > timeout) {
            reject(new Error('Timeout de prueba en navegador'));
            return;
          }
          setTimeout(tick, 80);
        };
        tick();
      });
    }

    window.__IFR_EXAM_DEBUG__.startExam();
    window.__IFR_EXAM_DEBUG__.finishExam('finished');
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const resultButton = document.querySelector('[data-action="download-results"]');
    resultButton.click();
    await waitFor(() => document.querySelector('#modalShell:not([hidden]) .result-image-frame img'));

    const modal = document.querySelector('#modalShell:not([hidden])');
    const img = modal.querySelector('.result-image-frame img');
    if (!img.complete || !img.naturalWidth) {
      await new Promise((resolve, reject) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', reject, { once: true });
      });
    }

    const beforeShare = {
      title: modal.querySelector('#resultImageTitle')?.textContent,
      buttons: Array.from(modal.querySelectorAll('button')).map((button) => button.textContent.trim()),
      imageBlob: img.src.startsWith('blob:'),
      imageNaturalWidth: img.naturalWidth,
      horizontalOverflow: document.scrollingElement.scrollWidth > window.innerWidth,
      buttonRestored: Array.from(document.querySelectorAll('[data-action="download-results"]'))
        .every((button) => !button.disabled && /Guardar mis resultados/.test(button.textContent))
    };

    modal.querySelector('[data-action="share-result-image"]').click();
    await waitFor(() => document.querySelector('#modalShell').hidden);
    const modalHiddenAfterShare = document.querySelector('#modalShell').hidden;

    resultButton.click();
    await waitFor(() => document.querySelector('#modalShell:not([hidden]) .result-image-frame img'));
    const secondModal = document.querySelector('#modalShell:not([hidden])');

    const originalOpen = window.open;
    window.__openedResultUrl = '';
    window.open = (url) => {
      window.__openedResultUrl = String(url || '');
      return { closed: false };
    };
    secondModal.querySelector('[data-action="open-result-image"]').click();
    window.open = originalOpen;

    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    window.__downloadAttempt = null;
    HTMLAnchorElement.prototype.click = function patchedClick() {
      window.__downloadAttempt = {
        href: this.href,
        download: this.download
      };
    };
    secondModal.querySelector('[data-action="download-result-image"]').click();
    HTMLAnchorElement.prototype.click = originalAnchorClick;

    return {
      beforeShare,
      shareCalls: window.__shareCalls || 0,
      modalHiddenAfterShare,
      openedBlob: window.__openedResultUrl.startsWith('blob:'),
      downloadAttempt: window.__downloadAttempt
    };
  }, profile);

  assert.strictEqual(result.beforeShare.title, profile.title, `${profile.id}: título de modal incorrecto.`);
  assert.ok(result.beforeShare.buttons.includes('📤 Compartir o guardar'), `${profile.id}: falta compartir.`);
  assert.ok(result.beforeShare.buttons.includes('💾 Descargar imagen'), `${profile.id}: falta descargar imagen.`);
  assert.ok(result.beforeShare.buttons.includes('🖼️ Abrir imagen'), `${profile.id}: falta abrir imagen.`);
  assert.ok(result.beforeShare.imageBlob, `${profile.id}: la vista previa no usa URL blob.`);
  assert.ok(result.beforeShare.imageNaturalWidth > 0, `${profile.id}: la imagen no cargó.`);
  assert.ok(!result.beforeShare.horizontalOverflow, `${profile.id}: hay desbordamiento horizontal.`);
  assert.ok(result.beforeShare.buttonRestored, `${profile.id}: el botón final no volvió a estado normal.`);
  assert.strictEqual(result.shareCalls, 1, `${profile.id}: no se llamó navigator.share.`);
  assert.ok(result.modalHiddenAfterShare, `${profile.id}: la modal no cerró después de compartir.`);
  assert.ok(result.openedBlob, `${profile.id}: Abrir imagen no usó URL blob.`);
  assert.ok(result.downloadAttempt && result.downloadAttempt.href.startsWith('blob:'), `${profile.id}: Descargar imagen no usó blob.`);
  assert.strictEqual(result.downloadAttempt.download, 'resultado-ecoems-ifr-simulacion-2.png', `${profile.id}: nombre de descarga incorrecto.`);

  log(`${profile.id}: vista previa, compartir, abrir imagen y descarga verificados.`);
}

async function main() {
  let server;
  let browser;
  let userDataDir;
  let client;

  try {
    const serverInfo = await startStaticServer();
    server = serverInfo.server;
    const launched = await launchBrowser();
    browser = launched.browser;
    userDataDir = launched.userDataDir;
    client = launched.client;

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    for (const profile of PROFILES) {
      await runProfile(client, serverInfo.url, profile);
    }

    log('QA de navegador completada para Windows, Android e iPhone.');
  } finally {
    if (client) client.close();
    await stopBrowserProcess(browser);
    if (server) server.close();
    if (userDataDir) {
      await removeDirectoryBestEffort(userDataDir);
    }
  }
}

main().catch((error) => {
  console.error(`[qa-browser] ${error.stack || error.message}`);
  process.exit(1);
});
