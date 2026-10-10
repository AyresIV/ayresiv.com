import React, { useEffect, useRef, useState } from 'react';

// Cursor-driven "Terminator" reveal: a gooey mask follows the pointer and
// shows a chrome endoskeleton version of the photo underneath.
// Pass `robotSrc` (same framing as `src`) to use a real robot image instead
// of the procedural metal shader.

const TRAIL = 8;
// Eye positions in the source photo (uv, y down)
const EYE_L = [0.548, 0.131];
const EYE_R = [0.623, 0.129];

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uRobot;
uniform float uHasRobot;
uniform vec2 uRes;
uniform vec2 uImgScale;
uniform float uImgAspect;
uniform float uTime;
uniform vec3 uPts[${TRAIL}];
uniform vec2 uEyeL;
uniform vec2 uEyeR;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
float smax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}
float lum(vec2 uv) { return dot(texture2D(uImage, uv).rgb, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y);
  vec2 iuv = (uv - 0.5) * uImgScale + 0.5;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Gooey mask from the pointer trail
  float field = -1.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec3 pt = uPts[i];
    float d = length(p - vec2(pt.x * aspect, pt.y));
    field = smax(field, pt.z - d, 0.06);
  }
  field += (fbm(p * 7.0 + uTime * 0.5) - 0.5) * 0.05;

  float mask = smoothstep(0.0, 0.012, field);
  float rim = smoothstep(-0.022, 0.0, field) * (1.0 - smoothstep(0.0, 0.02, field));
  if (mask <= 0.0 && rim <= 0.0) { gl_FragColor = vec4(0.0); return; }

  vec3 robot;
  if (uHasRobot > 0.5) {
    robot = texture2D(uRobot, iuv).rgb;
  } else {
    // Chrome endoskeleton derived from the photo's luminance
    vec3 base = texture2D(uImage, iuv).rgb;
    float l = dot(base, vec3(0.299, 0.587, 0.114));
    vec2 px = 1.5 / uRes * uImgScale;
    float lx = lum(iuv + vec2(px.x, 0.0)) - lum(iuv - vec2(px.x, 0.0));
    float ly = lum(iuv + vec2(0.0, px.y)) - lum(iuv - vec2(0.0, px.y));
    vec3 n = normalize(vec3(-lx * 6.0, ly * 6.0, 1.0));
    vec3 L = normalize(vec3(-0.5, 0.6, 0.7));
    float diff = max(dot(n, L), 0.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 20.0);

    float m = smoothstep(0.04, 0.85, l);
    vec3 steel = mix(vec3(0.03, 0.035, 0.045), vec3(0.78, 0.82, 0.88), m);
    float env = 0.5 + 0.5 * sin(l * 14.0 + n.x * 3.0);
    steel *= 0.5 + 0.35 * env + 0.45 * diff;
    steel += spec * vec3(1.0, 0.95, 0.9);

    // Armour plating: offset panels with seams, bevels and rivets
    vec2 g = p * vec2(16.0, 22.0);
    g.x += step(1.0, mod(floor(g.y), 2.0)) * 0.5;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float edgeDist = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
    float seam = 1.0 - smoothstep(0.0, 0.05, edgeDist);
    float bevel = smoothstep(0.05, 0.12, f.y) * (1.0 - smoothstep(0.12, 0.2, f.y));
    steel *= 0.82 + 0.3 * hash(cell);
    steel *= 1.0 - seam * 0.65;
    steel += bevel * 0.08;
    vec2 rv = min(f, 1.0 - f) - 0.12;
    steel += (1.0 - smoothstep(0.02, 0.05, length(rv))) * 0.25;

    // Energy pulses running through the seams
    float pulse = smoothstep(0.85, 1.0, sin(dot(cell, vec2(0.7, 1.3)) - uTime * 3.0));
    steel += seam * pulse * vec3(0.73, 0.4, 1.0) * 0.9;
    robot = steel;
  }

  // Terminator HUD: red tint, scanlines, sweeping scan bar (subtler over a real robot image)
  float hud = uHasRobot > 0.5 ? 0.35 : 1.0;
  float scan = 1.0 - hud * 0.1 + hud * 0.1 * sin(gl_FragCoord.y * 1.3);
  float bar = exp(-pow((fract(uTime * 0.22) - uv.y) * 35.0, 2.0));
  robot = robot * scan * mix(vec3(1.0), vec3(0.95, 0.85, 1.12), hud) + vec3(0.73, 0.52, 0.99) * bar * 0.35 * hud;

  // Glowing red eyes (a real robot image brings its own)
  if (uHasRobot < 0.5) {
    vec2 ia = vec2(uImgAspect, 1.0);
    float de = min(length((iuv - uEyeL) * ia), length((iuv - uEyeR) * ia));
    float flick = 0.85 + 0.15 * noise(vec2(uTime * 18.0, 0.0));
    robot += vec3(1.0, 0.08, 0.03) * (smoothstep(0.009, 0.0, de) * 1.6 + 0.004 / (de + 0.004) * 0.6) * flick;
  }

  vec3 rimCol = mix(vec3(0.62, 0.3, 1.0), vec3(1.0, 0.6, 0.9), rim * rim) * rim * 1.5;
  vec3 col = clamp(robot * mask + rimCol, 0.0, 1.0);
  float a = clamp(max(mask, rim * 0.9), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('CyborgReveal shader error:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Downscale large photos before uploading them as textures
function toTextureSource(img, maxH = 1200) {
  if (img.naturalHeight <= maxH) return img;
  const scale = maxH / img.naturalHeight;
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * scale);
  c.height = maxH;
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c;
}

function createTexture(gl, source) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  return tex;
}

