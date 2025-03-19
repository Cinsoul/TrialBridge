import { message } from 'antd';

// Mock communication data interfaces
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderType: 'patient' | 'trialTeam';
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'pdf';
  url: string;
  size: number; // in KB
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorType: 'patient' | 'trialTeam';
  authorName: string;
  timestamp: string;
  category: 'general' | 'questions' | 'experiences' | 'support';
  tags: string[];
  likes: number;
  comments: ForumComment[];
}

export interface ForumComment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorType: 'patient' | 'trialTeam';
  authorName: string;
  timestamp: string;
  likes: number;
  parentCommentId?: string; // For nested comments/replies
}

// Mock messages
const mockMessages: Message[] = [
  {
    id: 'msg-001',
    senderId: 'patient@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'Hello, I have a question about the Diabetes Type 2 Management Study. What kind of time commitment is required?',
    timestamp: '2023-05-15T10:30:00Z',
    read: true
  },
  {
    id: 'msg-002',
    senderId: 'admin',
    receiverId: 'patient@example.com',
    senderType: 'trialTeam',
    content: 'Hi John, thank you for your interest in our study. The trial requires a total of 6 visits over 12 months. Each visit takes approximately 2-3 hours. Would you like me to send you the full schedule?',
    timestamp: '2023-05-15T11:15:00Z',
    read: true
  },
  {
    id: 'msg-003',
    senderId: 'patient@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'Yes, please send me the full schedule. Also, will I need to fast before any of the visits?',
    timestamp: '2023-05-15T13:45:00Z',
    read: true
  },
  {
    id: 'msg-004',
    senderId: 'admin',
    receiverId: 'patient@example.com',
    senderType: 'trialTeam',
    content: 'I\'ve attached the full visit schedule. Yes, you will need to fast for 8 hours before visits 1, 3, and 6 as we\'ll be taking blood samples for glucose testing. Let me know if you have any other questions!',
    timestamp: '2023-05-15T14:30:00Z',
    read: false,
    attachments: [
      {
        id: 'att-001',
        name: 'Diabetes_Study_Schedule.pdf',
        type: 'pdf',
        url: 'https://example.com/attachments/Diabetes_Study_Schedule.pdf',
        size: 245
      }
    ]
  },
  {
    id: 'msg-005',
    senderId: 'jane.smith@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I\'m interested in the Alzheimer\'s Early Detection trial. My mother had Alzheimer\'s, and I\'m concerned about my own risk. Can you tell me more about the brain imaging procedure?',
    timestamp: '2023-05-16T09:20:00Z',
    read: true
  },
  {
    id: 'msg-006',
    senderId: 'admin',
    receiverId: 'jane.smith@example.com',
    senderType: 'trialTeam',
    content: 'Hello Jane, thank you for your interest. The brain imaging procedure is a non-invasive MRI scan that takes about 45 minutes. We\'ll be looking for specific biomarkers that may indicate early changes. Would you like to schedule a call with our research coordinator to discuss this further?',
    timestamp: '2023-05-16T10:05:00Z',
    read: true
  },
  {
    id: 'msg-007',
    senderId: 'robert.johnson@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I\'ve been approved for the Diabetes study but need to reschedule my first appointment due to a work conflict. Is it possible to move it from May 25th to May 27th?',
    timestamp: '2023-05-18T15:10:00Z',
    read: false
  },
  {
    id: 'msg-008',
    senderId: 'admin',
    receiverId: 'robert.johnson@example.com',
    senderType: 'trialTeam',
    content: 'Hi Robert, yes, we can reschedule your appointment to May 27th. The available time slots are 9:00 AM, 1:30 PM, or 3:45 PM. Please let me know which works best for you.',
    timestamp: '2023-05-18T16:05:00Z',
    read: true
  },
  {
    id: 'msg-009',
    senderId: 'robert.johnson@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'The 1:30 PM slot works best for me. Thank you for accommodating the change!',
    timestamp: '2023-05-18T17:22:00Z',
    read: true
  },
  {
    id: 'msg-010',
    senderId: 'admin',
    receiverId: 'robert.johnson@example.com',
    senderType: 'trialTeam',
    content: 'Perfect! I\'ve rescheduled your appointment for May 27th at 1:30 PM. Remember to fast for 8 hours before the visit. You\'ll receive a reminder email 48 hours before your appointment.',
    timestamp: '2023-05-18T17:45:00Z',
    read: false
  },
  {
    id: 'msg-011',
    senderId: 'michael.brown@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I saw the information about the Hypertension Treatment Efficacy trial and I\'m interested in applying. I\'ve been on three different blood pressure medications for the past two years with limited success. Would I be a good candidate?',
    timestamp: '2023-05-19T11:10:00Z',
    read: true
  },
  {
    id: 'msg-012',
    senderId: 'admin',
    receiverId: 'michael.brown@example.com',
    senderType: 'trialTeam',
    content: 'Hello Michael, thank you for your interest in our hypertension trial. Based on what you\'ve shared, you might be a good candidate. Could you provide more details about your current medications and typical blood pressure readings? Also, do you have any history of kidney disease or stroke?',
    timestamp: '2023-05-19T13:25:00Z',
    read: true
  },
  {
    id: 'msg-013',
    senderId: 'michael.brown@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I\'m currently taking Lisinopril 20mg, Amlodipine 5mg, and Hydrochlorothiazide 25mg. My typical readings are around 140-145/90-95 despite these medications. No history of stroke or kidney disease. I\'m 42 years old and have had hypertension for about 5 years.',
    timestamp: '2023-05-19T14:40:00Z',
    read: true
  },
  {
    id: 'msg-014',
    senderId: 'admin',
    receiverId: 'michael.brown@example.com',
    senderType: 'trialTeam',
    content: 'Thank you for the information, Michael. You appear to meet our initial criteria for resistant hypertension. I\'ve attached our application form and a detailed information packet about the trial. Once you submit the application, we\'ll contact you to schedule a screening visit where we\'ll conduct a comprehensive evaluation.',
    timestamp: '2023-05-19T15:30:00Z',
    read: false,
    attachments: [
      {
        id: 'att-002',
        name: 'Hypertension_Trial_Application.pdf',
        type: 'pdf',
        url: 'https://example.com/attachments/Hypertension_Trial_Application.pdf',
        size: 320
      },
      {
        id: 'att-003',
        name: 'Hypertension_Trial_Information.pdf',
        type: 'pdf',
        url: 'https://example.com/attachments/Hypertension_Trial_Information.pdf',
        size: 540
      }
    ]
  },
  {
    id: 'msg-015',
    senderId: 'susan.williams@example.com',
    receiverId: 'dr.thompson',
    senderType: 'patient',
    content: 'Dr. Thompson, I\'ve been experiencing increased joint pain in my hands over the past week. Is this a normal fluctuation of RA symptoms, or should I be concerned? Should I adjust my medication?',
    timestamp: '2023-05-20T09:15:00Z',
    read: true
  },
  {
    id: 'msg-016',
    senderId: 'dr.thompson',
    receiverId: 'susan.williams@example.com',
    senderType: 'trialTeam',
    content: 'Hello Susan, fluctuations in RA symptoms are common and can be triggered by various factors including weather changes, stress, or illness. Given that you\'re experiencing increased pain specifically in your hands, I\'d like you to monitor it for the next 48 hours. If the pain continues to worsen or you develop swelling or redness, please call the clinic to schedule an earlier appointment. For now, you can try applying cold packs for 15-20 minutes several times a day, but don\'t adjust your medication dosage without consulting me first.',
    timestamp: '2023-05-20T10:05:00Z',
    read: true
  },
  {
    id: 'msg-017',
    senderId: 'susan.williams@example.com',
    receiverId: 'dr.thompson',
    senderType: 'patient',
    content: 'Thank you, Dr. Thompson. I\'ll monitor the symptoms as you suggested and use cold packs. The pain isn\'t severe yet, just more noticeable than usual. I\'ll let you know if it gets worse.',
    timestamp: '2023-05-20T10:30:00Z',
    read: true
  },
  {
    id: 'msg-018',
    senderId: 'john.doe@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'Hello, I just submitted my application for the Diabetes Type 2 Management Study. I\'m wondering how long the review process typically takes before I hear back about next steps?',
    timestamp: '2023-05-21T14:20:00Z',
    read: false
  },
  {
    id: 'msg-019',
    senderId: 'emily.davis@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I\'m interested in the Weight Management Program for Metabolic Syndrome trial. I meet most of the criteria, but I\'m currently taking medication for high cholesterol. Would this disqualify me from participating?',
    timestamp: '2023-05-22T09:45:00Z',
    read: false
  },
  {
    id: 'msg-020',
    senderId: 'david.wilson@example.com',
    receiverId: 'admin',
    senderType: 'patient',
    content: 'I participated in the Migraine Prevention Study last year and found it very beneficial. Are there any follow-up studies planned that I might be eligible for? The medication really helped reduce my migraine frequency.',
    timestamp: '2023-05-22T11:30:00Z',
    read: false
  }
];

