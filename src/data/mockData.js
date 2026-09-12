// ==============================================================================
// COLLEGE PLACEMENT & INTERNSHIP CELL PORTAL - MOCK DATA
// Multi-Course Support: BCA, BBA, B.Tech, B.Sc, B.Com, BA, MCA, MBA, M.Tech
// Beginner-friendly JavaScript data file for 3rd-year college project
// ==============================================================================

export const coursesList = [
  'All',
  'BCA',
  'BBA',
  'B.Tech',
  'B.Sc',
  'B.Com',
  'BA',
  'MCA',
  'MBA',
  'M.Tech'
];

export const initialStudent = {
  name: 'Aarav Sharma',
  studentId: 'STU2023089',
  email: 'aarav.sharma@college.edu',
  phone: '+91 98765 43210',
  course: 'B.Tech',
  department: 'Computer Science & Engineering',
  year: '3rd Year',
  semester: '6th Semester',
  cgpa: '8.65',
  graduationYear: '2026',
  skills: ['React', 'JavaScript', 'Tailwind CSS', 'Python', 'SQL']
};

export const samplePlacements = [
  {
    id: 1,
    company: 'Tata Consultancy Services (TCS)',
    jobRole: 'Graduate Software Engineer',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Tech'],
    requiredCgpa: 6.5,
    location: 'Bengaluru / Pune / Hyderabad',
    package: '₹4.5 - ₹7.2 LPA',
    lastDate: '2026-09-30',
    jobType: 'Full-time',
    description: 'Entry-level engineering role working on cloud platforms, digital applications, and enterprise microservices.'
  },
  {
    id: 2,
    company: 'Deloitte USI',
    jobRole: 'Associate Business Technology Analyst',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA', 'MCA'],
    requiredCgpa: 7.0,
    location: 'Hyderabad / Gurugram',
    package: '₹8.1 LPA',
    lastDate: '2026-10-05',
    jobType: 'Full-time',
    description: 'Analyze enterprise workflows, implement business analytics solutions, and assist client advisory engagements.'
  },
  {
    id: 3,
    company: 'Infosys Limited',
    jobRole: 'Systems Engineer',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    requiredCgpa: 6.0,
    location: 'Mysuru / Bengaluru / Pune',
    package: '₹4.0 - ₹9.5 LPA',
    lastDate: '2026-10-10',
    jobType: 'Full-time',
    description: 'Join the world-renowned foundation training program and specialize in full-stack web, cloud, or enterprise software.'
  },
  {
    id: 4,
    company: 'HDFC Bank',
    jobRole: 'Management Trainee - Operations & Retail',
    eligibleCourses: ['B.Com', 'BBA', 'MBA', 'BA'],
    requiredCgpa: 6.5,
    location: 'Mumbai / Delhi / Kolkata',
    package: '₹6.2 LPA',
    lastDate: '2026-10-15',
    jobType: 'Full-time',
    description: 'Work with commercial branch banking, corporate risk assessment, portfolio management, and financial client relations.'
  },
  {
    id: 5,
    company: 'Amazon India',
    jobRole: 'Software Development Engineer - 1',
    eligibleCourses: ['B.Tech', 'MCA', 'M.Tech'],
    requiredCgpa: 7.5,
    location: 'Bengaluru / Hyderabad',
    package: '₹22.0 LPA',
    lastDate: '2026-10-20',
    jobType: 'Full-time',
    description: 'Build hyper-scalable distributed backend services, AWS integrations, and customer-facing e-commerce systems.'
  },
  {
    id: 6,
    company: 'KPMG India',
    jobRole: 'Financial & Risk Advisory Analyst',
    eligibleCourses: ['B.Com', 'BBA', 'MBA'],
    requiredCgpa: 7.0,
    location: 'Mumbai / Bengaluru / Gurugram',
    package: '₹7.5 LPA',
    lastDate: '2026-10-25',
    jobType: 'Full-time',
    description: 'Support statutory audits, regulatory compliance, internal financial reviews, and tax consultancy.'
  },
  {
    id: 7,
    company: 'Wipro Technologies',
    jobRole: 'Project Engineer - Turbo & Elite',
    eligibleCourses: ['BCA', 'B.Sc', 'B.Tech', 'MCA'],
    requiredCgpa: 6.0,
    location: 'Chennai / Pune / Noida',
    package: '₹4.2 - ₹6.5 LPA',
    lastDate: '2026-10-28',
    jobType: 'Full-time',
    description: 'Develop enterprise software systems, automated test frameworks, and modern web application frontends.'
  },
  {
    id: 8,
    company: 'Tech Mahindra',
    jobRole: 'Digital Solutions Associate',
    eligibleCourses: ['BCA', 'BBA', 'B.Tech', 'BA', 'B.Com'],
    requiredCgpa: 6.0,
    location: 'Noida / Hyderabad',
    package: '₹4.8 LPA',
    lastDate: '2026-11-02',
    jobType: 'Full-time',
    description: 'Deliver customer experience transformations, telecom IT support, and enterprise automation pipelines.'
  }
];

