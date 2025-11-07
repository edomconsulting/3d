import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import AnatomyModel from './AnatomyModel';
import DescriptionPopup from './DescriptionPopup';
import AnnotationTool from './AnnotationTool';
import ScalpelTool from './ScalpelTool';
import Floor from './Floor';
import ErrorBoundary from './ErrorBoundary';
import PlaceholderModel from './PlaceholderModel';
import InstructionalModal from './InstructionalModal';

import {
  Drawer, List, ListItem, ListItemText, Select, MenuItem,
  FormControl, InputLabel, Button, TextField, Typography,
  Box, IconButton, Tooltip
} from '@mui/material';

import {
  ZoomInIcon, ZoomOutIcon, RotateCwIcon, InfoIcon, Edit3Icon, SurgeryIcon,
  ArrowUpIcon, SearchIcon, HomeIcon, QuestionMarkCircleIcon
} from '../icons/Icons';

// FIX: Create aliased components with `as any` to bypass TypeScript's JSX intrinsic element check,
// which is necessary when the tsconfig cannot be modified to correctly recognize the react-three-fiber namespace.
const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;

const mockManifest = [
  { id: 'full_body', title_fr: 'Corps Entier' },
  { id: 'heart', title_fr: 'Cœur' },
  { id: 'lungs', title_fr: 'Poumons' },
  { id: 'liver', title_fr: 'Foie' },
  { id: 'kidneys', title_fr: 'Reins' },
  { id: 'brain', title_fr: 'Cerveau' },
  { id: 'stomach', title_fr: 'Estomac' },
  { id: 'intestines', title_fr: 'Intestins' },
  { id: 'spleen', title_fr: 'Rate' },
  { id: 'pancreas', title_fr: 'Pancréas' },
  { id: 'bladder', title_fr: 'Vessie' },
  { id: 'uterus', title_fr: 'Utérus' },
  { id: 'prostate', title_fr: 'Prostate' },
  { id: 'thyroid', title_fr: 'Thyroïde' },
  { id: 'skin', title_fr: 'Peau' },
  { id: 'skeleton', title_fr: 'Squelette' },
];

const mockMetadata: Record<string, { name: string; desc: string }> = {
  heart: { name: 'Cœur', desc: 'Organe central du système circulatoire.' },
  lungs: { name: 'Poumons', desc: 'Échange gazeux O₂/CO₂.' },
  liver: { name: 'Foie', desc: 'Filtration sanguine, métabolisme.' },
  mock_part: { name: 'Placeholder Model', desc: 'Could not load the 3D model file. Please ensure the .glb files are in the public/models directory.'},
  full_body: { name: 'Corps Entier', desc: 'Système anatomique complet.' },
  kidneys: { name: 'Reins', desc: 'Organes de filtration et d\'excrétion.' },
  brain: { name: 'Cerveau', desc: 'Centre de contrôle du système nerveux.' },
  stomach: { name: 'Estomac', desc: 'Organe principal de la digestion.' },
  intestines: { name: 'Intestins', desc: 'Partie du tube digestif responsable de l\'absorption.' },
  spleen: { name: 'Rate', desc: 'Organe impliqué dans le système immunitaire.' },
  pancreas: { name: 'Pancréas', desc: 'Glande qui produit des enzymes et des hormones.' },
  bladder: { name: 'Vessie', desc: 'Organe qui stocke l\'urine.' },
  uterus: { name: 'Utérus', desc: 'Organe reproducteur féminin.' },
  prostate: { name: 'Prostate', desc: 'Glande du système reproducteur masculin.' },
  thyroid: { name: 'Thyroïde', desc: 'Glande qui régule le métabolisme.' },
  skin: { name: 'Peau', desc: 'Le plus grand organe du corps, formant une barrière protectrice.' },
  skeleton: { name: 'Squelette', desc: 'La charpente osseuse du corps.' },
};

// Preload all GLTF models for faster access
mockManifest.forEach(m => useGLTF.preload(`/models/${m.id}.glb`));

