import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, PhoneCall } from 'lucide-react';
import Logo from '../components/common/Logo';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-brandBg flex flex-col justify-center items-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <div className="text-8xl sm:text-9xl font-extrabold font-heading text-primary/10 tracking-widest">
          404
        </div>

        <h1 className="text-3xl font-extrabold font-heading text-primary -mt-6">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed">
          The page or digital resource you are attempting to access doesn't exist or has been relocated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary-700 shadow transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
