import React from 'react';
import { motion } from 'framer-motion';
import type { Employee } from '../../types/dashboard';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Team</p>
            <p className="font-medium">{employee.team}</p>
          </div>
          <div>
            <p className="text-gray-500">Projects</p>
            <p className="font-medium">{employee.projects.length}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};