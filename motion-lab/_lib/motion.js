// Shared helpers for motion-lab animations. Every animation is a pure function of time:
// render(t) sets every style, so scrubbing, ?t=4.2 and frame export always agree.

// ---------- Easing ----------
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Progress of t through [a, b], 0..1. */
const p = (t, a, b) => clamp((t - a) / (b - a));
const mix = (a, b, k) => a + (b - a) * k;
const io = (k) => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const outC = (k) => 1 - Math.pow(1 - k, 3);
const outQ = (k) => 1 - Math.pow(1 - k, 5);
const outBack = (k, s = 1.4) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2);
/** 0 → 1 → 0 over [at, at + dur]: presses, pulses. */
const bump = (t, at, dur) => Math.sin(Math.PI * p(t, at, at + dur));

/**
 * Cursor path: start point plus moves [from, to, x, y], in stage pixels. Returns (t) => [x, y].
 * Each move eases in and out along a slight arc: a straight line reads as a robot.
 */
function cursorPath(start, moves) {
  return (t) => {
    let [x, y] = start;
    for (const [a, b, tx, ty] of moves) {
      if (t <= a) break;
      const k = io(p(t, a, b));
      const dx = tx - x, dy = ty - y, len = Math.hypot(dx, dy) || 1;
      const bend = Math.sin(Math.PI * k) * Math.min(60, len * .12);
      const nx = x + dx * k - (dy / len) * bend, ny = y + dy * k + (dx / len) * bend;
      if (t < b) return [nx, ny];
      x = tx; y = ty;
    }
    return [x, y];
  };
}
