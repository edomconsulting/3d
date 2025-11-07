
import React from 'react';
import type { Metric } from '../types';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, Cell } from 'recharts';

const MetricCard: React.FC<Metric> = ({ title, value, unit, goal, trend, data, chartType, chartColor }) => {
  return (
    <div className="border border-brand-gray-200 dark:border-brand-gray-500 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm text-brand-gray-500 dark:text-brand-gray-300">{title}</h4>
        <button className="text-xs text-brand-gray-400 font-semibold border border-brand-gray-200 dark:border-brand-gray-500 rounded-md px-2 py-1 hover:bg-gray-50 dark:hover:bg-brand-gray-500">Detail</button>
      </div>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div>
          <span className="text-3xl font-bold text-brand-gray-600 dark:text-gray-100">{value}</span>
          <span className="text-brand-gray-400 ml-1">{unit}</span>
          {trend.value && <p className="text-xs text-brand-gray-400 mt-1">{trend.value}</p>}
        </div>
        <div className="flex-grow h-12">
            <div className="flex justify-end text-xs text-brand-gray-400 mb-1">Your Set Goal <span className="font-semibold text-brand-gray-500 dark:text-gray-200 ml-1">{goal}</span></div>
          {chartType === 'bar' && title !== 'Paracetamol' && (
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
           {chartType === 'bar' && title === 'Paracetamol' && (
             <div className="w-full h-full flex items-end gap-1">
                <div className="bg-blue-300 h-full rounded-t-sm" style={{width: '60%'}}></div>
                <div className="bg-yellow-300 h-1/2 rounded-t-sm" style={{width: '40%'}}></div>
             </div>
          )}
          {chartType === 'area' && (
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke={chartColor} fill={`url(#color${title})`} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
