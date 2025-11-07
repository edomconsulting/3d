
import React from 'react';
import type { Patient } from '../types';
import { CalendarIcon, ThreeDotsIcon, CalendarDayIcon } from './icons/Icons';

const patients: Patient[] = [
  {
    name: 'Selena Gomez',
    reason: 'Follow-up',
    avatar: 'https://picsum.photos/seed/user2/40/40',
  },
  {
    name: 'Emma Watson',
    reason: 'Initial Consultation',
    avatar: 'https://picsum.photos/seed/user3/40/40',
  },
];

const days = [
    { day: '12', date: 'Mon' },
    { day: '13', date: 'Tue' },
    { day: '14', date: 'Wed' },
    { day: '15', date: 'Thu', active: true },
    { day: '16', date: 'Fri' },
    { day: '17', date: 'Sat' },
    { day: '18', date: 'Sun' },
];

const Schedule: React.FC = () => {
  return (
    <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-orange-light rounded-lg">
                  <CalendarIcon className="text-brand-orange"/>
              </div>
              <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">Schedule</h3>
          </div>
          <div className="flex items-center gap-2">
              <button><CalendarDayIcon/></button>
              <button><ThreeDotsIcon/></button>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          {days.map(({day, active}) => (
              <div key={day} className={`flex flex-col items-center justify-center w-10 h-14 rounded-xl ${active ? 'bg-brand-orange text-white' : 'bg-brand-gray-100 dark:bg-brand-gray-500 text-brand-gray-500 dark:text-gray-300'}`}>
                  <span className="text-xs">{day}</span>
              </div>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3 flex-grow">
        <h4 className="font-semibold text-brand-gray-500 dark:text-gray-300 mt-6">Patients in Queue</h4>
        {patients.map((patient) => (
          <div key={patient.name} className="flex items-center justify-between p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-lg">
            <div className="flex items-center gap-3">
              <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-brand-gray-600 dark:text-gray-100">{patient.name}</p>
                <p className="text-xs text-brand-gray-400">{patient.reason}</p>
              </div>
            </div>
            <button className="text-brand-gray-400"><ThreeDotsIcon /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
