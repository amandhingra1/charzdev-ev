import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Products from './Products';
import Reviews from './Reviews';
import AboutUs from './AboutUs';
import Footer from './Footer';
import ProductModal from './ProductModal';
import ReviewForm from './ReviewForm';

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <Hero />
      <Products onProductClick={setSelectedProduct} />
      <Reviews onAddReview={() => setShowReviewForm(true)} />
      <AboutUs />
      <Footer />
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      {showReviewForm && (
        <ReviewForm onClose={() => setShowReviewForm(false)} />
      )}
    </div>
  );
};

export default HomePage;