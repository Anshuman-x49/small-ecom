import React from 'react';
import ClayCard from '../../../../components/ui/ClayCard';
import AuthHeader from '../components/AuthHeader';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <ClayCard className="w-full max-w-md mx-auto relative overflow-hidden backdrop-blur-md p-5 sm:p-6">
      {/* Decorative soft clay glow top edge */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-t-3xl" />

      <AuthHeader
        title="Create your account"
        subtitle="Join Small Ecom for exclusive deals and instant checkout."
        badgeText="Join Us"
      />

      <RegisterForm />
    </ClayCard>
  );
};

export default RegisterPage;
