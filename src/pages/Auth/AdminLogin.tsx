import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AdminLogin() {
  const navigate = useNavigate();
  const { login, logout, isLoading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      await login(data.email, data.password);
      const user = useAuthStore.getState().user;
      if (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
        logout();
        setError('Access denied. Authorized Admin credentials required.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid admin credentials.');
    }
  };

  if (isSmallScreen) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white font-body text-left">
        <div className="max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-2xl flex items-center justify-center animate-pulse">
            <Shield className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold font-headline">Desktop Screen Required</h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              To protect administrative operations and maintain layout integrity, the Staff Portal is restricted to desktop devices with a screen width of <strong>1024px</strong> or wider.
            </p>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Please log in from a desktop browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-plus text-3xl font-bold flex items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-primary" /> LuxeStay Admin
          </Link>
          <h1 className="text-2xl font-semibold mt-8">Staff Portal</h1>
          <p className="text-on_surface_variant">Log in with your administrator account</p>
        </div>

        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded border border-red-200 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on_surface_variant" />
                <input
                  type="email"
                  placeholder="admin@luxestay.com"
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
                  placeholder="••••••••"
                  className="input-field pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800"
            >
              {isLoading ? 'Verifying...' : 'Staff Login'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
