import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, User, ArrowRight, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoginError('');

    try {
      const user = await login(data.username, data.password);
      if (user.is_staff || user.is_superuser) {
        navigate(from, { replace: true });
      } else {
        setLoginError('Access denied: You must have staff permissions to access this dashboard.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          'Invalid username or password. Please verify and retry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDemoCredentials = () => {
    setValue('username', 'admin');
    setValue('password', 'AdminPassword123!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-900 to-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-xl">
            <Logo isDark={true} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Admin Control Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Authorized Personnel & Management Login
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-slate-100">
          {loginError && (
            <div className="p-4 rounded-xl mb-6 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="admin"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.username
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
                  }`}
                  {...register('username', { required: 'Username is required' })}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-rose-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-heading font-semibold text-white bg-primary hover:bg-primary-800 transition-all duration-200 shadow hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={setDemoCredentials}
              className="text-xs text-secondary hover:text-secondary-800 font-semibold inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Autofill Default Admin Credentials (admin)</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} BRANDVERSE Technologies. Security Protocol Enforced.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
