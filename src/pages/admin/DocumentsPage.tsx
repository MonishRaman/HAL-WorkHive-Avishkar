import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Building } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const documentSections = [
    {
      title: 'Employee & HR Documents',
      icon: Users,
      items: [
        { name: 'Employee Records', url: 'https://www.hrdirectapps.com/employee-records/img/employee-records-employee-directory.png' },
        { name: 'Attendance Reports', url: 'https://cdn.prod.website-files.com/620e4b3d823b71ee91fa6d60/620e4b3d823b71729efa80ee_qAojyVOJ8K_eOWJlKJrN10vfIhvPX7xBa-jCXfIUX9acqmEf8UrLgWR4We9Hj4M12chuaLj9Vah_JCxJkeAE1Zi4465yZJbnXWuW2eRIVPOue_c1GQ0somaLn0XfEcpe5BmfU-qH.png' },
        { name: 'Payroll Documents', url: 'https://sage100reports.com/wp-content/plugins/wp-easycart-data/products/pics1/R05020210_1a72cd0b561ba4316af9095e21965cb0.gif' },
        { name: 'Performance Reviews', url: 'https://cdn.prod.website-files.com/5f55ff47b6d23a11cb496a69/65b172fd3ebc2494856d8400_image2.jpg' }
      ]
    },
    {
      title: 'Financial & Accounting',
      icon: FileText,
      items: [
        { name: 'Invoices', url: 'https://www.deskera.com/blog/content/images/2020/11/Commercial-invoice-example.png' },
        { name: 'Tax Documents', url: 'https://static.wixstatic.com/media/64b5fb_dd1d7d2a10da425986b1ee5e471911a1~mv2.jpeg/v1/fill/w_328,h_428,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/itr.jpeg' },
        { name: 'Budget Reports', url: 'https://cdn.create.microsoft.com/catalog-assets/en-us/60c5b272-ef3b-44bb-babc-c0caea29057d/thumbnails/1034/simple-annual-budget-modern-simple-1-1-e21e14c34a54.webp' },
        { name: 'Expense Claims', url: 'https://i.etsystatic.com/39339543/r/il/4b8469/4483846844/il_1080xN.4483846844_mt5t.jpg' }
      ]
    },
    {
      title: 'Office Administration',
      icon: Building,
      items: [
        { name: 'Office Supply Inventory', url: 'https://coefficient.io/wp-content/uploads/2023/12/Printable-Inventory-Template-3-1-1024x776.webp' },
        { name: 'IT Asset Records', url: 'https://www.apinsurance.co.uk/wp-content/uploads/2014/09/Asset-Register.png' },
        { name: 'Maintenance Logs', url: 'https://www.onupkeep.com/images/raster/learning/maintenance-tools/equipment-maintenance-log.jpg?cbh=68e9e6f3f1a21c4b6f6242a2ca47588b
        // ' },
        { name: 'Security Protocols', url: 'https://templatelab.com/wp-content/uploads/2018/05/Security-Policy-32.jpg' }
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
                    key={item.name}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                    <span>{item.name}</span>
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
