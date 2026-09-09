import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Premium Liquid Glass Object ─── */
function LiquidGlassShape() {
  const meshRef = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse-follow rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3 + Math.sin(t * 0.3) * 0.2,
      0.02
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.4 + t * 0.2,
      0.02
    );

    // Morphing effect by scaling axes slightly
    meshRef.current.scale.x = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.y = 1 + Math.cos(t * 0.4) * 0.05;
    meshRef.current.scale.z = 1 + Math.sin(t * 0.6) * 0.05;
  });

  return (
    <Float speed={1.5} floatIntensity={1} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        {/* Icosahedron with detail for a multifaceted, complex look */}
        <icosahedronGeometry args={[2.5, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={1}
          roughness={0}
          ior={1.5}
          color="#ffffff"
          attenuationColor="#bbff00"
          attenuationDistance={10}
          background={new THREE.Color('#000000')}
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
            opacity={0.02}
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
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Dramatic brutalist lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#bbff00" />
          <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />

          <Environment preset="city" />

          <LightRays />
          <LiquidGlassShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
