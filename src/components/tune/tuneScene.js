import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { STEPS } from './tuneSteps';

// Procedural PC built from primitives (no model files to download).
// Case is open on +z; x = front(-) / rear(+), y = up. Each moving part is a
// group the scroll timeline pushes out and highlights.

const PURPLE = 0xbb86fc;
const PINK = 0xff79c6;

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (v) => Math.min(1, Math.max(0, v));
// 0→1 as p moves from a to b
const ramp = (p, a, b) => smooth(clamp01((p - a) / (b - a)));

// ---------- materials (factories: every part gets its own instances so
// highlighting one part never lights up another) ----------
const std = (color, metalness, roughness) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
const M = {
  caseMetal: () => std(0x0e0b15, 0.6, 0.45),
  pcb: (c = 0x15111f) => std(c, 0.2, 0.75),
  gold: () => std(0xd8a842, 1, 0.28),
  silver: () => std(0xc9ccd4, 1, 0.3),
  alu: () => std(0xa3a8b3, 0.95, 0.38),
  copper: () => std(0xc8743d, 1, 0.3),
  darkMetal: () => std(0x26232e, 0.85, 0.4),
  plastic: (c = 0x131118) => std(c, 0.1, 0.6),
  chip: () => std(0x0b0b0e, 0.3, 0.5),
  glow: (c) => new THREE.MeshBasicMaterial({ color: c }),
};

// ---------- small builders ----------
function box(w, h, d, mat, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  parent?.add(m);
  return m;
}

function cyl(r, h, mat, x = 0, y = 0, z = 0, parent, segments = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, segments), mat);
  m.position.set(x, y, z);
  parent?.add(m);
  return m;
}

function edges(mesh, color = PURPLE, opacity = 0.6) {
  mesh.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  ));
  return mesh;
}

// Many identical thin plates (heatsink fins) as one draw call
function finStack(count, w, h, d, mat, place, parent) {
  const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, d), mat, count);
  const m = new THREE.Matrix4();
  for (let i = 0; i < count; i++) inst.setMatrixAt(i, m.makeTranslation(...place(i)));
  parent.add(inst);
  return inst;
}

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Box with a texture on its +z face only
function labeledBox(w, h, d, sideMat, faceMat) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [sideMat, sideMat, sideMat, sideMat, faceMat, sideMat]);
}

// Fan facing +z. Returns the group; its spinning rotor is userData.rotor.
function fan(size, { ring = PINK, frame = true } = {}) {
  const g = new THREE.Group();
  if (frame) {
    const t = size * 0.08;
    const fm = M.plastic(0x16131c);
    box(size, t, 0.05, fm, 0, size / 2 - t / 2, 0, g);
    box(size, t, 0.05, fm, 0, -size / 2 + t / 2, 0, g);
    box(t, size, 0.05, fm, size / 2 - t / 2, 0, 0, g);
    box(t, size, 0.05, fm, -size / 2 + t / 2, 0, 0, g);
  }
  const r = size * 0.44;
  g.add(new THREE.Mesh(new THREE.TorusGeometry(r, size * 0.022, 10, 48), M.glow(ring)));
  const rotor = new THREE.Group();
  g.add(rotor);
  cyl(size * 0.13, 0.04, M.plastic(0x1c1924), 0, 0, 0, rotor, 24).rotation.x = Math.PI / 2;
  const bladeMat = std(0x1d1a26, 0.2, 0.5);
  for (let i = 0; i < 7; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.z = (i / 7) * Math.PI * 2;
    box(r * 0.8, size * 0.16, 0.006, bladeMat, size * 0.13 + r * 0.4, 0, 0, pivot).rotation.x = 0.5; // pitch
    rotor.add(pivot);
  }
  g.userData.rotor = rotor;
  return g;
}

// ---------- textures ----------
const gradient = (g, w) => {
  const t = g.createLinearGradient(0, 0, w, 0);
  t.addColorStop(0, '#bb86fc');
  t.addColorStop(1, '#ff79c6');
  return t;
};

