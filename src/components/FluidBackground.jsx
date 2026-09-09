import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;

    // Fluid distortion based on mouse and time
    vec2 pos = st * 3.0;

    // Mouse interaction distance
    float dist = distance(st, mouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist);

    pos.x += snoise(pos + uTime * 0.1) * 0.5;
    pos.y += snoise(pos - uTime * 0.15) * 0.5;

    // Create smoke/fluid pattern
    float n = snoise(pos + mouseEffect * 2.0);


    // Mouse interaction distance
    float dist = distance(st, mouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist);

    pos.x += snoise(pos + uTime * 0.1) * 0.5;
    pos.y += snoise(pos - uTime * 0.15) * 0.5;

    // Create smoke/fluid pattern
    float n = snoise(pos + mouseEffect * 2.0);

    // Smooth, premium monochrome silver styling
    // Dark background with subtle silver/chrome flowing highlights
    vec3 baseColor = vec3(0.03, 0.03, 0.03);
    vec3 highlight = vec3(0.25, 0.25, 0.25);

    // Add extra brightness near mouse
    float intensity = smoothstep(-1.0, 1.0, n) + (mouseEffect * 0.3);

    vec3 finalColor = mix(baseColor, highlight, intensity * 0.5);


    // Add extra brightness near mouse
    float intensity = smoothstep(-1.0, 1.0, n) + (mouseEffect * 0.3);

    vec3 finalColor = mix(baseColor, highlight, intensity * 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function FluidBackground() {
  const meshRef = useRef();
  const { size, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth mouse follow for shader
      meshRef.current.material.uniforms.uMouse.value.lerp(
        new THREE.Vector2(
          (pointer.x + 1) / 2,
          (pointer.y + 1) / 2
        ),
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
