import {
  Student,
  Admin,
  Company,
  PlacementOpportunity,
  InternshipOpportunity,
  PlacementDrive,
  Application,
  Announcement,
  PreparationResource
} from './types';

export const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Rohan Sharma',
    rollNumber: 'BT2023CS045',
    studentId: 'BT2023CS045',
    email: 'rohan.sharma@college.edu',
    phone: '9876543210',
    course: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    semester: 'Semester VII',
    cgpa: 8.4,
    graduationYear: '2025',
    skills: ['Python', 'SQL', 'C++', 'Data Structures', 'React']
  },
  {
    id: 2,
    name: 'Priya Verma',
    rollNumber: 'BCA2023089',
    studentId: 'BCA2023089',
    email: 'priya.verma@college.edu',
    phone: '9823456789',
    course: 'BCA',
    department: 'Computer Applications',
    year: '3rd Year',
    semester: 'Semester VI',
    cgpa: 7.2,
    graduationYear: '2025',
    skills: ['Java', 'SQL', 'Web Development', 'Bootstrap', 'Manual Testing']
  },
  {
    id: 3,
    name: 'Aman Gupta',
    rollNumber: 'MCA2023012',
    studentId: 'MCA2023012',
    email: 'aman.gupta@college.edu',
    phone: '9911223344',
    course: 'MCA',
    department: 'Computer Applications',
    year: '2nd Year',
    semester: 'Semester IV',
    cgpa: 9.1,
    graduationYear: '2025',
    skills: ['React', 'Node.js', 'Python Flask', 'MongoDB', 'AWS']
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    rollNumber: 'BBA2023055',
    studentId: 'BBA2023055',
    email: 'ananya.iyer@college.edu',
    phone: '9845112233',
    course: 'BBA',
    department: 'Management Studies',
    year: '3rd Year',
    semester: 'Semester VI',
    cgpa: 8.0,
    graduationYear: '2025',
    skills: ['Business Analytics', 'Financial Modeling', 'MS Excel', 'Marketing Strategy']
  },
  {
    id: 5,
    name: 'Rahul Mehta',
    rollNumber: 'BC2023078',
    studentId: 'BC2023078',
    email: 'rahul.mehta@college.edu',
    phone: '9833445566',
    course: 'B.Com',
    department: 'Commerce & Accounting',
    year: '3rd Year',
    semester: 'Semester VI',
    cgpa: 7.8,
    graduationYear: '2025',
    skills: ['Financial Accounting', 'Corporate Taxation', 'Tally Prime', 'Auditing']
  },
  {
    id: 6,
    name: 'Sneha Kulkarni',
    rollNumber: 'BSC2023104',
    studentId: 'BSC2023104',
    email: 'sneha.k@college.edu',
    phone: '9765432198',
    course: 'B.Sc',
    department: 'Information Technology',
    year: '3rd Year',
    semester: 'Semester VI',
    cgpa: 6.8,
    graduationYear: '2025',
    skills: ['Python', 'Statistics', 'R Programming', 'Data Analytics']
  },
  {
    id: 7,
    name: 'Vikram Malhotra',
    rollNumber: 'MBA2023022',
    studentId: 'MBA2023022',
    email: 'vikram.m@college.edu',
    phone: '9811002233',
    course: 'MBA',
    department: 'Management Studies',
    year: '2nd Year',
    semester: 'Semester IV',
    cgpa: 8.6,
    graduationYear: '2025',
    skills: ['Product Strategy', 'HR Analytics', 'Operations', 'Client Relations']
  },
  {
    id: 8,
    name: 'Tanvi Deshmukh',
    rollNumber: 'BA2023019',
    studentId: 'BA2023019',
    email: 'tanvi.d@college.edu',
    phone: '9899887766',
    course: 'BA',
    department: 'Humanities & Mass Comm',
    year: '3rd Year',
    semester: 'Semester VI',
    cgpa: 7.5,
    graduationYear: '2025',
    skills: ['Content Writing', 'Public Relations', 'Digital Copywriting', 'Corporate Comm']
  }
];

export const initialAdmin: Admin = {
  id: 1,
  username: 'admin',
  email: 'tpo@college.edu',
  role: 'Training & Placement Officer (TPO)'
};

