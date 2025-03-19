import { message } from 'antd';

// Mock patient data interfaces
export interface PatientProfile {
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  medicalHistory: MedicalHistory;
  insuranceInfo?: InsuranceInfo;
  emergencyContact?: EmergencyContact;
}

export interface MedicalHistory {
  conditions: string[];
  medications: string[];
  allergies: string[];
  surgeries: string[];
  familyHistory: string[];
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expirationDate: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface HealthRecord {
  id: string;
  patientEmail: string;
  date: string;
  type: 'vital' | 'lab' | 'medication' | 'symptom' | 'note';
  data: VitalData | LabData | MedicationData | SymptomData | NoteData;
  provider?: string;
}

export interface VitalData {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  respiratoryRate?: number;
  [key: string]: string | number | undefined;
}

export interface LabData {
  glucoseFasting?: number;
  hba1c?: number;
  cholesterolTotal?: number;
  ldl?: number;
  hdl?: number;
  triglycerides?: number;
  testName?: string;
  result?: string | number;
  referenceRange?: string;
  pulmonaryFunctionTest?: Record<string, number>;
  allergyPanel?: string[];
  rheumatoidFactor?: number;
  antiCcp?: number;
  esr?: number;
  crp?: number;
  neurologicalAssessment?: Record<string, string | number | string[]>;
  [key: string]: string | number | string[] | Record<string, number | string | string[]> | undefined;
}

export interface MedicationData {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
  prescribedBy?: string;
  [key: string]: string | null | undefined;
}

export interface SymptomData {
  description: string;
  severity?: string;
  duration?: string;
  triggers?: string;
  [key: string]: string | undefined;
}

export interface NoteData {
  content: string;
  author?: string;
  [key: string]: string | undefined;
}

// Mock patient profiles
const mockPatientProfiles: PatientProfile[] = [
  {
    email: 'patient@example.com',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    phone: '1234567890',
    address: '123 Main St, Boston, MA 02108',
    medicalHistory: {
      conditions: ['Type 2 Diabetes', 'Hypertension'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg'],
      allergies: ['Penicillin'],
      surgeries: ['Appendectomy (2010)'],
      familyHistory: ['Father: Heart Disease', 'Mother: Type 2 Diabetes']
    },
    insuranceInfo: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS12345678',
      groupNumber: 'GRP987654',
      expirationDate: '2024-12-31'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '9876543210'
    }
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    age: 62,
    gender: 'female',
    phone: '2345678901',
    address: '456 Oak Ave, Chicago, IL 60601',
    medicalHistory: {
      conditions: ['Osteoarthritis', 'Hyperlipidemia'],
      medications: ['Atorvastatin 20mg', 'Acetaminophen 500mg'],
      allergies: ['Sulfa drugs', 'Shellfish'],
      surgeries: ['Knee replacement (2018)'],
      familyHistory: ['Mother: Alzheimer\'s disease', 'Sister: Breast cancer']
    },
    insuranceInfo: {
      provider: 'Aetna',
      policyNumber: 'AET87654321',
      expirationDate: '2024-09-30'
    }
  },
  {
    email: 'robert.johnson@example.com',
    name: 'Robert Johnson',
    age: 35,
    gender: 'male',
    phone: '3456789012',
    address: '789 Pine St, San Francisco, CA 94102',
    medicalHistory: {
      conditions: ['Asthma', 'Seasonal allergies'],
      medications: ['Albuterol inhaler', 'Loratadine 10mg'],
      allergies: ['Pollen', 'Dust mites'],
      surgeries: [],
      familyHistory: ['Father: Asthma']
    }
  },
  {
    email: 'susan.williams@example.com',
    name: 'Susan Williams',
    age: 58,
    gender: 'female',
    phone: '4567890123',
    address: '101 Maple Dr, Seattle, WA 98101',
    medicalHistory: {
      conditions: ['Rheumatoid arthritis', 'Hypothyroidism'],
      medications: ['Levothyroxine 50mcg', 'Methotrexate 10mg'],
      allergies: ['Ibuprofen'],
      surgeries: ['Thyroidectomy (2015)'],
      familyHistory: ['Mother: Hypothyroidism', 'Sister: Rheumatoid arthritis']
    },
    emergencyContact: {
      name: 'Michael Williams',
      relationship: 'Son',
      phone: '6789012345'
    }
  },
  {
    email: 'michael.brown@example.com',
    name: 'Michael Brown',
    age: 42,
    gender: 'male',
    phone: '5678901234',
    address: '202 Elm St, Austin, TX 78701',
    medicalHistory: {
      conditions: ['Hypertension', 'Anxiety'],
      medications: ['Lisinopril 20mg', 'Sertraline 50mg'],
      allergies: [],
      surgeries: [],
      familyHistory: ['Father: Hypertension', 'Mother: Anxiety disorder']
    },
    insuranceInfo: {
      provider: 'UnitedHealthcare',
      policyNumber: 'UHC56789012',
      groupNumber: 'GRP123456',
      expirationDate: '2025-03-31'
    }
  },
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    age: 50,
    gender: 'male',
    phone: '6789012345',
    address: '303 Cedar Ln, Denver, CO 80202',
    medicalHistory: {
      conditions: ['Type 2 Diabetes', 'Sleep apnea'],
      medications: ['Metformin 1000mg', 'CPAP therapy'],
      allergies: ['Latex'],
      surgeries: [],
      familyHistory: ['Father: Type 2 Diabetes']
    }
  }
];

