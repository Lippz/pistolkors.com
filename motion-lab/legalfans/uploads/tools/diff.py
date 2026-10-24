# Pixel diff of a still against a Figma reference: python3 tools/diff.py still.png src/1-flow.png out.png
import sys
from PIL import Image, ImageChops
a = Image.open(sys.argv[1]).convert('RGB'); b = Image.open(sys.argv[2]).convert('RGB').resize(a.size)
d = ImageChops.difference(a, b).convert('L')
hist = d.histogram(); n = sum(hist)
print(f'{sys.argv[1]}: mean {sum(i * c for i, c in enumerate(hist)) / n:.2f}, pixels off >40: {sum(hist[41:]) / n * 100:.2f}%')
if len(sys.argv) > 3: d.point(lambda v: min(255, v * 4)).save(sys.argv[3])
