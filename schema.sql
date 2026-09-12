-- =========================================================================
-- College Placement & Internship Cell Portal - Relational SQLite Schema
-- Designed for 3rd-year undergraduate final project / Viva demonstration
-- Supports ALL college courses: B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA
-- =========================================================================

DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS placement_drives;
DROP TABLE IF EXISTS placements;
DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS admins;

-- 1. Students Table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,          -- e.g. B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA
    department TEXT NOT NULL,      -- e.g. Computer Science, Information Technology, Management
    year TEXT NOT NULL,            -- e.g. 3rd Year, 4th Year
    semester TEXT NOT NULL,        -- e.g. Semester VI
    cgpa REAL NOT NULL,
    graduation_year TEXT NOT NULL, -- e.g. 2025, 2026
    password TEXT NOT NULL DEFAULT 'password123',
    skills TEXT,                   -- comma-separated or JSON list of skills
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Companies Table
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    website TEXT,
    contact_email TEXT,
    available_positions INTEGER DEFAULT 10
);

-- 3. Placement Opportunities Table
CREATE TABLE placements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    company_name TEXT NOT NULL,
    job_role TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,      -- JSON or comma-separated list of courses
    eligible_departments TEXT NOT NULL,  -- JSON or comma-separated list of departments
    required_cgpa REAL NOT NULL,
    graduation_year TEXT,
    location TEXT NOT NULL,
    salary_package TEXT NOT NULL,        -- e.g. 4.5 - 7.0 LPA
    job_type TEXT DEFAULT 'Full Time',
    last_date TEXT NOT NULL,
    drive_date TEXT NOT NULL,
    description TEXT,
    rounds TEXT,                         -- JSON list of interview rounds
    status TEXT DEFAULT 'Active',        -- Active, Closed
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- 4. Internship Opportunities Table
CREATE TABLE internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    company_name TEXT NOT NULL,
    role TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,      -- JSON or comma-separated list of courses
    duration TEXT NOT NULL,              -- e.g. 3 Months, 6 Months
    work_mode TEXT NOT NULL,             -- Remote, On-site, Hybrid
    location TEXT NOT NULL,
    stipend TEXT NOT NULL,               -- e.g. ₹20,000 / month
    skills TEXT,                         -- required skills
    required_cgpa REAL NOT NULL,
    last_date TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Active',        -- Active, Closed
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- 5. Placement Drives Table (Scheduled On-Campus Drives)
CREATE TABLE placement_drives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_role TEXT NOT NULL,
    drive_date TEXT NOT NULL,
    reporting_time TEXT NOT NULL,
    venue TEXT NOT NULL,
    eligible_courses TEXT NOT NULL,
    package TEXT NOT NULL,
    selection_process TEXT,
    registration_deadline TEXT NOT NULL,
    status TEXT DEFAULT 'Registration Open', -- Registration Open, Upcoming, Completed
    description TEXT
);

-- 6. Applications Table
CREATE TABLE applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    student_roll TEXT NOT NULL,
    student_cgpa REAL NOT NULL,
    student_course TEXT NOT NULL,
    student_department TEXT,
    student_email TEXT NOT NULL,
    student_phone TEXT NOT NULL,
    opportunity_type TEXT NOT NULL,      -- placement, internship, drive
    opportunity_id INTEGER NOT NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    applied_date TEXT NOT NULL,
    status TEXT DEFAULT 'Applied',       -- Applied, Shortlisted, Interview, Selected, Rejected
    status_updated_date TEXT,
    interview_date TEXT,
    admin_notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 7. Announcements / Notices Table
CREATE TABLE announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,              -- Placement Drive, Interview Schedule, Aptitude Test, Results, Important Notice
    content TEXT NOT NULL,
    date_posted TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal',      -- High, Normal
    target_audience TEXT
);

-- 8. Admin Users Table
CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL DEFAULT 'admin123',
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Training & Placement Officer'
);
