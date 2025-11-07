
export interface Metric {
  title: string;
  value: string;
  unit: string;
  goal: string;
  trend: {
    value: string;
    direction?: 'up' | 'down';
  };
  data: { name: string; value: number }[];
  chartType: 'bar' | 'area';
  chartColor: string;
}

export interface Patient {
  name: string;
  reason: string;
  avatar: string;
}

export interface MedicalReport {
  id: number;
  issue: string;
  treatment: string;
}

export interface VisitorData {
  name: string;
  value: number;
  color: string;
}

export interface Treatment {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
}

export type TestType = 'Lab Test' | 'Radiology' | 'Scanner' | 'Other';

export interface RecommendedTest {
  id: number;
  type: TestType;
  name: string;
  reason: string;
}

export interface VitalSignCheckup {
  id: number;
  date: string;
  bloodPressure: string;
  temperature: string;
  respirationRate: string;
  notes?: string;
}
