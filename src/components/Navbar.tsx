import React from 'react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onOpenProjectCode: () => void;
  onOpenEligibility: () => void;
  onOpenSalaryCalc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenProjectCode,
  onOpenEligibility,
  onOpenSalaryCalc
}) => {
  const { currentRole, currentStudent, currentAdmin, logout, loginAsStudent, loginAsAdmin, students, applications, bookmarks } = useApp();

  const studentAppCount = currentStudent
    ? applications.filter(a => a.studentId === currentStudent.id).length
    : 0;

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-white sticky-top border-bottom border-slate-200 py-2.5">
      <div className="container-fluid px-3 px-lg-5">
        {/* Brand / Institutional Identity */}
        <button
          className="navbar-brand d-flex align-items-center gap-3 border-0 bg-transparent p-0 text-start"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-slate-900 text-white rounded d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
            <i className="bi bi-mortarboard text-white" style={{ fontSize: '1.1rem' }}></i>
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm tracking-tight leading-tight">
              Placement & Career Cell
            </div>
            <div className="text-slate-500 text-xs leading-none mt-0.5">
              Central University Portal
            </div>
          </div>
        </button>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-slate-200 p-1.5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPlacementNav"
          aria-controls="navbarPlacementNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ width: '1.2rem', height: '1.2rem' }}></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarPlacementNav">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0 ms-xl-4 gap-1">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'home' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('home')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'placements' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('placements')}
              >
                Placements
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'internships' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('internships')}
              >
                Internships
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'drives' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('drives')}
              >
                Drives
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'companies' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('companies')}
              >
                Companies
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'announcements' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('announcements')}
              >
                Notices
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                  currentPage === 'preparation' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onNavigate('preparation')}
              >
                Preparation
              </button>
            </li>

            {/* Role-specific Dashboard shortcut */}
            {currentRole === 'student' && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm position-relative ${
                    currentPage === 'student-dashboard' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-700 font-medium'
                  }`}
                  onClick={() => onNavigate('student-dashboard')}
                >
                  Dashboard
                  {studentAppCount > 0 && (
                    <span className="badge bg-slate-800 text-white rounded-full ms-1.5 text-xs py-0.5 px-1.5">
                      {studentAppCount}
                    </span>
                  )}
                </button>
              </li>
            )}

            {currentRole === 'admin' && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none px-3 py-1.5 rounded text-sm ${
                    currentPage === 'admin-dashboard' ? 'text-slate-900 font-semibold bg-slate-100' : 'text-slate-700 font-medium'
                  }`}
                  onClick={() => onNavigate('admin-dashboard')}
                >
                  Admin Panel
                </button>
              </li>
            )}
          </ul>

          {/* Right Controls */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-xl-0">
            {/* Quick Tools Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary btn-sm py-1.5 px-2.5 text-xs rounded d-flex align-items-center gap-1.5"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-sliders2 text-slate-500"></i>
                <span>Calculators</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm p-1 border-slate-200" style={{ minWidth: '200px' }}>
                <li>
                  <button
                    type="button"
                    className="dropdown-item text-xs py-2 px-3 rounded"
                    onClick={onOpenEligibility}
                  >
                    <div className="font-semibold text-slate-800">Eligibility Checker</div>
                    <div className="text-slate-500">Test CGPA & course criteria</div>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item text-xs py-2 px-3 rounded"
                    onClick={onOpenSalaryCalc}
                  >
                    <div className="font-semibold text-slate-800">CTC & In-Hand Pay</div>
                    <div className="text-slate-500">Monthly breakdown estimator</div>
                  </button>
                </li>
                <li><hr className="dropdown-divider my-1" /></li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item text-xs py-2 px-3 rounded text-slate-600"
                    onClick={onOpenProjectCode}
                  >
                    <div className="font-semibold text-slate-700">Project Code & Viva</div>
                    <div className="text-slate-400">Database schema & guide</div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Shortlist Counter if any */}
            {bookmarks.length > 0 && (
              <button
                className="btn btn-outline-primary btn-sm py-1.5 px-2.5 text-xs rounded d-flex align-items-center gap-1"
                onClick={() => {
                  if (currentRole === 'student' && currentStudent) {
                    onNavigate('student-dashboard');
                  } else {
                    onNavigate('placements');
                  }
                }}
                title={`${bookmarks.length} Saved Opportunities`}
              >
                <i className="bi bi-bookmark-fill text-amber-500"></i>
                <span className="font-medium text-slate-700">{bookmarks.length}</span>
              </button>
            )}

            {/* Switch Demo Role Menu (Subtle & Clean) */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary btn-sm dropdown-toggle py-1.5 px-2.5 text-xs rounded d-flex align-items-center gap-1 text-slate-700"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Switch role for demonstration"
              >
                <i className="bi bi-person text-slate-500"></i>
                <span>Role:</span>
                <span className="font-semibold text-slate-900">
                  {currentRole === 'admin'
                    ? 'TPO Admin'
                    : currentRole === 'student' && currentStudent
                    ? `${currentStudent.name.split(' ')[0]} (${currentStudent.course})`
                    : 'Guest'}
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm p-1 border-slate-200" style={{ minWidth: '240px' }}>
                <li className="px-3 py-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Sample Students
                </li>
                {students.map(s => (
                  <li key={s.id}>
                    <button
                      className={`dropdown-item text-xs d-flex justify-content-between align-items-center py-2 px-3 rounded ${
                        currentRole === 'student' && currentStudent?.id === s.id ? 'bg-slate-100 font-semibold' : ''
                      }`}
                      onClick={() => {
                        loginAsStudent(s.id);
                        onNavigate('student-dashboard');
                      }}
                    >
                      <div>
                        <div className="text-slate-800">{s.name}</div>
                        <div className="text-slate-400 text-xs">{s.course} • CGPA {s.cgpa}</div>
                      </div>
                      <span className="badge bg-slate-100 text-slate-600 border border-slate-200">{s.course}</span>
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider my-1" /></li>
                <li className="px-3 py-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Administration
                </li>
                <li>
                  <button
                    className={`dropdown-item text-xs py-2 px-3 rounded ${
                      currentRole === 'admin' ? 'bg-slate-100 font-semibold' : ''
                    }`}
                    onClick={() => {
                      loginAsAdmin();
                      onNavigate('admin-dashboard');
                    }}
                  >
                    <div className="text-slate-800">Dr. Rajesh Varma</div>
                    <div className="text-slate-400 text-xs">Training & Placement Officer (TPO)</div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Authentication Action */}
            {currentRole === 'guest' ? (
              <button
                className="btn btn-primary btn-sm py-1.5 px-3 text-xs rounded font-medium"
                onClick={() => onNavigate('auth')}
              >
                Sign In
              </button>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-primary btn-sm dropdown-toggle py-1.5 px-3 text-xs rounded font-medium"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>{currentRole === 'admin' ? 'TPO Admin' : currentStudent?.name.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-slate-200 p-1">
                  <li className="px-3 py-2 bg-slate-50 rounded mb-1 border border-slate-200">
                    <div className="font-semibold text-xs text-slate-900">
                      {currentRole === 'admin' ? currentAdmin?.role : currentStudent?.name}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {currentRole === 'admin' ? currentAdmin?.email : `${currentStudent?.course} • Roll: ${currentStudent?.rollNumber}`}
                    </div>
                  </li>
                  {currentRole === 'student' && (
                    <li>
                      <button
                        className="dropdown-item text-xs py-1.5 rounded"
                        onClick={() => onNavigate('student-dashboard')}
                      >
                        Student Dashboard
                      </button>
                    </li>
                  )}
                  {currentRole === 'admin' && (
                    <li>
                      <button
                        className="dropdown-item text-xs py-1.5 rounded"
                        onClick={() => onNavigate('admin-dashboard')}
                      >
                        Admin Management Panel
                      </button>
                    </li>
                  )}
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <button
                      className="dropdown-item text-xs text-rose-600 py-1.5 rounded"
                      onClick={() => {
                        logout();
                        onNavigate('home');
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

