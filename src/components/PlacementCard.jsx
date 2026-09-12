import React from 'react';
import { Building2, MapPin, Calendar, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function PlacementCard({ job, onApply, isApplied }) {
  const { userRole, studentUser } = useAuth();

  const isEligible = userRole !== 'student' || (studentUser && Number(studentUser.cgpa) >= Number(job.requiredCgpa));

  return (
    <div className="bg-white rounded-xl border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition p-5 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            {job.package}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Min {job.requiredCgpa} CGPA
          </span>
        </div>

        {/* Role & Company */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
          {job.jobRole}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>{job.company}</span>
        </div>

        {/* Location & Meta */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Deadline: {job.lastDate}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Eligible Courses Tags */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Eligible Courses:
          </div>
          <div className="flex flex-wrap gap-1">
            {job.eligibleCourses.map((c) => (
              <span
                key={c}
                className="text-[11px] font-medium bg-sky-50/70 text-sky-800 border border-sky-100 px-2 py-0.5 rounded"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400">
          {job.jobType || 'Full-Time'}
        </span>

        {isApplied ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
            <CheckCircle className="w-3.5 h-3.5" /> Applied
          </span>
        ) : (
          <button
            onClick={() => onApply && onApply(job)}
            className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white transition shadow-xs cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default PlacementCard;
