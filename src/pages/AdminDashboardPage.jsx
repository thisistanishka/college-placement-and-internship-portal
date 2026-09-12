import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Bell, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  Download
} from 'lucide-react';
import { 
  sampleStudentsAdmin, 
  sampleCompanies, 
  samplePlacements, 
  sampleInternships, 
  sampleApplications, 
  sampleAnnouncements 
} from '../data/mockData';
import { DashboardCard } from '../components/DashboardCard';

export function AdminDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [currentTab, setCurrentTab] = useState(initialTab);

  // Editable lists for Admin
  const [students, setStudents] = useState(sampleStudentsAdmin);
  const [companies, setCompanies] = useState(sampleCompanies);
  const [placements, setPlacements] = useState(samplePlacements);
  const [internships, setInternships] = useState(sampleInternships);
  const [applications, setApplications] = useState([
    { id: 1, studentName: 'Aarav Sharma', studentCourse: 'B.Tech', company: 'TCS', role: 'Graduate Software Engineer', status: 'Shortlisted' },
    { id: 2, studentName: 'Priya Patel', studentCourse: 'BCA', company: 'Microsoft', role: 'Software Engineering Intern', status: 'Interview' },
    { id: 3, studentName: 'Rohan Verma', studentCourse: 'BBA', company: 'Deloitte', role: 'Associate Analyst', status: 'Applied' },
    { id: 4, studentName: 'Ananya Gupta', studentCourse: 'B.Com', company: 'HDFC Bank', role: 'Management Trainee', status: 'Selected' },
    { id: 5, studentName: 'Vikram Singh', studentCourse: 'MBA', company: 'KPMG', role: 'Advisory Analyst', status: 'Interview' }
  ]);
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);

  // Modals / Simple Forms state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', studentId: '', course: 'B.Tech', department: 'CSE', cgpa: '8.0' });

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: 'IT & Software', location: 'Bengaluru', openingsCount: 1, description: '' });

  const [showAddPlacement, setShowAddPlacement] = useState(false);
  const [newPlacement, setNewPlacement] = useState({ company: '', jobRole: '', package: '₹6.0 LPA', requiredCgpa: 6.5, location: 'Hyderabad', eligibleCourses: ['B.Tech', 'BCA'] });

  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Urgent', description: '' });

  // Update application status
  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(applications.map((app) => app.id === appId ? { ...app, status: newStatus } : app));
  };

  // Add handlers
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.studentId) return;
    setStudents([...students, { ...newStudent, id: Date.now(), applicationsCount: 0, status: 'Active' }]);
    setShowAddStudent(false);
    setNewStudent({ name: '', studentId: '', course: 'B.Tech', department: 'CSE', cgpa: '8.0' });
    alert('Student registered successfully in TPO directory.');
  };

  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    if (!newCompany.name) return;
    setCompanies([...companies, { ...newCompany, id: Date.now() }]);
    setShowAddCompany(false);
    setNewCompany({ name: '', industry: 'IT & Software', location: 'Bengaluru', openingsCount: 1, description: '' });
    alert('Company added to campus recruiter directory.');
  };

  const handleAddNoticeSubmit = (e) => {
    e.preventDefault();
    if (!newNotice.title) return;
    setAnnouncements([{ ...newNotice, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...announcements]);
    setShowAddNotice(false);
    setNewNotice({ title: '', category: 'Urgent', description: '' });
    alert('Official announcement published to student notice boards.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
              Central TPO Administration
            </span>
            <span className="text-xs font-semibold text-sky-200">
              Academic Year 2025-2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            TPO Officer Control Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mt-1">
            Manage students across all streams, schedule placement drives, track candidate applications, and publish circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting full placement records report (CSV / Excel)...')}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Required */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Total Students */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">500+</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-0.5">Across 9 Courses</div>
        </div>

        {/* 2. Total Companies */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Companies</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">50+</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-0.5">Active Recruiters</div>
        </div>

        {/* 3. Total Placements */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Placements</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{placements.length}</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-0.5">Live Openings</div>
        </div>

        {/* 4. Total Internships */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Internships</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{internships.length}</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-0.5">Paid Stipends</div>
        </div>

        {/* 5. Total Applications */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Applications</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{applications.length * 15}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Submissions Tracked</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-1.5 rounded-xl border border-sky-100 shadow-xs flex flex-wrap gap-1">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'students', label: 'Manage Students' },
          { id: 'companies', label: 'Manage Companies' },
          { id: 'placements', label: 'Manage Placements' },
          { id: 'internships', label: 'Manage Internships' },
          { id: 'applications', label: 'Manage Applications' },
          { id: 'announcements', label: 'Manage Announcements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
              currentTab === tab.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Students */}
            <div className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Recent Student Registrations</h3>
                <button
                  onClick={() => setCurrentTab('students')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Manage All →
                </button>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {students.slice(0, 4).map((s) => (
                  <div key={s.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-slate-500">{s.studentId} • {s.course}</div>
                    </div>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {s.cgpa} CGPA
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Applications */}
            <div className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Recent Candidate Applications</h3>
                <button
                  onClick={() => setCurrentTab('applications')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Review All →
                </button>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{app.studentName} ({app.studentCourse})</div>
                      <div className="text-slate-500">{app.role} at {app.company}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MANAGE STUDENTS */}
      {currentTab === 'students' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Manage Registered Students</h3>
              <p className="text-xs text-slate-500">View and verify student profiles across all streams.</p>
            </div>
            <button
              onClick={() => setShowAddStudent(!showAddStudent)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Student</span>
            </button>
          </div>

          {showAddStudent && (
            <form onSubmit={handleAddStudentSubmit} className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-3">
              <h4 className="text-xs font-bold text-sky-900">New Student Form</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Student ID / Roll"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
                <select
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                >
                  {['B.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Com', 'B.Sc', 'BA', 'M.Tech'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="CGPA (e.g. 8.5)"
                  value={newStudent.cgpa}
                  onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-bold text-white bg-sky-600 rounded hover:bg-sky-700"
                >
                  Save Student
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Student ID</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">CGPA</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-sky-50/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{st.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{st.studentId}</td>
                    <td className="py-2.5 px-3 font-semibold text-sky-700">{st.course}</td>
                    <td className="py-2.5 px-3 text-slate-600">{st.department}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{st.cgpa}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {st.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Viewing full academic transcript of ${st.name}`)}
                        className="text-sky-600 hover:text-sky-800 font-semibold"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MANAGE COMPANIES */}
      {currentTab === 'companies' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recruiting Companies Directory</h3>
              <p className="text-xs text-slate-500">Corporate partners visiting for on-campus drives.</p>
            </div>
            <button
              onClick={() => setShowAddCompany(!showAddCompany)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recruiting Company</span>
            </button>
          </div>

          {showAddCompany && (
            <form onSubmit={handleAddCompanySubmit} className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-3">
              <h4 className="text-xs font-bold text-sky-900">New Company Profile</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Industry Domain"
                  value={newCompany.industry}
                  onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newCompany.location}
                  onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCompany(false)}
                  className="px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-bold text-white bg-sky-600 rounded hover:bg-sky-700"
                >
                  Register Recruiter
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Company Name</th>
                  <th className="py-2.5 px-3">Industry</th>
                  <th className="py-2.5 px-3">Headquarters / Location</th>
                  <th className="py-2.5 px-3">Openings</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((comp) => (
                  <tr key={comp.id} className="hover:bg-sky-50/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{comp.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{comp.industry}</td>
                    <td className="py-2.5 px-3 text-slate-600">{comp.location}</td>
                    <td className="py-2.5 px-3 font-bold text-sky-700">{comp.openingsCount || 2} Drives</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Editing recruitment profile for ${comp.name}`)}
                        className="text-sky-600 hover:text-sky-800 font-semibold"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: MANAGE PLACEMENTS */}
      {currentTab === 'placements' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Manage Placement Job Postings</h3>
              <p className="text-xs text-slate-500">Create, edit, and publish full-time recruitment drives.</p>
            </div>
            <button
              onClick={() => {
                const title = prompt('Enter Company and Role (e.g. Oracle - Cloud Developer):');
                if (title) {
                  setPlacements([
                    {
                      id: Date.now(),
                      company: title.split('-')[0]?.trim() || 'New Company',
                      jobRole: title.split('-')[1]?.trim() || 'Software Engineer',
                      package: '₹7.5 LPA',
                      requiredCgpa: 6.5,
                      location: 'Bengaluru',
                      lastDate: '2026-10-30',
                      jobType: 'Full-time',
                      eligibleCourses: ['B.Tech', 'BCA', 'MCA'],
                      description: 'On-campus placement drive for qualified final year students.'
                    },
                    ...placements
                  ]);
                  alert('Placement opening posted successfully!');
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Placement</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Job Role</th>
                  <th className="py-2.5 px-3">Package (CTC)</th>
                  <th className="py-2.5 px-3">Min CGPA</th>
                  <th className="py-2.5 px-3">Deadline</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placements.map((job) => (
                  <tr key={job.id} className="hover:bg-sky-50/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{job.company}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{job.jobRole}</td>
                    <td className="py-2.5 px-3 font-bold text-sky-700">{job.package}</td>
                    <td className="py-2.5 px-3 text-slate-600">{job.requiredCgpa}</td>
                    <td className="py-2.5 px-3 text-slate-500">{job.lastDate}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Reviewing applicants for ${job.jobRole} at ${job.company}`)}
                        className="text-sky-600 hover:text-sky-800 font-semibold"
                      >
                        Review Applicants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: MANAGE INTERNSHIPS */}
      {currentTab === 'internships' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Manage Internship Openings</h3>
              <p className="text-xs text-slate-500">Corporate summer and 6-month semester internship listings.</p>
            </div>
            <button
              onClick={() => {
                const title = prompt('Enter Company and Role (e.g. Adobe - UX Designer Intern):');
                if (title) {
                  setInternships([
                    {
                      id: Date.now(),
                      company: title.split('-')[0]?.trim() || 'New Recruiter',
                      internshipRole: title.split('-')[1]?.trim() || 'Graduate Intern',
                      stipend: '₹30,000 / mo',
                      duration: '3 Months',
                      location: 'Remote',
                      workMode: 'Remote',
                      lastDate: '2026-10-25',
                      eligibleCourses: ['BCA', 'B.Tech', 'BBA', 'B.Sc'],
                      description: 'Pre-placement internship opportunity with corporate mentorship.'
                    },
                    ...internships
                  ]);
                  alert('Internship drive posted successfully!');
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Internship</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Stipend</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {internships.map((intern) => (
                  <tr key={intern.id} className="hover:bg-sky-50/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{intern.company}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{intern.internshipRole}</td>
                    <td className="py-2.5 px-3 font-bold text-sky-700">{intern.stipend}</td>
                    <td className="py-2.5 px-3 text-slate-600">{intern.duration}</td>
                    <td className="py-2.5 px-3 text-slate-600">{intern.workMode}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Reviewing applicants for ${intern.internshipRole}`)}
                        className="text-sky-600 hover:text-sky-800 font-semibold"
                      >
                        Applicants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: MANAGE APPLICATIONS */}
      {currentTab === 'applications' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Candidate Applications & Shortlisting</h3>
            <p className="text-xs text-slate-500">
              Update candidate progression status: Applied, Shortlisted, Interview, Selected, or Rejected.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 text-slate-700 font-bold border-b border-sky-100">
                <tr>
                  <th className="py-2.5 px-3">Candidate</th>
                  <th className="py-2.5 px-3">Degree Stream</th>
                  <th className="py-2.5 px-3">Target Company</th>
                  <th className="py-2.5 px-3">Job Role</th>
                  <th className="py-2.5 px-3">Hiring Status</th>
                  <th className="py-2.5 px-3 text-right">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-sky-50/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{app.studentName}</td>
                    <td className="py-2.5 px-3 text-slate-600">{app.studentCourse}</td>
                    <td className="py-2.5 px-3 font-semibold text-sky-700">{app.company}</td>
                    <td className="py-2.5 px-3 text-slate-800">{app.role}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        app.status === 'Selected' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        app.status === 'Interview' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                        app.status === 'Shortlisted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        className="px-2 py-1 text-xs border border-slate-200 rounded bg-white font-medium text-slate-700 focus:ring-1 focus:ring-sky-500 outline-none"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: MANAGE ANNOUNCEMENTS */}
      {currentTab === 'announcements' && (
        <div className="bg-white rounded-xl border border-sky-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Manage TPO Announcements & Circulars</h3>
              <p className="text-xs text-slate-500">Publish notices to student dashboards and notice boards.</p>
            </div>
            <button
              onClick={() => setShowAddNotice(!showAddNotice)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Notice</span>
            </button>
          </div>

          {showAddNotice && (
            <form onSubmit={handleAddNoticeSubmit} className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-3">
              <h4 className="text-xs font-bold text-sky-900">Publish New Official Notice</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Notice Title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded sm:col-span-2"
                  required
                />
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Drive Alert">Drive Alert</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Results">Results</option>
                  <option value="Policy">Policy</option>
                </select>
                <textarea
                  placeholder="Notice Description / Circular text..."
                  value={newNotice.description}
                  onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded sm:col-span-3 h-20"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNotice(false)}
                  className="px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-bold text-white bg-sky-600 rounded hover:bg-sky-700"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.description}</p>
                </div>
                <button
                  onClick={() => {
                    setAnnouncements(announcements.filter((a) => a.id !== ann.id));
                    alert('Notice withdrawn.');
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
