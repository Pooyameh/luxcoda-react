import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ALU = { color: '#1c1c1c', metalness: 0.8, roughness: 0.3 };
const BEZEL = { color: '#0a0a0a', metalness: 0.15, roughness: 0.85 };
const KEYBOARD = { color: '#161616', metalness: 0.5, roughness: 0.6 };

export default function Laptop3D({
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

    // Gentle float
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    if (mouseTrack) {
      targetRot.current.y = pointer.x * mouseIntensity;
      targetRot.current.x = -pointer.y * mouseIntensity * 0.5;
    }

    groupRef.current.rotation.y +=
      (rotation[1] + targetRot.current.y - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (rotation[0] + targetRot.current.x - groupRef.current.rotation.x) * 0.04;
  });

  const screenColorObj = new THREE.Color(screenColor);
  const emissiveStr = screenColorObj.clone().multiplyScalar(0.6);

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={scale}
    >
      {/* ── Base / keyboard deck ── */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial {...ALU} />
      </mesh>

      {/* Keyboard inset */}
      <mesh position={[0, 0.056, -0.15]}>
        <boxGeometry args={[2.4, 0.01, 1.4]} />
        <meshStandardMaterial {...KEYBOARD} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.056, 0.65]}>
        <boxGeometry args={[0.7, 0.008, 0.45]} />
        <meshStandardMaterial color="#141414" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* ── Hinge cylinders ── */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.05, -1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.25, 12]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* ── Screen lid ── */}
      {/* Angled ~110° from base — pivot at the back edge */}
      <group position={[0, 0.05, -1.1]} rotation={[-1.15, 0, 0]}>
        {/* Lid body */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <boxGeometry args={[3.2, 2.05, 0.07]} />
          <meshStandardMaterial {...ALU} />
        </mesh>

        {/* Screen bezel (front face) */}
        <mesh position={[0, 1.0, 0.042]}>
          <boxGeometry args={[3.0, 1.9, 0.01]} />
          <meshStandardMaterial {...BEZEL} />
        </mesh>

        {/* Screen display */}
        <mesh position={[0, 1.0, 0.052]}>
          <planeGeometry args={[2.72, 1.68]} />
          <meshBasicMaterial
            color={screenColor}
            emissive={emissiveStr}
            toneMapped={false}
          />
        </mesh>

        {/* Screen content overlay — subtle website suggestion */}
        <mesh position={[0, 1.2, 0.054]}>
          <planeGeometry args={[2.72, 0.18]} />
          <meshBasicMaterial color="#1a2a3a" transparent opacity={0.8} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.68, 0.054]}>
          <planeGeometry args={[2.72, 0.08]} />
          <meshBasicMaterial color="rgba(255,255,255,0.05)" transparent opacity={0.4} toneMapped={false} />
        </mesh>

        {/* Camera notch */}
        <mesh position={[0, 1.95, 0.043]}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
          <meshStandardMaterial color="#080808" roughness={1} />
        </mesh>

        {/* Screen glow light */}
        <pointLight
          color={screenColor}
          intensity={0.5}
          position={[0, 1.0, 0.8]}
          distance={3}
          decay={2}
        />
      </group>
    </group>
  );
}
