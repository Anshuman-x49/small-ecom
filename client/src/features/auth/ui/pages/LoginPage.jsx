import React from 'react';
import { useLocation } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import ClayCard from '../../../../components/ui/ClayCard';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const location = useLocation();
  const successMessage = location.state?.message;

  return (
    <ClayCard className="w-full max-w-md mx-auto relative overflow-hidden backdrop-blur-md p-5 sm:p-6">
      {/* Decorative soft clay glow top edge */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-500 rounded-t-3xl" />

      <AuthHeader
        title="Welcome back!"
        subtitle="Sign in to your account to continue shopping with delightful deals."
      />

      {successMessage && (
        <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
          <span>{successMessage}</span>
        </div>
      )}

      <LoginForm />
    </ClayCard>
  );
};

export default LoginPage;
