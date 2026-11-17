import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
  Loader2,
  X,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const STATUSES = ['All', 'applied', 'reviewing', 'interviewed', 'offered', 'rejected'];

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status & notes editing
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getApplications();
      setApplications(res.data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.admin_notes || '');
    setDetailsModalOpen(true);
  };

  const openDeleteModal = (app) => {
    setSelectedApp(app);
    setDeleteModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;
    setIsSubmitting(true);
    try {
      await adminApi.updateApplication(selectedApp.id, {
        status: newStatus,
        admin_notes: adminNotes,
      });
      setDetailsModalOpen(false);
      fetchApplications();
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedApp) return;
    setIsSubmitting(true);
    try {
      await adminApi.deleteApplication(selectedApp.id);
      setDeleteModalOpen(false);
      fetchApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = applications.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch =
      app.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase()) ||
      app.job_position?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-primary">Job Applications</h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Review candidate resumes, assess fit, and update hiring pipeline statuses.
          </p>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st ? 'bg-primary text-white' : 'bg-white border text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-700 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Applied Position</th>
                  <th className="py-3.5 px-4">Resume</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-primary">{app.full_name}</p>
                      <p className="text-xs text-slate-400">{app.email} • {app.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {app.job_position}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Document</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No file</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
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
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetailsModal(app)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-secondary hover:bg-slate-100 transition-colors"
                          title="View Application Details & Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(app)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details & Status Update Modal */}
      {detailsModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-primary">Candidate Application</h3>
                <p className="text-xs text-slate-400 mt-0.5">Applied for {selectedApp.job_position}</p>
              </div>
              <button onClick={() => setDetailsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Full Name</span>
                  <span className="font-semibold text-primary">{selectedApp.full_name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Email</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-secondary font-medium hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Phone</span>
                  <span className="font-semibold text-primary">{selectedApp.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Applied Date</span>
                  <span className="text-slate-600">
                    {new Date(selectedApp.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedApp.resume && (
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1.5">Resume File</span>
                  <a
                    href={selectedApp.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/10 text-secondary text-xs font-semibold hover:bg-secondary/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Candidate Resume Document</span>
                  </a>
                </div>
              )}

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1.5">
                  Cover Letter / Statement
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedApp.cover_letter || 'No cover letter submitted.'}
                </div>
              </div>

              {/* Status Update Form */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Application Pipeline Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-secondary"
                  >
                    <option value="applied">New Application (applied)</option>
                    <option value="reviewing">In Review (reviewing)</option>
                    <option value="interviewed">Interview Scheduled / Completed (interviewed)</option>
                    <option value="offered">Offer Extended (offered)</option>
                    <option value="rejected">Not Selected (rejected)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Internal Recruiter Notes
                  </label>
                  <textarea
                    rows="3"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Interview feedback, skill assessment, offer details..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDetailsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-secondary hover:bg-secondary-700 text-white text-xs font-semibold shadow flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Status & Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary">Delete Application?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete application by <strong className="text-primary">{selectedApp?.full_name}</strong>?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow"
              >
                {isSubmitting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;