const ihsTexture = () =>
  canvasTexture(256, 256, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#d9dce3');
    grad.addColorStop(0.5, '#b7bbc5');
    grad.addColorStop(1, '#cfd2da');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#7d828e';
    g.textAlign = 'center';
    g.font = 'bold 30px Poppins, Arial, sans-serif';
    g.fillText('AMD RYZEN 7', w / 2, 100);
    g.font = 'bold 40px Poppins, Arial, sans-serif';
    g.fillText('9800X3D', w / 2, 146);
    g.font = '18px Poppins, Arial, sans-serif';
    g.fillText('8-CORE · 3D V-CACHE', w / 2, 180);
    g.beginPath(); // pin-1 marker
    g.moveTo(18, 18);
    g.lineTo(46, 18);
    g.lineTo(18, 46);
    g.fill();
  });

const traceTexture = () =>
  canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = '#17121f';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(187,134,252,0.16)';
    g.lineWidth = 2;
    for (let i = 0; i < 70; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;
      g.beginPath();
      g.moveTo(x, y);
      for (let s = 0; s < 3; s++) {
        if (Math.random() > 0.5) x += (Math.random() - 0.5) * 160;
        else y += (Math.random() - 0.5) * 160;
        g.lineTo(x, y);
      }
      g.stroke();
    }
  });

const ssdLabelTexture = () =>
  canvasTexture(512, 128, (g, w, h) => {
    g.fillStyle = '#121019';
    g.fillRect(0, 0, w, h);
    g.fillStyle = gradient(g, w);
    g.fillRect(0, 0, 14, h);
    g.fillStyle = '#f4f0fb';
    g.font = 'bold 46px Poppins, Arial, sans-serif';
    g.fillText('NVMe SSD', 40, 62);
    g.fillStyle = '#a9a3b8';
    g.font = '28px Poppins, Arial, sans-serif';
    g.fillText('2TB · PCIe 4.0', 40, 104);
  });

const gpuLogoTexture = () =>
  canvasTexture(512, 64, (g, w) => {
    g.fillStyle = '#0d0b12';
    g.fillRect(0, 0, w, 64);
    g.fillStyle = gradient(g, w);
    g.font = 'bold 36px Poppins, Arial, sans-serif';
    g.textAlign = 'center';
    g.fillText('GEFORCE RTX 5090', w / 2, 45);
  });

const rgbTexture = () =>
  canvasTexture(256, 8, (g, w, h) => {
    const t = g.createLinearGradient(0, 0, w, 0);
    t.addColorStop(0, '#bb86fc');
    t.addColorStop(0.5, '#ff79c6');
    t.addColorStop(1, '#bb86fc');
    g.fillStyle = t;
    g.fillRect(0, 0, w, h);
  });

const biosTexture = () =>
  canvasTexture(128, 80, (g, w, h) => {
    g.fillStyle = '#0d0c10';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#9b95a8';
    g.font = 'bold 22px Arial, sans-serif';
    g.fillText('BIOS', 34, 36);
    g.font = '14px Arial, sans-serif';
    g.fillText('25Q256', 34, 58);
    g.beginPath();
    g.arc(14, 14, 5, 0, Math.PI * 2);
    g.fill();
  });

// ---------- components ----------
function buildCase(fans) {
  const shell = new THREE.Group();
  const wall = (w, h, d, x, y, z) => shell.add(edges(box(w, h, d, M.caseMetal(), x, y, z), PURPLE, 0.7));
  wall(2.0, 2.2, 0.05, 0, 0, -0.5); // back
  wall(2.0, 0.05, 1.0, 0, 1.1, 0); // top
  wall(2.0, 0.05, 1.0, 0, -1.1, 0); // bottom
  wall(0.05, 2.2, 1.0, -1.0, 0, 0); // front
  wall(0.05, 2.2, 1.0, 1.0, 0, 0); // rear

  // Front intake fans, mounted on the outside of the front panel
  for (const y of [0.5, -0.1]) {
    const f = fan(0.5);
    f.rotation.y = -Math.PI / 2;
    f.position.set(-1.05, y, 0);
    shell.add(f);
    fans.push([f.userData.rotor, 5]);
  }
  // Rear exhaust fan
  const rear = fan(0.38, { ring: PURPLE });
  rear.rotation.y = Math.PI / 2;
  rear.position.set(0.95, 0.68, 0);
  shell.add(rear);
  fans.push([rear.userData.rotor, -5]);

  // PSU shroud with a light strip along its front edge
  shell.add(edges(box(1.9, 0.38, 0.9, M.plastic(0x120e1a), 0, -0.88, 0), PURPLE, 0.5));
  box(1.6, 0.012, 0.012, M.glow(PURPLE), 0, -0.7, 0.45, shell);
  return shell;
}

