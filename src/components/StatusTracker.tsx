import React from 'react';
import { ApplicationStatus } from '../types';

interface StatusTrackerProps {
  status: ApplicationStatus;
  interviewDate?: string;
  adminNotes?: string;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ status, interviewDate, adminNotes }) => {
  const steps = [
    { key: 'Applied', label: 'Applied', icon: 'bi-send', desc: 'Application received' },
    { key: 'Shortlisted', label: 'Shortlisted', icon: 'bi-patch-check', desc: 'Profile screened' },
    { key: 'Interview', label: 'Interview', icon: 'bi-person-video2', desc: 'Interview round' },
    { key: 'Decision', label: status === 'Rejected' ? 'Not Selected' : 'Selected', icon: status === 'Rejected' ? 'bi-x-circle' : 'bi-award', desc: status === 'Rejected' ? 'Decision finalized' : 'Offer extended' }
  ];

  const getStepIndex = (st: ApplicationStatus): number => {
    switch (st) {
      case 'Applied': return 0;
      case 'Shortlisted': return 1;
      case 'Interview': return 2;
      case 'Selected':
      case 'Rejected': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(status);
  const isRejected = status === 'Rejected';

  return (
    <div className="py-2">
      <div className="d-flex align-items-center justify-content-between position-relative px-2">
        {/* Connecting Track */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y w-100 bg-slate-200"
          style={{ height: '2px', zIndex: 1 }}
        ></div>

        {/* Progress Line */}
        <div
          className={`position-absolute top-50 start-0 translate-middle-y ${isRejected ? 'bg-rose-500' : 'bg-slate-800'}`}
          style={{
            height: '2px',
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
            zIndex: 1,
            transition: 'width 0.3s ease'
          }}
        ></div>

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          let bubbleStyle = 'bg-white border-2 border-slate-300 text-slate-400';
          if (isCompleted) {
            bubbleStyle = 'bg-slate-900 border-2 border-slate-900 text-white';
          } else if (isCurrent) {
            bubbleStyle = isRejected
              ? 'bg-rose-600 border-2 border-rose-600 text-white'
              : 'bg-slate-900 border-2 border-slate-900 text-white';
          }

          return (
            <div
              key={step.key}
              className="d-flex flex-column align-items-center position-relative text-center"
              style={{ zIndex: 2, minWidth: '65px' }}
            >
              <div
                className={`rounded-full d-flex align-items-center justify-content-center text-xs font-semibold ${bubbleStyle}`}
                style={{ width: '30px', height: '30px' }}
              >
                {isCompleted ? (
                  <i className="bi bi-check"></i>
                ) : (
                  <i className={`bi ${step.icon}`}></i>
                )}
              </div>
              <span
                className={`mt-1.5 font-medium text-xs ${
                  isCurrent ? (isRejected ? 'text-rose-700 font-semibold' : 'text-slate-900 font-semibold') : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span className="text-slate-400 d-none d-md-block text-xs" style={{ fontSize: '0.68rem' }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contextual notes in minimal neutral callout */}
      {(interviewDate || adminNotes) && (
        <div className="mt-3 p-3 rounded-md bg-slate-50 border border-slate-200 text-xs">
          {interviewDate && (
            <div className="text-slate-800 font-medium mb-1 d-flex align-items-center gap-1.5">
              <i className="bi bi-calendar3 text-slate-500"></i>
              <span>Interview Schedule: <strong>{interviewDate}</strong></span>
            </div>
          )}
          {adminNotes && (
            <div className="text-slate-600 d-flex align-items-start gap-1.5">
              <i className="bi bi-info-circle text-slate-400 mt-0.5"></i>
              <span>Placement Cell Note: {adminNotes}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
