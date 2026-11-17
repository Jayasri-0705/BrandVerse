import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { enquiriesApi } from '../../services/api';

const SERVICES_OPTIONS = [
  'General Inquiry',
  'Web Development',
  'Mobile App Development',
  'AI & Machine Learning Solutions',
  'UI/UX Design',
  'Cloud Computing Solutions',
  'Custom Software Development',
  'E-commerce Development',
  'Software Testing and QA',
];

const ContactForm = ({ defaultService = 'General Inquiry', className = '' }) => {
  const [serverStatus, setServerStatus] = useState({ success: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company_name: '',
      service_interested_in: defaultService,
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerStatus({ success: null, message: '' });

    try {
      const response = await enquiriesApi.submitEnquiry(data);
      setServerStatus({
        success: true,
        message:
          response.data?.message ||
          'Thank you! Your enquiry has been received. Our team will contact you within 24 hours.',
      });
      reset();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'object'
          ? Object.values(err.response.data).flat().join(' ')
          : 'Failed to send enquiry. Please check your information and try again.');
      setServerStatus({
        success: false,
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-brand ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-heading text-primary mb-2">Send Us an Enquiry</h3>
        <p className="text-slate-600 text-sm">
          Fill out the details below and our solution architects will prepare a customized proposal.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah Jenkins"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
              }`}
              {...register('name', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              placeholder="sarah@company.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
              }`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please provide a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              {...register('phone')}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              {...register('company_name')}
            />
          </div>
        </div>

        {/* Service Interested In */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Service Interested In
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
            {...register('service_interested_in')}
          >
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Project Details & Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Tell us about your project timeline, requirements, target goals..."
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.message
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:border-secondary focus:ring-secondary/20'
            }`}
            {...register('message', {
              required: 'Please describe your inquiry or project',
              minLength: { value: 10, message: 'Message must be at least 10 characters long' },
            })}
          ></textarea>
          {errors.message && (
            <p className="text-xs text-rose-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-heading font-semibold text-white bg-primary hover:bg-primary-800 transition-all duration-200 shadow hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Enquiry</span>
              <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
