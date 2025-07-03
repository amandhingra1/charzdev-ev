import React from 'react';
import { Battery, Zap, Clock, Gauge } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ProductsProps {
  onProductClick: (product: any) => void;
}

const Products: React.FC<ProductsProps> = ({ onProductClick }) => {
  const { products } = useData();

  return (
    <section id="products" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-primary-400">Electric</span> Fleet
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our range of premium electric vehicles designed for performance, luxury, and sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-dark-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-primary-400 text-xl font-semibold mb-4">{product.price}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4 text-primary-400" />
                    <span className="text-gray-300 text-sm">{product.specifications.range}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-primary-400" />
                    <span className="text-gray-300 text-sm">{product.specifications.charging}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-primary-400" />
                    <span className="text-gray-300 text-sm">{product.specifications.topSpeed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary-400" />
                    <span className="text-gray-300 text-sm">{product.specifications.acceleration}</span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductClick(product);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;