import { message } from 'antd';

// Mock user data for demonstration purposes
const mockUsers = {
  patients: [
    { email: 'patient@example.com', password: 'password123', phone: '1234567890' },
    { email: 'jane.smith@example.com', password: 'jane123', phone: '2345678901' },
    { email: 'robert.johnson@example.com', password: 'robert123', phone: '3456789012' },
    { email: 'susan.williams@example.com', password: 'susan123', phone: '4567890123' },
    { email: 'michael.brown@example.com', password: 'michael123', phone: '5678901234' },
    { email: 'john.doe@example.com', password: 'john123', phone: '6789012345' },
    { email: 'emily.davis@example.com', password: 'emily123', phone: '7890123456' },
    { email: 'david.wilson@example.com', password: 'david123', phone: '8901234567' },
  ],
  trialTeam: [
    { username: 'admin', password: 'admin123', email: 'admin@example.com' },
    { username: 'dr.johnson', password: 'drj123', email: 'sarah.johnson@example.com' },
    { username: 'dr.thompson', password: 'drt123', email: 'robert.thompson@example.com' },
    { username: 'nurse.williams', password: 'nw123', email: 'sarah.williams@example.com' },
    { username: 'coordinator', password: 'coord123', email: 'trial.coordinator@example.com' },
  ],
};

export interface AuthUser {
  email?: string;
  username?: string;
  phone?: string;
  role: 'patient' | 'trialTeam';
}

// Store the current user in memory (in a real app, this would use localStorage/sessionStorage)
let currentUser: AuthUser | null = null;

export const authService = {
  // Login for patients (using email or phone)
  loginPatient: async (credentials: { email?: string; phone?: string; password?: string; verificationCode?: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phone login with verification code
    if (credentials.phone && credentials.verificationCode) {
      const user = mockUsers.patients.find(u => u.phone === credentials.phone);
      if (user) {
        // In a real app, verify the code from an API
        if (credentials.verificationCode === '123456') { // Mock verification code
          currentUser = { phone: user.phone, role: 'patient' };
          return { success: true, user: currentUser };
        } else {
          return { success: false, message: 'Invalid verification code' };
        }
      }
    }
    
    // Email login with password
    if (credentials.email && credentials.password) {
      const user = mockUsers.patients.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        currentUser = { email: user.email, role: 'patient' };
        return { success: true, user: currentUser };
      }
    }
    
    return { success: false, message: 'Invalid credentials' };
  },
  
  // Login for trial team members
  loginTrialTeam: async (credentials: { username: string; password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.trialTeam.find(u => 
      u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      currentUser = { username: user.username, email: user.email, role: 'trialTeam' };
      return { success: true, user: currentUser };
    }
    
    return { success: false, message: 'Invalid username or password' };
  },
  
  // Get the current logged-in user
  getCurrentUser: () => {
    return currentUser;
  },
  
  // Logout the current user
  logout: () => {
    currentUser = null;
    return { success: true };
  },
  
  // Register a new patient (in a real app, this would call an API)
  registerPatient: async (userData: { email: string; phone: string; password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = mockUsers.patients.find(u => u.email === userData.email || u.phone === userData.phone);
    if (existingUser) {
      return { success: false, message: 'User with this email or phone already exists' };
    }
    
    // Add the new user to our mock database
    mockUsers.patients.push({
      email: userData.email,
      phone: userData.phone,
      password: userData.password
    });
    
    message.success('Registration successful! Please login.');
    return { success: true };
  },
  
  // Register a new trial team member (in a real app, this would call an API)
  registerTrialTeam: async (userData: { username: string; email: string; password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = mockUsers.trialTeam.find(u => 
      u.username === userData.username || u.email === userData.email
    );
    if (existingUser) {
      return { success: false, message: 'User with this username or email already exists' };
    }
    
    // Add the new user to our mock database
    mockUsers.trialTeam.push({
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
    
    message.success('Registration successful! Please login.');
    return { success: true };
  },
};