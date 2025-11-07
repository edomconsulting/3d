// src/components/Anatomy3D/AnatomyModel.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import type { Mesh } from 'three';

interface Props {
  moduleId: string;
  onPartClick: (part: string, pos: [number, number, number]) => void;
  operationMode?: boolean;
}

// FIX: Create an aliased component with `as any` to bypass TypeScript's JSX intrinsic element check.
const Primitive = 'primitive' as any;

export default function AnatomyModel({ moduleId, onPartClick }: Props) {
  // Dynamically load the .glb file from the public/models directory
  const { scene } = useGLTF(`/models/${moduleId}.glb`);

  // Handle clicks on the model to identify specific parts
  const handleClick = (e: any) => {
    e.stopPropagation();
    const mesh = e.object as Mesh;
    const pos: [number, number, number] = [e.point.x, e.point.y, e.point.z];
    // Pass the mesh name (e.g., "AorticValve") or the module ID as a fallback
    onPartClick(mesh.name || moduleId, pos);
  };

  return (
    <Primitive
      object={scene}
      scale={moduleId === 'full_body' ? 0.8 : 1.2}
      position={[0, 0, 0]}
      onClick={handleClick}
    />
  );
}