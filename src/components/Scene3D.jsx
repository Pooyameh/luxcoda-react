import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Starfield() {
  const meshRef = useRef();
  const count = 420;

  const { posArray, opacities, directions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ops = new Float32Array(count);
    const dirs = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread across full viewport area
      pos[i * 3]     = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      // Base opacity: most very faint (0.05–0.25)
      ops[i] = 0.05 + Math.random() * 0.20;
      // Random slow drift direction
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.003 + Math.random() * 0.008;
      dirs[i * 3]     = Math.cos(angle) * speed;
      dirs[i * 3 + 1] = Math.sin(angle) * speed;
      dirs[i * 3 + 2] = 0;
      // Random phase for pulsing (4–8s cycle)
      phs[i] = Math.random() * Math.PI * 2;
    }
    return { posArray: pos, opacities: ops, directions: dirs, phases: phs };
  }, []);

  const livePos = useRef(new Float32Array(posArray));
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += directions[i * 3];
      pos[i * 3 + 1] += directions[i * 3 + 1];
      // Wrap around edges
      if (pos[i * 3]     >  20) pos[i * 3]     = -20;
      if (pos[i * 3]     < -20) pos[i * 3]     =  20;
      if (pos[i * 3 + 1] >  14) pos[i * 3 + 1] = -14;
      if (pos[i * 3 + 1] < -14) pos[i * 3 + 1] =  14;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={livePos.current}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
        events={undefined}
      >
        <Starfield />
      </Canvas>
    </div>
  );
}
