import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, X as XIcon } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const { notifications } = useDashboardStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{notification.message}</p>
                    {notification.type === 'job' && (
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-green-100 rounded-lg text-green-600">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1  Continuing the NotificationsPanel component exactly where we left off:

                        <button className="p-1 hover:bg-red-100 rounded-lg text-red-600">
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};