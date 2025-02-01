import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    age: user?.age || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    designation: user?.designation || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    updateProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </motion.button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <img
              src={profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop'}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditing && (
              <input
                type="text"
                placeholder="Avatar URL"
                value={profile.avatar}
                onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              ) : (
                <p className="text-lg">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              ) : (
                <p className="text-lg">{profile.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              ) : (
                <p className="text-lg">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              ) : (
                <p className="text-lg">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              ) : (
                <p className="text-lg">{profile.designation}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  rows={3}
                />
              ) : (
                <p className="text-lg">{profile.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};