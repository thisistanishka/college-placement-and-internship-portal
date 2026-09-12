import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { ApplicationStatus, Company, PlacementOpportunity, InternshipOpportunity, Announcement } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentRole,
    loginAsAdmin,
    applications,
    companies,
    placements,
    internships,
    announcements,
    students,
    updateApplicationStatus,
    addCompany,
    updateCompany,
    deleteCompany,
    addPlacement,
    updatePlacement,
    deletePlacement,
    addInternship,
    updateInternship,
    deleteInternship,
    addAnnouncement,
    deleteAnnouncement
  } = useApp();

  const [activeTab, setActiveTab] = useState<'applications' | 'companies' | 'placements' | 'internships' | 'announcements' | 'students'>('applications');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');

  // Status Modal state
  const [statusModalApp, setStatusModalApp] = useState<typeof applications[0] | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Shortlisted');
  const [adminNotes, setAdminNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  // Company Form Modal state
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // Placement Form Modal state
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<PlacementOpportunity | null>(null);
  const [plCompanyId, setPlCompanyId] = useState<number>(companies[0]?.id || 1);
  const [plRole, setPlRole] = useState('');
  const [plEligibility, setPlEligibility] = useState('All Final Year (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA)');
  const [plCgpa, setPlCgpa] = useState('6.0');
  const [plLocation, setPlLocation] = useState('PAN India');
  const [plPackage, setPlPackage] = useState('4.5 - 6.0 LPA');
  const [plLastDate, setPlLastDate] = useState('2026-10-15');
  const [plDriveDate, setPlDriveDate] = useState('2026-10-25');
  const [plDescription, setPlDescription] = useState('');

  // Internship Form Modal state
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [intCompanyId, setIntCompanyId] = useState<number>(companies[0]?.id || 1);
  const [intRole, setIntRole] = useState('');
  const [intDuration, setIntDuration] = useState('3 Months');
  const [intLocationType, setIntLocationType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [intLocation, setIntLocation] = useState('Bengaluru / Hybrid');
  const [intStipend, setIntStipend] = useState('₹18,000 / month');
  const [intEligibility, setIntEligibility] = useState('All Departments (B.Tech, BCA, MCA, BBA, MBA)');
  const [intCgpa, setIntCgpa] = useState('6.0');
  const [intLastDate, setIntLastDate] = useState('2026-10-10');
  const [intDescription, setIntDescription] = useState('');

  // Announcement Form Modal
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<'Placement Drive' | 'Interview Date' | 'Test Date' | 'Important Notice'>('Placement Drive');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState<'High' | 'Normal'>('High');

  // Guard for admin
  if (currentRole !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container max-w-md mx-auto px-4 text-center">
          <div className="portal-card p-6 bg-white">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 d-inline-flex align-items-center justify-content-center text-slate-700 text-sm font-semibold mb-3">
              TPO
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Administrative Access Required</h2>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              You are currently browsing in student candidate mode. Switch to Training & Placement Officer administration to manage companies, drives, and student candidate statuses.
            </p>
            <button className="btn btn-primary w-100 text-xs py-2" onClick={loginAsAdmin}>
              Switch to TPO Administrator
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Applications
  const filteredApps = applications.filter(a => {
    const matchesSearch =
      a.studentName.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.studentRoll.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.companyName.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.roleTitle.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appStatusFilter === 'all' || a.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handler for Updating Application Status
  const openStatusModal = (app: typeof applications[0]) => {
    setStatusModalApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.adminNotes || '');
    setInterviewDate(app.interviewDate || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalApp) return;

    updateApplicationStatus(statusModalApp.id, newStatus, adminNotes, interviewDate);
    setStatusModalApp(null);
  };

  // Company Handlers
  const handleOpenAddCompany = () => {
    setEditingCompany(null);
    setCompanyName('');
    setCompanyIndustry('');
    setCompanyLocation('');
    setCompanyDescription('');
    setCompanyWebsite('');
    setIsCompanyModalOpen(true);
  };

  const handleOpenEditCompany = (c: Company) => {
    setEditingCompany(c);
    setCompanyName(c.name);
    setCompanyIndustry(c.industry);
    setCompanyLocation(c.location);
    setCompanyDescription(c.description);
    setCompanyWebsite(c.website);
    setIsCompanyModalOpen(true);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    if (editingCompany) {
      updateCompany({
        ...editingCompany,
        name: companyName,
        industry: companyIndustry,
        location: companyLocation,
        description: companyDescription,
        website: companyWebsite
      });
    } else {
      addCompany({
        name: companyName,
        industry: companyIndustry,
        location: companyLocation,
        description: companyDescription,
        website: companyWebsite
      });
    }
    setIsCompanyModalOpen(false);
  };

  // Placement Handlers
  const handleOpenAddPlacement = () => {
    setEditingPlacement(null);
    setPlRole('');
    setPlEligibility('BCA 3rd Year graduating students');
    setPlCgpa('6.0');
    setPlLocation('PAN India');
    setPlPackage('3.8 - 4.5 LPA');
    setPlLastDate('2026-10-15');
    setPlDriveDate('2026-10-25');
    setPlDescription('');
    setIsPlacementModalOpen(true);
  };

  const handleSavePlacement = (e: React.FormEvent) => {
    e.preventDefault();
    const selComp = companies.find(c => c.id === Number(plCompanyId)) || companies[0];

    if (editingPlacement) {
      updatePlacement({
        ...editingPlacement,
        companyId: selComp.id,
        companyName: selComp.name,
        jobRole: plRole,
        eligibility: plEligibility,
        requiredCgpa: parseFloat(plCgpa) || 6.0,
        location: plLocation,
        salaryPackage: plPackage,
        lastDate: plLastDate,
        driveDate: plDriveDate,
        description: plDescription
      });
    } else {
      addPlacement({
        companyId: selComp.id,
        companyName: selComp.name,
        jobRole: plRole,
        eligibility: plEligibility,
        requiredCgpa: parseFloat(plCgpa) || 6.0,
        location: plLocation,
        salaryPackage: plPackage,
        lastDate: plLastDate,
        driveDate: plDriveDate,
        description: plDescription,
        rounds: ['Aptitude Test', 'Technical Round', 'HR Interview'],
        status: 'Active'
      });
    }
    setIsPlacementModalOpen(false);
  };

  // Internship Handlers
  const handleOpenAddInternship = () => {
    setIntRole('');
    setIntDuration('3 Months');
    setIntLocationType('Hybrid');
    setIntLocation('Bengaluru / Hybrid');
    setIntStipend('₹18,000 / month');
    setIntEligibility('BCA 2nd & 3rd Year');
    setIntCgpa('6.0');
    setIntLastDate('2026-10-10');
    setIntDescription('');
    setIsInternshipModalOpen(true);
  };

  const handleSaveInternship = (e: React.FormEvent) => {
    e.preventDefault();
    const selComp = companies.find(c => c.id === Number(intCompanyId)) || companies[0];

    addInternship({
      companyId: selComp.id,
      companyName: selComp.name,
      role: intRole,
      duration: intDuration,
      locationType: intLocationType,
      location: intLocation,
      stipend: intStipend,
      eligibility: intEligibility,
      requiredCgpa: parseFloat(intCgpa) || 6.0,
      lastDate: intLastDate,
      description: intDescription,
      status: 'Active'
    });
    setIsInternshipModalOpen(false);
  };

  // Announcement Handler
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];

    addAnnouncement({
      title: annTitle,
      category: annCategory,
      content: annContent,
      datePosted: todayStr,
      priority: annPriority,
      targetAudience: 'All Graduating Students'
    });
    setAnnTitle('');
    setAnnContent('');
    setIsAnnouncementModalOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span>Placement Cell</span>
              <span className="mx-1.5 text-slate-400">/</span>
              <span className="text-slate-700">TPO Control Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Central Administration Dashboard
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Oversee campus recruitment drives, review student applications, transition pipeline milestones, and publish official notices.
            </p>
          </div>

          <div className="mt-3 mt-sm-0">
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded">
              TPO Authorized Session
            </span>
          </div>
        </div>

        {/* KPI Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Applications</div>
            <div className="text-xl font-bold text-slate-900">{applications.length}</div>
          </div>
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Companies</div>
            <div className="text-xl font-bold text-slate-900">{companies.length}</div>
          </div>
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Drives</div>
            <div className="text-xl font-bold text-slate-900">{placements.filter(p => p.status === 'Active').length}</div>
          </div>
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Internships</div>
            <div className="text-xl font-bold text-slate-900">{internships.length}</div>
          </div>
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Students</div>
            <div className="text-xl font-bold text-slate-900">{students.length}</div>
          </div>
          <div className="portal-card p-3.5 bg-white text-center">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Offers Extended</div>
            <div className="text-xl font-bold text-slate-900">
              {applications.filter(a => a.status === 'Selected').length}
            </div>
          </div>
        </div>

        {/* Segmented Tab Navigation */}
        <div className="portal-card p-1.5 bg-white mb-6 d-flex flex-wrap gap-1">
          {[
            { id: 'applications', label: `Applications (${applications.length})` },
            { id: 'companies', label: `Companies (${companies.length})` },
            { id: 'placements', label: `Placement Drives (${placements.length})` },
            { id: 'internships', label: `Internships (${internships.length})` },
            { id: 'announcements', label: `Announcements (${announcements.length})` },
            { id: 'students', label: `Students (${students.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-transparent'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: APPLICATIONS MANAGEMENT & PIPELINE UPDATING */}
        {activeTab === 'applications' && (
          <div>
            {/* Search & Status Filter */}
            <div className="portal-card p-3.5 mb-4 bg-white">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control text-xs"
                    placeholder="Search by student name, roll number, or company..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-md-end gap-2">
                  <label className="text-xs font-semibold text-slate-700 mb-0 text-nowrap">Filter Status:</label>
                  <select
                    className="form-select text-xs"
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="portal-card bg-white overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">App ID</th>
                      <th className="py-2.5 px-3">Student Details</th>
                      <th className="py-2.5 px-3">Company & Role</th>
                      <th className="py-2.5 px-3">Applied Date</th>
                      <th className="py-2.5 px-3">Current Status</th>
                      <th className="py-2.5 px-3">Interview / Note</th>
                      <th className="py-2.5 px-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No applications found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map(app => (
                        <tr key={app.id}>
                          <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">#{app.id}</td>
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-slate-900">{app.studentName}</div>
                            <div className="text-slate-500 text-[11px]">
                              {app.studentRoll} • CGPA: {app.studentCgpa}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-medium text-slate-900">{app.roleTitle}</div>
                            <div className="text-slate-500 text-[11px]">
                              {app.companyName} • {app.opportunityType}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">{app.appliedDate}</td>
                          <td className="py-2.5 px-3">
                            <StatusBadge status={app.status} size="sm" />
                          </td>
                          <td className="py-2.5 px-3" style={{ maxWidth: '220px' }}>
                            {app.interviewDate ? (
                              <div className="text-amber-800 font-medium truncate">
                                {app.interviewDate}
                              </div>
                            ) : app.adminNotes ? (
                              <div className="text-slate-600 truncate">{app.adminNotes}</div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-end">
                            <button
                              className="btn btn-outline-secondary btn-sm text-[11px] py-1 px-2.5"
                              onClick={() => openStatusModal(app)}
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPANIES MANAGEMENT */}
        {activeTab === 'companies' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-0.5">Recruiting Partners Directory</h2>
                <p className="text-xs text-slate-500 mb-0">Registered organizations for placement and internship drives.</p>
              </div>
              <button className="btn btn-primary text-xs py-1.5 px-3" onClick={handleOpenAddCompany}>
                Add Partner
              </button>
            </div>

            <div className="row g-3">
              {companies.map(c => (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="portal-card h-100 p-4 bg-white d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="text-sm font-bold text-slate-900 mb-0">{c.name}</h3>
                        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {c.industry}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">
                        {c.location}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{c.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 d-flex justify-content-between align-items-center">
                      <span className="text-[11px] font-mono text-slate-400">ID #{c.id}</span>
                      <div className="d-flex gap-1.5">
                        <button className="btn btn-outline-secondary btn-sm text-[11px] py-1 px-2" onClick={() => handleOpenEditCompany(c)}>
                          Edit
                        </button>
                        <button className="btn btn-outline-secondary btn-sm text-[11px] py-1 px-2 text-rose-700 hover:text-rose-800" onClick={() => deleteCompany(c.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PLACEMENT DRIVES MANAGEMENT */}
        {activeTab === 'placements' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-0.5">Campus Placement Drives</h2>
                <p className="text-xs text-slate-500 mb-0">Active and archived full-time hiring schedules.</p>
              </div>
              <button className="btn btn-primary text-xs py-1.5 px-3" onClick={handleOpenAddPlacement}>
                Create Drive
              </button>
            </div>

            <div className="portal-card bg-white overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Job Role</th>
                      <th className="py-2.5 px-3">Company</th>
                      <th className="py-2.5 px-3">CTC Package</th>
                      <th className="py-2.5 px-3">Cutoff CGPA</th>
                      <th className="py-2.5 px-3">Drive Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placements.map(p => (
                      <tr key={p.id}>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{p.jobRole}</td>
                        <td className="py-2.5 px-3 text-slate-600">{p.companyName}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{p.salaryPackage}</td>
                        <td className="py-2.5 px-3 text-slate-600">{p.requiredCgpa.toFixed(1)}+</td>
                        <td className="py-2.5 px-3 text-slate-500">{p.driveDate}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                            p.status === 'Active' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-end">
                          <button className="btn btn-outline-secondary btn-sm text-[11px] py-1 px-2 text-rose-700 hover:text-rose-800" onClick={() => deletePlacement(p.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INTERNSHIPS MANAGEMENT */}
        {activeTab === 'internships' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-0.5">Internship Postings</h2>
                <p className="text-xs text-slate-500 mb-0">Pre-placement summer and winter internship listings.</p>
              </div>
              <button className="btn btn-primary text-xs py-1.5 px-3" onClick={handleOpenAddInternship}>
                Post Internship
              </button>
            </div>

            <div className="portal-card bg-white overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Company</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Mode</th>
                      <th className="py-2.5 px-3">Stipend</th>
                      <th className="py-2.5 px-3">Min CGPA</th>
                      <th className="py-2.5 px-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map(i => (
                      <tr key={i.id}>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{i.role}</td>
                        <td className="py-2.5 px-3 text-slate-600">{i.companyName}</td>
                        <td className="py-2.5 px-3 text-slate-500">{i.duration}</td>
                        <td className="py-2.5 px-3 text-slate-600">{i.locationType}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{i.stipend}</td>
                        <td className="py-2.5 px-3 text-slate-600">{i.requiredCgpa.toFixed(1)}</td>
                        <td className="py-2.5 px-3 text-end">
                          <button className="btn btn-outline-secondary btn-sm text-[11px] py-1 px-2 text-rose-700 hover:text-rose-800" onClick={() => deleteInternship(i.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS MANAGEMENT */}
        {activeTab === 'announcements' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-0.5">Placement Notices & Circulars</h2>
                <p className="text-xs text-slate-500 mb-0">Official broadcasts visible on the student portal.</p>
              </div>
              <button className="btn btn-primary text-xs py-1.5 px-3" onClick={() => setIsAnnouncementModalOpen(true)}>
                New Circular
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map(a => (
                <div key={a.id} className="portal-card p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {a.category}
                      </span>
                      {a.priority === 'High' && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Priority
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-slate-900 mb-0">{a.title}</h3>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-xs text-slate-400">{a.datePosted}</span>
                      <button className="btn btn-outline-secondary btn-sm text-[11px] py-0.5 px-2 text-rose-700 hover:text-rose-800" onClick={() => deleteAnnouncement(a.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-0 leading-relaxed">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: REGISTERED STUDENTS DIRECTORY */}
        {activeTab === 'students' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-0.5">Registered Student Roster</h2>
                <p className="text-xs text-slate-500 mb-0">Candidate profiles enrolled in placement activities.</p>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                {students.length} Enrolled
              </span>
            </div>

            <div className="portal-card bg-white overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Roll Number</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Program & Year</th>
                      <th className="py-2.5 px-3">CGPA</th>
                      <th className="py-2.5 px-3">Email</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3 text-end">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => {
                      const sApps = applications.filter(a => a.studentId === s.id);
                      return (
                        <tr key={s.id}>
                          <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">{s.rollNumber}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">{s.name}</td>
                          <td className="py-2.5 px-3 text-slate-500">{s.course} • {s.year}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {s.cgpa.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">{s.email}</td>
                          <td className="py-2.5 px-3 text-slate-500">{s.phone}</td>
                          <td className="py-2.5 px-3 text-end text-slate-600 font-medium">
                            {sApps.length} Submitted
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      {/* MODAL 1: APPLICATION STATUS CHANGER */}
      {statusModalApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-md overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0">Update Candidate Status</h3>
                <p className="text-[11px] text-slate-500 mb-0">Transition application along recruitment pipeline</p>
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-base" onClick={() => setStatusModalApp(null)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatus}>
              <div className="p-5">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 mb-4 text-xs space-y-1">
                  <div><strong className="text-slate-700">Candidate:</strong> <span className="text-slate-900">{statusModalApp.studentName}</span> ({statusModalApp.studentRoll})</div>
                  <div><strong className="text-slate-700">Position:</strong> <span className="text-slate-900">{statusModalApp.roleTitle}</span> at {statusModalApp.companyName}</div>
                  <div className="d-flex align-items-center gap-1.5 pt-1">
                    <strong className="text-slate-700">Current:</strong> <StatusBadge status={statusModalApp.status} size="sm" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Next Status Milestone *</label>
                  <select
                    className="form-select text-xs"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    required
                  >
                    <option value="Applied">1. Applied (Under Review)</option>
                    <option value="Shortlisted">2. Shortlisted (Screening Cleared)</option>
                    <option value="Interview">3. Interview (Rounds Scheduled)</option>
                    <option value="Selected">4. Selected (Offer Extended)</option>
                    <option value="Rejected">5. Rejected (Not Qualified)</option>
                  </select>
                </div>

                {newStatus === 'Interview' && (
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Interview Details & Venue</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. 2026-09-22 at 11:00 AM (Seminar Hall 2)"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                    />
                  </div>
                )}

                <div className="mb-0">
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">TPO Remarks / Candidate Notes</label>
                  <textarea
                    className="form-control text-xs"
                    rows={3}
                    placeholder="Feedback visible to the student in their tracker..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setStatusModalApp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT COMPANY */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-lg overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0">{editingCompany ? 'Edit Partner Company' : 'Add Recruiting Partner'}</h3>
                <p className="text-[11px] text-slate-500 mb-0">Hiring organization details and profile</p>
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-base" onClick={() => setIsCompanyModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCompany}>
              <div className="p-5 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Company Name *</label>
                  <input
                    type="text"
                    className="form-control text-xs"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Industry Vertical *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. IT & Software Services"
                      value={companyIndustry}
                      onChange={(e) => setCompanyIndustry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Location / HQ *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      value={companyLocation}
                      onChange={(e) => setCompanyLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Official Website</label>
                  <input
                    type="url"
                    className="form-control text-xs"
                    placeholder="https://company.com"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Company Description</label>
                  <textarea
                    className="form-control text-xs"
                    rows={3}
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setIsCompanyModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3">
                  {editingCompany ? 'Save Changes' : 'Register Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE PLACEMENT DRIVE */}
      {isPlacementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-5 py-3.5 border-b border-slate-200 d-flex justify-content-between align-items-center sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0">Create Campus Placement Drive</h3>
                <p className="text-[11px] text-slate-500 mb-0">Publish an active recruitment schedule for graduating students</p>
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-base" onClick={() => setIsPlacementModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlacement}>
              <div className="p-5 space-y-3">
                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Recruiting Company *</label>
                    <select
                      className="form-select text-xs"
                      value={plCompanyId}
                      onChange={(e) => setPlCompanyId(Number(e.target.value))}
                    >
                      {companies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Job Role Title *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. Associate Software Trainee"
                      value={plRole}
                      onChange={(e) => setPlRole(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Package / CTC *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. 4.5 - 6.0 LPA"
                      value={plPackage}
                      onChange={(e) => setPlPackage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Cutoff CGPA (Min) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-control text-xs"
                      value={plCgpa}
                      onChange={(e) => setPlCgpa(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Job Location *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      value={plLocation}
                      onChange={(e) => setPlLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Application Deadline *</label>
                    <input
                      type="date"
                      className="form-control text-xs"
                      value={plLastDate}
                      onChange={(e) => setPlLastDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Scheduled Drive Date *</label>
                    <input
                      type="date"
                      className="form-control text-xs"
                      value={plDriveDate}
                      onChange={(e) => setPlDriveDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Eligibility Requirement *</label>
                  <input
                    type="text"
                    className="form-control text-xs"
                    value={plEligibility}
                    onChange={(e) => setPlEligibility(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Role Description & Responsibilities</label>
                  <textarea
                    className="form-control text-xs"
                    rows={3}
                    value={plDescription}
                    onChange={(e) => setPlDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2 sticky bottom-0 bg-slate-50">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setIsPlacementModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3">
                  Publish Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: POST INTERNSHIP */}
      {isInternshipModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-5 py-3.5 border-b border-slate-200 d-flex justify-content-between align-items-center sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0">Post Internship Listing</h3>
                <p className="text-[11px] text-slate-500 mb-0">Publish pre-placement internship opportunity</p>
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-base" onClick={() => setIsInternshipModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveInternship}>
              <div className="p-5 space-y-3">
                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Company *</label>
                    <select
                      className="form-select text-xs"
                      value={intCompanyId}
                      onChange={(e) => setIntCompanyId(Number(e.target.value))}
                    >
                      {companies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Internship Role *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. Frontend Developer Intern"
                      value={intRole}
                      onChange={(e) => setIntRole(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Duration *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. 6 Months"
                      value={intDuration}
                      onChange={(e) => setIntDuration(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Work Mode *</label>
                    <select
                      className="form-select text-xs"
                      value={intLocationType}
                      onChange={(e) => setIntLocationType(e.target.value as any)}
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Monthly Stipend *</label>
                    <input
                      type="text"
                      className="form-control text-xs"
                      placeholder="e.g. ₹20,000 / month"
                      value={intStipend}
                      onChange={(e) => setIntStipend(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Min CGPA Cutoff *</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control text-xs"
                      value={intCgpa}
                      onChange={(e) => setIntCgpa(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Application Deadline *</label>
                    <input
                      type="date"
                      className="form-control text-xs"
                      value={intLastDate}
                      onChange={(e) => setIntLastDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Internship Description</label>
                  <textarea
                    className="form-control text-xs"
                    rows={3}
                    value={intDescription}
                    onChange={(e) => setIntDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2 sticky bottom-0 bg-slate-50">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setIsInternshipModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3">
                  Publish Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: POST ANNOUNCEMENT */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
          <div className="portal-card bg-white w-full max-w-md overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0">Publish Notice Circular</h3>
                <p className="text-[11px] text-slate-500 mb-0">Broadcast announcement to student candidate portal</p>
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-600 text-base" onClick={() => setIsAnnouncementModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement}>
              <div className="p-5 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Notice Title *</label>
                  <input
                    type="text"
                    className="form-control text-xs"
                    placeholder="e.g. TCS NQT Registration Schedule"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Category *</label>
                    <select
                      className="form-select text-xs"
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as any)}
                    >
                      <option value="Placement Drive">Placement Drive</option>
                      <option value="Interview Date">Interview Date</option>
                      <option value="Test Date">Test Date</option>
                      <option value="Important Notice">Important Notice</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Priority *</label>
                    <select
                      className="form-select text-xs"
                      value={annPriority}
                      onChange={(e) => setAnnPriority(e.target.value as any)}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High (Urgent)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Circular Content *</label>
                  <textarea
                    className="form-control text-xs"
                    rows={4}
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={() => setIsAnnouncementModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm text-xs py-1.5 px-3">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
);
};
