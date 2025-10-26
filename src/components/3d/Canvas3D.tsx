'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

const Canvas3D: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Canvas style={{ width: '100%', height: '300px' }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
};

export default Canvas3D;
