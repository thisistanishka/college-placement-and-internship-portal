import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Admin,
  Company,
  PlacementOpportunity,
  InternshipOpportunity,
  PlacementDrive,
  Application,
  Announcement,
  ApplicationStatus,
  OpportunityType,
  ToastMessage
} from '../types';
import {
  initialStudents,
  initialAdmin,
  initialCompanies,
  initialPlacements,
  initialInternships,
  initialDrives,
  initialApplications,
  initialAnnouncements
} from '../mockData';

interface AppContextType {
  // Current user state
  currentRole: 'student' | 'admin' | 'guest';
  currentStudent: Student | null;
  currentAdmin: Admin | null;
  
  // Data collections
  students: Student[];
  companies: Company[];
  placements: PlacementOpportunity[];
  internships: InternshipOpportunity[];
  drives: PlacementDrive[];
  applications: Application[];
  announcements: Announcement[];
  
  // Auth methods
  loginAsStudent: (studentId: number) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  registerStudent: (studentData: Omit<Student, 'id'>) => { success: boolean; message: string };
  studentLoginWithCredentials: (rollNumberOrEmail: string, password?: string) => { success: boolean; message: string };
  adminLoginWithCredentials: (username: string, password?: string) => { success: boolean; message: string };
  updateStudentProfile: (updatedData: Partial<Student>) => { success: boolean; message: string };

  // Student Actions
  applyForOpportunity: (
    opportunityType: OpportunityType,
    opportunityId: number
  ) => { success: boolean; message: string };
  hasStudentApplied: (opportunityType: OpportunityType, opportunityId: number) => boolean;
  getStudentApplications: (studentId: number) => Application[];

  // Admin Actions
  updateApplicationStatus: (
    applicationId: number,
    newStatus: ApplicationStatus,
    adminNotes?: string,
    interviewDate?: string
  ) => void;
  