export const sampleInternships = [
  {
    id: 101,
    company: 'Microsoft India',
    internshipRole: 'Software Engineering Intern',
    eligibleCourses: ['B.Tech', 'MCA', 'M.Tech', 'BCA'],
    duration: '6 Months',
    stipend: '₹80,000 / month',
    location: 'Bengaluru / Hyderabad',
    workMode: 'Hybrid',
    lastDate: '2026-09-28',
    description: 'Work directly alongside senior engineers on Azure cloud tools, developer platforms, and Windows core services.'
  },
  {
    id: 102,
    company: 'Ernst & Young (EY)',
    internshipRole: 'Data Analytics & Audit Intern',
    eligibleCourses: ['B.Com', 'BBA', 'MBA', 'B.Tech', 'BCA'],
    duration: '3 Months',
    stipend: '₹25,000 / month',
    location: 'Gurugram / Mumbai',
    workMode: 'On-site',
    lastDate: '2026-10-02',
    description: 'Extract business insights from corporate financial databases using Power BI, SQL, and Excel modeling.'
  },
  {
    id: 103,
    company: 'Zomato',
    internshipRole: 'Product & Operations Intern',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'BA', 'BCA'],
    duration: '4 Months',
    stipend: '₹22,000 / month',
    location: 'Gurugram',
    workMode: 'On-site',
    lastDate: '2026-10-08',
    description: 'Manage merchant onboarding operations, track delivery SLA performance, and propose UX optimizations.'
  },
  {
    id: 104,
    company: 'Cisco Systems',
    internshipRole: 'Network Consulting Intern',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    duration: '6 Months',
    stipend: '₹45,000 / month',
    location: 'Bengaluru',
    workMode: 'Hybrid',
    lastDate: '2026-10-12',
    description: 'Gain hands-on exposure to network topology, SDN architecture, network security, and routing protocols.'
  },
  {
    id: 105,
    company: 'Swiggy',
    internshipRole: 'Frontend Developer Intern',
    eligibleCourses: ['BCA', 'B.Tech', 'B.Sc', 'MCA'],
    duration: '3 Months',
    stipend: '₹35,000 / month',
    location: 'Remote',
    workMode: 'Remote',
    lastDate: '2026-10-16',
    description: 'Build responsive web interfaces in React and Tailwind CSS for consumer ordering and partner merchant portals.'
  },
  {
    id: 106,
    company: 'ICICI Bank',
    internshipRole: 'Wealth Management Summer Intern',
    eligibleCourses: ['BBA', 'MBA', 'B.Com'],
    duration: '2 Months',
    stipend: '₹20,000 / month',
    location: 'Mumbai / Delhi',
    workMode: 'On-site',
    lastDate: '2026-10-22',
    description: 'Conduct market research on mutual funds, equity products, and high-net-worth client financial planning.'
  }
];

