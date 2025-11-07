import React, { useState } from 'react';
import type { VisitorData, Treatment, RecommendedTest, TestType, MedicalReport, VitalSignCheckup } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { PlusIcon } from './icons/Icons';

// MODALS (In-file to adhere to file constraints)
const AddTreatmentModal: React.FC<{onClose: () => void, onAdd: (t: Omit<Treatment, 'id'>) => void}> = ({onClose, onAdd}) => {
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ medication, dosage, frequency });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Add New Treatment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Medication Name" value={medication} onChange={e => setMedication(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <input type="text" placeholder="Dosage (e.g., 50mg)" value={dosage} onChange={e => setDosage(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <input type="text" placeholder="Frequency (e.g., Twice daily)" value={frequency} onChange={e => setFrequency(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">Add Treatment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const RecommendTestModal: React.FC<{onClose: () => void, onAdd: (t: Omit<RecommendedTest, 'id'>) => void}> = ({onClose, onAdd}) => {
    const [type, setType] = useState<TestType>('Lab Test');
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ type, name, reason });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Recommend New Test</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select value={type} onChange={e => setType(e.target.value as TestType)} className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white dark:bg-brand-gray-500 dark:text-white">
                        <option>Lab Test</option>
                        <option>Radiology</option>
                        <option>Scanner</option>
                        <option>Other</option>
                    </select>
                    <input type="text" placeholder="Test Name (e.g., Chest X-Ray)" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <input type="text" placeholder="Reason for test" value={reason} onChange={e => setReason(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">Add Recommendation</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const AddReportModal: React.FC<{isOpen: boolean, onClose: () => void, onAddReport: (report: Omit<MedicalReport, 'id'>) => void;}> = ({ isOpen, onClose, onAddReport }) => {
  const [issue, setIssue] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (issue.trim() && treatment.trim()) { onAddReport({ issue, treatment }); setIssue(''); setTreatment(''); onClose(); } };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Add New Medical Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium text-brand-gray-500 dark:text-brand-gray-300 mb-2">Issue / Diagnosis</label>
            <input type="text" id="issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" placeholder="e.g., Atrial Fibrillation" required />
          </div>
          <div className="mb-6">
            <label htmlFor="treatment" className="block text-sm font-medium text-brand-gray-500 dark:text-brand-gray-300 mb-2">Recommended Treatment</label>
            <input type="text" id="treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" placeholder="e.g., Anticoagulant medication" required />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">Add Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};
const AddCheckupModal: React.FC<{onClose: () => void, onAdd: (checkup: Omit<VitalSignCheckup, 'id' | 'date'>) => void;}> = ({ onClose, onAdd }) => {
  const [bloodPressure, setBloodPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [respirationRate, setRespirationRate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ bloodPressure, temperature, respirationRate, notes }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Add Vital Signs & Checkup Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Blood Pressure (e.g., 120/80 mmHg)" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
          <input type="text" placeholder="Temperature (e.g., 98.6°F)" value={temperature} onChange={e => setTemperature(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
          <input type="text" placeholder="Respiration Rate (e.g., 16 bpm)" value={respirationRate} onChange={e => setRespirationRate(e.target.value)} required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
          <textarea placeholder="Additional Notes..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white h-24 resize-none" />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">Add Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// DATA
const initialTreatments: Treatment[] = [ { id: 1, medication: 'Aspirin Therapy', dosage: '81mg', frequency: 'Once daily' }, { id: 2, medication: 'Statin', dosage: '20mg', frequency: 'Once daily at bedtime' }, ];
const initialTests: RecommendedTest[] = [ { id: 1, type: 'Lab Test', name: 'Lipid Panel', reason: 'Annual checkup' }, ];
const initialReports: MedicalReport[] = [ { id: 1, issue: 'Osteoporosis', treatment: 'Bisphosphonate drugs' }, ];
const initialCheckups: VitalSignCheckup[] = [ { id: 1, date: '2024-11-25', bloodPressure: '122/81 mmHg', temperature: '98.7°F', respirationRate: '15 bpm' } ];
const tabs = ['Treatment', 'Recommended Tests', 'Issue Found', 'Vital Signs & Checkups'];

const VisitorsAndTreatment: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [tests, setTests] = useState<RecommendedTest[]>(initialTests);
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [checkups, setCheckups] = useState<VitalSignCheckup[]>(initialCheckups);

  const [isTreatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [isTestModalOpen, setTestModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);

  const addTreatment = (treatment: Omit<Treatment, 'id'>) => setTreatments(prev => [...prev, { ...treatment, id: Date.now() }]);
  const addTest = (test: Omit<RecommendedTest, 'id'>) => setTests(prev => [...prev, { ...test, id: Date.now() }]);
  const addReport = (report: Omit<MedicalReport, 'id'>) => setReports([...reports, { ...report, id: Date.now() }]);
  const addCheckup = (checkup: Omit<VitalSignCheckup, 'id'|'date'>) => setCheckups([...checkups, { ...checkup, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);

  return (
    <>
    <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm flex flex-col flex-grow">
      <div className="flex items-center border-b dark:border-brand-gray-500 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${ activeTab === tab ? 'text-brand-gray-600 dark:text-gray-100 border-b-2 border-brand-orange' : 'text-brand-gray-400' }`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 flex-grow min-h-[256px]">
        {activeTab === 'Treatment' && (
          <div>
            <div className="space-y-2">
                {treatments.map(t => (
                    <div key={t.id} className="p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg">
                        <p className="font-semibold text-brand-gray-600 dark:text-white">{t.medication}</p>
                        <p className="text-sm text-brand-gray-400 dark:text-brand-gray-300">{t.dosage} - {t.frequency}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setTreatmentModalOpen(true)} className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-orange bg-brand-orange-light dark:bg-brand-orange/20 py-2 rounded-lg hover:bg-brand-orange/20 dark:hover:bg-brand-orange/30 transition-colors">
                <PlusIcon /> Add Treatment
            </button>
          </div>
        )}
        {activeTab === 'Recommended Tests' && (
            <div>
            <div className="space-y-2">
                {tests.map(t => (
                    <div key={t.id} className="p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg">
                        <p className="font-semibold text-brand-gray-600 dark:text-white">{t.name} <span className="text-xs font-normal bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full ml-2">{t.type}</span></p>
                        <p className="text-sm text-brand-gray-400 dark:text-brand-gray-300">{t.reason}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setTestModalOpen(true)} className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-orange bg-brand-orange-light dark:bg-brand-orange/20 py-2 rounded-lg hover:bg-brand-orange/20 dark:hover:bg-brand-orange/30 transition-colors">
                <PlusIcon /> Recommend Test
            </button>
          </div>
        )}
        {activeTab === 'Issue Found' && (
            <div>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg">
                    <p className="text-sm font-semibold text-brand-gray-600 dark:text-gray-100">{report.issue}</p>
                    <p className="text-xs text-brand-gray-400">{report.treatment}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsReportModalOpen(true)} className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-orange bg-brand-orange-light dark:bg-brand-orange/20 py-2 rounded-lg hover:bg-brand-orange/20 dark:hover:bg-brand-orange/30 transition-colors">
                <PlusIcon /> Add Medical Report
              </button>
            </div>
        )}
        {activeTab === 'Vital Signs & Checkups' && (
            <div>
              <div className="space-y-3">
                {checkups.map(c => (
                  <div key={c.id} className="p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-brand-gray-600 dark:text-white">{c.date}</p>
                      <span className="text-xs font-normal bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full ml-2">Vitals Recorded</span>
                    </div>
                    <div className="text-sm text-brand-gray-400 dark:text-brand-gray-300 mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                        <span>BP: {c.bloodPressure}</span>
                        <span>Temp: {c.temperature}</span>
                        <span>RR: {c.respirationRate}</span>
                    </div>
                    {c.notes && <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400 mt-2 italic">Notes: {c.notes}</p>}
                  </div>
                ))}
              </div>
              <button onClick={() => setIsCheckupModalOpen(true)} className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-orange bg-brand-orange-light dark:bg-brand-orange/20 py-2 rounded-lg hover:bg-brand-orange/20 dark:hover:bg-brand-orange/30 transition-colors">
                <PlusIcon /> Add Checkup Record
              </button>
            </div>
          )}
      </div>
    </div>
    {isTreatmentModalOpen && <AddTreatmentModal onClose={() => setTreatmentModalOpen(false)} onAdd={addTreatment} />}
    {isTestModalOpen && <RecommendTestModal onClose={() => setTestModalOpen(false)} onAdd={addTest} />}
    {isReportModalOpen && <AddReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} onAddReport={addReport} />}
    {isCheckupModalOpen && <AddCheckupModal onClose={() => setIsCheckupModalOpen(false)} onAdd={addCheckup} />}
    </>
  );
};

export default VisitorsAndTreatment;