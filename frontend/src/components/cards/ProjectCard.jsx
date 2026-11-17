import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-brand-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Project Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <Link
              to={`/portfolio/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-secondary/90 hover:bg-secondary px-3.5 py-2 rounded-lg backdrop-blur-sm shadow transition-colors"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-white/95 text-primary backdrop-blur-md shadow-sm border border-slate-100">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold font-heading text-primary group-hover:text-secondary transition-colors mb-2 line-clamp-1">
            <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.short_description}
          </p>

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[11px] font-medium text-slate-400 self-center">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Links */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 text-sm font-semibold">
        <Link
          to={`/portfolio/${project.slug}`}
          className="text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <span>Case Study</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        {project.live_link ? (
          <a
            href={project.live_link}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-secondary inline-flex items-center gap-1 transition-colors text-xs"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
