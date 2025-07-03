import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose }) => {
  const { addReview, products } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    productId: '',
    productName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.productId);
      const reviewData = {
        ...formData,
        productName: selectedProduct ? selectedProduct.name : 'General',
        date: new Date().toISOString().split('T')[0],
        approved: false // Reviews need admin approval
      };

      addReview(reviewData);
      
      // Show success message
      alert('Thank you for your review! It will be published after admin approval.');
      onClose();
    } catch (error) {
      alert('Error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600 hover:text-yellow-300'
        }`}
        onClick={interactive ? () => setFormData({...formData, rating: i + 1}) : undefined}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className="relative bg-dark-800 rounded-xl max-w-2xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Write a Review</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark-700 text-white p-3 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-dark-700 text-white p-3 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Product (Optional)</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({...formData, productId: e.target.value})}
                className="w-full bg-dark-700 text-white p-3 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none"
              >
                <option value="">General Review</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Rating *</label>
              <div className="flex space-x-1">
                {renderStars(formData.rating, true)}
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Your Review *</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full bg-dark-700 text-white p-3 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none h-32"
                placeholder="Share your experience with CharzDev..."
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-gray-400 text-sm">
              * Your review will be published after admin approval.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;