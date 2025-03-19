import { message } from 'antd';

// Mock education data interfaces
export interface EducationalResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'faq' | 'infographic';
  content: string;
  summary: string;
  tags: string[];
  datePublished: string;
  author?: string;
  viewCount: number;
  relatedTrialIds?: string[];
}

export interface PatientFeedback {
  id: string;
  resourceId: string;
  patientEmail: string;
  rating: number; // 1-5
  comment?: string;
  dateSubmitted: string;
}

// Mock educational resources
const mockEducationalResources: EducationalResource[] = [
  {
    id: 'edu-001',
    title: 'Understanding Clinical Trials: A Patient Guide',
    type: 'article',
    content: 'Clinical trials are research studies that explore whether a medical strategy, treatment, or device is safe and effective for humans. These studies may also show which medical approaches work best for certain illnesses or groups of people.\n\nParticipating in a clinical trial can provide several benefits:\n\n1. Access to new treatments before they are widely available\n2. Playing an active role in your own health care\n3. Helping others by contributing to medical research\n4. Receiving expert medical care at leading health care facilities\n\nBefore joining a clinical trial, it\'s important to understand the informed consent process, potential risks and benefits, and your rights as a participant. This guide will help you navigate the process and make informed decisions about your participation.',
    summary: 'A comprehensive guide to understanding clinical trials, their benefits, and what to expect as a participant.',
    tags: ['basics', 'introduction', 'patient guide'],
    datePublished: '2023-01-15',
    author: 'Dr. Emily Johnson, MD',
    viewCount: 1245,
    relatedTrialIds: []
  },
  {
    id: 'edu-002',
    title: 'The Four Phases of Clinical Trials Explained',
    type: 'article',
    content: 'Clinical trials are conducted in a series of steps called phases. Each phase has a different purpose and helps researchers answer different questions.\n\nPhase I: Is the treatment safe?\nPhase I trials test an experimental treatment on a small group of people (20-80) for the first time to evaluate its safety, determine a safe dosage range, and identify side effects.\n\nPhase II: Does the treatment work?\nPhase II trials involve more people (100-300) and are designed to assess whether a treatment works and to continue evaluating its safety.\n\nPhase III: Is it better than what\'s already available?\nPhase III trials gather more information about safety and effectiveness, studying different populations and different dosages, and using the treatment in combination with other treatments. This phase involves 1,000-3,000 participants.\n\nPhase IV: What else do we need to know?\nPhase IV trials occur after a treatment has been approved for consumer sale. These studies continue testing the treatment to collect information about its effect in various populations and any side effects associated with long-term use.',
    summary: 'An explanation of the four phases of clinical trials and what happens during each phase.',
    tags: ['phases', 'process', 'research methodology'],
    datePublished: '2023-02-10',
    author: 'Dr. Michael Chen, PhD',
    viewCount: 987,
    relatedTrialIds: []
  },
  {
    id: 'edu-003',
    title: 'Common Questions About Diabetes Clinical Trials',
    type: 'faq',
    content: 'Q: What types of diabetes clinical trials are currently recruiting?\nA: Current diabetes trials focus on new medications, lifestyle interventions, monitoring technologies, and prevention strategies for both Type 1 and Type 2 diabetes.\n\nQ: Am I eligible for diabetes clinical trials if I\'m already on medication?\nA: It depends on the specific trial. Some trials require participants to be treatment-naïve, while others specifically seek participants who are already on certain medications.\n\nQ: Will I have to stop taking my current diabetes medication?\nA: This varies by trial. Some trials may require you to discontinue current medications, while others may test new treatments in combination with standard care. Your safety is always the priority, and any medication changes will be carefully monitored.\n\nQ: What are the potential benefits of participating in a diabetes clinical trial?\nA: Benefits may include access to new treatments, more frequent health monitoring, and contributing to advances in diabetes care. Some trials also provide compensation for your time and travel.\n\nQ: Are there risks to participating in diabetes clinical trials?\nA: All clinical trials have potential risks, which may include side effects from experimental treatments or the possibility that the new treatment may not be effective. All known risks will be explained during the informed consent process.',
    summary: 'Answers to frequently asked questions about participating in diabetes clinical trials.',
    tags: ['diabetes', 'FAQ', 'patient concerns'],
    datePublished: '2023-03-05',
    author: 'Clinical Trial Education Team',
    viewCount: 1532,
    relatedTrialIds: ['trial-001']
  },
  {
    id: 'edu-004',
    title: 'What to Expect During Your Clinical Trial Visits',
    type: 'video',
    content: 'https://example.com/videos/clinical-trial-visits (This would be a video explaining the typical process of clinical trial visits, from check-in to examinations and follow-up)',
    summary: 'A video walkthrough of what happens during typical clinical trial visits, including screening, baseline, and follow-up appointments.',
    tags: ['process', 'visits', 'preparation'],
    datePublished: '2023-04-12',
    author: 'Sarah Williams, Clinical Research Coordinator',
    viewCount: 876,
    relatedTrialIds: []
  },
  {
    id: 'edu-005',
    title: 'Understanding Informed Consent in Clinical Trials',
    type: 'infographic',
    content: 'https://example.com/infographics/informed-consent (This would be an infographic explaining the key elements of informed consent)',
    summary: 'An infographic explaining the informed consent process, your rights as a participant, and what information should be provided to you.',
    tags: ['informed consent', 'patient rights', 'ethics'],
    datePublished: '2023-02-28',
    author: 'Clinical Ethics Committee',
    viewCount: 654,
    relatedTrialIds: []
  },
  {
    id: 'edu-006',
    title: 'Hypertension Research: Latest Advances in Clinical Trials',
    type: 'article',
    content: 'Recent clinical trials have shown promising results for new approaches to managing hypertension. These include novel combination therapies, device-based interventions, and personalized medicine approaches.\n\nCombination Therapies:\nRecent trials have explored fixed-dose combinations of multiple antihypertensive medications at lower doses, which may provide better blood pressure control with fewer side effects than higher doses of single medications.\n\nDevice-Based Interventions:\nProcedures such as renal denervation, which uses radiofrequency ablation to reduce sympathetic nervous system activity, have shown renewed promise in recent trials after addressing the limitations of earlier studies.\n\nPersonalized Medicine:\nGenetic and biomarker studies are helping to identify which patients are likely to respond best to specific antihypertensive medications, potentially improving treatment efficacy and reducing the trial-and-error approach to finding effective treatments.\n\nLifestyle Interventions:\nStructured programs combining dietary approaches, physical activity, stress management, and sleep optimization have demonstrated significant blood pressure reductions in recent trials, sometimes comparable to medication effects.',
    summary: 'An overview of recent advances in hypertension clinical trials, including new treatment approaches and personalized medicine.',
    tags: ['hypertension', 'research', 'treatment advances'],
    datePublished: '2023-05-01',
    author: 'Dr. Robert Thompson, Cardiologist',
    viewCount: 423,
    relatedTrialIds: ['trial-002']
  },
  {
    id: 'edu-007',
    title: 'Managing Rheumatoid Arthritis: Current Treatment Approaches and Research',
    type: 'article',
    content: 'Rheumatoid arthritis (RA) is a chronic inflammatory disorder that affects the joints and can damage a wide variety of body systems. This article explores current treatment approaches and ongoing research in RA management.\n\nCurrent Treatment Approaches:\nThe treatment of RA typically involves a combination of medications, physical therapy, and lifestyle modifications. Disease-modifying antirheumatic drugs (DMARDs) like methotrexate remain the cornerstone of treatment, while biologic agents that target specific components of the immune system have revolutionized care for many patients with moderate to severe disease.\n\nEmerging Therapies:\nJAK inhibitors represent a newer class of oral medications that have shown promising results in clinical trials. These medications block specific pathways involved in the inflammatory process and may offer advantages for patients who haven\'t responded well to other treatments.\n\nCurrent Clinical Trials:\nSeveral ongoing clinical trials are investigating novel approaches to RA treatment, including targeted therapies that may cause fewer side effects and combination approaches that may be more effective for treatment-resistant cases. The Rheumatoid Arthritis Novel Treatment trial is currently recruiting participants to test a new biologic therapy that targets a different pathway in the immune system than existing treatments.\n\nLifestyle Considerations:\nIn addition to medication, evidence supports the role of regular physical activity, maintaining a healthy weight, and anti-inflammatory diets in managing RA symptoms. Stress management techniques may also help reduce flare frequency and severity.',
    summary: 'An overview of current and emerging treatments for rheumatoid arthritis, including information about ongoing clinical trials.',
    tags: ['rheumatoid arthritis', 'autoimmune', 'treatment options'],
    datePublished: '2023-04-20',
    author: 'Dr. James Wilson, Rheumatologist',
    viewCount: 356,
    relatedTrialIds: ['trial-004']
  },
  {
    id: 'edu-008',
    title: 'Asthma and Environmental Factors: What Patients Should Know',
    type: 'article',
    content: 'Asthma is a chronic respiratory condition that affects millions of people worldwide. While genetics play a role in asthma development, environmental factors can significantly impact symptom severity and frequency. This article explores the relationship between asthma and environmental factors, with a focus on urban settings.\n\nCommon Environmental Triggers:\n- Air pollution (particulate matter, ozone, nitrogen dioxide)\n- Indoor allergens (dust mites, pet dander, mold)\n- Tobacco smoke\n- Respiratory infections\n- Weather changes (especially cold air)\n- Strong odors and chemicals\n\nUrban vs. Rural Environments:\nStudies have consistently shown higher asthma rates in urban environments compared to rural areas. This "urban asthma penalty" is attributed to higher pollution levels, more indoor allergens in multi-unit housing, and potentially higher stress levels. However, rural environments present their own challenges, including agricultural dust and chemicals.\n\nEnvironmental Interventions:\nResearch has demonstrated that targeted environmental interventions can significantly reduce asthma symptoms and exacerbations. These include:\n- HEPA air purifiers\n- Allergen-proof mattress and pillow covers\n- Regular damp dusting and vacuuming with HEPA filters\n- Integrated pest management for cockroach and rodent allergens\n- Proper ventilation and humidity control\n\nThe Asthma Management in Urban Environments clinical trial is currently investigating how combining medication optimization with comprehensive environmental intervention can improve outcomes for urban residents with moderate to severe asthma.',
    summary: 'An exploration of how environmental factors affect asthma, with particular focus on urban environments and strategies for environmental control.',
    tags: ['asthma', 'environmental health', 'urban health', 'allergens'],
    datePublished: '2023-03-15',
    author: 'Dr. Lisa Wong, Pulmonologist',
    viewCount: 542,
    relatedTrialIds: ['trial-005']
  },
  {
    id: 'edu-009',
    title: 'Understanding Metabolic Syndrome and Its Complications',
    type: 'infographic',
    content: 'https://example.com/infographics/metabolic-syndrome (This would be an infographic explaining metabolic syndrome, its components, and associated health risks)',
    summary: 'A visual guide to metabolic syndrome, explaining how this cluster of conditions increases risk for heart disease, stroke, and type 2 diabetes.',
    tags: ['metabolic syndrome', 'cardiovascular risk', 'obesity', 'diabetes prevention'],
    datePublished: '2023-04-05',
    author: 'Metabolic Health Institute',
    viewCount: 789,
    relatedTrialIds: ['trial-006']
  },
  {
    id: 'edu-010',
    title: 'Migraine Management: Beyond Medication',
    type: 'video',
    content: 'https://example.com/videos/migraine-management (This would be a video discussing comprehensive migraine management strategies)',
    summary: 'A comprehensive overview of non-pharmacological approaches to migraine management, including lifestyle modifications, stress management, and complementary therapies.',
    tags: ['migraine', 'headache', 'pain management', 'lifestyle interventions'],
    datePublished: '2023-02-20',
    author: 'Dr. Jennifer Adams, Neurologist',
    viewCount: 1105,
    relatedTrialIds: ['trial-007']
  },
  {
    id: 'edu-011',
    title: 'Participating in Clinical Trials: Rights and Responsibilities',
    type: 'article',
    content: 'As a clinical trial participant, you have both rights and responsibilities. Understanding these can help ensure a positive experience and contribute to the success of the research.\n\nYour Rights as a Participant:\n\n1. Informed Consent: You have the right to be fully informed about the trial\'s purpose, procedures, potential risks and benefits, and alternatives before deciding to participate.\n\n2. Privacy and Confidentiality: Your personal information and medical data should be protected according to applicable laws and regulations.\n\n3. Withdrawal: You have the right to leave the study at any time for any reason without penalty or loss of benefits to which you are otherwise entitled.\n\n4. New Information: You should be informed of any new findings that might affect your willingness to continue participation.\n\n5. Questions Answered: You have the right to have all your questions answered to your satisfaction throughout the trial.\n\nYour Responsibilities as a Participant:\n\n1. Follow Instructions: Adhere to the study protocol, including taking medications as directed and attending all scheduled visits.\n\n2. Report Changes: Inform the research team about any changes in your health, side effects, or concerns.\n\n3. Be Honest: Provide accurate information about your medical history and current health status.\n\n4. Maintain Communication: Keep the research team updated about changes in contact information.\n\n5. Complete the Study: While you can withdraw at any time, completing the full study when possible helps ensure valid research results.\n\nRemember that the relationship between you and the research team should be based on mutual respect and open communication. Don\'t hesitate to advocate for yourself and ask questions throughout your participation.',
    summary: 'An overview of the rights and responsibilities of clinical trial participants, emphasizing the importance of informed consent and open communication.',
    tags: ['patient rights', 'ethics', 'participant guide'],
    datePublished: '2023-05-10',
    author: 'Clinical Research Ethics Board',
    viewCount: 325,
    relatedTrialIds: []
  }
]

