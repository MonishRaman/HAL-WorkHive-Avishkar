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
  {
    id: '3',
    name: 'ilyaz',
    email: 'ananya.@techcorp.com',
    department: 'sales',
    designation: 'Senior Developer',
    avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg',
    dateJoined: '2023-01-15',
    salary: 55000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '4',
    name: 'darshan',
    email: 'darshan.@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-man-on-260nw-2438328935.jpg',
    dateJoined: '2023-01-15',
    salary: 90000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '5',
    name: 'punith',
    email: 'punith.@techcorp.com',
    department: 'Development',
    designation: 'junior Developer',
    avatar: 'https://thumbs.dreamstime.com/b/passport-document-id-photo-business-man-portrait-concept-young-handsome-stylish-guy-formal-wear-white-background-119717703.jpg',
    dateJoined: '2023-01-15',
    salary: 95000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '6',
    name: 'fouzan',
    email: 'fouzan.@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://files.idyllic.app/files/static/192012?width=256&optimizer=image',
    dateJoined: '2023-01-15',
    salary: 150000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '7',
    name: 'vinay',
    email: 'vinay.@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://thumbs.dreamstime.com/z/passport-photo-serious-latin-american-businessman-beard-isolated-white-background-cut-out-201642339.jpg',
    dateJoined: '2023-01-15',
    salary: 50000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '8',
    name: 'tejas',
    email: 'tejas.@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://etimg.etb2bimg.com/photo/96929084.cms',
    dateJoined: '2023-01-15',
    salary: 60000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '9',
    name: 'kartik',
    email: 'kartik.@techcorp.com',
    department: 'Development',
    designation: 'Senior Developer',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQE5rv_LYx6k0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1692601998805?e=2147483647&v=beta&t=b-TxSHWu3dqIiW2BKI_H-3HcDWs01n58DNOF16KOceg',
    dateJoined: '2023-01-15',
    salary: 150000,
    team: 'Frontend',
    projects: ['1', '3']
  },
  {
    id: '10',
    name: 'fayaz',
    email: 'fayaz.@techcorp.com',
    department: 'Development',
    designation: ' Developer',
    avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-600nw-2437772333.jpg',
    dateJoined: '2023-01-15',
    salary: 125000,
    team: 'Frontend',
    projects: ['1', '3']
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
  {
    id: '2',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '3',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'ilyaz',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '4',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'darshan',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-man-on-260nw-2438328935.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '5',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'fayaz',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-600nw-2437772333.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '6',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'fouzan',
      avatar: 'https://files.idyllic.app/files/static/192012?width=256&optimizer=image'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '7',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'kartik',
      avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQE5rv_LYx6k0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1692601998805?e=2147483647&v=beta&t=b-TxSHWu3dqIiW2BKI_H-3HcDWs01n58DNOF16KOceg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '8',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'punith',
      avatar: 'https://thumbs.dreamstime.com/b/passport-document-id-photo-business-man-portrait-concept-young-handsome-stylish-guy-formal-wear-white-background-119717703.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '9',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'vinay',
      avatar: 'https://thumbs.dreamstime.com/z/passport-photo-serious-latin-american-businessman-beard-isolated-white-background-cut-out-201642339.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45
  },
  {
    id: '10',
    name: 'NextGen Platform',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'tejas',
      avatar: 'https://etimg.etb2bimg.com/photo/96929084.cms'
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