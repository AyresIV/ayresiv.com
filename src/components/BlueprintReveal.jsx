import React, { useEffect, useRef } from 'react';

// Cursor-driven "blueprint" reveal: a soft mask follows the pointer and shows
// `revealSrc` (the photo redrawn as line art, see scripts/make-blueprint.py).

const TRAIL = 6;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D uReveal;
uniform vec2 uRes;
uniform vec2 uImgScale;
uniform vec3 uPts[${TRAIL}];

float smax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y);
  vec2 iuv = (uv - 0.5) * uImgScale + 0.5;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Soft mask from the pointer trail
  float field = -1.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec3 pt = uPts[i];
    float d = length(p - vec2(pt.x * aspect, pt.y));
    field = smax(field, pt.z - d, 0.08);
  }
  float mask = smoothstep(0.0, 0.012, field);
  if (mask <= 0.0) { gl_FragColor = vec4(0.0); return; }

  gl_FragColor = vec4(texture2D(uReveal, iuv).rgb * mask, mask);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('BlueprintReveal shader error:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

// Downscale large photos before uploading them as a texture
function toTextureSource(img, maxH = 1200) {
  if (img.naturalHeight <= maxH) return img;
  const scale = maxH / img.naturalHeight;
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * scale);
  c.height = maxH;
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return c;
}

const BlueprintReveal = ({ src, revealSrc, alt, className }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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
    ['uReveal', 'uRes', 'uImgScale', 'uPts'].forEach((n) => { u[n] = gl.getUniformLocation(prog, n); });
    gl.uniform1i(u.uReveal, 0);

    let imgAspect = 0.75;
    let ready = false;
    let disposed = false;
    let tex = null;

    const resize = () => {
      const dpr = 2;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      const ca = canvas.width / canvas.height;
      if (ca > imgAspect) gl.uniform2f(u.uImgScale, 1, imgAspect / ca);
      else gl.uniform2f(u.uImgScale, ca / imgAspect, 1);
    };

    const img = new Image();
    img.onload = () => {
      if (disposed) return;
      imgAspect = img.naturalWidth / img.naturalHeight;
      tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, toTextureSource(img));
      resize();
      ready = true;
    };
    img.src = revealSrc;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer state (uv space, y down)
    const target = { x: 0.5, y: 0.3 };
    const pts = Array.from({ length: TRAIL }, () => ({ x: 0.5, y: 0.3 }));
    const ptsData = new Float32Array(TRAIL * 3);
    let hovering = false;
    let radius = 0;
    let cleared = true;

    const setTarget = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
    };
    const onEnter = (e) => {
      hovering = true;
      setTarget(e);
      // Start the trail at the entry point so it doesn't sweep across
      if (radius < 0.01) pts.forEach((p) => { p.x = target.x; p.y = target.y; });
    };
    const onLeave = () => { hovering = false; };

    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerdown', onEnter);
    wrap.addEventListener('pointermove', setTarget);
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointercancel', onLeave);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!ready) return;

      radius += ((hovering ? 0.15 : 0) - radius) * 0.06;
      pts[0].x += (target.x - pts[0].x) * 0.14;
      pts[0].y += (target.y - pts[0].y) * 0.14;
      for (let i = 1; i < TRAIL; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.3;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.3;
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
        ptsData[i * 3 + 2] = radius * (1 - (i / TRAIL) * 0.7);
      }
      gl.uniform3fv(u.uPts, ptsData);
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
      if (tex) gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [revealSrc]);

  return (
    <div ref={wrapRef} className="blueprint-reveal">
      <img src={src} alt={alt} className={className} />
      <canvas ref={canvasRef} className="blueprint-reveal__canvas" aria-hidden="true" />
    </div>
  );
};

export default BlueprintReveal;
