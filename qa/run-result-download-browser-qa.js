const assert = require('assert');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DOWNLOAD_DIR = 'C:\\Users\\spart\\Downloads';
const PDF_FILENAME = 'reactivos-que-debo-mejorar-ecoems-ifr-simulacion-2.pdf';
const PDF_PREFIX = 'reactivos-que-debo-mejorar-ecoems-ifr-simulacion-2';

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
    width: 1366,
    height: 768,
    mobile: false,
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.91 Safari/537.36',
    platform: 'Win32',
    maxTouchPoints: 0,
    realDownload: true
  },
  {
    id: 'android-chrome',
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
    width: 393,
    height: 852,
    mobile: true,
    deviceScaleFactor: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
    platform: 'iPhone',
    maxTouchPoints: 5
  },
  {
    id: 'iphone-chrome',
    width: 393,
    height: 852,
    mobile: true,
    deviceScaleFactor: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/136.0.7103.91 Mobile/15E148 Safari/604.1',
    platform: 'iPhone',
    maxTouchPoints: 5
  }
];

function log(message) {
  console.log(`[qa-pdf] ${message}`);
}

function findBrowserExecutable() {
  const chromeCandidates = [
    process.env.CHROME_PATH,
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe')
  ].filter(Boolean);
  const chrome = chromeCandidates.find((candidate) => fs.existsSync(candidate));
  if (chrome) return chrome;

  const edgeCandidates = [
    process.env.EDGE_PATH,
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
  ].filter(Boolean);
  return edgeCandidates.find((candidate) => fs.existsSync(candidate));
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

async function waitForFile(filePath, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8');
    await delay(100);
  }
  throw new Error(`No se encontro ${filePath}`);
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

  close() {
    this.socket.close();
  }
}

async function launchBrowser() {
  const executable = findBrowserExecutable();
  assert.ok(executable, 'No se encontro Chrome o Edge para ejecutar QA de navegador.');

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ifr-pdf-qa-'));
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
  assert.ok(page && page.webSocketDebuggerUrl, 'No se encontro una pestana DevTools disponible.');

  return {
    browser,
    executable,
    userDataDir,
    client: new CdpClient(page.webSocketDebuggerUrl)
  };
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

async function evaluate(client, fn, arg) {
  const source = `(${fn})(${JSON.stringify(arg)})`;
  const result = await client.send('Runtime.evaluate', {
    expression: source,
    awaitPromise: true,
    returnByValue: true
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Fallo Runtime.evaluate');
  }

  return result.result.value;
}

async function allowDownloads(client) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  try {
    await client.send('Browser.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_DIR,
      eventsEnabled: true
    });
  } catch (error) {
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_DIR
    });
  }
}

