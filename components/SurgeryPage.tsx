import React from 'react';
import FullAnatomySystem from './Anatomy3D/FullAnatomySystem';

const SurgeryPage: React.FC = () => {
  // This container now correctly fills the space allocated by the main App layout.
  return (
    <div className="h-full w-full relative">
      <FullAnatomySystem />
    </div>
  );
};

export default SurgeryPage;