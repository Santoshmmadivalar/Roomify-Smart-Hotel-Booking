import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { allHotels } from '../utils/dummyData';
import { MapPin, Star, SlidersHorizontal, Check } from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [appliedCategory, setAppliedCategory] = useState('');
  const [showFilterToast, setShowFilterToast] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setAppliedCategory(cat);
    } else {
      setAppliedCategory('');
    }
  }, [location.search]);

  const amenitiesList = ["WiFi", "Pool", "Spa", "AC", "Parking", "Gym"];

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleApplyFilters = () => {
    setShowFilterToast(true);
    setTimeout(() => {
      setShowFilterToast(false);
    }, 3000);
  };

  const filteredHotels = allHotels.filter(hotel => {
    const withinPrice = hotel.price <= priceRange;
    const hotelAmenities = hotel.amenities || ["WiFi", "AC", "Pool"];
    const hasAmenities = selectedAmenities.length === 0 || selectedAmenities.every(am => hotelAmenities.includes(am));
    const matchesCategory = appliedCategory ? hotel.category?.toLowerCase() === appliedCategory.toLowerCase() : true;
    return withinPrice && hasAmenities && matchesCategory;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 mt-20 page-transition bg-transparent text-white">
      {/* Toast */}
      {showFilterToast && (
        <div className="fixed top-24 right-6 bg-green-500/90 backdrop-blur-md border border-green-400 text-white px-5 py-4 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-50 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold">Filters applied successfully!</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 items-start mt-4">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0 glass-panel p-6 sticky top-28 hidden lg:block">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-purple-400" /> Filters
            </h3>
          </div>
          
          <div className="mb-8 border-b border-white/10 pb-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-6 uppercase tracking-wider">Price Range</h4>
            <div className="flex flex-col gap-4">
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-purple-300 text-sm font-bold">
                <span>₹1,000</span>
                <span className="text-white">₹{Number(priceRange).toLocaleString()}+</span>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-white/10 pb-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-6 uppercase tracking-wider">Amenities</h4>
            <div className="flex flex-col gap-4">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-purple-500 cursor-pointer rounded border-white/20 bg-black/50"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  <span className="text-base text-gray-300 group-hover:text-white transition-colors">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="btn-primary w-full py-3" onClick={handleApplyFilters}>Apply Filters</button>
            <button className="text-gray-400 font-semibold hover:text-white transition-colors text-sm" onClick={() => {
              setPriceRange(50000);
              setSelectedAmenities([]);
              navigate('/search');
            }}>Clear all filters</button>
          </div>
        </aside>

        {/* Results Area */}
        <div className="flex-1 w-full">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">{filteredHotels.length} luxury stays found</p>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Stays in {appliedCategory ? appliedCategory.charAt(0).toUpperCase() + appliedCategory.slice(1) : 'Anywhere'}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {filteredHotels.map(hotel => (
              <div key={hotel.id} className="glass-panel flex flex-col sm:flex-row gap-6 cursor-pointer overflow-hidden card-hover" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                <div className="w-full sm:w-80 h-64 sm:h-auto shrink-0 relative overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-bold">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-purple-400 font-semibold uppercase tracking-wider">{hotel.location}</p>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 line-clamp-1">{hotel.name}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
                  
                  <div className="flex flex-col gap-2 mb-6 text-sm text-gray-400">
                    <p>4 guests • 2 bedrooms • 2 beds • 2 baths</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(hotel.amenities || ["WiFi", "AC", "Pool"]).map((am, i) => (
                        <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                    <button className="text-purple-400 font-bold hover:text-purple-300">View Details →</button>
                    <div className="flex flex-col items-end">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">/ night</span>
                      </div>
                      <span className="text-xs text-gray-500">₹{(hotel.price * 3).toLocaleString()} total before taxes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
