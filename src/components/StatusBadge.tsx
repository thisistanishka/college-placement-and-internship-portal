import React from 'react';
import { ApplicationStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let badgeClass = 'badge-applied';
  let icon = 'bi-file-earmark-check';

  switch (status) {
    case 'Applied':
      badgeClass = 'badge-applied';
      icon = 'bi-send';
      break;
    case 'Shortlisted':
      badgeClass = 'badge-shortlisted';
      icon = 'bi-star';
      break;
    case 'Interview':
      badgeClass = 'badge-interview';
      icon = 'bi-calendar-event';
      break;
    case 'Selected':
      badgeClass = 'badge-selected';
      icon = 'bi-check-circle';
      break;
    case 'Rejected':
      badgeClass = 'badge-rejected';
      icon = 'bi-x-circle';
      break;
  }

  const paddingClass = size === 'sm' ? 'py-0.5 px-2 text-xs' : size === 'lg' ? 'py-1.5 px-3 text-sm' : 'py-1 px-2.5 text-xs';

  return (
    <span className={`badge ${badgeClass} ${paddingClass} d-inline-flex align-items-center gap-1 rounded font-medium`}>
      <i className={`bi ${icon}`}></i>
      <span>{status}</span>
    </span>
  );
};