export const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'Tata Consultancy Services (TCS)',
    industry: 'Information Technology & Consulting',
    location: 'Mumbai / Pune / PAN India',
    description: 'A global IT services, consulting and business solutions leader recruiting engineering, computer applications, and science graduates.',
    website: 'https://www.tcs.com',
    contactEmail: 'careers@tcs.com',
    availablePositions: 45
  },
  {
    id: 2,
    name: 'Infosys Limited',
    industry: 'Enterprise Software & Cloud',
    location: 'Bengaluru / Hyderabad / Pune',
    description: 'Premier digital services and next-generation consulting organization hiring for Systems Engineer, Operations Executive, and Business Analyst positions.',
    website: 'https://www.infosys.com',
    contactEmail: 'campus.hiring@infosys.com',
    availablePositions: 35
  },
  {
    id: 3,
    name: 'Deloitte USI',
    industry: 'Audit, Consulting & Financial Advisory',
    location: 'Hyderabad / Gurugram / Mumbai',
    description: 'Leading international professional services firm offering career opportunities across technology consulting, financial advisory, and risk analytics.',
    website: 'https://www.deloitte.com',
    contactEmail: 'deloitte.campus@deloitte.com',
    availablePositions: 25
  },
  {
    id: 4,
    name: 'Wipro Technologies',
    industry: 'IT & Digital Transformation',
    location: 'Bengaluru / Noida / Chennai',
    description: 'Multinational corporation providing IT services and the prestigious Work Integrated Learning Program (WILP) for science & computer graduates.',
    website: 'https://www.wipro.com',
    contactEmail: 'campus.queries@wipro.com',
    availablePositions: 30
  },
  {
    id: 5,
    name: 'Zoho Corporation',
    industry: 'Product Software & SaaS',
    location: 'Chennai / Tenkasi / Salem',
    description: 'Indian multinational technology company creating enterprise cloud software suite with a pure merit and problem-solving recruitment model.',
    website: 'https://www.zoho.com',
    contactEmail: 'hiring@zohocorp.com',
    availablePositions: 20
  },
  {
    id: 6,
    name: 'HDFC Bank',
    industry: 'Banking & Financial Services',
    location: 'Mumbai / Delhi / PAN India',
    description: 'India\'s leading private sector bank recruiting for Management Trainees, Relationship Managers, and Financial Analyst roles.',
    website: 'https://www.hdfcbank.com',
    contactEmail: 'careers@hdfcbank.com',
    availablePositions: 40
  },
  {
    id: 7,
    name: 'Amazon India',
    industry: 'E-Commerce, Cloud & Operations',
    location: 'Bengaluru / Hyderabad / Gurugram',
    description: 'Global cloud and technology leader hiring for Software Development Engineers, Operations Specialists, and Cloud Support Associates.',
    website: 'https://www.amazon.jobs',
    contactEmail: 'amazon-campus@amazon.com',
    availablePositions: 18
  },
  {
    id: 8,
    name: 'Ernst & Young (EY)',
    industry: 'Tax, Strategy & Financial Assurance',
    location: 'Bengaluru / Gurugram / Kolkata',
    description: 'One of the largest professional services networks offering advisory, auditing, and tax analyst opportunities for commerce, finance, and management students.',
    website: 'https://www.ey.com',
    contactEmail: 'ey.campus@in.ey.com',
    availablePositions: 22
  },
  {
    id: 9,
    name: 'Tech Mahindra',
    industry: 'Telecom, AI & Digital Engineering',
    location: 'Pune / Hyderabad / Noida',
    description: 'Specialist in digital transformation, consulting and customer experience solutions for telecom and enterprise businesses.',
    website: 'https://www.techmahindra.com',
    contactEmail: 'campus@techmahindra.com',
    availablePositions: 28
  },
  {
    id: 10,
    name: 'Ogilvy & Mather',
    industry: 'Advertising, Media & Public Relations',
    location: 'Mumbai / Delhi / Bengaluru',
    description: 'World-renowned advertising and communications agency recruiting for digital copywriters, media strategists, and PR associates.',
    website: 'https://www.ogilvy.com',
    contactEmail: 'talent@ogilvy.com',
    availablePositions: 15
  }
];

