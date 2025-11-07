
import React, { useState } from 'react';
import type { MedicalReport } from '../types';

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReport: (report: Omit<MedicalReport, 'id'>) => void;
}

const AddReportModal: React.FC<AddReportModalProps> = ({ isOpen, onClose, onAddReport }) => {
  const [issue, setIssue] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim() && treatment.trim()) {
      onAddReport({ issue, treatment });
      setIssue('');
      setTreatment('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Add New Medical Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium text-brand-gray-500 dark:text-brand-gray-300 mb-2">
              Issue / Diagnosis
            </label>
            <input
              type="text"
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white"
              placeholder="e.g., Atrial Fibrillation"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="treatment" className="block text-sm font-medium text-brand-gray-500 dark:text-brand-gray-300 mb-2">
              Recommended Treatment
            </label>
            <input
              type="text"
              id="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white"
              placeholder="e.g., Anticoagulant medication"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors"
            >
              Add Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReportModal;