function buildMotherboard() {
  const g = new THREE.Group();
  const face = new THREE.MeshStandardMaterial({ map: traceTexture(), metalness: 0.2, roughness: 0.75 });
  const pcb = labeledBox(1.5, 1.55, 0.03, M.pcb(), face);
  pcb.position.set(0.1, 0.25, 0);
  g.add(pcb);

  box(0.36, 0.36, 0.016, M.alu(), 0.1, 0.5, 0.02, g); // CPU socket
  // VRM heatsinks (with fin grooves) around the socket
  const vrm = M.darkMetal();
  box(0.52, 0.12, 0.08, vrm, 0.1, 0.83, 0.055, g);
  box(0.12, 0.44, 0.08, vrm, -0.24, 0.5, 0.055, g);
  const groove = M.alu();
  for (let i = 0; i < 6; i++) box(0.5, 0.006, 0.012, groove, 0.1, 0.785 + i * 0.018, 0.1, g);
  box(0.44, 0.01, 0.01, M.glow(PINK), 0.1, 0.77, 0.096, g);
  // Rear I/O cover with accent line
  box(0.2, 0.45, 0.12, M.darkMetal(), 0.73, 0.73, 0.07, g);
  box(0.008, 0.38, 0.008, M.glow(PURPLE), 0.63, 0.73, 0.13, g);
  // RAM slots
  const slot = M.plastic(0x2a2533);
  for (let i = 0; i < 4; i++) box(0.026, 0.66, 0.03, slot, 0.5 + i * 0.075, 0.5, 0.03, g);
  // Armored PCIe x16 slot + small x1 slot
  box(0.74, 0.035, 0.032, M.silver(), 0.38, -0.3, 0.03, g);
  box(0.22, 0.03, 0.03, slot, 0.13, 0.08, 0.03, g);
  // Chipset heatsink
  box(0.26, 0.1, 0.04, M.darkMetal(), 0.55, -0.46, 0.035, g);
  box(0.2, 0.008, 0.006, M.glow(PINK), 0.55, -0.46, 0.057, g);
  // CMOS coin battery
  cyl(0.05, 0.012, M.silver(), -0.48, -0.32, 0.024, g, 32).rotation.x = Math.PI / 2;
  // 24-pin power connector
  box(0.05, 0.26, 0.06, M.plastic(0x1e1b24), 0.82, 0.28, 0.04, g);
  // Capacitors below the socket
  const cap = M.darkMetal();
  for (let i = 0; i < 5; i++) cyl(0.016, 0.04, cap, -0.1 + i * 0.06, 0.25, 0.035, g, 12).rotation.x = Math.PI / 2;
  return g;
}

function buildCPU() {
  const g = new THREE.Group();
  box(0.26, 0.26, 0.014, M.pcb(0x1f5130), 0, 0, 0, g); // green substrate
  const smd = M.gold();
  for (const [x, y] of [[-0.11, -0.11], [0.11, -0.11], [-0.11, 0.11], [0.11, 0.11]]) {
    box(0.012, 0.012, 0.006, smd, x, y, 0.009, g); // SMD caps
  }
  const ihsFace = new THREE.MeshStandardMaterial({ map: ihsTexture(), metalness: 0.85, roughness: 0.35 });
  const ihs = labeledBox(0.2, 0.2, 0.018, M.silver(), ihsFace); // heat spreader lid
  ihs.position.z = 0.016;
  g.add(ihs);
  box(0.24, 0.24, 0.004, M.gold(), 0, 0, -0.009, g); // contact pads underneath
  return g;
}

