import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { PlacementPortal } from './PlacementPortal';

// Standalone React JSX Application Entry
export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentRole, setCurrentRole] = useState('student');

  const demoStudent = {
    id: 1,
    name: 'Aarav Sharma',
    rollNumber: 'CS2022045',
    course: 'B.Tech',
    department: 'Computer Science & Engineering',
    cgpa: 8.75
  };

  const demoOpportunities = [
    {
      id: 1,
      companyName: 'Tata Consultancy Services (TCS)',
      jobRole: 'Software Developer Trainee (Ninja & Digital)',
      eligibleCourses: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
      requiredCgpa: 6.5,
      salaryPackage: '₹4.5 - 7.0 LPA',
      location: 'Pune / Mumbai / Bengaluru',
      lastDate: '2026-09-28',
      description: 'Campus hiring for cloud engineering, microservices, and web applications.'
    },
    {
      id: 2,
      companyName: 'Infosys Limited',
      jobRole: 'Systems Engineer & Specialist Programmer',
      eligibleCourses: ['B.Tech', 'MCA', 'B.Sc', 'BCA'],
      requiredCgpa: 6.5,
      salaryPackage: '₹4.0 - 9.5 LPA',
      location: 'Bengaluru / Pune / Hyderabad',
      lastDate: '2026-10-02',
      description: 'Full-time graduate engineer training program across agile enterprise teams.'
    },
    {
      id: 3,
      companyName: 'Deloitte USI',
      jobRole: 'Associate Business Technology Analyst',
      eligibleCourses: ['B.Tech', 'BCA', 'BBA', 'MBA', 'B.Com'],
      requiredCgpa: 7.0,
      salaryPackage: '₹8.1 LPA',
      location: 'Hyderabad / Gurugram / Bengaluru',
      lastDate: '2026-10-05',
      description: 'Consulting role analyzing business processes and deploying scalable cloud solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentRole={currentRole}
        onToggleRole={() => setCurrentRole(currentRole === 'student' ? 'admin' : 'student')}
        studentName={demoStudent.name}
      />
      <main className="max-w-6xl mx-auto py-8 px-4">
        <PlacementPortal
          student={demoStudent}
          opportunities={demoOpportunities}
          onApply={(job) => alert(`Application submitted for ${job.jobRole} at ${job.companyName}!`)}
        />
      </main>
    </div>
  );
}

export default App;
