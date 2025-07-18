// src/components/common/Stars.tsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A custom 2D star shape geometry
const StarGeometry = () => {
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.5;
    const innerRadius = 0.25;
    const numPoints = 5;
    shape.moveTo(0, outerRadius);
    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / numPoints;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  return <shapeGeometry args={[starShape]} />;
};

const Star: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  const [position, color, scale, rotation] = useMemo(() => {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 5 // Reduced Z-depth for a more 2D feel
    );
    // Generate a random pastel color
    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.7);
    const scale = Math.random() * 0.4 + 0.1;
    const rotation = new THREE.Euler(0, 0, Math.random() * Math.PI);
    return [position, color, scale, rotation];
  }, []);

  useFrame((state, delta) => {
    // Gentle floating animation
    mesh.current.position.y += delta * 0.05;
    if (mesh.current.position.y > 10) {
        mesh.current.position.y = -10;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={rotation}>
        <StarGeometry />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

export const Stars: React.FC = () => {
  const stars = useMemo(() => Array.from({ length: 150 }).map((_, i) => <Star key={i} />), []);
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {stars}
    </Canvas>
  );
};