import React, { useState, useContext } from 'react';
import { LayoutDashboard, Building2, Users, Receipt, Plus } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';
import { allHotels } from '../utils/dummyData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { bookings } = useContext(BookingContext);

  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.price, 0);
  const totalBookings = bookings.length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 mt-16 page-transition bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Console</h2>
            <p className="text-slate-500 text-sm mt-1">Manage Roomify Platform</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'overview' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('overview')}>
              <LayoutDashboard size={18} /> Overview
            </button>
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'hotels' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('hotels')}>
              <Building2 size={18} /> Properties
            </button>
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'bookings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('bookings')}>
              <Receipt size={18} /> Reservations
            </button>
            <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-semibold text-sm ${activeTab === 'users' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('users')}>
              <Users size={18} /> Users
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">Performance metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-1">₹{totalRevenue.toLocaleString()}</p>
                  <span className="text-emerald-600 text-sm font-semibold">+12% this month</span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Reservations</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{totalBookings}</p>
                  <span className="text-emerald-600 text-sm font-semibold">+5% this month</span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Active Listings</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{allHotels.length}</p>
                  <span className="text-slate-500 text-sm font-semibold">0 pending approval</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Recent reservations</h3>
                  <button className="text-slate-900 font-semibold underline text-sm hover:text-slate-700">View all</button>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr className="text-slate-500 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Booking ID</th>
                        <th className="py-4 px-6 font-semibold">Property</th>
                        <th className="py-4 px-6 font-semibold">Dates</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {bookings.slice(0, 5).map(booking => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-900">{booking.id}</td>
                          <td className="py-4 px-6 font-medium text-slate-900">{booking.hotel?.name}</td>
                          <td className="py-4 px-6 text-slate-500">{booking.checkIn}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                              booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              booking.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-slate-900">₹{booking.price.toLocaleString()}</td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr><td colSpan="5" className="py-8 text-center text-slate-500 font-medium">No recent reservations</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Properties</h2>
                <button className="bg-slate-900 text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <Plus size={18} /> Add Property
                </button>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Location</th>
                      <th className="py-4 px-6 font-semibold">Price/Night</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {allHotels.map(hotel => (
                      <tr key={hotel.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-900">{hotel.name}</td>
                        <td className="py-4 px-6 text-slate-500">{hotel.location}</td>
                        <td className="py-4 px-6 font-bold text-slate-900">₹{hotel.price.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-slate-900 font-semibold underline text-sm mr-4 hover:text-slate-700">Edit</button>
                          <button className="text-rose-600 font-semibold underline text-sm hover:text-rose-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional admin tabs for brevity are stripped and assumed implemented similar to overview */}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">All Reservations</h2>
              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Booking ID</th>
                      <th className="py-4 px-6 font-semibold">Property</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-900">{booking.id}</td>
                        <td className="py-4 px-6 font-medium text-slate-900">{booking.hotel?.name}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                            booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            booking.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">₹{booking.price.toLocaleString()}</td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr><td colSpan="4" className="py-8 text-center text-slate-500 font-medium">No reservations available</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">Manage Users</h2>
              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Email</th>
                      <th className="py-4 px-6 font-semibold">Role</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">JD</div>
                        John Doe
                      </td>
                      <td className="py-4 px-6 text-slate-500">john.doe@example.com</td>
                      <td className="py-4 px-6"><span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Guest</span></td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-rose-600 font-semibold underline text-sm hover:text-rose-800">Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
