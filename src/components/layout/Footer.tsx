
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-krishi-primary text-white">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://images.unsplash.com/photo-1585148870686-c10872bf09ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=50" alt="Farmwise" className="h-16 bg-white rounded-full p-1" />
              <div>
                <h3 className="font-bold text-xl">Farmwise</h3>
                <p className="text-xs">Your farming equipment partner.</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">{t('home')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">{t('home')}</Link></li>
              <li><Link to="/equipment" className="hover:underline">{t('equipment')}</Link></li>
              <li><Link to="/about" className="hover:underline">{t('about')}</Link></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Partner</a></li>
              <li><a href="#" className="hover:underline">Dispute</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
            <div className="mt-6">
              <p>Please provide us Feedback</p>
              <a href="#" className="underline font-bold">HERE</a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">Give us a follow on social media</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-gray-200 transition-colors duration-300">
                <Instagram size={28} />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-300">
                <Facebook size={28} />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-300">
                <Twitter size={28} />
              </a>
            </div>
            <p className="mb-4">Made by: Team Farmwise</p>
            
            <div className="flex items-center mt-auto">
              <img src="https://images.unsplash.com/photo-1516820208784-270b250306aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=40" alt="Ministry Logo" className="h-12 mr-4" />
              <div>
                <p className="text-sm">Ministry of Skill Development and Entrepreneurship</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-krishi-secondary mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Farmwise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
