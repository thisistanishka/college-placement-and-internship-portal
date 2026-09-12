import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { StatusTracker } from '../components/StatusTracker';
import { Application } from '../types';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenCompanyDetail?: (company: any) => void;
  onOpenSalaryCalc?: (lpa?: number) => void;
  onOpenEligibility?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenCompanyDetail,
  onOpenSalaryCalc,
  onOpenEligibility
}) => {
  const {
    currentStudent,
    updateStudentProfile,
    applications,
    placements,
    internships,
    hasStudentApplied,
    applyForOpportunity,
    showToast
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'placement' | 'internship'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Edit profile form state
  const [editCgpa, setEditCgpa] = useState<number>(currentStudent?.cgpa || 7.5);
  const [editPhone, setEditPhone] = useState<string>(currentStudent?.phone || '');
  const [editSkills, setEditSkills] = useState<string>(currentStudent?.skills?.join(', ') || '');
  const [editResume, setEditResume] = useState<string>(currentStudent?.resumeUrl || '');

  if (!currentStudent) {
    return (
      <div className="container py-5 text-center bg-white">
        <div className="card portal-card p-5 max-w-lg mx-auto border">
          <div className="display-4 text-sky-dark mb-3"><i className="bi bi-shield-lock-fill"></i></div>
          <h3 className="fw-bold text-navy-primary mb-2 font-outfit">Student Sign-In Required</h3>
          <p className="text-muted small mb-4">
            Please log in with your university Roll Number or Email to view your personal placement dashboard, track application stages, and access interview call letters.
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button className="btn btn-primary px-4 py-2" onClick={() => onNavigate('auth')}>
              <i className="bi bi-box-arrow-in-right me-1.5"></i> Student Portal Sign In
            </button>
            <button className="btn btn-outline-secondary px-3 py-2" onClick={() => onOpenAuth('login')}>
              Quick Sign In Modal
            </button>
          </div>
        </div>
      </div>
    );
  }

  const myApplications = applications.filter(a => a.studentId === currentStudent.id);
  const filteredApplications = myApplications.filter(a => {
    if (filterType === 'all') return true;
    return a.opportunityType === filterType;
  });

  // Recommended opportunities matching student course & CGPA
  const eligiblePlacements = placements.filter(
    p => p.status === 'Active' &&
      p.eligibleCourses.some(c => c.toLowerCase() === currentStudent.course.toLowerCase()) &&
      currentStudent.cgpa >= p.requiredCgpa &&
      !hasStudentApplied('placement', p.id)
  );

  // Quick Stats
  const totalApplied = myApplications.length;
  const totalShortlisted = myApplications.filter(a => a.status === 'Shortlisted').length;
  const totalInterviews = myApplications.filter(a => a.status === 'Interview').length;
  const totalOffers = myApplications.filter(a => a.status === 'Selected').length;

  // Upcoming Interviews
  const upcomingInterviews = myApplications.filter(a => a.status === 'Interview' && a.interviewDate);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = editSkills.split(',').map(s => s.trim()).filter(Boolean);
    updateStudentProfile({
      cgpa: editCgpa,
      phone: editPhone,
      skills: skillsArray,
      resumeUrl: editResume
    });
    setIsEditProfileOpen(false);
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your student academic profile and contact details have been updated.'
    });
  };

  return (
    <div className="container-fluid px-4 px-lg-5 py-4 bg-white">
      {/* 1. STUDENT PROFILE SUMMARY BANNER */}
      <div className="portal-card bg-white p-4 mb-4">
        <div className="row align-items-center g-3">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-lg bg-slate-100 text-slate-800 font-bold d-flex align-items-center justify-content-center flex-shrink-0 border border-slate-200 text-xl"
                style={{ width: '48px', height: '48px' }}
              >
                {currentStudent.name.charAt(0)}
              </div>

              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-slate-900 mb-0">{currentStudent.name}</h2>
                  <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                    {currentStudent.rollNumber}
                  </span>
                  <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                    Enrolled
                  </span>
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  <span>Program: <strong className="text-slate-800">{currentStudent.course}</strong></span> •
                  <span className="ms-1">Dept: {currentStudent.department}</span> •
                  <span className="ms-1">{currentStudent.year} ({currentStudent.semester})</span>
                </div>

                <div className="text-xs text-slate-500 mt-1 d-flex flex-wrap gap-3">
                  <span><i className="bi bi-envelope text-slate-400 me-1"></i>{currentStudent.email}</span>
                  <span><i className="bi bi-telephone text-slate-400 me-1"></i>{currentStudent.phone}</span>
                  {currentStudent.resumeUrl && (
                    <a href={currentStudent.resumeUrl} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-slate-900 font-medium underline">
                      <i className="bi bi-file-earmark-pdf me-1"></i>Resume Dossier
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-lg-end">
            <div className="d-inline-flex flex-column align-items-lg-end p-3 rounded border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cumulative CGPA</div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">
                {currentStudent.cgpa.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ 10.0</span>
              </div>
              <button
                className="btn btn-outline-secondary btn-sm text-xs py-1 px-2.5 mt-2"
                onClick={() => {
                  setEditCgpa(currentStudent.cgpa);
                  setEditPhone(currentStudent.phone);
                  setEditSkills(currentStudent.skills?.join(', ') || '');
                  setEditResume(currentStudent.resumeUrl || '');
                  setIsEditProfileOpen(true);
                }}
              >
                <i className="bi bi-pencil me-1"></i> Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. QUICK STATS */}
      <div className="row g-3 mb-4">
        <div className="col-lg-3 col-sm-6">
          <div className="portal-card bg-white p-3.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Applied</div>
            <div className="text-2xl font-bold text-slate-900">{totalApplied}</div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="portal-card bg-white p-3.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Shortlisted</div>
            <div className="text-2xl font-bold text-slate-900">{totalShortlisted}</div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="portal-card bg-white p-3.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Interviews</div>
            <div className="text-2xl font-bold text-slate-900">{totalInterviews}</div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="portal-card bg-white p-3.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Final Offers</div>
            <div className="text-2xl font-bold text-slate-900">{totalOffers}</div>
          </div>
        </div>
      </div>

      {/* 3. UPCOMING INTERVIEWS NOTICE (if any) */}
      {upcomingInterviews.length > 0 && (
        <div className="portal-card p-3.5 mb-4 bg-amber-50/50 border border-amber-200">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-calendar-event text-amber-700"></i>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Scheduled Interview Alert</span>
          </div>
          <div className="d-flex flex-column gap-2">
            {upcomingInterviews.map(app => (
              <div key={app.id} className="p-3 bg-white rounded border border-amber-200/80 d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-xs font-bold text-slate-900">{app.roleTitle}</span>
                  <span className="text-xs text-slate-500 ms-1">at {app.companyName}</span>
                  {app.adminNotes && <div className="text-[11px] text-slate-500 mt-0.5">{app.adminNotes}</div>}
                </div>
                <span className="badge bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium">
                  {app.interviewDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. APPLICATION STATUS TRACKER */}
      <div className="portal-card bg-white p-4 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0">Application Tracking Pipeline</h3>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              Current recruitment review state for submitted job and internship opportunities
            </p>
          </div>

          {/* Filter tabs */}
          <div className="d-flex gap-1">
            <button
              className={`py-1 px-2.5 text-xs font-semibold rounded border ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              onClick={() => setFilterType('all')}
            >
              All ({myApplications.length})
            </button>
            <button
              className={`py-1 px-2.5 text-xs font-semibold rounded border ${
                filterType === 'placement'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              onClick={() => setFilterType('placement')}
            >
              Placements ({myApplications.filter(a => a.opportunityType === 'placement').length})
            </button>
            <button
              className={`py-1 px-2.5 text-xs font-semibold rounded border ${
                filterType === 'internship'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              onClick={() => setFilterType('internship')}
            >
              Internships ({myApplications.filter(a => a.opportunityType === 'internship').length})
            </button>
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-5 text-slate-400">
            <i className="bi bi-inbox fs-2 mb-2 d-block text-slate-300"></i>
            <h4 className="text-sm font-semibold text-slate-700">No applications on file</h4>
            <p className="text-xs text-slate-500 mb-3">Explore active placement drives and internships to apply.</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => onNavigate('placements')}>
                Browse Placement Drives
              </button>
              <button className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => onNavigate('internships')}>
                Browse Internships
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredApplications.map(app => (
              <div key={app.id} className="p-4 rounded-lg border border-slate-200 bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium text-capitalize">
                        {app.opportunityType}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mb-0">{app.roleTitle}</h4>
                      <span className="text-xs text-slate-500">at {app.companyName}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Applied: {app.appliedDate} • App ID: #{app.id}
                    </div>
                  </div>

                  <div>
                    <StatusBadge status={app.status} />
                  </div>
                </div>

                {/* 4-Stage Visual Status Pipeline */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200 mb-2">
                  <StatusTracker status={app.status} interviewDate={app.interviewDate} />
                </div>

                {app.adminNotes && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200 d-flex align-items-center gap-2">
                    <i className="bi bi-info-circle text-slate-400"></i>
                    <span><strong>T&P Officer Notes:</strong> {app.adminNotes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. RECOMMENDED OPPORTUNITIES */}
      <div className="portal-card bg-white p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0">
              Eligible Campus Drives ({currentStudent.course})
            </h3>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              Opportunities matching your academic discipline and CGPA requirement ({currentStudent.cgpa})
            </p>
          </div>
          <button className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => onNavigate('placements')}>
            View All Drives
          </button>
        </div>

        {eligiblePlacements.length === 0 ? (
          <p className="text-xs text-slate-500 mb-0">You have applied to all recommended opportunities or no new drives match your profile right now.</p>
        ) : (
          <div className="row g-3">
            {eligiblePlacements.slice(0, 3).map(p => (
              <div key={p.id} className="col-md-4">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-white h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                        {p.jobType}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {p.salaryPackage}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">{p.jobRole}</h4>
                    <div className="text-xs text-slate-500 mb-1">{p.companyName}</div>
                    <div className="text-[11px] text-slate-500 mb-3">Min CGPA: {p.requiredCgpa}</div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm w-100 text-xs py-1.5 font-medium"
                    onClick={() => {
                      const res = applyForOpportunity('placement', p.id);
                      showToast({
                        type: res.success ? 'success' : 'warning',
                        title: 'Application Status',
                        message: res.message
                      });
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-center">
              <h3 className="text-base font-bold text-slate-900 mb-0">
                Update Student Academic Profile
              </h3>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-lg leading-none" onClick={() => setIsEditProfileOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="p-5">
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic CGPA (Out of 10.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className="form-control text-xs"
                    value={editCgpa}
                    onChange={(e) => setEditCgpa(Number(e.target.value))}
                    required
                  />
                  <div className="text-[11px] text-slate-500 mt-1">Used to automatically validate recruitment cutoff criteria.</div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    className="form-control text-xs"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Technical Skills & Competencies</label>
                  <input
                    type="text"
                    className="form-control text-xs"
                    value={editSkills}
                    onChange={(e) => setEditSkills(e.target.value)}
                    placeholder="e.g. Python, SQL, Financial Modeling, React"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">Comma-separated key skills.</div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Resume Link (Google Drive / PDF)</label>
                  <input
                    type="url"
                    className="form-control text-xs"
                    value={editResume}
                    onChange={(e) => setEditResume(e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setIsEditProfileOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3 font-semibold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
