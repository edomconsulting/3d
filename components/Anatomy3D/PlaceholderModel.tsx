import React from 'react';
import { Box, Text } from '@react-three/drei';

interface Props {
  moduleId: string;
  onPartClick: (part: string, pos: [number, number, number]) => void;
}

// FIX: Create an aliased component with `as any` to bypass TypeScript's JSX intrinsic element check.
const MeshStandardMaterial = 'meshStandardMaterial' as any;

export default function PlaceholderModel({ moduleId, onPartClick }: Props) {
  const color = moduleId === 'heart' ? '#e63946' :
                moduleId === 'lungs' ? '#a8dadc' :
                moduleId === 'liver' ? '#f4a261' : '#2a9d8f';

  return (
    <>
      <Box args={[2, 3, 1]} position={[0, 1.5, 0]}
           onClick={(e) => { e.stopPropagation(); onPartClick('mock_part', [0, 1.5, 0]); }}>
        <MeshStandardMaterial color={color} wireframe />
      </Box>
      <Text
        position={[0, 1.5, 0]}
        color="black"
        fontSize={0.12}
        maxWidth={1.8}
        lineHeight={1.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        3D Model Not Found
        {'\n\n'}
        Please add '{moduleId}.glb' to the /public/models/ directory.
      </Text>
    </>
  );
}