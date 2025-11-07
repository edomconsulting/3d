import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts';
import { ThemeContext } from '../App';

const ecgData = [
  { time: 802, value: 50 },
  { time: 810, value: 60 },
  { time: 818, value: 45 },
  { time: 826, value: 90 },
  { time: 834, value: 40 },
  { time: 840, value: 55 },
  { time: 842, value: 50 },
  { time: 844, value: 52 },
  { time: 848, value: 30 },
  { time: 852, value: 100 },
  { time: 856, value: 25 },
  { time: 864, value: 110 },
  { time: 872, value: 35 },
  { time: 884, value: 80 },
  { time: 890, value: 50 },
];

const ECGRecording: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("ThemeContext not found");
  const { theme } = themeContext;
  const isDarkMode = theme === 'dark';

  return (
    <div className="bg-white dark:bg-brand-gray-600 rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-brand-gray-600 dark:text-gray-100">ECG Recording</h3>
      <div className="h-40 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ecgData} margin={{ top: 5, right: 20, left: -30, bottom: -10 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="20%" stopColor="#EFEFEF" />
                <stop offset="40%" stopColor="#F97A4A" />
                <stop offset="60%" stopColor="#3D3E42" />
                <stop offset="80%" stopColor="#EFEFEF" />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              type="number" 
              domain={['dataMin', 'dataMax']} 
              tickCount={5} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDarkMode ? '#B4B5B9' : '#8A8B90', fontSize: 12 }}
              dy={10}
            />
            <YAxis hide={true} domain={[0, 120]} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#colorGradient)" 
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <ReferenceDot x={848} y={30} r={4} fill="#F97A4A" stroke={'white'} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ECGRecording;