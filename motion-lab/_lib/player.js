// Player for a motion-lab animation: fits the stage to the window and adds the control bar
// (play, scrubber with named markers, speed, Figma reference overlay).
//
//   MotionPlayer.mount({
//     stage: document.getElementById('stage'),  // fixed-size element, e.g. 1920×1080
//     width: 1920, height: 1080,
//     duration: 18.2,                            // loop length, seconds
//     render: (t) => { … },                      // draws the exact moment t
//     markers: [['slot', 1.6], …],               // clickable labels on the scrubber
//     refs: [['Schedule', 'src/1-schedule.png'], …], // Figma frames to compare against
//     poster: 11.2,                              // frame export.mjs saves as the poster image
//   });
//
// Keys: Space play/pause · ←/→ 0.1 s (Shift: 1 s) · R cycle reference · D reference as difference.
// URL: ?t=4.2 opens paused at 4.2 s · ?clean hides the bar (for recording).
// Export (motion-lab/export.mjs) drives window.renderAt(t) and reads window.DURATION.
(function () {
  function mount({ stage, width = 1920, height = 1080, duration, render, markers = [], refs = [], poster = 0 }) {
    const params = new URLSearchParams(location.search);
    if (params.has('clean')) document.body.classList.add('ml-clean');
    let time = parseFloat(params.get('t')) || 0;
    let playing = !params.has('t');
    let speed = 1, lastNow = null;

    const el = (tag, cls, html) => Object.assign(document.createElement(tag), { className: cls, innerHTML: html || '' });
    const viewport = el('div', 'ml-viewport');
    stage.before(viewport);
    viewport.appendChild(stage);
    Object.assign(stage.style, { width: width + 'px', height: height + 'px' });

    const ref = el('img', 'ml-ref');
    Object.assign(ref, { alt: '', hidden: true });
    Object.assign(ref.style, { width: width + 'px', height: height + 'px' });
    stage.appendChild(ref);

    const bar = el('div', 'ml-bar', `
      <button data-play title="Space">Pause</button>
      <div class="ml-track"><div class="ml-track__rail"></div><div class="ml-track__fill"></div><div class="ml-track__head"></div></div>
      <span class="ml-time"></span>
      <select data-speed title="Playback speed">
        <option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option>
      </select>
      <select data-ref title="Overlay a Figma frame to check the match (R cycles, D difference)">
        <option value="">No reference</option>
        ${refs.map(([label, src], i) => `<option value="${src}">Ref ${i + 1} · ${label}</option>`).join('')}
      </select>
      <span class="ml-hint">Space play · ←/→ 0.1 s · Shift 1 s · R reference · D diff</span>`);
    document.body.appendChild(bar);
    const q = (s) => bar.querySelector(s);
    const track = q('.ml-track'), fill = q('.ml-track__fill'), head = q('.ml-track__head');
    const timeEl = q('.ml-time'), playBtn = q('[data-play]'), refSel = q('[data-ref]');

    const fit = () => {
      const s = Math.min(viewport.clientWidth / width, viewport.clientHeight / height);
      stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    addEventListener('resize', fit);
    fit();

    for (const [name, at] of markers) {
      const m = el('div', 'ml-track__mark', name);
      m.style.left = (at / duration) * 100 + '%';
      m.onclick = (e) => { e.stopPropagation(); seek(at - .3); };
      track.appendChild(m);
    }

    function draw() {
      render(time);
      const k = (time / duration) * 100;
      fill.style.width = k + '%';
      head.style.left = k + '%';
      timeEl.textContent = `${time.toFixed(2)} / ${duration.toFixed(1)} s`;
      playBtn.textContent = playing ? 'Pause' : 'Play';
    }
    function seek(t) { time = (t + duration) % duration; draw(); }
    function tick(now) {
      if (playing && lastNow !== null) time = (time + ((now - lastNow) / 1000) * speed) % duration;
      lastNow = now;
      draw();
      requestAnimationFrame(tick);
    }

    playBtn.onclick = () => { playing = !playing; };
    q('[data-speed]').onchange = (e) => { speed = +e.target.value; };
    refSel.onchange = () => {
      ref.hidden = !refSel.value;
      if (refSel.value) ref.src = refSel.value;
      ref.style.opacity = ref.style.mixBlendMode ? 1 : .5;
    };
    let dragging = false;
    const scrub = (e) => {
      const r = track.getBoundingClientRect();
      seek(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * duration * .9999);
    };
    track.onpointerdown = (e) => { dragging = true; playing = false; track.setPointerCapture(e.pointerId); scrub(e); };
    track.onpointermove = (e) => dragging && scrub(e);
    track.onpointerup = () => { dragging = false; };
    addEventListener('keydown', (e) => {
      if (e.target.closest?.('select')) return;
      if (e.code === 'Space') { e.preventDefault(); playing = !playing; }
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        playing = false;
        seek(time + (e.code === 'ArrowRight' ? 1 : -1) * (e.shiftKey ? 1 : .1));
      }
      // D: the reference as a difference, so anything off by a pixel lights up.
      if (e.code === 'KeyD') {
        ref.style.mixBlendMode = ref.style.mixBlendMode ? '' : 'difference';
        ref.style.opacity = ref.style.mixBlendMode ? 1 : .5;
      }
      if (e.code === 'KeyR') {
        refSel.selectedIndex = (refSel.selectedIndex + 1) % refSel.options.length;
        refSel.onchange();
      }
    });

    window.DURATION = duration;
    window.POSTER = poster;
    window.renderAt = (t) => { playing = false; time = t; draw(); };
    document.fonts.ready.then(() => requestAnimationFrame(tick));
  }

  window.MotionPlayer = { mount };
})();
