
import React from 'react';
import MetricCard from './MetricCard';
import type { Metric } from '../types';
import { InfoIcon, BarChartIcon, ThreeDotsIcon, ArrowDownIcon } from './icons/Icons';

const glucoseData = Array.from({ length: 15 }, (_, i) => ({ name: `D${i}`, value: Math.random() * 80 + 20 }));
const cholesterolData = Array.from({ length: 15 }, (_, i) => ({ name: `D${i}`, value: Math.random() * 80 + 20 }));
const paracetamolData = [{ name: 'A', value: 60 }, { name: 'B', value: 40 }];

const metrics: Metric[] = [
  {
    title: 'Glucose Level',
    value: '127',
    unit: 'ml',
    goal: '125ml/day',
    trend: { value: '' },
    data: glucoseData,
    chartType: 'bar',
    chartColor: '#8884d8',
  },
  {
    title: 'Cholesterol Level',
    value: '164',
    unit: 'mg',
    goal: '160ml/day',
    trend: { value: '' },
    data: cholesterolData,
    chartType: 'area',
    chartColor: '#82ca9d',
  },
  {
    title: 'Paracetamol',
    value: '35',
    unit: '%',
    goal: '40%/day',
    trend: { value: 'more than last week' },
    data: paracetamolData,
    chartType: 'bar',
    chartColor: '#ffc658',
  },
];

const PatientBodyAnalysis: React.FC = () => {
  return (
    <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-orange-light rounded-lg">
                <BarChartIcon className="text-brand-orange"/>
            </div>
            <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">Patient Body Analysis</h3>
            <InfoIcon className="text-brand-gray-300 dark:text-brand-gray-400"/>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm px-3 py-1.5 border dark:border-brand-gray-500 rounded-lg text-brand-gray-500 dark:text-gray-300">
                Real Time <ArrowDownIcon className="w-4 h-4"/>
            </button>
            <button><ThreeDotsIcon/></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default PatientBodyAnalysis;
