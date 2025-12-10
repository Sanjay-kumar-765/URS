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
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
        <h2 
          className="gradient-text" 
          style={{ fontWeight: '800', cursor: 'pointer', margin: 0 }}
          onClick={() => navigate('/dashboard')}
        >
          ☂️ RainShield
        </h2>
        <div 
          className="wallet-balance" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/wallet')}
        >
          👛 ₹{user?.walletBalance || 0}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
        <button className="btn btn-success" onClick={() => navigate('/umbrellas')}>
          ☂️ Umbrellas
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/tracking')}>
          📍 Track
        </button>
        <button className="btn" style={{ background: '#6b7280', color: 'white' }} onClick={() => navigate('/profile')}>
          👤 Profile
        </button>
        <button 
          className="btn" 
          onClick={handleLogout} 
          style={{ 
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
            color: 'white'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;