export const initialPlacements: PlacementOpportunity[] = [
  {
    id: 1,
    companyId: 1,
    companyName: 'Tata Consultancy Services (TCS)',
    jobRole: 'Software Developer Trainee (Ninja & Digital)',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    eligibleDepartments: ['Computer Science & Engineering', 'Information Technology', 'Computer Applications'],
    eligibility: 'B.Tech / BCA / MCA / B.Sc (CS/IT) 2024 & 2025 passouts with no active backlogs',
    requiredCgpa: 6.5,
    graduationYear: '2025',
    location: 'Pune / Mumbai / Bengaluru',
    salaryPackage: '₹4.5 - 7.0 LPA',
    jobType: 'Full Time',
    lastDate: '2026-09-28',
    driveDate: '2026-10-06',
    description: 'Work on enterprise software systems, cloud native architectures, and microservices for international banking and healthcare clients.',
    rounds: ['Online Aptitude & Coding Test', 'Technical Interview', 'Managerial Round', 'HR Interview'],
    status: 'Active'
  },
  {
    id: 2,
    companyId: 3,
    companyName: 'Deloitte USI',
    jobRole: 'Associate Business Technology Analyst',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA'],
    eligibleDepartments: ['Management Studies', 'Commerce & Accounting', 'Computer Science & Engineering'],
    eligibility: 'BBA / MBA / B.Com / B.Tech / BCA with min 60% aggregate or 7.0 CGPA',
    requiredCgpa: 7.0,
    graduationYear: '2025',
    location: 'Hyderabad / Gurugram',
    salaryPackage: '₹7.2 - 8.5 LPA',
    jobType: 'Full Time',
    lastDate: '2026-09-30',
    driveDate: '2026-10-10',
    description: 'Collaborate with cross-functional global teams to deliver technology advisory, business data analytics, and cloud solution implementations.',
    rounds: ['Online Cognitive & Quantitative Assessment', 'Case Study Discussion', 'Partner Interview'],
    status: 'Active'
  },
  {
    id: 3,
    companyId: 2,
    companyName: 'Infosys Limited',
    jobRole: 'Systems Engineer & Operations Specialist',
    eligibleCourses: ['B.Tech', 'MCA', 'BCA', 'B.Sc'],
    eligibleDepartments: ['Computer Science & Engineering', 'Information Technology', 'Computer Applications'],
    eligibility: 'B.Tech, MCA, BCA, B.Sc with consistent academic background and minimum 60% in 10th & 12th',
    requiredCgpa: 6.0,
    graduationYear: '2025',
    location: 'Bengaluru / Hyderabad',
    salaryPackage: '₹3.6 - 4.2 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-02',
    driveDate: '2026-10-12',
    description: 'Design, develop, and maintain software modules across modern programming languages and automated DevOps delivery pipelines.',
    rounds: ['Aptitude & Pseudocode Assessment', 'Technical Discussion', 'HR Verification'],
    status: 'Active'
  },
  {
    id: 4,
    companyId: 6,
    companyName: 'HDFC Bank',
    jobRole: 'Management Trainee - Retail & Corporate Banking',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'BA'],
    eligibleDepartments: ['Management Studies', 'Commerce & Accounting', 'Economics & Humanities'],
    eligibility: 'BBA, MBA, B.Com, BA graduates with sound financial understanding and strong interpersonal communication',
    requiredCgpa: 6.5,
    graduationYear: '2025',
    location: 'Mumbai / Delhi / PAN India',
    salaryPackage: '₹5.5 - 6.8 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-05',
    driveDate: '2026-10-16',
    description: 'Manage client relationship portfolios, cross-sell digital wealth products, and handle branch financial operations.',
    rounds: ['Online Aptitude & Banking Knowledge', 'Group Discussion', 'Personal Interview'],
    status: 'Active'
  },
  {
    id: 5,
    companyId: 5,
    companyName: 'Zoho Corporation',
    jobRole: 'Product Software Engineer',
    eligibleCourses: ['BCA', 'B.Tech', 'MCA', 'B.Sc'],
    eligibleDepartments: ['Computer Science & Engineering', 'Computer Applications', 'Information Technology'],
    eligibility: 'Open to all technical degrees; pure skill-based evaluation with no percentage cut-off bar',
    requiredCgpa: 5.5,
    graduationYear: '2025',
    location: 'Chennai (On-site)',
    salaryPackage: '₹6.0 - 8.4 LPA',
    jobType: 'Full Time',
    lastDate: '2026-09-26',
    driveDate: '2026-10-04',
    description: 'Build scalable SaaS applications, web engines, and cloud databases used by millions of businesses worldwide.',
    rounds: ['Problem Solving & Basic Coding', 'Advanced Data Structures Round', 'System Design', 'HR Round'],
    status: 'Active'
  },
  {
    id: 6,
    companyId: 8,
    companyName: 'Ernst & Young (EY)',
    jobRole: 'Financial & Assurance Analyst',
    eligibleCourses: ['B.Com', 'BBA', 'MBA'],
    eligibleDepartments: ['Commerce & Accounting', 'Management Studies'],
    eligibility: 'B.Com / BBA / MBA students with strong accounting, taxation, and Excel modeling foundations',
    requiredCgpa: 7.0,
    graduationYear: '2025',
    location: 'Bengaluru / Gurugram',
    salaryPackage: '₹6.2 - 7.5 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-08',
    driveDate: '2026-10-18',
    description: 'Perform risk assessment, statutory audit reviews, internal controls evaluation, and corporate tax compliance filings.',
    rounds: ['Financial Aptitude & Reasoning Test', 'Technical Interview', 'Managerial Fitment Round'],
    status: 'Active'
  },
  {
    id: 7,
    companyId: 4,
    companyName: 'Wipro Technologies',
    jobRole: 'WILP Trainee (M.Tech Sponsorship + Job)',
    eligibleCourses: ['BCA', 'B.Sc'],
    eligibleDepartments: ['Computer Applications', 'Information Technology', 'Mathematics & CS'],
    eligibility: 'BCA / B.Sc with Mathematics in 12th standard, 60% aggregate throughout academics',
    requiredCgpa: 6.0,
    graduationYear: '2025',
    location: 'Bengaluru / Chennai / Noida',
    salaryPackage: '₹3.8 - 4.5 LPA + Full M.Tech BITS Pilani',
    jobType: 'Full Time',
    lastDate: '2026-10-04',
    driveDate: '2026-10-14',
    description: 'Work as a full-time software associate on live enterprise customer projects while earning a sponsored M.Tech degree from BITS Pilani.',
    rounds: ['Online Quantitative & Written Comm', 'Technical Assessment', 'HR Interview'],
    status: 'Active'
  },
  {
    id: 8,
    companyId: 7,
    companyName: 'Amazon India',
    jobRole: 'Cloud Support Associate & Operations Specialist',
    eligibleCourses: ['B.Tech', 'MCA', 'BCA', 'BBA', 'MBA'],
    eligibleDepartments: ['Computer Science & Engineering', 'Management Studies', 'Computer Applications'],
    eligibility: 'B.Tech, MCA, BCA, BBA, MBA graduates with analytical mindset, customer obsession, and basic cloud concepts',
    requiredCgpa: 6.5,
    graduationYear: '2025',
    location: 'Bengaluru / Hyderabad',
    salaryPackage: '₹7.5 - 9.0 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-12',
    driveDate: '2026-10-22',
    description: 'Provide technical assistance and operational support for AWS cloud services and supply chain logistics.',
    rounds: ['Online Assessment', 'Technical Deep Dive', 'Amazon Leadership Principles Interview', 'Bar Raiser Round'],
    status: 'Active'
  },
  {
    id: 9,
    companyId: 10,
    companyName: 'Ogilvy & Mather',
    jobRole: 'Digital Brand Strategist & Content Executive',
    eligibleCourses: ['BA', 'BBA', 'MBA'],
    eligibleDepartments: ['Humanities & Mass Comm', 'Management Studies'],
    eligibility: 'BA / BBA / MBA with exceptional verbal/written English, creative storytelling, and social media trends acumen',
    requiredCgpa: 6.0,
    graduationYear: '2025',
    location: 'Mumbai / Delhi',
    salaryPackage: '₹4.8 - 5.8 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-15',
    driveDate: '2026-10-24',
    description: 'Craft high-impact advertising campaigns, digital brand narratives, and multi-channel creative copywriting for top consumer brands.',
    rounds: ['Portfolio Review & Writing Task', 'Creative Pitch Round', 'Senior Creative Director Interview'],
    status: 'Active'
  },
  {
    id: 10,
    companyId: 9,
    companyName: 'Tech Mahindra',
    jobRole: 'Data Engineer & Cloud Associate',
    eligibleCourses: ['B.Tech', 'MCA', 'BCA', 'B.Sc'],
    eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
    eligibility: 'B.Tech / MCA / BCA / B.Sc final year students with maximum 1 pending backlog',
    requiredCgpa: 6.5,
    graduationYear: '2025',
    location: 'Pune / Hyderabad',
    salaryPackage: '₹4.2 - 5.2 LPA',
    jobType: 'Full Time',
    lastDate: '2026-10-18',
    driveDate: '2026-10-28',
    description: 'Build automated data extraction pipelines, ETL workflows, and reporting dashboards using Python, SQL, and PowerBI.',
    rounds: ['Cognitive MCQ Test', 'Technical Coding Evaluation', 'HR Round'],
    status: 'Active'
  }
];