// Mock patient feedback
const mockPatientFeedback: PatientFeedback[] = [
  {
    id: 'feedback-001',
    resourceId: 'edu-001',
    patientEmail: 'patient@example.com',
    rating: 5,
    comment: 'Very helpful introduction to clinical trials. Made the process much less intimidating.',
    dateSubmitted: '2023-01-20'
  },
  {
    id: 'feedback-002',
    resourceId: 'edu-003',
    patientEmail: 'john.doe@example.com',
    rating: 4,
    comment: 'Answered many of my questions about diabetes trials. Would like more information about time commitments.',
    dateSubmitted: '2023-03-10'
  },
  {
    id: 'feedback-003',
    resourceId: 'edu-002',
    patientEmail: 'jane.smith@example.com',
    rating: 5,
    comment: 'Clear explanation of the different trial phases. Very informative!',
    dateSubmitted: '2023-02-15'
  },
  {
    id: 'feedback-004',
    resourceId: 'edu-004',
    patientEmail: 'robert.johnson@example.com',
    rating: 3,
    comment: 'Video was helpful but could use more details about what tests are typically performed.',
    dateSubmitted: '2023-04-18'
  },
  {
    id: 'feedback-005',
    resourceId: 'edu-005',
    patientEmail: 'susan.williams@example.com',
    rating: 5,
    dateSubmitted: '2023-03-05'
  },
  {
    id: 'feedback-006',
    resourceId: 'edu-006',
    patientEmail: 'michael.brown@example.com',
    rating: 4,
    comment: 'Great overview of new hypertension treatments. I\'m interested in learning more about the personalized medicine approach.',
    dateSubmitted: '2023-05-10'
  }
];