function buildCooler(fans) {
  const g = new THREE.Group();
  box(0.2, 0.2, 0.04, M.copper(), 0, 0, 0.04, g); // base plate
  // Heat pipes: out from the base, then up through the fin stack
  const pipe = M.copper();
  for (const x of [-0.09, -0.03, 0.03, 0.09]) {
    cyl(0.012, 0.18, pipe, x, -0.04, 0.14, g, 12).rotation.x = Math.PI / 2;
    cyl(0.012, 0.58, pipe, x, 0, 0.24, g, 12);
  }
  // Aluminium fin stack (horizontal plates stacked vertically)
  finStack(18, 0.42, 0.007, 0.3, M.alu(), (i) => [0, -0.24 + i * 0.028, 0.25], g);
  // Top cover with a glowing edge
  box(0.44, 0.03, 0.32, M.darkMetal(), 0, 0.27, 0.25, g);
  box(0.44, 0.008, 0.008, M.glow(PINK), 0, 0.27, 0.412, g);
  // Fan clipped on the front side of the stack
  const f = fan(0.48, { ring: PURPLE });
  f.rotation.y = -Math.PI / 2;
  f.position.set(-0.25, 0, 0.25);
  g.add(f);
  fans.push([f.userData.rotor, 7]);
  return g;
}

function buildRAM() {
  const g = new THREE.Group();
  const pcb = M.pcb(0x101018);
  const spreader = M.darkMetal();
  const contacts = M.gold();
  const light = new THREE.MeshBasicMaterial({ map: rgbTexture() });
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Group();
    box(0.012, 0.6, 0.13, pcb, 0, 0, 0.08, s);
    box(0.008, 0.6, 0.12, spreader, -0.011, 0, 0.085, s); // heat spreaders
    box(0.008, 0.6, 0.12, spreader, 0.011, 0, 0.085, s);
    box(0.03, 0.58, 0.025, light, 0, 0, 0.158, s); // light bar
    box(0.014, 0.56, 0.012, contacts, 0, 0, 0.012, s); // gold contacts
    s.position.x = i * 0.075;
    g.add(s);
  }
  return g;
}

function buildGPU(fans) {
  const g = new THREE.Group();
  box(1.38, 0.015, 0.5, M.pcb(0x111018), 0, 0.07, 0, g); // PCB
  box(1.42, 0.012, 0.52, M.darkMetal(), 0, 0.085, 0, g); // backplate
  box(0.5, 0.004, 0.02, M.glow(PURPLE), -0.3, 0.092, 0.2, g); // backplate accent
  finStack(40, 0.006, 0.075, 0.46, M.alu(), (i) => [-0.64 + i * 0.033, 0.022, 0], g); // heatsink
  box(1.45, 0.03, 0.55, M.plastic(0x18151f), 0, -0.03, 0, g); // shroud
  // Three fans on the underside
  for (const x of [-0.47, 0, 0.47]) {
    const f = fan(0.42, { frame: false, ring: x === 0 ? PINK : PURPLE });
    f.rotation.x = Math.PI / 2;
    f.position.set(x, -0.05, 0);
    g.add(f);
    fans.push([f.userData.rotor, 9]);
  }
  // Glowing logo strip on the edge facing the glass
  const strip = labeledBox(0.9, 0.06, 0.008, M.plastic(0x18151f), new THREE.MeshBasicMaterial({ map: gpuLogoTexture() }));
  strip.position.set(-0.05, 0, 0.279);
  g.add(strip);
  box(0.02, 0.24, 0.6, M.silver(), 0.735, 0.03, -0.02, g); // I/O bracket
  box(0.42, 0.01, 0.03, M.gold(), 0.18, 0.07, -0.265, g); // PCIe gold fingers
  box(0.12, 0.04, 0.03, M.plastic(0x1e1b24), -0.3, 0.1, 0.22, g); // power connector
  return g;
}

