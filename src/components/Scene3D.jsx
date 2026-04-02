import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef();
  const count = 260;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      // Mostly white, occasional faint terracotta
      const terracotta = Math.random() < 0.15;
      col[i * 3]     = terracotta ? 0.77 : 0.9 + Math.random() * 0.1;
      col[i * 3 + 1] = terracotta ? 0.35 : 0.9 + Math.random() * 0.1;
      col[i * 3 + 2] = terracotta ? 0.18 : 0.9 + Math.random() * 0.1;
    }
    return { positions: pos, colors: col };
  }, []);

  const speeds = useMemo(() => {
    return new Float32Array(count).map(() => 0.002 + Math.random() * 0.004);
  }, []);

  const posArray = useRef(new Float32Array(positions));

  useFrame(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={posArray.current}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight color="#1a1210" intensity={0.4} />
      <pointLight color="#c45a2d" intensity={0.12} position={[0, 4, 4]} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Lights />
        <Particles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} />
          <Vignette offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
