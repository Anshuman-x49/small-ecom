import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../features/auth/hooks/useAuth';
import { Loader2 } from 'lucide-react';

/**
 * SellerRoute — redirects unauthenticated users to /auth/login.
 * Redirects authenticated users without the 'seller' role to the home page.
 */
const SellerRoute = ({ children }) => {
  const { isAuthenticated, status, user } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (user?.role !== 'seller') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerRoute;
