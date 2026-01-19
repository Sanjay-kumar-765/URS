import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const UmbrellaSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [umbrellas, setUmbrellas] = useState([]);
  const [filteredUmbrellas, setFilteredUmbrellas] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUmbrellas, setSelectedUmbrellas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const colors = ['red', 'blue', 'yellow', 'black', 'green'];
  const umbrellaImages = {
    red: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhDMjAgOCAxMCAxOCAxMCAzMEgxNEMxNCAyMCAyMiAxMiAzMiAxMkM0MiAxMiA1MCAyMCA1MCAzMEg1NEM1NCAxOCA0NCAxIDMyIDhaIiBmaWxsPSIjRUY0NDQ0Ii8+CjxwYXRoIGQ9Ik0zMiAzMFY1NiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTI4IDU2SDM2IiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
    blue: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhDMjAgOCAxMCAxOCAxMCAzMEgxNEMxNCAyMCAyMiAxMiAzMiAxMkM0MiAxMiA1MCAyMCA1MCAzMEg1NEM1NCAxOCA0NCAxIDMyIDhaIiBmaWxsPSIjMzk4M0Y2Ii8+CjxwYXRoIGQ9Ik0zMiAzMFY1NiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTI4IDU2SDM2IiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
    yellow: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhDMjAgOCAxMCAxOCAxMCAzMEgxNEMxNCAyMCAyMiAxMiAzMiAxMkM0MiAxMiA1MCAyMCA1MCAzMEg1NEM1NCAxOCA0NCAxIDMyIDhaIiBmaWxsPSIjRkJCRjI0Ii8+CjxwYXRoIGQ9Ik0zMiAzMFY1NiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTI4IDU2SDM2IiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
    black: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhDMjAgOCAxMCAxOCAxMCAzMEgxNEMxNCAyMCAyMiAxMiAzMiAxMkM0MiAxMiA1MCAyMCA1MCAzMEg1NEM1NCAxOCA0NCAxIDMyIDhaIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0zMiAzMFY1NiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTI4IDU2SDM2IiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
    green: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhDMjAgOCAxMCAxOCAxMCAzMEgxNEMxNCAyMCAyMiAxMiAzMiAxMkM0MiAxMiA1MCAyMCA1MCAzMEg1NEM1NCAxOCA0NCAxIDMyIDhaIiBmaWxsPSIjMTBCOTgxIi8+CjxwYXRoIGQ9Ik0zMiAzMFY1NiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTI4IDU2SDM2IiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'
  };

  const locations = [
    'Main Gate', 'Central Library', 'Engineering Block', 'Student Activity Center', 'Boys Hostel',
    'Girls Hostel', 'Food Court', 'Sports Complex', 'Administrative Block', 'Medical Center'
  ];

  useEffect(() => {
    fetchUmbrellas();
  }, []);

  useEffect(() => {
    filterUmbrellas();
  }, [umbrellas, selectedColor, selectedLocation]);

  const fetchUmbrellas = async () => {
    try {
      const response = await api.get('/umbrellas');
      setUmbrellas(response.data);
    } catch (error) {
      console.error('Failed to fetch umbrellas');
    } finally {
      setLoading(false);
    }
  };

  const filterUmbrellas = () => {
    let filtered = umbrellas.filter(u => u.isAvailable);
    if (selectedColor) filtered = filtered.filter(u => u.color === selectedColor);
    if (selectedLocation) filtered = filtered.filter(u => u.location?.address?.includes(selectedLocation));
    setFilteredUmbrellas(filtered);
  };

  const handleUmbrellaSelect = (umbrellaId) => {
    setSelectedUmbrellas(prev => 
      prev.includes(umbrellaId) ? prev.filter(id => id !== umbrellaId) : [...prev, umbrellaId]
    );
  };

  const handleRentSelected = async () => {
    if (selectedUmbrellas.length === 0) {
      alert('Please select at least one umbrella');
      return;
    }
    if (!user?.depositMade) {
      alert('Please make a deposit first');
      navigate('/wallet');
      return;
    }
    try {
      await api.post('/rentals/start-multiple', { umbrellaIds: selectedUmbrellas });
      alert(`${selectedUmbrellas.length} umbrella(s) rented!`);
      navigate('/tracking');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start rental');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
          <div className="glass-card text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-indigo-600">Finding umbrellas...</h2>
          </div>
        </div>
      </div>
    );
  }

  const needsDeposit = !user?.depositMade;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
        <div className="glass-card">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">☂️ Available Umbrellas</h2>
            <div className="flex flex-wrap gap-3 items-center">
              {/* View Toggle */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-indigo-500 text-white shadow' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📋 Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    viewMode === 'map' ? 'bg-indigo-500 text-white shadow' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🗺️ Map
                </button>
              </div>
              
              {/* Cart Badge */}
              {selectedUmbrellas.length > 0 && (
                <>
                  <span className="bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold">
                    {selectedUmbrellas.length} selected
                  </span>
                  <button 
                    onClick={handleRentSelected}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Rent Now
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Deposit Warning */}
          {needsDeposit && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
              <p className="text-yellow-800 font-medium mb-2">⚠️ Deposit Required</p>
              <p className="text-yellow-700 text-sm mb-3">Add ₹300 to start renting umbrellas.</p>
              <button 
                onClick={() => navigate('/wallet')}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
              >
                Make Deposit
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Color Filter */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Filter by Color:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    !selectedColor ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  All
                </button>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full font-medium capitalize transition-all ${
                      selectedColor === color ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Filter by Location:</h3>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Umbrellas Grid or Map */}
          {viewMode === 'map' ? (
            <MapView 
              umbrellas={filteredUmbrellas}
              selectedUmbrellas={selectedUmbrellas}
              onUmbrellaSelect={handleUmbrellaSelect}
            />
          ) : filteredUmbrellas.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">☂️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Umbrellas Available</h3>
              <p className="text-gray-500">Try different filters or check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUmbrellas.map((umbrella) => (
                <div 
                  key={umbrella._id}
                  onClick={() => umbrella.isAvailable && handleUmbrellaSelect(umbrella._id)}
                  className={`bg-white rounded-xl p-5 shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    selectedUmbrellas.includes(umbrella._id) 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {/* Umbrella Image */}
                  <div className="text-center mb-4">
                    <img 
                      src={umbrellaImages[umbrella.color]} 
                      alt={umbrella.color}
                      className="w-20 h-20 mx-auto mb-3"
                    />
                    <h3 className="text-lg font-bold text-gray-800">{umbrella.umbrellaId}</h3>
                    <p className="text-sm text-gray-600 capitalize font-medium">{umbrella.color} Umbrella</p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      umbrella.isAvailable 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {umbrella.isAvailable ? '✅ Available' : '❌ Rented'}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">📍 Location</p>
                    <p className="text-sm text-gray-700 font-medium">{umbrella.location?.address || 'CU Campus'}</p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">💰 Pricing</p>
                    <p className="text-sm font-bold text-indigo-600">₹7/hr • ₹70/day</p>
                  </div>

                  {/* Select Checkbox */}
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedUmbrellas.includes(umbrella._id)}
                      onChange={() => handleUmbrellaSelect(umbrella._id)}
                      disabled={!umbrella.isAvailable || needsDeposit}
                      className="w-5 h-5 accent-indigo-500"
                    />
                    <span className={`font-semibold ${
                      selectedUmbrellas.includes(umbrella._id) ? 'text-indigo-600' : 'text-gray-600'
                    }`}>
                      {selectedUmbrellas.includes(umbrella._id) ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UmbrellaSelection;
