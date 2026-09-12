#!/usr/bin/env python3
"""
Database Initialization Script for College Placement & Internship Cell Portal
Undergraduate 3rd-Year Project (Python Flask + SQLite + Bootstrap 5)
Run: python3 init_db.py
"""

import sqlite3
import json
import os

DB_NAME = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    print(f"[*] Initializing SQLite database '{DB_NAME}'...")
    
    # Read and execute schema
    with open('schema.sql', 'r', encoding='utf-8') as f:
        schema_sql = f.read()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.executescript(schema_sql)

    # 1. Seed Admins
    cursor.execute("""
        INSERT INTO admins (username, password, email, role)
        VALUES (?, ?, ?, ?)
    """, ('admin', 'admin123', 'tpo@college.edu', 'Training & Placement Officer (TPO)'))

    # 2. Seed Students (Diverse Courses & Departments)
    students_data = [
        ('Rohan Sharma', 'BT2023CS045', 'rohan.sharma@college.edu', '9876543210', 'B.Tech', 'Computer Science & Engineering', '4th Year', 'Semester VII', 8.4, '2025', 'pass123', json.dumps(['Python', 'SQL', 'C++', 'Data Structures', 'React'])),
        ('Priya Verma', 'BCA2023089', 'priya.verma@college.edu', '9823456789', 'BCA', 'Computer Applications', '3rd Year', 'Semester VI', 7.2, '2025', 'pass123', json.dumps(['Java', 'SQL', 'Web Development', 'Bootstrap', 'Manual Testing'])),
        ('Aman Gupta', 'MCA2023012', 'aman.gupta@college.edu', '9911223344', 'MCA', 'Computer Applications', '2nd Year', 'Semester IV', 9.1, '2025', 'pass123', json.dumps(['React', 'Node.js', 'Python Flask', 'MongoDB', 'AWS'])),
        ('Ananya Iyer', 'BBA2023055', 'ananya.iyer@college.edu', '9845112233', 'BBA', 'Management Studies', '3rd Year', 'Semester VI', 8.0, '2025', 'pass123', json.dumps(['Business Analytics', 'Financial Modeling', 'MS Excel', 'Marketing Strategy'])),
        ('Rahul Mehta', 'BC2023078', 'rahul.mehta@college.edu', '9833445566', 'B.Com', 'Commerce & Accounting', '3rd Year', 'Semester VI', 7.8, '2025', 'pass123', json.dumps(['Financial Accounting', 'Corporate Taxation', 'Tally Prime', 'Auditing'])),
        ('Sneha Kulkarni', 'BSC2023104', 'sneha.k@college.edu', '9765432198', 'B.Sc', 'Information Technology', '3rd Year', 'Semester VI', 6.8, '2025', 'pass123', json.dumps(['Python', 'Statistics', 'R Programming', 'Data Analytics'])),
        ('Vikram Malhotra', 'MBA2023022', 'vikram.m@college.edu', '9811002233', 'MBA', 'Management Studies', '2nd Year', 'Semester IV', 8.6, '2025', 'pass123', json.dumps(['Product Strategy', 'HR Analytics', 'Operations', 'Client Relations'])),
        ('Tanvi Deshmukh', 'BA2023019', 'tanvi.d@college.edu', '9899887766', 'BA', 'Humanities & Mass Comm', '3rd Year', 'Semester VI', 7.5, '2025', 'pass123', json.dumps(['Content Writing', 'Public Relations', 'Digital Copywriting', 'Corporate Comm']))
    ]

    cursor.executemany("""
        INSERT INTO students (name, roll_number, email, phone, course, department, year, semester, cgpa, graduation_year, password, skills)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, students_data)

    # 3. Seed Partner Companies
    companies_data = [
        ('Tata Consultancy Services (TCS)', 'Information Technology & Consulting', 'Mumbai / Pune / PAN India', 'Global IT services, consulting and business solutions leader recruiting engineering, computer applications, and science graduates.', 'https://www.tcs.com', 'careers@tcs.com', 45),
        ('Infosys Limited', 'Enterprise Software & Cloud', 'Bengaluru / Hyderabad / Pune', 'Premier digital services and next-generation consulting organization hiring for Systems Engineer, Operations Executive, and Business Analyst positions.', 'https://www.infosys.com', 'campus.hiring@infosys.com', 35),
        ('Deloitte USI', 'Audit, Consulting & Financial Advisory', 'Hyderabad / Gurugram / Mumbai', 'Leading international professional services firm offering career opportunities across technology consulting, financial advisory, and risk analytics.', 'https://www.deloitte.com', 'deloitte.campus@deloitte.com', 25),
        ('Wipro Technologies', 'IT & Digital Transformation', 'Bengaluru / Noida / Chennai', 'Multinational corporation providing IT services and the prestigious Work Integrated Learning Program (WILP) for science & computer graduates.', 'https://www.wipro.com', 'campus.queries@wipro.com', 30),
        ('Zoho Corporation', 'Product Software & SaaS', 'Chennai / Tenkasi / Salem', 'Indian multinational technology company creating enterprise cloud software suite with a pure merit and problem-solving recruitment model.', 'https://www.zoho.com', 'hiring@zohocorp.com', 20),
        ('HDFC Bank', 'Banking & Financial Services', 'Mumbai / Delhi / PAN India', 'India\'s leading private sector bank recruiting for Management Trainees, Relationship Managers, and Financial Analyst roles.', 'https://www.hdfcbank.com', 'careers@hdfcbank.com', 40),
        ('Amazon India', 'E-Commerce, Cloud & Operations', 'Bengaluru / Hyderabad / Gurugram', 'Global cloud and technology leader hiring for Software Development Engineers, Operations Specialists, and Cloud Support Associates.', 'https://www.amazon.jobs', 'amazon-campus@amazon.com', 18),
        ('Ernst & Young (EY)', 'Tax, Strategy & Financial Assurance', 'Bengaluru / Gurugram / Kolkata', 'One of the largest professional services networks offering advisory, auditing, and tax analyst opportunities for commerce, finance, and management students.', 'https://www.ey.com', 'ey.campus@in.ey.com', 22),
        ('Tech Mahindra', 'Telecom, AI & Digital Engineering', 'Pune / Hyderabad / Noida', 'Specialist in digital transformation, consulting and customer experience solutions for telecom and enterprise businesses.', 'https://www.techmahindra.com', 'campus@techmahindra.com', 28),
        ('Ogilvy & Mather', 'Advertising, Media & Public Relations', 'Mumbai / Delhi / Bengaluru', 'World-renowned advertising and communications agency recruiting for digital copywriters, media strategists, and PR associates.', 'https://www.ogilvy.com', 'talent@ogilvy.com', 15)
    ]

    cursor.executemany("""
        INSERT INTO companies (name, industry, location, description, website, contact_email, available_positions)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, companies_data)

    # 4. Seed Placement Opportunities
    placements_data = [
        (1, 'Tata Consultancy Services (TCS)', 'Software Developer Trainee (Ninja & Digital)', json.dumps(['B.Tech', 'BCA', 'MCA', 'B.Sc']), json.dumps(['Computer Science & Engineering', 'Information Technology', 'Computer Applications']), 6.5, '2025', 'Pune / Mumbai / Bengaluru', '₹4.5 - 7.0 LPA', 'Full Time', '2026-09-28', '2026-10-06', 'Work on enterprise software systems, cloud native architectures, and microservices for international banking and healthcare clients.', json.dumps(['Online Aptitude & Coding Test', 'Technical Interview', 'Managerial Round', 'HR Interview']), 'Active'),
        (3, 'Deloitte USI', 'Associate Business Technology Analyst', json.dumps(['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA']), json.dumps(['Management Studies', 'Commerce & Accounting', 'Computer Science & Engineering']), 7.0, '2025', 'Hyderabad / Gurugram', '₹7.2 - 8.5 LPA', 'Full Time', '2026-09-30', '2026-10-10', 'Collaborate with cross-functional global teams to deliver technology advisory, business data analytics, and cloud solution implementations.', json.dumps(['Online Cognitive & Quantitative Assessment', 'Case Study Discussion', 'Partner Interview']), 'Active'),
        (2, 'Infosys Limited', 'Systems Engineer & Operations Specialist', json.dumps(['B.Tech', 'MCA', 'BCA', 'B.Sc']), json.dumps(['Computer Science & Engineering', 'Information Technology', 'Computer Applications']), 6.0, '2025', 'Bengaluru / Hyderabad', '₹3.6 - 4.2 LPA', 'Full Time', '2026-10-02', '2026-10-12', 'Design, develop, and maintain software modules across modern programming languages and automated DevOps delivery pipelines.', json.dumps(['Aptitude & Pseudocode Assessment', 'Technical Discussion', 'HR Verification']), 'Active'),
        (6, 'HDFC Bank', 'Management Trainee - Retail & Corporate Banking', json.dumps(['BBA', 'MBA', 'B.Com', 'BA']), json.dumps(['Management Studies', 'Commerce & Accounting', 'Economics & Humanities']), 6.5, '2025', 'Mumbai / Delhi / PAN India', '₹5.5 - 6.8 LPA', 'Full Time', '2026-10-05', '2026-10-16', 'Manage client relationship portfolios, cross-sell digital wealth products, and handle branch financial operations.', json.dumps(['Online Aptitude & Banking Knowledge', 'Group Discussion', 'Personal Interview']), 'Active'),
        (5, 'Zoho Corporation', 'Product Software Engineer', json.dumps(['BCA', 'B.Tech', 'MCA', 'B.Sc']), json.dumps(['Computer Science & Engineering', 'Computer Applications', 'Information Technology']), 5.5, '2025', 'Chennai (On-site)', '₹6.0 - 8.4 LPA', 'Full Time', '2026-09-26', '2026-10-04', 'Build scalable SaaS applications, web engines, and cloud databases used by millions of businesses worldwide.', json.dumps(['Problem Solving & Basic Coding', 'Advanced Data Structures Round', 'System Design', 'HR Round']), 'Active'),
        (8, 'Ernst & Young (EY)', 'Financial & Assurance Analyst', json.dumps(['B.Com', 'BBA', 'MBA']), json.dumps(['Commerce & Accounting', 'Management Studies']), 7.0, '2025', 'Bengaluru / Gurugram', '₹6.2 - 7.5 LPA', 'Full Time', '2026-10-08', '2026-10-18', 'Perform risk assessment, statutory audit reviews, internal controls evaluation, and corporate tax compliance filings.', json.dumps(['Financial Aptitude & Reasoning Test', 'Technical Interview', 'Managerial Fitment Round']), 'Active'),
        (4, 'Wipro Technologies', 'WILP Trainee (M.Tech Sponsorship + Job)', json.dumps(['BCA', 'B.Sc']), json.dumps(['Computer Applications', 'Information Technology', 'Mathematics & CS']), 6.0, '2025', 'Bengaluru / Chennai / Noida', '₹3.8 - 4.5 LPA + Full M.Tech', 'Full Time', '2026-10-04', '2026-10-14', 'Work as a full-time software associate on live enterprise customer projects while earning a sponsored M.Tech degree from BITS Pilani.', json.dumps(['Online Quantitative & Written Comm', 'Technical Assessment', 'HR Interview']), 'Active'),
        (7, 'Amazon India', 'Cloud Support Associate & Operations Specialist', json.dumps(['B.Tech', 'MCA', 'BCA', 'BBA', 'MBA']), json.dumps(['Computer Science & Engineering', 'Management Studies', 'Computer Applications']), 6.5, '2025', 'Bengaluru / Hyderabad', '₹7.5 - 9.0 LPA', 'Full Time', '2026-10-12', '2026-10-22', 'Provide technical assistance and operational support for AWS cloud services and supply chain logistics.', json.dumps(['Online Assessment', 'Technical Deep Dive', 'Amazon Leadership Principles Interview', 'Bar Raiser Round']), 'Active')
    ]

    cursor.executemany("""
        INSERT INTO placements (company_id, company_name, job_role, eligible_courses, eligible_departments, required_cgpa, graduation_year, location, salary_package, job_type, last_date, drive_date, description, rounds, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, placements_data)

    # 5. Seed Internships
    internships_data = [
        (5, 'Zoho Corporation', 'Frontend Development Intern', json.dumps(['BCA', 'B.Tech', 'MCA', 'B.Sc']), '6 Months', 'Hybrid', 'Chennai / Hybrid', '₹22,000 / month', json.dumps(['HTML/CSS', 'JavaScript', 'React', 'Git']), 6.5, '2026-09-25', 'Build fast, responsive user interfaces and test SaaS components used across millions of customer accounts.', 'Active'),
        (3, 'Deloitte USI', 'Business Analytics Intern', json.dumps(['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA']), '3 Months', 'On-site', 'Hyderabad Campus', '₹25,000 / month', json.dumps(['Excel Modeling', 'Tableau / PowerBI', 'SQL', 'Data Interpretation']), 7.0, '2026-09-28', 'Analyze enterprise datasets, build executive dashboards, and prepare client business intelligence reports.', 'Active'),
        (7, 'Amazon India', 'Cloud Operations & Support Intern', json.dumps(['B.Tech', 'BCA', 'MCA', 'B.Sc']), '6 Months', 'Remote', 'Remote / Work From Home', '₹30,000 / month', json.dumps(['Linux Basics', 'Networking Fundamentals', 'Python Scripting', 'AWS Concepts']), 7.0, '2026-10-02', 'Investigate operational anomalies, automate troubleshooting scripts, and assist cloud engineers with AWS instances.', 'Active'),
        (8, 'Ernst & Young (EY)', 'Financial Research & Assurance Intern', json.dumps(['B.Com', 'BBA', 'MBA']), '4 Months', 'Hybrid', 'Bengaluru / Hybrid', '₹18,000 / month', json.dumps(['Financial Statements', 'Audit Support', 'MS Excel', 'Tax Research']), 6.8, '2026-10-05', 'Support senior audit managers in analyzing balance sheets, verifying vendor invoices, and statutory tax reconciliation.', 'Active'),
        (10, 'Ogilvy & Mather', 'Social Media & Creative Copy Intern', json.dumps(['BA', 'BBA', 'MBA']), '3 Months', 'Remote', 'Work From Home', '₹15,000 / month', json.dumps(['Copywriting', 'Canva / Adobe', 'Social Media Trends', 'Storyboarding']), 6.0, '2026-10-08', 'Ideate punchy social media ad copy, draft campaign scripts, and analyze engagement metrics across Instagram & LinkedIn.', 'Active'),
        (6, 'HDFC Bank', 'Banking Operations & FinTech Intern', json.dumps(['BBA', 'B.Com', 'MBA', 'BA']), '3 Months', 'On-site', 'Regional Circle Offices', '₹16,000 / month', json.dumps(['KYC Operations', 'Customer Service', 'Banking Software', 'Documentation']), 6.2, '2026-10-10', 'Understand core banking processing, merchant digital onboarding, and loan documentation verification.', 'Active')
    ]

    cursor.executemany("""
        INSERT INTO internships (company_id, company_name, role, eligible_courses, duration, work_mode, location, stipend, skills, required_cgpa, last_date, description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, internships_data)

    # 6. Seed Placement Drives
    drives_data = [
        ('Tata Consultancy Services (TCS)', 'Software Developer Trainee (Ninja / Digital)', '2026-10-06', '08:30 AM IST', 'College Main Auditorium & Computing Lab 1-4', json.dumps(['B.Tech', 'BCA', 'MCA', 'B.Sc']), '₹4.5 - 7.0 LPA', 'Online NQT Test → Technical Interview → Managerial Interview → HR Discussion', '2026-09-28', 'Registration Open', 'Annual flagship on-campus recruitment drive for engineering and computer application graduates across all branches.'),
        ('Deloitte USI', 'Associate Business Technology Analyst', '2026-10-10', '09:00 AM IST', 'Management Block - Seminar Hall 2', json.dumps(['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA']), '₹7.2 - 8.5 LPA', 'Aptitude & Case Study MCQ → Group Case Presentation → Partner Interview', '2026-09-30', 'Registration Open', 'Strategic campus hiring for consulting and technology analyst profiles with fast-track corporate leadership training.'),
        ('Infosys Limited', 'Systems Engineer & Specialist Programmer', '2026-10-12', '09:00 AM IST', 'Virtual Proctored Drive (Computer Labs & Personal Laptops)', json.dumps(['B.Tech', 'MCA', 'BCA', 'B.Sc']), '₹3.6 - 4.2 LPA', 'InfyTQ Qualifier / Cognitive Test → Technical Interview → HR Verification', '2026-10-02', 'Upcoming', 'Pan-college recruitment drive welcoming final-year undergraduate and postgraduate tech students.'),
        ('HDFC Bank', 'Management Trainee (Retail & Corporate)', '2026-10-16', '09:30 AM IST', 'Commerce & Management Seminar Hall', json.dumps(['BBA', 'MBA', 'B.Com', 'BA']), '₹5.5 - 6.8 LPA', 'Banking Aptitude Assessment → Group Discussion → Branch Head Panel Interview', '2026-10-05', 'Registration Open', 'Premier banking sector placement drive hiring relationship officers and commercial portfolio managers.'),
        ('Zoho Corporation', 'Product Software Engineer', '2026-10-20', '08:45 AM IST', 'IT Block - High Performance Lab 5', json.dumps(['BCA', 'B.Tech', 'MCA', 'B.Sc']), '₹6.0 - 8.4 LPA', 'Round 1 Basic Coding → Round 2 Algorithmic Challenge → Round 3 System Design → HR', '2026-10-10', 'Upcoming', 'Zoho\'s on-campus hack-and-hire sprint focusing strictly on practical coding and problem-solving skills.'),
        ('Wipro Technologies', 'WILP Trainee (M.Tech Sponsorship)', '2026-09-08', '09:00 AM IST', 'Central Placement Hall', json.dumps(['BCA', 'B.Sc']), '₹3.8 - 4.5 LPA', 'Online Test → Technical Interview → HR Verification', '2026-09-02', 'Completed', 'Completed placement drive. 24 students received Letters of Intent with fully sponsored higher education.')
    ]

    cursor.executemany("""
        INSERT INTO placement_drives (company_name, job_role, drive_date, reporting_time, venue, eligible_courses, package, selection_process, registration_deadline, status, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, drives_data)

    # 7. Seed Applications
    applications_data = [
        (1, 'Rohan Sharma', 'BT2023CS045', 8.4, 'B.Tech', 'Computer Science & Engineering', 'rohan.sharma@college.edu', '9876543210', 'placement', 1, 'Tata Consultancy Services (TCS)', 'Software Developer Trainee (Ninja & Digital)', '2026-09-02', 'Interview', '2026-10-06 at 10:30 AM (Auditorium Hall 2)', 'Cleared Online Aptitude test with 88 percentile. Face-to-face Technical round scheduled.'),
        (1, 'Rohan Sharma', 'BT2023CS045', 8.4, 'B.Tech', 'Computer Science & Engineering', 'rohan.sharma@college.edu', '9876543210', 'internship', 1, 'Zoho Corporation', 'Frontend Development Intern', '2026-09-05', 'Shortlisted', None, 'Resume verified and forwarded to Zoho HR panel. Awaiting coding test link.'),
        (2, 'Priya Verma', 'BCA2023089', 7.2, 'BCA', 'Computer Applications', 'priya.verma@college.edu', '9823456789', 'placement', 3, 'Infosys Limited', 'Systems Engineer & Operations Specialist', '2026-09-04', 'Selected', None, 'Congratulated! Received Letter of Intent (LOI) with annual package 3.8 LPA.'),
        (3, 'Aman Gupta', 'MCA2023012', 9.1, 'MCA', 'Computer Applications', 'aman.gupta@college.edu', '9911223344', 'placement', 5, 'Zoho Corporation', 'Product Software Engineer', '2026-09-03', 'Interview', '2026-10-04 at 2:00 PM (Google Meet Online)', 'Aced machine round. Final managerial discussion pending.'),
        (4, 'Ananya Iyer', 'BBA2023055', 8.0, 'BBA', 'Management Studies', 'ananya.iyer@college.edu', '9845112233', 'placement', 2, 'Deloitte USI', 'Associate Business Technology Analyst', '2026-09-06', 'Shortlisted', None, 'Candidate cleared preliminary cognitive assessment. Case study slot allocated.'),
        (5, 'Rahul Mehta', 'BC2023078', 7.8, 'B.Com', 'Commerce & Accounting', 'rahul.mehta@college.edu', '9833445566', 'placement', 4, 'HDFC Bank', 'Management Trainee - Retail & Corporate Banking', '2026-09-07', 'Applied', None, 'Application registered. Awaiting initial banking aptitude review.')
    ]

    cursor.executemany("""
        INSERT INTO applications (student_id, student_name, student_roll, student_cgpa, student_course, student_department, student_email, student_phone, opportunity_type, opportunity_id, company_name, role_title, applied_date, status, interview_date, admin_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, applications_data)

    # 8. Seed Announcements
    announcements_data = [
        ('TCS National Qualifier Test (NQT) Registration Deadline Approaching', 'Placement Drive', 'All graduating students from B.Tech, BCA, MCA, and B.Sc intending to appear for the upcoming TCS on-campus recruitment must complete their profile on TCS NextStep portal and submit their CT/DT reference ID to the Placement Cell by 28th September.', '2026-09-10', 'High', 'B.Tech, BCA, MCA, B.Sc Final Year'),
        ('Deloitte USI Case Study Assessment & Schedule Released', 'Interview Schedule', 'Shortlisted candidates for Deloitte Associate Business Technology Analyst role are instructed to report to Management Seminar Hall 2 on 10th October at 9:00 AM sharp with college ID card and portfolio resumes.', '2026-09-09', 'High', 'BBA, MBA, B.Com, B.Tech, BCA Shortlisted Students'),
        ('Pre-Placement Aptitude & Technical Diagnostic Test', 'Aptitude Test', 'The Training & Placement Cell has organized a comprehensive pre-placement diagnostic test covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability on Saturday, 19th September from 10:00 AM to 12:30 PM.', '2026-09-08', 'Normal', 'Students from All Courses'),
        ('HDFC Bank Campus Drive Registration Announced', 'Placement Drive', 'HDFC Bank will be visiting our campus for hiring Management Trainees for Retail & Corporate Banking. Final year BBA, MBA, B.Com, and BA students with minimum 6.5 CGPA can register before 5th October.', '2026-09-06', 'High', 'BBA, MBA, B.Com, BA Final Year'),
        ('Wipro Technologies WILP Selection Results Declared', 'Results', 'Heartiest congratulations to the 24 students selected for Wipro Technologies Work Integrated Learning Program (WILP). Selected candidates should collect their physical offer letters from the Placement Office.', '2026-09-05', 'Normal', 'BCA & B.Sc CS'),
        ('Mandatory Resume Verification Drive for Pre-Final & Final Year Students', 'Important Notice', 'Students across all departments must verify their resume format against the standard college placement cell template before applying for corporate drives. Visit TPO room between 3 PM - 5 PM on working days.', '2026-09-03', 'Normal', 'All Departments')
    ]

    cursor.executemany("""
        INSERT INTO announcements (title, category, content, date_posted, priority, target_audience)
        VALUES (?, ?, ?, ?, ?, ?)
    """, announcements_data)

    conn.commit()
    conn.close()
    print("[✓] SQLite database 'database.db' successfully initialized and populated with all course data!")

if __name__ == '__main__':
    init_database()
