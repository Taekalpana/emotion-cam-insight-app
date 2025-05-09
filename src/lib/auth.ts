
import { create } from 'zustand';
import { toast } from 'sonner';

// Simple user type
export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
}

// User authentication store
interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock users database - in a real app, this would come from a backend
const MOCK_USERS: Record<string, User> = {
  'user@example.com': {
    id: '1',
    email: 'user@example.com',
    isAdmin: false,
    createdAt: new Date()
  },
  'admin@example.com': {
    id: '2',
    email: 'admin@example.com',
    isAdmin: true,
    createdAt: new Date()
  }
};

// Create authentication store
export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  
  login: async (email: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists or create a new user
      let user = MOCK_USERS[email];
      if (!user) {
        user = {
          id: `user_${Date.now()}`,
          email,
          isAdmin: false,
          createdAt: new Date()
        };
        MOCK_USERS[email] = user;
      }
      
      // In real app, we'd store token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
      toast.success(`Welcome${user.isAdmin ? ', admin' : ''}!`);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      set({ isLoading: false });
    }
  },
  
  adminLogin: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, verify admin credentials against a secure backend
      if (email === 'admin@example.com' && password === 'admin') {
        const user = MOCK_USERS['admin@example.com'];
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isLoading: false });
        toast.success('Welcome, Admin!');
      } else {
        toast.error('Invalid admin credentials');
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Admin login failed. Please try again.');
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
    toast.success('Logged out successfully');
  }
}));

// Initialize auth from localStorage on app load
export const initAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuth.setState({ user });
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user');
    }
  }
};
