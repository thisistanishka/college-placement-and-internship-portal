import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company, PlacementOpportunity } from '../types';
import { allCoursesList } from '../mockData';

interface PlacementsPageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenCompanyDetail?: (company: Company) => void;
  onOpenSalaryCalc?: (lpa?: number) => void;
}

export const PlacementsPage: React.FC<PlacementsPageProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenCompanyDetail,
  onOpenSalaryCalc
}) => {
  const {
    placements,
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
  const [cgpaFilter, setCgpaFilter] = useState<number>(0);
  const [salaryFilter, setSalaryFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [showShortlistedOnly, setShowShortlistedOnly] = useState<boolean>(false);
  const [selectedPlacement, setSelectedPlacement] = useState<PlacementOpportunity | null>(null);

  const getCompanyObj = (companyId: number, fallbackName: string): Company => {
    return companies.find(c => c.id === companyId) || {
      id: companyId,
      name: fallbackName,
      industry: 'Information Technology & Services',
      location: 'PAN India',
      website: 'https://example.com',
      description: `${fallbackName} is a verified campus recruitment partner.`,
      contactEmail: 'campus@recruiting.com'
    };
  };

  // Unique locations list
  const uniqueLocations = Array.from(new Set(placements.map(p => p.location.split('/')[0].trim())));

  const filteredPlacements = placements.filter(p => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = p.jobRole.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.eligibleCourses.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Course filter
    if (courseFilter !== 'All') {
      const match = p.eligibleCourses.some(c => c.toLowerCase() === courseFilter.toLowerCase());
      if (!match) return false;
    }

    // CGPA filter
    if (cgpaFilter > 0 && p.requiredCgpa > cgpaFilter) {
      return false;
    }

    // Location filter
    if (locationFilter !== 'All' && !p.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }

    // Salary filter
    if (salaryFilter === 'above_6' && !p.salaryPackage.includes('6') && !p.salaryPackage.includes('7') && !p.salaryPackage.includes('8') && !p.salaryPackage.includes('9') && !p.salaryPackage.includes('10')) {
      return false;
    }
    if (salaryFilter === 'above_8' && !p.salaryPackage.includes('8') && !p.salaryPackage.includes('9') && !p.salaryPackage.includes('10') && !p.salaryPackage.includes('12') && !p.salaryPackage.includes('18')) {
      return false;
    }

    // Bookmark filter
    if (showShortlistedOnly && !isBookmarked(`placement-${p.id}`)) {
      return false;
    }

    return true;
  });

  const handleApply = (placementId: number) => {
    if (!currentStudent) {
      onOpenAuth('login');
      return;
    }

    const res = applyForOpportunity('placement', placementId);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'Application Submitted!',
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
              <span className="text-slate-700">Full-Time Placements</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Full-Time Placement Opportunities
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Verified on-campus career opportunities across Engineering, Management, and Sciences.
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

        {/* Filters Section */}
        <div className="portal-card p-4 mb-6 bg-white">
          <div className="row g-3 align-items-end">
            {/* Search by company or role */}
            <div className="col-lg-3 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Search Role or Company</label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control text-xs"
                  placeholder="e.g. Software Engineer, TCS..."
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
            <div className="col-lg-2 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Course / Program</label>
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

            {/* Salary Range Filter */}
            <div className="col-lg-2 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Package Filter</label>
              <select
                className="form-select text-xs"
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
              >
                <option value="All">All Packages</option>
                <option value="above_6">₹6.0+ LPA & Above</option>
                <option value="above_8">₹8.0+ LPA (Super Dream)</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="col-lg-2 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Location</label>
              <select
                className="form-select text-xs"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="All">All Locations</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Minimum CGPA */}
            <div className="col-lg-1 col-md-4">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Max Cutoff</label>
              <select
                className="form-select text-xs"
                value={cgpaFilter}
                onChange={(e) => setCgpaFilter(Number(e.target.value))}
              >
                <option value={0}>Any</option>
                <option value={6.0}>&le; 6.0</option>
                <option value={6.5}>&le; 6.5</option>
                <option value={7.0}>&le; 7.0</option>
                <option value={7.5}>&le; 7.5</option>
              </select>
            </div>

            {/* Shortlisted Toggle & Reset */}
            <div className="col-lg-2 col-md-6 d-flex align-items-end gap-2">
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
                  setCgpaFilter(0);
                  setSalaryFilter('All');
                  setLocationFilter('All');
                  setShowShortlistedOnly(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="d-flex align-items-center justify-content-between mb-4 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredPlacements.length}</strong> active placement opportunities
            {courseFilter !== 'All' && <span className="ms-1">for <strong>{courseFilter}</strong></span>}
          </div>
          <div>
            <span>Automated CGPA & Course Validation Active</span>
          </div>
        </div>

        {/* Placements Cards Grid */}
        {filteredPlacements.length === 0 ? (
          <div className="portal-card p-10 text-center bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-1">No Opportunities Match Your Criteria</h3>
            <p className="text-xs text-slate-500 mb-4">Try adjusting your course, salary, or CGPA filter.</p>
            <button
              className="btn btn-primary btn-sm text-xs"
              onClick={() => {
                setSearchQuery('');
                setCourseFilter('All');
                setCgpaFilter(0);
                setSalaryFilter('All');
                setLocationFilter('All');
                setShowShortlistedOnly(false);
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPlacements.map(placement => {
              const applied = currentStudent ? hasStudentApplied('placement', placement.id) : false;
              const bookmarked = isBookmarked(`placement-${placement.id}`);
              const comp = getCompanyObj(placement.companyId, placement.companyName);

              const cgpaEligible = currentStudent
                ? currentStudent.cgpa >= placement.requiredCgpa
                : true;

              return (
                <div key={placement.id} className="col-lg-6">
                  <div className="portal-card p-5 h-100 bg-white d-flex flex-column">
                    {/* Top Row */}
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-2.5">
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">
                          {placement.jobType} • {placement.location} • Batch {placement.graduationYear}
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-0.5">{placement.jobRole}</h2>
                        <button
                          className="text-xs font-semibold text-slate-700 hover:text-slate-900 p-0 bg-transparent border-0 d-inline-flex align-items-center gap-1"
                          onClick={() => onOpenCompanyDetail && onOpenCompanyDetail(comp)}
                        >
                          <i className="bi bi-building text-slate-400"></i>
                          {placement.companyName}
                        </button>
                      </div>

                      <div className="text-end">
                        <div className="text-sm font-bold text-slate-900">{placement.salaryPackage}</div>
                        <button
                          className="btn btn-sm btn-link text-slate-400 hover:text-amber-500 p-0 mt-1 border-0"
                          onClick={() => toggleBookmark(`placement-${placement.id}`)}
                          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                        >
                          <i className={`bi ${bookmarked ? 'bi-bookmark-fill text-amber-500' : 'bi-bookmark'}`}></i>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {placement.description}
                    </p>

                    <div className="bg-slate-50 rounded border border-slate-100 p-2.5 text-xs text-slate-600 mb-3 space-y-1">
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong className="text-slate-700">Min CGPA:</strong>{' '}
                          <span className={currentStudent && !cgpaEligible ? 'text-red-600 font-semibold' : 'text-slate-900 font-medium'}>
                            {placement.requiredCgpa.toFixed(1)}
                          </span>
                        </span>
                        <span><strong className="text-slate-700">Deadline:</strong> {placement.lastDate}</span>
                      </div>
                      {placement.driveDate && (
                        <div>
                          <strong className="text-slate-700">Drive Date:</strong> {placement.driveDate}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-1.5 font-medium">Eligible Courses</div>
                      <div className="d-flex flex-wrap gap-1">
                        {placement.eligibleCourses.map(course => {
                          const isStudentCourse = currentStudent && currentStudent.course.toLowerCase() === course.toLowerCase();
                          return (
                            <span
                              key={course}
                              className={`badge-course ${isStudentCourse ? 'bg-slate-900 text-white border-slate-900 font-semibold' : ''}`}
                            >
                              {course}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto pt-3 border-t border-slate-100 d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm py-1 px-3 text-xs"
                          onClick={() => setSelectedPlacement(placement)}
                        >
                          Details
                        </button>

                        {onOpenSalaryCalc && (
                          <button
                            className="btn btn-outline-primary btn-sm py-1 px-2.5 text-xs"
                            onClick={() => onOpenSalaryCalc(6.0)}
                            title="Calculate estimated monthly take-home"
                          >
                            CTC Breakdown
                          </button>
                        )}
                      </div>

                      {applied ? (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                          <i className="bi bi-check me-1"></i> Applied
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm py-1 px-4 text-xs"
                          onClick={() => handleApply(placement.id)}
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Placement Details Modal */}
        {selectedPlacement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden">
              <div className="d-flex align-items-center justify-content-between p-4 border-b border-slate-200 bg-slate-50">
                <div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded mr-2">
                    {selectedPlacement.jobType} • {selectedPlacement.location}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 d-inline-block mb-0">
                    {selectedPlacement.jobRole} — {selectedPlacement.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none border-0 bg-transparent p-1"
                  onClick={() => setSelectedPlacement(null)}
                >
                  ×
                </button>
              </div>

              <div className="p-4 space-y-4 text-xs">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Annual CTC Package</div>
                      <div className="text-sm font-bold text-slate-900">{selectedPlacement.salaryPackage}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Minimum Required CGPA</div>
                      <div className="text-sm font-bold text-slate-900">{selectedPlacement.requiredCgpa.toFixed(1)} / 10.0</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Role Description</h4>
                  <p className="text-slate-600 leading-relaxed mb-0">{selectedPlacement.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Eligible Academic Disciplines</h4>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedPlacement.eligibleCourses.map(c => (
                      <span key={c} className="badge-course">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedPlacement.rounds && selectedPlacement.rounds.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1.5">Selection Rounds</h4>
                    <div className="d-flex flex-wrap gap-1.5">
                      {selectedPlacement.rounds.map((round, idx) => (
                        <span key={round} className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                          Round {idx + 1}: {round}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Important Dates</h4>
                  <div className="space-y-1.5 p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="d-flex justify-content-between">
                      <span className="text-slate-500">Application Deadline:</span>
                      <span className="font-medium text-slate-900">{selectedPlacement.lastDate}</span>
                    </div>
                    {selectedPlacement.driveDate && (
                      <div className="d-flex justify-content-between">
                        <span className="text-slate-500">Scheduled Drive Date:</span>
                        <span className="font-medium text-slate-900">{selectedPlacement.driveDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                  onClick={() => setSelectedPlacement(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm text-xs py-1.5 px-4"
                  onClick={() => {
                    handleApply(selectedPlacement.id);
                    setSelectedPlacement(null);
                  }}
                >
                  Apply for Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
