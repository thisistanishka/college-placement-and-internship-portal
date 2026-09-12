import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// 14 Pages
import { HomePage } from './pages/HomePage';
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentRegisterPage } from './pages/StudentRegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { PlacementsPage } from './pages/PlacementsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { PlacementDrivesPage } from './pages/PlacementDrivesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { PlacementPreparationPage } from './pages/PlacementPreparationPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Scroll to top component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
          {/* Main Top Navigation */}
          <Navbar />

          {/* Main Content View with React Router */}
          <main className="flex-1">
            <Routes>
              {/* 1. Home */}
              <Route path="/" element={<HomePage />} />

              {/* 2. Student Login */}
              <Route path="/login" element={<StudentLoginPage />} />

              {/* 3. Student Register */}
              <Route path="/register" element={<StudentRegisterPage />} />

              {/* 4. Admin Login */}
              <Route path="/admin-login" element={<AdminLoginPage />} />

              {/* 5. Student Dashboard */}
              <Route path="/dashboard" element={<StudentDashboardPage />} />

              {/* 6. Placements */}
              <Route path="/placements" element={<PlacementsPage />} />

              {/* 7. Internships */}
              <Route path="/internships" element={<InternshipsPage />} />

              {/* 8. Companies */}
              <Route path="/companies" element={<CompaniesPage />} />

              {/* 9. Placement Drives */}
              <Route path="/drives" element={<PlacementDrivesPage />} />

              {/* 10. Announcements */}
              <Route path="/announcements" element={<AnnouncementsPage />} />

              {/* 11. My Applications */}
              <Route path="/applications" element={<MyApplicationsPage />} />

              {/* 12. Placement Preparation */}
              <Route path="/preparation" element={<PlacementPreparationPage />} />

              {/* 13. Student Profile */}
              <Route path="/profile" element={<StudentProfilePage />} />

              {/* 14. Admin Dashboard */}
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />

              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Institutional Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
