import React, { useState, useEffect } from 'react';
import { Building2, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';
import { useCompany } from '../context/CompanyContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CompanyInfoManagement = () => {
  const { refreshCompanyData } = useCompany();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    mission: '',
    vision: '',
    email: '',
    phone: '',
    address: '',
    working_hours: '',
    stats: {
      completed_projects: '250+',
      happy_clients: '140+',
      team_experts: '50+',
      years_experience: '8+',
    },
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await adminApi.getCompany();
        if (res.data) {
          setFormData({
            ...res.data,
            stats: res.data.stats || {
              completed_projects: '250+',
              happy_clients: '140+',
              team_experts: '50+',
              years_experience: '8+',
            },
          });
        }
      } catch (err) {
        console.error('Error fetching company info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setAlert({ type: null, message: '' });

    try {
      await adminApi.updateCompany(formData);
      setAlert({
        type: 'success',
        message: 'Company profile and corporate statistics updated successfully!',
      });
      refreshCompanyData();
    } catch (err) {
      console.error('Error updating company:', err);
      setAlert({
        type: 'error',
        message: 'Failed to update company information. Please review inputs.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading company information..." />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-primary">Company Information</h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Update core branding, mission, vision, operational details, and configurable statistics.
        </p>
      </div>

      {alert.message && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
            alert.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-sm">
        {/* Core Identity */}
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            Corporate Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Description</label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-secondary"
            ></textarea>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            Mission & Strategic Vision
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mission Statement</label>
            <textarea
              rows="2"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Vision Statement</label>
            <textarea
              rows="2"
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            ></textarea>
          </div>
        </div>

        {/* Configurable Statistics */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h2 className="font-heading font-bold text-primary text-base">
              Configurable Statistics (Displayed on Homepage)
            </h2>
            <p className="text-xs text-slate-500">
              Update real metrics accurately without fabricated claims.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Projects Delivered</label>
              <input
                type="text"
                value={formData.stats?.completed_projects || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, completed_projects: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Happy Clients</label>
              <input
                type="text"
                value={formData.stats?.happy_clients || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, happy_clients: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Team Experts</label>
              <input
                type="text"
                value={formData.stats?.team_experts || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, team_experts: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Years Experience</label>
              <input
                type="text"
                value={formData.stats?.years_experience || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, years_experience: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            Contact & Operations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Working Hours</label>
            <input
              type="text"
              value={formData.working_hours}
              onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-700 text-white font-semibold shadow flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Company Information</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfoManagement;