export const initialInternships: InternshipOpportunity[] = [
  {
    id: 1,
    companyId: 5,
    companyName: 'Zoho Corporation',
    role: 'Frontend Development Intern',
    eligibleCourses: ['BCA', 'B.Tech', 'MCA', 'B.Sc'],
    duration: '6 Months',
    workMode: 'Hybrid',
    location: 'Chennai / Hybrid',
    stipend: '₹22,000 / month',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Git'],
    eligibility: 'Students in final or pre-final year with solid understanding of web fundamentals',
    requiredCgpa: 6.5,
    lastDate: '2026-09-25',
    description: 'Build fast, responsive user interfaces and test SaaS components used across millions of customer accounts.',
    status: 'Active'
  },
  {
    id: 2,
    companyId: 3,
    companyName: 'Deloitte USI',
    role: 'Business Analytics Intern',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA'],
    duration: '3 Months',
    workMode: 'On-site',
    location: 'Hyderabad Campus',
    stipend: '₹25,000 / month',
    skills: ['Excel Modeling', 'Tableau / PowerBI', 'SQL', 'Data Interpretation'],
    eligibility: 'Penultimate year students in management, commerce, or technical streams with analytical interest',
    requiredCgpa: 7.0,
    lastDate: '2026-09-28',
    description: 'Analyze enterprise datasets, build executive dashboards, and prepare client business intelligence reports.',
    status: 'Active'
  },
  {
    id: 3,
    companyId: 7,
    companyName: 'Amazon India',
    role: 'Cloud Operations & Support Intern',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    duration: '6 Months',
    workMode: 'Remote',
    location: 'Remote / Work From Home',
    stipend: '₹30,000 / month',
    skills: ['Linux Basics', 'Networking Fundamentals', 'Python Scripting', 'AWS Concepts'],
    eligibility: 'Final year undergraduate or master\'s students with passion for distributed cloud architecture',
    requiredCgpa: 7.0,
    lastDate: '2026-10-02',
    description: 'Investigate operational anomalies, automate troubleshooting scripts, and assist cloud engineers with AWS instances.',
    status: 'Active'
  },
  {
    id: 4,
    companyId: 8,
    companyName: 'Ernst & Young (EY)',
    role: 'Financial Research & Assurance Intern',
    eligibleCourses: ['B.Com', 'BBA', 'MBA'],
    duration: '4 Months',
    workMode: 'Hybrid',
    location: 'Bengaluru / Hybrid',
    stipend: '₹18,000 / month',
    skills: ['Financial Statements', 'Audit Support', 'MS Excel', 'Tax Research'],
    eligibility: 'Commerce and business students with completed courses in corporate accounting and corporate law',
    requiredCgpa: 6.8,
    lastDate: '2026-10-05',
    description: 'Support senior audit managers in analyzing balance sheets, verifying vendor invoices, and statutory tax reconciliation.',
    status: 'Active'
  },
  {
    id: 5,
    companyId: 10,
    companyName: 'Ogilvy & Mather',
    role: 'Social Media & Creative Copy Intern',
    eligibleCourses: ['BA', 'BBA', 'MBA'],
    duration: '3 Months',
    workMode: 'Remote',
    location: 'Work From Home',
    stipend: '₹15,000 / month',
    skills: ['Copywriting', 'Canva / Adobe', 'Social Media Trends', 'Storyboarding'],
    eligibility: 'Creative students with active digital presence, writing samples, or university magazine contributions',
    requiredCgpa: 6.0,
    lastDate: '2026-10-08',
    description: 'Ideate punchy social media ad copy, draft campaign scripts, and analyze engagement metrics across Instagram & LinkedIn.',
    status: 'Active'
  },
  {
    id: 6,
    companyId: 6,
    companyName: 'HDFC Bank',
    role: 'Banking Operations & FinTech Intern',
    eligibleCourses: ['BBA', 'B.Com', 'MBA', 'BA'],
    duration: '3 Months',
    workMode: 'On-site',
    location: 'Regional Circle Offices',
    stipend: '₹16,000 / month',
    skills: ['KYC Operations', 'Customer Service', 'Banking Software', 'Documentation'],
    eligibility: 'Students pursuing banking, finance, economics, or general business administration',
    requiredCgpa: 6.2,
    lastDate: '2026-10-10',
    description: 'Understand core banking processing, merchant digital onboarding, and loan documentation verification.',
    status: 'Active'
  },
  {
    id: 7,
    companyId: 9,
    companyName: 'Tech Mahindra',
    role: 'Software QA & Test Automation Intern',
    eligibleCourses: ['BCA', 'B.Tech', 'B.Sc'],
    duration: '4 Months',
    workMode: 'Remote',
    location: 'Work From Home',
    stipend: '₹15,000 / month',
    skills: ['Manual Testing', 'Python Basics', 'Selenium', 'Jira'],
    eligibility: 'Computer science students interested in software test engineering and defect reporting cycles',
    requiredCgpa: 6.0,
    lastDate: '2026-10-12',
    description: 'Write functional test cases, execute regression runs, log bugs in Jira, and build automated tests in Selenium.',
    status: 'Active'
  },
  {
    id: 8,
    companyId: 1,
    companyName: 'Tata Consultancy Services (TCS)',
    role: 'Python & Web Development Intern',
    eligibleCourses: ['B.Tech', 'MCA', 'BCA'],
    duration: '6 Months',
    workMode: 'Hybrid',
    location: 'Mumbai Innovation Lab',
    stipend: '₹20,000 / month',
    skills: ['Python Flask', 'REST APIs', 'SQL Database', 'Git'],
    eligibility: 'Students with hands-on web framework exposure and active GitHub portfolio projects',
    requiredCgpa: 7.0,
    lastDate: '2026-10-15',
    description: 'Contribute to internal enterprise management tools, data parsing scripts, and microservice APIs.',
    status: 'Active'
  },
  {
    id: 9,
    companyId: 2,
    companyName: 'Infosys Limited',
    role: 'HR & Talent Acquisition Intern',
    eligibleCourses: ['MBA', 'BBA', 'BA'],
    duration: '3 Months',
    workMode: 'Hybrid',
    location: 'Pune Development Centre',
    stipend: '₹14,000 / month',
    skills: ['Talent Sourcing', 'Communication', 'HRMS Portals', 'Interview Scheduling'],
    eligibility: 'Management and arts students interested in human resources, campus recruitment, and organizational behavior',
    requiredCgpa: 6.5,
    lastDate: '2026-10-18',
    description: 'Assist the campus recruitment team in resume pre-screening, candidate communication, and recruitment drive logistics.',
    status: 'Active'
  },
  {
    id: 10,
    companyId: 4,
    companyName: 'Wipro Technologies',
    role: 'Market Research & Business Development Intern',
    eligibleCourses: ['BBA', 'MBA', 'B.Com'],
    duration: '3 Months',
    workMode: 'Remote',
    location: 'Work From Home',
    stipend: '₹17,000 / month',
    skills: ['Market Sizing', 'Competitor Analysis', 'Cold Outreach', 'Pitch Decks'],
    eligibility: 'Passionate business students with good presentation skills and curiosity about enterprise tech consulting',
    requiredCgpa: 6.2,
    lastDate: '2026-10-20',
    description: 'Conduct secondary research on emerging AI and cloud trends, identify key enterprise buyer personas, and prepare pitch decks.',
    status: 'Active'
  }
];

