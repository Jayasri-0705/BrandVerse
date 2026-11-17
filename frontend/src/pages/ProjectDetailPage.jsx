import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  Github,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Tag,
} from 'lucide-react';
import { projectsApi } from '../services/api';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await projectsApi.getProjectBySlug(slug);
        setProject(res.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Case study not found or an error occurred while loading.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center">
        <LoadingSpinner text="Loading project case study..." />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-primary mb-4">Project Not Found</h2>
        <p className="text-slate-600 mb-8">{error || 'The requested project could not be found.'}</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
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
              { label: 'Portfolio', path: '/portfolio' },
              { label: project.title },
            ]}
          />

          <div className="max-w-4xl">
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary/10 text-secondary mb-4">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-primary mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {project.short_description}
            </p>

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 border-t border-slate-200 pt-6">
              {project.client_name && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-secondary" />
                  <span>
                    Client: <strong className="text-primary">{project.client_name}</strong>
                  </span>
                </div>
              )}
              {project.completion_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>
                    Delivered: <strong className="text-primary">{project.completion_date}</strong>
                  </span>
                </div>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:text-primary transition-colors"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-2xl overflow-hidden shadow-brand-lg border border-slate-200 bg-slate-100 aspect-[16/9] max-h-[550px]">
          <img
            src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary mb-4">
                  Project In-Depth & Architecture
                </h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4 text-base">
                  <p>{project.full_description}</p>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary mb-4">
                    Technology Stack Utilized
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-sm font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-2xl bg-brandBg border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-heading font-bold text-primary text-xl">Project Snapshot</h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Category
                    </span>
                    <span className="font-semibold text-primary">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Client
                    </span>
                    <span className="font-semibold text-primary">{project.client_name || 'Enterprise'}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Delivery Date
                    </span>
                    <span className="font-semibold text-primary">{project.completion_date || '2026'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-xl font-heading font-semibold text-white bg-secondary hover:bg-secondary-700 shadow transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Launch Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-xl font-heading font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Demo Repository</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-primary text-white shadow-brand">
                <h4 className="font-heading font-bold text-lg mb-2">Build a Similar Solution?</h4>
                <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  Our team can engineer a tailored application with similar requirements and scalability.
                </p>
                <Link
                  to="/contact"
                  className="w-full py-3 rounded-xl font-heading font-semibold text-primary bg-white hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <span>Request Project Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
