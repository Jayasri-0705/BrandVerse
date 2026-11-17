import React, { useState, useEffect } from 'react';
import {
  Search,
  Mail,
  Trash2,
  Eye,
  AlertTriangle,
  Loader2,
  X,
  Phone,
  Building,
  CheckCircle,
} from 'lucide-react';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const STATUSES = ['All', 'new', 'in_progress', 'resolved', 'closed'];

const EnquiriesManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnq, setSelectedEnq] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEnquiries();
      setEnquiries(res.data || []);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const openDetailsModal = (enq) => {
    setSelectedEnq(enq);
    setNewStatus(enq.status);
    setAdminNotes(enq.admin_notes || '');
    setDetailsModalOpen(true);
  };

  const openDeleteModal = (enq) => {
    setSelectedEnq(enq);
    setDeleteModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnq) return;
    setIsSubmitting(true);
    try {
      await adminApi.updateEnquiry(selectedEnq.id, {
        status: newStatus,
        admin_notes: adminNotes,
      });
      setDetailsModalOpen(false);
      fetchEnquiries();
    } catch (err) {
      console.error('Error updating enquiry:', err);
      alert('Failed to update enquiry status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEnq) return;
    setIsSubmitting(true);
    try {
      await adminApi.deleteEnquiry(selectedEnq.id);
      setDeleteModalOpen(false);
      fetchEnquiries();
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      alert('Failed to delete enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesSearch =
      enq.name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.email?.toLowerCase().includes(search.toLowerCase()) ||
      enq.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.service_interested_in?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-primary">Contact Enquiries</h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Review incoming project leads, RFPs, and consultation requests.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
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
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-primary">{enq.name}</p>
                      <p className="text-xs text-slate-400">{enq.email}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 text-xs">
                      {enq.company_name || 'Individual'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {enq.service_interested_in}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-xs text-slate-500 truncate">{enq.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          enq.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'in_progress'
                            ? 'bg-sky-100 text-sky-800'
                            : enq.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetailsModal(enq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-secondary hover:bg-slate-100 transition-colors"
                          title="View Message & Add Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(enq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Enquiry"
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

      {/* Details & Status Modal */}
      {detailsModalOpen && selectedEnq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-primary">Enquiry Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Service: <strong className="text-primary">{selectedEnq.service_interested_in}</strong>
                </p>
              </div>
              <button onClick={() => setDetailsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Sender Name</span>
                  <span className="font-semibold text-primary">{selectedEnq.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Company</span>
                  <span className="font-semibold text-primary">{selectedEnq.company_name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Email</span>
                  <a href={`mailto:${selectedEnq.email}`} className="text-secondary font-medium hover:underline">
                    {selectedEnq.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Phone</span>
                  <span className="font-semibold text-primary">{selectedEnq.phone || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1.5">Full Message</span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedEnq.message}
                </div>
              </div>

              {/* Status & Notes */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Enquiry Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-secondary"
                  >
                    <option value="new">New Lead (new)</option>
                    <option value="in_progress">In Discussion (in_progress)</option>
                    <option value="resolved">Proposal Sent / Won (resolved)</option>
                    <option value="closed">Closed / Archived (closed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Internal Sales / Engineering Notes
                  </label>
                  <textarea
                    rows="3"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Quoted pricing, assigned architect, meeting notes..."
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
            <h3 className="text-lg font-bold font-heading text-primary">Delete Enquiry?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete inquiry from <strong className="text-primary">{selectedEnq?.name}</strong>?
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

export default EnquiriesManagement;
