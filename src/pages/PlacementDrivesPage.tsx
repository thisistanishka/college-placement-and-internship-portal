import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlacementDrive } from '../types';
import { allCoursesList } from '../mockData';

interface PlacementDrivesPageProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const PlacementDrivesPage: React.FC<PlacementDrivesPageProps> = ({
  onNavigate,
  onOpenAuth
}) => {
  const { drives, currentRole, currentStudent, applyForOpportunity, hasStudentApplied } = useApp();

  const [filterCourse, setFilterCourse] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);

  const filteredDrives = drives.filter(d => {
    // Course filter
    if (filterCourse !== 'All') {
      const match = d.eligibleCourses.some(c => c.toLowerCase() === filterCourse.toLowerCase());
      if (!match) return false;
    }

    // Status filter
    if (filterStatus !== 'All' && d.status !== filterStatus) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = d.companyName.toLowerCase().includes(q) ||
        d.jobRole.toLowerCase().includes(q) ||
        d.venue.toLowerCase().includes(q) ||
        d.eligibleCourses.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const handleApply = (drive: PlacementDrive) => {
    if (currentRole !== 'student' || !currentStudent) {
      onOpenAuth('login');
      return;
    }
    applyForOpportunity('drive', drive.id);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span className="cursor-pointer hover:text-slate-900" onClick={() => onNavigate('home')}>Home</span>
              <span className="mx-1.5 text-slate-400">/</span>
              <span className="text-slate-700">Placement Drives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Campus Recruitment Drives Schedule
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Scheduled on-campus and virtual hiring assessments organized by the Central TPO Cell.
            </p>
          </div>

          <div className="mt-3 mt-sm-0">
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded">
              {drives.length} Drives Registered
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="portal-card p-4 mb-6 bg-white">
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-lg-4 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Search Drives</label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control text-xs"
                  placeholder="Company, position, venue..."
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
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Filter by Course</label>
              <select
                className="form-select text-xs"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="All">All Courses & Programs</option>
                {allCoursesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-lg-3 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Drive Status</label>
              <select
                className="form-select text-xs"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Registration Open">Registration Open</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Reset */}
            <div className="col-lg-2 col-md-6">
              <button
                className="btn btn-outline-primary btn-sm w-100 text-xs py-2"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCourse('All');
                  setFilterStatus('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Drives List */}
        {filteredDrives.length === 0 ? (
          <div className="portal-card p-10 text-center bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-1">No Placement Drives Found</h3>
            <p className="text-xs text-slate-500 mb-4">No campus drives match your current filter selection.</p>
            <button
              className="btn btn-primary btn-sm text-xs"
              onClick={() => {
                setFilterCourse('All');
                setFilterStatus('All');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredDrives.map((drive) => {
              const applied = currentStudent ? hasStudentApplied('drive', drive.id) : false;

              return (
                <div key={drive.id} className="col-lg-6">
                  <div className="portal-card p-5 h-100 bg-white d-flex flex-column">
                    {/* Top Row: Company & Status Badge */}
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded d-inline-block mb-1.5">
                          {drive.status}
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 mb-0.5">{drive.companyName}</h2>
                        <div className="text-xs font-medium text-slate-600">{drive.jobRole}</div>
                      </div>

                      <div className="text-end">
                        <div className="text-sm font-bold text-slate-900">
                          {drive.package}
                        </div>
                      </div>
                    </div>

                    {/* Drive Schedule Info */}
                    <div className="bg-slate-50 rounded border border-slate-100 p-3 text-xs text-slate-600 mb-3 space-y-1.5">
                      <div className="d-flex justify-content-between">
                        <span><strong className="text-slate-700">Date & Time:</strong> {drive.driveDate} ({drive.reportingTime})</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span><strong className="text-slate-700">Venue / Location:</strong> {drive.venue}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span><strong className="text-slate-700">Deadline:</strong> {drive.registrationDeadline}</span>
                      </div>
                    </div>

                    {/* Eligible Courses */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-slate-500 mb-1.5">Eligible Courses</div>
                      <div className="d-flex flex-wrap gap-1">
                        {drive.eligibleCourses.map(course => (
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

                    {/* Selection Process Overview */}
                    <div className="text-xs text-slate-500 mb-4 line-clamp-2">
                      <strong className="text-slate-700">Evaluation:</strong> {drive.selectionProcess}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-auto pt-3 border-t border-slate-100 d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm py-1 px-3 text-xs"
                        onClick={() => setSelectedDrive(drive)}
                      >
                        Drive Specifics
                      </button>

                      {drive.status === 'Registration Open' && (
                        applied ? (
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                            <i className="bi bi-check me-1"></i> Registered
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm py-1 px-3.5 text-xs"
                            onClick={() => handleApply(drive)}
                          >
                            Register for Drive
                          </button>
                        )
                      )}

                      {drive.status === 'Upcoming' && (
                        <span className="text-xs text-slate-500">
                          Registrations Opening Soon
                        </span>
                      )}

                      {drive.status === 'Completed' && (
                        <span className="text-xs text-slate-400">
                          Drive Concluded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Drive Modal */}
        {selectedDrive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden">
              <div className="d-flex align-items-center justify-content-between p-4 border-b border-slate-200 bg-slate-50">
                <div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded mr-2">
                    {selectedDrive.status}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 d-inline-block mb-0">
                    {selectedDrive.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none border-0 bg-transparent p-1"
                  onClick={() => setSelectedDrive(null)}
                >
                  ×
                </button>
              </div>

              <div className="p-4 space-y-4 text-xs">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Designation</div>
                      <div className="text-sm font-semibold text-slate-900">{selectedDrive.jobRole}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="text-slate-500 mb-0.5">Annual CTC Package</div>
                      <div className="text-sm font-bold text-slate-900">{selectedDrive.package}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Drive Logistics</h4>
                  <div className="space-y-1.5 p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="d-flex justify-content-between">
                      <span className="text-slate-500">Date:</span>
                      <span className="font-medium text-slate-800">{selectedDrive.driveDate}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-slate-500">Reporting Time:</span>
                      <span className="font-medium text-slate-800">{selectedDrive.reportingTime}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-slate-500">Venue / Platform:</span>
                      <span className="font-medium text-slate-800">{selectedDrive.venue}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-slate-500">Registration Deadline:</span>
                      <span className="font-medium text-slate-800">{selectedDrive.registrationDeadline}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Selection Rounds</h4>
                  <p className="text-slate-600 leading-relaxed mb-0 p-3 bg-slate-50 rounded border border-slate-100">
                    {selectedDrive.selectionProcess}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1.5">Eligible Programs</h4>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedDrive.eligibleCourses.map(c => (
                      <span key={c} className="badge-course">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedDrive.description && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Additional Instructions</h4>
                    <p className="text-slate-600 leading-relaxed mb-0">{selectedDrive.description}</p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                  onClick={() => setSelectedDrive(null)}
                >
                  Close
                </button>
                {selectedDrive.status === 'Registration Open' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm text-xs py-1.5 px-4"
                    onClick={() => {
                      handleApply(selectedDrive);
                      setSelectedDrive(null);
                    }}
                  >
                    Confirm Registration
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

