import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { EmployeeCard } from '../../components/Dashboard/EmployeeCard';
import { useDashboardStore } from '../../store/dashboardStore';

export const EmployeesPage: React.FC = () => {
  const { employees } = useDashboardStore();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'department' | 'team'>('name');

  const filteredEmployees = employees
    .filter(emp => 
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.team.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'department' | 'team')}
            className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="team">Sort by Team</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => {/* Handle click */}}
          />
        ))}
      </div>
    </div>
  );
};