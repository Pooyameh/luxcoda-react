import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function Phone3D({
  screenColor = '#3b6dd4',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  mouseTrack = true,
  mouseIntensity = 0.08,
}) {
  const groupRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.04;

    if (mouseTrack) {
      targetRot.current.y = pointer.x * mouseIntensity;
      targetRot.current.x = -pointer.y * mouseIntensity * 0.4;
    }
    groupRef.current.rotation.y +=
      (rotation[1] + targetRot.current.y - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (rotation[0] + targetRot.current.x - groupRef.current.rotation.x) * 0.04;
  });

  const screenColorObj = new THREE.Color(screenColor);
  const emissiveStr = screenColorObj.clone().multiplyScalar(0.5);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Body */}
      <RoundedBox args={[1.0, 2.1, 0.1]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color="#1c1c1c" metalness={0.7} roughness={0.35} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.88, 1.94]} />
        <meshBasicMaterial color={screenColor} emissive={emissiveStr} toneMapped={false} />
      </mesh>

      {/* Dynamic island */}
      <mesh position={[0, 0.88, 0.056]}>
        <boxGeometry args={[0.24, 0.055, 0.01]} />
        <meshStandardMaterial color="#080808" roughness={1} />
      </mesh>

      {/* Home indicator */}
      <mesh position={[0, -0.88, 0.053]}>
        <boxGeometry args={[0.28, 0.018, 0.005]} />
        <meshStandardMaterial color="#444" roughness={0.9} />
      </mesh>

      {/* Side buttons */}
      <mesh position={[0.52, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.18, 0.07]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.52, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.07]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.52, 0.0, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.07]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Screen glow */}
      <pointLight
        color={screenColor}
        intensity={0.4}
        position={[0, 0, 1]}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}