function listMatchingDownloads() {
  if (!fs.existsSync(DOWNLOAD_DIR)) return [];
  return fs.readdirSync(DOWNLOAD_DIR)
    .filter((name) => name.startsWith(PDF_PREFIX) && name.toLowerCase().endsWith('.pdf'))
    .map((name) => {
      const fullPath = path.join(DOWNLOAD_DIR, name);
      const stats = fs.statSync(fullPath);
      return { name, fullPath, mtimeMs: stats.mtimeMs, size: stats.size };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);
}

async function waitForDownloadedPdf(startedAt) {
  const timeout = Date.now() + 30000;
  while (Date.now() < timeout) {
    const partial = fs.readdirSync(DOWNLOAD_DIR)
      .some((name) => name.startsWith(PDF_PREFIX) && name.endsWith('.crdownload'));
    const match = listMatchingDownloads()
      .find((file) => file.mtimeMs >= startedAt - 1000 && file.size > 10000);
    if (match && !partial) return match;
    await delay(250);
  }
  throw new Error('No se encontro un PDF descargado en Downloads.');
}

function inspectPdfFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const head = buffer.subarray(0, 5).toString('ascii');
  const tail = buffer.subarray(Math.max(0, buffer.length - 2048)).toString('latin1');
  const text = buffer.toString('latin1');
  return {
    size: buffer.length,
    head,
    hasEof: /%%EOF/.test(tail),
    pageCount: (text.match(/\/Type\s*\/Page\b/g) || []).length
  };
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

  if (profile.realDownload) await allowDownloads(client);

  const loaded = client.waitFor ? client.waitFor('Page.loadEventFired') : null;
  const loadPromise = new Promise((resolve) => {
    const waiter = (params) => resolve(params);
    const waiters = client.waiters.get('Page.loadEventFired') || [];
    waiters.push(waiter);
    client.waiters.set('Page.loadEventFired', waiters);
    setTimeout(resolve, 8000);
  });
  await client.send('Page.navigate', {
    url: `${baseUrl}/?qa=improvement-pdf-${profile.id}-${Date.now()}`
  });
  await (loaded || loadPromise);

  const downloadStartedAt = Date.now();
  const result = await evaluate(client, async (currentProfile) => {
    localStorage.clear();
    Object.defineProperty(navigator, 'platform', { value: currentProfile.platform, configurable: true });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: currentProfile.maxTouchPoints, configurable: true });

    function waitFor(predicate, timeout = 15000) {
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
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const wrongIndexes = new Set([0, 4, 40, 73, 114]);
    const exercises = window.IFR_APP_DATA.exercises;
    for (let index = 0; index < exercises.length; index += 1) {
      const exercise = exercises[index];
      const selectedOption = wrongIndexes.has(index)
        ? exercise.options.find((option) => option.label !== exercise.correctOption).label
        : exercise.correctOption;
      const button = document.querySelector(`[data-action="answer"][data-id="${exercise.id}"][data-option="${selectedOption}"]`);
      if (!button) throw new Error(`Missing answer button for ${exercise.id}`);
      button.click();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    await waitFor(() => document.querySelector('#resultado-final'));
    const state = window.__IFR_EXAM_DEBUG__.getState();
    const incorrectCount = Object.values(state.answersById).filter((answer) => answer && !answer.isCorrect).length;
    const resultButton = document.querySelector('[data-action="download-results"]');
    if (!resultButton) throw new Error('Missing PDF button');

    let downloadAttempt = null;
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    if (!currentProfile.realDownload) {
      HTMLAnchorElement.prototype.click = function patchedClick() {
        downloadAttempt = {
          href: this.href,
          download: this.download
        };
      };
    }

    resultButton.click();
    await waitFor(() => Array.from(document.querySelectorAll('[data-action="download-results"]'))
      .every((button) => !button.disabled && /Obtener reactivos que debo mejorar/.test(button.textContent)));

    let blobCheck = null;
    if (!currentProfile.realDownload) {
      HTMLAnchorElement.prototype.click = originalAnchorClick;
      await waitFor(() => downloadAttempt && downloadAttempt.href && downloadAttempt.href.startsWith('blob:'));
      const response = await fetch(downloadAttempt.href);
      const blob = await response.blob();
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const head = String.fromCharCode(...bytes.slice(0, 5));
      const tailBytes = bytes.slice(Math.max(0, bytes.length - 2048));
      const tail = String.fromCharCode(...tailBytes);
      blobCheck = {
        type: blob.type,
        size: blob.size,
        head,
        hasEof: tail.includes('%%EOF')
      };
    }

    return {
      incorrectCount,
      buttonText: resultButton.textContent.trim(),
      horizontalOverflow: document.scrollingElement.scrollWidth > window.innerWidth,
      downloadAttempt,
      blobCheck
    };
  }, profile);

  assert.strictEqual(result.incorrectCount, 5, `${profile.id}: conteo incorrecto de errores.`);
  assert.strictEqual(result.buttonText, 'Obtener reactivos que debo mejorar', `${profile.id}: texto de boton incorrecto.`);
  assert.ok(!result.horizontalOverflow, `${profile.id}: hay desbordamiento horizontal.`);

  if (profile.realDownload) {
    const downloaded = await waitForDownloadedPdf(downloadStartedAt);
    const inspection = inspectPdfFile(downloaded.fullPath);
    assert.strictEqual(inspection.head, '%PDF-', `${profile.id}: el archivo no inicia como PDF.`);
    assert.ok(inspection.hasEof, `${profile.id}: el archivo PDF no contiene cierre EOF.`);
    assert.ok(inspection.pageCount >= 1, `${profile.id}: el PDF no tiene paginas detectables.`);
    assert.ok(inspection.size > 10000, `${profile.id}: el PDF pesa demasiado poco.`);
    log(`${profile.id}: PDF real descargado en ${downloaded.fullPath} (${inspection.size} bytes).`);
    return;
  }

  assert.ok(result.downloadAttempt && result.downloadAttempt.href.startsWith('blob:'), `${profile.id}: la descarga no uso blob.`);
  assert.strictEqual(result.downloadAttempt.download, PDF_FILENAME, `${profile.id}: nombre de PDF incorrecto.`);
  assert.strictEqual(result.blobCheck.type, 'application/pdf', `${profile.id}: MIME incorrecto.`);
  assert.strictEqual(result.blobCheck.head, '%PDF-', `${profile.id}: blob no inicia como PDF.`);
  assert.ok(result.blobCheck.hasEof, `${profile.id}: blob PDF sin EOF.`);
  assert.ok(result.blobCheck.size > 10000, `${profile.id}: blob PDF pesa demasiado poco.`);
  log(`${profile.id}: PDF blob validado sin desbordamiento horizontal.`);
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
    log(`Navegador usado: ${launched.executable}`);

    for (const profile of PROFILES) {
      await runProfile(client, serverInfo.url, profile);
    }

    log('QA de PDF completada para Windows Chrome/Edge, Android Chrome, iPhone Safari e iPhone Chrome emulados.');
  } finally {
    if (client) client.close();
    if (browser) await stopBrowserProcess(browser);
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    if (userDataDir) await removeDirectoryBestEffort(userDataDir);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
