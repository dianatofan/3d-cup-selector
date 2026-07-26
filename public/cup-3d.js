/* <cup-3d> — lightweight three.js printed-cup viewer. Set .cups = [{body,band,text,opacity,h}] */
(() => {
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
  let threeP = null;
  const loadThree = () => (threeP ||= import(THREE_URL));
  const imgCache = {};
  const loadImg = (src) => (imgCache[src] ||= new Promise((res) => {
    const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src;
  }));

  function makeTexture(THREE, body, band, text, dark, spec = {}) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = body; g.fillRect(0, 0, 1024, 512);
    if (spec._imgEl) {
      // all-over print: stretch the uploaded design around the whole cup
      g.drawImage(spec._imgEl, 0, 0, 1024, 512);
    } else {
      g.fillStyle = band; g.fillRect(0, 150, 1024, 212);
      g.fillStyle = dark ? '#131313' : '#ffffff';
      g.font = '800 64px Archivo, Futura, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      const t = (text || 'YOUR LOGO').toUpperCase();
      g.fillText(t, 256, 258); g.fillText(t, 768, 258);
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = dark ? 'rgba(19,19,19,.55)' : 'rgba(255,255,255,.6)';
      g.font = '500 26px Archivo, Futura, sans-serif';
      for (const x of [256, 768]) g.fillText(spec.sub || '· PRINTED BY LIMEPACK ·', x, 320);
    }
    const tx = new THREE.CanvasTexture(c);
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.anisotropy = 4;
    return tx;
  }

  function makeCup(THREE, spec) {
    const grp = new THREE.Group();
    const h = 2.4 * (spec.h || 1), rT = spec.r || 1, rB = 0.7 * (spec.r || 1);
    const opac = spec.opacity ?? 1;
    const glossy = spec.finish === 'glossy';
    const doubleWall = spec.wall === 'double';
    // Matte = diffuse paper-like surface; glossy = tight specular + clearcoat sheen.
    const roughness = glossy ? 0.13 : 0.72;
    const matOpts = {
      map: makeTexture(THREE, spec.body || '#f6f5f0', spec.band || '#76B82A', spec.text, spec.darkText, spec),
      roughness, metalness: 0.02,
    };
    if (opac < 1) Object.assign(matOpts, { transparent: true, opacity: opac, side: THREE.DoubleSide });
    const mat = glossy
      ? new THREE.MeshPhysicalMaterial({ ...matOpts, clearcoat: 1, clearcoatRoughness: 0.1 })
      : new THREE.MeshStandardMaterial(matOpts);
    const bodyG = new THREE.CylinderGeometry(rT, rB, h, 64, 1, true);
    grp.add(new THREE.Mesh(bodyG, mat));
    // Interior wall — plain body colour (e.g. kraft brown for reusables), visible when tilted.
    const interior = new THREE.Mesh(
      new THREE.CylinderGeometry(rT * 0.98, rB * 0.98, h, 64, 1, true),
      new THREE.MeshStandardMaterial({ color: spec.interior || spec.body || '#f6f5f0', roughness: Math.max(roughness, 0.5), metalness: 0.02, side: THREE.BackSide, transparent: opac < 1, opacity: opac })
    );
    grp.add(interior);
    // Double-wall cups get a subtly thicker rolled rim — surface only, no added body.
    const rimTube = doubleWall ? 0.06 : 0.05;
    const rimMatOpts = { color: spec.rim || spec.body || '#f6f5f0', roughness: glossy ? 0.13 : 0.5, transparent: opac < 1, opacity: Math.min(1, opac + 0.25) };
    const rimMat = glossy
      ? new THREE.MeshPhysicalMaterial({ ...rimMatOpts, clearcoat: 1, clearcoatRoughness: 0.1 })
      : new THREE.MeshStandardMaterial(rimMatOpts);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(rT, rimTube, 20, 64), rimMat);
    rim.rotation.x = Math.PI / 2; rim.position.y = h / 2; grp.add(rim);
    const bot = new THREE.Mesh(
      new THREE.CircleGeometry(rB, 48),
      new THREE.MeshStandardMaterial({ color: spec.body || '#f6f5f0', roughness: 0.5, transparent: opac < 1, opacity: opac })
    );
    bot.rotation.x = -Math.PI / 2; bot.position.y = -h / 2; grp.add(bot);
    return grp;
  }

  class Cup3D extends HTMLElement {
    constructor() { super(); this._cups = null; this._ready = false; }
    set cups(v) {
      if (typeof v === 'string') { try { v = JSON.parse(v); } catch (e) { return; } }
      if (!Array.isArray(v)) return;
      this._cups = v; this._rebuild();
    }
    get cups() { return this._cups; }
    static get observedAttributes() { return ['cups']; }
    attributeChangedCallback(n, o, v) { if (n === 'cups' && v) { try { this.cups = v; } catch (e) {} } }
    connectedCallback() {
      if (this._init) return; this._init = true;
      if (!this.style.display) this.style.display = 'block';
      if (!this.style.height) this.style.height = '100%';
      const attr = this.getAttribute('cups');
      if (attr && !this._cups) { try { this._cups = JSON.parse(attr); } catch (e) {} }
      // Lazy boot: only create a WebGL context when actually visible (caps live contexts,
      // and screenshot clones never intersect so they never boot).
      this._io = new IntersectionObserver(es => {
        const vis = es.some(e => e.isIntersecting);
        this._vis = vis;
        if (vis && !this._booted) { this._booted = true; this._boot(); }
        else if (vis && this._suspended) { this._suspended = false; this._boot(); }
        else if (!vis && this._booted && !this._suspended && this._ready) this._suspend();
      }, { rootMargin: '300px' });
      this._io.observe(this);
      // Fallback: IO can be unreliable in embedded canvases — boot anyway if it stays silent.
      setTimeout(() => {
        if (this._vis === undefined && !this._booted) { this._vis = true; this._booted = true; this._boot(); }
      }, 500);
    }
    _suspend() {
      this._suspended = true; this._ready = false;
      try { this.renderer.forceContextLoss(); this.renderer.dispose(); } catch (e) {}
      try { this.renderer.domElement.remove(); } catch (e) {}
      this.renderer = null;
    }
    async _boot() {
      const THREE = await loadThree(); this.T = THREE;
      if (this._suspended) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;cursor:grab;touch-action:none';
      renderer.domElement.addEventListener('webglcontextlost', e => e.preventDefault());
      renderer.domElement.addEventListener('webglcontextrestored', () => { this._size(); this._rebuild(); });
      this.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 0xcfcfc8, 1.35));
      const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(2.5, 4, 3); scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-3, 1, -2.5); scene.add(fill);
      const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
      const grp = new THREE.Group(); scene.add(grp);
      Object.assign(this, { renderer, scene, cam, grp });
      this._ready = true; this._rebuild();
      const ro = new ResizeObserver(() => this._size()); ro.observe(this); this._size();
      // user-driven rotation with inertia (no infinite auto-spin)
      let dragging = false, lastX = 0, lastY = 0;
      this._vel = 0;
      const TILT = 1.4; // clamp vertical tilt (~80°) — enough to look into the cup and at its base, without flipping over
      const el = renderer.domElement;
      el.addEventListener('pointerdown', e => {
        dragging = true; lastX = e.clientX; lastY = e.clientY; this._vel = 0;
        el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing';
      });
      el.addEventListener('pointermove', e => {
        if (!dragging) return;
        const dx = e.clientX - lastX; lastX = e.clientX;
        const dy = e.clientY - lastY; lastY = e.clientY;
        grp.rotation.y += dx * 0.011; this._vel = dx * 0.011;
        // vertical drag tilts the cup so you can look into it / see its base
        grp.rotation.x = Math.max(-TILT, Math.min(TILT, grp.rotation.x + dy * 0.011));
      });
      const end = e => { dragging = false; el.style.cursor = 'grab'; };
      el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
      let lastTouch = 0;
      el.addEventListener('pointerdown', () => { lastTouch = performance.now(); });
      el.addEventListener('pointermove', () => { if (dragging) lastTouch = performance.now(); });
      const tick = () => {
        if (this._suspended || this.renderer !== renderer) return;
        requestAnimationFrame(tick);
        if (!this._vis) return;
        if (!dragging && Math.abs(this._vel) > 0.0001) { grp.rotation.y += this._vel; this._vel *= 0.94; }
        else if (!dragging && performance.now() - lastTouch > 2500) grp.rotation.y += 0.0014; // gentle idle spin
        renderer.render(scene, cam);
      };
      tick();
    }
    _size() {
      if (!this._ready) return;
      const w = this.clientWidth || 300, h = this.clientHeight || 300;
      this.renderer.setSize(w, h, false);
      this.cam.aspect = w / h; this.cam.updateProjectionMatrix();
    }
    _rebuild() {
      if (!this._ready || !this._cups) return;
      const seq = this._seq = (this._seq || 0) + 1;
      const cups = this._cups;
      Promise.all(cups.map(c => c.img ? loadImg(c.img) : null)).then(imgs => {
        if (seq !== this._seq || this._cups !== cups) return;
        cups.forEach((c, i) => { c._imgEl = imgs[i]; });
        this._build(cups);
      });
    }
    _build(cups) {
      const T = this.T, grp = this.grp;
      while (grp.children.length) grp.remove(grp.children[0]);
      const n = cups.length;
      cups.forEach((spec, i) => {
        const cup = makeCup(T, spec);
        const x = (i - (n - 1) / 2) * 2.55;
        cup.position.set(x, 0, i === Math.floor(n / 2) && n > 1 ? 0.55 : 0);
        cup.rotation.y = i * 0.9;
        grp.add(cup);
      });
      const maxH = Math.max(...cups.map(c => 2.4 * (c.h || 1)));
      // Single cup: partially compensate camera distance for height so a taller cup
      // reads bigger, while still pulling back enough that the tallest (450 ml) fits
      // with a comfortable margin (≈0.4 world units above/below the cup).
      const d = n > 2 ? 9.2 : n === 2 ? 7 : 5.8 * (0.46 + 0.64 * (maxH / 2.7));
      this.cam.position.set(0, 1.5, d);
      this.cam.lookAt(0, 0.1, 0);
    }
  }
  if (!customElements.get('cup-3d')) customElements.define('cup-3d', Cup3D);
})();
