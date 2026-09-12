import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  const { registerStudent, studentLoginWithCredentials, adminLoginWithCredentials, students } = useApp();

  const [authType, setAuthType] = useState<'student' | 'admin'>('student');
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Student Register Form Fields
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCourse, setRegCourse] = useState('BCA (Bachelor of Computer Applications)');
  const [regYear, setRegYear] = useState('3rd Year (Semester VI)');
  const [regCgpa, setRegCgpa] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Student Login Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin Login Fields
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Feedback & Validation messages
  const [feedback, setFeedback] = useState<{ type: 'danger' | 'success'; text: string } | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setFeedback(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleQuickStudentSelect = (student: typeof students[0]) => {
    setLoginIdentifier(student.rollNumber);
    setLoginPassword('password123');
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!loginIdentifier.trim()) {
      setFeedback({ type: 'danger', text: 'Please enter your Roll Number or Registered Email.' });
      return;
    }

    const res = studentLoginWithCredentials(loginIdentifier, loginPassword);
    if (res.success) {
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      }, 500);
    } else {
      setFeedback({ type: 'danger', text: res.message });
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!adminUsername.trim()) {
      setFeedback({ type: 'danger', text: 'Please enter admin username.' });
      return;
    }

    const res = adminLoginWithCredentials(adminUsername, adminPassword);
    if (res.success) {
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      }, 500);
    } else {
      setFeedback({ type: 'danger', text: res.message });
    }
  };

  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validation
    if (!regName.trim() || !regRoll.trim() || !regEmail.trim() || !regPhone.trim()) {
      setFeedback({ type: 'danger', text: 'All required profile fields must be filled.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setFeedback({ type: 'danger', text: 'Please enter a valid email address.' });
      return;
    }

    const cgpaNum = parseFloat(regCgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setFeedback({ type: 'danger', text: 'CGPA must be a valid number between 0.0 and 10.0.' });
      return;
    }

    if (regPassword.length < 4) {
      setFeedback({ type: 'danger', text: 'Password must be at least 4 characters long.' });
      return;
    }

    const result = registerStudent({
      name: regName.trim(),
      rollNumber: regRoll.trim().toUpperCase(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      course: regCourse,
      year: regYear,
      cgpa: cgpaNum,
      skills: ['HTML', 'CSS', 'JavaScript', 'Python']
    });

    if (result.success) {
      setFeedback({ type: 'success', text: result.message });
      setTimeout(() => {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      }, 800);
    } else {
      setFeedback({ type: 'danger', text: result.message });
    }
  };

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1055 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white px-4 py-3">
            <div className="d-flex align-items-center gap-2">
              <i className={`bi ${authType === 'admin' ? 'bi-shield-lock-fill text-warning' : 'bi-person-circle text-primary'} fs-5`}></i>
              <h5 className="modal-title fw-bold">
                {authType === 'admin'
                  ? 'Placement Cell Admin Authentication'
                  : mode === 'login'
                  ? 'Student Portal Login'
                  : 'New Student Registration'}
              </h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>

          <div className="modal-body p-4">
            {/* Top Switcher: Student vs Admin */}
            <div className="d-flex justify-content-center mb-3">
              <div className="btn-group p-1 bg-light rounded-pill border" role="group">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${authType === 'student' ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}
                  onClick={() => {
                    setAuthType('student');
                    setFeedback(null);
                  }}
                >
                  <i className="bi bi-mortarboard-fill me-1"></i> Student Portal
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${authType === 'admin' ? 'btn-dark shadow-sm' : 'btn-light text-muted'}`}
                  onClick={() => {
                    setAuthType('admin');
                    setMode('login');
                    setFeedback(null);
                  }}
                >
                  <i className="bi bi-shield-shaded me-1"></i> Admin / TPO
                </button>
              </div>
            </div>

            {/* Alert / Feedback message */}
            {feedback && (
              <div className={`alert alert-${feedback.type} py-2 px-3 small d-flex align-items-center gap-2 mb-3`} role="alert">
                <i className={`bi ${feedback.type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'}`}></i>
                <div>{feedback.text}</div>
              </div>
            )}

            {/* STUDENT SECTION */}
            {authType === 'student' && (
              <div>
                {/* Tabs: Login vs Register */}
                <ul className="nav nav-pills nav-fill mb-3 bg-light p-1 rounded">
                  <li className="nav-item">
                    <button
                      className={`nav-link py-1.5 fw-semibold small ${mode === 'login' ? 'active' : 'text-dark'}`}
                      onClick={() => { setMode('login'); setFeedback(null); }}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i> Existing Student Sign In
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link py-1.5 fw-semibold small ${mode === 'register' ? 'active' : 'text-dark'}`}
                      onClick={() => { setMode('register'); setFeedback(null); }}
                    >
                      <i className="bi bi-person-plus me-1"></i> Register New Student
                    </button>
                  </li>
                </ul>

                {mode === 'login' ? (
                  <div>
                    {/* Quick Demo Fillers */}
                    <div className="bg-light p-2.5 rounded border mb-3">
                      <div className="small fw-semibold text-secondary mb-1 d-flex align-items-center justify-content-between">
                        <span><i className="bi bi-lightning-charge-fill text-warning me-1"></i>Quick Demo Students:</span>
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>Click to autofill credentials</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1.5">
                        {students.slice(0, 3).map(s => (
                          <button
                            key={s.id}
                            type="button"
                            className="btn btn-outline-secondary btn-sm py-1 px-2 small bg-white"
                            onClick={() => handleQuickStudentSelect(s)}
                          >
                            <span className="fw-medium">{s.name}</span>
                            <span className="text-muted ms-1">({s.rollNumber})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleStudentLogin}>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Student ID / Roll Number or Email</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white"><i className="bi bi-person-badge"></i></span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. BCA2023045 or rohan.sharma@college.edu"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white"><i className="bi bi-key"></i></span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password (e.g. password123)"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold shadow-sm">
                        <i className="bi bi-box-arrow-in-right me-1.5"></i> Sign In to Student Portal
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Register Form */
                  <form onSubmit={handleStudentRegister}>
                    <div className="row g-2 mb-2">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Full Name *</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="e.g. Rahul Patil"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Student ID / Roll Number *</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="e.g. BCA2023150"
                          value={regRoll}
                          onChange={(e) => setRegRoll(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">College Email *</label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          placeholder="e.g. rahul.patil@college.edu"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Contact Phone *</label>
                        <input
                          type="tel"
                          className="form-control form-control-sm"
                          placeholder="e.g. +91 98111 22233"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Course *</label>
                        <select
                          className="form-select form-select-sm"
                          value={regCourse}
                          onChange={(e) => setRegCourse(e.target.value)}
                        >
                          <option value="BCA (Bachelor of Computer Applications)">BCA</option>
                          <option value="B.Sc Computer Science">B.Sc CS</option>
                          <option value="B.Sc Information Technology">B.Sc IT</option>
                          <option value="MCA (Master of Computer Applications)">MCA</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Year / Semester *</label>
                        <select
                          className="form-select form-select-sm"
                          value={regYear}
                          onChange={(e) => setRegYear(e.target.value)}
                        >
                          <option value="3rd Year (Semester VI)">3rd Year (Sem VI)</option>
                          <option value="3rd Year (Semester V)">3rd Year (Sem V)</option>
                          <option value="2nd Year (Semester IV)">2nd Year (Sem IV)</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Aggregate CGPA (0-10) *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          className="form-control form-control-sm"
                          placeholder="e.g. 7.85"
                          value={regCgpa}
                          onChange={(e) => setRegCgpa(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Create Password *</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        placeholder="Choose a password (min 4 characters)"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-success w-100 py-2 fw-semibold shadow-sm">
                      <i className="bi bi-person-check me-1.5"></i> Complete Registration & Access Portal
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ADMIN SECTION */}
            {authType === 'admin' && (
              <div>
                <div className="alert alert-info py-2 px-3 small mb-3">
                  <i className="bi bi-shield-lock me-1.5"></i>
                  <strong>Placement Officer Access:</strong> Manage recruiters, create drives, review student applicants, and update status.
                  <div className="mt-1 text-muted">Demo Credentials: Username: <code>admin</code> | Password: <code>admin123</code></div>
                </div>

                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Admin Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-person-gear"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-lock-fill"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold shadow-sm">
                    <i className="bi bi-shield-check me-1.5"></i> Log In to Placement Officer Panel
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="modal-footer bg-light px-4 py-2.5 justify-content-between">
            <span className="text-muted small">
              <i className="bi bi-mortarboard me-1"></i> Apex Institute BCA Placement Cell
            </span>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
