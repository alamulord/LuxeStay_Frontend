import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function SuperAdminLogin() {
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
      if (user?.role !== 'SUPER_ADMIN') {
        logout();
        setError('Access denied. Super Admin role required.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid super admin credentials.');
    }
  };

  if (isSmallScreen) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white font-body text-left">
        <div className="max-w-md bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold font-headline">Desktop Screen Required</h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              To protect the root administrative access, the Owner Console is restricted to desktop devices with a screen width of <strong>1024px</strong> or wider.
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-plus text-3xl font-bold flex items-center justify-center gap-2 text-white">
            <ShieldAlert className="w-8 h-8 text-rose-500" /> LuxeStay Owner
          </Link>
          <h1 className="text-2xl font-semibold mt-8 text-white">Super Admin Console</h1>
          <p className="text-slate-400">Root authorization required</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 shadow-xl text-white">
          {error && (
            <div className="mb-4 p-3 bg-rose-950/50 text-rose-300 rounded border border-rose-900 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Root Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="superadmin@luxestay.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-rose-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 focus:outline-none transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Decrypting credentials...' : 'Unlock Root Console'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