const CyborgReveal = ({ src, robotSrc, alt, className }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [touched, setTouched] = useState(false);
  const [enabled] = useState(() => typeof window !== 'undefined');
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  // The reveal only follows the pointer; reduced motion just disables the idle auto-wander
  const reduceMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ['uImage', 'uRobot', 'uHasRobot', 'uRes', 'uImgScale', 'uImgAspect', 'uTime', 'uPts', 'uEyeL', 'uEyeR']
      .forEach((n) => { u[n] = gl.getUniformLocation(prog, n); });
    gl.uniform1i(u.uImage, 0);
    gl.uniform1i(u.uRobot, 1);
    gl.uniform2f(u.uEyeL, EYE_L[0], EYE_L[1]);
    gl.uniform2f(u.uEyeR, EYE_R[0], EYE_R[1]);
    gl.uniform1f(u.uHasRobot, 0);

    let imgAspect = 0.75;
    let ready = false;
    let disposed = false;
    const textures = [];

    const updateScale = () => {
      const ca = canvas.width / canvas.height;
      if (ca > imgAspect) gl.uniform2f(u.uImgScale, 1, imgAspect / ca);
      else gl.uniform2f(u.uImgScale, ca / imgAspect, 1);
      gl.uniform1f(u.uImgAspect, imgAspect);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      updateScale();
    };

    Promise.all([loadImage(src), robotSrc ? loadImage(robotSrc) : null])
      .then(([img, robot]) => {
        if (disposed) return;
        imgAspect = img.naturalWidth / img.naturalHeight;
        gl.activeTexture(gl.TEXTURE0);
        textures.push(createTexture(gl, toTextureSource(img)));
        if (robot) {
          gl.activeTexture(gl.TEXTURE1);
          textures.push(createTexture(gl, toTextureSource(robot)));
          gl.uniform1f(u.uHasRobot, 1);
        }
        resize();
        ready = true;
      })
      .catch(() => {});

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer state (uv space, y down)
    const target = { x: 0.58, y: 0.2 };
    const pts = Array.from({ length: TRAIL }, () => ({ x: 0.58, y: 0.2 }));
    const ptsData = new Float32Array(TRAIL * 3);
    let hovering = false;
    let radius = 0;
    let lastInteract = -Infinity;
    let cleared = true;

    const setTarget = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      lastInteract = performance.now();
    };
    const onEnter = (e) => {
      hovering = true;
      setTarget(e);
      // Start the trail at the entry point so it doesn't sweep across
      if (radius < 0.01) pts.forEach((p) => { p.x = target.x; p.y = target.y; });
      setTouched(true);
    };
    const onLeave = () => { hovering = false; };

    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerdown', onEnter);
    wrap.addEventListener('pointermove', setTarget);
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointercancel', onLeave);

    let raf = 0;
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!ready) return;
      const time = t / 1000;

      // On touch screens, wander over the face when idle so the effect is discoverable
      const idle = !hovering && isTouch && !reduceMotion && t - lastInteract > 2500;
      if (idle) {
        target.x = 0.58 + 0.13 * Math.sin(time * 0.6);
        target.y = 0.26 + 0.14 * Math.sin(time * 0.9);
      }
      const radiusTarget = hovering ? 0.17 : idle ? 0.13 : 0;
      radius += (radiusTarget - radius) * 0.08;

      pts[0].x += (target.x - pts[0].x) * 0.2;
      pts[0].y += (target.y - pts[0].y) * 0.2;
      for (let i = 1; i < TRAIL; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.35;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.35;
      }

      if (radius < 0.002) {
        if (!cleared) {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          cleared = true;
        }
        return;
      }
      cleared = false;

      for (let i = 0; i < TRAIL; i++) {
        ptsData[i * 3] = pts[i].x;
        ptsData[i * 3 + 1] = pts[i].y;
        ptsData[i * 3 + 2] = radius * (1 - (i / TRAIL) * 0.8);
      }
      gl.uniform3fv(u.uPts, ptsData);
      gl.uniform1f(u.uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Only animate while on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(wrap);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerdown', onEnter);
      wrap.removeEventListener('pointermove', setTarget);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('pointercancel', onLeave);
      textures.forEach((tex) => gl.deleteTexture(tex));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [enabled, src, robotSrc, isTouch, reduceMotion]);

  return (
    <div ref={wrapRef} className="cyborg-reveal">
      <img src={src} alt={alt} className={className} />
      {enabled && <canvas ref={canvasRef} className="cyborg-reveal__canvas" aria-hidden="true" />}
      {enabled && (
        <span className={`cyborg-reveal__hint${touched ? ' is-hidden' : ''}`} aria-hidden="true">
          {isTouch ? 'Tap & drag' : 'Hover to reveal'}
        </span>
      )}
    </div>
  );
};

export default CyborgReveal;
