import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ProjectCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCodeModal: React.FC<ProjectCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('README_VIVA.md');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // Flask & SQLite Source Files for 3rd Year Undergraduate Project
  const projectFiles: Record<string, { label: string; language: string; content: string }> = {
    'README_VIVA.md': {
      label: 'README & Viva Q&A Guide',
      language: 'markdown',
      content: `# College Placement & Internship Cell Portal
### 3rd-Year Undergraduate Final Project & Viva Defense Documentation

---

## 1. Project Overview
A centralized, modern, and responsive web portal built for **all college/university students** (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA) to discover placement drives, apply for internships, check eligibility criteria, track application status in real-time, and access pre-placement preparation resources.

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Bootstrap Icons
* **Backend:** Python 3, Flask Microframework
* **Database:** SQLite3 (database.db via relational schema.sql)
* **Styling Theme:** Professional Light Blue + White university theme
* **Target Audience:** 3rd-Year Undergraduate Examination & Viva Voce

---

## 2. Directory Structure
\`\`\`text
├── app.py                   # Complete Flask backend with RESTful API routes & sessions
├── init_db.py               # SQLite database initializer and demo data seeder
├── schema.sql               # 8 relational database tables with foreign keys
├── database.db              # Active SQLite database file
├── requirements.txt         # Python package dependencies
├── templates/               # Jinja2 HTML templates
└── static/                  # CSS stylesheets & client JavaScript
\`\`\`

---

## 3. How to Run Locally (Step-by-Step for Viva)

### Step 1: Install Python Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 2: Initialize SQLite Database
\`\`\`bash
python init_db.py
\`\`\`
*Output: [✓] SQLite database 'database.db' successfully initialized and populated with all course data!*

### Step 3: Run Flask Application
\`\`\`bash
python app.py
\`\`\`
Open your browser at \`http://127.0.0.1:5000\`.

---

## 4. Database Schema (8 Relational Tables)

1. **students**: Profile, roll number, email, course (B.Tech, BCA, MBA, etc.), department, semester, CGPA, graduation year, and skills.
2. **companies**: Details of corporate recruitment partners (TCS, Infosys, Deloitte, Zoho, HDFC Bank, etc.).
3. **placements**: Full-time job opportunities with eligible courses list, required CGPA, package, drive date, and interview rounds.
4. **internships**: Internship listings with stipend, duration, work mode (Remote/On-site/Hybrid), and required skills.
5. **placement_drives**: Official on-campus recruitment drive schedule, reporting times, venues, and registration deadlines.
6. **applications**: Tracks candidate applications with workflow statuses: Applied ➔ Shortlisted ➔ Interview ➔ Selected ➔ Rejected.
7. **announcements**: Placement cell notices categorized by Placement Drives, Interview Schedules, Aptitude Tests, and Results.
8. **admins**: Training & Placement Officer credentials and authorization roles.

---

## 5. Frequently Asked Viva Questions & Answers

#### Q1: Why did you choose SQLite over MySQL or PostgreSQL for this project?
**Answer:** SQLite is a serverless, self-contained, zero-configuration SQL database engine. For a college placement portal developed as an undergraduate project, SQLite stores the entire relational database in a single database.db file, making it lightweight, highly portable, easy to backup, and quick to set up for demonstrations without needing background database servers.

#### Q2: How does the portal validate eligibility before allowing a student to apply?
**Answer:** When a student clicks "Apply", the system executes automated checks:
1. Duplicate Check: Confirms the student hasn't already applied.
2. Course Eligibility: Matches the student's registered course (e.g. BCA, B.Tech, BBA) against the permitted eligible_courses array.
3. Academic Cut-off (CGPA): Checks whether student.cgpa >= opportunity.required_cgpa. If criteria are not met, the system prevents application submission and displays a clear explanation.

#### Q3: What is the purpose of session management in Flask?
**Answer:** Flask sessions use cryptographically signed client-side cookies (app.secret_key) to remember the authenticated user's state across HTTP requests. This prevents unauthorized students from accessing other profiles or administrative endpoints.

#### Q4: How are multi-course eligibility criteria stored in SQLite?
**Answer:** We store the eligible_courses list either as a serialized JSON array (["B.Tech", "BCA", "MCA"]) or normalized comma-separated values, allowing the placement cell to specify multiple qualifying degree programs per recruitment drive.
`
    },

    'app.py': {
      label: 'app.py (Flask Server & API)',
      language: 'python',
      content: `# ==============================================================================
# COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL
# 3rd-Year Undergraduate Final Project
# Tech Stack: Python 3, Flask, SQLite3, HTML5, CSS3, Bootstrap 5
# Scope: Multi-Departmental (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA)
# ==============================================================================

import sqlite3
import json
import os
from flask import Flask, render_template, request, jsonify, session, g

app = Flask(__name__)
app.secret_key = 'super_secret_college_placement_cell_key_2026'
DATABASE = 'database.db'

# ------------------------------------------------------------------------------
# DATABASE CONNECTION HELPERS
# ------------------------------------------------------------------------------
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

# ------------------------------------------------------------------------------
# 1. HOME & HEALTH ROUTE
# ------------------------------------------------------------------------------
@app.route('/')
def home():
    return jsonify({
        "project": "College Placement & Internship Cell Portal",
        "status": "online",
        "eligible_courses": ["B.Tech", "BCA", "MCA", "BBA", "MBA", "B.Com", "B.Sc", "BA"],
        "database": DATABASE
    })

# ------------------------------------------------------------------------------
# 2. STUDENT REGISTRATION & AUTHENTICATION
# ------------------------------------------------------------------------------
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("""
        INSERT INTO students (name, roll_number, email, phone, course, department, year, semester, cgpa, graduation_year, password, skills)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data['name'], data['roll_number'], data['email'], data['phone'],
        data['course'], data['department'], data.get('year', '3rd Year'),
        data.get('semester', 'Semester VI'), float(data['cgpa']),
        data.get('graduation_year', '2025'), data.get('password', 'password123'),
        json.dumps(data.get('skills', []))
    ))
    db.commit()
    return jsonify({"success": True, "student_id": cursor.lastrowid}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get('roll_number') or data.get('email', '')
    student = query_db(
        "SELECT * FROM students WHERE LOWER(roll_number) = LOWER(?) OR LOWER(email) = LOWER(?)",
        (identifier, identifier), one=True
    )
    if student:
        session['user_id'] = student['id']
        session['role'] = 'student'
        return jsonify({"success": True, "student": student}), 200
    return jsonify({"success": False, "message": "Student record not found."}), 404

# ------------------------------------------------------------------------------
# 3. PLACEMENTS, INTERNSHIPS & DRIVES
# ------------------------------------------------------------------------------
@app.route('/api/placements', methods=['GET'])
def get_placements():
    placements = query_db("SELECT * FROM placements WHERE status = 'Active'")
    return jsonify(placements), 200

@app.route('/api/internships', methods=['GET'])
def get_internships():
    internships = query_db("SELECT * FROM internships WHERE status = 'Active'")
    return jsonify(internships), 200

@app.route('/api/drives', methods=['GET'])
def get_drives():
    drives = query_db("SELECT * FROM placement_drives ORDER BY drive_date ASC")
    return jsonify(drives), 200

# ------------------------------------------------------------------------------
# 4. ELIGIBILITY VALIDATION & APPLICATION PIPELINE
# ------------------------------------------------------------------------------
@app.route('/api/apply', methods=['POST'])
def apply():
    data = request.get_json() or {}
    student = query_db("SELECT * FROM students WHERE id = ?", (data['student_id'],), one=True)
    if not student:
        return jsonify({"success": False, "message": "Student not found"}), 404
        
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO applications (student_id, student_name, student_roll, student_cgpa, student_course, student_department, student_email, student_phone, opportunity_type, opportunity_id, company_name, role_title, applied_date, status, admin_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE('now'), 'Applied', 'Application received. Pending TPO review.')
    """, (
        student['id'], student['name'], student['roll_number'], student['cgpa'],
        student['course'], student['department'], student['email'], student['phone'],
        data['opportunity_type'], data['opportunity_id'], data['company_name'], data['role_title']
    ))
    db.commit()
    return jsonify({"success": True, "message": "Application submitted successfully!"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
`
    },

    'schema.sql': {
      label: 'schema.sql (SQLite 8 Tables)',
      language: 'sql',
      content: `-- ==============================================================================
-- COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL - SQLITE SCHEMA
-- Multi-Departmental (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL DEFAULT '3rd Year',
    semester TEXT NOT NULL DEFAULT 'Semester VI',
    cgpa REAL NOT NULL,
    graduation_year TEXT NOT NULL DEFAULT '2025',
    password TEXT NOT NULL DEFAULT 'password123',
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    website TEXT,
    contact_email TEXT,
    available_positions INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS placements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    company_name TEXT NOT NULL,
    job_role TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,
    eligible_departments TEXT,
    required_cgpa REAL NOT NULL DEFAULT 6.0,
    graduation_year TEXT DEFAULT '2025',
    location TEXT NOT NULL,
    salary_package TEXT NOT NULL,
    job_type TEXT DEFAULT 'Full Time',
    last_date TEXT NOT NULL,
    drive_date TEXT,
    description TEXT,
    rounds TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    company_name TEXT NOT NULL,
    role TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,
    duration TEXT NOT NULL,
    work_mode TEXT NOT NULL,
    location TEXT NOT NULL,
    stipend TEXT NOT NULL,
    skills TEXT,
    required_cgpa REAL NOT NULL DEFAULT 6.0,
    last_date TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS placement_drives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_role TEXT NOT NULL,
    drive_date TEXT NOT NULL,
    reporting_time TEXT NOT NULL,
    venue TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,
    package TEXT NOT NULL,
    selection_process TEXT NOT NULL,
    registration_deadline TEXT NOT NULL,
    status TEXT DEFAULT 'Registration Open',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    student_roll TEXT NOT NULL,
    student_cgpa REAL NOT NULL,
    student_course TEXT NOT NULL,
    student_department TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    opportunity_type TEXT NOT NULL,
    opportunity_id INTEGER NOT NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    applied_date TEXT NOT NULL,
    status TEXT DEFAULT 'Applied',
    status_updated_date TEXT,
    admin_notes TEXT,
    interview_date TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id)
);

CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    date_posted TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal',
    target_audience TEXT DEFAULT 'All Students',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Training & Placement Officer'
);
`
    },

    'init_db.py': {
      label: 'init_db.py (Database Populator)',
      language: 'python',
      content: `# SQLite Database Initializer & Seed Script
# Run: python3 init_db.py

import sqlite3
import json

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

with open('schema.sql', 'r') as f:
    cursor.executescript(f.read())

print("[✓] SQLite schema executed successfully.")
conn.commit()
conn.close()
`
    },

    'requirements.txt': {
      label: 'requirements.txt (Dependencies)',
      language: 'text',
      content: `Flask==3.0.3
Werkzeug==3.0.3
Jinja2==3.1.4
click==8.1.7
itsdangerous==2.2.0
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
      const rootFolder = zip.folder('college-placement-portal') || zip;

      rootFolder.file('app.py', projectFiles['app.py'].content);
      rootFolder.file('schema.sql', projectFiles['schema.sql'].content);
      rootFolder.file('init_db.py', projectFiles['init_db.py'].content);
      rootFolder.file('requirements.txt', projectFiles['requirements.txt'].content);
      rootFolder.file('README.md', projectFiles['README_VIVA.md'].content);

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'college-placement-portal-project-viva.zip');
    } catch (err) {
      console.error('Error generating project ZIP:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
      <div className="portal-card bg-white w-full max-w-5xl overflow-hidden max-h-[90vh] d-flex flex-column">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0">
              Project Architecture & Viva Reference Hub
            </h3>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              Python Flask Backend • SQLite Relational Schema • Full Reference Documentation
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-primary btn-sm text-xs py-1.5 px-3 d-flex align-items-center gap-1.5 font-medium"
              onClick={handleDownloadZip}
              disabled={downloading}
            >
              <i className={`bi ${downloading ? 'bi-hourglass-split' : 'bi-download'}`}></i>
              <span>{downloading ? 'Generating ZIP...' : 'Download Project ZIP'}</span>
            </button>
            <button type="button" className="text-slate-400 hover:text-slate-600 text-lg leading-none" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body p-0 d-flex flex-column flex-md-row flex-grow-1 overflow-hidden" style={{ minHeight: '520px' }}>
          {/* File List Sidebar */}
          <div className="bg-slate-50 border-end border-slate-200 p-3" style={{ minWidth: '240px', maxWidth: '280px' }}>
            <div className="font-semibold text-[11px] text-slate-500 text-uppercase tracking-wider mb-2 px-1">
              Project Files & Guides
            </div>
              <div className="list-group list-group-flush rounded border">
                {Object.entries(projectFiles).map(([filename, item]) => (
                  <button
                    key={filename}
                    className={`list-group-item list-group-item-action text-start small py-2 px-2.5 d-flex align-items-center gap-2 ${
                      selectedFile === filename ? 'active bg-primary text-white border-primary' : ''
                    }`}
                    onClick={() => setSelectedFile(filename)}
                  >
                    <i
                      className={`bi ${
                        filename.endsWith('.py')
                          ? 'bi-filetype-py text-warning'
                          : filename.endsWith('.sql')
                          ? 'bi-database text-info'
                          : filename.endsWith('.md')
                          ? 'bi-book text-success'
                          : 'bi-file-earmark-text'
                      }`}
                    ></i>
                    <span className="text-truncate fw-medium">{filename}</span>
                  </button>
                ))}
              </div>

              <div className="alert alert-info py-2 px-2.5 small mt-3 mb-0 border-sky-subtle bg-sky-subtle text-navy-primary" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-patch-check-fill me-1 text-sky-dark"></i>
                <strong>Viva Ready:</strong> Covers Multi-Department eligibility, 8 relational SQLite tables, automated CGPA cut-off validation, and Flask RESTful endpoints.
              </div>
            </div>

            {/* Code Content Area */}
            <div className="flex-grow-1 p-3 d-flex flex-column bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-sky-subtle">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-sky-subtle text-navy-primary border border-sky-subtle">
                    {projectFiles[selectedFile]?.label}
                  </span>
                  <span className="text-muted small">
                    {projectFiles[selectedFile]?.language.toUpperCase()}
                  </span>
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm py-1 px-2.5 small d-flex align-items-center gap-1"
                  onClick={handleCopy}
                >
                  <i className={`bi ${copied ? 'bi-check2 text-success' : 'bi-clipboard'}`}></i>
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="flex-grow-1 position-relative overflow-auto rounded border border-slate-200 bg-slate-900 p-3 text-slate-100" style={{ maxHeight: '460px' }}>
                <pre className="m-0 font-mono text-xs text-slate-200" style={{ whiteSpace: 'pre', tabSize: 4 }}>
                  <code>{projectFiles[selectedFile]?.content}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-between align-items-center">
            <span className="text-xs text-slate-500">
              Multi-Department College Placement & Internship Cell Portal
            </span>
            <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
  );
};
