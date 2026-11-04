// A WebGL2 glow under the mouse, for a grid of cards (<div class="cards cards--glow">) and for
// the site's buttons. The shape lights up where the cursor is: a crisp line on the rim that
// runs hot near the cursor, with noise flowing round the perimeter, a soft aura whose inner
// edge laps in waves along it, and two blobs (one darker) swaying inside, faint in the
// middle. On a button the light also spills outside it.
//
// Cards: one canvas behind the grid's content draws every card's border and the light, for
// as long as the page is open. initGlowCards(list) returns false when WebGL2 isn't there, so
// the page keeps the CSS glow.
// Buttons: a button keeps its own fill and border; a canvas inside it, under the label, adds
// the light. It is made when the mouse comes in and let go once the light has faded, since a
// browser only keeps about 16 WebGL contexts and a page has a dozen buttons.

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const MAX = 12;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;        // canvas size, CSS px
uniform float u_dpr;
uniform vec4 u_rects[${MAX}]; // x, y, w, h of each shape, CSS px from the canvas's top left
uniform vec4 u_radii[${MAX}]; // corner radii: top left, top right, bottom right, bottom left
uniform float u_glows[${MAX}];// each shape's glow, 0…1
uniform float u_inks[${MAX}]; // the colours inside each shape: 1 red fill, 2 dark, 3 light
uniform float u_pages[${MAX}];// the colours round each shape: 2 dark, 3 light
uniform int u_count;
uniform vec2 u_mouse;      // the glow's centre (eased cursor)
uniform vec2 u_blobA;      // the bright blob
uniform vec2 u_blobB;      // the dark blob
uniform float u_time;
uniform vec3 u_line;       // the border colour (cards)
uniform float u_lines;     // 1: draw the borders
uniform float u_bloom;     // 1: let the light spill outside the shape (buttons)
uniform float u_inner;     // how strong the blobs and halo inside are
uniform float u_strength;  // the whole glow's strength
out vec4 o;

// The waves along the rim: how far the aura reaches in at rest and at a crest (px, on a
// card; smaller shapes scale them down), crests per turn, how fast they run, how bright.
const float WAVE_BASE = 5.0;
const float WAVE_DEPTH = 24.0;
const float WAVE_CRESTS = 7.0;
const float WAVE_SPEED = 1.1;
const float WAVE_GLOW = 0.45;

