`assets/data.js` holds geometry read from Figma (KK, page LF) with use_figma:
- F1 / F6: the two flow frames, "1" (232:4117) and "6" (233:4206). Nodes are [name, kind, x, y, w, h, fontSize, label],
  free texts are [x, y, size, opacity, text], rects [name, x, y, w, h, dashed], connectors
  [from, to, startMagnet, endMagnet, x, y, w, h, dashed, strokeWeight]. A connector's box spans its centerline,
  so its route is rebuilt from the magnets (Figma routes elbows through the midpoint).
- WIRES: the shapes of wireframes "2"…"5" (232:3705, 232:3790, 232:3875, 232:4046) for the pencil sketch:
  r rect, c circle, w text box, v vector line (M 0 0 L a b plus its absolute transform).
