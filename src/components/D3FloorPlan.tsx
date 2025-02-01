import React, { useState } from 'react';
import { LayoutGrid, Users, Settings, Video } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
// import D3FloorPlan from './D3FloorPlan'; // Import the D3FloorPlan component

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
                onClick={() => setActiveTab(tab id)} // Directly set activeTab without using 'as any'
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
          <div className="h-[500px] w-full">  {/* Fixed height for the floor plan */}
            <D3FloorPlan />  {/* Render the D3FloorPlan component here */}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetingRooms.map(room => (
              <div key={room.id} className="p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Capacity: {room.capacity} people</p>
                  <p>Floor: {room.floor}</p>
                  <p className={`font-semibold ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {room.isAvailable ? 'Available' : 'In Use'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
