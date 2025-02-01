import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Settings, Video } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const OfficeLayoutPage: React.FC = () => {
  const { seats, meetingRooms } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'layout' | 'assignment' | 'management' | 'meetings'>('layout');

  const tabs = [
    { id: 'layout', label: 'Seat Layout', icon: LayoutGrid },
    { id: 'assignment', label: 'Seat Assignment', icon: Users },
    { id: 'management', label: 'Seat Management', icon: Settings },
    { id: 'meetings', label: 'Meeting Rooms', icon: Video }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex space-x-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        {activeTab === 'layout' && (
          <div className="grid grid-cols-8 gap-4">
            {seats.map(seat => (
              <motion.div
                key={seat.id}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg text-center cursor-pointer ${
                  seat.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : seat.status === 'occupied'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                <p className="font-semibold">{seat.number}</p>
                <p className="text-sm">{seat.department}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetingRooms.map(room => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Capacity: {room.capacity} people</p>
                  <p>Floor: {room.floor}</p>
                  <p className={`font-semibold ${
                    room.isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {room.isAvailable ? 'Available' : 'In Use'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};