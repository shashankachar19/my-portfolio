import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function GlassTechObject({ text, position, scale = 1, rotationSpeed = 0.5, floatSpeed = 1.5, offset = 0, isServer = false }) {
  const meshRef = useRef();
  const { pointer } = useThree();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95, // glass like
    ior: 1.5,
    thickness: 0.5,
    transparent: true,
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * rotationSpeed + offset) * 0.2 + (pointer.y * 0.2);
    meshRef.current.rotation.y = Math.cos(t * rotationSpeed + offset) * 0.2 + (pointer.x * 0.2);
  });

  return (
    <Float speed={floatSpeed} floatIntensity={1} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} material={material}>
        {isServer ? (
          <boxGeometry args={[1.5, 2.5, 1]} /> // abstract server rack
        ) : (
          <Center>
            <Text3D
              font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
              size={1.5}
              height={0.4}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.05}
              bevelSize={0.05}
              bevelOffset={0}
              bevelSegments={5}
            >
              {text}
              <meshPhysicalMaterial attach="material" {...material} />
            </Text3D>
          </Center>
        )}
      </mesh>
    </Float>
  );
}
