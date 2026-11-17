import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const TeamCard = ({ member }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-brand transition-all duration-300 group">
      <div className="aspect-[4/4] overflow-hidden bg-slate-100 relative">
        <img
          src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center space-x-2">
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-primary hover:bg-secondary hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.github_url && (
              <a
                href={member.github_url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-primary hover:bg-secondary hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="w-8 h-8 rounded-full bg-white text-primary hover:bg-secondary hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1 block">
          {member.department}
        </span>
        <h4 className="text-lg font-bold font-heading text-primary">{member.name}</h4>
        <p className="text-sm text-slate-500 font-medium mb-3">{member.role}</p>
        {member.bio && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{member.bio}</p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
