import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Hotel } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen flex bg-navy -mt-20 overflow-hidden">
      
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 relative order-2">
        <img 
          src="https://images.unsplash.com/photo-1542314831-c6a4d14d8379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
          alt="Luxury Resort" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/90 via-navy/50 to-transparent"></div>
        <div className="absolute bottom-20 right-16 max-w-md text-right">
          <h2 className="text-4xl font-bold text-white mb-4">Join the Elite</h2>
          <p className="text-gray-300">Create an account to discover premium properties, earn loyalty points, and book your perfect stay.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative order-1">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full"></div>
        
        <div className="w-full max-w-md glass-panel p-10 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight mb-6">
              <Hotel className="w-8 h-8 text-purple-500" />
              <span>Roomify<span className="text-purple-500">.</span></span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">Create an Account</h2>
            <p className="text-gray-400">Join Roomify to unlock premium features.</p>
          </div>
          
          <button className="w-full btn-outline flex items-center justify-center gap-3 py-3 mb-6 rounded-xl border-white/20 hover:bg-white/5 transition-colors text-white font-medium">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Or register with email</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input type="text" placeholder="Full Name" className="input-field pl-12 bg-black/40 border-white/10" required />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input type="email" placeholder="Email Address" className="input-field pl-12 bg-black/40 border-white/10" required />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input type="password" placeholder="Password" className="input-field pl-12 bg-black/40 border-white/10" required />
            </div>

            <p className="text-xs text-gray-500 mt-2 mb-4">By creating an account, you agree to Roomify's Terms of Service and Privacy Policy.</p>

            <button type="submit" className="btn-primary w-full py-4 text-lg rounded-xl">Create Account</button>
          </form>
          
          <div className="mt-8 text-center">
            <span className="text-gray-500 text-sm">Already have an account? </span>
            <Link to="/login" className="text-purple-400 font-bold text-sm hover:text-purple-300 transition-colors">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
