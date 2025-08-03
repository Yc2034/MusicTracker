// src/components/common/Stars.tsx
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// A custom 2D star shape geometry (Unchanged)
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

// Hooks for SVG geometries (Unchanged)
let cachedSunGeometry: THREE.BufferGeometry | null = null;
const useSunGeometry = () => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(cachedSunGeometry);
  useEffect(() => {
    if (cachedSunGeometry) {
      setGeometry(cachedSunGeometry);
      return;
    }
    new SVGLoader().load('/star.svg', (data) => {
      const geometries: THREE.BufferGeometry[] = [];
      data.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          geometries.push(new THREE.ShapeGeometry(shape));
        });
      });
      if (geometries.length === 0) return;
      const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
      mergedGeometry.center();
      mergedGeometry.computeBoundingBox();
      const box = mergedGeometry.boundingBox!;
      const size = new THREE.Vector3();
      box.getSize(size);
      const scale = 1.0 / Math.max(size.x, size.y, size.z);
      mergedGeometry.scale(scale, scale, scale);
      cachedSunGeometry = mergedGeometry;
      setGeometry(mergedGeometry);
    });
  }, []);
  return geometry;
};

let cachedQuaverGeometry: THREE.BufferGeometry | null = null;
const useQuaverGeometry = () => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(cachedQuaverGeometry);
  useEffect(() => {
    if (cachedQuaverGeometry) {
      setGeometry(cachedQuaverGeometry);
      return;
    }
    new SVGLoader().load('/quaver.svg', (data) => {
      const geometries: THREE.BufferGeometry[] = [];
      data.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          geometries.push(new THREE.ShapeGeometry(shape));
        });
      });
      if (geometries.length === 0) return;
      const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
      mergedGeometry.center();
      mergedGeometry.computeBoundingBox();
      const box = mergedGeometry.boundingBox!;
      const size = new THREE.Vector3();
      box.getSize(size);
      const scale = 1.0 / Math.max(size.x, size.y, size.z);
      mergedGeometry.scale(scale, scale, scale);
      cachedQuaverGeometry = mergedGeometry;
      setGeometry(mergedGeometry);
    });
  }, []);
  return geometry;
};


// This component will randomly render a star, quaver, or sun
const FloatingShape: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  const quaverGeometry = useQuaverGeometry();
  const sunGeometry = useSunGeometry();

  const shapeType = useMemo(() => {
    const weightedShapes = ['star',  'star', 'quaver', 'sun'];
    return weightedShapes[Math.floor(Math.random() * weightedShapes.length)];
  }, []);

  const [position, color, scale, rotation] = useMemo(() => {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 5
    );
    
    let shapeColor;
    // Updated color logic for a more cohesive and subtle theme
    switch (shapeType) {
        case 'quaver':
        case 'sun':
            // Quavers and suns will use the golden accent color with varying lightness
            shapeColor = new THREE.Color('#D4A056').multiplyScalar(Math.random() * 0.5 + 0.5);
            break;
        default: // 'star'
            // Stars will be a subtle, shimmering off-white
            shapeColor = new THREE.Color('#FFFFFF').multiplyScalar(Math.random() * 0.4 + 0.4);
            break;
    }

    const scale = Math.random() * 0.4 + 0.1;
    const rotation = new THREE.Euler(0, 0, Math.random() * Math.PI * 2);
    return [position, shapeColor, scale, rotation];
  }, [shapeType]);

  useFrame((state, delta) => {
    mesh.current.position.y += delta * 0.05;
    if (mesh.current.position.y > 10) {
        mesh.current.position.y = -10;
    }
  });
  
  if ((shapeType === 'quaver' && !quaverGeometry) || (shapeType === 'sun' && !sunGeometry)) {
      return null;
  }

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={rotation}>
        {shapeType === 'star' && <StarGeometry />}
        {shapeType === 'quaver' && quaverGeometry && <primitive object={quaverGeometry} attach="geometry" />}
        {shapeType === 'sun' && sunGeometry && <primitive object={sunGeometry} attach="geometry" />}
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
    </mesh>
  );
};


// The main export component
export const Stars: React.FC = () => {
  const shapes = useMemo(() => Array.from({ length: 150 }).map((_, i) => <FloatingShape key={i} />), []);
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {shapes}
    </Canvas>
  );
};