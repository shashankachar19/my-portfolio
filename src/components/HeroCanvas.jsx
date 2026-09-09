import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrthographicCamera } from '@react-three/drei';
import FluidBackground from './FluidBackground';
import Sticker from './Sticker';
import GlassTechObject from './GlassTechObject';

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

          {/* Premium High-Quality Image Stickers (Kept for brutalist collage feel) */}
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp"
            position={[4, 2, -4]}
            scale={2.5}
            rotationSpeed={0.3}
            offset={0}
          />
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp"
            position={[-5, -1, -3]}
            scale={2.2}
            rotationSpeed={0.5}
            floatSpeed={2}
            offset={2}
          />
          <Sticker
            url="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp"
            position={[1, -4.5, -5]}
            scale={1.8}
            rotationSpeed={0.4}
            floatSpeed={1.2}
            offset={4}
          />

          {/* Custom AWS / Fullstack Glassy Objects */}
          <GlassTechObject
            text="{ }"
            position={[-3, 2.5, -2]}
            scale={1.2}
            rotationSpeed={0.6}
            floatSpeed={2.5}
            offset={1.5}
          />
          <GlassTechObject
            text="< >"
            position={[3.5, -2.5, -1]}
            scale={1.1}
            rotationSpeed={0.4}
            floatSpeed={1.8}
            offset={0.5}
          />
          <GlassTechObject
            isServer={true}
            position={[0, 3, -6]}
            scale={1.5}
            rotationSpeed={0.2}
            floatSpeed={1}
            offset={3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
