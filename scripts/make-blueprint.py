"""Generate the blueprint line-art version of the About portrait.

Usage: python scripts/make-blueprint.py src/assets/images/Ayres.jpg src/assets/images/Ayres-blueprint.jpg
Requires: pip install opencv-python-headless numpy
"""
import sys

import cv2
import numpy as np

src, out = sys.argv[1], sys.argv[2]
img = cv2.resize(cv2.imread(src), (1080, 1440), interpolation=cv2.INTER_AREA)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Clean outlines: smooth away texture, then thin edges thickened slightly so they survive downscaling
smooth = gray.copy()
for _ in range(3):
    smooth = cv2.bilateralFilter(smooth, 9, 40, 9)
edges = cv2.Canny(smooth, 22, 65, L2gradient=True)
edges = cv2.dilate(edges, np.ones((2, 2), np.uint8)).astype(np.float32) / 255
edges = np.clip(cv2.GaussianBlur(edges, (3, 3), 0.8) * 1.4, 0, 1)

# Faint purple duotone of the photo so the face stays readable
tone = cv2.createCLAHE(2.0, (8, 8)).apply(gray).astype(np.float32) / 255

h, w = edges.shape
yy, xx = np.mgrid[0:h, 0:w]
grid = (((xx % 27) < 1) | ((yy % 27) < 1)) * 0.05 + (((xx % 135) < 2) | ((yy % 135) < 2)) * 0.08

# Colours in BGR
paper = np.array([0.08, 0.035, 0.04])
purple = np.array([0.99, 0.53, 0.73])
line = np.array([1.0, 0.72, 0.85])

col = paper + purple * (tone ** 1.3 * 0.35)[..., None] + purple * grid[..., None]
col = col * (1 - edges[..., None]) + line * edges[..., None]
cv2.imwrite(out, (np.clip(col, 0, 1) * 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 88])
