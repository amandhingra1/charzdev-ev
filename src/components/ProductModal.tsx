import React from 'react';
import { X, Battery, Zap, Clock, Gauge, Check, MessageCircle } from 'lucide-react';

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    specifications: {
      range: string;
      charging: string;
      topSpeed: string;
      acceleration: string;
    };
    features: string[];
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const handleBookNow = () => {
    const message = `Hi, I'm interested in the ${product.name} (${product.price}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/919834828850?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className="relative bg-dark-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-dark-800 p-6 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Product Image */}
            <div className="mb-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Price and Description */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary-400">{product.price}</div>
                <button
                  onClick={handleBookNow}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Book Now</span>
                </button>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-dark-700 p-4 rounded-lg flex items-center space-x-3">
                  <Battery className="h-6 w-6 text-primary-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Range</div>
                    <div className="text-white font-semibold">{product.specifications.range}</div>
                  </div>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-primary-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Charging</div>
                    <div className="text-white font-semibold">{product.specifications.charging}</div>
                  </div>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg flex items-center space-x-3">
                  <Gauge className="h-6 w-6 text-primary-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Top Speed</div>
                    <div className="text-white font-semibold">{product.specifications.topSpeed}</div>
                  </div>
                </div>
                <div className="bg-dark-700 p-4 rounded-lg flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Acceleration</div>
                    <div className="text-white font-semibold">{product.specifications.acceleration}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="text-center">
              <button
                onClick={handleBookNow}
                className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg text-lg font-semibold flex items-center space-x-3 mx-auto transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                <span>Book Now via WhatsApp</span>
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Contact us directly on WhatsApp: +91 98348 28850
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;