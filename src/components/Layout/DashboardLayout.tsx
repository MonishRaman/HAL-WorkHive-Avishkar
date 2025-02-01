import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LogOut, User, Key, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const menuItems = isAdmin
    ? [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Employees', path: '/admin/employees' },
        { label: 'Projects', path: '/admin/projects' },
        { label: 'Documents', path: '/admin/documents' },
        { label: 'Office Layout', path: '/admin/office-layout' },
      ]
    : [
        { label: 'Dashboard', path: '/employee' },
        { label: 'Team Communication', path: '/employee/team' },
        { label: 'Projects', path: '/employee/projects' },
        { label: 'Job Applications', path: '/employee/jobs' },
        { label: 'Office Layout', path: '/employee/office-layout' },
      ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">WorkHive</h1>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <User size={20} />
              <span>Profile Details</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Key size={20} />
              <span>Change Password</span>
            </div>
            <div 
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className="px-6 py-3 hover:bg-indigo-50 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </motion.aside>

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back, {user?.name}
            </h2>
            {isAdmin && (
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  3
                </span>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};