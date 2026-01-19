import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TrackingMap from '../components/TrackingMap';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const RentalTracking = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeRentals, setActiveRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showDropOffModal, setShowDropOffModal] = useState(false);
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState(null);
  const [selectedUmbrellasForDropOff, setSelectedUmbrellasForDropOff] = useState([]);
  const [campusLocations] = useState([
    { name: 'Main Gate', address: 'Main Gate, Chandigarh University', lat: 30.7590, lng: 76.5675 },
    { name: 'Central Library', address: 'Central Library, Chandigarh University', lat: 30.7585, lng: 76.5680 },
    { name: 'Food Court', address: 'Food Court, Chandigarh University', lat: 30.7580, lng: 76.5670 },
    { name: 'Sports Complex', address: 'Sports Complex, Chandigarh University', lat: 30.7595, lng: 76.5685 },
    { name: 'Boys Hostel', address: 'Boys Hostel, Chandigarh University', lat: 30.7575, lng: 76.5665 }
  ]);

  useEffect(() => {
    fetchActiveRentals();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchActiveRentals = async () => {
    try {
      const response = await api.get('/rentals/active');
      const rentals = Array.isArray(response.data) ? response.data : [response.data].filter(Boolean);
      setActiveRentals(rentals);
      if (rentals.length > 0) setSelectedRental(rentals[0]);
    } catch (error) {
      console.log('No active rentals');
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = () => {
    if (!selectedRental) return { hours: 0, minutes: 0 };
    const start = new Date(selectedRental.startTime);
    const diff = currentTime - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  const calculateCurrentCost = () => {
    const { hours } = calculateDuration();
    if (hours === 0) return 7;
    return hours <= 7 ? (hours + 1) * 7 : Math.ceil((hours + 1) / 24) * 70;
  };

  const processRentalPayment = async (method) => {
    if (paymentLoading) return;
    setPaymentLoading(true);
    try {
      const response = await api.post(`/rentals/${selectedRental._id}/pay`, {
        paymentId: `${method}_${Date.now()}`,
        paymentMethod: method
      });
      setSelectedRental(prev => ({ ...prev, unlocked: true, paymentStatus: 'completed' }));
      setActiveRentals(prev => prev.map(r => r._id === selectedRental._id ? { ...r, unlocked: true } : r));
      updateUser({ walletBalance: response.data.walletBalance });
      alert(`Payment successful! ₹${response.data.amountDeducted} deducted. Umbrella unlocked.`);
      setShowPaymentModal(false);
    } catch (error) {
      alert('Payment failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  const confirmEndRental = async () => {
    if (!selectedDropOffLocation || selectedUmbrellasForDropOff.length === 0) {
      alert('Please select umbrellas and drop-off location');
      return;
    }
    try {
      const dropOffData = {
        address: selectedDropOffLocation.address,
        latitude: selectedDropOffLocation.lat,
        longitude: selectedDropOffLocation.lng
      };
      if (selectedUmbrellasForDropOff.length === 1) {
        const response = await api.post(`/rentals/${selectedUmbrellasForDropOff[0]}/end`, { dropOffLocation: dropOffData });
        alert(`Rental ended! Total: ₹${response.data.rental.totalAmount}`);
      } else {
        await Promise.all(selectedUmbrellasForDropOff.map(id => api.post(`/rentals/${id}/end`, { dropOffLocation: dropOffData })));
        alert(`${selectedUmbrellasForDropOff.length} umbrellas dropped!`);
      }
      setShowDropOffModal(false);
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to end rental');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
          <div className="glass-card text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-indigo-600">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (activeRentals.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
          <div className="glass-card text-center py-12">
            <div className="text-6xl mb-4">☂️</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">No Active Rentals</h2>
            <p className="text-gray-500 mb-6">You don't have any active umbrella rentals.</p>
            <button 
              onClick={() => navigate('/umbrellas')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Find an Umbrella
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { hours, minutes } = calculateDuration();
  const currentCost = calculateCurrentCost();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
        <div className="glass-card">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">📍 Rental Tracking</h2>
          
          {/* Rental Selector */}
          {activeRentals.length > 1 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Select Rental:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeRentals.map((rental) => (
                  <button
                    key={rental._id}
                    onClick={() => setSelectedRental(rental)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedRental?._id === rental._id
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="font-bold">☂️ {rental.umbrella?.umbrellaId}</div>
                    <div className="text-sm opacity-90">{rental.umbrella?.location?.address}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Timer Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 opacity-90">⏱️ Duration</h3>
              <div className="text-5xl font-bold mb-2">{hours}h {minutes}m</div>
              <div className="text-sm opacity-90">Started: {selectedRental ? new Date(selectedRental.startTime).toLocaleTimeString() : 'N/A'}</div>
            </div>

            {/* Cost Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 opacity-90">💰 Current Cost</h3>
              <div className="text-5xl font-bold mb-2">₹{currentCost}</div>
              <div className="text-sm opacity-90">₹7/hr • ₹70/day</div>
            </div>

            {/* Status Card */}
            <div className={`rounded-xl p-6 shadow-xl ${
              selectedRental?.unlocked 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-yellow-500 to-orange-600'
            } text-white`}>
              <h3 className="text-lg font-semibold mb-4 opacity-90">🔐 Status</h3>
              <div className="text-3xl font-bold mb-2">
                {selectedRental?.unlocked ? '✅ Unlocked' : '🔒 Locked'}
              </div>
              <div className="text-sm opacity-90">
                {selectedRental?.unlocked ? 'Ready to use' : 'Pay to unlock'}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Umbrella Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">☂️ Umbrella Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-bold text-gray-800">{selectedRental?.umbrella?.umbrellaId || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-bold text-gray-800 capitalize">{selectedRental?.umbrella?.color || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-bold text-gray-800 text-sm">{selectedRental?.umbrella?.location?.address || 'CU Campus'}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🗺️ Location Map</h3>
              <TrackingMap rental={selectedRental} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              {selectedRental && !selectedRental.unlocked && (
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="flex-1 min-w-[200px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  💳 Pay ₹{currentCost} & Unlock
                </button>
              )}
              
              {selectedRental && selectedRental.unlocked && (
                <button 
                  onClick={() => {
                    setSelectedUmbrellasForDropOff([selectedRental._id]);
                    setShowDropOffModal(true);
                  }}
                  className="flex-1 min-w-[200px] bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  🏁 End Rental
                </button>
              )}
              
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 min-w-[200px] bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">💳 Select Payment Method</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-6">₹{calculateCurrentCost()}</div>
            
            <div className="space-y-3">
              {[
                { method: 'UPI', icon: '📱', color: 'from-green-500 to-emerald-600' },
                { method: 'QR Code', icon: '📷', color: 'from-blue-500 to-indigo-600' },
                { method: 'Card', icon: '💳', color: 'from-purple-500 to-pink-600' },
                { method: 'Wallet', icon: '👛', color: 'from-yellow-500 to-orange-600' }
              ].map(({ method, icon, color }) => (
                <button
                  key={method}
                  onClick={() => processRentalPayment(method)}
                  disabled={paymentLoading}
                  className={`w-full p-4 rounded-lg text-left flex items-center gap-3 bg-gradient-to-r ${color} text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50`}
                >
                  <span className="text-3xl">{icon}</span>
                  <span>{method}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-4 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Drop-off Modal */}
      {showDropOffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-card max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold mb-6">📍 Select Drop-off Location</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {campusLocations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => setSelectedDropOffLocation(location)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedDropOffLocation?.name === location.name
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2">
                    <span>📍</span>
                    {location.name}
                  </div>
                  <div className="text-sm opacity-90 mt-1">{location.address}</div>
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={confirmEndRental}
                disabled={!selectedDropOffLocation}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                Drop Here
              </button>
              <button
                onClick={() => {
                  setShowDropOffModal(false);
                  setSelectedDropOffLocation(null);
                }}
                className="flex-1 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalTracking;
