"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── N ────────────────────────────────────────────────────────────────────────
function createLetterN(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const w = 1.75, h = 2.0, t = 0.44, diag = 0.40;

  const s1 = new THREE.Shape();
  s1.moveTo(0,0); s1.lineTo(t,0); s1.lineTo(t,h); s1.lineTo(0,h); s1.lineTo(0,0);
  shapes.push(s1);

  const s2 = new THREE.Shape();
  s2.moveTo(w-t,0); s2.lineTo(w,0); s2.lineTo(w,h); s2.lineTo(w-t,h); s2.lineTo(w-t,0);
  shapes.push(s2);

  const s3 = new THREE.Shape();
  s3.moveTo(t,h); s3.lineTo(t+diag,h); s3.lineTo(w-t,0); s3.lineTo(w-t-diag,0); s3.lineTo(t,h);
  shapes.push(s3);

  return shapes;
}

// ── E: 3 barras iguais ────────────────────────────────────────────────────────
function createLetterE(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const w = 1.2, h = 2.0, bh = 0.38;

  const s1 = new THREE.Shape();
  s1.moveTo(0,h-bh); s1.lineTo(w,h-bh); s1.lineTo(w,h); s1.lineTo(0,h); s1.lineTo(0,h-bh);
  shapes.push(s1);

  const mid = h/2 - bh/2;
  const s2 = new THREE.Shape();
  s2.moveTo(0,mid); s2.lineTo(w,mid); s2.lineTo(w,mid+bh); s2.lineTo(0,mid+bh); s2.lineTo(0,mid);
  shapes.push(s2);

  const s3 = new THREE.Shape();
  s3.moveTo(0,0); s3.lineTo(w,0); s3.lineTo(w,bh); s3.lineTo(0,bh); s3.lineTo(0,0);
  shapes.push(s3);

  return shapes;
}

// ── W: 4 pernas altura total ──────────────────────────────────────────────────
function createLetterW(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const ww = 2.1, wh = 2.0, tk = 0.44, half = tk/2;
  const b1 = ww*0.26, b2 = ww*0.50, b3 = ww*0.74;

  const s1 = new THREE.Shape();
  s1.moveTo(0,wh); s1.lineTo(tk,wh); s1.lineTo(b1+half,0); s1.lineTo(b1-half,0); s1.lineTo(0,wh);
  shapes.push(s1);

  const s2 = new THREE.Shape();
  s2.moveTo(b1-half,0); s2.lineTo(b1+half,0); s2.lineTo(b2+half,wh); s2.lineTo(b2-half,wh); s2.lineTo(b1-half,0);
  shapes.push(s2);

  const s3 = new THREE.Shape();
  s3.moveTo(b2-half,wh); s3.lineTo(b2+half,wh); s3.lineTo(b3+half,0); s3.lineTo(b3-half,0); s3.lineTo(b2-half,wh);
  shapes.push(s3);

  const s4 = new THREE.Shape();
  s4.moveTo(b3-half,0); s4.lineTo(b3+half,0); s4.lineTo(ww,wh); s4.lineTo(ww-tk,wh); s4.lineTo(b3-half,0);
  shapes.push(s4);

  return shapes;
}

// ── Shaders: gradiente Y + luz frontal ───────────────────────────────────────
const vertexShader = `
  uniform float minY;
  uniform float maxY;
  varying float vGrad;
  varying vec3  vNormal;
  varying vec3  vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vGrad    = clamp((worldPos.y - minY) / (maxY - minY), 0.0, 1.0);
    vNormal  = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = `
  varying float vGrad;
  varying vec3  vNormal;
  varying vec3  vViewDir;

  void main() {
    vec3 colorBot = vec3(0.75, 0.18, 0.00);
    vec3 colorTop = vec3(1.00, 0.55, 0.00);
    vec3 baseColor = mix(colorBot, colorTop, pow(vGrad, 0.85));

    vec3 lightDir = normalize(vec3(0.0, 0.2, 1.0));
    float diff    = max(dot(vNormal, lightDir), 0.0);
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);

    float ambient = 0.35;
    float lighting = ambient + diff * 0.75;
    vec3 col = baseColor * lighting;
    col += baseColor * diff * diff * 0.30;
    col -= vec3(0.12, 0.04, 0.0) * fresnel;
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────

interface NewLogo3DProps {
  /** Classe CSS extra para o wrapper — use para definir tamanho no contexto */
  className?: string;
}

export default function NewLogo3D({ className = "" }: NewLogo3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Cena com fundo TRANSPARENTE para misturar com o hero
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // totalmente transparente
    mount.appendChild(renderer.domElement);

    // Shader
    const shaderMat = new THREE.ShaderMaterial({
      uniforms: {
        minY: { value: -1.0 },
        maxY: { value:  1.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
    });

    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.60,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 6,
    };

    const group = new THREE.Group();

    function addLetter(fn: () => THREE.Shape[], ox: number) {
      fn().forEach((shape) => {
        const geo  = new THREE.ExtrudeGeometry(shape, extrude);
        geo.computeVertexNormals();
        const mesh = new THREE.Mesh(geo, shaderMat);
        mesh.position.x = ox;
        group.add(mesh);
      });
    }

    const gap = 0.45;
    const nW  = 1.75, eW = 1.2, wW = 2.1;
    const total = nW + gap + eW + gap + wW;
    const sx    = -total / 2;

    addLetter(createLetterN, sx);
    addLetter(createLetterE, sx + nW + gap);
    addLetter(createLetterW, sx + nW + gap + eW + gap);

    group.position.y = -1.0;
    shaderMat.uniforms.minY.value = -1.0;
    shaderMat.uniforms.maxY.value =  1.0;
    scene.add(group);

    // ── Drag livre 360 + inércia ───────────────────────────────────────────
    let dragging = false;
    let prev = { x: 0, y: 0 };
    let velY = 0;
    let rotY = 0, rotX = 0;
    let userInteracted = false;

    const getXY = (e: MouseEvent | TouchEvent): [number, number] =>
      "touches" in e
        ? [e.touches[0].clientX, e.touches[0].clientY]
        : [e.clientX, e.clientY];

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      dragging = true;
      userInteracted = true;
      velY = 0;
      const [x, y] = getXY(e);
      prev = { x, y };
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const [x, y] = getXY(e);
      const dx = x - prev.x;
      const dy = y - prev.y;
      rotY += dx * 0.012;
      rotX += dy * 0.008;
      rotX = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.35, rotX));
      velY = dx * 0.012;
      prev = { x, y };
    };

    const onUp = () => { dragging = false; };

    mount.addEventListener("mousedown",  onDown as EventListener, { passive: false });
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup",   onUp);
    mount.addEventListener("touchstart", onDown as EventListener, { passive: false });
    window.addEventListener("touchmove", onMove as EventListener, { passive: true });
    window.addEventListener("touchend",  onUp);

    // ── Loop + flip de perspectiva ─────────────────────────────────────────
    let raf: number;
    let autoTime = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (!userInteracted) {
        autoTime += 0.004;
        rotY = autoTime;
      } else if (!dragging) {
        velY *= 0.96;
        rotY += velY;
      }

      group.rotation.y = rotY;
      group.rotation.x = rotX;

      // Flip quando ficaria de costas — letras sempre legíveis
      const norm = ((rotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const onBack = norm > Math.PI * 0.5 && norm < Math.PI * 1.5;
      group.scale.x = onBack ? -1 : 1;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("mousedown",  onDown as EventListener);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup",   onUp);
      mount.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend",  onUp);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ minHeight: 300 }}
    />
  );
}