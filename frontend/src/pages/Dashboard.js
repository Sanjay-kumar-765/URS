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
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
        <div className="glass-card">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>
          
          {needsDeposit && (
            <div className="bg-yellow-50 border border-yellow-400 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Initial Deposit Required</h3>
              <p className="text-sm text-yellow-800 mb-3">
                Add ₹300 to your wallet and receive ₹100 cashback bonus.
              </p>
              <button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg transition-all"
                onClick={() => navigate('/wallet')}
              >
                Add Deposit
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* System Info Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold mb-3">Umbrella Rental System</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Pricing</h4>
                  <p className="text-sm opacity-95">₹7/hr | ₹70/day</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">How It Works</h4>
                  <ul className="text-sm opacity-95 list-disc list-inside space-y-1">
                    <li>Deposit ₹300, get ₹100 cashback</li>
                    <li>Browse & rent umbrellas</li>
                    <li>Track rentals in real-time</li>
                    <li>Return at any location</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-500 rounded-xl p-4 shadow-lg">
              <h3 className="text-blue-900 font-semibold mb-2">Wallet Balance</h3>
              <div className="text-4xl font-bold text-blue-900 mb-3">
                ₹{user?.walletBalance || 0}
              </div>
              <button 
                className="btn-primary text-sm"
                onClick={() => navigate('/wallet')}
              >
                Add Money
              </button>
            </div>

            {/* Rent Umbrella Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-500 rounded-xl p-4 shadow-lg">
              <h3 className="text-green-900 font-semibold mb-2">Rent Umbrella</h3>
              <p className="text-green-800 text-sm mb-3">
                Browse available umbrellas.
              </p>
              <button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg transition-all w-full text-sm disabled:opacity-50"
                onClick={() => navigate('/umbrellas')}
                disabled={needsDeposit}
              >
                Browse Umbrellas
              </button>
            </div>

            {/* Rental History Card */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Rental History</h3>
              {rentalHistory.length === 0 ? (
                <p className="text-gray-500 text-center text-sm py-4">
                  No rental history.
                </p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {rentalHistory.slice(0, 5).map((rental) => (
                    <div key={rental._id} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
                      <div>
                        <strong className="text-sm">{rental.umbrella?.umbrellaId}</strong>
                        <div className="text-xs text-gray-500">
                          {new Date(rental.startTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">₹{rental.totalAmount}</div>
                        <div className="text-xs text-gray-500">{rental.duration}h</div>
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