// Mock health records
const mockHealthRecords: HealthRecord[] = [
  {
    id: 'record-001',
    patientEmail: 'patient@example.com',
    date: '2023-05-10',
    type: 'vital',
    data: {
      glucoseFasting: 126,
      hba1c: 6.8,
      cholesterolTotal: 195,
      ldl: 110,
      hdl: 45,
      triglycerides: 150
    },
    provider: 'Boston Medical Center Lab'
  },
  {
    id: 'record-034',
    patientEmail: 'patient@example.com',
    date: '2023-05-15',
    type: 'medication',
    data: {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-05-15',
      endDate: null,
      prescribedBy: 'Dr. Sarah Johnson'
    }
  },
  {
    id: 'record-035',
    patientEmail: 'patient@example.com',
    date: '2023-05-20',
    type: 'symptom',
    data: {
      description: 'Mild headache and dizziness',
      severity: 'Mild',
      duration: '2 hours',
      triggers: 'After taking new medication'
    }
  },
  {
    id: 'record-005',
    patientEmail: 'patient@example.com',
    date: '2023-05-25',
    type: 'vital',
    data: {
      bloodPressure: '128/82',
      heartRate: 75,
      temperature: 98.4,
      weight: 183,
      height: 70,
      bmi: 26.2
    },
    provider: 'Dr. Sarah Johnson'
  },
  {
    id: 'record-006',
    patientEmail: 'patient@example.com',
    date: '2023-05-25',
    type: 'note',
    data: {
      content: 'Patient reports good tolerance to Metformin. Blood glucose levels showing improvement. Continuing current dosage and will reassess in one month.',
      author: 'Dr. Sarah Johnson'
    }
  },
  {
    id: 'record-007',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'vital',
    data: {
      bloodPressure: '145/90',
      heartRate: 82,
      temperature: 98.4,
      weight: 155,
      height: 65,
      bmi: 25.8
    },
    provider: 'Dr. Michael Chen'
  },
  {
    id: 'record-008',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'lab',
    data: {
      cholesterolTotal: 210,
      ldl: 130,
      hdl: 40,
      triglycerides: 180
    },
    provider: 'Chicago Medical Center Lab'
  },
  {
    id: 'record-009',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'medication',
    data: {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      startDate: '2023-05-05',
      endDate: null,
      prescribedBy: 'Dr. Michael Chen'
    }
  },
  {
    id: 'record-010',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-20',
    type: 'note',
    data: {
      content: 'Patient reports joint pain in knees has improved with current pain management regimen. Discussed potential participation in Alzheimer\'s Early Detection trial due to family history.',
      author: 'Dr. Michael Chen'
    }
  },
  {
    id: 'record-011',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-04-28',
    type: 'vital',
    data: {
      bloodPressure: '120/80',
      heartRate: 70,
      temperature: 98.6,
      weight: 175,
      height: 72,
      bmi: 23.7
    },
    provider: 'Dr. Lisa Wong'
  },
  {
    id: 'record-012',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-04-28',
    type: 'note',
    data: {
      content: 'Patient reports improved asthma symptoms with current medication regimen. Advised to continue current treatment and follow up in 3 months.',
      author: 'Dr. Lisa Wong'
    }
  },
  {
    id: 'record-013',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-05-15',
    type: 'lab',
    data: {
      pulmonaryFunctionTest: {
        fev1: 3.2, // Forced expiratory volume in 1 second (L)
        fvc: 4.1, // Forced vital capacity (L)
        fev1Fvc: 0.78, // FEV1/FVC ratio
        pef: 8.5 // Peak expiratory flow (L/s)
      },
      allergyPanel: ['Positive: Dust mites, Pollen', 'Negative: Pet dander, Mold']
    },
    provider: 'San Francisco Pulmonary Lab'
  },
  {
    id: 'record-014',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-05-18',
    type: 'medication',
    data: {
      name: 'Fluticasone/Salmeterol',
      dosage: '250/50 mcg',
      frequency: 'Twice daily',
      startDate: '2023-05-18',
      endDate: null,
      prescribedBy: 'Dr. Lisa Wong'
    }
  },
  {
    id: 'record-015',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'vital',
    data: {
      bloodPressure: '125/78',
      heartRate: 72,
      temperature: 98.2,
      weight: 142,
      height: 64,
      bmi: 24.4
    },
    provider: 'Dr. James Wilson'
  },
  {
    id: 'record-016',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'lab',
    data: {
      rheumatoidFactor: 45, // IU/mL (elevated)
      antiCcp: 60, // U/mL (elevated)
      esr: 28, // mm/hr (elevated)
      crp: 2.4 // mg/dL (elevated)
    },
    provider: 'Seattle Rheumatology Lab'
  },
  {
    id: 'record-017',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'medication',
    data: {
      name: 'Methotrexate',
      dosage: '10mg',
      frequency: 'Once weekly',
      startDate: '2023-04-15',
      endDate: null,
      prescribedBy: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-018',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'vital',
    data: {
      bloodPressure: '142/92',
      heartRate: 76,
      temperature: 98.8,
      weight: 190,
      height: 71,
      bmi: 26.5
    },
    provider: 'Dr. Emily Rodriguez'
  },
  {
    id: 'record-019',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'medication',
    data: {
      name: 'Lisinopril',
      dosage: '20mg',
      frequency: 'Once daily',
      startDate: '2023-05-02',
      endDate: null,
      prescribedBy: 'Dr. Emily Rodriguez'
    }
  },
  {
    id: 'record-020',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'note',
    data: {
      content: 'Patient reports increased stress at work contributing to anxiety symptoms and possibly affecting blood pressure. Recommended stress management techniques and referred to therapist for anxiety management.',
      author: 'Dr. Emily Rodriguez'
    }
  },
  {
    id: 'record-021',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'vital',
    data: {
      bloodPressure: '135/88',
      heartRate: 80,
      temperature: 98.6,
      weight: 210,
      height: 69,
      bmi: 31.0
    },
    provider: 'Dr. Thomas Brown'
  },
  {
    id: 'record-022',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'lab',
    data: {
      glucoseFasting: 145,
      hba1c: 7.2,
      cholesterolTotal: 205,
      ldl: 125,
      hdl: 42,
      triglycerides: 170
    },
    provider: 'Denver Medical Center Lab'
  },
  {
    id: 'record-023',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'medication',
    data: {
      name: 'Metformin',
      dosage: '1000mg',
      frequency: 'Twice daily',
      startDate: '2023-04-20',
      endDate: null,
      prescribedBy: 'Dr. Thomas Brown'
    }
  },
  {
    id: 'record-024',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'note',
    data: {
      content: 'Patient is overweight and has poorly controlled diabetes. Discussed lifestyle modifications including diet and exercise. Recommended weight loss of 15-20 pounds. Interested in the Diabetes Type 2 Management Study.',
      author: 'Dr. Thomas Brown'
    }
  },
  {
    id: 'record-025',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'vital',
    data: {
      bloodPressure: '118/75',
      heartRate: 68,
      temperature: 98.2,
      weight: 135,
      height: 66,
      bmi: 21.8
    },
    provider: 'Dr. James Wilson'
  },
  {
    id: 'record-026',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'lab',
    data: {
      rheumatoidFactor: 38, // IU/mL (elevated)
      antiCcp: 52, // U/mL (elevated)
      esr: 22, // mm/hr (elevated)
      crp: 1.8 // mg/dL (elevated)
    },
    provider: 'Johns Hopkins Rheumatology Lab'
  },
  {
    id: 'record-027',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'note',
    data: {
      content: 'Patient has early-stage rheumatoid arthritis with moderate symptoms. Discussed treatment options including participation in the Rheumatoid Arthritis Novel Treatment trial. Patient is interested and meets eligibility criteria.',
      author: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-028',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'medication',
    data: {
      name: 'Prednisone',
      dosage: '5mg',
      frequency: 'Once daily',
      startDate: '2023-05-01',
      endDate: '2023-05-15',
      prescribedBy: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-029',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'vital',
    data: {
      bloodPressure: '122/78',
      heartRate: 72,
      temperature: 98.4,
      weight: 168,
      height: 70,
      bmi: 24.1
    },
    provider: 'Dr. Jennifer Adams'
  },
  {
    id: 'record-030',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'lab',
    data: {
      neurologicalAssessment: {
        migraineFrequency: '12 episodes per month',
        averagePainLevel: '7/10',
        averageDuration: '18 hours',
        associatedSymptoms: ['Nausea', 'Photophobia', 'Phonophobia']
      }
    },
    provider: 'University of California Headache Center'
  },
  {
    id: 'record-031',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'note',
    data: {
      content: 'Patient has chronic migraine disorder with significant impact on quality of life. Previous preventive treatments have shown limited efficacy. Patient was enrolled in the Migraine Prevention Study and showed excellent response to the study medication with reduction in migraine frequency to 3-4 episodes per month.',
      author: 'Dr. Jennifer Adams'
    }
  },
  {
    id: 'record-032',
    patientEmail: 'patient@example.com',
    date: '2023-05-01',
    type: 'vital',
    data: {
      bloodPressure: '130/85',
      heartRate: 78,
      temperature: 98.6,
      weight: 185,
      height: 70,
      bmi: 26.5
    },
    provider: 'Dr. Sarah Johnson'
  },
  {
    id: 'record-033',
    patientEmail: 'patient@example.com',
    date: '2023-05-10',
    type: 'lab',
    data: {
      glucoseFasting: 126,
      hba1c: 6.8,
      cholesterolTotal: 195,
      ldl: 110,
      hdl: 45,
      triglycerides: 150
    },
    provider: 'Boston Medical Center Lab'
  },
  {
    id: 'record-034',
    patientEmail: 'patient@example.com',
    date: '2023-05-15',
    type: 'medication',
    data: {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-05-15',
      endDate: null,
      prescribedBy: 'Dr. Sarah Johnson'
    }
  },
  {
    id: 'record-035',
    patientEmail: 'patient@example.com',
    date: '2023-05-20',
    type: 'symptom',
    data: {
      description: 'Mild headache and dizziness',
      severity: 'Mild',
      duration: '2 hours',
      triggers: 'After taking new medication'
    }
  },
  {
    id: 'record-005',
    patientEmail: 'patient@example.com',
    date: '2023-05-25',
    type: 'vital',
    data: {
      bloodPressure: '128/82',
      heartRate: 75,
      temperature: 98.4,
      weight: 183,
      height: 70,
      bmi: 26.2
    },
    provider: 'Dr. Sarah Johnson'
  },
  {
    id: 'record-006',
    patientEmail: 'patient@example.com',
    date: '2023-05-25',
    type: 'note',
    data: {
      content: 'Patient reports good tolerance to Metformin. Blood glucose levels showing improvement. Continuing current dosage and will reassess in one month.',
      author: 'Dr. Sarah Johnson'
    }
  },
  {
    id: 'record-007',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'vital',
    data: {
      bloodPressure: '145/90',
      heartRate: 82,
      temperature: 98.4,
      weight: 155,
      height: 65,
      bmi: 25.8
    },
    provider: 'Dr. Michael Chen'
  },
  {
    id: 'record-008',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'lab',
    data: {
      cholesterolTotal: 210,
      ldl: 130,
      hdl: 40,
      triglycerides: 180
    },
    provider: 'Chicago Medical Center Lab'
  },
  {
    id: 'record-009',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-05',
    type: 'medication',
    data: {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      startDate: '2023-05-05',
      endDate: null,
      prescribedBy: 'Dr. Michael Chen'
    }
  },
  {
    id: 'record-010',
    patientEmail: 'jane.smith@example.com',
    date: '2023-05-20',
    type: 'note',
    data: {
      content: 'Patient reports joint pain in knees has improved with current pain management regimen. Discussed potential participation in Alzheimer\'s Early Detection trial due to family history.',
      author: 'Dr. Michael Chen'
    }
  },
  {
    id: 'record-011',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-04-28',
    type: 'vital',
    data: {
      bloodPressure: '120/80',
      heartRate: 70,
      temperature: 98.6,
      weight: 175,
      height: 72,
      bmi: 23.7
    },
    provider: 'Dr. Lisa Wong'
  },
  {
    id: 'record-012',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-04-28',
    type: 'note',
    data: {
      content: 'Patient reports improved asthma symptoms with current medication regimen. Advised to continue current treatment and follow up in 3 months.',
      author: 'Dr. Lisa Wong'
    }
  },
  {
    id: 'record-013',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-05-15',
    type: 'lab',
    data: {
      pulmonaryFunctionTest: {
        fev1: 3.2, // Forced expiratory volume in 1 second (L)
        fvc: 4.1, // Forced vital capacity (L)
        fev1Fvc: 0.78, // FEV1/FVC ratio
        pef: 8.5 // Peak expiratory flow (L/s)
      },
      allergyPanel: ['Positive: Dust mites, Pollen', 'Negative: Pet dander, Mold']
    },
    provider: 'San Francisco Pulmonary Lab'
  },
  {
    id: 'record-014',
    patientEmail: 'robert.johnson@example.com',
    date: '2023-05-18',
    type: 'medication',
    data: {
      name: 'Fluticasone/Salmeterol',
      dosage: '250/50 mcg',
      frequency: 'Twice daily',
      startDate: '2023-05-18',
      endDate: null,
      prescribedBy: 'Dr. Lisa Wong'
    }
  },
  {
    id: 'record-015',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'vital',
    data: {
      bloodPressure: '125/78',
      heartRate: 72,
      temperature: 98.2,
      weight: 142,
      height: 64,
      bmi: 24.4
    },
    provider: 'Dr. James Wilson'
  },
  {
    id: 'record-016',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'lab',
    data: {
      rheumatoidFactor: 45, // IU/mL (elevated)
      antiCcp: 60, // U/mL (elevated)
      esr: 28, // mm/hr (elevated)
      crp: 2.4 // mg/dL (elevated)
    },
    provider: 'Seattle Rheumatology Lab'
  },
  {
    id: 'record-017',
    patientEmail: 'susan.williams@example.com',
    date: '2023-04-15',
    type: 'medication',
    data: {
      name: 'Methotrexate',
      dosage: '10mg',
      frequency: 'Once weekly',
      startDate: '2023-04-15',
      endDate: null,
      prescribedBy: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-018',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'vital',
    data: {
      bloodPressure: '142/92',
      heartRate: 76,
      temperature: 98.8,
      weight: 190,
      height: 71,
      bmi: 26.5
    },
    provider: 'Dr. Emily Rodriguez'
  },
  {
    id: 'record-019',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'medication',
    data: {
      name: 'Lisinopril',
      dosage: '20mg',
      frequency: 'Once daily',
      startDate: '2023-05-02',
      endDate: null,
      prescribedBy: 'Dr. Emily Rodriguez'
    }
  },
  {
    id: 'record-020',
    patientEmail: 'michael.brown@example.com',
    date: '2023-05-02',
    type: 'note',
    data: {
      content: 'Patient reports increased stress at work contributing to anxiety symptoms and possibly affecting blood pressure. Recommended stress management techniques and referred to therapist for anxiety management.',
      author: 'Dr. Emily Rodriguez'
    }
  },
  {
    id: 'record-021',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'vital',
    data: {
      bloodPressure: '135/88',
      heartRate: 80,
      temperature: 98.6,
      weight: 210,
      height: 69,
      bmi: 31.0
    },
    provider: 'Dr. Thomas Brown'
  },
  {
    id: 'record-022',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'lab',
    data: {
      glucoseFasting: 145,
      hba1c: 7.2,
      cholesterolTotal: 205,
      ldl: 125,
      hdl: 42,
      triglycerides: 170
    },
    provider: 'Denver Medical Center Lab'
  },
  {
    id: 'record-023',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'medication',
    data: {
      name: 'Metformin',
      dosage: '1000mg',
      frequency: 'Twice daily',
      startDate: '2023-04-20',
      endDate: null,
      prescribedBy: 'Dr. Thomas Brown'
    }
  },
  {
    id: 'record-024',
    patientEmail: 'john.doe@example.com',
    date: '2023-04-20',
    type: 'note',
    data: {
      content: 'Patient is overweight and has poorly controlled diabetes. Discussed lifestyle modifications including diet and exercise. Recommended weight loss of 15-20 pounds. Interested in the Diabetes Type 2 Management Study.',
      author: 'Dr. Thomas Brown'
    }
  },
  {
    id: 'record-025',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'vital',
    data: {
      bloodPressure: '118/75',
      heartRate: 68,
      temperature: 98.2,
      weight: 135,
      height: 66,
      bmi: 21.8
    },
    provider: 'Dr. James Wilson'
  },
  {
    id: 'record-026',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'lab',
    data: {
      rheumatoidFactor: 38, // IU/mL (elevated)
      antiCcp: 52, // U/mL (elevated)
      esr: 22, // mm/hr (elevated)
      crp: 1.8 // mg/dL (elevated)
    },
    provider: 'Johns Hopkins Rheumatology Lab'
  },
  {
    id: 'record-027',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'note',
    data: {
      content: 'Patient has early-stage rheumatoid arthritis with moderate symptoms. Discussed treatment options including participation in the Rheumatoid Arthritis Novel Treatment trial. Patient is interested and meets eligibility criteria.',
      author: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-028',
    patientEmail: 'emily.davis@example.com',
    date: '2023-05-01',
    type: 'medication',
    data: {
      name: 'Prednisone',
      dosage: '5mg',
      frequency: 'Once daily',
      startDate: '2023-05-01',
      endDate: '2023-05-15',
      prescribedBy: 'Dr. James Wilson'
    }
  },
  {
    id: 'record-029',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'vital',
    data: {
      bloodPressure: '122/78',
      heartRate: 72,
      temperature: 98.4,
      weight: 168,
      height: 70,
      bmi: 24.1
    },
    provider: 'Dr. Jennifer Adams'
  },
  {
    id: 'record-030',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'lab',
    data: {
      neurologicalAssessment: {
        migraineFrequency: '12 episodes per month',
        averagePainLevel: '7/10',
        averageDuration: '18 hours',
        associatedSymptoms: ['Nausea', 'Photophobia', 'Phonophobia']
      }
    },
    provider: 'University of California Headache Center'
  },
  {
    id: 'record-031',
    patientEmail: 'david.wilson@example.com',
    date: '2023-03-10',
    type: 'note',
    data: {
      content: 'Patient has chronic migraine disorder with significant impact on quality of life. Previous preventive treatments have shown limited efficacy. Patient was enrolled in the Migraine Prevention Study and showed excellent response to the study medication with reduction in migraine frequency to 3-4 episodes per month.',
      author: 'Dr. Jennifer Adams'
    }
  }
];

export interface PatientService {
  getPatientProfile(email: string): Promise<{ success: boolean; profile?: PatientProfile; message?: string }>;
  updatePatientProfile(email: string, profileData: Partial<PatientProfile>): Promise<{ success: boolean; profile?: PatientProfile; message?: string }>;
  getPatientHealthRecords(email: string): Promise<{ success: boolean; records?: HealthRecord[]; message?: string }>;
  addHealthRecord(record: Omit<HealthRecord, 'id'>): Promise<{ success: boolean; record?: HealthRecord; message?: string }>;
  getAllPatients(): Promise<{ success: boolean; patients?: PatientProfile[]; message?: string }>;
}

const patientServiceImpl: PatientService = {
  // Get patient profile
  async getPatientProfile(email: string) {
    try {
      // Input validation
      if (!email || typeof email !== 'string') {
        return { success: false, message: 'Invalid email format' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const profile = mockPatientProfiles.find(p => p.email === email);
      if (profile) {
        return { success: true, profile };
      }
      return { success: false, message: 'Patient profile not found' };
    } catch (error) {
      console.error('Error retrieving patient profile:', error);
      message.error('Failed to retrieve patient profile');
      return { success: false, message: 'An unexpected error occurred while retrieving profile' };
    }
  },

  // Update patient profile
  async updatePatientProfile(email: string, profileData: Partial<PatientProfile>) {
    try {
      // Input validation
      if (!email || typeof email !== 'string') {
        return { success: false, message: 'Invalid email format' };
      }

      if (!profileData || typeof profileData !== 'object') {
        return { success: false, message: 'Invalid profile data format' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const profileIndex = mockPatientProfiles.findIndex(p => p.email === email);
      if (profileIndex === -1) {
        return { success: false, message: 'Patient profile not found' };
      }
      
      // Validate gender if provided
      if (profileData.gender && !['male', 'female', 'other'].includes(profileData.gender)) {
        return { success: false, message: 'Invalid gender value' };
      }

      // Validate age if provided
      if (profileData.age !== undefined && (typeof profileData.age !== 'number' || profileData.age < 0 || profileData.age > 120)) {
        return { success: false, message: 'Invalid age value' };
      }
      
      // Update profile with type-safe merging
      mockPatientProfiles[profileIndex] = {
        ...mockPatientProfiles[profileIndex],
        ...profileData,
        // Ensure nested objects are properly merged
        medicalHistory: profileData.medicalHistory ? {
          ...mockPatientProfiles[profileIndex].medicalHistory,
          conditions: [...(profileData.medicalHistory.conditions || mockPatientProfiles[profileIndex].medicalHistory.conditions)],
          medications: [...(profileData.medicalHistory.medications || mockPatientProfiles[profileIndex].medicalHistory.medications)],
          allergies: [...(profileData.medicalHistory.allergies || mockPatientProfiles[profileIndex].medicalHistory.allergies)],
          surgeries: [...(profileData.medicalHistory.surgeries || mockPatientProfiles[profileIndex].medicalHistory.surgeries)],
          familyHistory: [...(profileData.medicalHistory.familyHistory || mockPatientProfiles[profileIndex].medicalHistory.familyHistory)]
        } : mockPatientProfiles[profileIndex].medicalHistory,
        insuranceInfo: profileData.insuranceInfo ? {
          ...mockPatientProfiles[profileIndex].insuranceInfo,
          ...profileData.insuranceInfo
        } : mockPatientProfiles[profileIndex].insuranceInfo,
        emergencyContact: profileData.emergencyContact ? {
          ...mockPatientProfiles[profileIndex].emergencyContact,
          ...profileData.emergencyContact
        } : mockPatientProfiles[profileIndex].emergencyContact
      };
      
      message.success('Profile updated successfully!');
      return { success: true, profile: mockPatientProfiles[profileIndex] };
    } catch (error) {
      console.error('Error updating patient profile:', error);
      message.error('Failed to update profile');
      return { success: false, message: 'An unexpected error occurred while updating profile' };
    }
  },

  // Get patient health records
  async getPatientHealthRecords(email: string) {
    try {
      // Input validation
      if (!email || typeof email !== 'string') {
        return { success: false, message: 'Invalid email format' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const records = mockHealthRecords.filter(r => r.patientEmail === email);
      return { success: true, records };
    } catch (error) {
      console.error('Error retrieving patient health records:', error);
      message.error('Failed to retrieve health records');
      return { success: false, message: 'An unexpected error occurred while retrieving health records' };
    }
  },

  // Add health record
  async addHealthRecord(record: Omit<HealthRecord, 'id'>) {
    try {
      // Input validation
      if (!record || typeof record !== 'object') {
        return { success: false, message: 'Invalid record data format' };
      }

      if (!record.patientEmail || typeof record.patientEmail !== 'string') {
        return { success: false, message: 'Invalid or missing patient email' };
      }

      if (!record.date || typeof record.date !== 'string') {
        return { success: false, message: 'Invalid or missing date' };
      }

      if (!record.type || !['vital', 'lab', 'medication', 'symptom', 'note'].includes(record.type)) {
        return { success: false, message: 'Invalid or missing record type' };
      }

      if (!record.data || typeof record.data !== 'object') {
        return { success: false, message: 'Invalid or missing record data' };
      }

      // Verify patient exists
      const patientExists = mockPatientProfiles.some(p => p.email === record.patientEmail);
      if (!patientExists) {
        return { success: false, message: 'Patient not found' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate a unique ID with timestamp to avoid collisions
      const timestamp = new Date().getTime();
      const newRecord: HealthRecord = {
        ...record,
        id: `record-${mockHealthRecords.length + 1}-${timestamp}`
      };
      
      mockHealthRecords.push(newRecord);
      message.success('Health record added successfully!');
      return { success: true, record: newRecord };
    } catch (error) {
      console.error('Error adding health record:', error);
      message.error('Failed to add health record');
      return { success: false, message: 'An unexpected error occurred while adding health record' };
    }
  },

  // Get all patients (for trial team)
  async getAllPatients() {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, patients: mockPatientProfiles };
    } catch (error) {
      console.error('Error retrieving all patients:', error);
      message.error('Failed to retrieve patients');
      return { success: false, message: 'An unexpected error occurred while retrieving patients' };
    }
  }
}

// Export the service implementation for consistent usage across the application
export const patientService = patientServiceImpl;
export default patientServiceImpl;