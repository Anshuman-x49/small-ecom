import React from 'react';
import { Outlet, Link } from 'react-router';
import { ShoppingBag } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="h-screen bg-[#EEF2F6] flex flex-col justify-between items-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Clay Floating Orbs in Background */}
      <div className="absolute top-[-40px] left-[-40px] w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/60 to-blue-300/30 blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full bg-gradient-to-tl from-pink-200/50 to-purple-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-blue-100/60 blur-xl pointer-events-none" />

      {/* Top Simple Brand Nav */}
      <header className="w-full max-w-5xl flex items-center justify-between py-1.5 z-10 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-base text-[#0F172A] hover:opacity-90 group transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-[4px_4px_10px_rgba(37,99,235,0.35),-2px_-2px_8px_rgba(255,255,255,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.6),inset_-1.5px_-1.5px_3px_rgba(30,58,138,0.4)] group-hover:scale-105 active:scale-95 transition-all duration-200">
            <ShoppingBag size={16} />
          </div>
          <span>Small<span className="text-blue-600">Ecom</span></span>
        </Link>
      </header>

      {/* Main Form Content Container */}
      <main className="w-full max-w-md my-auto py-1 z-10 animate-fadeIn">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-2 text-[11px] text-[#64748B] font-medium z-10 shrink-0">
        © {new Date().getFullYear()} Small Ecom. Designed with Claymorphism aesthetic.
      </footer>
    </div>
  );
};

export default AuthLayout;
