import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-20 ${isScrolled ? 'bg-navy/80 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight" onClick={closeMenu}>
          <Hotel className="w-8 h-8 text-purple-500" />
          <span className="hidden sm:block tracking-wide">Roomify<span className="text-purple-500">.</span></span>
        </Link>

        {/* Desktop Nav - Search Pill style */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-sm hover:bg-white/10 transition-all py-2 px-4 cursor-pointer divide-x divide-white/10" onClick={() => window.location.href='/search'}>
            <span className="px-4 text-sm font-medium text-gray-200 hover:text-white transition-colors">Anywhere</span>
            <span className="px-4 text-sm font-medium text-gray-200 hover:text-white transition-colors">Any week</span>
            <span className="px-4 text-sm text-gray-400 flex items-center gap-3 hover:text-gray-200 transition-colors">
              Add guests
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                <Search size={14} />
              </div>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/search" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Explore</Link>
          <Link to="/planner" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            AI Planner
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Bookings</Link>
          <Link to="/admin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Admin</Link>
          
          <div className="flex items-center gap-2 border border-white/20 rounded-full p-2 hover:bg-white/5 transition-all cursor-pointer ml-2 backdrop-blur-md">
            <Menu size={18} className="text-gray-300 ml-1" />
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs shadow-inner">
              <User size={16} />
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div className={`
          absolute top-20 left-0 w-full bg-navy/95 backdrop-blur-xl border-b border-white/10 shadow-2xl
          flex flex-col gap-4 p-6 transition-all duration-300 md:hidden
          ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}>
          <Link to="/" className="text-lg font-medium text-white hover:text-purple-400 transition-colors" onClick={closeMenu}>Home</Link>
          <Link to="/search" className="text-lg font-medium text-white hover:text-purple-400 transition-colors" onClick={closeMenu}>Explore</Link>
          <Link to="/planner" className="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors" onClick={closeMenu}>AI Trip Planner</Link>
          <Link to="/dashboard" className="text-lg font-medium text-white hover:text-purple-400 transition-colors" onClick={closeMenu}>Bookings</Link>
          <Link to="/admin" className="text-lg font-medium text-white hover:text-purple-400 transition-colors" onClick={closeMenu}>Admin Console</Link>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
            <Link to="/login" className="btn btn-outline w-full justify-center" onClick={closeMenu}>Log in</Link>
            <Link to="/register" className="btn btn-primary w-full justify-center" onClick={closeMenu}>Sign up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
