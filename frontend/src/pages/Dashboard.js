import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeRentals, setActiveRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    fetchActiveRentals();
    fetchRentalHistory();
  }, []);

  const fetchActiveRentals = async () => {
    try {
      const response = await api.get('/rentals/active');
      setActiveRentals(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean));
    } catch (error) {
      console.log('No active rentals');
    }
  };

  const fetchRentalHistory = async () => {
    try {
      const response = await api.get('/rentals/history');
      setRentalHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch rental history');
    }
  };

  const needsDeposit = !user?.depositMade;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card" style={{ padding: '1rem' }}>
          <h2 style={{ marginBottom: '12px', color: '#1f2937', fontSize: '1.5rem' }}>
            Dashboard
          </h2>
          
          {needsDeposit && (
            <div className="alert alert-warning" style={{ padding: '0.75rem', marginBottom: '12px' }}>
              <h3 style={{ marginBottom: '4px', fontSize: '1rem' }}>Initial Deposit Required</h3>
              <p style={{ marginBottom: '8px', fontSize: '0.875rem' }}>
                Add ₹300 to your wallet and receive ₹100 cashback bonus.
              </p>
              <button 
                className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                onClick={() => navigate('/wallet')}
              >
                Add Deposit
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', alignItems: 'start' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '1rem' }}>Umbrella Rental System</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div>
                  <h4 style={{ marginBottom: '4px', fontSize: '0.875rem' }}>Pricing</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.95 }}>₹7/hr | ₹70/day</p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '4px', fontSize: '0.875rem' }}>How It Works</h4>
                  <ul style={{ fontSize: '0.8rem', opacity: 0.95, paddingLeft: '16px', lineHeight: '1.5', margin: 0 }}>
                    <li>Deposit ₹300, get ₹100 cashback</li>
                    <li>Browse & rent umbrellas</li>
                    <li>Track rentals in real-time</li>
                    <li>Return at any location</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #0ea5e9', padding: '1rem' }}>
              <h3 style={{ color: '#0c4a6e', marginBottom: '8px', fontSize: '1rem' }}>Wallet Balance</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '10px' }}>
                ₹{user?.walletBalance || 0}
              </div>
              <button 
                className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', width: '100%' }}
                onClick={() => navigate('/wallet')}
              >
                Add Money
              </button>
            </div>

            <div className="card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #10b981', padding: '1rem' }}>
              <h3 style={{ color: '#065f46', marginBottom: '8px', fontSize: '1rem' }}>Rent Umbrella</h3>
              <p style={{ color: '#065f46', marginBottom: '10px', fontSize: '0.875rem' }}>
                Browse available umbrellas.
              </p>
              <button 
                className="btn btn-success" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', width: '100%' }}
                onClick={() => navigate('/umbrellas')}
                disabled={needsDeposit}
              >
                Browse Umbrellas
              </button>
            </div>

            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '10px', color: '#1f2937', fontSize: '1rem' }}>Rental History</h3>
              {rentalHistory.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '10px', fontSize: '0.875rem' }}>
                  No rental history.
                </p>
              ) : (
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {rentalHistory.slice(0, 5).map((rental) => (
                    <div key={rental._id} style={{ 
                      padding: '8px', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '6px', 
                      marginBottom: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <strong style={{ fontSize: '0.875rem' }}>{rental.umbrella?.umbrellaId}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {new Date(rental.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>₹{rental.totalAmount}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {rental.duration}h
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;