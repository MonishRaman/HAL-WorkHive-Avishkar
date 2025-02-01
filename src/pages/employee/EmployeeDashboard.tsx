import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, LayoutDashboard } from 'lucide-react';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ProjectCard } from '../../components/Dashboard/ProjectCard';
import { useDashboardStore } from '../../store/dashboardStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const EmployeeDashboard: React.FC = () => {
  const { projects } = useDashboardStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const userProjects = projects.filter(p => p.team.some(member => member.email === user?.email));

  const stats = [
    {
      title: 'Employee Details',
      value: user?.name || '',
      icon: User,
      path: '/employee/profile'
    },
    {
      title: 'Active Projects',
      value: userProjects.length,
      icon: Briefcase,
      path: '/employee/projects'
    },
    {
      title: 'Floor Plan',
      value: 'View Layout',
      icon: LayoutDashboard,
      path: '/employee/office-layout'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            onClick={() => navigate(stat.path)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/employee/projects/${project.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};