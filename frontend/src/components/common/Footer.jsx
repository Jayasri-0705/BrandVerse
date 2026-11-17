import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
  Shield,
} from 'lucide-react';
import Logo from './Logo';
import { useCompany } from '../../context/CompanyContext';

const Footer = () => {
  const { companyInfo, siteSettings } = useCompany();

  const services = [
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'Mobile App Development', path: '/services/mobile-app-development' },
    { name: 'AI & Machine Learning', path: '/services/ai-machine-learning-solutions' },
    { name: 'UI/UX Design', path: '/services/ui-ux-design' },
    { name: 'Cloud Solutions', path: '/services/cloud-computing-solutions' },
    { name: 'Custom Software', path: '/services/custom-software-development' },
    { name: 'E-commerce Solutions', path: '/services/ecommerce-development' },
    { name: 'Testing & QA', path: '/services/software-testing-and-qa' },
  ];

  const quickLinks = [
    { name: 'About BrandVerse', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Project Portfolio', path: '/portfolio' },
    { name: 'Careers & Culture', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isDark={true} showTagline={true} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {companyInfo?.description ||
                'BrandVerse is an enterprise technology and software development company delivering modern digital experiences, scalable cloud systems, and AI-driven platforms.'}
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteSettings?.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-secondary text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteSettings?.twitter_url || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-secondary text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteSettings?.github_url || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-secondary text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteSettings?.facebook_url || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-secondary text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-slate-400 hover:text-accent text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading">
              Company
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-heading">
              Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{companyInfo?.address || '742 Evergreen Innovation Pkwy, CA'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${companyInfo?.email || 'contact@brandverse.tech'}`}
                  className="hover:text-white transition-colors"
                >
                  {companyInfo?.email || 'contact@brandverse.tech'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href={`tel:${companyInfo?.phone || '+15553492810'}`}
                  className="hover:text-white transition-colors"
                >
                  {companyInfo?.phone || '+1 (555) 349-2810'}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{companyInfo?.working_hours || 'Mon - Fri: 9:00 AM - 6:00 PM PST'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BRANDVERSE Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
