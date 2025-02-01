import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types/dashboard';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{project.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {project.status}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <img
            src={project.projectHead.avatar}
            alt={project.projectHead.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-600">
            Lead by {project.projectHead.name}
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};