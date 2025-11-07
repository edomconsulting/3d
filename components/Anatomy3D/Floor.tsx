// src/components/Anatomy3D/Floor.tsx
import React from 'react';
import { Plane } from '@react-three/drei';

// FIX: Create an aliased component with `as any` to bypass TypeScript's JSX intrinsic element check.
const MeshStandardMaterial = 'meshStandardMaterial' as any;

export default function Floor() {
  return (
    <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} args={[20, 20]}>
      <MeshStandardMaterial color="#e5e5e5" />
    </Plane>
  );
}