export const educationService = {
  // Get all educational resources
  getAllResources: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, resources: mockEducationalResources };
  },

  // Get resource by ID
  getResourceById: async (resourceId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const resource = mockEducationalResources.find(r => r.id === resourceId);
    if (resource) {
      // Increment view count
      resource.viewCount += 1;
      return { success: true, resource };
    }
    return { success: false, message: 'Resource not found' };
  },

  // Get resources by type
  getResourcesByType: async (type: 'article' | 'video' | 'faq' | 'infographic') => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const resources = mockEducationalResources.filter(r => r.type === type);
    return { success: true, resources };
  },

  // Get resources by tag
  getResourcesByTag: async (tag: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const resources = mockEducationalResources.filter(r => r.tags.includes(tag));
    return { success: true, resources };
  },

  // Get resources related to a specific trial
  getResourcesByTrialId: async (trialId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const resources = mockEducationalResources.filter(r => 
      r.relatedTrialIds && r.relatedTrialIds.includes(trialId)
    );
    return { success: true, resources };
  },

  // Submit feedback for a resource
  submitFeedback: async (feedbackData: Omit<PatientFeedback, 'id' | 'dateSubmitted'>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check if resource exists
    const resource = mockEducationalResources.find(r => r.id === feedbackData.resourceId);
    if (!resource) {
      return { success: false, message: 'Resource not found' };
    }
    
    // Check if user already submitted feedback
    const existingFeedback = mockPatientFeedback.find(
      f => f.resourceId === feedbackData.resourceId && f.patientEmail === feedbackData.patientEmail
    );
    
    if (existingFeedback) {
      // Update existing feedback
      existingFeedback.rating = feedbackData.rating;
      existingFeedback.comment = feedbackData.comment;
      message.success('Feedback updated successfully!');
      return { success: true, feedback: existingFeedback };
    }
    
    // Create new feedback
    const newFeedback: PatientFeedback = {
      ...feedbackData,
      id: `feedback-${mockPatientFeedback.length + 1}`,
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    
    mockPatientFeedback.push(newFeedback);
    message.success('Feedback submitted successfully!');
    return { success: true, feedback: newFeedback };
  },

  // Get feedback for a resource
  getResourceFeedback: async (resourceId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const feedback = mockPatientFeedback.filter(f => f.resourceId === resourceId);
    return { success: true, feedback };
  },

  // Get average rating for a resource
  getResourceRating: async (resourceId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const feedback = mockPatientFeedback.filter(f => f.resourceId === resourceId);
    if (feedback.length === 0) {
      return { success: true, averageRating: 0, totalRatings: 0 };
    }
    
    const totalRating = feedback.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / feedback.length;
    
    return { 
      success: true, 
      averageRating: parseFloat(averageRating.toFixed(1)), 
      totalRatings: feedback.length 
    };
  }
};