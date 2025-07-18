import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A custom 2D star shape geometry ⭐
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

// A custom 2D cloud shape geometry ☁️
const CloudGeometry = () => {
    const cloudShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-0.5, -0.1);
        shape.bezierCurveTo(-0.7, 0.3, -0.3, 0.4, 0, 0.3);
        shape.bezierCurveTo(0.4, 0.5, 0.7, 0.3, 0.5, 0.0);
        shape.bezierCurveTo(0.8, -0.3, 0.4, -0.2, 0.1, -0.2);
        shape.bezierCurveTo(-0.2, -0.4, -0.4, -0.3, -0.5, -0.1);
        shape.closePath();
        return shape;
    }, []);

    return <shapeGeometry args={[cloudShape]} />;
};

// A custom 2D raindrop shape geometry 💧
const RainGeometry = () => {
    const rainShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.5);
        shape.quadraticCurveTo(0.4, 0, 0, 0.5);
        shape.quadraticCurveTo(-0.4, 0, 0, -0.5);
        shape.closePath();
        return shape;
    }, []);

    return <shapeGeometry args={[rainShape]} />;
};


// This component will randomly render a star, cloud, or rain drop
const FloatingShape: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  // Randomly select a shape type, respecting the 3:1:1 ratio
  const shapeType = useMemo(() => {
    // Weighted array: 3 stars, 1 cloud, 1 rain
    const weightedShapes = ['star', 'star', 'star', 'cloud', 'rain'];
    return weightedShapes[Math.floor(Math.random() * weightedShapes.length)];
  }, []);

  const [position, color, scale, rotation] = useMemo(() => {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 5
    );
    
    let shapeColor;
    // Assign specific colors to shapes
    switch (shapeType) {
        case 'cloud':
            shapeColor = new THREE.Color('#F0F8FF'); // AliceBlue
            break;
        case 'rain':
            shapeColor = new THREE.Color('#87CEEB'); // SkyBlue
            break;
        default: // 'star'
            shapeColor = new THREE.Color().setHSL(Math.random(), 0.8, 0.7); // Random pastel
            break;
    }

    const scale = Math.random() * 0.4 + 0.1;
    const rotation = new THREE.Euler(0, 0, Math.random() * Math.PI * 2);
    return [position, shapeColor, scale, rotation];
  }, [shapeType]);

  useFrame((state, delta) => {
    // Gentle floating animation
    mesh.current.position.y += delta * 0.05;
    if (mesh.current.position.y > 10) {
        mesh.current.position.y = -10;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={rotation}>
        {/* Conditionally render the correct geometry based on shapeType */}
        {shapeType === 'star' && <StarGeometry />}
        {shapeType === 'cloud' && <CloudGeometry />}
        {shapeType === 'rain' && <RainGeometry />}
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

// The main export component, rendering a mix of shapes based on the specified ratio
export const Stars: React.FC = () => {
  const shapes = useMemo(() => Array.from({ length: 150 }).map((_, i) => <FloatingShape key={i} />), []);
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {shapes}
    </Canvas>
  );
};