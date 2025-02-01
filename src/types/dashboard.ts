export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  avatar: string;
  dateJoined: string;
  salary: number;
  team: string;
  projects: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ongoing' | 'completed' | 'planned';
  projectHead: {
    name: string;
    avatar: string;
  };
  team: Employee[];
  startDate: string;
  endDate: string;
  progress: number;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  postedDate: string;
}

export interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  floor: number;
  isAvailable: boolean;
  currentBooking?: {
    startTime: string;
    endTime: string;
    bookedBy: string;
  };
}

export interface Seat {
  id: string;
  number: string;
  floor: number;
  department: string;
  isAssigned: boolean;
  assignedTo?: string;
  status: 'available' | 'occupied' | 'maintenance';
}