export const initialDrives: PlacementDrive[] = [
  {
    id: 1,
    companyName: 'Tata Consultancy Services (TCS)',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Software Developer Trainee (Ninja / Digital)',
    driveDate: '2026-10-06',
    reportingTime: '08:30 AM IST',
    venue: 'College Main Auditorium & Computing Lab 1-4',
    eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
    package: '₹4.5 - 7.0 LPA',
    selectionProcess: 'Online NQT Test → Technical Interview → Managerial Interview → HR Discussion',
    registrationDeadline: '2026-09-28',
    status: 'Registration Open',
    description: 'Annual flagship on-campus recruitment drive for engineering and computer application graduates across all branches.'
  },
  {
    id: 2,
    companyName: 'Deloitte USI',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Associate Business Technology Analyst',
    driveDate: '2026-10-10',
    reportingTime: '09:00 AM IST',
    venue: 'Management Block - Seminar Hall 2',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BCA'],
    package: '₹7.2 - 8.5 LPA',
    selectionProcess: 'Aptitude & Case Study MCQ → Group Case Presentation → Partner Interview',
    registrationDeadline: '2026-09-30',
    status: 'Registration Open',
    description: 'Strategic campus hiring for consulting and technology analyst profiles with fast-track corporate leadership training.'
  },
  {
    id: 3,
    companyName: 'Infosys Limited',
    companyLogo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Systems Engineer & Specialist Programmer',
    driveDate: '2026-10-12',
    reportingTime: '09:00 AM IST',
    venue: 'Virtual Proctored Drive (Computer Labs & Personal Laptops)',
    eligibleCourses: ['B.Tech', 'MCA', 'BCA', 'B.Sc'],
    package: '₹3.6 - 4.2 LPA',
    selectionProcess: 'InfyTQ Qualifier / Cognitive Test → Technical Interview → HR Verification',
    registrationDeadline: '2026-10-02',
    status: 'Upcoming',
    description: 'Pan-college recruitment drive welcoming final-year undergraduate and postgraduate tech students.'
  },
  {
    id: 4,
    companyName: 'HDFC Bank',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Management Trainee (Retail & Corporate)',
    driveDate: '2026-10-16',
    reportingTime: '09:30 AM IST',
    venue: 'Commerce & Management Seminar Hall',
    eligibleCourses: ['BBA', 'MBA', 'B.Com', 'BA'],
    package: '₹5.5 - 6.8 LPA',
    selectionProcess: 'Banking Aptitude Assessment → Group Discussion → Branch Head Panel Interview',
    registrationDeadline: '2026-10-05',
    status: 'Registration Open',
    description: 'Premier banking sector placement drive hiring relationship officers and commercial portfolio managers.'
  },
  {
    id: 5,
    companyName: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Product Software Engineer',
    driveDate: '2026-10-20',
    reportingTime: '08:45 AM IST',
    venue: 'IT Block - High Performance Lab 5',
    eligibleCourses: ['BCA', 'B.Tech', 'MCA', 'B.Sc'],
    package: '₹6.0 - 8.4 LPA',
    selectionProcess: 'Round 1 Basic Coding → Round 2 Complex Algorithmic Challenge → Round 3 System Design → HR',
    registrationDeadline: '2026-10-10',
    status: 'Upcoming',
    description: 'Zoho\'s on-campus hack-and-hire sprint focusing strictly on practical coding and problem-solving skills.'
  },
  {
    id: 6,
    companyName: 'Wipro Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
    jobRole: 'WILP Trainee (M.Tech Sponsorship)',
    driveDate: '2026-09-08',
    reportingTime: '09:00 AM IST',
    venue: 'Central Placement Hall',
    eligibleCourses: ['BCA', 'B.Sc'],
    package: '₹3.8 - 4.5 LPA',
    selectionProcess: 'Online Test → Technical Interview → HR Verification',
    registrationDeadline: '2026-09-02',
    status: 'Completed',
    description: 'Completed placement drive. 24 students received Letters of Intent with fully sponsored higher education.'
  }
];