export const sampleCompanies = [
  {
    id: 1,
    name: 'Tata Consultancy Services',
    industry: 'Information Technology & Consulting',
    location: 'Global / Multi-city India',
    description: 'Leading global IT services, consulting, and business solutions organization with extensive campus hiring programs.',
    openingsCount: 3,
    website: 'https://www.tcs.com'
  },
  {
    id: 2,
    name: 'Deloitte USI',
    industry: 'Management & Technology Consulting',
    location: 'Hyderabad, Bengaluru, Gurugram',
    description: 'One of the Big Four professional services firms offering audit, consulting, advisory, and tax solutions.',
    openingsCount: 2,
    website: 'https://www.deloitte.com'
  },
  {
    id: 3,
    name: 'Microsoft',
    industry: 'Software & Cloud Computing',
    location: 'Hyderabad, Bengaluru, Noida',
    description: 'Global tech titan delivering productivity tools, Windows OS, Azure cloud infrastructure, and AI technologies.',
    openingsCount: 2,
    website: 'https://www.microsoft.com'
  },
  {
    id: 4,
    name: 'Infosys',
    industry: 'Enterprise IT & Digital Services',
    location: 'Bengaluru, Pune, Mysuru',
    description: 'Next-generation digital services and consulting pioneer enabling enterprise clients across 50+ countries.',
    openingsCount: 2,
    website: 'https://www.infosys.com'
  },
  {
    id: 5,
    name: 'HDFC Bank',
    industry: 'Banking & Financial Services',
    location: 'Mumbai & Pan-India',
    description: "India's largest private sector bank offering banking, loan origination, digital cards, and corporate treasury.",
    openingsCount: 1,
    website: 'https://www.hdfcbank.com'
  },
  {
    id: 6,
    name: 'Amazon',
    industry: 'E-Commerce & Cloud Solutions',
    location: 'Hyderabad, Bengaluru, Chennai',
    description: 'World-leading e-commerce marketplace and cloud service provider with high-impact software engineering roles.',
    openingsCount: 1,
    website: 'https://www.amazon.in'
  },
  {
    id: 7,
    name: 'Ernst & Young (EY)',
    industry: 'Accounting, Tax & Advisory',
    location: 'Gurugram, Mumbai, Bengaluru',
    description: 'Big Four firm providing assurance, consulting, strategy, transactions, and tax advisory services worldwide.',
    openingsCount: 1,
    website: 'https://www.ey.com'
  },
  {
    id: 8,
    name: 'Wipro',
    industry: 'Information Technology Services',
    location: 'Bengaluru, Pune, Chennai',
    description: 'Multinational corporation providing information technology, consulting, and business process services.',
    openingsCount: 1,
    website: 'https://www.wipro.com'
  }
];

export const sampleDrives = [
  {
    id: 1,
    company: 'Tata Consultancy Services (TCS)',
    date: '2026-10-04',
    time: '09:30 AM',
    venue: 'Auditorium Block - A & Online Lab 3',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Tech'],
    jobRole: 'Software Developer Trainee (Ninja & Digital)',
    package: '₹4.5 - ₹7.2 LPA',
    selectionProcess: 'Aptitude Test ➔ Technical Interview ➔ HR Assessment',
    status: 'Upcoming'
  },
  {
    id: 2,
    company: 'Deloitte USI',
    date: '2026-10-12',
    time: '10:00 AM',
    venue: 'Management Seminar Hall 2',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA', 'MCA'],
    jobRole: 'Associate Business Technology Analyst',
    package: '₹8.1 LPA',
    selectionProcess: 'Online Case Assessment ➔ Group Discussion ➔ Partner Interview',
    status: 'Upcoming'
  },
  {
    id: 3,
    company: 'Infosys Limited',
    date: '2026-10-18',
    time: '09:00 AM',
    venue: 'Central Computer Center (All Labs)',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    jobRole: 'Systems Engineer & Specialist Programmer',
    package: '₹4.0 - ₹9.5 LPA',
    selectionProcess: 'National Qualifier Test (NQT) ➔ Technical & Behavioral Round',
    status: 'Upcoming'
  },
  {
    id: 4,
    company: 'HDFC Bank',
    date: '2026-10-24',
    time: '11:00 AM',
    venue: 'Commerce Block Seminar Room',
    eligibleCourses: ['B.Com', 'BBA', 'MBA', 'BA'],
    jobRole: 'Management Trainee - Operations',
    package: '₹6.2 LPA',
    selectionProcess: 'Financial Aptitude Test ➔ Panel Interview ➔ HR Round',
    status: 'Upcoming'
  }
];

