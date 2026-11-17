import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DynamicIcon from '../common/DynamicIcon';

const ServiceCard = ({ service }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-brand-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-secondary/30">
      <div>
        {/* Icon Header */}
        <div className="w-14 h-14 rounded-xl bg-primary-50 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-sm">
          <DynamicIcon name={service.icon} className="w-7 h-7" defaultIcon="Code" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-primary group-hover:text-secondary transition-colors mb-3">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {service.short_description}
        </p>

        {/* Technologies Pills */}
        {service.technologies && service.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 4 && (
              <span className="text-[11px] font-medium text-slate-400 self-center">
                +{service.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors group-hover:gap-2.5 duration-200"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
