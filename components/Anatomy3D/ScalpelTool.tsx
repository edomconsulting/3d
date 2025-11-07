// src/components/Anatomy3D/ScalpelTool.tsx
import React from 'react';
import { Sphere } from '@react-three/drei';

// FIX: Create an aliased component with `as any` to bypass TypeScript's JSX intrinsic element check.
const MeshStandardMaterial = 'meshStandardMaterial' as any;

export default function ScalpelTool() {
  return (
    <Sphere args={[0.08, 16, 16]} position={[0, 0.5, 0]}>
      <MeshStandardMaterial color="silver" />
    </Sphere>
  );
}