// A WebGL2 glow for a grid of cards (<div class="cards cards--glow">). One canvas sits behind
// the cards' content and draws every card's border; under the mouse a card lights up with a
// fluid red beam that flows round its rim, gathers and runs hot where the cursor is, two
// blobs (one darker) swaying inside it, faint in the middle of the card. The canvas only
// draws while something moves.
//
// initGlowCards(list) returns false when WebGL2 isn't there, so the page keeps the CSS glow.

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const MAX = 12;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;        // canvas size, CSS px
uniform float u_dpr;
uniform vec4 u_rects[${MAX}]; // x, y, w, h of each card, CSS px from the canvas's top left
uniform float u_glows[${MAX}];// each card's glow, 0…1
uniform int u_count;
uniform float u_radius;
uniform vec2 u_mouse;      // the glow's centre (eased cursor)
uniform vec2 u_blobA;      // the bright blob
uniform vec2 u_blobB;      // the dark blob
uniform float u_time;
uniform vec3 u_line;       // the border colour
uniform float u_dark;      // 1 on the dark theme, 0 on the light one
out vec4 o;

// The whole glow's strength: rim beam, blobs and halo together.
const float STRENGTH = 0.75;
// The waves along the rim: how far the aura reaches in at rest and at a crest (px), crests
// per turn round the card, how fast they run, and how bright the aura is.
const float WAVE_BASE = 5.0;
const float WAVE_DEPTH = 24.0;
const float WAVE_CRESTS = 7.0;
const float WAVE_SPEED = 1.1;
const float WAVE_GLOW = 0.45;

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
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
// Cold to hot: deep red, the brand red, orange, almost white. The light theme starts at red
// and stops at a deeper red: near-black reads as grime on white, and near-white vanishes.
vec3 ramp(float x) {
  if (u_dark < 0.5) {
    vec3 l = mix(vec3(0.96, 0.24, 0.1), vec3(1.0, 0.184, 0.0), smoothstep(0.0, 0.6, x));
    return mix(l, vec3(0.8, 0.07, 0.0), smoothstep(0.9, 1.6, x));
  }
  vec3 c = mix(vec3(0.38, 0.02, 0.0), vec3(1.0, 0.184, 0.0), smoothstep(0.0, 0.55, x));
  c = mix(c, vec3(1.0, 0.5, 0.24), smoothstep(0.6, 1.15, x));
  return mix(c, vec3(1.0, 0.88, 0.78), smoothstep(1.15, 1.9, x));
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
    float d = sdRoundRect(p - c, r.zw * 0.5, u_radius);
    // The 1px border, inside the box as in CSS.
    float line = smoothstep(0.5 + px, 0.5 - px, abs(d + 0.5));
    col = over(vec4(u_line, 1.0) * line, col);

    float g = u_glows[i] * STRENGTH;
    if (g < 0.002 || d > 60.0) continue;
    float inside = step(d, 0.0);

    // The rim beam: a band hugging the border, wider inwards, with noise flowing round the
    // perimeter and slowly churning. The noise is read off a circle (the angle round the
    // card's centre, turning with time), so it has no seam where the angle wraps round.
    // A crisp 1–2px line right on the border carries the beam; a narrow, faint band round it
    // softens it.
    float core = exp(-pow((d + 0.5) / 1.1, 2.0));
    float band = d > 0.0 ? exp(-d / 3.5) : exp(d / 6.0);
    vec2 rel = (p - c) / (r.zw * 0.5);
    float loop = (r.z + r.w) / 46.0 / 6.2832; // noise units per radian, as long as the rim
    float th = atan(rel.y, rel.x) - u_time * 0.55 / loop;
    vec2 ring = vec2(cos(th), sin(th)) * loop * (1.0 + d / 300.0);
    float n = fbm(ring + vec2(u_time * 0.12, -u_time * 0.07) + 0.5 * fbm(p * 0.018 + u_time * 0.05));
    float near = gauss(p - u_mouse, 75.0);

    // Waves: a soft aura under the line whose inner edge laps in and out, in tongues that run
    // along the rim. The tongue depth comes from two sines with whole numbers of crests per
    // turn (so no seam) and the rim noise; they swell under the cursor and settle away from it.
    float th0 = atan(rel.y, rel.x);
    float swell = 0.5 + 0.5 * (0.6 * sin(WAVE_CRESTS * th0 - u_time * WAVE_SPEED)
      + 0.4 * sin((WAVE_CRESTS + 6.0) * th0 + u_time * WAVE_SPEED * 0.7));
    float reach = WAVE_BASE + WAVE_DEPTH * mix(swell, n, 0.45) * (0.3 + 0.7 * near);
    // Depth into the card for the aura: a smooth minimum of the distances to the side edges
    // and to the top and bottom ones, so the aura's inner edge rounds the corner in an arc
    // instead of folding along the diagonal.
    vec2 toEdge = r.zw * 0.5 - abs(p - c);
    float depth = max(smin(toEdge.x, toEdge.y, 48.0), 0.0);
    float aura = d > 0.0 ? 0.0 : (1.0 - smoothstep(reach * 0.35, reach, depth)) * exp(-depth / reach);

    float rim = (1.0 * core + 0.4 * band + WAVE_GLOW * aura) * (0.07 + 1.35 * near) * (0.3 + 1.0 * n);

    // Inside: faint in a blurred rectangle over the middle 60% of the card, full near its
    // edges; two blobs and a wide halo round the cursor. Closeness to the side edges and to
    // the top and bottom ones is taken apart and joined smoothly: the distance to the nearest
    // edge would crease along the diagonals and draw a dark line from each corner.
    vec2 inner = r.zw * 0.5 - abs(p - c);
    vec2 edgeNear = 1.0 - smoothstep(0.0, 95.0, inner);
    float prox = 1.0 - (1.0 - edgeNear.x) * (1.0 - edgeNear.y);
    float fade = inside * (0.3 + 0.7 * prox);
    float blobA = gauss(p - u_blobA, 52.0) * 0.32;
    float blobB = gauss(p - u_blobB, 50.0) * 0.3;
    float halo = gauss(p - u_mouse, 170.0) * 0.07;

    float hot = g * (rim + (blobA + halo) * fade);
    float deep = g * blobB * fade;
    vec4 hotC = vec4(ramp(hot), 1.0) * (1.0 - exp(-hot * 1.9));
    vec3 deepRgb = u_dark > 0.5 ? vec3(0.36, 0.015, 0.0) : vec3(0.7, 0.04, 0.02);
    vec4 deepC = vec4(deepRgb, 1.0) * (1.0 - exp(-deep * 1.6));
    glow = over(hotC, over(deepC, glow));
  }
  o = over(glow, col);
}`;

type Rgb = [number, number, number];

const toRgb = (css: string, ctx: CanvasRenderingContext2D): Rgb => {
  ctx.fillStyle = '#000';
  ctx.fillStyle = css.trim() || '#000';
  const v = ctx.fillStyle; // normalised to #rrggbb or rgba(…)
  if (v.startsWith('#')) return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16) / 255) as Rgb;
  const m = v.match(/[\d.]+/g) ?? ['0', '0', '0'];
  return [0, 1, 2].map((i) => Number(m[i]) / 255) as Rgb;
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

export function initGlowCards(list: HTMLElement): boolean {
  const canvas = document.createElement('canvas');
  canvas.className = 'glow-gl';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false });
  if (!gl) return false;

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
    console.warn('Card glow falls back to CSS:', err);
    return false;
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
    res: u('u_res'), dpr: u('u_dpr'), rects: u('u_rects'), glows: u('u_glows'), count: u('u_count'),
    radius: u('u_radius'), mouse: u('u_mouse'), blobA: u('u_blobA'), blobB: u('u_blobB'),
    time: u('u_time'), line: u('u_line'), dark: u('u_dark'),
  };

  const cards = ([...list.children] as HTMLElement[]).filter((el) => el.tagName === 'DIV').slice(0, MAX);
  const PAD = 40; // px of canvas round the grid, for the light that spills past the borders
  const EASE = 0.16;
  const ORBIT = 36;
  const SPIN = 0.9;
  const swatch = document.createElement('canvas').getContext('2d')!;

  const rects = new Float32Array(MAX * 4);
  const glows = new Float32Array(MAX);
  const target = new Float32Array(MAX);
  let width = 0, height = 0, dpr = 1, radius = 14;
  let line: Rgb = [0.5, 0.5, 0.5];
  let dark = 1;
  let mx = 0, my = 0, tx = 0, ty = 0;
  let a = Math.random() * Math.PI * 2, tilt = Math.random() * Math.PI * 2;
  const speed = wobble(0.45), twist = wobble(0.2), breath = wobble(0.5), squash = wobble(0.3);
  let frame = 0, last = 0;
  const t0 = performance.now();

  const colours = () => {
    const root = getComputedStyle(document.documentElement);
    line = toRgb(root.getPropertyValue('--line'), swatch);
    const paper = toRgb(root.getPropertyValue('--paper'), swatch);
    dark = paper[0] * 0.3 + paper[1] * 0.59 + paper[2] * 0.11 < 0.5 ? 1 : 0;
  };
  const layout = () => {
    const box = list.getBoundingClientRect();
    width = box.width + PAD * 2;
    height = box.height + PAD * 2;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.style.left = canvas.style.top = `${-PAD}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    // Layout boxes, not getBoundingClientRect: they ignore transforms, so a card mid-way
    // through an animation can't leave its border drawn in the wrong place.
    cards.forEach((card, i) => {
      rects.set([card.offsetLeft + PAD, card.offsetTop + PAD, card.offsetWidth, card.offsetHeight], i * 4);
    });
    radius = parseFloat(getComputedStyle(cards[0]).borderTopLeftRadius) || 14;
  };

  const draw = (now: number) => {
    const t = (now - t0) / 1000;
    const dt = last ? Math.min(0.05, t - last) : 0;
    last = t;
    mx += (tx - mx) * EASE;
    my += (ty - my) * EASE;
    let moving = Math.hypot(tx - mx, ty - my) > 0.3;
    for (let i = 0; i < cards.length; i++) {
      const g = glows[i] + (target[i] - glows[i]) * Math.min(1, dt * 7);
      glows[i] = Math.abs(g - target[i]) < 0.003 ? target[i] : g;
      if (glows[i] !== target[i] || glows[i] > 0) moving = true;
    }
    a += SPIN * 1.4 * speed(t) * dt;
    tilt += 0.35 * twist(t) * dt;
    const r = ORBIT * (0.85 + 0.25 * breath(t));
    const ox = Math.cos(a) * r, oy = Math.sin(a) * r * (0.7 + 0.15 * squash(t));
    const dx = ox * Math.cos(tilt) - oy * Math.sin(tilt);
    const dy = ox * Math.sin(tilt) + oy * Math.cos(tilt);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(U.res, width, height);
    gl.uniform1f(U.dpr, dpr);
    gl.uniform4fv(U.rects, rects);
    gl.uniform1fv(U.glows, glows);
    gl.uniform1i(U.count, cards.length);
    gl.uniform1f(U.radius, radius);
    gl.uniform2f(U.mouse, mx, my);
    gl.uniform2f(U.blobA, mx + dx, my + dy);
    gl.uniform2f(U.blobB, mx - dx * 0.85, my - dy * 0.85);
    gl.uniform1f(U.time, t);
    gl.uniform3f(U.line, ...line);
    gl.uniform1f(U.dark, dark);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = moving ? requestAnimationFrame(draw) : 0;
  };
  const kick = () => {
    if (!frame) {
      last = 0;
      frame = requestAnimationFrame(draw);
    }
  };

  // Mouse: the card under the cursor lights up, the others fade out.
  const local = (e: PointerEvent) => {
    const box = list.getBoundingClientRect();
    return [e.clientX - box.left + PAD, e.clientY - box.top + PAD] as const;
  };
  cards.forEach((card, i) => {
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      const wasLit = target.some((v) => v > 0);
      target.fill(0);
      target[i] = 1;
      [tx, ty] = local(e);
      if (!wasLit && glows.every((v) => v < 0.05)) [mx, my] = [tx, ty]; // start under the cursor
      kick();
    });
    card.addEventListener('pointerleave', () => {
      target[i] = 0;
      kick();
    });
  });
  list.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    [tx, ty] = local(e);
    kick();
  });

  colours();
  list.append(canvas); // last, so the cards' :nth-child() stays as it was
  list.classList.add('is-gl');
  layout();
  kick();

  new ResizeObserver(() => {
    layout();
    kick();
  }).observe(list);
  const recolour = () => {
    colours();
    kick();
  };
  new MutationObserver(recolour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolour);
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    list.classList.remove('is-gl');
    canvas.remove();
  });
  return true;
}
