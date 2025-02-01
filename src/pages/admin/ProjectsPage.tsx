import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { ProjectCard } from '../../components/Dashboard/ProjectCard';
import { useDashboardStore } from '../../store/dashboardStore';

export const ProjectsPage: React.FC = () => {
  const { projects } = useDashboardStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'planned'>('all');

  const filteredProjects = projects
    .filter(project => 
      (filter === 'all' || project.status === filter) &&
      (project.name.toLowerCase().includes(search.toLowerCase()) ||
       project.description.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Projects</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="planned">Planned</option>
          </select>
          <button
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => {/* Handle click */}}
          />
        ))}
      </div>
    </div>
  );
};