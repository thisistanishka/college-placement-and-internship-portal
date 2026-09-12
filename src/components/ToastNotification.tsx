import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastNotification: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'bi-check-circle-fill text-success';
      case 'info':
        return 'bi-info-circle-fill text-primary';
      case 'warning':
        return 'bi-exclamation-triangle-fill text-warning';
      case 'danger':
        return 'bi-x-circle-fill text-danger';
      default:
        return 'bi-bell-fill text-primary';
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-success';
      case 'info':
        return 'border-primary';
      case 'warning':
        return 'border-warning';
      case 'danger':
        return 'border-danger';
      default:
        return 'border-primary';
    }
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090, maxWidth: '380px' }}
    >
      <div
        className={`card shadow-lg border-start border-4 ${getBorderColor()} bg-white rounded-3 animate-fade-in`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="card-body p-3 d-flex align-items-start gap-2.5">
          <i className={`bi ${getIcon()} fs-5 mt-0.5 flex-shrink-0`}></i>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <strong className="small text-dark font-outfit">{toast.title}</strong>
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>Just now</small>
            </div>
            <div className="small text-secondary lh-sm" style={{ fontSize: '0.82rem' }}>
              {toast.message}
            </div>
          </div>
          <button
            type="button"
            className="btn-close ms-1 small"
            style={{ fontSize: '0.65rem' }}
            aria-label="Close"
            onClick={clearToast}
          ></button>
        </div>
      </div>
    </div>
  );
};
