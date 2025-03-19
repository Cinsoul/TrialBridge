import { message } from 'antd';

// Mock clinical trial data
export interface Trial {
  id: string;
  title: string;
  description: string;
  status: 'recruiting' | 'active' | 'completed';
  location: string;
  startDate: string;
  endDate: string;
  eligibilityCriteria: string[];
  compensation: string;
  sponsoredBy: string;
  contactEmail: string;
  contactPhone: string;
  enrolledPatients?: string[];
}

export interface PatientApplication {
  id: string;
  patientEmail: string;
  trialId: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  notes?: string;
}

// Mock trial data
const mockTrials: Trial[] = [
  {
    id: 'trial-001',
    title: 'Diabetes Type 2 Management Study',
    description: 'A clinical trial studying the effects of a new medication for managing Type 2 Diabetes with fewer side effects.',
    status: 'recruiting',
    location: 'Boston Medical Center',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    eligibilityCriteria: [
      'Adults aged 30-65',
      'Diagnosed with Type 2 Diabetes for at least 1 year',
      'Currently taking oral medication for diabetes',
      'No insulin dependency',
      'No major cardiovascular events in the past 6 months'
    ],
    compensation: '$500 for completing all study visits',
    sponsoredBy: 'PharmaCorp Inc.',
    contactEmail: 'diabetes.study@example.com',
    contactPhone: '555-123-4567',
    enrolledPatients: []
  },
  {
    id: 'trial-002',
    title: 'Hypertension Treatment Efficacy',
    description: 'Evaluating the efficacy of a new combination therapy for resistant hypertension.',
    status: 'active',
    location: 'Cleveland Clinic',
    startDate: '2023-03-15',
    endDate: '2024-09-15',
    eligibilityCriteria: [
      'Adults aged 40-75',
      'Diagnosed with resistant hypertension',
      'Currently taking at least 3 blood pressure medications',
      'No history of stroke in the past year',
      'No severe kidney disease'
    ],
    compensation: '$750 for completing all study visits',
    sponsoredBy: 'CardioHealth Research',
    contactEmail: 'hypertension.study@example.com',
    contactPhone: '555-987-6543',
    enrolledPatients: ['patient@example.com']
  },
  {
    id: 'trial-003',
    title: 'Alzheimer\'s Early Detection',
    description: 'Testing a new biomarker for early detection of Alzheimer\'s disease before symptom onset.',
    status: 'recruiting',
    location: 'Mayo Clinic',
    startDate: '2023-07-01',
    endDate: '2025-07-01',
    eligibilityCriteria: [
      'Adults aged 55-80',
      'Family history of Alzheimer\'s disease',
      'No current diagnosis of dementia or Alzheimer\'s',
      'Willing to undergo brain imaging',
      'Able to attend all follow-up visits'
    ],
    compensation: '$1000 for completing all study visits',
    sponsoredBy: 'Neuroscience Foundation',
    contactEmail: 'alzheimers.study@example.com',
    contactPhone: '555-456-7890',
    enrolledPatients: []
  },
  {
    id: 'trial-004',
    title: 'Rheumatoid Arthritis Novel Treatment',
    description: 'Investigating a new biologic therapy for moderate to severe rheumatoid arthritis with potential for reduced joint damage.',
    status: 'recruiting',
    location: 'Johns Hopkins Medical Center',
    startDate: '2023-08-15',
    endDate: '2025-02-15',
    eligibilityCriteria: [
      'Adults aged 25-70',
      'Diagnosed with moderate to severe rheumatoid arthritis',
      'Inadequate response to at least one conventional DMARD',
      'No active infections',
      'No history of tuberculosis'
    ],
    compensation: '$800 for completing all study visits',
    sponsoredBy: 'ImmunoTherapeutics Inc.',
    contactEmail: 'ra.study@example.com',
    contactPhone: '555-234-5678',
    enrolledPatients: []
  },
  {
    id: 'trial-005',
    title: 'Asthma Management in Urban Environments',
    description: 'Studying the effectiveness of a combination inhaler therapy with environmental intervention for asthma patients in urban settings.',
    status: 'active',
    location: 'Columbia University Medical Center',
    startDate: '2023-04-01',
    endDate: '2024-04-01',
    eligibilityCriteria: [
      'Adults aged 18-60',
      'Moderate to severe asthma diagnosis',
      'Living in urban environment for at least 2 years',
      'Non-smoker',
      'No other significant respiratory conditions'
    ],
    compensation: '$600 for completing all study visits',
    sponsoredBy: 'Respiratory Health Foundation',
    contactEmail: 'asthma.study@example.com',
    contactPhone: '555-345-6789',
    enrolledPatients: ['robert.johnson@example.com']
  },
  {
    id: 'trial-006',
    title: 'Weight Management Program for Metabolic Syndrome',
    description: 'Evaluating a comprehensive lifestyle intervention program for individuals with metabolic syndrome.',
    status: 'recruiting',
    location: 'Northwestern Memorial Hospital',
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    eligibilityCriteria: [
      'Adults aged 30-65',
      'BMI between 27-40',
      'At least two components of metabolic syndrome',
      'No bariatric surgery in the past',
      'Willing to follow dietary and exercise recommendations'
    ],
    compensation: '$550 for completing all study visits',
    sponsoredBy: 'Metabolic Health Institute',
    contactEmail: 'metabolic.study@example.com',
    contactPhone: '555-456-7890',
    enrolledPatients: []
  },
  {
    id: 'trial-007',
    title: 'Migraine Prevention Study',
    description: 'Testing a new oral medication for preventing chronic migraines with fewer side effects than current treatments.',
    status: 'completed',
    location: 'University of California Headache Center',
    startDate: '2022-01-15',
    endDate: '2023-01-15',
    eligibilityCriteria: [
      'Adults aged 18-65',
      'History of chronic migraines (15+ headache days per month)',
      'Failed at least two previous preventive treatments',
      'No cardiovascular disease',
      'Not pregnant or planning pregnancy'
    ],
    compensation: '$700 for completing all study visits',
    sponsoredBy: 'NeuroPharm Research',
    contactEmail: 'migraine.study@example.com',
    contactPhone: '555-567-8901',
    enrolledPatients: ['jane.smith@example.com', 'susan.williams@example.com']
  }
];

