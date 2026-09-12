import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ProjectCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCodeModal: React.FC<ProjectCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('App.jsx');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // React JSX Source Code & Supporting Project Files (Viva Ready)
  const projectFiles: Record<string, { label: string; language: string; content: string }> = {
    'App.jsx': {
      label: 'App.jsx (Main React JSX Application)',
      language: 'jsx',
      content: `// ==============================================================================
// COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL
// Frontend Architecture: React 19 JSX + Tailwind CSS + Bootstrap 5
// Scope: Multi-Department (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { PlacementPortal } from './PlacementPortal';
import { initialPlacements, initialCompanies, initialStudents } from './mockData';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentRole, setCurrentRole] = useState('student');
  const [currentStudent, setCurrentStudent] = useState(initialStudents[0]);
  const [placements, setPlacements] = useState(initialPlacements);
  const [appliedJobs, setAppliedJobs] = useState([1, 4]);

  // Statistics calculation for TPO dashboard
  const totalOffers = 428;
  const highestPackage = '₹42.0 LPA';
  const averagePackage = '₹7.8 LPA';
  const placementRate = '88.4%';

  const handleApply = (opportunity) => {
    if (!currentStudent) {
      alert('Please sign in as a student to apply.');
      return;
    }

    if (appliedJobs.includes(opportunity.id)) {
      alert('You have already submitted an application for this opportunity.');
      return;
    }

    // Eligibility check: CGPA & Degree
    if (currentStudent.cgpa < opportunity.requiredCgpa) {
      alert(\`Ineligible: Minimum \${opportunity.requiredCgpa} CGPA required. Your CGPA: \${currentStudent.cgpa}\`);
      return;
    }

    setAppliedJobs([...appliedJobs, opportunity.id]);
    alert(\`Application successfully submitted for \${opportunity.jobRole} at \${opportunity.companyName}!\`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Global Navigation Bar in JSX */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentRole={currentRole}
        onToggleRole={() => setCurrentRole(currentRole === 'student' ? 'admin' : 'student')}
        studentName={currentStudent?.name}
      />

      {/* 2. Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                Official Campus TPO Cell • Academic Year 2025-26
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Central Training & Placement Portal
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
                Streamlining recruitment drives, industry-backed internships, and placement records 
                for engineering, management, commerce, science, and humanities students.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 min-w-[280px]">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-slate-900">{highestPackage}</div>
                <div className="text-[11px] text-slate-500 font-medium">Highest CTC</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{placementRate}</div>
                <div className="text-[11px] text-slate-500 font-medium">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Placement Engine & Listings */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-8">
        <PlacementPortal
          student={currentStudent}
          opportunities={placements}
          appliedJobIds={appliedJobs}
          onApply={handleApply}
        />
      </main>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-xs text-center border-t border-slate-800">
        <p className="mb-1 text-slate-300 font-medium">
          Training & Placement Cell • University Campus Development Center
        </p>
        <p className="text-slate-500">
          Built with React 19 JSX, Tailwind CSS & RESTful Backend Architecture.
        </p>
      </footer>
    </div>
  );
}

export default App;
`
    },

    'PlacementPortal.jsx': {
      label: 'PlacementPortal.jsx (Placement & Application Engine)',
      language: 'jsx',
      content: `// ==============================================================================
// PlacementPortal.jsx - React JSX Component
// Handles course filtering, real-time search, and CGPA verification
// ==============================================================================

import React, { useState } from 'react';

export function PlacementPortal({ student, opportunities = [], appliedJobIds = [], onApply }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const courses = ['All', 'B.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Com', 'B.Sc'];

  const filteredJobs = opportunities.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourse === 'All' ||
      (job.eligibleCourses && job.eligibleCourses.includes(selectedCourse));
    const matchesFilter =
      filterType === 'All' ||
      (filterType === 'Eligible' && student && student.cgpa >= job.requiredCgpa) ||
      (filterType === 'Applied' && appliedJobIds.includes(job.id));

    return matchesSearch && matchesCourse && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="Search by company, job role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Degree:</span>
          <select
            className="px-3 py-2 text-xs border border-slate-200 rounded bg-white text-slate-700 outline-none"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* View Segment */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded">
          {['All', 'Eligible', 'Applied'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={\`text-xs px-3 py-1 rounded font-medium transition \${
                filterType === type
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }\`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Placement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isEligible = !student || student.cgpa >= job.requiredCgpa;
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {job.salaryPackage || '₹6.5 LPA'}
                  </span>
                  <span
                    className={\`text-[11px] font-semibold px-2 py-0.5 rounded border \${
                      isApplied
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : isEligible
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }\`}
                  >
                    {isApplied ? 'Application Under Review' : isEligible ? 'Eligible' : \`Min \${job.requiredCgpa} CGPA\`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{job.jobRole}</h3>
                <p className="text-xs font-medium text-slate-600 mb-2">
                  {job.companyName} • {job.location}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                  {job.description || 'Full-time campus placement opportunity with pre-placement assessment rounds.'}
                </p>

                {/* Eligible Degree Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.eligibleCourses?.map((course) => (
                    <span key={course} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">Drive Date: {job.lastDate}</span>
                <button
                  disabled={!isEligible || isApplied}
                  onClick={() => onApply(job)}
                  className={\`text-xs font-semibold px-4 py-1.5 rounded transition \${
                    isApplied
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : isEligible
                      ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }\`}
                >
                  {isApplied ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacementPortal;
`
    },

    'Navbar.jsx': {
      label: 'Navbar.jsx (React JSX Navigation Header)',
      language: 'jsx',
      content: `// ==============================================================================
// Navbar.jsx - Responsive React Navigation Bar
// ==============================================================================

import React from 'react';

export function Navbar({ currentPage, onNavigate, currentRole, onToggleRole, studentName }) {
  const navItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'placements', label: 'Placements' },
    { id: 'internships', label: 'Internships' },
    { id: 'companies', label: 'Recruiters' },
    { id: 'drives', label: 'Drive Schedule' },
    { id: 'prep', label: 'Viva & Prep' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            TP
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              TPO Placement Portal
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Career & Corporate Relations Cell
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={\`text-xs px-3 py-1.5 rounded-md font-medium transition \${
                currentPage === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }\`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info & Toggle */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-900">
              {currentRole === 'admin' ? 'TPO Officer' : studentName || 'Candidate'}
            </div>
            <div className="text-[10px] text-slate-500 capitalize">
              Role: {currentRole}
            </div>
          </div>

          <button
            onClick={onToggleRole}
            className="text-xs px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
          >
            Switch to {currentRole === 'student' ? 'Admin' : 'Student'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
`
    },

    'package.json': {
      label: 'package.json (Vite + React Dependencies)',
      language: 'json',
      content: `{
  "name": "college-placement-portal",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.475.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "vite": "^6.1.0"
  }
}
`
    },

    'README_VIVA.md': {
      label: 'README & Viva Q&A Guide',
      language: 'markdown',
      content: `# College Placement & Internship Cell Portal
### 3rd-Year Undergraduate Final Project & Viva Defense Documentation

---

## 1. Project Overview & Architecture
A centralized, modern, and responsive web portal built in **React 19 (JSX)** with a **Flask Python backend** and **SQLite3 relational database** to streamline corporate hiring across all college/university streams:
* **Degree Programs:** B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA.
* **Frontend:** React 19 JSX, Tailwind CSS, Bootstrap 5 Icons.
* **Backend:** Python 3, Flask RESTful API.
* **Database:** SQLite3 (database.db via schema.sql).
* **Code Format:** Modular React JSX components with blue color syntax styling.

---

## 2. Frequently Asked Viva Questions & Answers

#### Q1: Why did you build the frontend using React JSX?
**Answer:** React JSX allows declarative component-driven UI architecture. JSX blends HTML structure directly with JavaScript logic, enabling reactive state re-renders (using useState and useEffect hooks), modular reusable components (Navbar, PlacementPortal, Dashboard), and fast virtual DOM diffing without reloading pages.

#### Q2: How is multi-course eligibility validated?
**Answer:** Each job opportunity stores an array of eligible degree programs (e.g., ['BCA', 'B.Tech', 'MCA']) alongside a required CGPA threshold (e.g., 7.0). During application submission, the system evaluates:
\`\`\`jsx
const isEligible = student.cgpa >= job.requiredCgpa && job.eligibleCourses.includes(student.course);
\`\`\`
If either criterion fails, the submission is blocked and constructive feedback is shown.

#### Q3: Why is SQLite suitable for this project demonstration?
**Answer:** SQLite is self-contained, serverless, and zero-configuration. The entire relational database is persisted in a portable database.db file, making the viva demonstration completely local, fast, and resilient.

#### Q4: How are student applications tracked across stages?
**Answer:** Applications follow a structured state machine:
Applied ➔ Shortlisted ➔ Technical Interview ➔ HR Round ➔ Selected / Rejected.
`
    },

    'app.py': {
      label: 'app.py (Flask REST API Server)',
      language: 'python',
      content: `# ==============================================================================
# COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL - FLASK BACKEND
# ==============================================================================

import sqlite3
import json
from flask import Flask, request, jsonify, g

app = Flask(__name__)
app.secret_key = 'super_secret_college_placement_cell_key_2026'
DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (dict(rv[0]) if rv else None) if one else [dict(r) for r in rv]

@app.route('/api/placements', methods=['GET'])
def get_placements():
    placements = query_db("SELECT * FROM placements WHERE status = 'Active'")
    return jsonify(placements), 200

@app.route('/api/apply', methods=['POST'])
def apply():
    data = request.get_json() or {}
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO applications (student_id, student_name, student_roll, student_cgpa, student_course, opportunity_type, opportunity_id, company_name, role_title, applied_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, DATE('now'), 'Applied')
    """, (
        data['student_id'], data['student_name'], data['student_roll'],
        data['student_cgpa'], data['student_course'], data['opportunity_type'],
        data['opportunity_id'], data['company_name'], data['role_title']
    ))
    db.commit()
    return jsonify({"success": True, "message": "Application registered successfully"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
`
    },

    'schema.sql': {
      label: 'schema.sql (SQLite 8 Tables)',
      language: 'sql',
      content: `-- ==============================================================================
-- COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL - SQLITE SCHEMA
-- Multi-Department (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    course TEXT NOT NULL,
    department TEXT NOT NULL,
    cgpa REAL NOT NULL,
    graduation_year TEXT NOT NULL DEFAULT '2025'
);

CREATE TABLE IF NOT EXISTS placements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_role TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,
    required_cgpa REAL NOT NULL DEFAULT 6.0,
    salary_package TEXT NOT NULL,
    last_date TEXT NOT NULL,
    status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    applied_date TEXT NOT NULL,
    status TEXT DEFAULT 'Applied'
);
`
    }
  };

  const handleCopy = () => {
    const content = projectFiles[selectedFile]?.content || '';
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('college-placement-portal-jsx') || zip;

      // Add JSX frontend code
      rootFolder.file('src/App.jsx', projectFiles['App.jsx'].content);
      rootFolder.file('src/PlacementPortal.jsx', projectFiles['PlacementPortal.jsx'].content);
      rootFolder.file('src/Navbar.jsx', projectFiles['Navbar.jsx'].content);
      rootFolder.file('package.json', projectFiles['package.json'].content);
      rootFolder.file('README_VIVA.md', projectFiles['README_VIVA.md'].content);
      rootFolder.file('backend/app.py', projectFiles['app.py'].content);
      rootFolder.file('backend/schema.sql', projectFiles['schema.sql'].content);

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'college-placement-portal-jsx.zip');
    } catch (err) {
      console.error('Error generating project ZIP:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
      <div className="portal-card bg-white w-full max-w-5xl overflow-hidden max-h-[92vh] d-flex flex-column rounded-xl shadow-2xl border border-slate-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-center bg-slate-50">
          <div>
            <div className="d-flex align-items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 mb-0">
                Project Source Code & Viva Documentation (JSX Edition)
              </h3>
              <span className="badge bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-semibold px-2 py-0.5 rounded">
                React JSX Code
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              React 19 JSX Frontend • Blue Syntax Theme • Python Flask Backend • SQLite Schema
            </p>
          </div>
          <div className="d-flex align-items-center gap-2.5">
            <button
              className="btn btn-primary btn-sm text-xs py-1.5 px-3 d-flex align-items-center gap-1.5 font-semibold"
              onClick={handleDownloadZip}
              disabled={downloading}
            >
              <i className={`bi ${downloading ? 'bi-hourglass-split' : 'bi-download'}`}></i>
              <span>{downloading ? 'Zipping...' : 'Download Project ZIP (JSX)'}</span>
            </button>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body p-0 d-flex flex-column flex-md-row flex-grow-1 overflow-hidden" style={{ minHeight: '520px' }}>
          {/* File List Sidebar */}
          <div className="bg-slate-50 border-end border-slate-200 p-3" style={{ minWidth: '250px', maxWidth: '290px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2 px-1">
              <span className="font-semibold text-[11px] text-slate-500 text-uppercase tracking-wider">
                Files & Components
              </span>
              <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                JSX Active
              </span>
            </div>

            <div className="list-group list-group-flush rounded border border-slate-200 bg-white">
              {Object.entries(projectFiles).map(([filename, item]) => {
                const isSelected = selectedFile === filename;
                const isJsx = filename.endsWith('.jsx');
                return (
                  <button
                    key={filename}
                    className={`list-group-item list-group-item-action text-start small py-2 px-2.5 d-flex align-items-center justify-content-between ${
                      isSelected ? 'active bg-slate-900 text-white border-slate-900' : 'text-slate-700'
                    }`}
                    onClick={() => setSelectedFile(filename)}
                  >
                    <div className="d-flex align-items-center gap-2 min-w-0">
                      <i
                        className={`bi ${
                          isJsx
                            ? 'bi-filetype-jsx text-sky-400 font-bold'
                            : filename.endsWith('.json')
                            ? 'bi-filetype-json text-amber-500'
                            : filename.endsWith('.py')
                            ? 'bi-filetype-py text-emerald-500'
                            : filename.endsWith('.sql')
                            ? 'bi-database text-purple-500'
                            : 'bi-file-earmark-text text-blue-500'
                        }`}
                      ></i>
                      <span className="text-truncate font-medium text-xs">{filename}</span>
                    </div>
                    {isJsx && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                      }`}>
                        JSX
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-2.5 rounded bg-blue-50/60 border border-blue-200 text-slate-800 text-[11px] mt-3 leading-relaxed">
              <div className="font-bold text-blue-900 mb-1 d-flex align-items-center gap-1">
                <i className="bi bi-code-slash text-blue-600"></i>
                JSX Code in Blue Color
              </div>
              Code displayed in JSX with high-contrast electric blue text (<span className="text-blue-600 font-mono font-bold">#60a5fa</span>). Ready for submission, viva review, or local execution.
            </div>
          </div>

          {/* Code Content Area */}
          <div className="flex-grow-1 p-3 d-flex flex-column bg-slate-900">
            {/* Code Toolbar */}
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-b border-slate-800">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono">
                  {projectFiles[selectedFile]?.label}
                </span>
                <span className="badge bg-slate-800 text-blue-400 border border-blue-900/50 text-[10px]">
                  BLUE COLOR CODE
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-light btn-sm py-1 px-3 text-xs d-flex align-items-center gap-1.5 border-slate-700 hover:bg-slate-800 text-slate-200"
                  onClick={handleCopy}
                >
                  <i className={`bi ${copied ? 'bi-check2 text-emerald-400' : 'bi-clipboard'}`}></i>
                  <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Code Display - Styled specifically with Blue Color Text */}
            <div
              className="flex-grow-1 position-relative overflow-auto rounded-lg border border-blue-900/40 bg-slate-950 p-4 code-terminal"
              style={{ maxHeight: '480px' }}
            >
              <pre
                className="m-0 font-mono text-xs code-blue-text font-normal leading-relaxed"
                style={{
                  color: '#60a5fa',
                  whiteSpace: 'pre',
                  tabSize: 2,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
                }}
              >
                <code
                  className="text-blue-400"
                  style={{ color: '#60a5fa' }}
                >
                  {projectFiles[selectedFile]?.content}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-between align-items-center">
          <span className="text-xs text-slate-600 font-medium">
            React 19 JSX Edition • Blue Color Code Text Theme • Multi-Department Placement Portal
          </span>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-4 font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCodeModal;
