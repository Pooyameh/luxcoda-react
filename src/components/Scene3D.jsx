import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Particles() {
  const meshRef = useRef();
  const count = 220;

  const { posArray, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const terra = Math.random() < 0.12;
      col[i * 3]     = terra ? 0.77 : 0.85 + Math.random() * 0.15;
      col[i * 3 + 1] = terra ? 0.35 : 0.85 + Math.random() * 0.15;
      col[i * 3 + 2] = terra ? 0.18 : 0.85 + Math.random() * 0.15;
      spd[i] = 0.0015 + Math.random() * 0.003;
    }
    return { posArray: pos, colors: col, speeds: spd };
  }, []);

  const livePos = useRef(new Float32Array(posArray));

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 11) pos[i * 3 + 1] = -11;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={livePos.current} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.14} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1]}>
        <ambientLight color="#1a1210" intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