export const initialApplications: Application[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Rohan Sharma',
    studentRoll: 'BT2023CS045',
    studentCgpa: 8.4,
    studentCourse: 'B.Tech',
    studentDepartment: 'Computer Science & Engineering',
    studentEmail: 'rohan.sharma@college.edu',
    studentPhone: '9876543210',
    opportunityType: 'placement',
    opportunityId: 1,
    companyName: 'Tata Consultancy Services (TCS)',
    roleTitle: 'Software Developer Trainee (Ninja & Digital)',
    appliedDate: '2026-09-02',
    status: 'Interview',
    interviewDate: '2026-10-06 at 10:30 AM (Auditorium Hall 2)',
    adminNotes: 'Cleared Online Aptitude test with 88 percentile. Face-to-face Technical round scheduled.'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Rohan Sharma',
    studentRoll: 'BT2023CS045',
    studentCgpa: 8.4,
    studentCourse: 'B.Tech',
    studentDepartment: 'Computer Science & Engineering',
    studentEmail: 'rohan.sharma@college.edu',
    studentPhone: '9876543210',
    opportunityType: 'internship',
    opportunityId: 1,
    companyName: 'Zoho Corporation',
    roleTitle: 'Frontend Development Intern',
    appliedDate: '2026-09-05',
    status: 'Shortlisted',
    adminNotes: 'Resume verified and forwarded to Zoho HR panel. Awaiting coding test link.'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Priya Verma',
    studentRoll: 'BCA2023089',
    studentCgpa: 7.2,
    studentCourse: 'BCA',
    studentDepartment: 'Computer Applications',
    studentEmail: 'priya.verma@college.edu',
    studentPhone: '9823456789',
    opportunityType: 'placement',
    opportunityId: 3,
    companyName: 'Infosys Limited',
    roleTitle: 'Systems Engineer & Operations Specialist',
    appliedDate: '2026-09-04',
    status: 'Selected',
    adminNotes: 'Congratulated! Received Letter of Intent (LOI) with annual package 3.8 LPA.'
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Aman Gupta',
    studentRoll: 'MCA2023012',
    studentCgpa: 9.1,
    studentCourse: 'MCA',
    studentDepartment: 'Computer Applications',
    studentEmail: 'aman.gupta@college.edu',
    studentPhone: '9911223344',
    opportunityType: 'placement',
    opportunityId: 5,
    companyName: 'Zoho Corporation',
    roleTitle: 'Product Software Engineer',
    appliedDate: '2026-09-03',
    status: 'Interview',
    interviewDate: '2026-10-04 at 2:00 PM (Google Meet Online)',
    adminNotes: 'Aced machine round. Final managerial discussion pending.'
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'Ananya Iyer',
    studentRoll: 'BBA2023055',
    studentCgpa: 8.0,
    studentCourse: 'BBA',
    studentDepartment: 'Management Studies',
    studentEmail: 'ananya.iyer@college.edu',
    studentPhone: '9845112233',
    opportunityType: 'placement',
    opportunityId: 2,
    companyName: 'Deloitte USI',
    roleTitle: 'Associate Business Technology Analyst',
    appliedDate: '2026-09-06',
    status: 'Shortlisted',
    adminNotes: 'Candidate cleared preliminary cognitive assessment. Case study slot allocated.'
  },
  {
    id: 6,
    studentId: 5,
    studentName: 'Rahul Mehta',
    studentRoll: 'BC2023078',
    studentCgpa: 7.8,
    studentCourse: 'B.Com',
    studentDepartment: 'Commerce & Accounting',
    studentEmail: 'rahul.mehta@college.edu',
    studentPhone: '9833445566',
    opportunityType: 'placement',
    opportunityId: 4,
    companyName: 'HDFC Bank',
    roleTitle: 'Management Trainee - Retail & Corporate Banking',
    appliedDate: '2026-09-07',
    status: 'Applied',
    adminNotes: 'Application registered. Awaiting initial banking aptitude review.'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'TCS National Qualifier Test (NQT) Registration Deadline Approaching',
    category: 'Placement Drive',
    content: 'All graduating students from B.Tech, BCA, MCA, and B.Sc intending to appear for the upcoming TCS on-campus recruitment must complete their profile on TCS NextStep portal and submit their CT/DT reference ID to the Placement Cell by 28th September.',
    description: 'All graduating students from B.Tech, BCA, MCA, and B.Sc intending to appear for the upcoming TCS on-campus recruitment must complete their profile on TCS NextStep portal and submit their CT/DT reference ID to the Placement Cell by 28th September.',
    datePosted: '2026-09-10',
    priority: 'High',
    targetAudience: 'B.Tech, BCA, MCA, B.Sc Final Year'
  },
  {
    id: 2,
    title: 'Deloitte USI Case Study Assessment & Schedule Released',
    category: 'Interview Schedule',
    content: 'Shortlisted candidates for Deloitte Associate Business Technology Analyst role are instructed to report to Management Seminar Hall 2 on 10th October at 9:00 AM sharp with college ID card and portfolio resumes.',
    description: 'Shortlisted candidates for Deloitte Associate Business Technology Analyst role are instructed to report to Management Seminar Hall 2 on 10th October at 9:00 AM sharp with college ID card and portfolio resumes.',
    datePosted: '2026-09-09',
    priority: 'High',
    targetAudience: 'BBA, MBA, B.Com, B.Tech, BCA Shortlisted Students'
  },
  {
    id: 3,
    title: 'Pre-Placement Aptitude & Technical Diagnostic Test',
    category: 'Aptitude Test',
    content: 'The Training & Placement Cell has organized a comprehensive pre-placement diagnostic test covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability on Saturday, 19th September from 10:00 AM to 12:30 PM.',
    description: 'The Training & Placement Cell has organized a comprehensive pre-placement diagnostic test covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability on Saturday, 19th September from 10:00 AM to 12:30 PM.',
    datePosted: '2026-09-08',
    priority: 'Normal',
    targetAudience: 'Students from All Courses'
  },
  {
    id: 4,
    title: 'HDFC Bank Campus Drive Registration Announced',
    category: 'Placement Drive',
    content: 'HDFC Bank will be visiting our campus for hiring Management Trainees for Retail & Corporate Banking. Final year BBA, MBA, B.Com, and BA students with minimum 6.5 CGPA can register before 5th October.',
    description: 'HDFC Bank will be visiting our campus for hiring Management Trainees for Retail & Corporate Banking. Final year BBA, MBA, B.Com, and BA students with minimum 6.5 CGPA can register before 5th October.',
    datePosted: '2026-09-06',
    priority: 'High',
    targetAudience: 'BBA, MBA, B.Com, BA Final Year'
  },
  {
    id: 5,
    title: 'Wipro Technologies WILP Selection Results Declared',
    category: 'Results',
    content: 'Heartiest congratulations to the 24 students selected for Wipro Technologies Work Integrated Learning Program (WILP). Selected candidates should collect their physical offer letters from the Placement Office.',
    description: 'Heartiest congratulations to the 24 students selected for Wipro Technologies Work Integrated Learning Program (WILP). Selected candidates should collect their physical offer letters from the Placement Office.',
    datePosted: '2026-09-05',
    priority: 'Normal',
    targetAudience: 'BCA & B.Sc CS'
  },
  {
    id: 6,
    title: 'Mandatory Resume Verification Drive for Pre-Final & Final Year Students',
    category: 'Important Notice',
    content: 'Students across all departments must verify their resume format against the standard college placement cell template before applying for corporate drives. Visit TPO room between 3 PM - 5 PM on working days.',
    description: 'Students across all departments must verify their resume format against the standard college placement cell template before applying for corporate drives. Visit TPO room between 3 PM - 5 PM on working days.',
    datePosted: '2026-09-03',
    priority: 'Normal',
    targetAudience: 'All Departments'
  }
];

