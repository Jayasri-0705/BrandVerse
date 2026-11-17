import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Award,
  Globe2,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { companyApi } from '../services/api';
import TeamCard from '../components/cards/TeamCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DynamicIcon from '../components/common/DynamicIcon';
import { useCompany } from '../context/CompanyContext';

const AboutPage = () => {
  const { companyInfo } = useCompany();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await companyApi.getTeamMembers();
        setTeam(res.data || []);
      } catch (err) {
        console.error('Failed to load team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const coreValues = companyInfo?.core_values || [
    {
      title: 'Innovation-Driven',
      description: 'We explore beyond conventional boundaries to craft forward-thinking digital architectures.',
      icon: 'Zap',
    },
    {
      title: 'Engineering Excellence',
      description: 'We enforce uncompromising standards of code quality, security, and performance.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Client Partnership',
      description: 'We operate as an extension of our clients core teams, committed directly to their growth metrics.',
      icon: 'Users',
    },
    {
      title: 'Agile Delivery',
      description: 'Transparent milestones, iterative sprints, and rapid delivery cycles tailored to market demands.',
      icon: 'Repeat',
    },
  ];

  const journey = companyInfo?.journey || [
    { year: '2018', title: 'Foundation', description: 'Founded with a vision to build modern cloud-native web architectures.' },
    { year: '2020', title: 'Global Expansion', description: 'Expanded client footprint across North America and Europe, delivering 50+ enterprise apps.' },
    { year: '2022', title: 'AI & Cloud Practice', description: 'Inaugurated dedicated AI/ML engineering lab and premier AWS/GCP cloud consulting practice.' },
    { year: '2024', title: 'Enterprise Tier', description: 'Recognized as a leading digital transformation partner with 250+ enterprise rollouts completed.' },
    { year: '2026', title: 'BrandVerse 2.0', description: 'Scaling next-generation intelligent platforms, autonomous agent systems, and microservices.' },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
              About BRANDVERSE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-primary mb-6">
              Engineering Future-Ready Software for Global Leaders.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              We are a dedicated collective of software architects, full-stack engineers, AI specialists,
              and product designers committed to engineering transformative digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Mission/Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-primary mb-6">
                Our Purpose & Mission
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {companyInfo?.description ||
                  'BrandVerse is a technology-driven software development company focused on creating innovative digital solutions for businesses, startups, and enterprises. We specialize in web development, mobile application development, AI and machine learning, UI/UX design, cloud solutions, and custom software development.'}
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-heading font-bold text-primary text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Mission Statement
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {companyInfo?.mission ||
                      'Our mission is to transform business ideas into powerful digital products through creativity, innovation, and state-of-the-art engineering.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-heading font-bold text-primary text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Vision Statement
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {companyInfo?.vision ||
                      'To be a premier global technology partner recognized for building revolutionary, scalable, and human-centric digital experiences.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="BrandVerse Office Culture"
                className="rounded-2xl shadow-brand-lg border border-slate-200 object-cover w-full h-[450px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-brand-lg max-w-xs hidden sm:block">
                <p className="text-3xl font-extrabold font-heading text-accent mb-1">98%</p>
                <p className="text-xs text-slate-300">
                  Client Retention Rate across ongoing enterprise product retainers.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="pt-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-extrabold font-heading text-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-slate-600 text-sm">
                The principles that guide our architecture choices, client interactions, and company culture every single day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-brand transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                      <DynamicIcon name={val.icon} className="w-6 h-6" defaultIcon="Zap" />
                    </div>
                    <h3 className="font-heading font-bold text-primary text-lg mb-2">{val.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Evolution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Our Journey
            </h2>
            <p className="text-slate-600 text-base">
              From our first web architecture to building enterprise AI and cloud-native solutions worldwide.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-300 ml-4 md:ml-32 space-y-10">
            {journey.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                {/* Node indicator */}
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-secondary group-hover:scale-125 transition-transform"></div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-brand transition-all max-w-2xl">
                  <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Meet the Team
            </h2>
            <p className="text-slate-600 text-base">
              The technologists and architects driving innovation and delivery across all client partnerships.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Partner with BrandVerse Today
          </h2>
          <p className="text-slate-300 text-base mb-8">
            Whether building an MVP, migrating legacy workloads, or designing custom AI pipelines, we are ready.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary bg-white hover:bg-slate-100 shadow transition-all"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
