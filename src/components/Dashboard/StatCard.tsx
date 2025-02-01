import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </motion.div>
  );
};