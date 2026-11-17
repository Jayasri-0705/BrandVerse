import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { adminApi } from '../services/api';
import { useCompany } from '../context/CompanyContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SettingsManagement = () => {
  const { refreshCompanyData } = useCompany();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState({ type: null, message: '' });

  const [formData, setFormData] = useState({
    site_title: '',
    meta_title: '',
    meta_description: '',
    google_maps_url: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    github_url: '',
    maintenance_mode: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminApi.getSettings();
        if (res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setAlert({ type: null, message: '' });

    try {
      await adminApi.updateSettings(formData);
      setAlert({
        type: 'success',
        message: 'Website settings & SEO configurations updated successfully!',
      });
      refreshCompanyData();
    } catch (err) {
      console.error('Error saving settings:', err);
      setAlert({
        type: 'error',
        message: 'Failed to update website settings. Please verify inputs.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading site configurations..." />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-primary">Website Settings</h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Configure SEO meta tags, social accounts, maps embed, and system status.
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
        {/* SEO Metadata */}
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            SEO & Search Engine Presence
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Site Title</label>
            <input
              type="text"
              required
              value={formData.site_title}
              onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Browser Title</label>
            <input
              type="text"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description</label>
            <textarea
              rows="3"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            ></textarea>
          </div>
        </div>

        {/* Social Accounts */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            Social Media Handles & Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter / X</label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Organization</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook Page</label>
              <input
                type="url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-heading font-bold text-primary text-base border-b border-slate-100 pb-2">
            Integrations & Embeds
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Google Maps URL / Query</label>
            <input
              type="url"
              value={formData.google_maps_url}
              onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="maintenance_mode"
              checked={formData.maintenance_mode}
              onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
              className="w-4 h-4 text-secondary rounded"
            />
            <label htmlFor="maintenance_mode" className="text-xs font-semibold text-slate-700">
              Maintenance Mode (Show maintenance banner to public visitors)
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-700 text-white font-semibold shadow flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManagement;
