import { create } from 'zustand';
import type { Employee, Project, JobPosition, MeetingRoom, Seat } from '../types/dashboard';

interface DashboardState {
  employees: Employee[];
  projects: Project[];
  jobPositions: JobPosition[];
  meetingRooms: MeetingRoom[];
  seats: Seat[];
  notifications: { id: string; message: string; type: string }[];
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop',
    dateJoined: '2023-01-15',
    salary: 95000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@techcorp.com',
    department: 'Design',
    designation: 'UI/UX Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
    dateJoined: '2023-02-01',
    salary: 85000,
    team: 'Design',
    projects: ['1', '2']
  },
  // Add more employees...
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop'
    },
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  // Add more projects...
];

const mockJobPositions: JobPosition[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Development',
    experience: '5+ years',
    location: 'Remote',
    type: 'full-time',
    postedDate: '2024-02-15'
  },
  // Add more positions...
];

const mockMeetingRooms: MeetingRoom[] = [
  {
    id: '1',
    name: 'Innovate Hub',
    capacity: 12,
    floor: 1,
    isAvailable: true
  },
  // Add more rooms...
];

const mockSeats: Seat[] = [
  {
    id: '1',
    number: 'A101',
    floor: 1,
    department: 'Development',
    isAssigned: true,
    assignedTo: '1',
    status: 'occupied'
  },
  // Add more seats...
];

export const useDashboardStore = create<DashboardState>((set) => ({
  employees: mockEmployees,
  projects: mockProjects,
  jobPositions: mockJobPositions,
  meetingRooms: mockMeetingRooms,
  seats: mockSeats,
  notifications: [
    { id: '1', message: 'New job application received', type: 'job' },
    { id: '2', message: 'Meeting room booking request', type: 'booking' },
    { id: '3', message: 'New project assignment', type: 'project' }
  ]
}));