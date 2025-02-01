import { create } from 'zustand';
import { AuthState } from '../types/auth';

const defaultUsers = {
  'admin@techcorp.com': {
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
    age: '35',
    phone: '+1 (555) 123-4567',
    designation: 'System Administrator',
    address: '123 Tech Street, Silicon Valley, CA 94025'
  },
  'employee@techcorp.com': {
    password: 'employee123',
    role: 'employee',
    name: 'John Employee',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400&fit=crop',
    age: '28',
    phone: '+1 (555) 987-6543',
    designation: 'Software Developer',
    address: '456 Code Avenue, Silicon Valley, CA 94025'
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    const user = defaultUsers[email as keyof typeof defaultUsers];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    set({
      user: {
        email,
        role: user.role as 'admin' | 'employee',
        name: user.name,
        avatar: user.avatar,
        age: user.age,
        phone: user.phone,
        designation: user.designation,
        address: user.address
      },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: (profile) => {
    set({ user: { ...get().user, ...profile } });
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    const { user } = get();
    if (!user?.email) return;

    const userDetails = defaultUsers[user.email as keyof typeof defaultUsers];
    if (userDetails.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    defaultUsers[user.email as keyof typeof defaultUsers] = {
      ...userDetails,
      password: newPassword
    };
  }
}));