// Mock forum posts
const mockForumPosts: ForumPost[] = [
  {
    id: 'post-001',
    title: 'My experience with the Diabetes Management Trial',
    content: 'I\'ve been participating in the Diabetes Type 2 Management Study for about 3 months now, and I wanted to share my experience. The staff has been incredibly supportive, and the regular check-ins have actually helped me stay more accountable with my overall diabetes management.\n\nThe medication being tested seems to be working well for me - I\'ve noticed my blood sugar levels are more stable throughout the day, and I haven\'t experienced any significant side effects. The time commitment is very reasonable - just a visit every other month, and they\'re flexible with scheduling.\n\nHas anyone else here joined this trial? I\'d be interested to hear about your experiences!',
    authorId: 'patient@example.com',
    authorType: 'patient',
    authorName: 'John Smith',
    timestamp: '2023-04-10T14:25:00Z',
    category: 'experiences',
    tags: ['diabetes', 'clinical trial', 'medication'],
    likes: 12,
    comments: [
      {
        id: 'comment-001',
        postId: 'post-001',
        content: 'Thanks for sharing your experience, John! I\'m considering applying for this trial. Did you experience any issues with the initial screening process?',
        authorId: 'michael.brown@example.com',
        authorType: 'patient',
        authorName: 'Michael Brown',
        timestamp: '2023-04-10T16:40:00Z',
        likes: 3
      },
      {
        id: 'comment-002',
        postId: 'post-001',
        content: 'The screening process was straightforward. There was a comprehensive blood panel, a physical exam, and a detailed medical history review. It took about 2 hours total, and I had my results within a week.',
        authorId: 'patient@example.com',
        authorType: 'patient',
        authorName: 'John Smith',
        timestamp: '2023-04-10T17:15:00Z',
        likes: 4
      },
      {
        id: 'comment-003',
        postId: 'post-001',
        content: 'We\'re glad to hear you\'re having a positive experience with the trial, John! Your feedback is valuable not only to other potential participants but also to our research team. Please continue to share any observations or questions you might have.',
        authorId: 'admin',
        authorType: 'trialTeam',
        authorName: 'Dr. Robert Thompson',
        timestamp: '2023-05-18T17:15:00Z',
        likes: 3
      },
      {
        id: 'comment-004',
        postId: 'post-001',
        content: 'Great insights! Thank you for sharing your experience.',
        authorId: 'dr.johnson',
        authorType: 'trialTeam',
        authorName: 'Dr. Sarah Johnson',
        timestamp: '2023-04-11T09:30:00Z',
        likes: 8
      }
    ]
  },
  {
    id: 'post-002',
    title: 'Questions about the Hypertension Treatment Trial',
    content: 'I\'m considering applying for the Hypertension Treatment Efficacy trial, but I have a few questions I hope someone can answer:\n\n1. I\'m currently taking lisinopril for my blood pressure. Will I need to stop taking it during the trial?\n\n2. How often will I need to visit the clinic?\n\n3. Are there any dietary restrictions during the trial period?\n\nAny insights would be greatly appreciated!',
    authorId: 'jane.smith@example.com',
    authorType: 'patient',
    authorName: 'Jane Smith',
    timestamp: '2023-05-05T11:20:00Z',
    category: 'questions',
    tags: ['hypertension', 'medication', 'questions'],
    likes: 5,
    comments: [
      {
        id: 'comment-004',
        postId: 'post-002',
        content: 'Hi Jane, I\'m one of the research coordinators for the Hypertension trial. Let me address your questions:\n\n1. There is a 2-week washout period where you\'ll need to stop taking lisinopril, but this is carefully monitored.\n\n2. There are 8 visits over 6 months - more frequent at the beginning (weekly for the first month), then monthly.\n\n3. We ask that you maintain your normal diet but keep a food diary. We don\'t impose specific restrictions, as we want to test the medication\'s effectiveness in real-world conditions.\n\nFeel free to message me directly if you have more questions!',
        authorId: 'admin',
        authorType: 'trialTeam',
        authorName: 'Dr. Robert Thompson',
        timestamp: '2023-05-05T13:45:00Z',
        likes: 7
      },
      {
        id: 'comment-005',
        postId: 'post-002',
        content: 'I\'m currently in this trial (about 3 months in), and it\'s been a good experience. The washout period was a bit concerning for me too, but they monitor you very closely with home BP measurements and quick-response phone support if you have any issues.',
        authorId: 'robert.johnson@example.com',
        authorType: 'patient',
        authorName: 'Robert Johnson',
        timestamp: '2023-05-06T10:15:00Z',
        likes: 4
      }
    ]
  },
  {
    id: 'post-003',
    title: 'Tips for preparing for your first clinical trial visit',
    content: 'Based on my experience participating in several clinical trials, I wanted to share some tips for those who are new to the process:\n\n1. Bring a list of all medications you\'re currently taking, including over-the-counter drugs and supplements.\n\n2. Wear comfortable clothing, especially if you know you\'ll be there for several hours.\n\n3. Bring something to keep you occupied (book, tablet, etc.) as there can be waiting periods.\n\n4. Don\'t hesitate to ask questions - the research staff wants you to be informed and comfortable.\n\n5. Keep a small notebook to jot down any symptoms or side effects between visits.\n\n6. Make sure you understand the compensation process and schedule.\n\nHope this helps someone!',
    authorId: 'susan.williams@example.com',
    authorType: 'patient',
    authorName: 'Susan Williams',
    timestamp: '2023-05-12T16:30:00Z',
    category: 'general',
    tags: ['tips', 'preparation', 'first visit'],
    likes: 15,
    comments: [
      {
        id: 'comment-006',
        postId: 'post-003',
        content: 'Great tips, Susan! I\'d add one more: ask about parking validation or transportation reimbursement. Many trial sites offer this but don\'t always mention it upfront.',
        authorId: 'jane.smith@example.com',
        authorType: 'patient',
        authorName: 'Jane Smith',
        timestamp: '2023-05-12T17:45:00Z',
        likes: 6
      },
      {
        id: 'comment-007',
        postId: 'post-003',
        content: 'These are excellent suggestions! As a trial coordinator, I especially appreciate the tip about keeping a symptom notebook. It\'s incredibly helpful for our data collection when participants can provide specific details about their experiences between visits.',
        authorId: 'admin',
        authorType: 'trialTeam',
        authorName: 'Dr. Robert Thompson',
        timestamp: '2023-05-18T17:15:00Z',
        likes: 3
      },
      {
        id: 'comment-010',
        postId: 'post-003',
        content: 'As a nurse working with clinical trials, I completely agree with these tips. They make the process smoother for everyone involved.',
        authorId: 'nurse.williams',
        authorType: 'trialTeam',
        authorName: 'Sarah Williams, RN',
        timestamp: '2023-05-13T09:20:00Z',
        likes: 8
      }
    ]
  },
  {
    id: 'post-004',
    title: 'Managing side effects during the Rheumatoid Arthritis trial',
    content: 'I\'ve been in the Rheumatoid Arthritis Novel Treatment trial for about 6 weeks now, and while I\'m seeing some positive effects on my joint pain, I\'ve also experienced some side effects that I wanted to discuss with others who might be going through the same thing.\n\nThe main issue I\'ve had is mild nausea for about 2-3 hours after taking the medication. The research team suggested taking it with food, which has helped somewhat but hasn\'t completely eliminated the problem.\n\nHas anyone else in this trial experienced similar side effects? If so, have you found any strategies that help? I\'m committed to staying in the trial because I\'m seeing real benefits in my mobility, but would love some advice on managing this side effect.',
    authorId: 'emily.davis@example.com',
    authorType: 'patient',
    authorName: 'Emily Davis',
    timestamp: '2023-05-18T15:45:00Z',
    category: 'support',
    tags: ['rheumatoid arthritis', 'side effects', 'medication'],
    likes: 8,
    comments: [
      {
        id: 'comment-008',
        postId: 'post-004',
        content: 'Hi Emily, I\'m not in that specific trial, but I experienced similar nausea issues with my RA medication. What helped me was taking it right before bed so I could sleep through the worst of the side effects. Also, ginger tea was surprisingly effective for me. Hope that helps!',
        authorId: 'susan.williams@example.com',
        authorType: 'patient',
        authorName: 'Susan Williams',
        timestamp: '2023-05-18T16:30:00Z',
        likes: 5
      },
      {
        id: 'comment-009',
        postId: 'post-004',
        content: 'Emily, thank you for sharing your experience. I\'m one of the investigators on this trial. The nausea you\'re experiencing is a known potential side effect that typically improves after 8-12 weeks as your body adjusts to the medication. In addition to taking it with food, some participants have found that staying well-hydrated throughout the day helps. Please make sure to document these symptoms in your trial diary and discuss them at your next visit so we can monitor them properly.',
        authorId: 'dr.thompson',
        authorType: 'trialTeam',
        authorName: 'Dr. Robert Thompson',
        timestamp: '2023-05-18T17:15:00Z',
        likes: 3
      }
    ]
  }
];

