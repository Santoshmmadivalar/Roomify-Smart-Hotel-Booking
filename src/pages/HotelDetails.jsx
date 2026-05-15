import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allHotels } from '../utils/dummyData';
import { MapPin, Star, Wifi, Coffee, Wind, Car, Check, Calendar, Users, Shield } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = allHotels.find(h => h.id === parseInt(id)) || allHotels[0];
  const { addBooking } = useContext(BookingContext);
  
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const nights = 3;

  const handleBook = () => {
    const newBooking = {
      hotel,
      checkIn: dates || new Date().toISOString().split('T')[0],
      checkOut: '2026-06-20',
      guests,
      price: (hotel.price * nights) + 4000
    };
    addBooking(newBooking);
    setShowToast(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 mt-20 page-transition bg-transparent text-white">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 right-6 bg-green-500/90 backdrop-blur-md border border-green-400 text-white px-5 py-4 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-50 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold">Booking confirmed! Redirecting to dashboard...</span>
        </div>
      )}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">{hotel.name}</h1>
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/5">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold">{hotel.rating}</span>
            </span>
            <span className="underline cursor-pointer hover:text-white transition-colors">{hotel.reviews} reviews</span>
            <span>•</span>
            <span className="underline cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
              <MapPin size={14} className="text-purple-400" /> {hotel.location}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery - Premium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:col-span-2 h-full relative group">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        <div className="hidden md:flex flex-col gap-3 h-full">
          <div className="h-[calc(50%-0.375rem)] w-full overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="h-[calc(50%-0.375rem)] w-full overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-3 h-full">
          <div className="h-[calc(50%-0.375rem)] w-full overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="h-[calc(50%-0.375rem)] w-full relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
              <span className="text-white font-bold border border-white/30 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">Show all photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
        <div className="lg:col-span-2">
          
          <section className="mb-10 pb-10 border-b border-white/10">
            <h2 className="text-3xl font-bold mb-3 text-white">Entire luxury property hosted by Roomify Elite</h2>
            <p className="text-purple-300 font-medium text-lg">16 guests • 8 bedrooms • 8 beds • 8 baths</p>
          </section>

          <section className="mb-10 pb-10 border-b border-white/10">
            <div className="glass-panel p-6 mb-8 flex gap-4 items-start bg-blue-900/20 border-blue-500/30">
              <Shield className="text-blue-400 shrink-0" size={28} />
              <div>
                <h4 className="text-white font-bold mb-1">Roomify Premium Protection</h4>
                <p className="text-gray-400 text-sm">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              Experience the ultimate luxury and comfort at {hotel.name}. Located in the heart of {hotel.location}, 
              this beautiful property offers breathtaking views, exceptional service, and world-class amenities. 
              Whether you're traveling for business or leisure, our hotel provides the perfect setting for an unforgettable stay.
            </p>
          </section>

          <section className="mb-10 pb-10 border-b border-white/10">
            <h2 className="text-2xl font-bold mb-8 text-white">Premium Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-center gap-4 text-gray-300 text-lg"><Wifi className="text-purple-400" size={28} /> Ultra-fast wifi</div>
              <div className="flex items-center gap-4 text-gray-300 text-lg"><Wind className="text-purple-400" size={28} /> Central air conditioning</div>
              <div className="flex items-center gap-4 text-gray-300 text-lg"><Coffee className="text-purple-400" size={28} /> Gourmet breakfast included</div>
              <div className="flex items-center gap-4 text-gray-300 text-lg"><Car className="text-purple-400" size={28} /> Valet parking</div>
            </div>
            <button className="btn-outline mt-10 w-full md:w-auto">Show all 42 amenities</button>
          </section>

        </div>

        {/* Booking Widget - Sticky Card */}
        <div className="relative hidden lg:block">
          <div className="glass-panel p-8 sticky top-28 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/30 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div className="mb-8 relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white">₹{hotel.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 font-light">/ night</span>
              </div>
            </div>

            <div className="flex flex-col gap-0 border border-white/20 rounded-2xl overflow-hidden mb-6 bg-black/40 backdrop-blur-md relative z-10">
              <div className="flex items-center border-b border-white/20">
                <div className="flex-1 p-4 border-r border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Check-In</label>
                  <input type="text" placeholder="Add date" className="w-full text-sm font-semibold outline-none text-white bg-transparent placeholder:text-gray-500 cursor-pointer" />
                </div>
                <div className="flex-1 p-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Checkout</label>
                  <input type="text" placeholder="Add date" className="w-full text-sm font-semibold outline-none text-white bg-transparent placeholder:text-gray-500 cursor-pointer" />
                </div>
              </div>
              <div className="p-4 cursor-pointer hover:bg-white/5 transition-colors">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Guests</label>
                <select className="w-full text-sm font-semibold outline-none text-white bg-transparent appearance-none cursor-pointer" value={guests} onChange={e => setGuests(parseInt(e.target.value))}>
                  <option value="1" className="bg-navy">1 guest</option>
                  <option value="2" className="bg-navy">2 guests</option>
                  <option value="3" className="bg-navy">3 guests</option>
                  <option value="4" className="bg-navy">4 guests</option>
                </select>
              </div>
            </div>

            <button className="w-full btn-primary py-4 rounded-2xl text-lg relative z-10" onClick={handleBook}>Reserve Now</button>
            <p className="text-center text-sm text-gray-500 mt-4 mb-6 relative z-10">You won't be charged yet</p>

            <div className="mt-6 flex flex-col gap-4 relative z-10 text-gray-300">
              <div className="flex justify-between text-base border-b border-white/5 pb-2">
                <span className="underline decoration-gray-500 underline-offset-4">₹{hotel.price.toLocaleString()} x {nights} nights</span>
                <span>₹{(hotel.price * nights).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base border-b border-white/5 pb-2">
                <span className="underline decoration-gray-500 underline-offset-4">Roomify service fee</span>
                <span>₹4,000</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-2">
                <span>Total before taxes</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">₹{((hotel.price * nights) + 4000).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
