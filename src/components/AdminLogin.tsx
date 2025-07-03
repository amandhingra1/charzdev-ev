import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin credentials (in production, this should be handled server-side)
  const ADMIN_CREDENTIALS = {
    username: 'charzdev_admin',
    password: 'CharzDev@2024!'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Store authentication in sessionStorage (expires when browser closes)
      sessionStorage.setItem('charzdev_admin_auth', 'true');
      sessionStorage.setItem('charzdev_admin_login_time', Date.now().toString());
      onLogin(true);
    } else {
      setError('Invalid username or password');
      onLogin(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-dark-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full bg-dark-700 text-white p-4 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none transition-colors"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full bg-dark-700 text-white p-4 rounded-lg border border-gray-600 focus:border-primary-500 focus:outline-none transition-colors pr-12"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Login to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-dark-700 rounded-lg border border-gray-600">
            <h3 className="text-white font-semibold mb-2">Demo Credentials:</h3>
            <p className="text-gray-300 text-sm mb-1">Username: <code className="bg-dark-600 px-2 py-1 rounded">charzdev_admin</code></p>
            <p className="text-gray-300 text-sm">Password: <code className="bg-dark-600 px-2 py-1 rounded">CharzDev@2024!</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;