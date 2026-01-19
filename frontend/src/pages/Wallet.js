import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const Wallet = () => {
  const { user, updateUser } = useAuth();
  const [amount, setAmount] = useState(300);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/wallet/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions');
    }
  };

  const handleDeposit = () => {
    if (amount < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = async (method) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const verifyResponse = await api.post('/wallet/verify-deposit', {
        paymentId: `${method}_${Date.now()}`,
        amount,
        paymentMethod: method
      });
      
      updateUser({ walletBalance: verifyResponse.data.walletBalance });
      alert(`Payment successful via ${method}!`);
      fetchTransactions();
      setAmount(300);
      setShowPaymentModal(false);
    } catch (error) {
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '💰';
      case 'cashback': return '🎁';
      case 'rental': return '☂️';
      case 'refund': return '↩️';
      default: return '💳';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
        <div className="glass-card">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">💳 Your Money Stuff</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-500 rounded-xl p-6 shadow-lg">
              <h3 className="text-blue-900 font-semibold mb-3">What you've got</h3>
              <div className="text-5xl font-bold text-blue-900 mb-4">
                ₹{user?.walletBalance || 0}
              </div>
              {!user?.depositMade && (
                <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
                  🎁 First time? We'll add ₹100 bonus on ₹300+ deposit!
                </div>
              )}
            </div>

            {/* Add Money Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Top up your wallet</h3>
              <input
                type="number"
                placeholder="Enter amount"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="100"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {[300, 500, 1000, 2000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      amount === preset
                        ? 'bg-indigo-500 text-white border-indigo-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
              <button 
                className="btn-primary"
                onClick={handleDeposit}
                disabled={loading}
              >
                {loading ? 'Adding money...' : `Add ₹${amount}`}
              </button>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">📊 Your Money Moves</h3>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nothing here yet! Start by adding some money 🚀
              </p>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                      <div>
                        <div className="font-semibold capitalize">{transaction.type}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </div>
                        {transaction.description && (
                          <div className="text-sm text-gray-600">{transaction.description}</div>
                        )}
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
            <div className="text-2xl font-bold mb-6">Amount: ₹{amount}</div>
            
            <div className="space-y-3">
              {[
                { method: 'UPI', icon: '📱', desc: 'Pay using UPI ID', color: 'green' },
                { method: 'QR Code', icon: '📷', desc: 'Scan QR to pay', color: 'blue' },
                { method: 'Card', icon: '💳', desc: 'Visa, Mastercard, RuPay', color: 'purple' },
                { method: 'Wallet', icon: '👛', desc: 'Paytm, PhonePe, GPay', color: 'yellow' }
              ].map(({ method, icon, desc, color }) => (
                <button
                  key={method}
                  onClick={() => processPayment(method)}
                  disabled={loading}
                  className={`w-full p-4 rounded-lg text-left flex items-center gap-3 transition-all hover:shadow-lg ${
                    color === 'green' ? 'bg-green-500' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  } text-white disabled:opacity-50`}
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-bold">{method}</div>
                    <div className="text-sm opacity-90">{desc}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-4 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
