import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-react';
import ClayInput from '../../../../components/ui/ClayInput';
import ClayButton from '../../../../components/ui/ClayButton';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onSubmitSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, status } = useAuth();

  const isSubmitting = status === 'loading';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      const result = await login(data).unwrap();

      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      } else {
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err?.errors && Array.isArray(err.errors)) {
        err.errors.forEach((e) => {
          if (e.path) {
            setError(e.path, { type: 'server', message: e.msg || e.message });
          }
        });
      }
      setFormError(err?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {formError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <AlertCircle size={18} className="shrink-0 text-red-500" />
          <span>{formError}</span>
        </div>
      )}

      {/* Email Field */}
      <ClayInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        error={errors.email}
        {...register('email', {
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
          },
        })}
      />

      {/* Password Field */}
      <div className="space-y-1">
        <ClayInput
          id="password"
          label="Password"
          isPassword
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          placeholder="••••••••"
          icon={Lock}
          error={errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors mt-1"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <ClayButton
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full mt-2"
        icon={LogIn}
      >
        Sign In
      </ClayButton>

      {/* Switch to Register */}
      <div className="text-center pt-2">
        <p className="text-sm text-[#64748B] font-medium">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-blue-600 font-bold hover:text-blue-700 hover:underline inline-flex items-center gap-1 ml-1"
          >
            Create account <ArrowRight size={14} />
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
