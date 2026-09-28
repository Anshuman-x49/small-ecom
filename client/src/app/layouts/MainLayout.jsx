import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../features/home/components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Modern Clean Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              SE
            </div>
            <span className="font-bold text-slate-800">Small Ecom</span>
            <span className="text-slate-300">•</span>
            <span>Refined Modern E-Commerce</span>
          </div>
          <p>© {new Date().getFullYear()} Small Ecom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
