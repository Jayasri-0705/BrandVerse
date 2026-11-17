import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { servicesApi } from '../services/api';
import ServiceCard from '../components/cards/ServiceCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesApi.getServices();
        setServices(res.data || []);
        setFilteredServices(res.data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredServices(services);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredServices(
        services.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.short_description.toLowerCase().includes(q) ||
            s.technologies?.some((t) => t.toLowerCase().includes(q))
        )
      );
    }
  }, [searchQuery, services]);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
              Our Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-primary mb-6">
              Full-Spectrum Software & Cloud Engineering Services
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              From web platforms and AI-powered applications to cloud migration and quality assurance,
              we deliver bespoke solutions designed to scale with your enterprise ambitions.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search services or technologies (e.g. React, AI, Cloud)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading services..." />
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 font-medium text-lg mb-2">No services matched your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-secondary hover:underline text-sm font-semibold"
              >
                Clear search query
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Our Services Stand Out */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold font-heading text-primary mb-4">
              What You Receive with Every BrandVerse Engagement
            </h2>
            <p className="text-slate-600 text-base">
              Every service contract is backed by our strict delivery commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary text-base mb-1">
                  100% IP Ownership
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  You own all source code, design assets, and architectural documents from day one.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary text-base mb-1">
                  Agile Sprint Reports
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Transparent weekly demos, burndown tracking, and direct access to your dev team.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary text-base mb-1">
                  Post-Launch SLA Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Dedicated bug fixing warranty, uptime monitoring, and security patch updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Need a Custom Architecture or Tech Consultation?
          </h2>
          <p className="text-slate-300 text-base mb-8">
            Tell us about your requirements and we will build a custom technical proposal and timeline.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary bg-white hover:bg-slate-100 shadow transition-all"
          >
            <span>Request a Detailed Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