export default function FullAnatomySystem() {
  const [moduleId, setModuleId] = useState('full_body');
  const [selected, setSelected] = useState<string | null>(null);
  const [operation, setOperation] = useState(false);
  const [annotations, setAnnotations] = useState<{ pos: [number, number, number]; text: string }[]>([]);
  const [visibleSystem, setVisibleSystem] = useState('all');
  const [showForces, setShowForces] = useState(false);
  const [search, setSearch] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    // Show instructions modal only once per session on the first load.
    const hasSeenInstructions = sessionStorage.getItem('hasSeen3DInstructions');
    if (!hasSeenInstructions) {
      setHelpModalOpen(true);
      sessionStorage.setItem('hasSeen3DInstructions', 'true');
    }
  }, []);

  const handlePartClick = (part: string, pos: [number, number, number]) => {
    setSelected(part);
  };

  const addAnnotation = (txt: string) => {
    if (txt) setAnnotations(a => [...a, { pos: [0, 1.5, 0], text: txt }]);
  };

  const ModelFallback = (
    <PlaceholderModel 
      moduleId={moduleId} 
      onPartClick={handlePartClick} 
    />
  );


  return (
     <Box sx={{ display: 'flex', height: '100%', width: '100%', bgcolor: 'grey.100' }}>
      <InstructionalModal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)} />
      
      {/* ---------- Sidebar ---------- */}
      <Drawer variant="permanent" sx={{ width: 320, flexShrink: 0, '& .MuiDrawer-paper': { width: 320, boxSizing: 'border-box', position: 'relative' } }}>
        <Box sx={{ width: 320, p: 2, overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Anatomie 3D</Typography>

          <TextField
            fullWidth size="small" placeholder="Rechercher…"
            value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon className="w-5 h-5 text-gray-400" style={{ marginRight: 8 }} /> }}
            sx={{ mb: 2 }}
          />

          <Button fullWidth variant="outlined" startIcon={<HomeIcon />}
            onClick={() => setModuleId('full_body')} sx={{ mb: 2 }}>
            Corps Entier
          </Button>

          <Typography variant="subtitle2" gutterBottom>Organes</Typography>
          <List dense>
            {mockManifest
              .filter(m => m.title_fr.toLowerCase().includes(search.toLowerCase()))
              .map(m => (
                <ListItem key={m.id} button selected={moduleId === m.id}
                  onClick={() => setModuleId(m.id)}>
                  <ListItemText primary={m.title_fr} />
                </ListItem>
              ))}
          </List>

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel>Système</InputLabel>
            <Select value={visibleSystem} label="Système"
              onChange={e => setVisibleSystem(e.target.value)}>
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="Organe">Organes</MenuItem>
              <MenuItem value="Muscle">Muscles</MenuItem>
              <MenuItem value="Os">Os</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant={showForces ? 'contained' : 'outlined'}
            color="secondary" startIcon={<ArrowUpIcon />}
            onClick={() => setShowForces(!showForces)} sx={{ mt: 1 }}>
            {showForces ? 'Masquer' : 'Afficher'} Forces
          </Button>
        </Box>
      </Drawer>

      {/* ---------- 3D Canvas ---------- */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Tooltip title="Help / Setup Guide">
            <IconButton 
                onClick={() => setHelpModalOpen(true)}
                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
                <QuestionMarkCircleIcon className="w-6 h-6 text-gray-600"/>
            </IconButton>
        </Tooltip>

        <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
          <AmbientLight intensity={0.5} />
          <DirectionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={<Html center>Chargement du modèle 3D...</Html>}>
            <ErrorBoundary fallback={ModelFallback}>
              <Physics>
                <AnatomyModel
                  moduleId={moduleId}
                  onPartClick={handlePartClick}
                  operationMode={operation}
                />
                {operation && <Floor />}
                {operation && <ScalpelTool />}
              </Physics>
            </ErrorBoundary>
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>

        {/* ---------- Toolbar ---------- */}
        <Box sx={{
          position: 'absolute', bottom: 16, left: '50%',
          transform: 'translateX(-50%)', bgcolor: 'rgba(255,255,255,0.95)',
          borderRadius: 2, p: 1.5, display: 'flex', gap: 1, boxShadow: 3
        }}>
          <Tooltip title="Zoom +"><IconButton size="small"><ZoomInIcon className="w-5 h-5"/></IconButton></Tooltip>
          <Tooltip title="Zoom -"><IconButton size="small"><ZoomOutIcon className="w-5 h-5"/></IconButton></Tooltip>
          <Tooltip title="Rotation"><IconButton size="small"><RotateCwIcon className="w-5 h-5"/></IconButton></Tooltip>
          <Tooltip title="Info"><IconButton size="small"><InfoIcon className="w-5 h-5"/></IconButton></Tooltip>
          <Tooltip title="Annoter"><IconButton size="small" disabled={!operation}><Edit3Icon className="w-5 h-5"/></IconButton></Tooltip>
          <Tooltip title={operation ? "Quitter" : "Mode Chirurgical"}>
            <IconButton size="small" color={operation ? 'error' : 'default'}
              onClick={() => setOperation(!operation)}>
              <SurgeryIcon className="w-5 h-5"/>
            </IconButton>
          </Tooltip>
        </Box>

        <DescriptionPopup part={selected} metadata={mockMetadata} onClose={() => setSelected(null)} />
        {operation && <AnnotationTool onAdd={addAnnotation} />}
      </Box>
    </Box>
  );
}