import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Header from './components/Header';
import LiveHeartRate from './components/LiveHeartRate';
import ECGRecording from './components/ECGRecording';
import PatientBodyAnalysis from './components/PatientBodyAnalysis';
import VisitorsAndTreatment from './components/VisitorsAndTreatment';
import Billing from './components/Billing';
import MedicalSchedulePage from './components/MedicalSchedulePage';
import HistoryPage from './components/HistoryPage';
import SurgeryPage from './components/SurgeryPage';

// --- THEME CONTEXT ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
// Exporting the context to be used by the Header component's useTheme hook
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'light';
    setTheme(initialTheme);
    root.classList.remove(initialTheme === 'light' ? 'dark' : 'light');
    root.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      const root = window.document.documentElement;
      root.classList.remove(prevTheme);
      root.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// --- END THEME CONTEXT ---


const DashboardContent: React.FC = () => (
  <>
    <div>
      <h1 className="text-3xl font-bold text-brand-gray-600 dark:text-gray-100">Good Morning, Imon</h1>
      <p className="text-brand-gray-400 dark:text-brand-gray-400 mt-1">You have 3 appointments today</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <LiveHeartRate />
        <ECGRecording />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-6">
        <PatientBodyAnalysis />
        <VisitorsAndTreatment />
      </div>
    </div>
  </>
);


const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderActivePage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Billing':
        return <Billing />;
      case 'Schedule':
        return <MedicalSchedulePage />;
      case 'History':
        return <HistoryPage />;
      case 'Surgery':
        return <SurgeryPage />;
      default:
        return <DashboardContent />;
    }
  }

  // Conditional classes for seamless fullscreen pages
  const isSurgeryPage = activePage === 'Surgery';
  const mainContainerClasses = `min-h-screen font-sans ${isSurgeryPage ? 'bg-brand-gray-100 dark:bg-gray-900' : 'bg-brand-gray-100 dark:bg-gray-900 p-4 lg:p-8'}`;
  const headerContainerClasses = isSurgeryPage ? 'px-4 lg:px-8 pt-4 lg:pt-8' : '';
  const mainContentClasses = `mx-auto ${isSurgeryPage ? 'h-[calc(100vh-104px)]' : ''}`; // Adjust height for header
  const mainElementClasses = activePage !== 'Billing' && !isSurgeryPage ? 'mt-8' : '';

  return (
    <ThemeProvider>
       <div className={mainContainerClasses}>
          <div className={headerContainerClasses}>
             <Header activePage={activePage} setActivePage={setActivePage} />
          </div>
          <div className={mainContentClasses}>
            <main className={mainElementClasses}>
              {renderActivePage()}
            </main>
          </div>
      </div>
    </ThemeProvider>
  );
};


export default App;