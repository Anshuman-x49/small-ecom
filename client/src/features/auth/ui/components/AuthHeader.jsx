import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

const AuthHeader = ({ title, subtitle, badgeText = 'Small Ecom' }) => {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      {/* 3D Clay Icon Container */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-2 shadow-[6px_6px_14px_rgba(59,130,246,0.35),-4px_-4px_10px_rgba(255,255,255,0.8),inset_1.5px_1.5px_3px_rgba(255,255,255,0.5),inset_-1.5px_-1.5px_3px_rgba(30,58,138,0.4)] transform hover:scale-105 transition-transform duration-300">
        <ShoppingBag size={22} className="stroke-[2.2]" />
      </div>

      {badgeText && (
        <div className="flex items-center gap-2 mb-1">
          <span className="clay-badge clay-badge-primary text-[11px] py-0.5 px-2.5">
            <Sparkles size={11} className="text-blue-600" />
            {badgeText}
          </span>
        </div>
      )}

      <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-1">
        {title}
      </h1>
      <p className="text-xs text-[#64748B] max-w-sm">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;