// Mock patient applications
const mockApplications: PatientApplication[] = [
  {
    id: 'app-001',
    patientEmail: 'patient@example.com',
    trialId: 'trial-001',
    status: 'pending',
    submissionDate: '2023-05-15',
    notes: 'Patient meets all eligibility criteria.'
  },
  {
    id: 'app-002',
    patientEmail: 'john.doe@example.com',
    trialId: 'trial-001',
    status: 'pending',
    submissionDate: '2023-05-16'
  },
  {
    id: 'app-003',
    patientEmail: 'jane.smith@example.com',
    trialId: 'trial-003',
    status: 'pending',
    submissionDate: '2023-05-18',
    notes: 'Patient has concerns about the time commitment.'
  },
  {
    id: 'app-004',
    patientEmail: 'robert.johnson@example.com',
    trialId: 'trial-001',
    status: 'approved',
    submissionDate: '2023-05-10',
    notes: 'Approved and scheduled for initial screening.'
  },
  {
    id: 'app-005',
    patientEmail: 'susan.williams@example.com',
    trialId: 'trial-003',
    status: 'rejected',
    submissionDate: '2023-05-05',
    notes: 'Does not meet age requirements.'
  },
  {
    id: 'app-006',
    patientEmail: 'michael.brown@example.com',
    trialId: 'trial-002',
    status: 'pending',
    submissionDate: '2023-05-20'
  },
  {
    id: 'app-007',
    patientEmail: 'patient@example.com',
    trialId: 'trial-002',
    status: 'approved',
    submissionDate: '2023-02-28',
    notes: 'Patient already enrolled and participating.'
  },
  {
    id: 'app-008',
    patientEmail: 'emily.davis@example.com',
    trialId: 'trial-004',
    status: 'pending',
    submissionDate: '2023-05-10',
    notes: 'Patient has early-stage RA and meets all eligibility criteria.'
  },
  {
    id: 'app-009',
    patientEmail: 'david.wilson@example.com',
    trialId: 'trial-007',
    status: 'approved',
    submissionDate: '2022-01-20',
    notes: 'Patient completed the full trial with excellent response to treatment.'
  },
  {
    id: 'app-010',
    patientEmail: 'michael.brown@example.com',
    trialId: 'trial-006',
    status: 'pending',
    submissionDate: '2023-05-22',
    notes: 'Patient interested in weight management program to address metabolic syndrome components.'
  },
  {
    id: 'app-011',
    patientEmail: 'john.doe@example.com',
    trialId: 'trial-006',
    status: 'pending',
    submissionDate: '2023-05-21',
    notes: 'Patient meets BMI criteria and has multiple metabolic syndrome components.'
  },
  {
    id: 'app-012',
    patientEmail: 'susan.williams@example.com',
    trialId: 'trial-007',
    status: 'approved',
    submissionDate: '2022-01-25',
    notes: 'Patient completed the full trial with good response to treatment.'
  }
];

