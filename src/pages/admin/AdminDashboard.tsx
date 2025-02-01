import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileText, LayoutDashboard } from 'lucide-react';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ProjectCard } from '../../components/Dashboard/ProjectCard';
import { useDashboardStore } from '../../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { employees, projects, jobPositions } = useDashboardStore();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      path: '/admin/employees'
    },
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'ongoing').length,
      icon: Briefcase,
      path: '/admin/projects'
    },
    {
      title: 'Open Positions',
      value: jobPositions.length,
      icon: FileText,
      path: '/admin/jobs'
    },
    {
      title: 'Floor Plan',
      value: 'View Layout',
      icon: LayoutDashboard,
      path: '/admin/office-layout'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            onClick={() => navigate(stat.path)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter(p => p.status === 'ongoing')
            .slice(0, 4)
            .map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/admin/projects/${project.id}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};