import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo, type MutableRefObject } from "react";
import * as THREE from "three";

const dummy = new THREE.Object3D();
const COUNT = 350;

interface Props {
  scrollProgress: MutableRefObject<number>;
  isHovered: MutableRefObject<boolean>;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function ss(t: number) { return t * t * (3 - 2 * t); }
function c01(t: number) { return Math.max(0, Math.min(1, t)); }

/* ─── Precompute fragment target positions for 5 phases ───────────────────── */
function useTargets() {
  return useMemo(() => {
    const inside  = new Float32Array(COUNT * 3);
    const orbital = new Float32Array(COUNT * 3);
    const grid    = new Float32Array(COUNT * 3);
    const sphere  = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Phase A — compressed inside obelisk body
      inside[i*3]   = (Math.random() - 0.5) * 0.55;
      inside[i*3+1] = (Math.random() - 0.5) * 3.8;
      inside[i*3+2] = (Math.random() - 0.5) * 0.55;

      // Phase B — 3 concentric orbital rings
      const ring = i % 3;
      const frac = (i / COUNT) * Math.PI * 2;
      const r    = 1.6 + ring * 0.65;
      orbital[i*3]   = Math.cos(frac) * r;
      orbital[i*3+1] = Math.sin(frac * 0.12 + ring * 0.7) * 0.55;
      orbital[i*3+2] = Math.sin(frac) * r;

      // Phase C — 3-D scanning grid (7 × 5 × 10 = 350)
      const gx = (i % 7) - 3;
      const gy = Math.floor((i / 7) % 5) - 2;
      const gz = Math.floor(i / 35) - 4;
      grid[i*3]   = gx * 0.72;
      grid[i*3+1] = gy * 0.55;
      grid[i*3+2] = gz * 0.52;

      // Phase D — Fibonacci sphere
      const phi   = Math.acos(1 - 2 * (i + 0.5) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      sphere[i*3]   = 2.25 * Math.sin(phi) * Math.cos(theta);
      sphere[i*3+1] = 2.25 * Math.cos(phi);
      sphere[i*3+2] = 2.25 * Math.sin(phi) * Math.sin(theta);
    }
    return { inside, orbital, grid, sphere };
  }, []);
}

/* ─── Camera travel — gives "ascending alongside the obelisk" sensation ───── */
function CameraRig({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t    = scrollProgress.current;
    const time = clock.elapsedTime;
    // Subtle vertical travel: camera moves up 0→1.2 units as you scroll
    const targetY = t * 1.2;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    // Gentle breathing sway on Z
    camera.position.z = 5.5 + Math.sin(time * 0.14) * 0.05;
    // Slight tilt toward obelisk center as camera moves
    (camera as THREE.PerspectiveCamera).lookAt(0, targetY * 0.3, 0);
  });
  return null;
}