export const sampleAnnouncements = [
  {
    id: 1,
    title: 'Mandatory Placement Registration & Resume Verification Drive 2026',
    description: 'All final year students from B.Tech, BCA, MCA, BBA, MBA, B.Com, and B.Sc must submit their approved resumes on the portal before October 1st to appear in on-campus interviews.',
    date: '2026-09-11',
    category: 'Urgent'
  },
  {
    id: 2,
    title: 'TCS National Qualifier Test (NQT) Schedule Announced',
    description: 'The TCS campus drive registration portal is live. Eligible students with CGPA 6.5 and above must check their email for registration test vouchers.',
    date: '2026-09-08',
    category: 'Drive Alert'
  },
  {
    id: 3,
    title: 'Mock Technical & HR Interview Workshop by Industry Alumni',
    description: 'Join corporate alumni mentors from Amazon, Deloitte, and Microsoft for a hands-on resume review and mock interview clinic in the Main Auditorium.',
    date: '2026-09-05',
    category: 'Workshop'
  },
  {
    id: 4,
    title: 'Deloitte USI Shortlisted Candidates for Case Study Round',
    description: 'The list of candidates advancing to Round 2 has been published. Shortlisted students must attend the mandatory briefing session at 3:00 PM tomorrow.',
    date: '2026-09-02',
    category: 'Results'
  },
  {
    id: 5,
    title: 'New College Internship Guidelines & Attendance Policy',
    description: 'Undergraduate students selected for 6-month corporate internships in their final semester can apply for academic NOC through the placement cell.',
    date: '2026-08-28',
    category: 'Policy'
  }
];

export const sampleApplications = [
  {
    id: 1,
    company: 'Tata Consultancy Services (TCS)',
    role: 'Graduate Software Engineer',
    type: 'Placement',
    appliedDate: '2026-09-05',
    status: 'Shortlisted'
  },
  {
    id: 2,
    company: 'Deloitte USI',
    role: 'Associate Business Technology Analyst',
    type: 'Placement',
    appliedDate: '2026-09-07',
    status: 'Interview'
  },
  {
    id: 3,
    company: 'Microsoft India',
    role: 'Software Engineering Intern',
    type: 'Internship',
    appliedDate: '2026-09-08',
    status: 'Applied'
  },
  {
    id: 4,
    company: 'Infosys Limited',
    role: 'Systems Engineer',
    type: 'Placement',
    appliedDate: '2026-08-25',
    status: 'Selected'
  }
];

