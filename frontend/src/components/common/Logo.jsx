import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ isDark = false, className = '', showTagline = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group transition-transform ${className}`}>
      {/* Modern Hexagonal Tech Monogram Icon */}
      <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform group-hover:scale-105 duration-300">
          <defs>
            <linearGradient id="logo-g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="logo-g2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#142B4A" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="url(#logo-g2)" />
          <polygon points="50,14 80,31 80,69 50,86 20,69 20,31" fill="#142B4A" />
          <path d="M35 30 L55 30 C64 30 70 35 70 42 C70 47 66 50 60 51 C67 52 71 56 71 63 C71 71 63 76 53 76 L35 76 Z" fill="none" stroke="url(#logo-g1)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M48 40 L50 66 L64 40" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#logo-glow)" />
          <circle cx="50" cy="66" r="3.5" fill="#FFFFFF" />
          <circle cx="35" cy="30" r="3" fill="#38BDF8" />
          <circle cx="64" cy="40" r="3" fill="#38BDF8" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-heading font-extrabold text-xl tracking-wider leading-none ${isDark ? 'text-white' : 'text-primary'}`}>
          BRAND<span className="text-secondary">VERSE</span>
        </span>
        {showTagline ? (
          <span className={`text-[10px] uppercase font-semibold tracking-widest mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Innovating Ideas
          </span>
        ) : (
          <span className="text-[10px] tracking-widest font-semibold uppercase text-accent">
            IT Solutions
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
