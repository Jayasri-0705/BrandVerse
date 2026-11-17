import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, CheckCircle2, AlertCircle, Loader2, FileText } from 'lucide-react';
import { careersApi } from '../../services/api';

const JobApplicationForm = ({ job, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverStatus, setServerStatus] = useState({ success: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      cover_letter: '',
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Check size <= 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB. Please upload a smaller document.');
      setSelectedFile(null);
      return;
    }

    // Check extension
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(ext)) {
      setFileError('Invalid file type. Please upload a PDF or Word document (.pdf, .doc, .docx).');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerStatus({ success: null, message: '' });

    try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('cover_letter', data.cover_letter || '');
      formData.append('job_position', job?.title || 'General Application');
      if (job?.id) {
        formData.append('job', job.id);
      }
      if (selectedFile) {
        formData.append('resume', selectedFile);
      }

      const res = await careersApi.submitApplication(formData);
      setServerStatus({
        success: true,
        message:
          res.data?.message ||
          'Thank you! Your job application has been submitted successfully. Our talent team will review your qualifications.',
      });
      reset();
      setSelectedFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'object'
          ? Object.values(err.response.data).flat().join(' ')
          : 'Failed to submit application. Please verify all fields and retry.');
      setServerStatus({
        success: false,
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-brand">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-heading text-primary mb-1">Apply for this Position</h3>
        <p className="text-slate-600 text-sm">
          Applying for: <span className="font-semibold text-secondary">{job?.title}</span>
        </p>
      </div>

      {serverStatus.message && (
        <div
          className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
            serverStatus.success
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {serverStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <span>{serverStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.full_name
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
            }`}
            {...register('full_name', { required: 'Full name is required' })}
          />
          {errors.full_name && (
            <p className="text-xs text-rose-500 mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              placeholder="jane.doe@example.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
              }`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Valid email is required',
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
              }`}
              {...register('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Attach Resume (PDF, DOC, DOCX up to 10MB)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-secondary transition-colors bg-slate-50/50">
            <div className="space-y-1 text-center">
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <FileText className="mx-auto h-10 w-10 text-secondary" />
                  <p className="text-sm font-semibold text-slate-700 mt-2">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-xs text-rose-500 hover:underline mt-2"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label
                      htmlFor="resume-upload"
                      className="relative cursor-pointer font-semibold text-secondary hover:text-secondary-700"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume-upload"
                        name="resume-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, DOC, or DOCX up to 10MB</p>
                </>
              )}
            </div>
          </div>
          {fileError && <p className="text-xs text-rose-500 mt-1.5">{fileError}</p>}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Cover Letter / Professional Summary
          </label>
          <textarea
            rows="4"
            placeholder="Tell us why you are a great fit for this position at BrandVerse..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            {...register('cover_letter')}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-heading font-semibold text-white bg-primary hover:bg-primary-800 transition-all duration-200 shadow hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <span>Submit Application</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
