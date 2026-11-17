import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Laptop,
  GraduationCap,
  Sparkles,
  DollarSign,
  Coffee,
} from 'lucide-react';
import { careersApi } from '../services/api';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CULTURE_PERKS = [
  {
    icon: Laptop,
    title: 'Remote-First Flexibility',
    description: 'Work from where you are most productive. We offer generous home office setups and flexible hours.',
  },
  {
    icon: GraduationCap,
    title: '$2,500 Learning Stipend',
    description: 'Annual budget for courses, conferences, certifications, and technical books to keep your skills sharp.',
  },
  {
    icon: Heart,
    title: 'Comprehensive Healthcare',
    description: 'Top-tier medical, dental, and vision insurance coverage for you and your dependents.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    description: 'Top-of-market salaries, performance bonuses, and meaningful long-term incentives.',
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'Generous paid time off, paid parental leave, and company-wide recharge recharge days.',
  },
  {
    icon: Sparkles,
    title: 'Modern Tech Stack',
    description: 'Build with React, Django, PostgreSQL, Python, PyTorch, and cloud-native Kubernetes tooling.',
  },
];

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await careersApi.getJobs();
        setJobs(res.data || []);
        setFilteredJobs(res.data || []);
      } catch (err) {
        console.error('Error fetching job openings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = ['All', ...new Set(jobs.map((j) => j.department))];

  useEffect(() => {
    if (selectedDept === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((j) => j.department === selectedDept));
    }
  }, [selectedDept, jobs]);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Careers' }]} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
              Careers at BrandVerse
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-primary mb-6">
              Build the Digital Future with Us.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Join a team of driven software engineers, designers, and AI architects who care deeply
              about software craftsmanship, collaboration, and high-impact digital products.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold text-white bg-secondary hover:bg-secondary-700 shadow transition-all"
            >
              <span>View Open Positions ({jobs.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Us / Culture Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold font-heading text-primary mb-4">
              Why Join BrandVerse?
            </h2>
            <p className="text-slate-600 text-base">
              We empower our people with autonomy, modern tools, and an environment that celebrates technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CULTURE_PERKS.map((perk, i) => {
              const IconComp = perk.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-secondary/30 shadow-sm hover:shadow-brand transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-primary text-xl mb-2">{perk.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="open-positions" className="py-20 bg-brandBg scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
                We Are Hiring
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary">
                Current Openings
              </h2>
            </div>

            {/* Department Filter */}
            {departments.length > 2 && (
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedDept === dept
                        ? 'bg-primary text-white shadow'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <LoadingSpinner text="Loading current job openings..." />
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-brand transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {job.job_type}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                        {job.experience_level}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary">
                      <Link to={`/careers/${job.slug}`} className="hover:text-secondary transition-colors">
                        {job.title}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </span>
                      {job.salary_range && (
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          {job.salary_range}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/careers/${job.slug}`}
                      className="px-6 py-3 rounded-xl font-heading font-semibold text-white bg-primary hover:bg-primary-800 shadow transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
                    >
                      <span>View Role & Apply</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 font-medium text-lg mb-2">No active openings in this department.</p>
              <button
                onClick={() => setSelectedDept('All')}
                className="text-secondary hover:underline text-sm font-semibold"
              >
                View all openings
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
