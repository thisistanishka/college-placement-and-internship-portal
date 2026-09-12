import React from 'react';
import { Bell, Calendar, Tag, AlertCircle, FileCheck, Award, Megaphone } from 'lucide-react';

export function AnnouncementCard({ announcement }) {
  // Category styling
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Urgent':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Drive Alert':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Results':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Workshop':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Policy':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition p-5 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(
              announcement.category
            )}`}
          >
            {announcement.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{announcement.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2 leading-snug">
          {announcement.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {announcement.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-sky-700 font-medium">
          <Megaphone className="w-3 h-3 text-sky-600" />
          Official TPO Notification
        </span>
        <span className="font-medium text-slate-500">Verified Notice</span>
      </div>
    </div>
  );
}

export default AnnouncementCard;
