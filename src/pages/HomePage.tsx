import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company, PlacementOpportunity, InternshipOpportunity, PlacementDrive } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenProjectCode: () => void;
  onOpenEligibility: () => void;
  onOpenSalaryCalc: (lpa?: number) => void;
  onOpenCompanyDetail: (company: Company) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenProjectCode,
  onOpenEligibility,
  onOpenSalaryCalc,
  onOpenCompanyDetail
}) => {
  const {
    placements,
    internships,
    drives,
    announcements,
    companies,
    currentRole,
    currentStudent,
    applyForOpportunity,
    hasStudentApplied,
    isBookmarked,
    toggleBookmark
  } = useApp();

  const [activeTab, setActiveTab] = useState<'placements' | 'internships'>('placements');

  const activePlacements = placements.filter(p => p.status === 'Active');
  const activeInternships = internships.filter(i => i.status === 'Active');
  const topDrives = drives.slice(0, 3);
  const topAnnouncements = announcements.slice(0, 4);

  const getCompanyObj = (companyId: number, fallbackName: string): Company => {
    return companies.find(c => c.id === companyId) || {
      id: companyId,
      name: fallbackName,
      industry: 'Information Technology & Services',
      location: 'PAN India',
      website: 'https://example.com',
      description: `${fallbackName} is an active corporate recruiting partner for campus hiring drives.`,
      contactEmail: 'campus@recruiting.com'
    };
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. INSTITUTIONAL HEADER & LEDGER */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 d-inline-block">
              Central University Training & Placement Cell
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Campus Recruitment & Career Development Portal
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Coordinating full-time campus placements, summer internships, and recruitment schedules across Engineering, Computer Applications, Management, Commerce, and Humanities.
            </p>

            <div className="d-flex flex-wrap gap-2.5 mb-6">
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('placements')}
              >
                Browse Placements ({activePlacements.length})
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => onNavigate('internships')}
              >
                Browse Internships ({activeInternships.length})
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => onNavigate('drives')}
              >
                Drive Schedule
              </button>

              {currentRole === 'guest' ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => onNavigate('auth')}
                >
                  Student Sign In
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary font-medium"
                  onClick={() => onNavigate(currentRole === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                >
                  {currentRole === 'admin' ? 'Open Admin Panel' : 'My Dashboard'}
                </button>
              )}
            </div>

            {/* Logged-in Student Inline Status */}
            {currentRole === 'student' && currentStudent && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="text-slate-700">
                  Signed in as <strong className="text-slate-900">{currentStudent.name}</strong> • {currentStudent.course} ({currentStudent.department}) • CGPA: <strong>{currentStudent.cgpa}</strong>
                </div>
                <button
                  className="text-xs text-slate-900 font-semibold p-0 bg-transparent border-0 hover:underline"
                  onClick={() => onNavigate('student-dashboard')}
                >
                  View My Applications &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Institutional Metric Ledger */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="row g-4 text-start">
              <div className="col-6 col-md-3">
                <div className="text-xs text-slate-500 font-medium mb-1">Students Placed</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">850+</div>
                <div className="text-xs text-slate-400 mt-0.5">Across all degree batches</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-xs text-slate-500 font-medium mb-1">Recruiting Partners</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">120+</div>
                <div className="text-xs text-slate-400 mt-0.5">MNCs, tech firms & consultancies</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-xs text-slate-500 font-medium mb-1">Highest Package</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">₹18.5 LPA</div>
                <div className="text-xs text-slate-400 mt-0.5">National level hiring offer</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-xs text-slate-500 font-medium mb-1">Average Package</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">₹5.6 LPA</div>
                <div className="text-xs text-slate-400 mt-0.5">Institutional median</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING DRIVES (SCHEDULE) */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
          <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Upcoming Campus Recruitment Drives</h2>
              <p className="text-sm text-slate-500 mb-0">Scheduled on-campus and virtual hiring assessments.</p>
            </div>
            <button
              className="btn btn-outline-primary btn-sm mt-2 mt-sm-0"
              onClick={() => onNavigate('drives')}
            >
              View Full Schedule &rarr;
            </button>
          </div>

          <div className="row g-3">
            {topDrives.map(drive => {
              const applied = currentStudent ? hasStudentApplied('drive', drive.id) : false;

              return (
                <div key={drive.id} className="col-lg-4 col-md-6">
                  <div className="portal-card p-4 h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {drive.status}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {drive.package}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 mb-0.5">{drive.companyName}</h3>
                    <div className="text-xs text-slate-600 font-medium mb-3">{drive.jobRole}</div>

                    <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 mb-3 space-y-1">
                      <div><strong className="text-slate-700">Date:</strong> {drive.driveDate} ({drive.reportingTime})</div>
                      <div><strong className="text-slate-700">Venue:</strong> {drive.venue}</div>
                      <div><strong className="text-slate-700">Registration Deadline:</strong> {drive.registrationDeadline}</div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-1 font-medium">Eligible Courses</div>
                      <div className="d-flex flex-wrap gap-1">
                        {drive.eligibleCourses.map(c => (
                          <span key={c} className="badge-course">{c}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                      <button
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 p-0 bg-transparent border-0"
                        onClick={() => onNavigate('drives')}
                      >
                        Details & Rounds
                      </button>

                      {drive.status === 'Registration Open' && (
                        applied ? (
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                            <i className="bi bi-check me-1"></i> Registered
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm py-1 px-3 text-xs"
                            onClick={() => {
                              if (!currentStudent) {
                                onOpenAuth('login');
                              } else {
                                applyForOpportunity('drive', drive.id);
                              }
                            }}
                          >
                            Register
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LATEST OPPORTUNITIES (PLACEMENTS & INTERNSHIPS) */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
          <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Open Opportunities</h2>
              <p className="text-sm text-slate-500 mb-0">Active positions accepting student applications.</p>
            </div>

            {/* Segmented Control */}
            <div className="d-inline-flex bg-white p-0.5 rounded border border-slate-200 text-xs">
              <button
                className={`px-3 py-1.5 rounded font-medium transition ${
                  activeTab === 'placements' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('placements')}
              >
                Full-Time Placements ({activePlacements.length})
              </button>
              <button
                className={`px-3 py-1.5 rounded font-medium transition ${
                  activeTab === 'internships' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setActiveTab('internships')}
              >
                Internships ({activeInternships.length})
              </button>
            </div>
          </div>

          <div className="row g-3">
            {activeTab === 'placements' ? (
              activePlacements.slice(0, 4).map(placement => {
                const applied = currentStudent ? hasStudentApplied('placement', placement.id) : false;
                const bookmarked = isBookmarked(`placement-${placement.id}`);
                const comp = getCompanyObj(placement.companyId, placement.companyName);

                return (
                  <div key={placement.id} className="col-lg-6">
                    <div className="portal-card p-4 h-100 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <div>
                          <span className="text-xs text-slate-500 font-medium">
                            Full Time • {placement.location}
                          </span>
                          <h3 className="text-base font-semibold text-slate-900 mt-0.5 mb-1">{placement.jobRole}</h3>
                          <button
                            className="text-xs font-semibold text-slate-700 hover:text-slate-900 p-0 bg-transparent border-0 d-inline-flex align-items-center gap-1"
                            onClick={() => onOpenCompanyDetail(comp)}
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

                      <div className="p-2 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 d-flex justify-content-between mb-3">
                        <span><strong className="text-slate-700">Min CGPA:</strong> {placement.requiredCgpa.toFixed(1)}</span>
                        <span><strong className="text-slate-700">Deadline:</strong> {placement.lastDate}</span>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-slate-500 mb-1 font-medium">Eligible Courses</div>
                        <div className="d-flex flex-wrap gap-1">
                          {placement.eligibleCourses.map(course => (
                            <span key={course} className="badge-course">{course}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-outline-primary btn-sm py-1 px-2.5 text-xs"
                          onClick={() => onOpenSalaryCalc(6.0)}
                        >
                          CTC Calculator
                        </button>

                        {applied ? (
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                            <i className="bi bi-check me-1"></i> Applied
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm py-1 px-3 text-xs"
                            onClick={() => {
                              if (!currentStudent) {
                                onOpenAuth('login');
                              } else {
                                applyForOpportunity('placement', placement.id);
                              }
                            }}
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              activeInternships.slice(0, 4).map(internship => {
                const applied = currentStudent ? hasStudentApplied('internship', internship.id) : false;
                const bookmarked = isBookmarked(`internship-${internship.id}`);
                const comp = getCompanyObj(internship.companyId, internship.companyName);

                return (
                  <div key={internship.id} className="col-lg-6">
                    <div className="portal-card p-4 h-100 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <div>
                          <span className="text-xs text-slate-500 font-medium">
                            {internship.workMode} • {internship.duration}
                          </span>
                          <h3 className="text-base font-semibold text-slate-900 mt-0.5 mb-1">{internship.role}</h3>
                          <button
                            className="text-xs font-semibold text-slate-700 hover:text-slate-900 p-0 bg-transparent border-0 d-inline-flex align-items-center gap-1"
                            onClick={() => onOpenCompanyDetail(comp)}
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

                      <div className="p-2 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 d-flex justify-content-between mb-3">
                        <span><strong className="text-slate-700">Min CGPA:</strong> {internship.requiredCgpa.toFixed(1)}</span>
                        <span><strong className="text-slate-700">Apply By:</strong> {internship.lastDate}</span>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-slate-500 mb-1 font-medium">Eligible Courses</div>
                        <div className="d-flex flex-wrap gap-1">
                          {internship.eligibleCourses.map(course => (
                            <span key={course} className="badge-course">{course}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-outline-primary btn-sm py-1 px-2.5 text-xs"
                          onClick={() => onOpenCompanyDetail(comp)}
                        >
                          Company Info
                        </button>

                        {applied ? (
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                            <i className="bi bi-check me-1"></i> Applied
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm py-1 px-3 text-xs"
                            onClick={() => {
                              if (!currentStudent) {
                                onOpenAuth('login');
                              } else {
                                applyForOpportunity('internship', internship.id);
                              }
                            }}
                          >
                            Apply for Internship
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onNavigate(activeTab === 'placements' ? 'placements' : 'internships')}
            >
              View All {activeTab === 'placements' ? 'Placements' : 'Internships'} &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. NOTICES & CAMPUS UTILITIES */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
          <div className="row g-5">
            {/* Notice Board */}
            <div className="col-lg-7">
              <div className="d-flex align-items-baseline justify-content-between mb-4 pb-2 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Placement Cell Notices</h2>
                  <p className="text-sm text-slate-500 mb-0">Official circulars, shortlists, and interview schedules.</p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onNavigate('announcements')}
                >
                  All Notices &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {topAnnouncements.map(notice => (
                  <div key={notice.id} className="portal-card p-3.5">
                    <div className="d-flex align-items-center justify-content-between text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {notice.category}
                      </span>
                      <span>{notice.datePosted}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{notice.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">{notice.content}</p>
                    {notice.targetAudience && (
                      <div className="text-xs text-slate-500 font-medium">
                        Target: {notice.targetAudience}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Settled Calculators & Preparation Resources */}
            <div className="col-lg-5">
              <div className="portal-card p-4 bg-slate-50 border-slate-200 h-100 d-flex flex-column">
                <h3 className="text-base font-bold text-slate-900 mb-1">Candidate Utilities</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Tools to verify eligibility requirements and estimate compensation breakdown.
                </p>

                <div className="space-y-2.5 mb-4">
                  <div
                    className="p-3 bg-white rounded border border-slate-200 cursor-pointer hover:border-slate-300 transition"
                    onClick={onOpenEligibility}
                  >
                    <div className="text-xs font-semibold text-slate-900 mb-0.5">Eligibility Checker</div>
                    <div className="text-xs text-slate-500">Verify your degree and CGPA criteria for open drives</div>
                  </div>

                  <div
                    className="p-3 bg-white rounded border border-slate-200 cursor-pointer hover:border-slate-300 transition"
                    onClick={() => onOpenSalaryCalc(5.5)}
                  >
                    <div className="text-xs font-semibold text-slate-900 mb-0.5">CTC & Take-Home Calculator</div>
                    <div className="text-xs text-slate-500">Estimate monthly in-hand compensation from LPA package</div>
                  </div>

                  <div
                    className="p-3 bg-white rounded border border-slate-200 cursor-pointer hover:border-slate-300 transition"
                    onClick={() => onNavigate('preparation')}
                  >
                    <div className="text-xs font-semibold text-slate-900 mb-0.5">Interview Preparation Guide</div>
                    <div className="text-xs text-slate-500">Aptitude formulas, technical viva questions, and interview tips</div>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-slate-200 text-xs text-slate-500">
                  <span>Questions about placements? Visit the Placement Office at Admin Block Room 204.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE PARTNERS DIRECTORY */}
      <section className="py-8 bg-slate-50">
        <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
          <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Recruiting Organizations</h2>
              <p className="text-sm text-slate-500 mb-0">Select corporate partners participating in annual hiring cycles.</p>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onNavigate('companies')}
            >
              All {companies.length} Companies &rarr;
            </button>
          </div>

          <div className="row g-3">
            {companies.slice(0, 8).map(company => (
              <div key={company.id} className="col-lg-3 col-md-4 col-sm-6">
                <div
                  className="portal-card p-3.5 h-100 cursor-pointer bg-white"
                  onClick={() => onOpenCompanyDetail(company)}
                >
                  <h3 className="text-sm font-semibold text-slate-900 mb-0.5 line-clamp-1">{company.name}</h3>
                  <div className="text-xs text-slate-500 mb-2">{company.industry}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {company.description}
                  </p>
                  <div className="mt-auto pt-2 border-t border-slate-100 d-flex justify-content-between text-xs text-slate-400">
                    <span>{company.location.split('/')[0]}</span>
                    <span className="text-slate-700 font-medium">Profile &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

