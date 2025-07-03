import React from 'react';
import { Star, Quote, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ReviewsProps {
  onAddReview: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onAddReview }) => {
  const { reviews } = useData();

  // Only show approved reviews
  const approvedReviews = reviews.filter(review => review.approved);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-primary-400">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Real experiences from our satisfied customers who have made the switch to electric
          </p>
          <button
            onClick={onAddReview}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Write a Review</span>
          </button>
        </div>

        {approvedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-dark-700 p-6 rounded-xl shadow-xl hover:shadow-primary-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary-400 mr-3" />
                  <div className="flex space-x-1">{renderStars(review.rating)}</div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">{review.comment}</p>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="font-semibold text-white">{review.name}</div>
                  <div className="text-gray-400 text-sm">{review.date}</div>
                  {review.productName && (
                    <div className="text-primary-400 text-sm mt-1">
                      Product: {review.productName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-dark-800 inline-block p-8 rounded-xl">
            <div className="text-4xl font-bold text-primary-400 mb-2">
              {approvedReviews.length > 0 ? 
                (approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length).toFixed(1) : 
                '5.0'
              }/5
            </div>
            <div className="text-gray-300 mb-2">Average Rating</div>
            <div className="flex justify-center space-x-1 mb-2">
              {renderStars(5)}
            </div>
            <div className="text-gray-400 text-sm">Based on {approvedReviews.length}+ reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;