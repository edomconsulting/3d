
import React, { useState } from 'react';
import type { MedicalReport } from '../types';
import AddReportModal from './AddReportModal';
import { InfoIcon, ArrowRightIcon, PlusIcon } from './icons/Icons';

const initialReports: MedicalReport[] = [
  { id: 1, issue: 'Osteoporosis', treatment: 'Bisphosphonate drugs' },
];

const IssueFound: React.FC = () => {
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addReport = (report: Omit<MedicalReport, 'id'>) => {
    const newReport = { ...report, id: Date.now() };
    setReports([...reports, newReport]);
  };

  return (
    <>
      <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">Issue Found</h3>
            <InfoIcon className="text-brand-gray-300 dark:text-brand-gray-400" />
          </div>
          <button className="p-2 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg"><ArrowRightIcon /></button>
        </div>
        <div className="mt-4 space-y-2">
          {reports.map((report) => (
            <div key={report.id}>
              <p className="text-sm font-medium text-brand-gray-500 dark:text-gray-300">{report.issue}</p>
              <p className="text-xs text-brand-gray-400">{report.treatment}</p>
            </div>
          ))}
        </div>
         <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-orange bg-brand-orange-light dark:bg-brand-orange/20 dark:hover:bg-brand-orange/30 py-2 rounded-lg hover:bg-brand-orange/20 transition-colors"
        >
          <PlusIcon />
          Add Medical Report
        </button>
      </div>
      <AddReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReport={addReport}
      />
    </>
  );
};

export default IssueFound;
