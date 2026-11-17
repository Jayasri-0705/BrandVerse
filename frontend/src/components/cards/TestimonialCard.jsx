import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-brand transition-all duration-300 flex flex-col justify-between relative">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 -z-0 pointer-events-none" />

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center space-x-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < (testimonial.rating || 5)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 relative z-10">
        <img
          src={
            testimonial.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.client_name)}&background=142B4A&color=fff`
          }
          alt={testimonial.client_name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          loading="lazy"
        />
        <div>
          <h4 className="font-heading font-bold text-primary text-sm sm:text-base">
            {testimonial.client_name}
          </h4>
          <p className="text-xs text-slate-500">
            {testimonial.client_title} • <span className="font-medium text-slate-700">{testimonial.company_name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
