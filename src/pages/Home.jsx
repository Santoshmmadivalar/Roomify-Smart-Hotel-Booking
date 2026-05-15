import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Calendar, Users, Shield, Zap, HeartHandshake, PhoneCall, MessageSquare, Award, Smartphone, CheckCircle2 } from 'lucide-react';
import { featuredHotels } from '../utils/dummyData';

const destinations = [
  { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { name: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { name: "Jaipur", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { name: "Manali", image: "https://images.pexels.com/photos/31776512/pexels-photo-31776512.jpeg" },
  { name: "Mumbai", image: "https://images.pexels.com/photos/34162312/pexels-photo-34162312.jpeg" },
  { name: "Udaipur", image: "https://images.pexels.com/photos/33230286/pexels-photo-33230286.jpeg" }
];

const testimonials = [
  { name: "Aarav Sharma", role: "Frequent Traveler", text: "Roomify made booking my trip to Goa so effortless. The AI recommendations were spot on!", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  { name: "Priya Patel", role: "Business Executive", text: "The premium UI and seamless booking flow is unmatched. Best platform for Indian hotels.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  { name: "Vikram Singh", role: "Vacationer", text: "Got a fantastic deal on a luxury stay in Udaipur. Roomify Rewards are totally worth it.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
];

const Home = () => {
  const navigate = useNavigate();
  const [activeActivity, setActiveActivity] = useState(0);

  const activities = [
    "Someone booked Taj Mahal Palace, Mumbai 2 mins ago",
    "Someone booked Udaivilas Palace, Udaipur 5 mins ago",
    "Someone booked Goa Beach Resort 12 mins ago"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivity((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full page-transition pb-0">
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14d8379?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Indian Resort" 
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-purple-300 mb-6 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            ✨ Welcome to the future of travel
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
            Find Your Perfect Stay <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Across India</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 drop-shadow-md font-light max-w-2xl">
            Luxury stays, smart booking, unforgettable experiences.
          </p>

          {/* Search Widget */}
          <div className="w-full max-w-5xl bg-navy/40 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center bg-black/40 hover:bg-black/60 transition-colors rounded-2xl px-5 py-4 border border-white/5">
              <MapPin className="text-purple-400 mr-4" size={24} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Location</span>
                <input type="text" placeholder="Where are you going?" className="bg-transparent text-white font-medium outline-none placeholder-gray-500 w-full" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center bg-black/40 hover:bg-black/60 transition-colors rounded-2xl px-5 py-4 border border-white/5">
              <Calendar className="text-purple-400 mr-4" size={24} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Dates</span>
                <input type="text" placeholder="Check-in - Check-out" className="bg-transparent text-white font-medium outline-none placeholder-gray-500 w-full" />
              </div>
            </div>

            <div className="flex-1 flex items-center bg-black/40 hover:bg-black/60 transition-colors rounded-2xl px-5 py-4 border border-white/5">
              <Users className="text-purple-400 mr-4" size={24} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Guests</span>
                <input type="text" placeholder="2 Adults, 1 Room" className="bg-transparent text-white font-medium outline-none placeholder-gray-500 w-full" />
              </div>
            </div>

            <button onClick={() => navigate('/search')} className="btn-primary py-4 px-10 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold">
              <Search size={22} />
              Search
            </button>
          </div>

          {/* Live Activity Feed */}
          <div className="mt-10 flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <span className="text-sm font-medium text-gray-300 transition-opacity duration-500">{activities[activeActivity]}</span>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Luxury Stays</h2>
            <p className="text-gray-400">Handpicked premium properties for an exceptional experience.</p>
          </div>
          <button className="text-purple-400 hover:text-purple-300 font-semibold hidden md:block" onClick={() => navigate('/search')}>View all →</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map(hotel => (
            <div key={hotel.id} className="glass-panel group cursor-pointer overflow-hidden card-hover" onClick={() => navigate(`/hotel/${hotel.id}`)}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-bold">{hotel.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{hotel.name}</h3>
                </div>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <MapPin size={14} className="mr-1" />
                  {hotel.location}
                </div>
                <div className="flex items-baseline justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400"> /night</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-navy/50 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Explore Top Destinations</h2>
          <p className="text-gray-400 text-center mb-12">Discover the diverse beauty of India's most loved locations.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((dest, idx) => (
              <div key={idx} className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-lg">{dest.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Roomify */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Why Choose Roomify</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Zap className="text-purple-400" size={32} />, title: "AI Recommendations", desc: "Smart algorithms tailor hotel suggestions just for you." },
            { icon: <Shield className="text-blue-400" size={32} />, title: "Secure Booking", desc: "Enterprise-grade encryption for all your transactions." },
            { icon: <Award className="text-pink-400" size={32} />, title: "Best Price Guarantee", desc: "We match any lower price found on other platforms." },
            { icon: <HeartHandshake className="text-indigo-400" size={32} />, title: "24/7 Support", desc: "Dedicated concierge service available around the clock." }
          ].map((feature, idx) => (
            <div key={idx} className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Trip Planner & Rewards Split */}
      <section className="max-w-7xl mx-auto px-6 py-12 mb-24 grid md:grid-cols-2 gap-8">
        
        {/* AI Trip Planner Widget */}
        <div className="glass-panel p-8 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/30 blur-[50px] rounded-full"></div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <MessageSquare className="text-purple-400" /> AI Trip Planner
          </h3>
          <p className="text-gray-400 mb-8">Not sure where to go? Chat with our AI concierge for personalized itineraries.</p>
          
          <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">🤖</div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-gray-200 border border-white/5">
                Hi! I'm your Roomify AI Assistant. Planning a trip to India? Let me help you find the perfect luxury stay.
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-blue-600/40 border border-blue-500/30 rounded-2xl rounded-tr-none p-3 text-sm text-white">
                Looking for a beachfront property in Goa under ₹20k/night.
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">👤</div>
            </div>
          </div>
          <button onClick={() => navigate('/planner')} className="w-full btn-outline py-3 rounded-xl border-purple-500/50 text-purple-300 hover:bg-purple-500/10">Start Planning</button>
        </div>

        {/* Roomify Rewards */}
        <div className="glass-panel p-8 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 blur-[50px] rounded-full"></div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Award className="text-yellow-400" /> Roomify Rewards
          </h3>
          <p className="text-gray-400 mb-8">Earn points on every booking and unlock exclusive perks, upgrades, and more.</p>
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-4 bg-gradient-to-r from-orange-600/20 to-transparent p-4 rounded-xl border border-orange-500/20">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/50 text-orange-400 font-bold">B</div>
              <div>
                <h4 className="text-white font-semibold">Bronze Tier</h4>
                <p className="text-xs text-gray-400">Entry level • 5% Discount</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-400/20 to-transparent p-4 rounded-xl border border-gray-400/20">
              <div className="w-10 h-10 rounded-full bg-gray-400/20 flex items-center justify-center border border-gray-400/50 text-gray-300 font-bold">S</div>
              <div>
                <h4 className="text-white font-semibold">Silver Tier</h4>
                <p className="text-xs text-gray-400">5 Bookings • 10% Discount + Breakfast</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-500/20 to-transparent p-4 rounded-xl border border-yellow-500/20">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50 text-yellow-400 font-bold">G</div>
              <div>
                <h4 className="text-white font-semibold">Gold Tier</h4>
                <p className="text-xs text-gray-400">15 Bookings • 20% Discount + Suite Upgrades</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials */}
      <section className="bg-navy/50 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="glass-panel p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-6">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full border-2 border-purple-500/50 object-cover" />
                  <div>
                    <h4 className="text-white font-bold">{test.name}</h4>
                    <p className="text-xs text-gray-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Book seamlessly with the Roomify App</h2>
            <p className="text-gray-300 text-lg mb-8">Get exclusive mobile-only deals, instant notifications, and manage your trips on the go.</p>
            <div className="flex gap-4">
              <button className="bg-white text-navy px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                Download for iOS
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                Download for Android
              </button>
            </div>
          </div>
          
          <div className="relative z-10 hidden md:block w-64">
            
            {/* Floating App Icon */}
            <div className="absolute -left-10 -top-8 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl z-30 animate-bounce" style={{ animationDuration: '4s' }}>
              <img src="/@fs/C:/Users/Santosh Madiwalar/.gemini/antigravity/brain/603257e7-8ccc-4e14-95b5-23939030cf81/app_icon_1778217518515.png" alt="App Icon" className="w-full h-full rounded-2xl object-cover shadow-inner" />
            </div>

            <div className="h-[500px] w-full bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-0 w-full h-6 bg-black z-20 rounded-t-2xl flex justify-center pt-2">
                <div className="w-20 h-4 bg-gray-900 rounded-full"></div>
              </div>
              <img src="/@fs/C:/Users/Santosh Madiwalar/.gemini/antigravity/brain/603257e7-8ccc-4e14-95b5-23939030cf81/mobile_ui_booking_1778217094946.png" alt="App Preview" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
