import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = {
        email: formData.email,
        phone: formData.phone
      };
      
      if (formData.newPassword && formData.currentPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      const response = await api.put('/auth/profile', updateData);
      updateUser(response.data.user);
      setEditing(false);
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      alert('Profile updated successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete('/auth/profile');
        logout();
        navigate('/login');
        alert('Account deleted successfully');
      } catch (error) {
        alert('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-3 py-4 md:px-6 md:py-6">
        {/* Profile Header */}
        <div className="glass-card mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.email?.split('@')[0]}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                  {user?.googleId ? '🔗 Google Account' : '📧 Email Account'}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✅ Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="lg:col-span-2">
            <div className="glass-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">👤 Account Information</h2>
                {!editing && (
                  <button 
                    onClick={() => setEditing(true)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-all"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
              
              {!editing ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">📧 Email Address</p>
                    <p className="text-lg font-semibold text-gray-800">{user?.email || 'Not provided'}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">📱 Phone Number</p>
                    <p className="text-lg font-semibold text-gray-800">{user?.phone || 'Not provided'}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">🎂 Member Since</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : 'Unknown'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  
                  {!user?.googleId && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="input-field"
                          placeholder="Required to change password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="input-field"
                          placeholder="Leave blank to keep current"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex gap-3">
                    <button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : '💾 Save Changes'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex-1 bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Wallet Card */}
            <div className="glass-card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">💰 Wallet</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">
                ₹{user?.walletBalance || 0}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deposit Made:</span>
                  <span className={`font-semibold ${user?.depositMade ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.depositMade ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cashback:</span>
                  <span className={`font-semibold ${user?.cashbackReceived ? 'text-green-600' : 'text-gray-400'}`}>
                    {user?.cashbackReceived ? '✅ Received' : '⏳ Pending'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/wallet')}
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              >
                Manage Wallet
              </button>
            </div>

            {/* Activity Card */}
            <div className="glass-card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Activity</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow">
                  <p className="text-sm text-gray-600">Total Rentals</p>
                  <p className="text-2xl font-bold text-blue-600">{user?.rentalHistory?.length || 0}</p>
                </div>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                  View History
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">
                Deleting your account is permanent and cannot be undone.
              </p>
              <button 
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
