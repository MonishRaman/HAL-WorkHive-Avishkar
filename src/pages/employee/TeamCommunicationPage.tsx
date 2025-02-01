import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, Users, Hash } from 'lucide-react';

export const TeamCommunicationPage: React.FC = () => {
  const communities = [
    {
      name: 'General Discussion',
      platform: 'Telegram',
      icon: MessageCircle,
      members: 156,
      link: 'https://t.me/techcorp_general'
    },
    {
      name: 'Project Updates',
      platform: 'WhatsApp',
      icon: MessageCircle,
      members: 89,
      link: 'https://chat.whatsapp.com/techcorp_projects'
    },
    {
      name: 'Team Meetings',
      platform: 'Google Meet',
      icon: Video,
      members: 45,
      link: 'https://meet.google.com/techcorp'
    },
    {
      name: 'Department Chat',
      platform: 'Slack',
      icon: Hash,
      members: 67,
      link: 'https://techcorp.slack.com'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Communication</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => {
          const Icon = community.icon;
          return (
            <motion.a
              key={community.name}
              href={community.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{community.name}</h3>
                  <p className="text-sm text-gray-500">{community.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{community.members} members</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};