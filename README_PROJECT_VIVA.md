# College Placement & Internship Cell Portal
### 3rd-Year Undergraduate Final Project & Viva Defense Documentation

---

## 1. Project Overview
A centralized, modern, and responsive web portal built for **all college/university students** (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA) to discover placement drives, apply for internships, check eligibility criteria, track application status in real-time, and access pre-placement preparation resources.

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Lucide Icons
* **Backend:** Python 3, Flask Microframework
* **Database:** SQLite3 (`database.db` via relational `schema.sql`)
* **Styling Theme:** Professional Light Blue + White university theme

---

## 2. Directory Structure
```text
├── app.py                   # Complete Flask backend with RESTful API routes & sessions
├── init_db.py               # SQLite database initializer and demo data seeder
├── schema.sql               # 8 relational database tables with foreign keys
├── database.db              # Active SQLite database file
├── requirements.txt         # Python package dependencies
├── package.json             # Frontend assets & scripts
├── src/                     # React / Bootstrap 5 responsive frontend client
│   ├── components/          # Student & Admin dashboards, navbar, modals, filters
│   ├── context/AppContext.tsx # Central client-side state engine & local storage fallback
│   ├── types.ts             # TypeScript entity contracts for Students, Drives, Placements
│   └── mockData.ts          # Comprehensive seed data for all departments
└── README_PROJECT_VIVA.md   # Complete viva questions, setup steps, and schema diagrams
```

---

## 3. How to Run Locally (Step-by-Step for Viva)

### Step 1: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Initialize SQLite Database
```bash
python3 init_db.py
```
*Output: `[✓] SQLite database 'database.db' successfully initialized and populated with all course data!`*

### Step 3: Run Flask Application
```bash
python3 app.py
```
Open your browser at `http://127.0.0.1:5000`.

---

## 4. Database Schema (8 Relational Tables)

1. **`students`**: Stores student profile, roll number, email, course (`B.Tech`, `BCA`, `MBA`, etc.), department, semester, CGPA, graduation year, and skills.
2. **`companies`**: Details of corporate recruitment partners (TCS, Infosys, Deloitte, Zoho, HDFC Bank, etc.).
3. **`placements`**: Full-time job opportunities with eligible courses list, required CGPA, package, drive date, and interview rounds.
4. **`internships`**: Internship listings with stipend, duration, work mode (Remote/On-site/Hybrid), and required skills.
5. **`placement_drives`**: Official on-campus recruitment drive schedule, reporting times, venues, and registration deadlines.
6. **`applications`**: Tracks candidate applications with workflow statuses: `Applied` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected` ➔ `Rejected`.
7. **`announcements`**: Placement cell notices categorized by Placement Drives, Interview Schedules, Aptitude Tests, and Results.
8. **`admins`**: Training & Placement Officer credentials and authorization roles.

---

## 5. Frequently Asked Viva Questions & Answers

#### Q1: Why did you choose SQLite over MySQL or PostgreSQL for this project?
**Answer:** SQLite is a serverless, self-contained, zero-configuration SQL database engine. For a college placement portal developed as an undergraduate project, SQLite stores the entire relational database in a single `.db` file, making it lightweight, highly portable, easy to backup, and quick to set up for demonstrations without needing background database servers.

#### Q2: How does the portal validate eligibility before allowing a student to apply?
**Answer:** When a student clicks "Apply", the system executes automated checks:
1. **Duplicate Check:** Confirms the student hasn't already applied.
2. **Course Eligibility:** Matches the student's registered course (e.g. `BCA`, `B.Tech`, `BBA`) against the permitted `eligible_courses` array.
3. **Academic Cut-off (CGPA):** Checks whether `student.cgpa >= opportunity.required_cgpa`. If criteria are not met, the system prevents application submission and displays a clear explanation.

#### Q3: What is the purpose of session management in Flask?
**Answer:** Flask sessions use cryptographically signed client-side cookies (`app.secret_key`) to remember the authenticated user's state across HTTP requests. This prevents unauthorized students from accessing other profiles or administrative endpoints.

#### Q4: How are multi-course eligibility criteria stored in SQLite?
**Answer:** We store the `eligible_courses` list either as a serialized JSON array (`["B.Tech", "BCA", "MCA"]`) or normalized comma-separated values, allowing the placement cell to specify multiple qualifying degree programs per recruitment drive.
