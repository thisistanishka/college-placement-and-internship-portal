import React, { createContext, useState, useContext } from 'react';
import { initialStudent, sampleApplications } from '../data/mockData';

// Create simple Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Roles: 'guest', 'student', 'admin'
  const [userRole, setUserRole] = useState('guest');
  const [studentUser, setStudentUser] = useState(initialStudent);
  const [adminUser] = useState({
    name: 'Dr. Ramesh Kumar',
    email: 'admin.tpo@college.edu',
    title: 'Head, Training & Placement Cell'
  });
  const [applications, setApplications] = useState(sampleApplications);

  // Student Login
  const loginStudent = (identifier, password) => {
    setUserRole('student');
    return true;
  };

  // Student Register
  const registerStudent = (newStudentData) => {
    setStudentUser({
      ...initialStudent,
      ...newStudentData
    });
    setUserRole('student');
    return true;
  };

  // Admin Login
  const loginAdmin = (identifier, password) => {
    setUserRole('admin');
    return true;
  };

  // Logout
  const logout = () => {
    setUserRole('guest');
  };

  // Apply for placement or internship
  const applyJob = (opportunity, type = 'Placement') => {
    // Check if already applied
    const alreadyApplied = applications.some(
      (app) => app.company === opportunity.company && app.role === (opportunity.jobRole || opportunity.internshipRole)
    );

    if (alreadyApplied) {
      return { success: false, message: 'You have already applied for this position.' };
    }

    const newApplication = {
      id: Date.now(),
      company: opportunity.company,
      role: opportunity.jobRole || opportunity.internshipRole,
      type: type,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied'
    };

    setApplications([newApplication, ...applications]);
    return { success: true, message: `Application submitted successfully for ${newApplication.role} at ${newApplication.company}!` };
  };

  // Update Profile
  const updateProfile = (updatedData) => {
    setStudentUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        studentUser,
        adminUser,
        applications,
        loginStudent,
        registerStudent,
        loginAdmin,
        logout,
        applyJob,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Simple custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
