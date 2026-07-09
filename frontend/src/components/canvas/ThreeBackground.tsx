'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Particles Component (Handles mouse-responsive geometry deformation)
function Particles({ count = 2500 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Track cursor coordinates globally (scaled to match WebGL coordinates)
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates between -1 and 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random vertex matrices once
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#8B5CF6'), // Purple
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#06B6D4'), // Cyan
      new THREE.Color('#050816'), // Dark bg blend
    ];

    for (let i = 0; i < count; i++) {
      // Random coordinates inside a sphere-like/ellipsoid cloud
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const radius = THREE.MathUtils.randFloat(4, 25);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Color weights
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, [count]);

  // Frame animations (rotation & mouse-pull deforms)
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();

    // Slow orbital rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = time * 0.01;

    // Gentle magnetic mouse-pull calculations
    // Pull the particle group slightly toward the normalized mouse coordinates
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.current.x * 2.5, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.current.y * 2.5, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 2. Orbital Ring Component
function OrbitalRings() {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.15;
      ringRef1.current.rotation.x = time * 0.05;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.1;
      ringRef2.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group>
      {/* Ring 1 - Cyan accent */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[12, 12.1, 64]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Ring 2 - Purple accent */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, -Math.PI / 4, 0]}>
        <ringGeometry args={[16, 16.15, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 3. Main WebGL Canvas Container
export default function ThreeBackground() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  if (!active) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <Particles count={2500} />
      <OrbitalRings />
    </Canvas>
  );
}
