export type OpportunityType = 'placement' | 'internship' | 'drive';

export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export interface Student {
  id: number;
  name: string;
  rollNumber: string; // Student ID / Roll Number
  studentId?: string; // alias
  email: string;
  phone: string;
  course: string; // e.g., 'B.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Com', 'B.Sc', 'BA'
  department: string; // e.g., 'Computer Science & Engineering', 'Information Technology', 'Management Studies', etc.
  year: string; // e.g., '3rd Year', '4th Year'
  semester: string; // e.g., 'Semester VI'
  cgpa: number;
  graduationYear: string; // e.g., '2025', '2026'
  password?: string;
  avatarUrl?: string;
  skills: string[];
}

export interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  logoUrl?: string;
  contactEmail?: string;
  availablePositions?: number;
}

export interface PlacementOpportunity {
  id: number;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  jobRole: string;
  eligibleCourses: string[]; // ['BCA', 'B.Tech', 'MCA', etc.]
  eligibleDepartments: string[];
  eligibility?: string; // summary string for display
  requiredCgpa: number;
  graduationYear?: string;
  location: string;
  salaryPackage: string; // e.g. "6.5 LPA"
  jobType: 'Full Time' | 'Contract' | 'Part Time';
  lastDate: string;
  driveDate: string;
  description: string;
  rounds?: string[];
  status: 'Active' | 'Closed';
}

export interface InternshipOpportunity {
  id: number;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  role: string;
  eligibleCourses: string[]; // ['BCA', 'BBA', 'B.Tech', etc.]
  duration: string; // e.g. "3 Months", "6 Months"
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  locationType?: 'On-site' | 'Remote' | 'Hybrid';
  location: string;
  stipend: string; // e.g. "₹15,000 / month"
  skills: string[];
  eligibility?: string;
  requiredCgpa: number;
  lastDate: string;
  description: string;
  status: 'Active' | 'Closed';
}

export interface PlacementDrive {
  id: number;
  companyName: string;
  companyLogo?: string;
  jobRole: string;
  driveDate: string;
  reportingTime: string;
  venue: string;
  eligibleCourses: string[];
  package: string;
  selectionProcess: string;
  registrationDeadline: string;
  status: 'Registration Open' | 'Upcoming' | 'Completed';
  description?: string;
}

export interface Application {
  id: number;
  studentId: number;
  studentName: string;
  studentRoll: string;
  studentCgpa: number;
  studentCourse: string;
  studentDepartment?: string;
  studentEmail: string;
  studentPhone: string;
  opportunityType: OpportunityType;
  opportunityId: number;
  companyName: string;
  roleTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusUpdatedDate?: string;
  interviewDate?: string;
  adminNotes?: string;
}

export interface Announcement {
  id: number;
  title: string;
  category: 'Placement Drive' | 'Interview Schedule' | 'Aptitude Test' | 'Results' | 'Internship Update' | 'Important Notice';
  content: string;
  description?: string;
  datePosted: string;
  priority: 'High' | 'Normal';
  targetAudience?: string;
}

export interface PreparationResource {
  id: string;
  category: 'Aptitude' | 'Technical' | 'Soft Skills' | 'Resume' | 'Coding' | 'Logical Reasoning' | 'Communication Skills' | 'Resume Preparation' | 'Interview Preparation';
  title: string;
  description: string;
  keyPoints: string[];
  sampleQuestions?: {
    q: string;
    a: string;
    explanation?: string;
  }[];
}

export type ThemeType = 'indigo' | 'emerald' | 'sapphire' | 'crimson';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
}
