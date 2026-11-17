import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/forms/ContactForm';
import { useCompany } from '../context/CompanyContext';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || 'General Inquiry';
  const { companyInfo, siteSettings } = useCompany();

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-primary mb-6">
              Let's Engineer Your Digital Vision.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Have an upcoming product, require senior software engineering, or need architecture consulting?
              Reach out and our principal technical architects will respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Contact Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="text-xl font-bold font-heading text-primary">Direct Contact</h3>

                <ul className="space-y-6 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${companyInfo?.email || 'contact@brandverse.tech'}`}
                        className="text-primary font-semibold text-base hover:text-secondary transition-colors"
                      >
                        {companyInfo?.email || 'contact@brandverse.tech'}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                        Call Us
                      </p>
                      <a
                        href={`tel:${companyInfo?.phone || '+15553492810'}`}
                        className="text-primary font-semibold text-base hover:text-secondary transition-colors"
                      >
                        {companyInfo?.phone || '+1 (555) 349-2810'}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                        Global Headquarters
                      </p>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {companyInfo?.address || '742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                        Working Hours
                      </p>
                      <p className="text-slate-700 font-medium">
                        {companyInfo?.working_hours || 'Mon - Fri: 9:00 AM - 6:00 PM PST'}
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Social Links */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Connect on Social Media
                  </p>
                  <div className="flex items-center space-x-3">
                    <a
                      href={siteSettings?.linkedin_url || 'https://linkedin.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-secondary text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={siteSettings?.twitter_url || 'https://twitter.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-secondary text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={siteSettings?.github_url || 'https://github.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-secondary text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={siteSettings?.facebook_url || 'https://facebook.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-secondary text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed / Card */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm aspect-[16/10]">
                <iframe
                  title="BrandVerse Headquarters Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.5076402!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Enquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm defaultService={defaultService} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
