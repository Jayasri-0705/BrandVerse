import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { careersApi } from '../services/api';
import Breadcrumbs from '../components/common/Breadcrumbs';
import JobApplicationForm from '../components/forms/JobApplicationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const JobDetailPage = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await careersApi.getJobBySlug(slug);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Position not found or has been closed.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center">
        <LoadingSpinner text="Loading role details..." />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-primary mb-4">Position Not Found</h2>
        <p className="text-slate-600 mb-8">{error || 'This job opening is no longer active.'}</p>
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Careers', path: '/careers' },
              { label: job.title },
            ]}
          />

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-primary mb-6 leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{job.location}</span>
              </div>
              {job.salary_range && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-secondary" />
                  <span>{job.salary_range}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Job Description, Requirements, Responsibilities */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-2xl font-extrabold font-heading text-primary mb-4">
                  About the Role
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary mb-4">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary mb-4">
                    Qualifications & Requirements
                  </h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary mb-4">
                    Benefits & Perks
                  </h3>
                  <ul className="space-y-3">
                    {job.benefits.map((ben, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Embedded Job Application Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <JobApplicationForm job={job} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage;
