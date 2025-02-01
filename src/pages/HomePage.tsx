import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  
  const greeting = hour < 12 
    ? 'Good Morning'
    : hour < 18
    ? 'Good Afternoon'
    : 'Good Evening';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            WorkHive
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/login')}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold shadow-lg"
          >
            Login
          </motion.button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto mt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {greeting}, Welcome to WorkHive
          </h2>
          <p className="text-xl text-indigo-100 mb-12">
            AI-powered Office Seat Planner for Modern Workplaces
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              'Smart Seat Management',
              'Team Collaboration',
              'Resource Optimization'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white"
              >
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p className="text-indigo-100">
                  Streamline your workplace with our intelligent solutions
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};