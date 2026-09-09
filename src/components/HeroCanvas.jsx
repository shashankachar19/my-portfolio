import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Distort coordinates over time
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.00 * uTime);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

    // Mouse interaction
    vec2 mouseEffect = uMouse * 0.5 - 0.25;
    r += mouseEffect;

    float f = fbm(st + r);

    // Color mixing (monochrome premium look)
    vec3 color = mix(
      vec3(0.02, 0.02, 0.02), // Dark base
      vec3(0.1, 0.1, 0.1),    // Subtle light highlight
      clamp((f * f) * 4.0, 0.0, 1.0)
    );

    // Accent color swirl (lime green)
    vec3 accent = vec3(0.85, 1.0, 0.0); // #D9FF00 equivalent
    color = mix(color, accent, clamp(length(q) * 0.1, 0.0, 1.0));

    // Vignette
    vec2 p = gl_FragCoord.xy / uResolution.xy;
    float vignette = smoothstep(2.0, 0.1, length(p - 0.5));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function LiquidShaderPlane() {
  const meshRef = useRef();
  const { size, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [size]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.material.uniforms.uTime.value = t;

    // Smooth mouse follow
    meshRef.current.material.uniforms.uMouse.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.05
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      {/* Plane that covers the whole screen */}
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
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
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#bbff00" />
          <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />

          <LightRays />
          <LiquidShaderPlane />
        </Suspense>
      </Canvas>
    </div>
  );
}
