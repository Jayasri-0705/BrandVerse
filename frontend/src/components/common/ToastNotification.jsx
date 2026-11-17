import React from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const ToastNotification = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    error: 'bg-rose-50 border-rose-300 text-rose-800',
    info: 'bg-sky-50 border-sky-300 text-sky-800',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-md animate-slideUp ${
        bgStyles[type] || bgStyles.info
      }`}
    >
      {icons[type]}
      <div className="flex-1 text-sm font-medium pr-2">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ToastNotification;
