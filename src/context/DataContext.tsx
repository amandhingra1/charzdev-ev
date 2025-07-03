import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
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
}

interface Review {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
  productId?: string;
  productName?: string;
  approved: boolean;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  product: string;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

interface SiteContent {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutUs: string;
  footerContent: {
    address: string;
    phone: string;
    email: string;
    quickLinks: string[];
  };
}

interface DataContextType {
  products: Product[];
  reviews: Review[];
  orders: Order[];
  siteContent: SiteContent;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (review: Omit<Review, 'id'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  approveReview: (id: string) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'CharzDev Model S Pro',
      price: '₹45,00,000',
      image: 'https://images.pexels.com/photos/3849554/pexels-photo-3849554.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'The CharzDev Model S Pro represents the pinnacle of electric vehicle technology, combining luxury, performance, and sustainability in one exceptional package.',
      specifications: {
        range: '500+ km',
        charging: '0-80% in 30 mins',
        topSpeed: '250 km/h',
        acceleration: '0-100 km/h in 3.2s'
      },
      features: [
        'Autopilot Technology',
        'Premium Interior',
        'Advanced Safety Features',
        'Over-the-Air Updates',
        'Panoramic Sunroof',
        'Premium Sound System'
      ]
    },
    {
      id: '2',
      name: 'CharzDev Urban X',
      price: '₹25,00,000',
      image: 'https://images.pexels.com/photos/15435053/pexels-photo-15435053.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Perfect for city driving, the Urban X combines efficiency with style, making it the ideal choice for modern urban professionals.',
      specifications: {
        range: '400 km',
        charging: '0-80% in 45 mins',
        topSpeed: '180 km/h',
        acceleration: '0-100 km/h in 5.8s'
      },
      features: [
        'Compact Design',
        'Smart Connectivity',
        'Eco-friendly Materials',
        'Advanced Infotainment',
        'Wireless Charging',
        'LED Lighting System'
      ]
    },
    {
      id: '3',
      name: 'CharzDev SUV Elite',
      price: '₹65,00,000',
      image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'The ultimate electric SUV that offers uncompromising luxury, space, and performance for families who demand the best.',
      specifications: {
        range: '450 km',
        charging: '0-80% in 35 mins',
        topSpeed: '200 km/h',
        acceleration: '0-100 km/h in 4.5s'
      },
      features: [
        '7-Seater Configuration',
        'All-Wheel Drive',
        'Premium Leather Interior',
        'Advanced Driver Assistance',
        'Panoramic Glass Roof',
        'Premium Audio System'
      ]
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent build quality and amazing performance. The CharzDev Model S Pro exceeded all my expectations!',
      date: '2024-01-15',
      productId: '1',
      productName: 'CharzDev Model S Pro',
      approved: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Love my Urban X! Perfect for daily commuting and the charging network is excellent.',
      date: '2024-01-10',
      productId: '2',
      productName: 'CharzDev Urban X',
      approved: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      rating: 4,
      comment: 'Great SUV for family trips. Spacious and comfortable with impressive range.',
      date: '2024-01-05',
      productId: '3',
      productName: 'CharzDev SUV Elite',
      approved: true
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      phone: '+91 9876543210',
      product: 'CharzDev Model S Pro',
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      phone: '+91 9876543211',
      product: 'CharzDev Urban X',
      date: '2024-01-18',
      status: 'confirmed'
    }
  ]);

  const [siteContent, setSiteContent] = useState<SiteContent>({
    heroImage: 'https://images.pexels.com/photos/3849554/pexels-photo-3849554.jpeg?auto=compress&cs=tinysrgb&w=1200',
    heroTitle: 'Drive the Future',
    heroSubtitle: 'Experience the next generation of electric vehicles with CharzDev',
    aboutUs: 'CharzDev is a pioneering company in the electric vehicle industry, committed to creating sustainable transportation solutions that don\'t compromise on performance or luxury. Our mission is to accelerate the world\'s transition to sustainable energy through innovative electric vehicles that exceed expectations.',
    footerContent: {
      address: 'Pune, Maharashtra, India',
      phone: '+91 98348 28850',
      email: 'info@charzdev.com',
      quickLinks: ['Home', 'Products', 'Contact', 'Support']
    }
  });

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addReview = (review: Omit<Review, 'id'>) => {
    const newReview = { ...review, id: Date.now().toString() };
    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, ...updates } : review
    ));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, approved: !review.approved } : review
    ));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: Date.now().toString() };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, ...updates } : order
    ));
  };

  const updateSiteContent = (updates: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...updates }));
  };

  return (
    <DataContext.Provider value={{
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
      addOrder,
      updateOrder,
      updateSiteContent
    }}>
      {children}
    </DataContext.Provider>
  );
};