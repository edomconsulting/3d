// src/components/Anatomy3D/AnnotationTool.tsx
import React, { useState } from 'react';

interface Props { onAdd: (txt: string) => void; }

export default function AnnotationTool({ onAdd }: Props) {
  const [txt, setTxt] = useState('');
  return (
    <div style={{ position: 'absolute', bottom: 80, left: 20 }}>
      <input value={txt} onChange={e => setTxt(e.target.value)}
             placeholder="Annotation…" style={{ padding: 8, borderRadius: '4px', border: '1px solid #ccc' }} />
      <button onClick={() => { onAdd(txt); setTxt(''); }}
              style={{ marginLeft: 4, padding: '8px 12px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>
        Ajouter
      </button>
    </div>
  );
}
