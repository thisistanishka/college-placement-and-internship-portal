import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company, InternshipOpportunity } from '../types';
import { allCoursesList } from '../mockData';

interface InternshipsPageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenCompanyDetail?: (company: Company) => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenCompanyDetail
}) => {
  const {
    internships,
    companies,
    currentStudent,
    applyForOpportunity,
    hasStudentApplied,
    isBookmarked,
    toggleBookmark,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');
  const [durationFilter, setDurationFilter] = useState<string>('All');
  const [showShortlistedOnly, setShowShortlistedOnly] = useState<boolean>(false);
  const [selectedInternship, setSelectedInternship] = useState<InternshipOpportunity | null>(null);

  const getCompanyObj = (companyId: number, fallbackName: string): Company => {
    return companies.find(c => c.id === companyId) || {
      id: companyId,
      name: fallbackName,
      industry: 'Information Technology & Consulting',
      location: 'PAN India',
      website: 'https://example.com',
      description: `${fallbackName} provides active student mentoring and internship opportunities.`,
      contactEmail: 'internships@recruiting.com'
    };
  };

  const filteredInternships = internships.filter(item => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = item.role.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.skills.some(s => s.toLowerCase().includes(q)) ||
        item.eligibleCourses.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Course filter
    if (courseFilter !== 'All') {
      const match = item.eligibleCourses.some(c => c.toLowerCase() === courseFilter.toLowerCase());
      if (!match) return false;
    }

    // Mode filter
    if (modeFilter !== 'All' && item.locationType.toLowerCase() !== modeFilter.toLowerCase()) {
      return false;
    }

    // Duration filter
    if (durationFilter !== 'All' && !item.duration.toLowerCase().includes(durationFilter.toLowerCase())) {
      return false;
    }

    // Bookmark
    if (showShortlistedOnly && !isBookmarked(`internship-${item.id}`)) {
      return false;
    }

    return true;
  });

  const handleApply = (internshipId: number) => {
    if (!currentStudent) {
      onOpenAuth('login');
      return;
    }

    const res = applyForOpportunity('internship', internshipId);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'Internship Application Submitted!',
        message: res.message
      });
    } else {
      showToast({
        type: 'warning',
        title: 'Eligibility Notice',
        message: res.message
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span className="cursor-pointer hover:text-slate-900" onClick={() => onNavigate('home')}>Home</span>
              <span className="mx-1.5 text-slate-400">/</span>
              <span className="text-slate-700">Internship Programs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Corporate Internship Opportunities
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Gain verified industrial exposure with stipend-backed corporate training across technology, analytics, and business.
            </p>
          </div>

          <div className="mt-3 mt-sm-0">
            {currentStudent ? (
              <div className="bg-white px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-700">
                Logged in as <strong className="text-slate-900">{currentStudent.name}</strong> • CGPA: <strong>{currentStudent.cgpa}</strong>
              </div>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                onClick={() => onOpenAuth('login')}
              >
                Sign In to Apply
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="portal-card p-4 mb-6 bg-white">
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-lg-3 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Search Role, Skill or Company</label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control text-xs"
                  placeholder="e.g. React, Data, Deloitte..."
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

            {/* Course Filter */}
            <div className="col-lg-3 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Course / Department</label>
              <select
                className="form-select text-xs"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="All">All Courses</option>
                {allCoursesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Work Mode Filter */}
            <div className="col-lg-2 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Work Mode</label>
              <select
                className="form-select text-xs"
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
              >
                <option value="All">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="col-lg-2 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Duration</label>
              <select
                className="form-select text-xs"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                <option value="All">All Durations</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>

            {/* Reset and Shortlist */}
            <div className="col-lg-2 col-md-4 d-flex align-items-end gap-2">
              <button
                className={`btn btn-sm w-50 text-xs py-2 ${showShortlistedOnly ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setShowShortlistedOnly(!showShortlistedOnly)}
              >
                {showShortlistedOnly ? 'Saved Only' : 'Saved'}
              </button>
              <button
                className="btn btn-outline-primary btn-sm w-50 text-xs py-2"
                onClick={() => {
                  setSearchQuery('');
                  setCourseFilter('All');
                  setModeFilter('All');
                  setDurationFilter('All');
                  setShowShortlistedOnly(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredInternships.length}</strong> active internship openings
            {courseFilter !== 'All' && <span className="ms-1">for <strong>{courseFilter}</strong></span>}
          </div>
          <div>
            <span>Academic Credit Approval Supported</span>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredInternships.length === 0 ? (
          <div className="portal-card p-10 text-center bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-1">No Internships Found</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing your search query or broadening your filters.</p>
            <button
              className="btn btn-primary btn-sm text-xs"
              onClick={() => {
                setSearchQuery('');
                setCourseFilter('All');
                setModeFilter('All');
                setDurationFilter('All');
                setShowShortlistedOnly(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredInternships.map(internship => {
              const applied = currentStudent ? hasStudentApplied('internship', internship.id) : false;
              const bookmarked = isBookmarked(`internship-${internship.id}`);
              const comp = getCompanyObj(internship.companyId, internship.companyName);

              return (
                <div key={internship.id} className="col-lg-6">
                  <div className="portal-card p-5 h-100 bg-white d-flex flex-column">
                    {/* Top Row: Role, Company & Stipend */}
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-2.5">
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">
                          {internship.locationType} • {internship.duration} • {internship.location}
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-0.5">{internship.role}</h2>
                        <button
                          className="text-xs font-semibold text-slate-700 hover:text-slate-900 p-0 bg-transparent border-0 d-inline-flex align-items-center gap-1"
                          onClick={() => onOpenCompanyDetail && onOpenCompanyDetail(comp)}
                        >
                          <i className="bi bi-building text-slate-400"></i>
                          {internship.companyName}
                        </button>
                      </div>

                      <div className="text-end">
                        <div className="text-sm font-bold text-slate-900">{internship.stipend}</div>
                        <button
                          className="btn btn-sm btn-link text-slate-400 hover:text-amber-500 p-0 mt-1 border-0"
                          onClick={() => toggleBookmark(`internship-${internship.id}`)}
                          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                        >
                          <i className={`bi ${bookmarked ? 'bi-bookmark-fill text-amber-500' : 'bi-bookmark'}`}></i>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {internship.description}
                    </p>

                    {/* Required Skills Badges */}
                    <div className="mb-3">
                      <div className="text-xs text-slate-500 mb-1 font-medium">Key Skills</div>
                      <div className="d-flex flex-wrap gap-1">
                        {internship.skills.map(skill => (
                          <span key={skill} className="text-xs text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Eligible Courses Badges */}
                    <div className="mb-3">
                      <div className="text-xs text-slate-500 mb-1 font-medium">Eligible Courses</div>
                      <div className="d-flex flex-wrap gap-1">
                        {internship.eligibleCourses.map(course => (
                          <span
                            key={course}
                            className={`badge-course ${
                              currentStudent && currentStudent.course.toLowerCase() === course.toLowerCase()
                                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                                : ''
                            }`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cutoff & Deadline Note */}
                    <div className="bg-slate-50 rounded border border-slate-100 p-2.5 text-xs text-slate-600 mb-3 d-flex justify-content-between">
                      <span><strong className="text-slate-700">Min CGPA:</strong> {internship.requiredCgpa.toFixed(1)}</span>
                      <span><strong className="text-slate-700">Apply By:</strong> {internship.lastDate}</span>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm py-1 px-3 text-xs"
                        onClick={() => setSelectedInternship(internship)}
                      >
                        Opportunity Details
                      </button>

                      {applied ? (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                          <i className="bi bi-check me-1"></i> Applied
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm py-1 px-4 text-xs"
                          onClick={() => handleApply(internship.id)}
                        >
                          Apply for Internship
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Details Modal */}
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden">
              <div className="d-flex align-items-center justify-content-between p-4 border-b border-slate-200 bg-slate-50">
                <div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded mr-2">
                    {selectedInternship.locationType} • {selectedInternship.duration}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 d-inline-block mb-0">
                    {selectedInternship.role} — {selectedInternship.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none border-0 bg-transparent p-1"
                  onClick={() => setSelectedInternship(null)}
                >
                  ×
                </button>
              </div>

              <div className="p-4 space-y-4 text-xs">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Monthly Stipend</div>
                      <div className="text-sm font-bold text-slate-900">{selectedInternship.stipend}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Minimum CGPA Required</div>
                      <div className="text-sm font-bold text-slate-900">{selectedInternship.requiredCgpa.toFixed(1)} / 10.0</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Internship Scope</h4>
                  <p className="text-slate-600 leading-relaxed mb-0">{selectedInternship.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Required Skills</h4>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedInternship.skills.map(s => (
                      <span key={s} className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Eligible Academic Courses</h4>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedInternship.eligibleCourses.map(c => (
                      <span key={c} className="badge-course">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 p-3 bg-slate-50 rounded border border-slate-100">
                  <div className="d-flex justify-content-between">
                    <span className="text-slate-500">Application Deadline:</span>
                    <span className="font-medium text-slate-900">{selectedInternship.lastDate}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-slate-500">Work Mode:</span>
                    <span className="font-medium text-slate-900">{selectedInternship.locationType} ({selectedInternship.location})</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                  onClick={() => setSelectedInternship(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm text-xs py-1.5 px-4"
                  onClick={() => {
                    handleApply(selectedInternship.id);
                    setSelectedInternship(null);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
