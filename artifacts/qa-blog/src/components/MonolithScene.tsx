import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo, type MutableRefObject } from "react";
import * as THREE from "three";

const dummy = new THREE.Object3D();

interface Props {
  scrollProgress: MutableRefObject<number>;
  isHovered: MutableRefObject<boolean>;
}

/* ─── Particle shatter cloud ──────────────────────────────────────────────── */
function Particles({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 1050;

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const rotSpeeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = 0.015 + Math.random() * 0.055;
      rotSpeeds[i * 3]     = (Math.random() - 0.5) * 2;
      rotSpeeds[i * 3 + 1] = (Math.random() - 0.5) * 2;
      rotSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return { positions, scales, rotSpeeds };
  }, []);

  useFrame((state) => {
    const t = scrollProgress.current;
    const shatterT = Math.max(0, Math.min(1, (t - 0.48) / 0.22));
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const px = data.positions[i * 3]     * shatterT;
      const py = data.positions[i * 3 + 1] * shatterT;
      const pz = data.positions[i * 3 + 2] * shatterT;
      dummy.position.set(px, py, pz);
      const s = shatterT * data.scales[i];
      dummy.scale.setScalar(s);
      dummy.rotation.set(
        time * data.rotSpeeds[i * 3],
        time * data.rotSpeeds[i * 3 + 1],
        time * data.rotSpeeds[i * 3 + 2],
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#818cf8"
        emissive="#6366f1"
        emissiveIntensity={0.6}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

/* ─── Glass monolith ──────────────────────────────────────────────────────── */
function Monolith({ scrollProgress, isHovered }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef  = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t    = scrollProgress.current;
    const hov  = isHovered.current;
    const time = state.clock.elapsedTime;
    const g    = groupRef.current;
    const m    = meshRef.current;

    if (t < 0.28) {
      // Hero: centered, float
      const targetX = hov ? 0.4 : 0;
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06);
      g.position.y = Math.sin(time * 0.38) * 0.14;
      g.rotation.y = THREE.MathUtils.lerp(
        g.rotation.y,
        Math.sin(time * 0.18) * 0.12 + (hov ? 0.2 : 0),
        0.04,
      );
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, 1.0, 0.08));
    } else if (t < 0.5) {
      // About: shift left, gentle tilt
      const p = (t - 0.28) / 0.22;
      g.position.x = THREE.MathUtils.lerp(g.position.x, -1.4 * p, 0.06);
      g.position.y = Math.sin(time * 0.38) * 0.09;
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.55 * p, 0.06);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.08 * p, 0.06);
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, 1.0, 0.08));
    } else if (t < 0.74) {
      // Projects: shatter — monolith scales to nothing
      const p = (t - 0.5) / 0.24;
      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, 0.05);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p * Math.PI * 0.6, 0.06);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0, 0.06);
      const sv = Math.max(0.01, 1 - p);
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, sv, 0.09));
    } else {
      // Contact: reassemble from nothing
      const p = (t - 0.74) / 0.26;
      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, 0.06);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p * Math.PI * 2, 0.07);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0, 0.06);
      const sv = Math.max(0.01, p * 1.0);
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, sv, 0.09));
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={[0.72, 2.3, 0.36]}>
        <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4}
          roughness={0.0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.08}
          color="#d5c5f9"
          attenuationColor="#f9d5c5"
          attenuationDistance={0.8}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

/* ─── Inner scene ─────────────────────────────────────────────────────────── */
function Scene({ scrollProgress, isHovered }: Props) {
  return (
    <>
      <ambientLight intensity={0.25} color="#c5f0e4" />
      <pointLight position={[4, 5, 3]}   intensity={2.0} color="#f9d5c5" />
      <pointLight position={[-4, -2, 4]} intensity={1.2} color="#d5c5f9" />
      <pointLight position={[0, -4, -2]} intensity={0.7} color="#c5f0e4" />
      <rectAreaLight position={[0, 3, 4]} width={5} height={5} intensity={2.5} color="#f0eeff" />
      <Environment preset="studio" />
      <Monolith scrollProgress={scrollProgress} isHovered={isHovered} />
      <Particles scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.55} intensity={0.55} levels={5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ─── Exported canvas wrapper ─────────────────────────────────────────────── */
export default function MonolithScene({ scrollProgress, isHovered }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Scene scrollProgress={scrollProgress} isHovered={isHovered} />
    </Canvas>
  );
}