function buildSSD() {
  const g = new THREE.Group();
  box(0.5, 0.11, 0.008, M.pcb(0x101018), 0, 0, 0, g);
  box(0.09, 0.08, 0.012, M.chip(), -0.15, 0, 0.009, g); // controller
  box(0.3, 0.085, 0.012, M.chip(), 0.06, 0, 0.009, g); // NAND
  const label = labeledBox(0.32, 0.095, 0.003, M.chip(), new THREE.MeshBasicMaterial({ map: ssdLabelTexture() }));
  label.position.set(0.06, 0, 0.017); // sticker over the NAND
  g.add(label);
  box(0.03, 0.09, 0.004, M.gold(), -0.255, 0, 0, g); // M.2 connector
  cyl(0.014, 0.012, M.silver(), 0.245, 0, 0.004, g, 16).rotation.x = Math.PI / 2; // screw
  return g;
}

function buildBIOS() {
  const g = new THREE.Group();
  const face = new THREE.MeshStandardMaterial({ map: biosTexture(), metalness: 0.3, roughness: 0.5 });
  g.add(labeledBox(0.1, 0.065, 0.024, M.chip(), face));
  const pin = M.silver();
  for (let i = 0; i < 4; i++) {
    const x = -0.036 + i * 0.024;
    box(0.01, 0.016, 0.006, pin, x, 0.038, -0.008, g);
    box(0.01, 0.016, 0.006, pin, x, -0.038, -0.008, g);
  }
  return g;
}

function buildPC(fans) {
  const pc = new THREE.Group();
  const parts = {};

  pc.add(buildCase(fans));

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 2.2, 0.03),
    new THREE.MeshPhysicalMaterial({ color: 0x9a7cff, transparent: true, opacity: 0.12, roughness: 0.1, metalness: 0 })
  );
  edges(glass, PURPLE, 0.9);
  glass.position.set(0, 0, 0.52);
  pc.add(glass);
  parts.panel = glass;

  const place = (key, obj, x, y, z) => {
    obj.position.set(x, y, z);
    pc.add(obj);
    parts[key] = obj;
  };
  place('mobo', buildMotherboard(), 0, 0, -0.44);
  place('cpu', buildCPU(), 0.1, 0.5, -0.405);
  place('cooler', buildCooler(fans), 0.1, 0.5, -0.4);
  place('ram', buildRAM(), 0.5, 0.5, -0.42);
  place('gpu', buildGPU(fans), 0.1, -0.3, -0.12);
  place('ssd', buildSSD(), 0.28, 0.06, -0.415);
  place('bios', buildBIOS(), -0.32, -0.02, -0.41);

  for (const [key, p] of Object.entries(parts)) {
    p.userData.home = p.position.clone();
    if (key === 'panel') continue;
    // Pre-set the highlight colour; its intensity is animated per frame
    p.traverse((o) => [].concat(o.material || []).forEach((m) => m.emissive?.setHex(PINK)));
  }
  return { pc, parts };
}

// What moves in each step: [part, direction, scale when fully out]
const MOVES = {
  cpu: [
    ['cooler', new THREE.Vector3(-0.15, 1.15, 0.75), 1],
    ['cpu', new THREE.Vector3(-0.2, 0.25, 1.55), 2.6],
  ],
  ram: [['ram', new THREE.Vector3(1.15, 0.7, 0.9), 1.15]],
  gpu: [['gpu', new THREE.Vector3(0.15, -0.1, 1.45), 1]],
  board: [['bios', new THREE.Vector3(-0.35, 0.15, 1.55), 3.4]],
  ssd: [['ssd', new THREE.Vector3(1.2, -0.4, 1.2), 2.0]],
};