// A rounded box with its own radius in each corner (y grows downwards).
float sdRoundBox(vec2 p, vec2 b, vec4 r) {
  float k = p.x > 0.0 ? (p.y < 0.0 ? r.y : r.z) : (p.y < 0.0 ? r.x : r.w);
  vec2 q = abs(p) - b + k;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - k;
}
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return s / 0.94;
}
float gauss(vec2 d, float s) { return exp(-dot(d, d) / (2.0 * s * s)); }
// min(a, b) with the corner rounded off over k.
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}
// Cold to hot, by what the light lies on.
// Dark: deep red, the brand red, orange, almost white.
// Light: from red to a deeper red, as near-black reads as grime on white and near-white vanishes.
// Red fill: from the fill itself to orange, then a pale gold.
vec3 ramp(float x, float ink) {
  if (ink < 1.5) {
    vec3 c = mix(vec3(1.0, 0.3, 0.06), vec3(1.0, 0.52, 0.2), smoothstep(0.0, 0.8, x));
    return mix(c, vec3(1.0, 0.86, 0.62), smoothstep(0.8, 1.7, x));
  }
  if (ink > 2.5) {
    vec3 l = mix(vec3(0.96, 0.24, 0.1), vec3(1.0, 0.184, 0.0), smoothstep(0.0, 0.6, x));
    return mix(l, vec3(0.8, 0.07, 0.0), smoothstep(0.9, 1.6, x));
  }
  vec3 c = mix(vec3(0.38, 0.02, 0.0), vec3(1.0, 0.184, 0.0), smoothstep(0.0, 0.55, x));
  c = mix(c, vec3(1.0, 0.5, 0.24), smoothstep(0.6, 1.15, x));
  return mix(c, vec3(1.0, 0.88, 0.78), smoothstep(1.15, 1.9, x));
}
vec3 deepFor(float ink) {
  return ink < 1.5 ? vec3(0.6, 0.05, 0.0) : ink > 2.5 ? vec3(0.7, 0.04, 0.02) : vec3(0.36, 0.015, 0.0);
}
vec4 over(vec4 src, vec4 dst) { return src + dst * (1.0 - src.a); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y * u_dpr - gl_FragCoord.y) / u_dpr;
  float px = 1.0 / u_dpr;
  vec4 col = vec4(0.0);
  vec4 glow = vec4(0.0);
  for (int i = 0; i < ${MAX}; i++) {
    if (i >= u_count) break;
    vec4 r = u_rects[i];
    vec2 c = r.xy + r.zw * 0.5;
    float d = sdRoundBox(p - c, r.zw * 0.5, u_radii[i]);
    // The 1px border, inside the box as in CSS.
    if (u_lines > 0.5) {
      float line = smoothstep(0.5 + px, 0.5 - px, abs(d + 0.5));
      col = over(vec4(u_line, 1.0) * line, col);
    }

    float g = u_glows[i] * u_strength;
    if (g < 0.002 || d > 60.0) continue;
    float inside = step(d, 0.0);
    float cover = clamp(0.5 - d * u_dpr, 0.0, 1.0);
    // Sizes scale with the shape: a card keeps them, a 56px button gets a third of them.
    float size = clamp(min(r.z, r.w) / 180.0, 0.3, 1.0);

    // The rim beam: a band hugging the border, wider inwards, with noise flowing round the
    // perimeter and slowly churning. The noise is read off a circle (the angle round the
    // shape's centre, turning with time), so it has no seam where the angle wraps round.
    // A crisp 1–2px line right on the border carries the beam; a narrow, faint band round it
    // softens it.
    float core = exp(-pow((d + 0.5) / 1.1, 2.0));
    float band = d > 0.0 ? exp(-d / 3.5) : exp(d / 6.0);
    vec2 rel = (p - c) / (r.zw * 0.5);
    float loop = (r.z + r.w) / 46.0 / 6.2832; // noise units per radian, as long as the rim
    float th = atan(rel.y, rel.x) - u_time * 0.55 / loop;
    vec2 ring = vec2(cos(th), sin(th)) * loop * (1.0 + d / 300.0);
    float n = fbm(ring + vec2(u_time * 0.12, -u_time * 0.07) + 0.5 * fbm(p * 0.018 + u_time * 0.05));
    float near = gauss(p - u_mouse, 75.0 * mix(0.7, 1.0, size));

    // Waves: a soft aura under the line whose inner edge laps in and out, in tongues that run
    // along the rim. The tongue depth comes from two sines with whole numbers of crests per
    // turn (so no seam) and the rim noise; they swell under the cursor and settle away from it.
    float th0 = atan(rel.y, rel.x);
    float swell = 0.5 + 0.5 * (0.6 * sin(WAVE_CRESTS * th0 - u_time * WAVE_SPEED)
      + 0.4 * sin((WAVE_CRESTS + 6.0) * th0 + u_time * WAVE_SPEED * 0.7));
    float reach = (WAVE_BASE + WAVE_DEPTH * mix(swell, n, 0.45) * (0.3 + 0.7 * near)) * mix(0.6, 1.0, size);
    // Depth into the shape for the aura: a smooth minimum of the distances to the side edges
    // and to the top and bottom ones, so the aura's inner edge rounds the corner in an arc
    // instead of folding along the diagonal.
    vec2 toEdge = r.zw * 0.5 - abs(p - c);
    float depth = max(smin(toEdge.x, toEdge.y, 48.0 * size), 0.0);
    // On a light ground there is no light to add: a red glow on white is only a pink wash.
    // There the effect keeps just the rim — a denser line, its waves half as long and faint —
    // and drops the spill, the blobs and the halo. Inside the shape the ground is its fill,
    // outside it whatever it sits on.
    float ink = u_inks[i], page = u_pages[i];
    float onLight = mix(step(2.5, page), step(2.5, ink), cover);
    reach *= mix(1.0, 0.5, onLight);
    float aura = d > 0.0 ? 0.0 : (1.0 - smoothstep(reach * 0.35, reach, depth)) * exp(-depth / reach);

    // On a button the light spills out past it, under the cursor.
    float bloom = u_bloom > 0.5 && d > 0.0 ? exp(-d / 11.0) * 0.55 * (1.0 - onLight) : 0.0;
    // On a light ground a small shape (a button) keeps only the line: its waves and the
    // band would cover most of it and turn it pink. A card keeps short waves at its edge.
    float small = 1.0 - smoothstep(0.35, 0.7, size);
    float lightWaves = mix(0.5, 0.0, small);
    float lightBand = mix(0.35, 0.0, small);
    float rim = (mix(1.0, 1.6, onLight) * core + 0.4 * band * mix(1.0, lightBand, onLight)
      + WAVE_GLOW * mix(1.0, lightWaves, onLight) * aura + bloom)
      * (0.07 + 1.35 * near) * (0.3 + 1.0 * n);

    // Inside: faint in a blurred rectangle over the middle of the shape, full near its
    // edges; two blobs and a wide halo round the cursor. Closeness to the side edges and to
    // the top and bottom ones is taken apart and joined smoothly: the distance to the nearest
    // edge would crease along the diagonals and draw a dark line from each corner.
    vec2 edgeNear = 1.0 - smoothstep(0.0, 95.0 * size, toEdge);
    float prox = 1.0 - (1.0 - edgeNear.x) * (1.0 - edgeNear.y);
    float fade = inside * (0.3 + 0.7 * prox) * u_inner * (1.0 - onLight);
    float blobA = gauss(p - u_blobA, 52.0 * size) * 0.32;
    float blobB = gauss(p - u_blobB, 50.0 * size) * 0.3;
    float halo = gauss(p - u_mouse, 170.0 * size) * 0.07;

    float hot = g * (rim + (blobA + halo) * fade);
    // On a light ground the faintest light is cut off: that's what reads as a pink wash.
    hot = mix(hot, max(hot - 0.07, 0.0) * 1.2, onLight);
    float deep = g * blobB * fade;
    // Inside the shape the light takes the colours of what's inside, outside those of what's
    // round it; the two meet across the 1px edge. On a light ground it turns opaque sooner,
    // so the line reads as solid red rather than pink.
    vec3 hue = mix(ramp(hot, page), ramp(hot, ink), cover);
    vec4 hotC = vec4(hue, 1.0) * (1.0 - exp(-hot * mix(1.9, 3.4, onLight)));
    vec4 deepC = vec4(mix(deepFor(page), deepFor(ink), cover), 1.0) * (1.0 - exp(-deep * 1.6));
    glow = over(hotC, over(deepC, glow));
  }
  o = over(glow, col);
}`;

type Rgba = [number, number, number, number];

const swatch = (() => {
  let ctx: CanvasRenderingContext2D | null = null;
  return () => (ctx ??= document.createElement('canvas').getContext('2d')!);
})();
const toRgba = (css: string): Rgba => {
  const ctx = swatch();
  ctx.fillStyle = '#000';
  ctx.fillStyle = css.trim() || 'transparent';
  const v = ctx.fillStyle; // normalised to #rrggbb or rgba(…)
  if (v.startsWith('#')) return [...[1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16) / 255), 1] as Rgba;
  const m = v.match(/[\d.]+/g) ?? ['0', '0', '0', '0'];
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255, m[3] === undefined ? 1 : Number(m[3])];
};
const luma = ([r, g, b]: Rgba) => r * 0.3 + g * 0.59 + b * 0.11;
const RED = 1, DARK = 2, LIGHT = 3;
// The first opaque background at or above an element: what the light lies on.
const groundOf = (el: Element | null): Rgba => {
  for (let e = el; e; e = e.parentElement) {
    const bg = toRgba(getComputedStyle(e).backgroundColor);
    if (bg[3] > 0.5) return bg;
  }
  return toRgba(getComputedStyle(document.documentElement).getPropertyValue('--paper'));
};
const inkOf = (bg: Rgba): number => {
  const accent = toRgba(getComputedStyle(document.documentElement).getPropertyValue('--accent'));
  if (Math.hypot(bg[0] - accent[0], bg[1] - accent[1], bg[2] - accent[2]) < 0.12) return RED;
  return luma(bg) < 0.5 ? DARK : LIGHT;
};

// A smooth wobble in −1…1: three slow sines at random, unrelated rates.
const wobble = (slow: number) => {
  const w = [0, 1, 2].map((i) => ({
    f: slow * (0.55 + Math.random() * 0.9) * [1, 1.9, 0.47][i],
    p: Math.random() * Math.PI * 2,
    k: [0.55, 0.3, 0.15][i],
  }));
  return (t: number) => w.reduce((s, { f, p, k }) => s + k * Math.sin(f * t + p), 0);
};

type Options = {
  lines: boolean; // draw each shape's border (cards)
  bloom: boolean; // let the light spill outside the shape (buttons)
  inner: number; // strength of the blobs and halo inside
  strength: number;
  orbit: number; // px, the blobs' distance from the glow's centre
  onIdle?: () => void; // called once the light has faded and nothing is lit
};
type Glow = { enter: (i: number, e: PointerEvent) => void; dispose: () => void };

function createGlow(host: HTMLElement, shapes: HTMLElement[], opts: Options): Glow | null {
  const canvas = document.createElement('canvas');
  canvas.className = 'glow-gl';
  canvas.setAttribute('aria-hidden', 'true');
  // Behind the host's content, above its own fill and border (the host isolates).
  Object.assign(canvas.style, { position: 'absolute', zIndex: '-1', pointerEvents: 'none' });
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false });
  if (!gl || !shapes.length) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
    return s;
  };
  const prog = gl.createProgram()!;
  try {
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
  } catch (err) {
    console.warn('Glow falls back to CSS:', err);
    return null;
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const u = (name: string) => gl.getUniformLocation(prog, name);
  const U = {
    res: u('u_res'), dpr: u('u_dpr'), rects: u('u_rects'), radii: u('u_radii'), glows: u('u_glows'),
    inks: u('u_inks'), pages: u('u_pages'), count: u('u_count'), mouse: u('u_mouse'),
    blobA: u('u_blobA'), blobB: u('u_blobB'), time: u('u_time'), line: u('u_line'),
    lines: u('u_lines'), bloom: u('u_bloom'), inner: u('u_inner'), strength: u('u_strength'),
  };

  const items = shapes.slice(0, MAX);
  const PAD = 40; // px of canvas round the host, for the light that spills past the edges
  const EASE = 0.16;
  const SPIN = 0.9;

  const rects = new Float32Array(MAX * 4);
  const radii = new Float32Array(MAX * 4);
  const glows = new Float32Array(MAX);
  const target = new Float32Array(MAX);
  const inks = new Float32Array(MAX);
  const pages = new Float32Array(MAX);
  let width = 0, height = 0, dpr = 1;
  let line: Rgba = [0.5, 0.5, 0.5, 1];
  let mx = 0, my = 0, tx = 0, ty = 0;
  let a = Math.random() * Math.PI * 2, tilt = Math.random() * Math.PI * 2;
  const speed = wobble(0.45), twist = wobble(0.2), breath = wobble(0.5), squash = wobble(0.3);
  let frame = 0, last = 0, gone = false, wasLit = false;
  const t0 = performance.now();
  const off = new AbortController();

  const colours = () => {
    line = toRgba(getComputedStyle(document.documentElement).getPropertyValue('--line'));
    items.forEach((el, i) => {
      const own = toRgba(getComputedStyle(el).backgroundColor);
      const page = inkOf(groundOf(el.parentElement));
      pages[i] = page === RED ? DARK : page;
      inks[i] = own[3] > 0.5 ? inkOf(own) : pages[i];
    });
  };
  // Layout boxes, not getBoundingClientRect: they ignore transforms, so a shape mid-way
  // through an animation (or a pressed button) can't leave its drawing in the wrong place.
  const layout = () => {
    width = host.offsetWidth + PAD * 2;
    height = host.offsetHeight + PAD * 2;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.style.left = canvas.style.top = `${-PAD}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    items.forEach((el, i) => {
      const [x, y] = el === host ? [0, 0] : [el.offsetLeft, el.offsetTop];
      const w = el.offsetWidth, h = el.offsetHeight;
      rects.set([x + PAD, y + PAD, w, h], i * 4);
      const cs = getComputedStyle(el);
      const cap = Math.min(w, h) / 2;
      const corner = (v: string) => Math.min(parseFloat(v) || 0, cap);
      radii.set(
        [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(corner),
        i * 4,
      );
    });
  };

  const draw = (now: number) => {
    if (gone) return;
    const t = (now - t0) / 1000;
    const dt = last ? Math.min(0.05, t - last) : 0;
    last = t;
    mx += (tx - mx) * EASE;
    my += (ty - my) * EASE;
    let moving = Math.hypot(tx - mx, ty - my) > 0.3;
    let lit = false;
    for (let i = 0; i < items.length; i++) {
      const g = glows[i] + (target[i] - glows[i]) * Math.min(1, dt * 7);
      glows[i] = Math.abs(g - target[i]) < 0.003 ? target[i] : g;
      if (glows[i] > 0 || target[i] > 0) lit = true;
    }
    if (lit) moving = true;
    a += SPIN * 1.4 * speed(t) * dt;
    tilt += 0.35 * twist(t) * dt;
    const r = opts.orbit * (0.85 + 0.25 * breath(t));
    const ox = Math.cos(a) * r, oy = Math.sin(a) * r * (0.7 + 0.15 * squash(t));
    const dx = ox * Math.cos(tilt) - oy * Math.sin(tilt);
    const dy = ox * Math.sin(tilt) + oy * Math.cos(tilt);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(U.res, width, height);
    gl.uniform1f(U.dpr, dpr);
    gl.uniform4fv(U.rects, rects);
    gl.uniform4fv(U.radii, radii);
    gl.uniform1fv(U.glows, glows);
    gl.uniform1fv(U.inks, inks);
    gl.uniform1fv(U.pages, pages);
    gl.uniform1i(U.count, items.length);
    gl.uniform2f(U.mouse, mx, my);
    gl.uniform2f(U.blobA, mx + dx, my + dy);
    gl.uniform2f(U.blobB, mx - dx * 0.85, my - dy * 0.85);
    gl.uniform1f(U.time, t);
    gl.uniform3f(U.line, line[0], line[1], line[2]);
    gl.uniform1f(U.lines, opts.lines ? 1 : 0);
    gl.uniform1f(U.bloom, opts.bloom ? 1 : 0);
    gl.uniform1f(U.inner, opts.inner);
    gl.uniform1f(U.strength, opts.strength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = moving ? requestAnimationFrame(draw) : 0;
    if (lit) wasLit = true;
    else if (wasLit) {
      wasLit = false;
      opts.onIdle?.(); // the light has been on and is now out
    }
  };
  const kick = () => {
    if (!frame && !gone) {
      last = 0;
      frame = requestAnimationFrame(draw);
    }
  };

  // Mouse: the shape under the cursor lights up, the others fade out.
  const local = (e: PointerEvent) => {
    const box = host.getBoundingClientRect();
    return [e.clientX - box.left + PAD, e.clientY - box.top + PAD] as const;
  };
  const enter = (i: number, e: PointerEvent) => {
    const wasLit = target.some((v) => v > 0);
    target.fill(0);
    target[i] = 1;
    [tx, ty] = local(e);
    if (!wasLit && glows.every((v) => v < 0.05)) [mx, my] = [tx, ty]; // start under the cursor
    kick();
  };
  const { signal } = off;
  items.forEach((el, i) => {
    el.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && enter(i, e), { signal });
    el.addEventListener(
      'pointerleave',
      () => {
        target[i] = 0;
        kick();
      },
      { signal },
    );
  });
  host.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      [tx, ty] = local(e);
      kick();
    },
    { signal },
  );

  colours();
  host.append(canvas); // last, so the host's :nth-child() rules stay as they were
  layout();
  draw(performance.now()); // paint once before the host hands its look over to the canvas
  host.classList.add('is-gl');
  layout(); // .is-gl can make the host the shapes' offset parent, so measure them again
  draw(performance.now());

  const resize = new ResizeObserver(() => {
    layout();
    kick();
  });
  resize.observe(host);
  const recolour = () => {
    colours();
    kick();
  };
  const themes = new MutationObserver(recolour);
  themes.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  scheme.addEventListener('change', recolour, { signal });

  const dispose = () => {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frame);
    off.abort();
    resize.disconnect();
    themes.disconnect();
    host.classList.remove('is-gl');
    canvas.remove();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    dispose();
  });
  return { enter, dispose };
}

export const initGlowCards = (list: HTMLElement) =>
  createGlow(list, ([...list.children] as HTMLElement[]).filter((el) => el.tagName === 'DIV'), {
    lines: true,
    bloom: false,
    inner: 1,
    strength: 0.75,
    orbit: 36,
  }) !== null;

// A button gets its canvas on the first mouse-in and gives it back once the light is gone.
// Only on a dark ground: on a light one the button keeps its own CSS hover.
export function initGlowButton(button: HTMLElement) {
  let glow: Glow | null = null;
  button.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (button.matches(':disabled, [aria-disabled="true"]')) return; // nothing to press
    if (!glow && inkOf(groundOf(button.parentElement)) === LIGHT) return;
    if (!glow) {
      if (getComputedStyle(button).position === 'static') button.style.position = 'relative';
      button.style.isolation = 'isolate';
      glow = createGlow(button, [button], {
        lines: false,
        bloom: true,
        inner: 0.6,
        strength: 0.9,
        orbit: 12,
        onIdle: () => {
          const g = glow;
          glow = null;
          // Let go on the next frame: dispose() runs inside the glow's own draw.
          requestAnimationFrame(() => g?.dispose());
        },
      });
    }
    glow?.enter(0, e);
  });
}
