import React from 'react';
import { ZoomInIcon, ZoomOutIcon, ExpandIcon } from './icons/Icons';

const LiveHeartRate: React.FC = () => {
  return (
    <div className="bg-brand-gray-200 dark:bg-brand-gray-500/50 rounded-2xl p-6 relative overflow-hidden flex-grow flex flex-col justify-between">
      <div>
        <p className="text-brand-gray-400">Georgina Rodriguez:</p>
        <h2 className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">Live Heart Rate Overview</h2>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/50 dark:bg-brand-gray-600/50 backdrop-blur-sm p-1 rounded-full">
        <button className="p-2 hover:bg-white dark:hover:bg-brand-gray-500 rounded-full transition-colors"><ZoomInIcon /></button>
        <button className="p-2 hover:bg-white dark:hover:bg-brand-gray-500 rounded-full transition-colors"><ExpandIcon /></button>
        <button className="p-2 hover:bg-white dark:hover:bg-brand-gray-500 rounded-full transition-colors"><ZoomOutIcon /></button>
      </div>

      <div className="flex-grow flex items-center justify-center my-4">
        <img src="https://static.vecteezy.com/system/resources/previews/021/309/277/original/human-heart-with-ai-generated-free-png.png" alt="Anatomical Heart" className="w-48 h-auto object-contain drop-shadow-2xl" />
      </div>

      <div className="flex justify-between items-end">
        <div className="bg-white/50 dark:bg-brand-gray-600/50 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-sm text-brand-gray-500 dark:text-brand-gray-300">Stress Level</p>
          <p className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">Low</p>
        </div>
        <div className="bg-white/50 dark:bg-brand-gray-600/50 backdrop-blur-sm p-4 rounded-xl text-right">
          <p className="text-sm text-brand-gray-500 dark:text-brand-gray-300">Average Variability</p>
          <p className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">90ms</p>
        </div>
      </div>
    </div>
  );
};

export default LiveHeartRate;