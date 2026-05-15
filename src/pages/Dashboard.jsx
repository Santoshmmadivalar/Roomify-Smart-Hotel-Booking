import React, { useState, useContext } from 'react';
import { User, Settings, Calendar, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { bookings, cancelBooking } = useContext(BookingContext);

  const handleCancel = (id) => {
    cancelBooking(id);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 mt-16 page-transition bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-700">
              JD
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">John Doe</h3>
              <p className="text-slate-500 text-sm">Guest</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'profile' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('profile')}>
              <User size={18} /> Personal info
            </button>
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'bookings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('bookings')}>
              <Calendar size={18} /> Trips
            </button>
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('settings')}>
              <Settings size={18} /> Settings
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-600 hover:bg-slate-50 transition-colors mt-4 font-semibold text-sm">
              <LogOut size={18} /> Log out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">Your trips</h2>
              
              <div className="flex flex-col gap-6">
                {bookings.length === 0 ? (
                  <div className="border border-slate-200 rounded-2xl p-12 flex flex-col items-start">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar size={24} className="text-slate-900" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No trips booked... yet!</h3>
                    <p className="text-slate-500 mb-6 text-base">Time to dust off your bags and start planning your next adventure.</p>
                    <button className="btn btn-outline border-slate-900 font-semibold rounded-xl" onClick={() => window.location.href='/search'}>Start searching</button>
                  </div>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row h-auto shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full sm:w-72 h-48 sm:h-full shrink-0">
                        <img src={booking.hotel?.image} alt={booking.hotel?.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">{booking.hotel?.location}</p>
                            <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{booking.hotel?.name}</h3>
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            booking.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-200">
                          <div className="flex flex-col">
                            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Dates</span>
                            <p className="font-medium text-slate-900">{booking.checkIn} — {booking.checkOut}</p>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Price</span>
                            <p className="font-bold text-slate-900">₹{booking.price.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {booking.status !== 'cancelled' && (
                          <div className="mt-auto flex justify-end">
                            <button 
                              className="text-slate-900 underline font-semibold text-sm hover:text-rose-600 transition-colors"
                              onClick={() => handleCancel(booking.id)}
                            >
                              Cancel reservation
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">Personal info</h2>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center py-5 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Legal name</h4>
                    <p className="text-slate-500">John Doe</p>
                  </div>
                  <button className="text-slate-900 font-semibold underline text-sm">Edit</button>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Email address</h4>
                    <p className="text-slate-500">john.doe@example.com</p>
                  </div>
                  <button className="text-slate-900 font-semibold underline text-sm">Edit</button>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Phone number</h4>
                    <p className="text-slate-500">+1 (555) 000-0000</p>
                  </div>
                  <button className="text-slate-900 font-semibold underline text-sm">Edit</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">Global preferences</h2>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center py-5 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Preferred language</h4>
                    <p className="text-slate-500">English</p>
                  </div>
                  <button className="text-slate-900 font-semibold underline text-sm">Edit</button>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Preferred currency</h4>
                    <p className="text-slate-500">INR (₹)</p>
                  </div>
                  <button className="text-slate-900 font-semibold underline text-sm">Edit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
