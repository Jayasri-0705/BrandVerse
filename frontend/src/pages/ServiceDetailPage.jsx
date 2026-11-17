import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { servicesApi } from '../services/api';
import Breadcrumbs from '../components/common/Breadcrumbs';
import DynamicIcon from '../components/common/DynamicIcon';
import ContactForm from '../components/forms/ContactForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await servicesApi.getServiceBySlug(slug);
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Service not found or an error occurred while loading details.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center">
        <LoadingSpinner text="Loading service details..." />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-primary mb-4">Service Not Found</h2>
        <p className="text-slate-600 mb-8">{error || 'The requested service could not be located.'}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Services', path: '/services' },
              { label: service.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 shadow-sm">
                <DynamicIcon name={service.icon} className="w-8 h-8" defaultIcon="Code" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-primary mb-5 leading-tight">
                {service.title}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                {service.short_description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#quote-form"
                  className="px-7 py-3.5 rounded-xl font-heading font-semibold text-white bg-secondary hover:bg-secondary-700 shadow transition-all flex items-center gap-2"
                >
                  <span>Get a Quote for this Service</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/portfolio"
                  className="px-7 py-3.5 rounded-xl font-heading font-semibold text-primary bg-white border border-slate-300 hover:bg-slate-50 shadow-sm transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-brand-lg border border-slate-200 bg-slate-100 aspect-[4/3]">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-14">
              {/* Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary mb-4">
                  Overview & Engineering Approach
                </h2>
                <div className="prose max-w-none text-slate-600 text-base leading-relaxed space-y-4">
                  <p>{service.full_description}</p>
                </div>
              </div>

              {/* Key Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary mb-6">
                    Key Advantages & Business Benefits
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3.5"
                      >
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 font-medium leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Development Process Steps */}
              {service.process_steps && service.process_steps.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary mb-6">
                    Our Delivery & Implementation Workflow
                  </h2>
                  <div className="space-y-4">
                    {service.process_steps.map((proc, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm flex items-start gap-5 hover:border-secondary/40 transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {proc.step || i + 1}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-primary text-base mb-1">
                            {proc.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {proc.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Used */}
              {service.technologies && service.technologies.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary mb-6">
                    Technologies & Frameworks
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-sm font-semibold hover:border-secondary hover:bg-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Summary Card */}
              <div className="p-6 rounded-2xl bg-brandBg border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-primary text-lg">Engagement Highlights</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Principal Architect</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bi-Weekly Sprint Releases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% IP & Source Code Transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>SLA-Backed Warranty Included</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Quote Form */}
              <div id="quote-form">
                <ContactForm defaultService={service.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
