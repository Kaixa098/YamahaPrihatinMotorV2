/**
 * hero-grid-3d.js — Yamaha Prihatin Motor
 * WebGL racing grid wireframe animasi untuk hero section motor-detail.html
 *
 * Teknik:
 *  - Three.js (core + WebGLRenderer + PlaneGeometry) via CDN ES module import
 *  - Wireframe PlaneGeometry scroll maju simulasi "racing HUD" / tunnel grid
 *  - IntersectionObserver: pause render saat hero keluar viewport
 *  - visibilitychange: pause saat tab hidden
 *  - prefers-reduced-motion: fallback ke CSS gradient, no WebGL
 *  - WebGL unavailable: silent fail, CSS gradient tetap terlihat
 */

'use strict';

export async function initHeroGrid3D(heroEl) {
    if (!heroEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobileLow = window.innerWidth < 400 && window.devicePixelRatio < 2;
    if (isMobileLow) return;

    let THREE;
    try {
        THREE = await import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js');
    } catch (e) {
        console.warn('[hero-grid-3d] Three.js load failed, using CSS fallback.', e);
        return;
    }

    const testCanvas = document.createElement('canvas');
    const testCtx = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!testCtx) return;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, heroEl.offsetWidth / heroEl.offsetHeight, 0.1, 80);
    camera.position.set(0, 2.8, 0);
    camera.rotation.x = -Math.PI * 0.28;

    const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(heroEl.offsetWidth, heroEl.offsetHeight);

    const cvs = renderer.domElement;
    cvs.style.cssText = [
        'position:absolute',
        'inset:0',
        'width:100%',
        'height:100%',
        'pointer-events:none',
        'z-index:0',
        'opacity:0',
        'transition:opacity 0.8s ease',
    ].join(';');

    heroEl.insertBefore(cvs, heroEl.firstChild);
    if (getComputedStyle(heroEl).position === 'static') {
        heroEl.style.position = 'relative';
    }

    function makeGrid(segsX, segsY, sizeX, sizeY, color, opacity) {
        const geo = new THREE.PlaneGeometry(sizeX, sizeY, segsX, segsY);
        const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            wireframe: true,
            transparent: true,
            opacity: opacity,
            depthWrite: false,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        return mesh;
    }

    const gridMain   = makeGrid(8, 40, 20, 80, '#1a3a6b', 0.45);
    const gridAccent = makeGrid(4, 20, 20, 80, '#7f0000', 0.18);
    scene.add(gridMain);
    scene.add(gridAccent);

    requestAnimationFrame(() => { cvs.style.opacity = '1'; });

    let rafId     = null;
    let isVisible = false;
    const speed   = 0.018;
    const WRAP_Z  = 2;

    function animate() {
        gridMain.position.z   = (gridMain.position.z   + speed) % WRAP_Z;
        gridAccent.position.z = (gridAccent.position.z + speed * 0.6) % WRAP_Z;
        renderer.render(scene, camera);
        if (isVisible) rafId = requestAnimationFrame(animate);
        else rafId = null;
    }

    function startRender() { if (!rafId) animate(); }
    function stopRender()  { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

    window.addEventListener('resize', () => {
        const w = heroEl.offsetWidth;
        const h = heroEl.offsetHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }, { passive: true });

    const visObs = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
        isVisible ? startRender() : stopRender();
    }, { threshold: 0.01 });
    visObs.observe(heroEl);

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopRender() : (isVisible && startRender());
    });
}
