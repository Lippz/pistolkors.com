# The Uploads loop on the iMac's screen, like the Figma mockup (KK 243:9876, frame "7", 2324×1521).
# Run from the repo root after exporting the screen loop:
#   node motion-lab/export.mjs legalfans/uploads --crf 12 --out motion-lab/legalfans/uploads-imac/build
#   python3 motion-lab/legalfans/uploads-imac/compose.py            → build/imac.mp4 to review
#   python3 motion-lab/legalfans/uploads-imac/compose.py publish    → public/motion/legalfans-uploads.mp4 and .jpg (frame 0)
#
# Figma: the frame's background is #f9fcfd under a vertical gradient, white 10 % at 40.385 % → #01aff1 10 % at 100 %;
# "image 69" (the iMac, a transparent PNG, 1600 px here) is drawn at 2200×2200 from (62, -339.5); "REPLACE" (the screen)
# is 1438×811 at (443, 116.5) with a 2 px black stroke inside and 4 px corners, so the picture is 1434×807 at (445, 118.5).
# The loop is 1816×1024, the same proportions within 0.2 %.
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageDraw

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
W, H = 2324, 1520            # Figma's 1521, minus one row: H.264 wants even sizes
SCREEN = (443, 117, 1438, 811)
PIC = (445, 119, 1434, 807)

bg = Image.new('RGBA', (W, H), (249, 252, 253, 255))
grad = Image.new('RGBA', (1, 1521))
for y in range(1521):
    k = y / 1520
    if k <= .40385:
        c = (255, 255, 255, 26)
    else:
        m = (k - .40385) / (1 - .40385)
        c = tuple(round(a + (b - a) * m) for a, b in zip((255, 255, 255, 26), (1, 175, 241, 26)))
    grad.putpixel((0, y), c)
bg.alpha_composite(grad.resize((W, 1521)).crop((0, 0, W, H)))
imac = Image.open(HERE / 'assets/image69.png').convert('RGBA').resize((2200, 2200), Image.LANCZOS)
bg.alpha_composite(imac, (62, -340))
x, y, w, h = SCREEN
ImageDraw.Draw(bg).rounded_rectangle((x, y, x + w - 1, y + h - 1), radius=4, fill=(0, 0, 0, 255))
(HERE / 'build').mkdir(exist_ok=True)
bg.convert('RGB').save(HERE / 'build/bg.png')

src = HERE / 'build/legalfans-uploads.mp4'
out = ROOT / 'public/motion/legalfans-uploads.mp4' if sys.argv[1:] == ['publish'] else HERE / 'build/imac.mp4'
x, y, w, h = PIC
subprocess.run([
    'ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-i', str(HERE / 'build/bg.png'), '-i', str(src),
    # Overlay in RGB: in YUV 4:2:0 ffmpeg rounds the position and size to even pixels, which left the frame 1 px thin on the
    # left and top and 3 px thick on the right and bottom.
    '-filter_complex', f'[1:v]scale={w}:-1:flags=lanczos,crop={w}:{h},format=gbrp[s];[0:v]format=gbrp[b];[b][s]overlay={x}:{y}:shortest=1:format=gbrp,format=yuv420p',
    '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-movflags', '+faststart', '-an', str(out),
], check=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(out), '-frames:v', '1', '-q:v', '3', str(out.with_suffix('.jpg'))], check=True)
print(out, round(out.stat().st_size / 1e6, 2), 'MB')
