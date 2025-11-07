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

  useEffect(() => {
    if (showDropOffModal || showPaymentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDropOffModal, showPaymentModal]);

  const fetchActiveRentals = async () => {
    try {
      const response = await api.get('/rentals/active');
      const rentals = Array.isArray(response.data) ? response.data : [response.data].filter(Boolean);
      setActiveRentals(rentals);
      if (rentals.length > 0) {
        setSelectedRental(rentals[0]);
      }
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

  const handlePayment = () => {
    setShowPaymentModal(true);
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
      alert(`Payment successful via ${method}! ₹${response.data.amountDeducted} deducted. Umbrella unlocked.`);
      setShowPaymentModal(false);
    } catch (error) {
      alert('Payment verification failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePayAllRentals = async () => {
    if (paymentLoading) return;
    
    const unpaidRentals = activeRentals.filter(r => !r.unlocked);
    if (unpaidRentals.length === 0) return;
    
    const totalCost = unpaidRentals.reduce((sum, rental) => {
      const start = new Date(rental.startTime);
      const hours = Math.ceil((currentTime - start) / (1000 * 60 * 60));
      return sum + (hours <= 7 ? (hours || 1) * 7 : Math.ceil(hours / 24) * 70);
    }, 0);
    
    if (window.confirm(`Pay ₹${totalCost} to unlock all ${unpaidRentals.length} umbrellas?`)) {
      setPaymentLoading(true);
      try {
        const response = await api.post('/rentals/pay-all', {
          paymentId: `batch_${Date.now()}`,
          paymentMethod: 'Wallet'
        });
        
        setActiveRentals(prev => prev.map(r => ({ ...r, unlocked: true })));
        updateUser({ walletBalance: response.data.walletBalance });
        alert(`Payment successful! ₹${response.data.amountDeducted} deducted. ${response.data.count} umbrellas unlocked.`);
      } catch (error) {
        alert(error.response?.data?.message || 'Payment failed');
      } finally {
        setPaymentLoading(false);
      }
    }
  };

  const handleEndRental = () => {
    if (!selectedRental) return;
    setSelectedUmbrellasForDropOff([selectedRental._id]);
    setShowDropOffModal(true);
  };

  const handleEndMultipleRentals = () => {
    const unlockedRentals = activeRentals.filter(r => r.unlocked);
    if (unlockedRentals.length === 0) return;
    setSelectedUmbrellasForDropOff(unlockedRentals.map(r => r._id));
    setShowDropOffModal(true);
  };

  const confirmEndRental = async () => {
    if (!selectedDropOffLocation) {
      alert('Please select a drop-off location');
      return;
    }
    if (selectedUmbrellasForDropOff.length === 0) {
      alert('Please select at least one umbrella to drop off');
      return;
    }
    
    try {
      const dropOffData = {
        address: selectedDropOffLocation.address,
        latitude: selectedDropOffLocation.lat,
        longitude: selectedDropOffLocation.lng
      };

      if (selectedUmbrellasForDropOff.length === 1) {
        const response = await api.post(`/rentals/${selectedUmbrellasForDropOff[0]}/end`, {
          dropOffLocation: dropOffData
        });
        const { rental } = response.data;
        alert(`Rental ended! Umbrella dropped at ${selectedDropOffLocation.name}. Total cost: ₹${rental.totalAmount}`);
      } else {
        const promises = selectedUmbrellasForDropOff.map(rentalId => 
          api.post(`/rentals/${rentalId}/end`, { dropOffLocation: dropOffData })
        );
        await Promise.all(promises);
        alert(`${selectedUmbrellasForDropOff.length} umbrellas dropped at ${selectedDropOffLocation.name}`);
      }
      
      setShowDropOffModal(false);
      setSelectedDropOffLocation(null);
      setSelectedUmbrellasForDropOff([]);
      navigate('/dashboard');
    } catch (error) {
      console.error('End rental error:', error);
      alert(error.response?.data?.message || 'Failed to end rental');
    }
  };

  const PaymentModal = () => {
    if (!showPaymentModal || !selectedRental) return null;
    const amount = calculateCurrentCost();
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="card" style={{ width: '400px', maxWidth: '90vw' }}>
          <h3 style={{ marginBottom: '20px' }}>Pay for Rental</h3>
          <div style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Amount: ₹{amount}
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {['UPI', 'QR Code', 'Card', 'Wallet'].map((method, index) => (
              <button
                key={method}
                className="btn"
                style={{ 
                  background: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][index], 
                  color: 'white', 
                  padding: '16px', 
                  textAlign: 'left' 
                }}
                onClick={() => processRentalPayment(method)}
                disabled={paymentLoading}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {['📱', '📷', '💳', '👛'][index]}
                  </span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{method} Payment</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <button
            className="btn"
            style={{ background: '#6b7280', color: 'white', width: '100%', marginTop: '16px' }}
            onClick={() => setShowPaymentModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const DropOffModal = () => {
    if (!showDropOffModal) return null;
    const unlockedRentals = activeRentals.filter(r => r.unlocked);
    
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          overflowY: 'auto',
          padding: '20px'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowDropOffModal(false);
            setSelectedDropOffLocation(null);
            setSelectedUmbrellasForDropOff([]);
          }
        }}
      >
        <div className="card" style={{ width: '600px', maxWidth: '100%', margin: 'auto' }}>
          <h3 style={{ marginBottom: '20px' }}>Drop Off Umbrellas</h3>
          
          {unlockedRentals.length > 1 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '1rem' }}>Select Umbrellas to Drop:</h4>
              <div style={{ display: 'grid', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '4px' }}>
                {unlockedRentals.map((rental) => (
                  <label
                    key={rental._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      border: selectedUmbrellasForDropOff.includes(rental._id) ? '2px solid #667eea' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: selectedUmbrellasForDropOff.includes(rental._id) ? '#f0f9ff' : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUmbrellasForDropOff.includes(rental._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUmbrellasForDropOff([...selectedUmbrellasForDropOff, rental._id]);
                        } else {
                          setSelectedUmbrellasForDropOff(selectedUmbrellasForDropOff.filter(id => id !== rental._id));
                        }
                      }}
                      style={{ width: '18px', height: '18px', accentColor: '#667eea', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{rental.umbrella?.umbrellaId}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'capitalize' }}>{rental.umbrella?.color}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <h4 style={{ marginBottom: '12px', fontSize: '1rem' }}>Select Drop-off Location:</h4>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '20px', maxHeight: '250px', overflowY: 'auto', padding: '4px' }}>
            {campusLocations.map((location) => (
              <button
                key={location.name}
                className="btn"
                style={{ 
                  background: selectedDropOffLocation?.name === location.name ? '#3b82f6' : '#f3f4f6',
                  color: selectedDropOffLocation?.name === location.name ? 'white' : '#1f2937',
                  padding: '12px', 
                  textAlign: 'left',
                  border: selectedDropOffLocation?.name === location.name ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  minHeight: 'auto'
                }}
                onClick={() => setSelectedDropOffLocation(location)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{location.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{location.address}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={confirmEndRental}
              disabled={!selectedDropOffLocation || selectedUmbrellasForDropOff.length === 0}
            >
              Drop {selectedUmbrellasForDropOff.length} Umbrella{selectedUmbrellasForDropOff.length !== 1 ? 's' : ''} Here
            </button>
            <button
              className="btn"
              style={{ background: '#6b7280', color: 'white' }}
              onClick={() => {
                setShowDropOffModal(false);
                setSelectedDropOffLocation(null);
                setSelectedUmbrellasForDropOff([]);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!window.google && !document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTbyTHiHW-_-_-_-_-_-_-_&libraries=places';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="card text-center">
            <div className="loading-spinner" style={{ margin: '0 auto 20px' }}></div>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (activeRentals.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="card text-center">
            <h2 style={{ color: '#6b7280', marginBottom: '16px' }}>No Active Rentals</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              You don't have any active umbrella rentals.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/umbrellas')}
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
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Rental Tracking</h2>
          
          {activeRentals.length > 1 && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Select Rental to Track:</h3>
              <div style={{ display: 'grid', gap: '8px' }}>
                {activeRentals.map((rental) => (
                  <button
                    key={rental._id}
                    onClick={() => setSelectedRental(rental)}
                    style={{
                      padding: '12px',
                      border: selectedRental?._id === rental._id ? '2px solid #667eea' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: selectedRental?._id === rental._id ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    ☂️ {rental.umbrella?.umbrellaId || 'Unknown'} - {rental.umbrella?.location?.address || 'Unknown location'}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <div className="card" style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', marginBottom: '20px' }}>
                <h3 style={{ color: '#0c4a6e', marginBottom: '12px' }}>Umbrella Details</h3>
                <div style={{ marginBottom: '8px' }}>
                  <strong>ID:</strong> {selectedRental?.umbrella?.umbrellaId || 'N/A'}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Color:</strong> {selectedRental?.umbrella?.color || 'N/A'}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Status:</strong> 
                  <span style={{ 
                    color: selectedRental?.unlocked ? '#10b981' : '#f59e0b',
                    fontWeight: 'bold',
                    marginLeft: '8px'
                  }}>
                    {selectedRental?.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>

              <div className="card" style={{ background: '#f0fdf4', border: '1px solid #10b981' }}>
                <h3 style={{ color: '#065f46', marginBottom: '12px' }}>Time & Cost</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
                  {hours}h {minutes}m
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Started:</strong> {selectedRental ? new Date(selectedRental.startTime).toLocaleString() : 'N/A'}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#065f46' }}>
                  Current Cost: ₹{currentCost}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Location</h3>
              <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f0f9ff', borderRadius: '6px' }}>
                <strong>Address:</strong> {selectedRental?.umbrella?.location?.address || 'Chandigarh University Campus'}
              </div>
              <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f0fdf4', borderRadius: '6px' }}>
                <strong>Coordinates:</strong> {selectedRental?.umbrella?.location?.latitude || 'N/A'}, {selectedRental?.umbrella?.location?.longitude || 'N/A'}
              </div>
              <TrackingMap rental={selectedRental} />
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Actions</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {selectedRental && !selectedRental.unlocked && (
                <button 
                  className="btn btn-primary"
                  onClick={handlePayment}
                >
                  Pay ₹{currentCost} & Unlock
                </button>
              )}
              
              {activeRentals.filter(r => !r.unlocked).length > 1 && (
                <button 
                  className="btn btn-success"
                  onClick={handlePayAllRentals}
                >
                  Pay All ({activeRentals.filter(r => !r.unlocked).length})
                </button>
              )}
              
              {selectedRental && selectedRental.unlocked && (
                <button 
                  className="btn"
                  style={{ background: '#ef4444', color: 'white' }}
                  onClick={handleEndRental}
                >
                  End This Rental
                </button>
              )}
              
              {activeRentals.filter(r => r.unlocked).length > 1 && (
                <button 
                  className="btn"
                  style={{ background: '#dc2626', color: 'white' }}
                  onClick={handleEndMultipleRentals}
                >
                  End Multiple ({activeRentals.filter(r => r.unlocked).length})
                </button>
              )}
              
              <button 
                className="btn"
                style={{ background: '#6b7280', color: 'white' }}
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
        
        <PaymentModal />
        <DropOffModal />
      </div>
    </div>
  );
};

export default RentalTracking;