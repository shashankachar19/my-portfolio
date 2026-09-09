import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Sticker({ url, position, scale = 1, rotationSpeed = 0.5, floatSpeed = 1.5, offset = 0 }) {
  const meshRef = useRef();
  const texture = useTexture(url);


  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle floating rotation
    meshRef.current.rotation.x = Math.sin(t * rotationSpeed + offset) * 0.1 + (pointer.y * 0.1);
    meshRef.current.rotation.y = Math.cos(t * rotationSpeed + offset) * 0.1 + (pointer.x * 0.1);
  });

  return (
    <Float speed={floatSpeed} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}
