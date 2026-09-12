import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface AuthPortalPageProps {
  onNavigate: (page: string) => void;
  initialTab?: 'student-login' | 'student-register' | 'admin-login';
}

export const AuthPortalPage: React.FC<AuthPortalPageProps> = ({
  onNavigate,
  initialTab = 'student-login'
}) => {
  const {
    currentRole,
    currentStudent,
    currentAdmin,
    logout,
    students,
    studentLoginWithCredentials,
    adminLoginWithCredentials,
    registerStudent,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student-login' | 'student-register' | 'admin-login'>(initialTab);

  // Student Login State
  const [studentRollOrEmail, setStudentRollOrEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Student Registration State
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCourse, setRegCourse] = useState('BCA (Bachelor of Computer Applications)');
  const [regYear, setRegYear] = useState('3rd Year (Semester VI)');
  const [regCgpa, setRegCgpa] = useState('');
  const [regSkills, setRegSkills] = useState('Python, SQL, HTML/CSS');
  const [regPassword, setRegPassword] = useState('');

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Error/Feedback message
  const [feedback, setFeedback] = useState<{ type: 'danger' | 'success'; text: string } | null>(null);

  // Quick 1-click student fill
  const handleQuickStudentSelect = (student: typeof students[0]) => {
    setStudentRollOrEmail(student.rollNumber);
    setStudentPassword('password123');
    setFeedback({
      type: 'success',
      text: `Loaded credentials for ${student.name} (${student.rollNumber}). Click 'Sign In' to proceed.`
    });
  };

  // Student Login Submit
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!studentRollOrEmail.trim()) {
      setFeedback({ type: 'danger', text: 'Please enter your Roll Number or Registered Email.' });
      return;
    }

    const res = studentLoginWithCredentials(studentRollOrEmail, studentPassword);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'Login Successful',
        message: res.message
      });
      onNavigate('student-dashboard');
    } else {
      setFeedback({ type: 'danger', text: res.message });
      showToast({
        type: 'danger',
        title: 'Authentication Failed',
        message: res.message
      });
    }
  };

  // Student Register Submit
  const handleStudentRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!regName.trim() || !regRoll.trim() || !regEmail.trim() || !regPhone.trim()) {
      setFeedback({ type: 'danger', text: 'Please fill in all mandatory fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setFeedback({ type: 'danger', text: 'Please enter a valid email address.' });
      return;
    }

    const cgpaNum = parseFloat(regCgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setFeedback({ type: 'danger', text: 'Cumulative CGPA must be a valid number between 0.0 and 10.0.' });
      return;
    }

    if (regPassword.length < 4) {
      setFeedback({ type: 'danger', text: 'Password must be at least 4 characters long.' });
      return;
    }

    const skillsArray = regSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const res = registerStudent({
      name: regName.trim(),
      rollNumber: regRoll.trim().toUpperCase(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      course: regCourse,
      year: regYear,
      cgpa: cgpaNum,
      skills: skillsArray.length > 0 ? skillsArray : ['Python', 'Database Management'],
      resumeLink: `https://placement.apex.edu/resumes/${regRoll.trim().toLowerCase()}.pdf`
    });

    if (res.success) {
      // Auto login
      studentLoginWithCredentials(regRoll.trim().toUpperCase(), regPassword);
      showToast({
        type: 'success',
        title: 'Registration Complete!',
        message: `Welcome to the portal, ${regName}!`
      });
      onNavigate('student-dashboard');
    } else {
      setFeedback({ type: 'danger', text: res.message });
    }
  };

  // Admin Login Submit
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!adminUsername.trim()) {
      setFeedback({ type: 'danger', text: 'Please enter your Admin username.' });
      return;
    }

    const res = adminLoginWithCredentials(adminUsername, adminPassword);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'TPO Admin Access Granted',
        message: res.message
      });
      onNavigate('admin-dashboard');
    } else {
      setFeedback({ type: 'danger', text: res.message });
      showToast({
        type: 'danger',
        title: 'Login Error',
        message: res.message
      });
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Simple & Clear Header */}
        <div className="text-center mb-6">
          <div className="text-xs text-slate-500 font-medium mb-1">
            Institutional Placement & Career Services Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Authentication & Registration
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto mb-0 leading-relaxed">
            Authorized sign-in and candidate profile registration for enrolled students across all academic departments and Placement Cell administrators.
          </p>
        </div>

        {/* Already Logged In Banner */}
        {currentRole !== 'guest' && (
          <div className="portal-card p-4 mb-6 bg-white d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3 text-center text-sm-start">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Signed in as {currentRole === 'admin' ? 'TPO Officer (Administrator)' : currentStudent?.name}
                </div>
                <div className="text-xs text-slate-500">
                  {currentRole === 'admin' ? currentAdmin?.email : `Roll No: ${currentStudent?.rollNumber} • CGPA: ${currentStudent?.cgpa}`}
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm text-xs py-1.5 px-3"
                onClick={() => onNavigate(currentRole === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
              >
                Go to Dashboard
              </button>
              <button
                className="btn btn-outline-primary btn-sm text-xs py-1.5 px-3"
                onClick={() => {
                  logout();
                  setFeedback({ type: 'success', text: 'You have been signed out successfully.' });
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Portal Card */}
        <div className="portal-card bg-white overflow-hidden mb-6">
          {/* Clear Segmented Tabs */}
          <div className="border-b border-slate-200 bg-slate-50 p-2 d-flex gap-1">
            <button
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                activeTab === 'student-login'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
              onClick={() => {
                setActiveTab('student-login');
                setFeedback(null);
              }}
            >
              Student Login
            </button>

            <button
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                activeTab === 'student-register'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
              onClick={() => {
                setActiveTab('student-register');
                setFeedback(null);
              }}
            >
              New Registration
            </button>

            <button
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                activeTab === 'admin-login'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
              onClick={() => {
                setActiveTab('admin-login');
                setFeedback(null);
              }}
            >
              TPO Admin
            </button>
          </div>

          <div className="p-6">
            {/* Feedback Alert */}
            {feedback && (
              <div className={`p-3 rounded text-xs mb-5 d-flex align-items-center justify-content-between ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <span>{feedback.text}</span>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 border-0 bg-transparent text-sm leading-none ml-2"
                  onClick={() => setFeedback(null)}
                >
                  ×
                </button>
              </div>
            )}

            {/* TAB 1: STUDENT LOGIN */}
            {activeTab === 'student-login' && (
              <div className="row g-5 align-items-start">
                <div className="col-lg-7">
                  <div className="mb-4">
                    <h2 className="text-base font-bold text-slate-900 mb-1">Student Portal Access</h2>
                    <p className="text-xs text-slate-500 mb-0">
                      Sign in using your institutional roll number or registered student email.
                    </p>
                  </div>

                  <form onSubmit={handleStudentLoginSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1 d-block">
                        Roll Number or Email
                      </label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        placeholder="e.g. BCA2024-001 or rahul@apex.edu"
                        value={studentRollOrEmail}
                        onChange={e => setStudentRollOrEmail(e.target.value)}
                        required
                      />
                      <div className="text-[11px] text-slate-400 mt-1">
                        Accepts official Roll Number or college email.
                      </div>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="text-xs font-semibold text-slate-700 mb-0">
                          Password
                        </label>
                        <span className="text-[11px] text-slate-400">
                          Default: <code>password123</code>
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type={showStudentPassword ? 'text' : 'password'}
                          className="form-control text-xs pr-10"
                          placeholder="Enter account password"
                          value={studentPassword}
                          onChange={e => setStudentPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 border-0 bg-transparent text-xs"
                          onClick={() => setShowStudentPassword(!showStudentPassword)}
                        >
                          {showStudentPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 text-xs py-2 mt-2"
                    >
                      Sign In to Account
                    </button>

                    <div className="text-center text-xs text-slate-500 pt-2">
                      New student without an account?{' '}
                      <button
                        type="button"
                        className="text-slate-900 font-semibold p-0 border-0 bg-transparent underline hover:text-slate-700"
                        onClick={() => {
                          setActiveTab('student-register');
                          setFeedback(null);
                        }}
                      >
                        Register profile
                      </button>
                    </div>
                  </form>
                </div>

                {/* 1-Click Demo Profiles Column */}
                <div className="col-lg-5">
                  <div className="p-4 rounded border border-slate-200 bg-slate-50">
                    <div className="text-xs font-bold text-slate-900 mb-1">Quick-Fill Demo Profiles</div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Select a pre-registered candidate to inspect the applicant experience:
                    </p>

                    <div className="space-y-2">
                      {students.slice(0, 3).map(student => (
                        <button
                          key={student.id}
                          type="button"
                          className="w-full text-start p-2.5 rounded border border-slate-200 bg-white hover:border-slate-300 d-flex justify-content-between align-items-center transition-colors"
                          onClick={() => handleQuickStudentSelect(student)}
                        >
                          <div>
                            <div className="text-xs font-semibold text-slate-900">{student.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {student.rollNumber} • {student.course.split(' ')[0]}
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            {student.cgpa} CGPA
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-400">
                      All records synchronize with the active database session.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STUDENT REGISTRATION */}
            {activeTab === 'student-register' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-base font-bold text-slate-900 mb-1">New Candidate Registration</h2>
                  <p className="text-xs text-slate-500 mb-0">
                    Create your university placement account. Profile data will be checked against job drive eligibility cutoffs.
                  </p>
                </div>

                <form onSubmit={handleStudentRegisterSubmit}>
                  <div className="row g-3 text-xs">
                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        placeholder="e.g. Ananya Sharma"
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        placeholder="e.g. BCA2024-006"
                        value={regRoll}
                        onChange={e => setRegRoll(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        College Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control text-xs"
                        placeholder="ananya@apex.edu"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control text-xs"
                        placeholder="+91 98765 43210"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="font-semibold text-slate-700 mb-1 d-block">Course / Degree</label>
                      <select
                        className="form-select text-xs"
                        value={regCourse}
                        onChange={e => setRegCourse(e.target.value)}
                      >
                        <option value="B.Tech (Computer Science & Engineering)">B.Tech (Computer Science & Engineering)</option>
                        <option value="BCA (Bachelor of Computer Applications)">BCA (Bachelor of Computer Applications)</option>
                        <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                        <option value="BBA (Bachelor of Business Administration)">BBA (Bachelor of Business Administration)</option>
                        <option value="MBA (Master of Business Administration)">MBA (Master of Business Administration)</option>
                        <option value="B.Com (Honours)">B.Com (Honours)</option>
                        <option value="B.Sc (Data Science / Information Technology)">B.Sc (Data Science / Information Technology)</option>
                        <option value="BA (Economics / Journalism)">BA (Economics / Journalism)</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="font-semibold text-slate-700 mb-1 d-block">Year & Semester</label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        value={regYear}
                        onChange={e => setRegYear(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Cumulative CGPA (0 - 10)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        className="form-control text-xs"
                        placeholder="e.g. 8.45"
                        value={regCgpa}
                        onChange={e => setRegCgpa(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Key Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        placeholder="e.g. Python, SQL, React, Java, Git"
                        value={regSkills}
                        onChange={e => setRegSkills(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="font-semibold text-slate-700 mb-1 d-block">
                        Create Password
                      </label>
                      <input
                        type="password"
                        className="form-control text-xs"
                        placeholder="At least 4 characters"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 text-xs py-2"
                    >
                      Complete Registration
                    </button>
                  </div>

                  <div className="text-center mt-3 text-xs text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      className="text-slate-900 font-semibold p-0 border-0 bg-transparent underline hover:text-slate-700"
                      onClick={() => {
                        setActiveTab('student-login');
                        setFeedback(null);
                      }}
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: ADMIN / TPO LOGIN */}
            {activeTab === 'admin-login' && (
              <div className="row g-5 align-items-start">
                <div className="col-lg-7">
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      Administrative Control Access
                    </div>
                    <h2 className="text-base font-bold text-slate-900 mb-1">TPO Administration Login</h2>
                    <p className="text-xs text-slate-500 mb-0">
                      Sign in to manage recruitment drives, post circulars, review applicant pools, and update drive statuses.
                    </p>
                  </div>

                  <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1 d-block">
                        Administrator Username
                      </label>
                      <input
                        type="text"
                        className="form-control text-xs"
                        placeholder="e.g. admin"
                        value={adminUsername}
                        onChange={e => setAdminUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1 d-block">
                        Administrator Password
                      </label>
                      <div className="relative">
                        <input
                          type={showAdminPassword ? 'text' : 'password'}
                          className="form-control text-xs pr-10"
                          placeholder="Enter admin password"
                          value={adminPassword}
                          onChange={e => setAdminPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 border-0 bg-transparent text-xs"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                        >
                          {showAdminPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 text-xs py-2 mt-2"
                    >
                      Authenticate Administrator
                    </button>
                  </form>
                </div>

                {/* TPO Credentials Card */}
                <div className="col-lg-5">
                  <div className="p-4 rounded border border-slate-200 bg-slate-50">
                    <div className="text-xs font-bold text-slate-900 mb-1">Pre-Configured Administrative Access</div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Default credentials for committee evaluation and administrative audit:
                    </p>

                    <div className="bg-white p-3 rounded border border-slate-200 mb-3 text-xs space-y-1.5">
                      <div className="d-flex justify-content-between">
                        <span className="text-slate-500">Username:</span>
                        <strong className="text-slate-900">admin</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-slate-500">Password:</span>
                        <strong className="text-slate-900">admin123</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-slate-500">Authority:</span>
                        <span className="font-semibold text-slate-700">TPO Coordinator</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm w-100 text-xs py-1.5"
                      onClick={() => {
                        setAdminUsername('admin');
                        setAdminPassword('admin123');
                        setFeedback({
                          type: 'success',
                          text: 'Loaded credentials (admin / admin123). Click Authenticate Administrator.'
                        });
                      }}
                    >
                      Fill Administrator Credentials
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Return Link */}
        <div className="text-center">
          <button
            className="text-xs text-slate-500 hover:text-slate-800 p-0 border-0 bg-transparent underline"
            onClick={() => onNavigate('home')}
          >
            Return to Portal Overview
          </button>
        </div>
      </div>
    </div>
  );
};
