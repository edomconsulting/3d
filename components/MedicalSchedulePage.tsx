import React, { useState, useRef, useEffect } from 'react';
// FIX: Added missing CalendarIcon import.
import { ChevronLeftIcon, ChevronRightIcon, CopyIcon, ChevronDownIcon, ClockIcon, CalendarIcon } from './icons/Icons';

const visitorStats = [
    { label: 'Peak Visitor', value: 80 },
    { label: 'Avg. Visitor', value: 20 },
    { label: 'Least Visitor', value: 3 },
];

const barChartData = [ 50, 75, 100, 60, 90, 70, 40, 80, 50, 75, 100, 60, 90, 70, 40, 80, 50, 75, 100, 60, 90, 70, 40, 80 ];

const todayPatients = [
    { name: 'Koman Manurung', reason: 'Teeth Cleaning', time: '10:00 AM', avatar: 'https://picsum.photos/seed/koman/40/40' },
    { name: 'Millar Skyes', reason: 'Teeth Extraction', time: '01:45 PM', avatar: 'https://picsum.photos/seed/millar/40/40' },
    { name: 'Enma Gobber', reason: 'Dental Checkup', time: '02:30 PM', avatar: 'https://picsum.photos/seed/enma/40/40' },
    { name: 'Frederick Keen', reason: 'Teeth Cleaning', time: '04:15 PM', avatar: 'https://picsum.photos/seed/frederick/40/40' },
];

