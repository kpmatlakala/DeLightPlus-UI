'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { type ThreeElements } from '@react-three/fiber'

import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

type MeshProps = ThreeElements['mesh'];

export type Shape3DProps = {
  shape?: 'cube' | 'sphere' | 'torus' | 'diamond';
  size?: number;
  color?: string;
  wireframe?: boolean;
  className?: string;
};

const getGeometry = (shape: string, size: number): THREE.BufferGeometry => {
  switch (shape) {
    case 'sphere':
      return new THREE.SphereGeometry(size / 2, 32, 32);
    case 'torus':
      return new THREE.TorusGeometry(size / 2, size / 6, 16, 100);
    case 'diamond':
      return new THREE.OctahedronGeometry(size / 2);
    case 'cube':
    default:
      return new THREE.BoxGeometry(size, size, size);
  }
};

const RotatingShape = ({
  shape = 'cube',
  size = 1,
  color = '#3498db',
  wireframe = true,
  ...props
}: Shape3DProps & MeshProps) => {
  const geometry = getGeometry(shape, size);
  const material = new THREE.MeshStandardMaterial({ color, wireframe });

  return (
    <mesh {...props} rotation={[0.4, 0.2, 0]}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shape3D: React.FC<Shape3DProps> = ({
  shape = 'cube',
  size = 1,
  color = '#3498db',
  wireframe = true,
  className,
}) => {
  return (
    <div className={className}>
      <Canvas style={{ width: 200, height: 200 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.5} />
        <Suspense fallback={null}>
          <RotatingShape
            shape={shape}
            size={size}
            color={color}
            wireframe={wireframe}
          />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Shape3D;
