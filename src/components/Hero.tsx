import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { siteContent } = useData();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookNow = () => {
    const message = `Hi, I'm interested in CharzDev electric vehicles. Please provide more details about your products.`;
    const whatsappUrl = `https://wa.me/919834828850?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={siteContent.heroImage}
          alt="CharzDev Electric Vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {siteContent.heroTitle}
            <span className="text-primary-400 block">Electric</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {siteContent.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={scrollToProducts}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg font-semibold">Explore Vehicles</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleBookNow}
              className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-lg font-semibold">Book Now</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-600/20 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
              <div className="text-gray-300">KM Range</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-600/20 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-400 mb-2">30 Min</div>
              <div className="text-gray-300">Fast Charging</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-600/20 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-gray-300">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;