export const trialService = {
  // Get all available trials
  getAllTrials: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, trials: mockTrials };
  },

  // Get trial by ID
  getTrialById: async (trialId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const trial = mockTrials.find(t => t.id === trialId);
    if (trial) {
      return { success: true, trial };
    }
    return { success: false, message: 'Trial not found' };
  },

  // Get trials by status
  getTrialsByStatus: async (status: 'recruiting' | 'active' | 'completed') => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const trials = mockTrials.filter(t => t.status === status);
    return { success: true, trials };
  },

  // Apply for a trial
  applyForTrial: async (patientEmail: string, trialId: string, notes?: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check if trial exists
    const trial = mockTrials.find(t => t.id === trialId);
    if (!trial) {
      return { success: false, message: 'Trial not found' };
    }
    
    // Check if already applied
    const existingApplication = mockApplications.find(
      app => app.patientEmail === patientEmail && app.trialId === trialId
    );
    
    if (existingApplication) {
      return { success: false, message: 'You have already applied for this trial' };
    }
    
    // Create new application
    const newApplication: PatientApplication = {
      id: `app-${mockApplications.length + 1}`,
      patientEmail,
      trialId,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      notes
    };
    
    mockApplications.push(newApplication);
    message.success('Application submitted successfully!');
    return { success: true, application: newApplication };
  },

  // Get patient applications
  getPatientApplications: async (patientEmail: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const applications = mockApplications.filter(app => app.patientEmail === patientEmail);
    return { success: true, applications };
  },

  // Get all applications (for trial team)
  getAllApplications: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, applications: mockApplications };
  },

  // Update application status (for trial team)
  updateApplicationStatus: async (applicationId: string, status: 'approved' | 'rejected', notes?: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const applicationIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
      return { success: false, message: 'Application not found' };
    }
    
    // Update application
    mockApplications[applicationIndex].status = status;
    if (notes) {
      mockApplications[applicationIndex].notes = notes;
    }
    
    // If approved, add patient to enrolled patients
    if (status === 'approved') {
      const application = mockApplications[applicationIndex];
      const trialIndex = mockTrials.findIndex(t => t.id === application.trialId);
      
      if (trialIndex !== -1) {
        if (!mockTrials[trialIndex].enrolledPatients) {
          mockTrials[trialIndex].enrolledPatients = [];
        }
        
        if (!mockTrials[trialIndex].enrolledPatients!.includes(application.patientEmail)) {
          mockTrials[trialIndex].enrolledPatients!.push(application.patientEmail);
        }
      }
    }
    
    message.success(`Application ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
    return { success: true };
  },

  // Get enrolled patients for a trial (for trial team)
  getEnrolledPatients: async (trialId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const trial = mockTrials.find(t => t.id === trialId);
    if (!trial) {
      return { success: false, message: 'Trial not found' };
    }
    
    return { success: true, enrolledPatients: trial.enrolledPatients || [] };
  }
};