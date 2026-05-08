# -*- coding: utf-8 -*-
"""Generate stable raster assets for ECOEMS IFR simulation 2.

The source TXT keeps the image prompts as internal editorial instructions.
This script turns the required support visuals into lightweight PNG files
that can be validated by the static build and rendered by the web app.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

IFR_BLUE = "#1C1E5A"
IFR_BLUE_2 = "#2B2F8F"
IFR_GREEN = "#2CE51E"
INK = "#14143A"
MUTED = "#5C6684"
LINE = "#D7DAE8"
PAPER = "#FFFFFF"
SOFT = "#F5F7FB"
GRAY = "#8890A7"
RED = "#C94B4B"
YELLOW = "#F1C84B"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


FONT_18 = font(18)
FONT_20 = font(20)
FONT_22 = font(22)
FONT_24_B = font(24, True)
FONT_28_B = font(28, True)
FONT_34_B = font(34, True)


def canvas(width: int, height: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (width, height), "#F8FAFF")
    draw = ImageDraw.Draw(image)
    return image, draw


def save(image: Image.Image, relative_path: str) -> None:
    target = ROOT / relative_path
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "PNG", optimize=True)
    print(f"asset: {relative_path}")


def text_center(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, fill=INK, fnt=FONT_20) -> None:
    bbox = draw.textbbox((0, 0), text, font=fnt)
    x = box[0] + (box[2] - box[0] - (bbox[2] - bbox[0])) / 2
    y = box[1] + (box[3] - box[1] - (bbox[3] - bbox[1])) / 2
    draw.text((x, y), text, fill=fill, font=fnt)


def rounded_box(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill=PAPER, outline=LINE, radius=22, width=2) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_arrow(draw: ImageDraw.ImageDraw, start: tuple[int, int], end: tuple[int, int], fill=IFR_BLUE_2, width=6) -> None:
    draw.line([start, end], fill=fill, width=width)
    angle = math.atan2(end[1] - start[1], end[0] - start[0])
    size = 18
    left = (end[0] - size * math.cos(angle - math.pi / 6), end[1] - size * math.sin(angle - math.pi / 6))
    right = (end[0] - size * math.cos(angle + math.pi / 6), end[1] - size * math.sin(angle + math.pi / 6))
    draw.polygon([end, left, right], fill=fill)


def star_points(cx: int, cy: int, outer: int, inner: int, points: int = 5) -> list[tuple[float, float]]:
    coords: list[tuple[float, float]] = []
    for index in range(points * 2):
        radius = outer if index % 2 == 0 else inner
        angle = -math.pi / 2 + index * math.pi / points
        coords.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    return coords


def draw_symbol(draw: ImageDraw.ImageDraw, cx: int, cy: int, size: int, kind: str) -> None:
    half = size // 2
    if kind == "triangle":
        draw.polygon([(cx, cy - half), (cx - half, cy + half), (cx + half, cy + half)], fill=GRAY)
    elif kind == "triangle_outline":
        draw.polygon([(cx, cy - half), (cx - half, cy + half), (cx + half, cy + half)], outline=IFR_BLUE, width=4)
    elif kind == "circle_fill":
        draw.ellipse((cx - half, cy - half, cx + half, cy + half), fill=INK)
    elif kind == "circle_empty":
        draw.ellipse((cx - half, cy - half, cx + half, cy + half), outline=IFR_BLUE, width=4)
    elif kind == "square_fill":
        draw.rectangle((cx - half, cy - half, cx + half, cy + half), fill=IFR_BLUE_2)
    elif kind == "square_empty":
        draw.rectangle((cx - half, cy - half, cx + half, cy + half), outline=IFR_BLUE, width=4)
    elif kind == "star":
        draw.polygon(star_points(cx, cy, half + 3, max(7, half // 2)), fill=YELLOW, outline=IFR_BLUE)


def draw_symbol_grid(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    rows: int,
    cols: int,
    cell: int,
    symbols: dict[tuple[int, int], str],
    label: str | None = None,
) -> None:
    if label:
        text_center(draw, (x, y - 34, x + cols * cell, y - 4), label, fill=IFR_BLUE, fnt=FONT_20)
    for row in range(rows + 1):
        yy = y + row * cell
        draw.line((x, yy, x + cols * cell, yy), fill=LINE, width=3)
    for col in range(cols + 1):
        xx = x + col * cell
        draw.line((xx, y, xx, y + rows * cell), fill=LINE, width=3)
    for (row, col), kind in symbols.items():
        draw_symbol(draw, x + col * cell + cell // 2, y + row * cell + cell // 2, max(16, int(cell * 0.42)), kind)


def draw_dot_triangle_grid(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    cell: int,
    dot_pos: tuple[int, int],
    tri_pos: tuple[int, int],
    label: str,
) -> None:
    draw_symbol_grid(draw, x, y, 3, 3, cell, {}, label)
    dx = x + dot_pos[1] * cell + cell // 2
    dy = y + dot_pos[0] * cell + cell // 2
    draw.ellipse((dx - 13, dy - 13, dx + 13, dy + 13), fill=INK)
    tx = x + tri_pos[1] * cell + cell // 2
    ty = y + tri_pos[0] * cell + cell // 2
    draw_symbol(draw, tx, ty, 32, "triangle")


def reactivo_05() -> None:
    image, draw = canvas(1024, 768)
    series = [
        ((0, 0), (1, 1), "Figura 1"),
        ((0, 1), (2, 1), "Figura 2"),
        ((0, 2), (1, 1), "Figura 3"),
        ((1, 2), (2, 1), "Figura 4"),
    ]
    options = [
        ((2, 0), (1, 1), "a)"),
        ((1, 2), (2, 1), "b)"),
        ((2, 2), (1, 1), "c)"),
        ((0, 2), (2, 1), "d)"),
        ((2, 2), (2, 1), "e)"),
    ]
    for index, item in enumerate(series):
        draw_dot_triangle_grid(draw, 90 + index * 215, 92, 48, item[0], item[1], item[2])
    for index, item in enumerate(options):
        draw_dot_triangle_grid(draw, 68 + index * 190, 440, 44, item[0], item[1], item[2])
    save(image, "assets/habilidad-matematica/reactivo-05-serie-cuadricula.png")


def draw_cross(draw: ImageDraw.ImageDraw, cx: int, cy: int, arm: int, cell: int, label: str) -> None:
    text_center(draw, (cx - 90, cy - 150, cx + 90, cy - 118), label, fill=IFR_BLUE, fnt=FONT_20)
    for offset in range(-arm, arm + 1):
        draw.rectangle((cx + offset * cell - cell // 2, cy - cell // 2, cx + offset * cell + cell // 2, cy + cell // 2), fill="#DDE9FF", outline=IFR_BLUE, width=2)
        draw.rectangle((cx - cell // 2, cy + offset * cell - cell // 2, cx + cell // 2, cy + offset * cell + cell // 2), fill="#DDE9FF", outline=IFR_BLUE, width=2)


def reactivo_06() -> None:
    image, draw = canvas(1024, 768)
    for index, arm in enumerate([1, 2, 3, 4]):
        cx = 160 + index * 235
        draw_cross(draw, cx, 398, arm, 27, f"Figura {index + 1}")
    save(image, "assets/habilidad-matematica/reactivo-06-cruces-mosaicos.png")


def reactivo_07() -> None:
    image, draw = canvas(1024, 768)
    original = {(0, 0): "triangle", (0, 1): "square_empty", (1, 0): "circle_fill", (1, 2): "square_fill", (2, 1): "circle_empty"}
    options = [
        {(0, 1): "triangle", (0, 2): "circle_fill", (1, 0): "square_empty", (1, 2): "circle_empty", (2, 1): "square_fill"},
        {(0, 1): "circle_empty", (1, 0): "square_fill", (1, 2): "circle_fill", (2, 1): "square_empty", (2, 2): "triangle"},
        original,
        {(0, 1): "square_fill", (1, 0): "square_empty", (1, 2): "circle_empty", (2, 0): "triangle", (2, 1): "circle_fill"},
        {(0, 1): "circle_fill", (0, 2): "triangle", (1, 0): "circle_empty", (1, 2): "square_empty", (2, 1): "square_fill"},
    ]
    draw_symbol_grid(draw, 393, 72, 3, 3, 58, original, "Figura original")
    for index, option in enumerate(options):
        x = 62 + index * 190
        draw_symbol_grid(draw, x, 445, 3, 3, 46, option, f"{chr(97 + index)})")
    save(image, "assets/habilidad-matematica/reactivo-07-rotacion-90.png")


def reactivo_08() -> None:
    image, draw = canvas(1024, 768)
    original = {(0, 0): "star", (0, 1): "circle_empty", (0, 3): "triangle_outline", (1, 0): "square_fill", (1, 2): "circle_fill", (1, 3): "square_empty"}
    options = [
        original,
        {(0, 0): "square_empty", (0, 1): "circle_fill", (0, 3): "square_fill", (1, 0): "triangle_outline", (1, 2): "circle_empty", (1, 3): "star"},
        {(0, 0): "square_fill", (0, 2): "circle_fill", (0, 3): "square_empty", (1, 0): "star", (1, 1): "circle_empty", (1, 3): "triangle_outline"},
        {(0, 0): "triangle_outline", (0, 2): "circle_empty", (0, 3): "star", (1, 0): "square_empty", (1, 1): "circle_fill", (1, 3): "square_fill"},
        {(0, 0): "square_empty", (0, 2): "circle_fill", (0, 3): "square_fill", (1, 0): "triangle_outline", (1, 1): "circle_empty", (1, 3): "star"},
    ]
    draw_symbol_grid(draw, 365, 90, 2, 4, 58, original, "Figura original")
    for index, option in enumerate(options):
        x = 36 + index * 198
        draw_symbol_grid(draw, x, 462, 2, 4, 42, option, f"{chr(97 + index)})")
    save(image, "assets/habilidad-matematica/reactivo-08-rotacion-180.png")


def reactivo_09() -> None:
    image, draw = canvas(800, 800)
    x, y, size = 160, 160, 480
    for i in range(4):
        pos = x + i * size // 3
        draw.line((pos, y, pos, y + size), fill=IFR_BLUE, width=5)
        draw.line((x, pos, x + size, pos), fill=IFR_BLUE, width=5)
    save(image, "assets/habilidad-matematica/reactivo-09-cuadricula-3x3.png")


def reactivo_10() -> None:
    image, draw = canvas(900, 700)
    apex = (450, 88)
    base_y = 610
    points = [(150 + index * 150, base_y) for index in range(5)]
    draw.line([points[0], apex, points[-1], points[0]], fill=IFR_BLUE, width=6)
    for point in points[1:-1]:
        draw.line([apex, point], fill=IFR_BLUE, width=4)
    save(image, "assets/habilidad-matematica/reactivo-10-triangulos.png")


def reactivo_19() -> None:
    image, draw = canvas(1024, 768)
    for index, title in enumerate(["1", "2", "3"]):
        x0 = 56 + index * 323
        rounded_box(draw, (x0, 82, x0 + 282, 650), fill=PAPER, outline=LINE)
        text_center(draw, (x0 + 16, 106, x0 + 70, 156), title, fill=IFR_BLUE, fnt=FONT_34_B)

    # Moment 1: leaf with foil.
    draw.ellipse((134, 235, 270, 420), fill="#5FBF67", outline=IFR_BLUE, width=3)
    draw.line((202, 420, 202, 505), fill="#458B4B", width=6)
    draw.rectangle((184, 270, 255, 382), fill="#D8DCE7", outline=MUTED, width=3)
    draw.text((128, 525), "papel aluminio", fill=INK, font=FONT_20)

    # Moment 2: light through window.
    draw.rectangle((435, 190, 603, 320), outline=IFR_BLUE, width=5)
    draw.line((519, 190, 519, 320), fill=LINE, width=3)
    draw.line((435, 255, 603, 255), fill=LINE, width=3)
    for offset in [0, 38, 76]:
        draw_arrow(draw, (610 + offset, 178), (554 + offset // 2, 382), fill=YELLOW, width=5)
    draw.text((520, 350), "luz", fill=INK, font=FONT_22)
    draw.ellipse((462, 392, 588, 545), fill="#5FBF67", outline=IFR_BLUE, width=3)
    draw.rectangle((504, 430, 560, 520), fill="#D8DCE7", outline=MUTED, width=3)

    # Moment 3: iodine result.
    draw.text((800, 170), "yodo", fill=INK, font=FONT_22)
    draw.polygon([(810, 202), (845, 202), (836, 265), (819, 265)], fill="#8B5A2B", outline=IFR_BLUE)
    draw.ellipse((776, 340, 918, 528), fill="#657E57", outline=IFR_BLUE, width=3)
    draw.rectangle((804, 376, 870, 490), fill="#A7B0AA", outline=MUTED, width=3)
    draw.line((848, 528, 848, 590), fill="#458B4B", width=6)
    save(image, "assets/biologia/reactivo-19-fotosintesis-almidon.png")


def reactivo_44() -> None:
    image, draw = canvas(1024, 768)
    boxes = [(64, 115, 328, 625), (380, 115, 644, 625), (696, 115, 960, 625)]
    labels = ["Modelo A", "Modelo B", "Modelo C"]
    for box, label in zip(boxes, labels):
        rounded_box(draw, box, fill=PAPER, outline=LINE)
        text_center(draw, (box[0], 135, box[2], 178), label, fill=IFR_BLUE, fnt=FONT_24_B)

    # Model A: two particle types separated and mixed.
    for x, y in [(130, 248), (235, 328), (170, 468), (278, 520)]:
        draw.ellipse((x - 20, y - 20, x + 20, y + 20), fill="#2B7BD8", outline=IFR_BLUE, width=2)
    for x, y in [(235, 245), (145, 355), (245, 440)]:
        draw.ellipse((x - 18, y - 18, x + 18, y + 18), fill=RED, outline=IFR_BLUE, width=2)
        draw.ellipse((x + 20, y - 18, x + 56, y + 18), fill=RED, outline=IFR_BLUE, width=2)

    # Model B: equal diatomic particles.
    for x, y in [(460, 260), (550, 350), (472, 468), (562, 535)]:
        draw.ellipse((x - 22, y - 20, x + 22, y + 20), fill=IFR_GREEN, outline=IFR_BLUE, width=2)
        draw.ellipse((x + 28, y - 20, x + 72, y + 20), fill=IFR_GREEN, outline=IFR_BLUE, width=2)
        draw.line((x + 20, y, x + 30, y), fill=IFR_BLUE, width=4)

    # Model C: equal triatomic particles with different atoms.
    for x, y in [(790, 260), (865, 368), (790, 500)]:
        draw.ellipse((x - 24, y - 24, x + 24, y + 24), fill=INK, outline=IFR_BLUE, width=2)
        draw.ellipse((x - 58, y + 24, x - 18, y + 64), fill="#D8E5FF", outline=IFR_BLUE, width=2)
        draw.ellipse((x + 18, y + 24, x + 58, y + 64), fill="#D8E5FF", outline=IFR_BLUE, width=2)
        draw.line((x - 18, y + 20, x - 32, y + 35), fill=IFR_BLUE, width=4)
        draw.line((x + 18, y + 20, x + 32, y + 35), fill=IFR_BLUE, width=4)
    save(image, "assets/quimica/reactivo-44-modelos-particulas.png")


def draw_line_chart(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    x_labels: list[str],
    y_min: int,
    y_max: int,
    y_step: int,
    points: list[tuple[int, int]],
    x_title: str,
    y_title: str,
) -> None:
    left, top, right, bottom = box
    plot_left, plot_top, plot_right, plot_bottom = left + 92, top + 48, right - 40, bottom - 88
    draw.line((plot_left, plot_bottom, plot_right, plot_bottom), fill=IFR_BLUE, width=4)
    draw.line((plot_left, plot_top, plot_left, plot_bottom), fill=IFR_BLUE, width=4)
    y = y_min
    while y <= y_max:
        ratio = (y - y_min) / (y_max - y_min)
        yy = plot_bottom - ratio * (plot_bottom - plot_top)
        draw.line((plot_left - 8, yy, plot_right, yy), fill="#E7EAF4", width=2)
        draw.text((left + 34, yy - 12), str(y), fill=MUTED, font=FONT_18)
        y += y_step
    coords = []
    if x_labels:
        for index, (_, value) in enumerate(points):
            xx = plot_left + index * (plot_right - plot_left) / (len(points) - 1)
            yy = plot_bottom - (value - y_min) / (y_max - y_min) * (plot_bottom - plot_top)
            coords.append((xx, yy))
            draw.text((xx - 36, plot_bottom + 18), x_labels[index], fill=INK, font=FONT_18)
    else:
        for x_value, value in points:
            xx = plot_left + (x_value - points[0][0]) / (points[-1][0] - points[0][0]) * (plot_right - plot_left)
            yy = plot_bottom - (value - y_min) / (y_max - y_min) * (plot_bottom - plot_top)
            coords.append((xx, yy))
            draw.text((xx - 7, plot_bottom + 18), str(x_value), fill=INK, font=FONT_18)
    draw.line(coords, fill=IFR_BLUE_2, width=5, joint="curve")
    for xx, yy in coords:
        draw.ellipse((xx - 8, yy - 8, xx + 8, yy + 8), fill=IFR_GREEN, outline=IFR_BLUE, width=3)
    text_center(draw, (plot_left, bottom - 45, plot_right, bottom - 8), x_title, fill=IFR_BLUE, fnt=FONT_22)
    draw.text((left + 18, top + 12), y_title, fill=IFR_BLUE, font=FONT_22)


def reactivo_73() -> None:
    image, draw = canvas(1024, 768)
    rounded_box(draw, (46, 54, 978, 710), fill=PAPER, outline=LINE)
    draw_line_chart(
        draw,
        (70, 88, 960, 690),
        ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        60,
        100,
        10,
        [(0, 96), (1, 88), (2, 78), (3, 82), (4, 66)],
        "Día",
        "Litros",
    )
    save(image, "assets/matematicas/reactivo-73-grafica-consumo-agua.png")


def reactivo_74() -> None:
    image, draw = canvas(1024, 768)
    y1, y2 = 260, 520
    draw.line((110, y1, 914, y1), fill=IFR_BLUE, width=7)
    draw.line((110, y2, 914, y2), fill=IFR_BLUE, width=7)
    draw.text((930, y1 - 18), "r", fill=INK, font=FONT_28_B)
    draw.text((930, y2 - 18), "s", fill=INK, font=FONT_28_B)
    draw.line((310, 120, 705, 665), fill=IFR_BLUE_2, width=7)
    positions = {
        "1": (375, 205), "2": (486, 205), "3": (405, 305), "4": (525, 305),
        "5": (560, 462), "6": (675, 462), "7": (594, 565), "8": (710, 565),
    }
    for label, (x, y) in positions.items():
        draw.ellipse((x - 25, y - 25, x + 25, y + 25), fill=PAPER, outline=LINE, width=2)
        text_center(draw, (x - 25, y - 25, x + 25, y + 25), label, fill=INK, fnt=FONT_22)
    save(image, "assets/matematicas/reactivo-74-angulos-alternos-internos.png")


def reactivo_94() -> None:
    image, draw = canvas(1024, 768)
    left, top, right, bottom = 165, 110, 860, 640
    rounded_box(draw, (90, 58, 934, 704), fill=PAPER, outline=LINE)
    meridians = [("40° W", left), ("0°", (left + right) // 2), ("40° E", right)]
    parallels = [("20° N", top), ("0°", (top + bottom) // 2), ("20° S", bottom)]
    for label, x in meridians:
        draw.line((x, top, x, bottom), fill=IFR_BLUE if label == "0°" else LINE, width=4 if label == "0°" else 3)
        text_center(draw, (x - 50, bottom + 18, x + 50, bottom + 55), label, fill=INK, fnt=FONT_20)
    for label, y in parallels:
        draw.line((left, y, right, y), fill=IFR_BLUE if label == "0°" else LINE, width=4 if label == "0°" else 3)
        draw.text((left - 82, y - 14), label, fill=INK, font=FONT_20)
    text_center(draw, ((left + right) // 2 - 30, 62, (left + right) // 2 + 30, 95), "N", fill=IFR_BLUE, fnt=FONT_28_B)
    text_center(draw, ((left + right) // 2 - 30, 672, (left + right) // 2 + 30, 705), "S", fill=IFR_BLUE, fnt=FONT_28_B)
    text_center(draw, (65, (top + bottom) // 2 - 20, 105, (top + bottom) // 2 + 20), "W", fill=IFR_BLUE, fnt=FONT_28_B)
    text_center(draw, (910, (top + bottom) // 2 - 20, 950, (top + bottom) // 2 + 20), "E", fill=IFR_BLUE, fnt=FONT_28_B)
    px, py = left, bottom
    draw.ellipse((px - 13, py - 13, px + 13, py + 13), fill=IFR_GREEN, outline=IFR_BLUE, width=3)
    draw.text((px + 18, py - 34), "P", fill=INK, font=FONT_28_B)
    save(image, "assets/geografia/reactivo-94-coordenadas-p.png")


def reactivo_106() -> None:
    image, draw = canvas(1024, 768)
    rounded_box(draw, (48, 52, 976, 710), fill=PAPER, outline=LINE)
    draw_line_chart(
        draw,
        (70, 88, 954, 690),
        [],
        0,
        80,
        20,
        [(0, 0), (2, 5), (4, 20), (6, 45), (8, 80)],
        "Tiempo (s)",
        "Posición (m)",
    )
    save(image, "assets/fisica/reactivo-106-grafica-posicion-tiempo.png")


def reactivo_108() -> None:
    image, draw = canvas(1024, 768)
    draw.rectangle((120, 525, 904, 565), fill="#D8DCE7", outline=MUTED)
    draw.rectangle((410, 305, 615, 505), fill="#DDE9FF", outline=IFR_BLUE, width=5)
    draw_arrow(draw, (620, 355), (790, 355), fill=IFR_BLUE_2, width=8)
    draw.text((700, 312), "18 N", fill=INK, font=FONT_28_B)
    draw_arrow(draw, (620, 455), (735, 455), fill=IFR_BLUE_2, width=8)
    draw.text((676, 466), "7 N", fill=INK, font=FONT_28_B)
    draw_arrow(draw, (405, 405), (230, 405), fill=IFR_BLUE_2, width=8)
    draw.text((250, 360), "F", fill=INK, font=FONT_34_B)
    save(image, "assets/fisica/reactivo-108-equilibrio-fuerzas.png")


def reactivo_112() -> None:
    image, draw = canvas(900, 900)
    cx, cy = 450, 450
    draw.ellipse((150, 150, 750, 750), fill=PAPER, outline=IFR_BLUE, width=8)
    draw.ellipse((240, 240, 660, 660), outline=LINE, width=4)
    text_center(draw, (420, 160, 480, 215), "N", fill=IFR_BLUE, fnt=FONT_34_B)
    text_center(draw, (420, 685, 480, 740), "S", fill=IFR_BLUE, fnt=FONT_34_B)
    text_center(draw, (675, 420, 735, 480), "E", fill=IFR_BLUE, fnt=FONT_34_B)
    text_center(draw, (165, 420, 225, 480), "O", fill=IFR_BLUE, fnt=FONT_34_B)
    draw.polygon([(cx, 190), (cx - 28, cy), (cx + 28, cy)], fill=RED, outline=IFR_BLUE)
    draw.polygon([(cx, 710), (cx - 28, cy), (cx + 28, cy)], fill=IFR_BLUE_2, outline=IFR_BLUE)
    draw.ellipse((cx - 18, cy - 18, cx + 18, cy + 18), fill=INK)
    save(image, "assets/fisica/reactivo-112-brujula.png")


def reactivo_113() -> None:
    image, draw = canvas(1024, 768)
    # Circuit.
    draw.rectangle((104, 304, 188, 432), fill=PAPER, outline=IFR_BLUE, width=5)
    draw.rectangle((125, 285, 167, 304), fill=IFR_BLUE_2)
    draw.text((105, 450), "pila", fill=INK, font=FONT_22)
    draw.line((188, 365, 415, 365), fill=IFR_BLUE, width=8)
    draw.line((560, 365, 832, 365), fill=IFR_BLUE, width=8)
    draw.line((832, 365, 832, 535), fill=IFR_BLUE, width=8)
    draw.line((832, 535, 146, 535), fill=IFR_BLUE, width=8)
    draw.line((146, 535, 146, 432), fill=IFR_BLUE, width=8)
    draw.line((415, 365, 485, 318), fill=IFR_BLUE, width=7)
    draw.line((485, 318, 560, 365), fill=IFR_BLUE, width=7)
    draw.text((402, 260), "interruptor", fill=INK, font=FONT_22)
    draw_arrow(draw, (610, 342), (720, 342), fill=IFR_GREEN, width=6)
    draw.text((607, 290), "corriente", fill=INK, font=FONT_22)

    # Compass near wire.
    cx, cy = 660, 500
    draw.ellipse((570, 410, 750, 590), fill=PAPER, outline=IFR_BLUE, width=4)
    draw.line((cx - 44, cy + 50, cx + 48, cy - 48), fill=RED, width=8)
    draw.line((cx + 48, cy - 48, cx + 72, cy - 72), fill=RED, width=4)
    draw.line((cx - 44, cy + 50, cx - 68, cy + 72), fill=IFR_BLUE_2, width=4)
    draw.text((605, 610), "brújula", fill=INK, font=FONT_22)
    save(image, "assets/fisica/reactivo-113-corriente-brujula.png")


def reactivo_115() -> None:
    image, draw = canvas(1024, 768)
    # Hand.
    draw.ellipse((72, 360, 190, 480), fill="#F2C6A0", outline="#B77B5B", width=4)
    for offset in range(4):
        draw.rounded_rectangle((150 + offset * 22, 330 - offset * 5, 190 + offset * 22, 395 - offset * 4), radius=16, fill="#F2C6A0", outline="#B77B5B", width=3)
    draw_arrow(draw, (134, 285), (134, 210), fill=IFR_BLUE_2, width=5)
    draw_arrow(draw, (134, 515), (134, 590), fill=IFR_BLUE_2, width=5)

    # Transverse wave.
    points = []
    for x in range(170, 910, 10):
        y = 385 + math.sin((x - 170) / 90 * math.pi) * 85
        points.append((x, y))
    draw.line(points, fill=IFR_BLUE, width=8)
    draw_arrow(draw, (735, 245), (870, 245), fill=IFR_GREEN, width=6)
    save(image, "assets/fisica/reactivo-115-onda-cuerda.png")


def main() -> None:
    reactivo_05()
    reactivo_06()
    reactivo_07()
    reactivo_08()
    reactivo_09()
    reactivo_10()
    reactivo_19()
    reactivo_44()
    reactivo_73()
    reactivo_74()
    reactivo_94()
    reactivo_106()
    reactivo_108()
    reactivo_112()
    reactivo_113()
    reactivo_115()


if __name__ == "__main__":
    main()