export const preparationResources: PreparationResource[] = [
  {
    id: 'prep-aptitude',
    category: 'Aptitude',
    title: 'Quantitative & Numerical Aptitude Guide',
    description: 'Essential mathematical formulas, shortcut calculations, and recurring question patterns in TCS, Infosys, Deloitte, and bank recruitment tests.',
    keyPoints: [
      'Time & Work: If A takes x days and B takes y days, together they take (x*y)/(x+y) days.',
      'Speed, Distance & Time: Relative speed for objects in opposite direction is (S1 + S2), same direction is (S1 - S2). Conversion: km/h to m/s = multiply by 5/18.',
      'Percentages, Profit & Loss: Successive discounts formula = D1 + D2 - (D1 * D2 / 100). Profit % = (Profit / Cost Price) * 100.',
      'Simple & Compound Interest: SI = (P * R * T) / 100. CI difference for 2 years = P * (R/100)^2.',
      'Ratios, Proportions & Averages: Weighted average calculations and mixture alligation formulas.'
    ],
    sampleQuestions: [
      {
        q: 'A and B together can complete a project in 12 days. If A alone completes it in 20 days, how long will B take alone?',
        a: '30 Days',
        explanation: 'Work by A in 1 day = 1/20. Work by (A+B) in 1 day = 1/12. Work by B = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. Hence, B takes 30 days.'
      },
      {
        q: 'A train 180 meters long is running at 72 km/h. How many seconds will it take to cross an electric pole?',
        a: '9 Seconds',
        explanation: 'Speed = 72 * (5/18) = 20 m/s. Time = Distance / Speed = 180 / 20 = 9 seconds.'
      },
      {
        q: 'Find the single discount equivalent to two successive discounts of 20% and 10%.',
        a: '28%',
        explanation: 'Effective discount = 20 + 10 - (20 * 10)/100 = 30 - 2 = 28%.'
      }
    ]
  },
  {
    id: 'prep-logical',
    category: 'Aptitude',
    title: 'Logical & Analytical Reasoning Modules',
    description: 'Step-by-step methods to tackle puzzles, seating arrangement, syllogisms, blood relations, and directional vectors.',
    keyPoints: [
      'Blood Relations: Trace relationships backwards from the referenced person ("His mother is the only daughter of my father...").',
      'Direction Sense: Draw a 4-quadrant cross (North-South, East-West) and plot turn-by-turn vectors carefully.',
      'Coding-Decoding: Memorize alphabetical positions (A=1, Z=26) and complementary pairs (Sum = 27, e.g., A=Z, B=Y). Keyword: EJOTY (5, 10, 15, 20, 25).',
      'Syllogisms: Use Euler Venn diagrams to test "All", "Some", "No" statements.',
      'Number & Letter Series: Test differences, squares/cubes (+/- 1), and alternating series.'
    ],
    sampleQuestions: [
      {
        q: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
        a: '127',
        explanation: 'Each term is (previous * 2) + 1. So 63 * 2 + 1 = 126 + 1 = 127.'
      },
      {
        q: 'Pointing to a photograph, a man said, "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
        a: 'His Son\'s photograph',
        explanation: 'Since the speaker has no siblings, "my father\'s son" is the speaker himself. So "that man\'s father is me" -> the photograph is of his son.'
      }
    ]
  },
  {
    id: 'prep-technical',
    category: 'Technical',
    title: 'Core Programming, Web & Database Concepts',
    description: 'Fundamental technical topics asked across software development, IT operations, and data analytics interviews.',
    keyPoints: [
      'Programming Basics: Control structures, functions, pointers/references, recursion, and exception handling.',
      'Data Structures: Arrays, Linked Lists, Stacks, Queues, Binary Trees, and Hash Maps with time complexity analysis.',
      'Database Basics: Relational models, primary/foreign keys, normalization (1NF to 3NF), and SQL queries (JOINs, GROUP BY, HAVING).',
      'Web Development: Client-server architecture, HTTP methods (GET, POST, PUT, DELETE), RESTful API conventions, and MVC architecture.',
      'Object-Oriented Programming (OOP): Encapsulation, Abstraction, Inheritance, and Polymorphism with real-world examples.'
    ],
    sampleQuestions: [
      {
        q: 'Write a SQL query to find the second highest salary from an Employee table.',
        a: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
        explanation: 'The inner subquery finds the absolute maximum salary, and the outer query picks the maximum salary strictly lower than that.'
      },
      {
        q: 'What is the difference between Method Overloading and Method Overriding?',
        a: 'Overloading is Compile-time polymorphism (same method name, different parameter types/count in the same class). Overriding is Run-time polymorphism (child class provides a specific implementation of a parent class method with the exact same signature).',
        explanation: 'Overloading improves code readability; overriding provides specialized behavior in class hierarchies.'
      }
    ]
  },
  {
    id: 'prep-softskills',
    category: 'Soft Skills',
    title: 'Communication, Group Discussion (GD) & HR Round',
    description: 'Techniques to articulate thoughts clearly, participate constructively in group discussions, and excel in behavioral interviews.',
    keyPoints: [
      'The 3 Pillars of Group Discussion: Content (data & facts), Structure (introduction, analytical points, balanced conclusion), and Conduct (polite body language).',
      'Entering a Discussion Politely: "I agree with that perspective, and to build on this...", "While that is a valid point, another angle we should examine is..."',
      'Handling Disagreements: Never interrupt aggressively. Wait for a natural pause and present contrasting points respectfully.',
      'The STAR Method: Structure behavioral answers with Situation, Task, Action you took, and final measurable Result.',
      'HR Questions: Craft authentic answers for "Tell me about yourself", "Why should we hire you?", and "What is your biggest strength?"'
    ],
    sampleQuestions: [
      {
        q: 'How should you summarize a Group Discussion if given the opportunity?',
        a: 'Provide a neutral, collective synthesis: "In our discussion today, our group explored both benefits and concerns regarding... Members highlighted points A and B, while concerns X and Y were raised. Conclusively, a balanced approach combining... will yield the best outcome."',
        explanation: 'A strong summary represents the entire group\'s dialogue rather than repeating personal views.'
      }
    ]
  },
  {
    id: 'prep-resume',
    category: 'Resume',
    title: 'Professional Resume Building & Best Practices',
    description: 'How to build an ATS-friendly resume for undergraduate and postgraduate students from all departments.',
    keyPoints: [
      'Keep it to One Page: For undergraduate freshers, a clean single-page format with 0.5 to 0.75-inch margins is recommended.',
      'Clear Section Hierarchy: Contact Information -> Career Objective / Summary -> Education Table -> Technical & Domain Skills -> Projects / Internships -> Extra-Curricular.',
      'Use Action Verbs: Begin bullet points with strong verbs such as "Architected", "Engineered", "Analyzed", "Spearheaded", "Coordinated", "Implemented".',
      'Highlight Measurable Results: Instead of "Built a website", write "Developed a college placement portal using Python Flask and SQLite, managing records for 500+ students and 10+ partner companies."',
      'Common Mistakes to Avoid: Spelling/grammatical errors, inconsistent fonts, untruthful claims, and unprofessional email addresses.'
    ],
    sampleQuestions: [
      {
        q: 'What is the most effective way to describe an academic project on your resume?',
        a: 'College Placement & Internship Cell Portal | Python Flask, SQLite, Bootstrap 5\n• Designed a centralized portal supporting multi-course student registration, eligibility checking, and real-time application tracking.\n• Implemented secure session-based authentication and role-based access for students and placement cell administrators.\n• Engineered modular database schema across 7 relational tables with sample datasets for viva demonstration.',
        explanation: 'Highlights technologies used, system architecture, core functionality, and concrete scope.'
      }
    ]
  }
];

export const allCoursesList = [
  'B.Tech',
  'BCA',
  'MCA',
  'BBA',
  'MBA',
  'B.Com',
  'B.Sc',
  'BA',
  'M.Tech',
  'Other Undergraduate Program',
  'Other Postgraduate Program'
];

export const allDepartmentsList = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Computer Applications',
  'Management Studies',
  'Commerce & Accounting',
  'Science & Mathematics',
  'Humanities & Mass Comm',
  'Economics & Social Sciences'
];
