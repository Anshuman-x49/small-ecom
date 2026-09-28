import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import useAuth from '../../auth/hooks/useAuth';
import useCart from '../../cart/hooks/useCart';
import ClayButton from '../../../components/ui/ClayButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, getMe } = useAuth();
  const { totalItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && !user) {
      getMe();
    }
  }, [isAuthenticated, user, getMe]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-2.5 font-bold text-lg sm:text-xl text-slate-900 group"
          aria-label="Small Ecom Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-[4px_4px_10px_rgba(37,99,235,0.35),-2px_-2px_8px_rgba(255,255,255,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.6),inset_-1.5px_-1.5px_3px_rgba(30,58,138,0.4)] group-hover:scale-105 active:scale-95 transition-all duration-200">
            <ShoppingBag size={19} />
          </div>
          <span className="tracking-tight">
            Small<span className="text-blue-600">Ecom</span>
          </span>
        </Link>

        {/* Right Navigation Actions */}
        <nav aria-label="User navigation" className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Button with Claymorphic Puffy Surface */}
          <Link
            to="/cart"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#EEF2F6] text-slate-700 hover:text-blue-600 flex items-center justify-center relative shadow-[4px_4px_10px_rgba(166,180,200,0.45),-3px_-3px_8px_rgba(255,255,255,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.8),inset_-1.5px_-1.5px_3px_rgba(166,180,200,0.25)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0.5 active:shadow-[inset_3px_3px_6px_rgba(166,180,200,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] transition-all duration-200"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-[2px_2px_6px_rgba(37,99,235,0.4),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth section */}
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {user.name || user.email}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl p-2 shadow-xl border border-slate-100 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {user.role === 'seller' && (
                    <Link
                      to="/seller/dashboard"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors mb-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard size={14} /> Seller Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ClayButton
              variant="primary"
              size="sm"
              icon={User}
              onClick={() => navigate('/auth/login')}
            >
              Sign In
            </ClayButton>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
