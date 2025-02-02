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
    name: 'Project Nexus',
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
    name: 'Velocity Ops',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 60
  },
  {
    id: '3',
    name: 'Optimus Task',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'ilyaz',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 22
  },
  {
    id: '4',
    name: 'Horizon Shift',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'darshan',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-man-on-260nw-2438328935.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 77
  },
  {
    id: '5',
    name: 'Nova Flow',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'fayaz',
      avatar: 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-600nw-2437772333.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 80
  },
  {
    id: '6',
    name: 'Quantum Sync',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'fouzan',
      avatar: 'https://files.idyllic.app/files/static/192012?width=256&optimizer=image'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 12
  },
  {
    id: '7',
    name: 'ElevateX',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'kartik',
      avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQE5rv_LYx6k0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1692601998805?e=2147483647&v=beta&t=b-TxSHWu3dqIiW2BKI_H-3HcDWs01n58DNOF16KOceg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 62
  },
  {
    id: '8',
    name: 'Echo Matrix',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'punith',
      avatar: 'https://thumbs.dreamstime.com/b/passport-document-id-photo-business-man-portrait-concept-young-handsome-stylish-guy-formal-wear-white-background-119717703.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 50
  },
  {
    id: '9',
    name: 'NAlpha Grid',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'ongoing',
    projectHead: {
      name: 'vinay',
      avatar: 'https://thumbs.dreamstime.com/z/passport-photo-serious-latin-american-businessman-beard-isolated-white-background-cut-out-201642339.jpg'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 29
  },
  {
    id: '10',
    name: 'Arcadia Blueprint',
    description: 'Building the next generation platform for enterprise solutions',
    status: 'completed',
    projectHead: {
      name: 'tejas',
      avatar: 'https://etimg.etb2bimg.com/photo/96929084.cms'
    },
   
    team: mockEmployees.slice(0, 3),
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 97
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

  {
    id: '2',
    title: 'UI/UX Designer',
    department: 'Design',
    experience: '1+ years',
    location: 'Remote',
    type: 'part-time',
    postedDate: '2025-02-15'
  },

  {
    id: '3',
    title: 'Cyber Security Engineer',
    department: 'IT Security',
    experience: '4+ years',
    location: 'Remote',
    type: 'full-time',
    postedDate: '2025-03-05'
  },

  {
    id: '4',
    title: 'Backend Developer',
    department: 'Engineering',
    experience: '3+ years',
    location: 'Remote',
    type: 'contract',
    postedDate: '2025-02-28'
  },

  {
    id: '5',
    title: 'Finance Analyst',
    department: 'Finance',
    experience: '2+ years',
    location: 'Remote',
    type: 'part-time',
    postedDate: '2025-03-01'
  },

  {
    id: '6',
    title: 'DevOps Engineer',
    department: 'DevOps',
    experience: '5+ years',
    location: 'Remote',
    type: 'full-time',
    postedDate: '2025-02-20'
  },
  // Add more positions...
];

const mockMeetingRooms: MeetingRoom[] = [
  {
    "id": "1",
    "name": "Innovate Hub",
    "capacity": 12,
    "floor": 1,
    "isAvailable": true
  },
  {
    "id": "2",
    "name": "Tech Den",
    "capacity": 8,
    "floor": 1,
    "isAvailable": false
  },
  {
    "id": "3",
    "name": "Vision Room",
    "capacity": 15,
    "floor": 2,
    "isAvailable": true
  },
  {
    "id": "4",
    "name": "Collaboration Zone",
    "capacity": 10,
    "floor": 2,
    "isAvailable": true
  },
  {
    "id": "5",
    "name": "Creative Lab",
    "capacity": 6,
    "floor": 3,
    "isAvailable": true
  },
  {
    "id": "6",
    "name": "Strategy Suite",
    "capacity": 14,
    "floor": 3,
    "isAvailable": false
  },
  {
    "id": "7",
    "name": "Productivity Pod",
    "capacity": 20,
    "floor": 4,
    "isAvailable": true
  },
  {
    "id": "8",
    "name": "Innovation Hall",
    "capacity": 30,
    "floor": 4,
    "isAvailable": true
  },
  {
    "id": "9",
    "name": "Tech Junction",
    "capacity": 12,
    "floor": 5,
    "isAvailable": false
  },
  {
    "id": "10",
    "name": "Team Hub",
    "capacity": 16,
    "floor": 5,
    "isAvailable": true
  },
  {
    "id": "11",
    "name": "Creative Space",
    "capacity": 10,
    "floor": 6,
    "isAvailable": true
  },
  {
    "id": "12",
    "name": "Innovation Center",
    "capacity": 18,
    "floor": 6,
    "isAvailable": true
  },
  {
    "id": "13",
    "name": "Visionary Room",
    "capacity": 8,
    "floor": 7,
    "isAvailable": false
  },
  {
    "id": "14",
    "name": "Collab Space",
    "capacity": 14,
    "floor": 7,
    "isAvailable": true
  },
  {
    "id": "15",
    "name": "Growth Room",
    "capacity": 25,
    "floor": 8,
    "isAvailable": true
  }
  // Add more rooms...
];

const mockSeats: Seat[] = [
  {
    "id": "1",
    "number": "A101",
    "floor": 1,
    "department": "Development",
    "isAssigned": true,
    "assignedTo": "1",
    "status": "occupied"
  },
  {
    "id": "2",
    "number": "A102",
    "floor": 1,
    "department": "Development",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "3",
    "number": "A103",
    "floor": 1,
    "department": "HR",
    "isAssigned": true,
    "assignedTo": "2",
    "status": "occupied"
  },
  {
    "id": "4",
    "number": "A104",
    "floor": 1,
    "department": "HR",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "5",
    "number": "B101",
    "floor": 2,
    "department": "Sales",
    "isAssigned": true,
    "assignedTo": "3",
    "status": "occupied"
  },
  {
    "id": "6",
    "number": "B102",
    "floor": 2,
    "department": "Sales",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "7",
    "number": "B103",
    "floor": 2,
    "department": "Marketing",
    "isAssigned": true,
    "assignedTo": "4",
    "status": "occupied"
  },
  {
    "id": "8",
    "number": "B104",
    "floor": 2,
    "department": "Marketing",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "9",
    "number": "C101",
    "floor": 3,
    "department": "Finance",
    "isAssigned": true,
    "assignedTo": "5",
    "status": "occupied"
  },
  {
    "id": "10",
    "number": "C102",
    "floor": 3,
    "department": "Finance",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "11",
    "number": "C103",
    "floor": 3,
    "department": "IT Support",
    "isAssigned": true,
    "assignedTo": "6",
    "status": "occupied"
  },
  {
    "id": "12",
    "number": "C104",
    "floor": 3,
    "department": "IT Support",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "13",
    "number": "D101",
    "floor": 4,
    "department": "Customer Service",
    "isAssigned": true,
    "assignedTo": "7",
    "status": "occupied"
  },
  {
    "id": "14",
    "number": "D102",
    "floor": 4,
    "department": "Customer Service",
    "isAssigned": false,
    "assignedTo": null,
    "status": "available"
  },
  {
    "id": "15",
    "number": "D103",
    "floor": 4,
    "department": "Legal",
    "isAssigned": true,
    "assignedTo": "8",
    "status": "occupied"
  },
  {
    "id": "16",
    "number": "D103",
    "floor": 4,
    "department": "Legal",
    "isAssigned": true,
    "assignedTo": "8",
    "status": "available"
  }
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
