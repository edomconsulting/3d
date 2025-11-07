import React, { useContext, useState } from 'react';
import { HomeIcon, CalendarIcon, HistoryIcon, BillIcon, SearchIcon, BellIcon, SettingsIcon, ChevronDownIcon, MoonIcon, SunIcon, SurgeryIcon } from './icons/Icons';
import { ThemeContext } from '../App';
import PatientIntakeForm from './PatientIntakeForm';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean, onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-brand-gray-600 text-white' : 'text-brand-gray-400 hover:bg-gray-200 dark:hover:bg-brand-gray-500'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const SearchPatientModal: React.FC<{onClose: () => void}> = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-brand-gray-600 dark:text-gray-100 mb-6">Search Patient</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="By Patient Name" required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <input type="text" placeholder="By Patient ID" required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <input type="text" placeholder="By Insurance No." required className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white" />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PatientIntakeModal: React.FC<{onClose: () => void}> = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto pt-12">
            <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-8 shadow-xl w-full max-w-4xl my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-brand-gray-600 dark:text-gray-100">New Patient Intake Form</h2>
                    <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600 dark:hover:text-gray-200">&times;</button>
                </div>
                <PatientIntakeForm onCancel={onClose} />
            </div>
        </div>
    );
};


const Header: React.FC<{ activePage: string; setActivePage: (page: string) => void; }> = ({ activePage, setActivePage }) => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext not found");
  }
  const { theme, toggleTheme } = themeContext;
  
  const navItems = [
      { id: 'Dashboard', icon: <HomeIcon />, label: 'Dashboard' },
      { id: 'Schedule', icon: <CalendarIcon />, label: 'Schedule' },
      { id: 'History', icon: <HistoryIcon />, label: 'History' },
      { id: 'Surgery', icon: <SurgeryIcon />, label: 'Surgery' },
      { id: 'Billing', icon: <BillIcon />, label: 'Billing' },
  ];

  return (
    <>
    <header className="bg-white dark:bg-brand-gray-600 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-brand-orange text-3xl font-bold">*</span>
          <span className="text-xl font-bold text-brand-gray-600 dark:text-gray-100">CardioCare</span>
        </div>
        <nav className="hidden lg:flex items-center gap-2 bg-brand-gray-100 dark:bg-brand-gray-500 p-1 rounded-full">
            {navItems.map(item => (
                <NavItem key={item.id} icon={item.icon} label={item.label} active={activePage === item.id} onClick={() => setActivePage(item.id)} />
            ))}
        </nav>
      </div>
      <div className="flex-grow lg:flex-grow-0 flex items-center justify-between gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-2">
            <button onClick={() => setSearchModalOpen(true)} className="p-3 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-full hover:bg-gray-200 dark:hover:bg-brand-gray-400 transition-colors">
                <SearchIcon className="text-brand-gray-400"/>
            </button>
            <button onClick={() => setAddPatientModalOpen(true)} className="p-3 text-brand-gray-400 bg-brand-gray-100 dark:bg-brand-gray-500 rounded-full hover:bg-gray-200 dark:hover:bg-brand-gray-400 transition-colors font-bold text-xl leading-none flex items-center justify-center w-10 h-10">
                +
            </button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-gray-500 transition-colors">
            {theme === 'light' ? <MoonIcon className="text-brand-gray-400 h-6 w-6" /> : <SunIcon className="text-yellow-400 h-6 w-6" />}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-gray-500 transition-colors"><BellIcon /></button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-gray-500 transition-colors"><SettingsIcon /></button>
          <div className="flex items-center gap-2">
            <img src="https://picsum.photos/seed/user1/40/40" alt="MM Imon" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm dark:text-gray-100">MM Imon</p>
              <p className="text-xs text-brand-gray-400">Medical Consultant</p>
            </div>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
       <div className="w-full lg:hidden border-t dark:border-brand-gray-500 mt-4 pt-4 flex justify-center">
         <nav className="flex items-center gap-2 bg-brand-gray-100 dark:bg-brand-gray-500 p-1 rounded-full">
             {navItems.map(item => (
                <NavItem key={item.id} icon={item.icon} label={item.label} active={activePage === item.id} onClick={() => setActivePage(item.id)} />
            ))}
        </nav>
       </div>
    </header>
    {isSearchModalOpen && <SearchPatientModal onClose={() => setSearchModalOpen(false)} />}
    {isAddPatientModalOpen && <PatientIntakeModal onClose={() => setAddPatientModalOpen(false)} />}
    </>
  );
};

export default Header;