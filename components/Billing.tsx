

import React, { useState, useEffect, useRef } from 'react';

type Acte = { id: number; date: string; code: string; description: string; lettreCle: string; cotation: string; valeurCle: string; montant: number; };
type Ordonnance = { id: number; date: string; description: string; inpe: string; prix: number; };
type Analyse = { id: number; date: string; code: string; description: string; lettreCle: string; cotation: string; valeurCle: string; montant: number; inpe: string; };
type Paramedical = { id: number; date: string; code: string; description: string; lettreCle: string; cotation: string; valeurCle: string; montant: number; inpe: string; };
type UploadedFile = { name: string; size: number; };

const Billing: React.FC = () => {
    const [formData, setFormData] = useState({ nomMedecin: '' });
    const [actes, setActes] = useState<Acte[]>([{ id: 1, date: '', code: '', description: '', lettreCle: '', cotation: '', valeurCle: '', montant: 0 }]);
    const [ordonnances, setOrdonnances] = useState<Ordonnance[]>([{ id: 1, date: '', description: '', inpe: '', prix: 0 }]);
    const [analyses, setAnalyses] = useState<Analyse[]>([{ id: 1, date: '', code: '', description: '', lettreCle: '', cotation: '', valeurCle: '', montant: 0, inpe: '' }]);
    const [paramedicaux, setParamedicaux] = useState<Paramedical[]>([{ id: 1, date: '', code: '', description: '', lettreCle: '', cotation: '', valeurCle: '', montant: 0, inpe: '' }]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [totals, setTotals] = useState({ actes: 0, ordonnances: 0, analyses: 0, paramedicaux: 0, general: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        const totalActes = actes.reduce((sum, item) => sum + (item.montant || 0), 0);
        const totalOrdonnances = ordonnances.reduce((sum, item) => sum + (item.prix || 0), 0);
        const totalAnalyses = analyses.reduce((sum, item) => sum + (item.montant || 0), 0);
        const totalParamedicaux = paramedicaux.reduce((sum, item) => sum + (item.montant || 0), 0);
        const totalGeneral = totalActes + totalOrdonnances + totalAnalyses + totalParamedicaux;
        setTotals({ actes: totalActes, ordonnances: totalOrdonnances, analyses: totalAnalyses, paramedicaux: totalParamedicaux, general: totalGeneral });
    }, [actes, ordonnances, analyses, paramedicaux]);

    // FIX: Updated handleTableChange to be more type-safe with stricter generics.
    // This ensures that the `value`'s type matches the type of the `field` being updated.
    const handleTableChange = <T extends { id: number }, K extends keyof T>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        id: number,
        field: K,
        value: T[K]
    ) => {
        setter(prev => prev.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    };

    const addRow = <T extends { id: number }>(setter: React.Dispatch<React.SetStateAction<T[]>>, newRow: Omit<T, 'id'>) => {
        setter(prev => [...prev, { ...newRow, id: Date.now() } as T]);
    };

    const removeRow = <T extends { id: number }>(id: number, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        setter(prev => prev.length > 1 ? prev.filter(row => row.id !== id) : prev);
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map((f: File) => ({ name: f.name, size: f.size }));
            setUploadedFiles(prev => [...prev, ...files]);
        }
    };
    
    const removeFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
    };

    const billingStyles = `
        :root {
            --primary-500: #005A9C; --primary-700: #004375; --primary-100: #E6F0F6;
            --neutral-900: #18181B; --neutral-700: #3F3F46; --neutral-500: #A1A1AA; --neutral-200: #E4E4E7; --neutral-100: #F4F4F5; --neutral-0: #FFFFFF;
            --success: #16A34A; --warning: #F97316; --error: #DC2626;
            --space-xs: 8px; --space-sm: 16px; --space-md: 24px; --space-lg: 32px; --space-xl: 48px; --space-xxl: 64px;
            --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
        }
        .billing-page-container { color: var(--neutral-900); line-height: 1.6; }
        .billing-page-container .container { max-width: 960px; margin: 0 auto; padding: 0; }
        .billing-page-container .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-xl); padding: var(--space-lg); background: var(--neutral-0); border-radius: var(--radius-md); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07); }
        .billing-page-container .header-left { display: flex; align-items: center; gap: var(--space-md); }
        .billing-page-container .logo { height: 48px; width: auto; }
        .billing-page-container .logo-text { font-size: 14px; color: var(--neutral-700); font-weight: 500; }
        .billing-page-container .header-title { font-size: 32px; font-weight: 700; color: var(--primary-500); margin-bottom: var(--space-xs); }
        .billing-page-container .header-subtitle { font-size: 16px; color: var(--neutral-700); }
        .billing-page-container .btn { display: inline-flex; align-items: center; gap: var(--space-xs); padding: 12px 24px; border: none; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; text-decoration: none; }
        .billing-page-container .btn-primary { background-color: var(--primary-500); color: var(--neutral-0); }
        .billing-page-container .btn-primary:hover { background-color: var(--primary-700); transform: translateY(-1px); }
        .billing-page-container .btn-secondary { background-color: var(--neutral-100); color: var(--neutral-700); }
        .billing-page-container .btn-secondary:hover { background-color: var(--neutral-200); }
        .billing-page-container .section { background-color: var(--neutral-0); border-radius: var(--radius-md); padding: var(--space-lg); margin-bottom: var(--space-lg); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07); }
        .billing-page-container .section-title { font-size: 24px; font-weight: 600; color: var(--neutral-900); margin-bottom: var(--space-md); display: flex; align-items: center; gap: var(--space-sm); }
        .billing-page-container .section-icon { width: 24px; height: 24px; color: var(--primary-500); }
        .billing-page-container .instructions { background-color: var(--primary-100); border: 1px solid var(--primary-500); border-radius: var(--radius-sm); padding: var(--space-md); margin-bottom: var(--space-xl); }
        .billing-page-container .instructions h3 { color: var(--primary-700); margin-bottom: var(--space-sm); }
        .billing-page-container .instructions ul { list-style: none; padding-left: 0; }
        .billing-page-container .instructions li { margin-bottom: var(--space-xs); padding-left: var(--space-md); position: relative; }
        .billing-page-container .instructions li::before { content: "•"; color: var(--primary-500); font-weight: bold; position: absolute; left: 0; }
        .billing-page-container .form-grid { display: grid; gap: var(--space-md); }
        .billing-page-container .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        .billing-page-container .form-group { display: flex; flex-direction: column; }
        .billing-page-container .form-label { font-size: 14px; font-weight: 500; color: var(--neutral-700); margin-bottom: var(--space-xs); }
        .billing-page-container .form-label.required::after { content: " *"; color: var(--error); }
        .billing-page-container .form-input { height: 48px; padding: 12px var(--space-sm); border: 1px solid var(--neutral-500); border-radius: var(--radius-md); font-size: 16px; transition: all 0.2s ease; width: 100%; }
        .billing-page-container .form-input:focus { outline: none; border: 2px solid var(--primary-500); box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2); }
        .billing-page-container .form-textarea { min-height: 100px; padding: var(--space-sm); border: 1px solid var(--neutral-500); border-radius: var(--radius-md); font-size: 16px; resize: vertical; transition: all 0.2s ease; width: 100%; }
        .billing-page-container .form-textarea:focus { outline: none; border: 2px solid var(--primary-500); box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2); }
        .billing-page-container .radio-group { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
        .billing-page-container .radio-option { position: relative; }
        .billing-page-container .radio-input { position: absolute; opacity: 0; pointer-events: none; }
        .billing-page-container .radio-label { display: inline-flex; align-items: center; padding: 12px var(--space-md); background-color: var(--neutral-100); color: var(--neutral-700); border-radius: 25px; cursor: pointer; transition: all 0.2s ease; font-size: 14px; font-weight: 500; }
        .billing-page-container .radio-input:checked + .radio-label { background-color: var(--primary-500); color: var(--neutral-0); }
        .billing-page-container .radio-label:hover { background-color: var(--neutral-200); }
        .billing-page-container .radio-input:checked + .radio-label:hover { background-color: var(--primary-700); }
        .billing-page-container .table-container { overflow-x: auto; border-radius: var(--radius-sm); border: 1px solid var(--neutral-200); }
        .billing-page-container .data-table { width: 100%; border-collapse: collapse; background-color: var(--neutral-0); }
        .billing-page-container .data-table th { background-color: var(--neutral-100); padding: var(--space-sm); text-align: left; font-weight: 600; color: var(--neutral-700); border-bottom: 1px solid var(--neutral-200); }
        .billing-page-container .data-table td { padding: var(--space-sm); border-bottom: 1px solid var(--neutral-200); }
        .billing-page-container .data-table tbody tr:hover { background-color: var(--primary-100); }
        .billing-page-container .table-input { width: 100%; height: 40px; padding: 8px; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 14px; transition: all 0.2s ease; background: transparent; }
        .billing-page-container .table-input:focus { border: 1px solid var(--primary-500); outline: none; }
        .billing-page-container .table-total { background-color: var(--neutral-100) !important; font-weight: 600; }
        .billing-page-container .table-actions { display: flex; gap: var(--space-xs); }
        .billing-page-container .btn-small { padding: 8px 12px; font-size: 12px; }
        .billing-page-container .upload-zone { border: 2px dashed var(--neutral-500); border-radius: var(--radius-md); padding: var(--space-xl); text-align: center; background-color: var(--neutral-100); transition: all 0.2s ease; cursor: pointer; }
        .billing-page-container .upload-zone:hover { border-color: var(--primary-500); background-color: var(--primary-100); }
        .billing-page-container .upload-icon { width: 48px; height: 48px; color: var(--neutral-500); margin-bottom: var(--space-sm); margin-inline: auto; }
        .billing-page-container .upload-text { color: var(--neutral-700); margin-bottom: var(--space-xs); }
        .billing-page-container .upload-hint { color: var(--neutral-500); font-size: 14px; }
        .billing-page-container .uploaded-files { margin-top: var(--space-md); }
        .billing-page-container .file-item { display: flex; align-items: center; justify-content: space-between; padding: var(--space-sm); background-color: var(--neutral-100); border-radius: var(--radius-sm); margin-bottom: var(--space-xs); }
        .billing-page-container .file-info { display: flex; align-items: center; gap: var(--space-sm); }
        .billing-page-container .file-name { font-weight: 500; }
        .billing-page-container .file-size { color: var(--neutral-500); font-size: 14px; }
        @media (max-width: 768px) {
            .billing-page-container .form-row { grid-template-columns: 1fr; }
        }
    `;

    return (
        <div className="billing-page-container">
            <style>{billingStyles}</style>
            <div className="container">
                <div className="header">
                    <div className="header-left">
                        <svg className="logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="20" fill="var(--primary-500)"/>
                            <path d="M16 24h16M24 16v16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <div>
                            <h1 className="header-title">Feuille de Soins Digitalisée</h1>
                            <p className="header-subtitle">Demande de Remboursement - Système Unifié</p>
                            <p className="logo-text">Compatible CNOPS/AMO • SEHHA • Autres Mutuelles</p>
                        </div>
                    </div>
                </div>

                <div className="instructions">
                    <h3>Instructions à suivre</h3>
                    <ul>
                        <li>La feuille de soins doit être renseignée, signée et accompagnée des pièces originales nécessaires (ordonnance médicale, factures, codes à barres, etc.)</li>
                        <li>Les résultats des analyses biologiques ne sont pas exigés lors du dépôt des dossiers de demande de remboursement au niveau de votre Mutuelle</li>
                        <li>La feuille de soins doit porter l'INPE du médecin traitant et des professionnels de soins, ainsi que leur cachet, leur signature et la date des actes</li>
                    </ul>
                </div>

                <form id="feuilleSoinsForm">
                    <div className="section">
                        <h2 className="section-title">
                            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            Identification de l'Assuré
                        </h2>
                        <div className="form-grid">
                            <div className="form-row">
                                <div className="form-group"><label className="form-label required">Nom de l'assuré</label><input type="text" className="form-input" name="nomAssure" required/></div>
                                <div className="form-group"><label className="form-label required">Prénom de l'assuré</label><input type="text" className="form-input" name="prenomAssure" required/></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="section">
                        <h2 className="section-title">
                           <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                           Identification du Médecin Traitant
                        </h2>
                        <div className="form-grid">
                           <div className="form-row">
                               <div className="form-group"><label className="form-label required">Nom du médecin</label><input type="text" className="form-input" name="nomMedecin" value={formData.nomMedecin} onChange={handleFormChange} required/></div>
                               <div className="form-group"><label className="form-label">Spécialité</label><input type="text" className="form-input" name="specialiteMedecin"/></div>
                           </div>
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-title">
                            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            Description des Actes Effectués
                        </h2>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>Date</th><th>Code NGAP</th><th>Description</th><th>Montant (DHs)</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {actes.map(acte => (
                                        <tr key={acte.id}>
                                            <td><input type="date" className="table-input" value={acte.date} onChange={e => handleTableChange(setActes, acte.id, 'date', e.target.value)} /></td>
                                            <td><input type="text" className="table-input" value={acte.code} onChange={e => handleTableChange(setActes, acte.id, 'code', e.target.value)} /></td>
                                            <td><input type="text" className="table-input" value={acte.description} onChange={e => handleTableChange(setActes, acte.id, 'description', e.target.value)} /></td>
                                            {/* FIX: Parse input value from string to number before updating state. */}
                                            <td><input type="number" className="table-input" value={acte.montant || ''} onChange={e => handleTableChange(setActes, acte.id, 'montant', parseFloat(e.target.value) || 0)} /></td>
                                            <td><button type="button" className="btn btn-secondary btn-small" onClick={() => removeRow(acte.id, setActes)}>Supprimer</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot><tr className="table-total"><td colSpan="3" style={{textAlign: 'right'}}>Total des actes :</td><td id="totalActes">{totals.actes.toFixed(2)}</td><td></td></tr></tfoot>
                            </table>
                        </div>
                        <div style={{marginTop: 'var(--space-sm)'}}>
                           <button type="button" className="btn btn-secondary" onClick={() => addRow(setActes, { date: '', code: '', description: '', lettreCle: '', cotation: '', valeurCle: '', montant: 0 })}>Ajouter un acte</button>
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-title">
                           <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                           Ordonnances et Dispositifs
                        </h2>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>Date</th><th>Description</th><th>INPE Pharmacien</th><th>Prix (DHs)</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {ordonnances.map(item => (
                                        <tr key={item.id}>
                                            <td><input type="date" className="table-input" value={item.date} onChange={e => handleTableChange(setOrdonnances, item.id, 'date', e.target.value)} /></td>
                                            <td><input type="text" className="table-input" value={item.description} onChange={e => handleTableChange(setOrdonnances, item.id, 'description', e.target.value)} /></td>
                                            <td><input type="text" className="table-input" value={item.inpe} onChange={e => handleTableChange(setOrdonnances, item.id, 'inpe', e.target.value)} /></td>
                                            {/* FIX: Parse input value from string to number before updating state. */}
                                            <td><input type="number" className="table-input" value={item.prix || ''} onChange={e => handleTableChange(setOrdonnances, item.id, 'prix', parseFloat(e.target.value) || 0)} /></td>
                                            <td><button type="button" className="btn btn-secondary btn-small" onClick={() => removeRow(item.id, setOrdonnances)}>Supprimer</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot><tr className="table-total"><td colSpan="3" style={{textAlign: 'right'}}>Total ordonnances :</td><td>{totals.ordonnances.toFixed(2)}</td><td></td></tr></tfoot>
                            </table>
                        </div>
                         <div style={{marginTop: 'var(--space-sm)'}}>
                            <button type="button" className="btn btn-secondary" onClick={() => addRow(setOrdonnances, { date: '', description: '', inpe: '', prix: 0 })}>Ajouter un médicament</button>
                        </div>
                    </div>
                    
                    <div className="section" style={{backgroundColor: 'var(--primary-100)', border: '2px solid var(--primary-500)'}}>
                         <h2 className="section-title">
                            <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Récapitulatif Financier
                        </h2>
                        <div className="form-group">
                            <label className="form-label required">Montant total des frais (DHs)</label>
                            <input type="number" id="montantTotal" className="form-input" style={{fontSize: '20px', fontWeight: 600, backgroundColor: 'var(--primary-500)', color: 'var(--neutral-0)'}} value={totals.general.toFixed(2)} readOnly required/>
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-title">
                           <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                           Pièces Justificatives
                        </h2>
                        <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                           <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                           <p className="upload-text">Glissez-déposez vos fichiers ou cliquez pour parcourir</p>
                           <input type="file" ref={fileInputRef} multiple style={{display: 'none'}} onChange={handleFileChange} />
                        </div>
                         <div className="uploaded-files">
                            {uploadedFiles.map(file => (
                                <div key={file.name} className="file-item">
                                    <div className="file-info">
                                        <span className="file-name">{file.name}</span>
                                        <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                                    </div>
                                    <button type="button" className="btn btn-secondary btn-small" onClick={() => removeFile(file.name)}>Supprimer</button>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="section">
                        <h2 className="section-title">Déclarations et Signatures</h2>
                        <div className="form-group">
                            <label className="form-label required">Déclaration du médecin traitant</label>
                            <div style={{backgroundColor: 'var(--neutral-100)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)'}}>
                                <p><strong>Je soussigné(e) {formData.nomMedecin}, declare les informations ci-dessus sincères et véritables.</strong></p>
                            </div>
                        </div>
                     </div>
                </form>
            </div>
        </div>
    );
}

export default Billing;