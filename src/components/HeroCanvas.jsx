import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Glossy liquid 3D "hello" text ─── */
function LiquidHelloText() {
  const meshRef = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse-follow rotation (like haoqi)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.15,
      0.03
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.2,
      0.03
    );

    // Gentle float
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.12;
  });

  return (
    <Center position={[0, 0.3, 0]}>
      <mesh ref={meshRef} castShadow>
        <Text3D
          font="https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json"
          size={2.8}
          height={1.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.06}
          bevelOffset={0}
          bevelSegments={10}
        >
          hello
          <meshPhysicalMaterial
            color="#4455CC"
            metalness={0.05}
            roughness={0}
            transmission={0.92}
            thickness={2.5}
            ior={1.8}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={4}
            reflectivity={1}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
            attenuationColor={new THREE.Color('#6677FF')}
            attenuationDistance={3}
          />
        </Text3D>
      </mesh>
    </Center>
  );
}

/* ─── Floating accent shapes (like haoqi's pixel art, knots, cursor) ─── */

// Pixelated cube cluster (top-left, like haoqi's pixel art object)
function PixelCluster() {
  const ref = useRef();
  const cubePositions = useMemo(() => [
    [0, 0, 0], [0.25, 0, 0], [0.5, 0, 0],
    [0, 0.25, 0], [0.25, 0.25, 0],
    [0, 0.5, 0], [0.25, 0.5, 0], [0.5, 0.5, 0],
    [0, 0, 0.25], [0.5, 0.25, 0.25],
  ], []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.y = t * 0.3;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={0.7} floatIntensity={0.8}>
      <group ref={ref} position={[-5, 2, -1]} scale={0.7}>
        {cubePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshPhysicalMaterial
              color="#4488FF"
              metalness={0.1}
              roughness={0}
              clearcoat={1}
              envMapIntensity={2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Celtic knot / torus knot (green, like haoqi's green knot)
function KnotShape() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={0.6}>
      <mesh ref={ref} position={[-2.5, -0.5, 1]} scale={0.3}>
        <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#BBFF00"
          metalness={0.1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

// Cursor/arrow shape (blue, like haoqi's cursor)
function CursorArrow() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.3) * 0.2 - 0.3;
    }
  });

  return (
    <Float speed={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={[5, -1.5, -1]} scale={0.6} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.5, 1.4, 3]} />
        <meshPhysicalMaterial
          color="#4488FF"
          metalness={0.1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Pink/red knot (bottom, like haoqi's pink object)
function PinkKnot() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.y = t * 0.2;
      ref.current.rotation.x = t * 0.15;
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.5}>
      <mesh ref={ref} position={[1, -3, 0]} scale={0.25}>
        <torusKnotGeometry args={[1, 0.35, 100, 12, 3, 4]} />
        <meshPhysicalMaterial
          color="#FF4488"
          metalness={0.1}
          roughness={0}
          clearcoat={1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

// Smiley/globe (bottom center, like haoqi's smiley)
function GlobeShape() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={0.3} floatIntensity={0.3}>
      <mesh ref={ref} position={[0, -4, -2]} scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFCC00"
          metalness={0.2}
          roughness={0.1}
          clearcoat={1}
          envMapIntensity={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ─── Background light rays ─── */
function LightRays() {
  const ref = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z,
        pointer.x * 0.05,
        0.01
      );
    }
  });

  return (
    <group ref={ref} position={[3, 3, -8]}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[0, 0, (i * Math.PI) / 6 + 0.2]}
        >
          <planeGeometry args={[0.15, 30]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.015}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Dramatic lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-8, -5, 8]} intensity={0.8} color="#aaddff" />
          <pointLight position={[0, 3, 8]} intensity={10} color="#ffffff" />
          <pointLight position={[-4, -2, 4]} intensity={4} color="#6677FF" />
          <pointLight position={[5, 2, 3]} intensity={3} color="#BBFF00" />
          <spotLight
            position={[5, 8, 10]}
            angle={0.25}
            penumbra={0.5}
            intensity={8}
            color="#ffffff"
          />
          <Environment preset="city" />

          <LightRays />
          <LiquidHelloText />
          <PixelCluster />
          <KnotShape />
          <CursorArrow />
          <PinkKnot />
          <GlobeShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
