import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../features/auth/hooks/useAuth';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute — redirects unauthenticated users to /auth/login.
 * Passes `from` in location state so LoginPage can redirect back after login.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  // While auth is being restored (initial refresh), show a loading state
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

  return children;
};

export default ProtectedRoute;
