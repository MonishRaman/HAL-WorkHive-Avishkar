import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, CheckCircle } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useDashboardStore();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <h2 className="text-2xl font-bold">Project Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{project.endDate}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
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

            <div>
              <h4 className="font-semibold mb-4">Project Milestones</h4>
              <div className="space-y-4">
                {[
                  { title: 'Project Planning', completed: true },
                  { title: 'Design Phase', completed: true },
                  { title: 'Development', completed: project.progress > 50 },
                  { title: 'Testing', completed: project.progress > 75 },
                  { title: 'Deployment', completed: project.progress === 100 }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${
                      milestone.completed ? 'text-green-500' : 'text-gray-300'
                    }`} />
                    <span className={milestone.completed ? 'text-gray-900' : 'text-gray-500'}>
                      {milestone.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold">Team Members</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={project.projectHead.avatar}
                  alt={project.projectHead.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{project.projectHead.name}</p>
                  <p className="text-sm text-gray-500">Project Lead</p>
                </div>
              </div>

              <div className="border-t pt-4">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};