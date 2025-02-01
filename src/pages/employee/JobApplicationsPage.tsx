import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, Building, Clock } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const JobApplicationsPage: React.FC = () => {
  const { jobPositions } = useDashboardStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'full-time' | 'part-time' | 'contract'>('all');

  const filteredJobs = jobPositions.filter(job => 
    (filter === 'all' || job.type === filter) &&
    (job.title.toLowerCase().includes(search.toLowerCase()) ||
     job.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <motion.div
            key={job.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Building className="w-4 h-4" />
                  <span>{job.department}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                job.type === 'full-time' ? 'bg-green-100 text-green-800' :
                job.type === 'part-time' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {job.type}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>Experience: {job.experience}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Posted: {job.postedDate}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={() => {
                // Handle job application
              }}
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};