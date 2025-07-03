import React from 'react';
import { Leaf, Shield, Award, Users } from 'lucide-react';
import { useData } from '../context/DataContext';

const AboutUs: React.FC = () => {
  const { siteContent } = useData();

  return (
    <section id="about" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-primary-400">CharzDev</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {siteContent.aboutUs}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Eco-Friendly</h3>
            <p className="text-gray-300">Zero emissions, maximum impact on environmental conservation</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Safety First</h3>
            <p className="text-gray-300">Advanced safety features and rigorous testing standards</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Award Winning</h3>
            <p className="text-gray-300">Recognized globally for innovation and excellence</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Customer Focus</h3>
            <p className="text-gray-300">Dedicated to providing exceptional customer experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              To revolutionize transportation by making electric vehicles accessible, affordable, and desirable for everyone. We believe in creating a sustainable future without compromising on performance or luxury.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Through continuous innovation and commitment to excellence, we're not just building cars – we're building the future of mobility.
            </p>
          </div>
          
          <div className="bg-dark-700 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose CharzDev?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Industry-leading battery technology with extended range</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Comprehensive charging network across India</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">24/7 customer support and service</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Competitive pricing and flexible financing options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;