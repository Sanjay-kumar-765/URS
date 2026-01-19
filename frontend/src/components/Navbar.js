import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 py-3 md:px-6 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo and Wallet */}
          <div className="flex items-center justify-between gap-3">
            <h2 
              className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              ☂️ RainShield
            </h2>
            <div 
              className="wallet-badge cursor-pointer text-sm md:text-base"
              onClick={() => navigate('/wallet')}
            >
              👛 ₹{user?.walletBalance || 0}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button 
              className="flex-1 md:flex-none bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
              onClick={() => navigate('/umbrellas')}
            >
              ☂️ Umbrellas
            </button>
            <button 
              className="flex-1 md:flex-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
              onClick={() => navigate('/tracking')}
            >
              📍 Track
            </button>
            <button 
              className="flex-1 md:flex-none bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
              onClick={() => navigate('/profile')}
            >
              👤 Profile
            </button>
            <button 
              className="flex-1 md:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
