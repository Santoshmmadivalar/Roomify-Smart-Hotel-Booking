import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy/80 backdrop-blur-xl py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              <Hotel className="w-8 h-8 text-purple-500" />
              <span>Roomify<span className="text-purple-500">.</span></span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mt-2">
              The premier AI-powered hotel booking platform for the modern Indian traveler. Experience luxury like never before.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Platform</h4>
            <Link to="/search" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Explore Destinations</Link>
            <Link to="/planner" className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">AI Trip Planner</Link>
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">My Bookings</Link>
            <Link to="/rewards" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Roomify Rewards</Link>
            <Link to="/admin" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Admin Console</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Company</h4>
            <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">About Us</Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Careers</Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</Link>
          </div>

        </div>
        <div className="pt-8 border-t border-white/10 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Roomify Platform. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
