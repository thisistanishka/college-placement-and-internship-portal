import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function DashboardCard({ title, count, description, icon: Icon, linkTo, linkText, badgeText }) {
  return (
    <div className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-11 h-11 rounded-lg bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          {badgeText && (
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              {badgeText}
            </span>
          )}
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {count}
        </div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {description}
          </p>
        )}
      </div>

      {linkTo && (
        <div className="pt-3 border-t border-slate-100">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none group"
          >
            <span>{linkText || 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
