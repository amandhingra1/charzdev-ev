import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, MessageSquare, ShoppingCart, Settings, Eye, Edit, Trash2, Plus, Save, X, Check, EyeOff, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AdminLogin from './AdminLogin';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    products, 
    reviews, 
    orders, 
    siteContent,
    addProduct,
    updateProduct,
    deleteProduct,
    addReview,
    updateReview,
    deleteReview,
    approveReview,
    updateOrder,
    updateSiteContent
  } = useData();

  const [activeTab, setActiveTab] = useState('products');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSiteContent, setEditingSiteContent] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('charzdev_admin_auth');
      const loginTime = sessionStorage.getItem('charzdev_admin_login_time');
      
      if (isAuth && loginTime) {
        // Check if session is still valid (24 hours)
        const currentTime = Date.now();
        const sessionTime = parseInt(loginTime);
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (currentTime - sessionTime < sessionDuration) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          sessionStorage.removeItem('charzdev_admin_auth');
          sessionStorage.removeItem('charzdev_admin_login_time');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('charzdev_admin_auth');
    sessionStorage.removeItem('charzdev_admin_login_time');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleProductSubmit = (e: React.FormEvent, productData: any) => {
    e.preventDefault();
    if (editingItem) {
      updateProduct(editingItem.id, productData);
    } else {
      addProduct(productData);
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleReviewSubmit = (e: React.FormEvent, reviewData: any) => {
    e.preventDefault();
    if (editingItem) {
      updateReview(editingItem.id, reviewData);
    } else {
      addReview({...reviewData, date: new Date().toISOString().split('T')[0], approved: true});
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleSiteContentSubmit = (e: React.FormEvent, contentData: any) => {
    e.preventDefault();
    updateSiteContent(contentData);
    setEditingSiteContent(false);
  };

  const ProductForm = ({ product, onSubmit }: any) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      price: '',
      image: '',
      description: '',
      specifications: {
        range: '',
        charging: '',
        topSpeed: '',
        acceleration: ''
      },
      features: ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      onSubmit(e, formData);
    };

    const addFeature = () => {
      setFormData({
        ...formData,
        features: [...formData.features, '']
      });
    };

    const updateFeature = (index: number, value: string) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = value;
      setFormData({
        ...formData,
        features: newFeatures
      });
    };

    const removeFeature = (index: number) => {
      setFormData({
        ...formData,
        features: formData.features.filter((_: string, i: number) => i !== index)
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-700 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600 h-24"
            required
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-white mb-2">Range</label>
            <input
              type="text"
              value={formData.specifications.range}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {...formData.specifications, range: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Charging</label>
            <input
              type="text"
              value={formData.specifications.charging}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {...formData.specifications, charging: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Top Speed</label>
            <input
              type="text"
              value={formData.specifications.topSpeed}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {...formData.specifications, topSpeed: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Acceleration</label>
            <input
              type="text"
              value={formData.specifications.acceleration}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {...formData.specifications, acceleration: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Features</label>
          {formData.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
                placeholder="Feature description"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Feature</span>
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Product</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setShowAddForm(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const ReviewForm = ({ review, onSubmit }: any) => {
    const [formData, setFormData] = useState(review || {
      name: '',
      email: '',
      rating: 5,
      comment: '',
      productName: '',
      approved: true
    });

    const handleSubmit = (e: React.FormEvent) => {
      onSubmit(e, formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-700 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Customer Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Rating</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            >
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Product</label>
            <select
              value={formData.productName}
              onChange={(e) => setFormData({...formData, productName: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            >
              <option value="">General Review</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Review Comment</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600 h-24"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="approved"
            checked={formData.approved}
            onChange={(e) => setFormData({...formData, approved: e.target.checked})}
            className="w-4 h-4 text-primary-600 bg-dark-600 border-gray-600 rounded focus:ring-primary-500"
          />
          <label htmlFor="approved" className="text-white">Approved for display</label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Review</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setShowAddForm(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const SiteContentForm = ({ content, onSubmit }: any) => {
    const [formData, setFormData] = useState(content || siteContent);

    const handleSubmit = (e: React.FormEvent) => {
      onSubmit(e, formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-700 p-6 rounded-lg">
        <div>
          <label className="block text-white mb-2">Hero Image URL</label>
          <input
            type="url"
            value={formData.heroImage}
            onChange={(e) => setFormData({...formData, heroImage: e.target.value})}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Hero Subtitle</label>
            <input
              type="text"
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">About Us Content</label>
          <textarea
            value={formData.aboutUs}
            onChange={(e) => setFormData({...formData, aboutUs: e.target.value})}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600 h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Address</label>
            <input
              type="text"
              value={formData.footerContent.address}
              onChange={(e) => setFormData({
                ...formData,
                footerContent: {...formData.footerContent, address: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Phone</label>
            <input
              type="text"
              value={formData.footerContent.phone}
              onChange={(e) => setFormData({
                ...formData,
                footerContent: {...formData.footerContent, phone: e.target.value}
              })}
              className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={formData.footerContent.email}
            onChange={(e) => setFormData({
              ...formData,
              footerContent: {...formData.footerContent, email: e.target.value}
            })}
            className="w-full bg-dark-600 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
          <button
            type="button"
            onClick={() => setEditingSiteContent(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Homepage</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-dark-800 min-h-screen p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-dark-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Product Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {(showAddForm || editingItem) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    {editingItem ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <ProductForm 
                    product={editingItem} 
                    onSubmit={handleProductSubmit}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-dark-700 rounded-lg p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-primary-400 text-lg font-semibold mb-4">{product.price}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center space-x-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center space-x-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Order Management</h2>
              <div className="bg-dark-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-dark-600">
                    <tr>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Phone</th>
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-600">
                        <td className="px-6 py-4">{order.customerName}</td>
                        <td className="px-6 py-4">{order.phone}</td>
                        <td className="px-6 py-4">{order.product}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrder(order.id, { status: e.target.value as any })}
                            className="bg-dark-600 text-white p-2 rounded border border-gray-600"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => window.open(`https://wa.me/${order.phone.replace(/\D/g, '')}`, '_blank')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Review Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {(showAddForm || editingItem) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    {editingItem ? 'Edit Review' : 'Add New Review'}
                  </h3>
                  <ReviewForm 
                    review={editingItem} 
                    onSubmit={handleReviewSubmit}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-dark-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        {review.approved ? (
                          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>Visible</span>
                          </span>
                        ) : (
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                            <EyeOff className="h-3 w-3" />
                            <span>Hidden</span>
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => approveReview(review.id)}
                          className={`px-3 py-1 rounded text-sm ${
                            review.approved 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {review.approved ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => setEditingItem(review)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-400">{review.date}</span>
                    </div>
                    {review.productName && (
                      <p className="text-primary-400 text-sm mb-2">Product: {review.productName}</p>
                    )}
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Site Settings</h2>
                <button
                  onClick={() => setEditingSiteContent(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Content</span>
                </button>
              </div>

              {editingSiteContent ? (
                <SiteContentForm 
                  content={siteContent} 
                  onSubmit={handleSiteContentSubmit}
                />
              ) : (
                <div className="space-y-6">
                  <div className="bg-dark-700 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Hero Section</h3>
                    <div className="mb-4">
                      <img src={siteContent.heroImage} alt="Hero" className="w-full h-64 object-cover rounded-lg mb-4" />
                    </div>
                    <p><strong>Title:</strong> {siteContent.heroTitle}</p>
                    <p><strong>Subtitle:</strong> {siteContent.heroSubtitle}</p>
                  </div>

                  <div className="bg-dark-700 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">About Us</h3>
                    <p className="text-gray-300">{siteContent.aboutUs}</p>
                  </div>

                  <div className="bg-dark-700 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Footer Content</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Address:</strong> {siteContent.footerContent.address}</p>
                        <p><strong>Phone:</strong> {siteContent.footerContent.phone}</p>
                        <p><strong>Email:</strong> {siteContent.footerContent.email}</p>
                      </div>
                      <div>
                        <p><strong>Quick Links:</strong></p>
                        <ul className="list-disc list-inside">
                          {siteContent.footerContent.quickLinks.map((link, index) => (
                            <li key={index}>{link}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;