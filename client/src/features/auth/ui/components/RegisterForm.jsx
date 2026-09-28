import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { User, Mail, Lock, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import ClayInput from '../../../../components/ui/ClayInput';
import ClayButton from '../../../../components/ui/ClayButton';
import useAuth from '../../hooks/useAuth';

const RegisterForm = ({ onSubmitSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const { register: registerUser, registerStatus } = useAuth();

  const isSubmitting = registerStatus === 'loading';

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      // Map fullName to name for the backend payload
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const result = await registerUser(payload).unwrap();

      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      } else {
        navigate('/auth/login', {
          state: { message: 'Account created successfully! Please sign in.' },
        });
      }
    } catch (err) {
      if (err?.errors && Array.isArray(err.errors)) {
        err.errors.forEach((e) => {
          const field = e.path === 'name' ? 'fullName' : e.path;
          if (field) {
            setError(field, { type: 'server', message: e.msg || e.message });
          }
        });
      }
      setFormError(err?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      {formError && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <AlertCircle size={18} className="shrink-0 text-red-500" />
          <span>{formError}</span>
        </div>
      )}

      {/* Full Name Field */}
      <ClayInput
        id="fullName"
        label="Full Name"
        type="text"
        placeholder="Jane Doe"
        icon={User}
        error={errors.fullName}
        {...register('fullName', {
          required: 'Full name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
      />

      {/* Email Field */}
      <ClayInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
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
      <ClayInput
        id="password"
        label="Password"
        isPassword
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        placeholder="Create strong password"
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

      {/* Confirm Password Field */}
      <ClayInput
        id="confirmPassword"
        label="Confirm Password"
        isPassword
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        placeholder="Repeat password"
        icon={Lock}
        error={errors.confirmPassword}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (val) => {
            if (watch('password') !== val) {
              return 'Your passwords do not match';
            }
          },
        })}
      />

      {/* Submit Button */}
      <ClayButton
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full mt-2"
        icon={UserPlus}
      >
        Create Account
      </ClayButton>

      {/* Switch to Login */}
      <div className="text-center pt-2">
        <p className="text-sm text-[#64748B] font-medium">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-blue-600 font-bold hover:text-blue-700 hover:underline inline-flex items-center gap-1 ml-1"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
