import React from 'react';
import { Zap, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { siteContent } = useData();

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/919834828850', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-900 border-t border-primary-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">CharzDev</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading the future of sustainable transportation with innovative electric vehicles.
            </p>
            <button
              onClick={handleWhatsAppContact}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contact via WhatsApp</span>
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {siteContent.footerContent.quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{siteContent.footerContent.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">{siteContent.footerContent.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">{siteContent.footerContent.email}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Business Hours</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CharzDev. All rights reserved. | Designed for the future of mobility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;