/* ─── Dark stone obelisk with neon groove stripes ─────────────────────────── */
function Obelisk({ scrollProgress, isHovered }: Props) {
  const gRef = useRef<THREE.Group>(null!);
  const n1   = useRef<THREE.Mesh>(null!);
  const n2   = useRef<THREE.Mesh>(null!);
  const n3   = useRef<THREE.Mesh>(null!);
  const n4   = useRef<THREE.Mesh>(null!);

  const stone = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#14151d", roughness: 0.93, metalness: 0.04,
  }), []);

  const neon = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00e5ff",
    emissive: new THREE.Color("#00e5ff"),
    emissiveIntensity: 0.9,
    roughness: 0.06, metalness: 0.92,
  }), []);

  useFrame(({ clock }) => {
    const t    = scrollProgress.current;
    const hov  = isHovered.current;
    const time = clock.elapsedTime;
    const g    = gRef.current;

    // Obelisk visible in Phase A (Hero) + Phase B (About) — fades at Projects entry
    const whole = c01(1 - ss(c01((t - 0.35) / 0.10)));
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, whole, 0.06));

    // Float
    g.position.y = Math.sin(time * 0.36) * 0.10;

    // Rotation: slow in Hero, spins during About (Section 2)
    const section2Spin = (t > 0.2 && t < 0.4)
      ? c01((t - 0.2) / 0.2) * Math.PI * 0.7
      : t >= 0.4 ? Math.PI * 0.7 : 0;
    const rotTarget = Math.sin(time * 0.18) * 0.08 + section2Spin + (hov ? 0.20 : 0);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rotTarget, 0.04);

    // Neon groove intensity
    const streamBoost = (t > 0.2 && t < 0.4)
      ? ss(c01((t - 0.2) / 0.2)) * 3.5
      : t >= 0.4 ? 3.5 : 0;
    const hovBoost  = hov ? 0.85 : 0;
    const pulse     = Math.sin(time * 3.2 + t * 7) * 0.42;
    const intensity = 0.85 + streamBoost + hovBoost + pulse;
    for (const ref of [n1, n2, n3, n4]) {
      if (ref.current)
        (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  // Taller obelisk: body 4.5 units, pyramidion at y=2.65
  return (
    <group ref={gRef}>
      <mesh material={stone}>
        <boxGeometry args={[0.72, 4.5, 0.72]} />
      </mesh>
      <mesh position={[0, 2.65, 0]} rotation={[0, Math.PI / 4, 0]} material={stone}>
        <coneGeometry args={[0.51, 0.75, 4]} />
      </mesh>
      <mesh ref={n1} position={[0, 0,  0.362]} material={neon}><boxGeometry args={[0.044, 4.05, 0.01]} /></mesh>
      <mesh ref={n2} position={[0, 0, -0.362]} material={neon}><boxGeometry args={[0.044, 4.05, 0.01]} /></mesh>
      <mesh ref={n3} position={[-0.362, 0, 0]} material={neon}><boxGeometry args={[0.01, 4.05, 0.044]} /></mesh>
      <mesh ref={n4} position={[ 0.362, 0, 0]} material={neon}><boxGeometry args={[0.01, 4.05, 0.044]} /></mesh>
    </group>
  );
}

/* ─── Central neon power core ─────────────────────────────────────────────── */
function NeonCore({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null!);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00e5ff",
    emissive: new THREE.Color("#00e5ff"),
    emissiveIntensity: 3.8,
    roughness: 0, metalness: 1, transparent: true, opacity: 0.92,
  }), []);

  useFrame(({ clock }) => {
    const t    = scrollProgress.current;
    const time = clock.elapsedTime;
    const alpha = ss(c01((t - 0.32) / 0.14));
    const target = alpha * (0.30 + Math.sin(time * 2.3) * 0.022);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, target, 0.07));
    const ct = c01((t - 0.5) / 0.5);
    mat.emissive.setRGB(ct * 0.5, 1 - ct * 0.75, 1 - ct * 0.1);
    mat.emissiveIntensity = 3.5 + Math.sin(time * 3.1) * 0.9;
  });

  return <mesh ref={ref} material={mat}><sphereGeometry args={[1, 24, 24]} /></mesh>;
}