  // Company CRUD
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: number) => void;

  // Placement CRUD
  addPlacement: (placement: Omit<PlacementOpportunity, 'id'>) => void;
  updatePlacement: (placement: PlacementOpportunity) => void;
  deletePlacement: (id: number) => void;

  // Internship CRUD
  addInternship: (internship: Omit<InternshipOpportunity, 'id'>) => void;
  updateInternship: (internship: InternshipOpportunity) => void;
  deleteInternship: (id: number) => void;

  // Drive CRUD
  addDrive: (drive: Omit<PlacementDrive, 'id'>) => void;
  updateDrive: (drive: PlacementDrive) => void;
  deleteDrive: (id: number) => void;

  // Announcement CRUD
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: number) => void;

  // Bookmarks & Toast
  bookmarks: string[];
  toggleBookmark: (key: string) => void;
  isBookmarked: (key: string) => boolean;
  toast: ToastMessage | null;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  clearToast: () => void;

  // Reset
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'cp_portal_students',
  COMPANIES: 'cp_portal_companies',
  PLACEMENTS: 'cp_portal_placements',
  INTERNSHIPS: 'cp_portal_internships',
  DRIVES: 'cp_portal_drives',
  APPLICATIONS: 'cp_portal_applications',
  ANNOUNCEMENTS: 'cp_portal_announcements',
  CURRENT_ROLE: 'cp_portal_current_role',
  CURRENT_STUDENT_ID: 'cp_portal_current_student_id',
  BOOKMARKS: 'cp_portal_bookmarks'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or mock data
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return saved ? JSON.parse(saved) : initialCompanies;
  });

  const [placements, setPlacements] = useState<PlacementOpportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLACEMENTS);
    return saved ? JSON.parse(saved) : initialPlacements;
  });

  const [internships, setInternships] = useState<InternshipOpportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERNSHIPS);
    return saved ? JSON.parse(saved) : initialInternships;
  });

  const [drives, setDrives] = useState<PlacementDrive[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRIVES);
    return saved ? JSON.parse(saved) : initialDrives;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  // Current session
  const [currentRole, setCurrentRole] = useState<'student' | 'admin' | 'guest'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE);
    return (saved as 'student' | 'admin' | 'guest') || 'guest';
  });

  const [currentStudentId, setCurrentStudentId] = useState<number | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT_ID);
    return saved ? Number(saved) : null;
  });

  const [currentAdmin] = useState<Admin>(initialAdmin);

  // Bookmark / Shortlisted opportunities
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : ['placement-1', 'internship-1'];
  });

  // Interactive Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (key: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(key);
      const updated = exists ? prev.filter(k => k !== key) : [...prev, key];
      showToast({
        type: exists ? 'info' : 'success',
        title: exists ? 'Removed from Bookmarks' : 'Saved to Bookmarks',
        message: exists ? 'Opportunity removed from your shortlist.' : 'Opportunity saved for easy review.'
      });
      return updated;
    });
  };

  const isBookmarked = (key: string) => bookmarks.includes(key);

  const showToast = (t: Omit<ToastMessage, 'id'>) => {
    const newToast: ToastMessage = { ...t, id: String(Date.now()) };
    setToast(newToast);
  };

  const clearToast = () => setToast(null);

  // Auto-hide toast after 4s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLACEMENTS, JSON.stringify(placements));
  }, [placements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, currentRole);
    if (currentStudentId !== null) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT_ID, String(currentStudentId));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_STUDENT_ID);
    }
  }, [currentRole, currentStudentId]);

  const currentStudent = currentStudentId
    ? students.find(s => s.id === currentStudentId) || null
    : null;

  // Auth methods
  const loginAsStudent = (studentId: number) => {
    const std = students.find(s => s.id === studentId);
    if (std) {
      setCurrentRole('student');
      setCurrentStudentId(studentId);
      showToast({
        type: 'success',
        title: 'Student Login Successful',
        message: `Welcome back, ${std.name} (${std.course} - ${std.department})!`
      });
    }
  };

  const loginAsAdmin = () => {
    setCurrentRole('admin');
    setCurrentStudentId(null);
    showToast({
      type: 'success',
      title: 'TPO Officer Signed In',
      message: 'Welcome to the Placement Cell Admin Panel.'
    });
  };

  const logout = () => {
    setCurrentRole('guest');
    setCurrentStudentId(null);
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been safely signed out from the portal.'
    });
  };

  const registerStudent = (studentData: Omit<Student, 'id'>) => {
    // Check if roll number or email already exists
    const exists = students.some(
      s => s.rollNumber.toLowerCase() === studentData.rollNumber.toLowerCase() ||
           s.email.toLowerCase() === studentData.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'A student with this Roll Number / ID or Email is already registered.' };
    }

    const newStudent: Student = {
      ...studentData,
      id: Date.now(),
      studentId: studentData.rollNumber
    };

    setStudents(prev => [...prev, newStudent]);
    setCurrentRole('student');
    setCurrentStudentId(newStudent.id);

    return {
      success: true,
      message: `Registration successful! Welcome to the College Placement Portal, ${newStudent.name}.`
    };
  };

  const studentLoginWithCredentials = (rollNumberOrEmail: string, _password?: string) => {
    const query = rollNumberOrEmail.trim().toLowerCase();
    const found = students.find(
      s => s.rollNumber.toLowerCase() === query ||
           s.email.toLowerCase() === query ||
           (s.studentId && s.studentId.toLowerCase() === query)
    );

    if (found) {
      setCurrentRole('student');
      setCurrentStudentId(found.id);
      showToast({
        type: 'success',
        title: 'Login Successful',
        message: `Welcome back, ${found.name} (${found.course})!`
      });
      return { success: true, message: `Welcome back, ${found.name}!` };
    }
    return { success: false, message: 'Invalid Student ID / Roll Number or Email. Please check or register.' };
  };

  const adminLoginWithCredentials = (username: string, _password?: string) => {
    const query = username.trim().toLowerCase();
    if (query === 'admin' || query === 'tpo' || query === 'tpo_admin' || query === 'tpo@college.edu') {
      setCurrentRole('admin');
      setCurrentStudentId(null);
      showToast({
        type: 'success',
        title: 'TPO Officer Signed In',
        message: 'Welcome to Placement Cell Admin Control Panel.'
      });
      return { success: true, message: 'Welcome to Placement Cell Admin Portal' };
    }
    return { success: false, message: 'Invalid Admin credentials. Try username: admin' };
  };

  const updateStudentProfile = (updatedData: Partial<Student>) => {
    if (!currentStudent) {
      return { success: false, message: 'No student is currently logged in.' };
    }

    setStudents(prev =>
      prev.map(s => (s.id === currentStudent.id ? { ...s, ...updatedData } : s))
    );

    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your student profile information has been successfully updated.'
    });

    return { success: true, message: 'Profile updated successfully.' };
  };

  // Student Actions
  const hasStudentApplied = (opportunityType: OpportunityType, opportunityId: number) => {
    if (!currentStudent) return false;
    return applications.some(
      a => a.studentId === currentStudent.id &&
           a.opportunityType === opportunityType &&
           a.opportunityId === opportunityId
    );
  };

  const getStudentApplications = (studentId: number) => {
    return applications.filter(a => a.studentId === studentId);
  };

  const applyForOpportunity = (
    opportunityType: OpportunityType,
    opportunityId: number
  ) => {
    if (!currentStudent) {
      return { success: false, message: 'Please login or register as a student to apply.' };
    }

    if (hasStudentApplied(opportunityType, opportunityId)) {
      return { success: false, message: 'You have already applied for this opportunity.' };
    }

    let companyName = '';
    let roleTitle = '';
    let requiredCgpa = 0;
    let eligibleCourses: string[] = [];

    if (opportunityType === 'placement') {
      const opp = placements.find(p => p.id === opportunityId);
      if (!opp) return { success: false, message: 'Placement opportunity not found.' };
      companyName = opp.companyName;
      roleTitle = opp.jobRole;
      requiredCgpa = opp.requiredCgpa;
      eligibleCourses = opp.eligibleCourses || [];
    } else if (opportunityType === 'internship') {
      const opp = internships.find(i => i.id === opportunityId);
      if (!opp) return { success: false, message: 'Internship opportunity not found.' };
      companyName = opp.companyName;
      roleTitle = opp.role;
      requiredCgpa = opp.requiredCgpa;
      eligibleCourses = opp.eligibleCourses || [];
    } else {
      const drv = drives.find(d => d.id === opportunityId);
      if (!drv) return { success: false, message: 'Placement drive not found.' };
      companyName = drv.companyName;
      roleTitle = drv.jobRole;
      requiredCgpa = 6.0;
      eligibleCourses = drv.eligibleCourses || [];
    }

    // Check Course Eligibility
    const courseMatched = eligibleCourses.length === 0 ||
      eligibleCourses.some(c => c.toLowerCase() === currentStudent.course.toLowerCase()) ||
      eligibleCourses.some(c => currentStudent.course.toLowerCase().includes(c.toLowerCase()));

    if (!courseMatched) {
      return {
        success: false,
        message: `Course Eligibility: This opportunity is for [${eligibleCourses.join(', ')}]. Your course is ${currentStudent.course}.`
      };
    }

    // Check CGPA Eligibility
    if (currentStudent.cgpa < requiredCgpa) {
      return {
        success: false,
        message: `CGPA Eligibility: This position requires a minimum CGPA of ${requiredCgpa.toFixed(1)}, but your recorded CGPA is ${currentStudent.cgpa.toFixed(1)}.`
      };
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const newApp: Application = {
      id: Date.now(),
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      studentRoll: currentStudent.rollNumber,
      studentCgpa: currentStudent.cgpa,
      studentCourse: currentStudent.course,
      studentDepartment: currentStudent.department,
      studentEmail: currentStudent.email,
      studentPhone: currentStudent.phone,
      opportunityType,
      opportunityId,
      companyName,
      roleTitle,
      appliedDate: todayStr,
      status: 'Applied',
      adminNotes: 'Application submitted successfully. Under preliminary review by Placement Cell.'
    };

    setApplications(prev => [newApp, ...prev]);
    showToast({
      type: 'success',
      title: 'Application Submitted',
      message: `Your application for ${roleTitle} at ${companyName} has been submitted.`
    });

    return { success: true, message: `Application submitted successfully for ${roleTitle} at ${companyName}!` };
  };

  // Admin Actions
  const updateApplicationStatus = (
    applicationId: number,
    newStatus: ApplicationStatus,
    adminNotes?: string,
    interviewDate?: string
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setApplications(prev =>
      prev.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: newStatus,
            statusUpdatedDate: todayStr,
            adminNotes: adminNotes !== undefined ? adminNotes : app.adminNotes,
            interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate
          };
        }
        return app;
      })
    );
    showToast({
      type: 'info',
      title: 'Application Updated',
      message: `Application #${applicationId} status changed to ${newStatus}.`
    });
  };

  const addCompany = (companyData: Omit<Company, 'id'>) => {
    const newCompany: Company = {
      ...companyData,
      id: Date.now()
    };
    setCompanies(prev => [...prev, newCompany]);
    showToast({
      type: 'success',
      title: 'Company Added',
      message: `${newCompany.name} has been added to recruiting partners.`
    });
  };

  const updateCompany = (company: Company) => {
    setCompanies(prev => prev.map(c => (c.id === company.id ? company : c)));
    showToast({
      type: 'info',
      title: 'Company Updated',
      message: `${company.name} profile has been updated.`
    });
  };

  const deleteCompany = (id: number) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    showToast({
      type: 'warning',
      title: 'Company Removed',
      message: 'Company profile has been removed from directory.'
    });
  };

  const addPlacement = (placementData: Omit<PlacementOpportunity, 'id'>) => {
    const newPlacement: PlacementOpportunity = {
      ...placementData,
      id: Date.now()
    };
    setPlacements(prev => [newPlacement, ...prev]);
    showToast({
      type: 'success',
      title: 'Placement Drive Posted',
      message: `${newPlacement.jobRole} at ${newPlacement.companyName} is now active.`
    });
  };

  const updatePlacement = (placement: PlacementOpportunity) => {
    setPlacements(prev => prev.map(p => (p.id === placement.id ? placement : p)));
    showToast({
      type: 'info',
      title: 'Placement Updated',
      message: `${placement.jobRole} details updated.`
    });
  };

  const deletePlacement = (id: number) => {
    setPlacements(prev => prev.filter(p => p.id !== id));
    showToast({
      type: 'warning',
      title: 'Placement Deleted',
      message: 'Opportunity has been removed from the portal.'
    });
  };

  const addInternship = (internshipData: Omit<InternshipOpportunity, 'id'>) => {
    const newInternship: InternshipOpportunity = {
      ...internshipData,
      id: Date.now()
    };
    setInternships(prev => [newInternship, ...prev]);
    showToast({
      type: 'success',
      title: 'Internship Added',
      message: `${newInternship.role} at ${newInternship.companyName} is now active.`
    });
  };

  const updateInternship = (internship: InternshipOpportunity) => {
    setInternships(prev => prev.map(i => (i.id === internship.id ? internship : i)));
    showToast({
      type: 'info',
      title: 'Internship Updated',
      message: `${internship.role} details updated.`
    });
  };

  const deleteInternship = (id: number) => {
    setInternships(prev => prev.filter(i => i.id !== id));
    showToast({
      type: 'warning',
      title: 'Internship Deleted',
      message: 'Internship opportunity removed.'
    });
  };

  const addDrive = (driveData: Omit<PlacementDrive, 'id'>) => {
    const newDrive: PlacementDrive = {
      ...driveData,
      id: Date.now()
    };
    setDrives(prev => [newDrive, ...prev]);
    showToast({
      type: 'success',
      title: 'Placement Drive Scheduled',
      message: `Upcoming drive for ${newDrive.companyName} announced.`
    });
  };

  const updateDrive = (drive: PlacementDrive) => {
    setDrives(prev => prev.map(d => (d.id === drive.id ? drive : d)));
    showToast({
      type: 'info',
      title: 'Drive Updated',
      message: `${drive.companyName} drive schedule updated.`
    });
  };

  const deleteDrive = (id: number) => {
    setDrives(prev => prev.filter(d => d.id !== id));
    showToast({
      type: 'warning',
      title: 'Drive Removed',
      message: 'Placement drive entry removed.'
    });
  };

  const addAnnouncement = (announcementData: Omit<Announcement, 'id'>) => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: Date.now(),
      content: announcementData.content || announcementData.description || ''
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    showToast({
      type: 'success',
      title: 'Announcement Published',
      message: newAnnouncement.title
    });
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    showToast({
      type: 'warning',
      title: 'Announcement Removed',
      message: 'Notice removed from public board.'
    });
  };

  const resetToDemoData = () => {
    setStudents(initialStudents);
    setCompanies(initialCompanies);
    setPlacements(initialPlacements);
    setInternships(initialInternships);
    setDrives(initialDrives);
    setApplications(initialApplications);
    setAnnouncements(initialAnnouncements);
    setCurrentRole('student');
    setCurrentStudentId(1);
    localStorage.clear();
    showToast({
      type: 'info',
      title: 'Portal Reset to Default',
      message: 'All mock records reloaded successfully.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentStudent,
        currentAdmin,
        students,
        companies,
        placements,
        internships,
        drives,
        applications,
        announcements,
        loginAsStudent,
        loginAsAdmin,
        logout,
        registerStudent,
        studentLoginWithCredentials,
        adminLoginWithCredentials,
        updateStudentProfile,
        applyForOpportunity,
        hasStudentApplied,
        getStudentApplications,
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
        addDrive,
        updateDrive,
        deleteDrive,
        addAnnouncement,
        deleteAnnouncement,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        toast,
        showToast,
        clearToast,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
