import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const InstructionalModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                maxWidth: '500px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3D3E42', margin: '0 0 16px 0' }}>
                    Welcome to the 3D Anatomy Viewer
                </h2>
                <p style={{ fontSize: '16px', color: '#606166', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                    To get started, you need to add the 3D anatomical models to the project.
                </p>
                <div style={{ background: '#F7F8FA', padding: '16px', borderRadius: '8px', textAlign: 'left', border: '1px solid #EFEFEF' }}>
                   <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#3D3E42' }}>Required Steps:</p>
                   <ol style={{ paddingLeft: '20px', margin: 0, color: '#606166' }}>
                       <li style={{ marginBottom: '8px' }}>
                           Download the <strong>ehs-anatomy-gltf-pack.zip</strong> file.
                       </li>
                       <li>
                           Unzip it and place all the <strong>.glb</strong> files into the <strong>/public/models/</strong> directory in your project.
                       </li>
                   </ol>
                </div>
                 <p style={{ fontSize: '14px', color: '#8A8B90', marginTop: '16px' }}>
                    A download link was previously provided. Once the files are in place, the models will load automatically.
                </p>
                <button 
                    onClick={onClose}
                    style={{
                        marginTop: '24px',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#F97A4A',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E86A3A'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F97A4A'}
                >
                    Got it, let's start!
                </button>
            </div>
        </div>
    );
};

export default InstructionalModal;