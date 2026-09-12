import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company } from '../types';

interface CompaniesPageProps {
  onNavigate: (page: string) => void;
  onOpenCompanyDetail?: (company: Company) => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ onNavigate, onOpenCompanyDetail }) => {
  const { companies, placements, internships } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activeCompanyForModal, setActiveCompanyForModal] = useState<Company | null>(null);

  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];

  const filteredCompanies = companies.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInd = selectedIndustry === 'All' || c.industry === selectedIndustry;
    return matchesSearch && matchesInd;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span className="cursor-pointer hover:text-slate-900" onClick={() => onNavigate('home')}>Home</span>
              <span className="mx-1.5 text-slate-400">/</span>
              <span className="text-slate-700">Corporate Partners</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Recruiting Organizations & Partners
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Verified multinational corporations, consulting firms, technology leaders, and financial institutions actively hiring from campus.
            </p>
          </div>
          <div className="mt-3 mt-sm-0">
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded">
              {companies.length} Registered Recruiters
            </span>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="portal-card p-4 mb-6 bg-white">
          <div className="row g-3 align-items-end">
            <div className="col-lg-6 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Search Companies</label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control text-xs"
                  placeholder="Search by company name, industry, or headquarters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 border-0 bg-transparent text-xs"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Industry / Sector</label>
              <select
                className="form-select text-xs"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-2 col-md-2">
              <button
                className="btn btn-outline-primary btn-sm w-100 text-xs py-2"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry('All');
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="row g-4">
          {filteredCompanies.map(company => {
            const companyPlacements = placements.filter(p => p.companyId === company.id && p.status === 'Active');
            const companyInternships = internships.filter(i => i.companyId === company.id && i.status === 'Active');
            const totalOpenings = companyPlacements.length + companyInternships.length;

            const initials = company.name
              .split(' ')
              .map(word => word[0])
              .slice(0, 2)
              .join('');

            return (
              <div key={company.id} className="col-lg-6">
                <div className="portal-card p-5 h-100 bg-white d-flex flex-column">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    {/* Initials badge */}
                    <div
                      className="rounded border border-slate-200 bg-slate-100 text-slate-800 d-flex align-items-center justify-content-center font-bold text-base flex-shrink-0"
                      style={{ width: '48px', height: '48px' }}
                    >
                      {initials}
                    </div>

                    {/* Company Details */}
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <h2 className="text-base font-bold text-slate-900 mb-0 text-truncate">{company.name}</h2>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-nowrap">
                          {company.availablePositions || 10} Openings
                        </span>
                      </div>

                      <div className="d-flex flex-wrap gap-2 align-items-center mt-1 text-xs text-slate-500">
                        <span className="text-slate-700 font-medium">{company.industry}</span>
                        <span>•</span>
                        <span>{company.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Openings Count */}
                  <div className="d-flex align-items-center gap-2 mb-3 text-xs text-slate-600">
                    <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {companyPlacements.length} Placement Roles
                    </span>
                    <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {companyInternships.length} Internship Roles
                    </span>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-900 text-decoration-none font-medium"
                    >
                      Website <i className="bi bi-box-arrow-up-right ms-0.5 text-slate-400"></i>
                    </a>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm py-1 px-3 text-xs"
                        onClick={() => setActiveCompanyForModal(company)}
                      >
                        Active Roles ({totalOpenings})
                      </button>
                      {onOpenCompanyDetail && (
                        <button
                          className="btn btn-primary btn-sm py-1 px-3 text-xs"
                          onClick={() => onOpenCompanyDetail(company)}
                        >
                          Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Openings Modal */}
        {activeCompanyForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden">
              <div className="d-flex align-items-center justify-content-between p-4 border-b border-slate-200 bg-slate-50">
                <div className="d-flex align-items-center gap-2.5">
                  <div className="bg-white px-2 py-1 rounded text-slate-800 border border-slate-200 font-bold text-xs">
                    {activeCompanyForModal.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-0">
                      Openings at {activeCompanyForModal.name}
                    </h3>
                    <span className="text-xs text-slate-500">{activeCompanyForModal.industry} • {activeCompanyForModal.location}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none border-0 bg-transparent p-1"
                  onClick={() => setActiveCompanyForModal(null)}
                >
                  ×
                </button>
              </div>

              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Full-Time Placement Drives</h4>
                  {placements.filter(p => p.companyId === activeCompanyForModal.id).length === 0 ? (
                    <p className="text-slate-500 italic mb-0">No active full-time drives scheduled.</p>
                  ) : (
                    <div className="space-y-2">
                      {placements.filter(p => p.companyId === activeCompanyForModal.id).map(p => (
                        <div key={p.id} className="p-3 rounded border border-slate-200 bg-slate-50 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="font-semibold text-slate-900">{p.jobRole}</div>
                            <div className="text-slate-500">
                              Min CGPA: {p.requiredCgpa} • Eligible: {p.eligibleCourses.join(', ')}
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="font-bold text-slate-900 mb-1">{p.salaryPackage}</div>
                            <button
                              className="btn btn-outline-primary btn-sm text-xs py-1 px-2.5"
                              onClick={() => {
                                setActiveCompanyForModal(null);
                                onNavigate('placements');
                              }}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Internship Openings</h4>
                  {internships.filter(i => i.companyId === activeCompanyForModal.id).length === 0 ? (
                    <p className="text-slate-500 italic mb-0">No active internship positions listed.</p>
                  ) : (
                    <div className="space-y-2">
                      {internships.filter(i => i.companyId === activeCompanyForModal.id).map(i => (
                        <div key={i.id} className="p-3 rounded border border-slate-200 bg-slate-50 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="font-semibold text-slate-900">{i.role}</div>
                            <div className="text-slate-500">
                              {i.locationType} • {i.duration} • Min CGPA: {i.requiredCgpa}
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="font-bold text-slate-900 mb-1">{i.stipend}</div>
                            <button
                              className="btn btn-outline-primary btn-sm text-xs py-1 px-2.5"
                              onClick={() => {
                                setActiveCompanyForModal(null);
                                onNavigate('internships');
                              }}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                  onClick={() => setActiveCompanyForModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
