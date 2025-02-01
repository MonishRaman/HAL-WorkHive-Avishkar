import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, Users, Briefcase } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const EmployeeDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, projects } = useDashboardStore();
  
  const employee = employees.find(emp => emp.id === id);
  const employeeProjects = projects.filter(project => 
    project.team.some(member => member.id === id)
  );

  if (!employee) {
    return <div>Employee not found</div>;
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
        <h2 className="text-2xl font-bold">Employee Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <p className="text-gray-600">{employee.designation}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{employee.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Joined: {employee.dateJoined}</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span>Salary: ${employee.salary.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <span>Team: {employee.team}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold">Current Projects</h3>
            </div>

            <div className="space-y-4">
              {employeeProjects.map(project => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};