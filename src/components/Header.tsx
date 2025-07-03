import React, { useState } from 'react';
import { Menu, X, Zap, Phone, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/919834828850', '_blank');
  };

  const handleAdminAccess = () => {
    navigate('/admin');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-primary-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-white">CharzDev</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-primary-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-300 hover:text-primary-400 transition-colors"
            >
              Products
            </button>
            <button
              onClick={handleAdminAccess}
              className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-1"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-gray-300 hover:text-primary-400 py-2 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="block w-full text-left text-gray-300 hover:text-primary-400 py-2 transition-colors"
            >
              Products
            </button>
            <button
              onClick={handleAdminAccess}
              className="block w-full text-left text-gray-300 hover:text-primary-400 py-2 transition-colors flex items-center space-x-1"
            >
              <Settings className="h-4 w-4" />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;