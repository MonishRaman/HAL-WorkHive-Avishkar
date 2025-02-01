import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Building } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const documentSections = [
    {
      title: 'Employee & HR Documents',
      icon: Users,
      items: [
        'Employee Records',
        'Attendance Reports',
        'Payroll Documents',
        'Performance Reviews'
      ]
    },
    {
      title: 'Financial & Accounting',
      icon: FileText,
      items: [
        'Invoices',
        'Tax Documents',
        'Budget Reports',
        'Expense Claims'
      ]
    },
    {
      title: 'Office Administration',
      icon: Building,
      items: [
        'Office Supply Inventory',
        'IT Asset Records',
        'Maintenance Logs',
        'Security Protocols'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documentSections.map((section) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};