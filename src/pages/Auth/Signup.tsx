import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupForm = z.infer<typeof signupSchema>;

export function Signup() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setError(null);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-plus text-3xl font-bold">LuxeStay</Link>
          <h1 className="text-2xl font-semibold mt-8">Create an account</h1>
          <p className="text-on_surface_variant">Join LuxeStay and start exploring</p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded border border-red-200 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on_surface_variant" />
                  <input
                    type="text"
                    placeholder="First name"
                    className="input-field pl-10"
                    {...register('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="input-field"
                    {...register('lastName')}
                  />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on_surface_variant" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field pl-10"
                    {...register('email')}
                  />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on_surface_variant" />
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="input-field pl-10"
                    {...register('password')}
                  />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input-field"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-on_surface_variant text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}