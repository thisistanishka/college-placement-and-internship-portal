import React from 'react';
import { Building2, MapPin, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CompanyCard({ company, onViewOpportunities }) {
  const navigate = useNavigate();

  // Color generator for logo placeholder
  const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleView = () => {
    if (onViewOpportunities) {
      onViewOpportunities(company);
    } else {
      navigate(`/placements?search=${encodeURIComponent(company.name)}`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition p-5 flex flex-col justify-between">
      <div>
        {/* Header with Logo Placeholder */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 tracking-tight truncate">
              {company.name}
            </h3>
            <span className="inline-block text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              {company.industry}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{company.location}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {company.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-sky-700">
          {company.openingsCount || 2} Openings Active
        </span>

        <button
          onClick={handleView}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition cursor-pointer"
        >
          <span>View Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