/* ─── Fragment cloud — InstancedMesh, 4 kinetic phases ───────────────────── */
function Fragments({ scrollProgress, isHovered }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const targets = useTargets();

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1b1d2e", roughness: 0.86, metalness: 0.14,
    emissive: new THREE.Color("#00e5ff"), emissiveIntensity: 0,
  }), []);

  useFrame(({ clock }) => {
    const t    = scrollProgress.current;
    const hov  = isHovered.current;
    const time = clock.elapsedTime;
    const mesh = meshRef.current;
    if (!mesh) return;

    // 5 scroll sections → 4 phase transitions at 0.2, 0.4, 0.6, 0.8
    let from: Float32Array, to: Float32Array, alpha: number, phase: number;
    if (t < 0.4)       { from = targets.inside;  to = targets.inside;   alpha = 0;                            phase = 0; }
    else if (t < 0.6)  { from = targets.inside;  to = targets.orbital;  alpha = ss(c01((t - 0.4) / 0.2));    phase = 1; }
    else if (t < 0.8)  { from = targets.orbital; to = targets.grid;     alpha = ss(c01((t - 0.6) / 0.2));    phase = 2; }
    else               { from = targets.grid;    to = targets.sphere;   alpha = ss(c01((t - 0.8) / 0.2));    phase = 3; }

    // Emissive
    const emv = ss(c01((t - 0.38) / 0.12));
    mat.emissiveIntensity = emv * (hov ? 0.55 : 0.30);
    const ct = c01((t - 0.5) / 0.5);
    mat.emissive.setRGB(ct * 0.5, 1 - ct * 0.75, 1 - ct * 0.1);

    for (let i = 0; i < COUNT; i++) {
      let x = from[i*3]   + (to[i*3]   - from[i*3])   * alpha;
      let y = from[i*3+1] + (to[i*3+1] - from[i*3+1]) * alpha;
      let z = from[i*3+2] + (to[i*3+2] - from[i*3+2]) * alpha;

      if (phase === 1) {
        const ring  = i % 3;
        const speed = 0.20 + ring * 0.08;
        const r     = Math.sqrt(x*x + z*z) || 1.55;
        const ang   = Math.atan2(z, x) + time * speed;
        x = Math.cos(ang) * r;
        z = Math.sin(ang) * r;
      } else if (phase === 2) {
        y += Math.sin(time * 1.8 + x * 2.5) * 0.028 * alpha;
      } else if (phase === 3) {
        const r   = Math.sqrt(x*x + y*y + z*z);
        const phi = Math.acos(THREE.MathUtils.clamp(y / r, -1, 1));
        const th  = Math.atan2(z, x) + time * 0.11;
        x = r * Math.sin(phi) * Math.cos(th);
        z = r * Math.sin(phi) * Math.sin(th);
      }

      if (hov) {
        x += Math.sin(time * 3.5 + i * 0.4) * 0.026;
        y += Math.cos(time * 3.5 + i * 0.6) * 0.026;
        z += Math.sin(time * 3.5 + i * 0.2) * 0.026;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(i * 0.4 + time * 0.014, time * 0.12 + i * 0.3, i * 0.7);
      const sc = t < 0.38 ? 0 : ss(c01((t - 0.38) / 0.10)) * (0.048 + (i % 4) * 0.009);
      dummy.scale.setScalar(sc);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} material={mat}>
      <boxGeometry args={[1, 1.2, 0.8]} />
    </instancedMesh>
  );
}

/* ─── Atmospheric void particles ─────────────────────────────────────────── */
function VoidDust() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 22;
      pos[i*3+1] = (Math.random() - 0.5) * 18;
      pos[i*3+2] = (Math.random() - 0.5) * 9 - 3;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.012;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.007) * 0.04;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#1e2240" size={0.038} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Scene ───────────────────────────────────────────────────────────────── */
function Scene({ scrollProgress, isHovered }: Props) {
  return (
    <>
      <color attach="background" args={["#07080e"]} />
      <fog attach="fog" args={["#0c0d1c", 12, 40]} />
      <ambientLight intensity={0.10} color="#0a0b1a" />
      <pointLight position={[3, 5, 4]}   intensity={4.5} color="#00e5ff" />
      <pointLight position={[-4, -2, 3]} intensity={1.8} color="#7c3aed" />
      <pointLight position={[2, -4, -2]} intensity={0.9} color="#00ffbb" />
      <CameraRig scrollProgress={scrollProgress} />
      <VoidDust />
      <Obelisk   scrollProgress={scrollProgress} isHovered={isHovered} />
      <NeonCore  scrollProgress={scrollProgress} />
      <Fragments scrollProgress={scrollProgress} isHovered={isHovered} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.22}
          luminanceSmoothing={0.82}
          intensity={2.6}
          levels={7}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ─── Canvas export ───────────────────────────────────────────────────────── */
export default function MonolithScene({ scrollProgress, isHovered }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 52 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ background: "#07080e", width: "100%", height: "100%" }}
    >
      <Scene scrollProgress={scrollProgress} isHovered={isHovered} />
    </Canvas>
  );
}