export const prepModules = [
  {
    id: 'aptitude',
    title: 'Aptitude',
    icon: 'Calculator',
    description: 'Quantitative aptitude, percentages, ratios, time & work, permutations, probability, and speed math.',
    topics: ['Percentages & Profit/Loss', 'Time, Speed & Distance', 'Permutations & Combinations', 'Simple & Compound Interest', 'Data Interpretation Charts']
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    icon: 'Brain',
    description: 'Deductive reasoning, seating arrangements, blood relations, syllogisms, series completion, and coding-decoding.',
    topics: ['Linear & Circular Seating', 'Blood Relations', 'Syllogisms & Venn Diagrams', 'Direction Sense & Distances', 'Input-Output Tracing']
  },
  {
    id: 'verbal',
    title: 'Verbal Ability',
    icon: 'BookOpen',
    description: 'Grammar rules, reading comprehension, sentence correction, synonyms-antonyms, and critical reasoning.',
    topics: ['Reading Comprehension Passages', 'Error Spotting & Correction', 'Para Jumbles & Ordering', 'Vocabulary & Phrasal Verbs', 'Fill in the Blanks']
  },
  {
    id: 'prog-basics',
    title: 'Programming Basics',
    icon: 'Code',
    description: 'Core concepts of C, C++, Java, and Python: syntax, variables, loops, conditionals, functions, and pointers.',
    topics: ['Variables, Scope & Data Types', 'Control Structures & Loops', 'Functions & Recursion', 'Pointers & Memory Allocation', 'File Handling & Exception Handling']
  },
  {
    id: 'dsa',
    title: 'DSA Basics',
    icon: 'Layers',
    description: 'Arrays, linked lists, stacks, queues, binary trees, sorting algorithms, searching, and time complexity.',
    topics: ['Array Manipulations & Two Pointers', 'Singly & Doubly Linked Lists', 'Stack & Queue Applications', 'Binary Search & Quick Sort', 'Time & Space Complexity Big-O']
  },
  {
    id: 'dbms',
    title: 'DBMS',
    icon: 'Database',
    description: 'Relational database concepts, SQL queries, normalization (1NF to BCNF), indexing, and ACID transactions.',
    topics: ['SQL Queries, Joins & Subqueries', 'Database Normalization', 'ACID Properties & Transactions', 'Primary, Foreign & Unique Keys', 'Indexes & Query Optimization']
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: 'Globe',
    description: 'HTML5, CSS3, JavaScript ES6+, React fundamentals, REST APIs, HTTP methods, and responsive layouts.',
    topics: ['HTML Semantic Elements', 'CSS Box Model & Flexbox/Grid', 'JavaScript Closures & Promises', 'React Hooks (useState, useEffect)', 'REST API Request-Response Cycles']
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    icon: 'Users',
    description: 'Common technical questions, HR behavioral questions, the STAR method, and company-specific rounds.',
    topics: ['"Tell Me About Yourself" Pitch', 'STAR Method for Behavioral Qs', 'Strengths, Weaknesses & Projects', 'Technical Q&A Walkthroughs', 'Questions to Ask the Interviewer']
  },
  {
    id: 'gd',
    title: 'Group Discussion',
    icon: 'MessageSquare',
    description: 'Techniques for initiating, moderating, active listening, body language, and structuring arguments in GDs.',
    topics: ['Initiating & Summarizing GDs', 'Current Affairs & Case Studies', 'Handling Disagreements Politely', 'Body Language & Voice Modulation', 'Structuring Points (PESTLE Method)']
  },
  {
    id: 'resume',
    title: 'Resume Building',
    icon: 'FileText',
    description: 'ATS-compliant resume formatting, action verbs, project highlighting, metrics, and common mistakes to avoid.',
    topics: ['ATS-Friendly 1-Page Format', 'Quantifying Impact with Metrics', 'Writing Strong Project Descriptions', 'Highlighting Tech Stack & Skills', 'Grammar & Proofreading Checklist']
  }
];

export const sampleStudentsAdmin = [
  {
    id: 1,
    name: 'Aarav Sharma',
    studentId: 'STU2023089',
    course: 'B.Tech',
    department: 'Computer Science',
    cgpa: '8.65',
    applicationsCount: 4,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Priya Patel',
    studentId: 'STU2023014',
    course: 'BCA',
    department: 'Computer Applications',
    cgpa: '8.90',
    applicationsCount: 3,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Rohan Verma',
    studentId: 'STU2023142',
    course: 'BBA',
    department: 'Business Administration',
    cgpa: '7.80',
    applicationsCount: 2,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Ananya Gupta',
    studentId: 'STU2023055',
    course: 'B.Com',
    department: 'Commerce & Finance',
    cgpa: '8.10',
    applicationsCount: 3,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    studentId: 'STU2023201',
    course: 'MBA',
    department: 'Marketing & HR',
    cgpa: '8.40',
    applicationsCount: 5,
    status: 'Active'
  },
  {
    id: 6,
    name: 'Neha Kulkarni',
    studentId: 'STU2023078',
    course: 'MCA',
    department: 'Computer Applications',
    cgpa: '8.75',
    applicationsCount: 4,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Kabir Das',
    studentId: 'STU2023112',
    course: 'B.Sc',
    department: 'Information Technology',
    cgpa: '7.40',
    applicationsCount: 2,
    status: 'Active'
  }
];