export interface CommunicationService {
  getUserMessages: (userId: string) => Promise<{ success: boolean; messages: Message[] }>;
  getMessagesByUser: (userId: string) => Promise<{ success: boolean; messages: Message[] }>;
  getConversation: (user1Id: string, user2Id: string) => Promise<{ success: boolean; messages: Message[] }>;
  sendMessage: (messageData: Omit<Message, 'id'>) => Promise<{ success: boolean; message: Message }>;
  markMessageAsRead: (messageId: string) => Promise<{ success: boolean; message: string }>;
  getForumPosts: () => Promise<{ success: boolean; posts: ForumPost[] }>;
  getForumPostById: (postId: string) => Promise<{ success: boolean; post?: ForumPost }>;
  createForumPost: (postData: Omit<ForumPost, 'id' | 'timestamp' | 'likes' | 'comments'>) => Promise<{ success: boolean; post: ForumPost }>;
  addForumComment: (commentData: Omit<ForumComment, 'id' | 'timestamp' | 'likes'>) => Promise<{ success: boolean; comment: ForumComment }>;
}

const communicationServiceImpl: CommunicationService = {
  // Get messages for a user
  getUserMessages: async (userId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userMessages = mockMessages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return { success: true, messages: userMessages };
  },
  
  // Alias for getUserMessages to maintain compatibility with existing code
  getMessagesByUser: async (userId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userMessages = mockMessages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return { success: true, messages: userMessages };
  },

  // Get conversation between two users
  getConversation: async (user1Id: string, user2Id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const conversation = mockMessages.filter(
      msg => (msg.senderId === user1Id && msg.receiverId === user2Id) ||
             (msg.senderId === user2Id && msg.receiverId === user1Id)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    return { success: true, messages: conversation };
  },

  // Send a message
  sendMessage: async (messageData: Omit<Message, 'id'>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newMessage: Message = {
      ...messageData,
      id: `msg-${mockMessages.length + 1}`,
      timestamp: messageData.timestamp || new Date().toISOString(),
      read: messageData.read !== undefined ? messageData.read : false
    };
    
    mockMessages.push(newMessage);
    message.success('Message sent successfully!');
    return { success: true, message: newMessage };
  },

  // Mark message as read
  markMessageAsRead: async (messageId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const messageIndex = mockMessages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      return { success: false, message: 'Message not found' };
    }
    
    mockMessages[messageIndex].read = true;
    return { success: true, message: 'Message marked as read' };
  },

  // Get all forum posts
  getForumPosts: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, posts: mockForumPosts };
  },
  
  // Get a specific forum post by ID
  getForumPostById: async (postId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const post = mockForumPosts.find(p => p.id === postId);
    if (!post) {
      return { success: false };
    }
    
    return { success: true, post };
  },
  
  // Create a new forum post
  createForumPost: async (postData: Omit<ForumPost, 'id' | 'timestamp' | 'likes' | 'comments'>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newPost: ForumPost = {
      ...postData,
      id: `post-${mockForumPosts.length + 1}`,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    mockForumPosts.push(newPost);
    message.success('Post created successfully!');
    return { success: true, post: newPost };
  },
  
  // Add a comment to a forum post
  addForumComment: async (commentData: Omit<ForumComment, 'id' | 'timestamp' | 'likes'>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postIndex = mockForumPosts.findIndex(p => p.id === commentData.postId);
    if (postIndex === -1) {
      return { success: false, comment: {} as ForumComment };
    }
    
    const newComment: ForumComment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    mockForumPosts[postIndex].comments.push(newComment);
    message.success('Comment added successfully!');
    return { success: true, comment: newComment };
  }
}

export const communicationService = communicationServiceImpl;
export default communicationServiceImpl;