export function createTuneScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  // Soft studio reflections so metal parts read as metal
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.35, 8.2);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const key = new THREE.PointLight(PURPLE, 30, 20);
  key.position.set(3, 3, 4);
  scene.add(key);
  const fill = new THREE.PointLight(PINK, 22, 20);
  fill.position.set(-3, -1.5, 3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x8fb4ff, 0.6);
  rim.position.set(0, 4, -4);
  scene.add(rim);

  const fans = [];
  const { pc, parts } = buildPC(fans);
  scene.add(pc);

  let target = 0;
  let current = 0;
  let raf = 0;
  let running = false;
  let compact = false;
  let last = performance.now();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // On narrow screens, pull back so the exploded parts fit
    compact = w < 700;
    camera.position.z = compact ? 10.5 : 8.2;
    camera.updateProjectionMatrix();
  };

  const setHighlight = (obj, amount) => {
    obj.traverse((o) => [].concat(o.material || []).forEach((m) => {
      if ('emissiveIntensity' in m) m.emissiveIntensity = amount * 0.16;
    }));
  };

  const apply = (p, dt) => {
    const t = performance.now() / 1000;
    // Opens facing the front fans, swings round to the glass side, then keeps
    // drifting slowly while the parts come out
    const swing = ramp(p, 0, 0.18);
    pc.rotation.y = 0.9 - swing * 1.6 + p * 0.9 + Math.sin(t * 0.6) * 0.03;
    pc.rotation.x = 0.08;
    // Desktop: shift right so the info card on the left has room.
    // Phones: shift up so the caption at the bottom doesn't cover it.
    pc.position.x = compact ? 0 : 0.9;
    pc.position.y = (compact ? 0.9 : 0) + Math.sin(t * 0.9) * 0.03;

    for (const [rotor, speed] of fans) rotor.rotation.z += speed * dt;

    // Reassemble at the end
    const reassemble = ramp(p, 0.9, 0.98);

    // Panel lifts off, then returns
    const panelOut = ramp(p, 0.1, 0.2) * (1 - reassemble);
    parts.panel.position.set(0, panelOut * 2.6, 0.52 + panelOut * 0.6);
    parts.panel.material.opacity = 0.12 * (1 - panelOut);
    parts.panel.children[0].material.opacity = 0.9 * (1 - panelOut);
    parts.panel.visible = panelOut < 0.99;

    for (const step of STEPS) {
      const [a, b] = step.at;
      const out = ramp(p, a, a + (b - a) * 0.45) * (1 - reassemble);
      const focusTarget = p >= a && p < b ? 1 : 0;
      for (const [name, dir, grow] of MOVES[step.part]) {
        const obj = parts[name];
        // Narrow screens: keep parts inside the frame by trading sideways travel for depth
        obj.position.copy(obj.userData.home);
        obj.position.x += dir.x * (compact ? 0.35 : 1) * out;
        obj.position.y += dir.y * out;
        obj.position.z += (dir.z + (compact ? Math.abs(dir.x) * 0.4 : 0)) * out;
        obj.userData.focus = (obj.userData.focus ?? 0) + (focusTarget - (obj.userData.focus ?? 0)) * 0.12;
        // Full size while in focus, shrinks back once the next part takes over
        obj.scale.setScalar(1 + (grow - 1) * out * (0.3 + 0.7 * obj.userData.focus));
        setHighlight(obj, obj.userData.focus);
      }
      if (step.part === 'board') setHighlight(parts.mobo, parts.bios.userData.focus * 0.2);
    }
  };

  const loop = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    current += (target - current) * 0.09; // eased follow = smooth scrubbing
    apply(current, dt);
    renderer.render(scene, camera);
    raf = running ? requestAnimationFrame(loop) : 0;
  };

  resize();
  apply(0, 0);
  renderer.render(scene, camera);

  return {
    setProgress(p) { target = clamp01(p); },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    },
    stop() { running = false; cancelAnimationFrame(raf); },
    resize,
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        o.geometry?.dispose();
        [].concat(o.material || []).forEach((m) => {
          m.map?.dispose();
          m.dispose();
        });
      });
      scene.environment?.dispose();
      renderer.dispose();
    },
  };
}
