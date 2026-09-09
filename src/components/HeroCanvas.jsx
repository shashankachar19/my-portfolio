import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrthographicCamera } from '@react-three/drei';
import FluidBackground from './FluidBackground';
import Sticker from './Sticker';

/* ─── Premium Liquid Glass Object ─── */

/* ─── Background light rays ─── */
export default function HeroCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-bg-primary">
      {/* Background Fluid Canvas */}
      <Canvas
        className="absolute inset-0 z-0"
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <OrthographicCamera makeDefault position={[0, 0, 1]} />
        <FluidBackground />
      </Canvas>

      {/* Foreground 3D Objects Canvas */}
      <Canvas
        className="absolute inset-0 z-10"
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Dramatic brutalist lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#e0e0e0" />
          <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />

          <Environment preset="city" />

          {/* Premium High-Quality Image Stickers */}
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp"
            position={[4, 2, -2]}
            scale={2.5}
            rotationSpeed={0.3}
            offset={0}
          />
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp"
            position={[-4, -2, -1]}
            scale={2.2}
            rotationSpeed={0.5}
            floatSpeed={2}
            offset={2}
          />
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp"
            position={[0, -3.5, -3]}
            scale={1.8}
            rotationSpeed={0.4}
            floatSpeed={1.2}
            offset={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