const WeeklyMedicalActivity: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">Weekly Medical Activity</h3>
                <div className="flex justify-between mt-4">
                    {visitorStats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-xs text-brand-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">{stat.value}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <p className="text-xs text-brand-gray-400 mb-2">Visitor Statistics</p>
                    <div className="grid grid-cols-8 gap-1 h-20">
                        {barChartData.map((height, i) => (
                            <div key={i} className="flex items-end">
                                <div className={`w-full rounded-sm ${i % 3 === 0 ? 'bg-blue-200' : 'bg-blue-400'}`} style={{height: `${height}%`}}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm">
                 <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">Medical Checkup Schedule</h3>
                 <div className="flex justify-between mt-4 text-center">
                    <div>
                        <p className="text-xs text-brand-gray-400">Upcoming Visitor</p>
                        <p className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">20</p>
                    </div>
                     <div>
                        <p className="text-xs text-brand-gray-400">Reschedule Visit</p>
                        <p className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">3</p>
                    </div>
                 </div>
                 <h4 className="font-semibold text-brand-gray-600 dark:text-gray-100 text-sm mt-6">Today's Patient</h4>
                 <div className="space-y-3 mt-3">
                     {todayPatients.map(p => (
                         <div key={p.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium text-sm text-brand-gray-600 dark:text-gray-100">{p.name}</p>
                                    <p className="text-xs text-brand-gray-400">{p.reason}</p>
                                </div>
                            </div>
                            <p className="text-xs text-brand-gray-400">{p.time}</p>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
}

const appointmentsData = [
    { id: 1, status: 'Confirmed', title: 'Molars Surgery', day: 1, start: 10, duration: 1.5, patient: 'Jonas Muller' },
    { id: 2, status: 'Pending', title: 'Teeth Cleaning', day: 3, start: 10, duration: 2, patient: 'Koman Manurung', note: 'I have a complaint about tartar on my lower molars. And I want it to be cleaned thoroughly' },
    { id: 3, status: 'Confirmed', title: 'Dental Checkup', day: 3, start: 11.66, duration: 0.83, patient: 'Mario Goetze' },
    { id: 4, status: 'Cancelled', title: 'Dental Checkup', day: 3, start: 13, duration: 1.5, patient: 'Frederica Kohl' },
];

type Appointment = typeof appointmentsData[0];
type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled';

const MedicalCheckupSchedule: React.FC = () => {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const appointmentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const handleAppointmentClick = (appointment: Appointment, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedAppointment(appointment);
        const target = e.currentTarget as HTMLDivElement;
        const container = containerRef.current;
        if (target && container) {
            const targetRect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setPopoverPosition({
                top: targetRect.top - containerRect.top,
                left: targetRect.right - containerRect.left + 10
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = () => setSelectedAppointment(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const days = ['Mon, 12', 'Tue, 13', 'Wed, 14', 'Thu, 15', 'Fri, 16', 'Sat, 17'];
    const times = ['10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM'];
    const HOUR_HEIGHT = 80; // height of one hour slot in pixels
    const START_HOUR = 10;
    const CURRENT_TIME_TOP = ((10.66 - START_HOUR) * HOUR_HEIGHT);

    const appointmentStatusColors: Record<AppointmentStatus, {bg: string, border: string, text: string, dot: string}> = {
        Confirmed: { bg: 'bg-green-100 dark:bg-green-900/50', border: 'border-l-4 border-green-500', text: 'text-green-800 dark:text-green-200', dot: 'bg-green-500' },
        Pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', border: 'border-l-4 border-yellow-500', text: 'text-yellow-800 dark:text-yellow-200', dot: 'bg-yellow-500' },
        Cancelled: { bg: 'bg-red-100 dark:bg-red-900/50', border: 'border-l-4 border-red-500', text: 'text-red-800 dark:text-red-200', dot: 'bg-red-500' },
    }

    return (
        <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm h-full" ref={containerRef}>
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="font-semibold text-xl text-brand-gray-600 dark:text-gray-100">Medical Checkup Schedule</h3>
                    <div className="flex items-center gap-2">
                        <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-brand-gray-500"><ChevronLeftIcon /></button>
                        <span className="text-sm font-medium text-brand-gray-500 dark:text-gray-300">December</span>
                        <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-brand-gray-500"><ChevronRightIcon /></button>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-brand-gray-500 dark:text-gray-300">All Schedule <ChevronDownIcon className="w-3 h-3"/></button>
                    <button className="flex items-center gap-1 text-brand-gray-500 dark:text-gray-300">Weekly <ChevronDownIcon className="w-3 h-3"/></button>
                </div>
            </div>

            <div className="mt-6 relative">
                 {/* Current Time Indicator */}
                 <div className="absolute z-10 w-full flex items-center" style={{ top: `${CURRENT_TIME_TOP}px` }}>
                    <span className="text-xs font-medium bg-blue-500 text-white rounded-full px-2 py-0.5">10:40 AM</span>
                    <div className="flex-grow h-px bg-blue-500"></div>
                </div>

                <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr] gap-x-4">
                    {/* Time Gutter */}
                    <div className="text-right text-xs text-brand-gray-400 space-y-16 pt-8">
                        {times.map(time => <div key={time}>{time}</div>)}
                    </div>

                    {/* Day Columns */}
                    {days.map((day, dayIndex) => (
                        <div key={day} className="relative border-l border-gray-200 dark:border-brand-gray-500">
                             <div className={`pb-2 text-center text-sm ${dayIndex === 2 ? 'bg-blue-500 text-white rounded-md px-2 py-1' : 'text-brand-gray-500 dark:text-gray-300'}`}>{day}</div>
                            {/* Appointments for this day */}
                            {appointmentsData.filter(a => a.day === dayIndex + 1).map(appt => {
                                const statusColor = appointmentStatusColors[appt.status as AppointmentStatus];
                                return (
                                 <div 
                                    key={appt.id} 
                                    className={`absolute w-[95%] left-1 p-2 rounded-lg cursor-pointer ${statusColor.bg} ${statusColor.border}`}
                                    style={{
                                        top: `${(appt.start - START_HOUR) * HOUR_HEIGHT + 36}px`,
                                        height: `${appt.duration * HOUR_HEIGHT - 4}px`
                                    }}
                                    onClick={(e) => handleAppointmentClick(appt, e)}
                                >
                                    <p className={`font-semibold text-xs ${statusColor.text}`}>{appt.title}</p>
                                    <p className={`text-xs ${statusColor.text} opacity-80`}>{`${Math.floor(appt.start)}:${String(Math.round((appt.start % 1) * 60)).padStart(2, '0')} - ${Math.floor(appt.start + appt.duration)}:${String(Math.round(((appt.start + appt.duration) % 1) * 60)).padStart(2, '0')}`}</p>
                                     <div className="flex items-center gap-1 mt-2">
                                        <img src={`https://picsum.photos/seed/${appt.patient.split(' ')[0]}/20/20`} alt={appt.patient} className="w-4 h-4 rounded-full"/>
                                        <span className={`text-xs ${statusColor.text}`}>{appt.patient}</span>
                                     </div>
                                </div>
                            )})}
                        </div>
                    ))}
                </div>

                 {/* Appointment Details Popover */}
                 {selectedAppointment && (
                     <div 
                        className="absolute z-20 bg-white dark:bg-brand-gray-600 rounded-xl shadow-2xl w-64 p-4 border border-gray-200 dark:border-brand-gray-500"
                        style={{ top: popoverPosition.top, left: popoverPosition.left }}
                        onClick={e => e.stopPropagation()}
                     >
                         <div className="flex justify-between items-center">
                            <p className="text-xs text-brand-gray-400">Appointment Details</p>
                            <div className={`w-3 h-3 rounded-full ${appointmentStatusColors[selectedAppointment.status as AppointmentStatus].dot}`}></div>
                         </div>
                         <div className="flex items-baseline gap-2 mt-2">
                            <h4 className="font-bold text-lg text-brand-gray-600 dark:text-gray-100">{selectedAppointment.title}</h4>
                             <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${appointmentStatusColors[selectedAppointment.status as AppointmentStatus].bg} ${appointmentStatusColors[selectedAppointment.status as AppointmentStatus].text}`}>{selectedAppointment.status}</span>
                         </div>
                         
                         { selectedAppointment.note &&
                            <>
                                <p className="text-xs font-semibold text-brand-gray-500 dark:text-gray-300 mt-4">Patient's Note</p>
                                <p className="text-sm text-brand-gray-600 dark:text-gray-200 mt-1">{selectedAppointment.note}</p>
                            </>
                         }
                         
                         <p className="text-xs font-semibold text-brand-gray-500 dark:text-gray-300 mt-4">Attendance Time</p>
                         <div className="flex items-center gap-2 text-sm text-brand-gray-600 dark:text-gray-200 mt-1">
                             <CalendarIcon className="w-4 h-4 text-brand-gray-400" />
                             <span>Wed, 14 Dec 2023</span>
                             <ClockIcon className="w-4 h-4 text-brand-gray-400" />
                             <span>10:00 PM</span>
                         </div>

                         <p className="text-xs font-semibold text-brand-gray-500 dark:text-gray-300 mt-4">Patient's Name</p>
                         <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                                <img src={`https://picsum.photos/seed/${selectedAppointment.patient.split(' ')[0]}/32/32`} alt={selectedAppointment.patient} className="w-8 h-8 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-sm text-brand-gray-600 dark:text-gray-100">{selectedAppointment.patient}</p>
                                    <p className="text-xs text-brand-gray-400">Visited 8 Times</p>
                                </div>
                            </div>
                            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-brand-gray-500"><CopyIcon className="text-brand-gray-400"/></button>
                         </div>
                         <div className="flex items-center gap-2 mt-6">
                            <button className="flex-1 bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors">Accept</button>
                            <button className="flex-1 text-blue-500 dark:text-blue-400 text-sm font-semibold py-2 rounded-lg bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors">Reschedule</button>
                         </div>
                     </div>
                 )}
            </div>
        </div>
    );
};


const MedicalSchedulePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <WeeklyMedicalActivity />
      </div>
      <div className="lg:col-span-3">
        <MedicalCheckupSchedule />
      </div>
    </div>
  );
};

export default MedicalSchedulePage;