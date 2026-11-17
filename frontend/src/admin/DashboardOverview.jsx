import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  FolderGit2,
  Briefcase,
  FileText,
  Mail,
  Users,
  MessageSquare,
  ArrowRight,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getDashboardOverview();
        setData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Aggregating enterprise telemetry & analytics..." />;
  }

  const metrics = data?.metrics || {};

  const statCards = [
    {
      title: 'Total Services',
      value: metrics.total_services || 0,
      sub: `${metrics.active_services || 0} active in production`,
      icon: Layers,
      color: 'bg-blue-50 text-blue-600',
      link: '/admin/services',
    },
    {
      title: 'Portfolio Projects',
      value: metrics.total_projects || 0,
      sub: `${metrics.featured_projects || 0} featured on homepage`,
      icon: FolderGit2,
      color: 'bg-indigo-50 text-indigo-600',
      link: '/admin/projects',
    },
    {
      title: 'Job Openings',
      value: metrics.total_jobs || 0,
      sub: `${metrics.active_jobs || 0} actively hiring`,
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600',
      link: '/admin/jobs',
    },
    {
      title: 'Candidate Applications',
      value: metrics.total_applications || 0,
      sub: `${metrics.new_applications || 0} awaiting review`,
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600',
      link: '/admin/applications',
    },
    {
      title: 'Contact Enquiries',
      value: metrics.total_enquiries || 0,
      sub: `${metrics.new_enquiries || 0} unread inquiries`,
      icon: Mail,
      color: 'bg-amber-50 text-amber-600',
      link: '/admin/enquiries',
    },
    {
      title: 'Team Members',
      value: metrics.total_team || 0,
      sub: 'Engineers & leadership',
      icon: Users,
      color: 'bg-cyan-50 text-cyan-600',
      link: '/admin/team',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary">
          Enterprise Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time metrics, active inquiries, job applications, and database telemetry.
        </p>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-brand transition-all flex items-start justify-between group"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-extrabold font-heading text-primary group-hover:text-secondary transition-colors">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 mt-2">{card.sub}</p>
              </div>
              <div className={`p-3 rounded-xl ${card.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Enquiries & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-primary text-base">Recent Enquiries</h2>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {data?.recent_enquiries && data.recent_enquiries.length > 0 ? (
              data.recent_enquiries.map((enq) => (
                <div key={enq.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-primary text-sm">{enq.name}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        enq.status === 'new'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'in_progress'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    <strong className="text-slate-700">{enq.service_interested_in}</strong> • {enq.email}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 italic">"{enq.message}"</p>
                </div>
              ))
            ) : (
              <p className="p-6 text-sm text-slate-500 text-center">No inquiries received yet.</p>
            )}
          </div>
        </div>

        {/* Recent Job Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-primary text-base">Recent Applications</h2>
            </div>
            <Link
              to="/admin/applications"
              className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {data?.recent_applications && data.recent_applications.length > 0 ? (
              data.recent_applications.map((app) => (
                <div key={app.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-primary text-sm">{app.full_name}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        app.status === 'applied'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'reviewing'
                          ? 'bg-indigo-100 text-indigo-800'
                          : app.status === 'interviewed'
                          ? 'bg-purple-100 text-purple-800'
                          : app.status === 'offered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    Role: <strong className="text-slate-700">{app.job_position}</strong> • {app.email}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 italic">
                    {app.cover_letter ? `"${app.cover_letter}"` : 'No cover letter attached'}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-6 text-sm text-slate-500 text-center">No applications received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
