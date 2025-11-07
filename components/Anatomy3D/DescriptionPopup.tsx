// src/components/Anatomy3D/DescriptionPopup.tsx
import React from 'react';

interface Props {
  part: string | null;
  onClose: () => void;
  metadata: Record<string, { name: string; desc: string }>;
}

export default function DescriptionPopup({ part, onClose, metadata }: Props) {
  if (!part) return null;
  const data = metadata[part] ?? { name: part, desc: 'Description non disponible.' };

  return (
    <div style={{
      position: 'absolute', top: 20, right: 20, zIndex: 10,
      background: 'white', padding: 16, borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', maxWidth: 260
    }}>
      <h3 style={{ margin: 0 }}>{data.name}</h3>
      <p style={{ margin: '8px 0' }}>{data.desc}</p>
      <button onClick={onClose} style={{padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>Fermer</button>
    </div>
  );
}
