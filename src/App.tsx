import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProjectCodeModal } from './components/ProjectCodeModal';
import { EligibilityCheckerModal } from './components/EligibilityCheckerModal';
import { SalaryCalculatorModal } from './components/SalaryCalculatorModal';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { ToastNotification } from './components/ToastNotification';
import { Company } from './types';

import { HomePage } from './pages/HomePage';
import { PlacementsPage } from './pages/PlacementsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { PreparationPage } from './pages/PreparationPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPortalPage } from './pages/AuthPortalPage';
import { PlacementDrivesPage } from './pages/PlacementDrivesPage';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isProjectCodeModalOpen, setIsProjectCodeModalOpen] = useState<boolean>(false);
  
  // Interactive Modals State
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState<boolean>(false);
  const [isSalaryCalcModalOpen, setIsSalaryCalcModalOpen] = useState<boolean>(false);
  const [salaryCalcPackage, setSalaryCalcPackage] = useState<number>(4.5);
  const [selectedCompanyForModal, setSelectedCompanyForModal] = useState<Company | null>(null);

  const { currentRole, currentStudent } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleNavigate = (page: string) => {
    // If student clicks student-dashboard but isn't logged in, prompt login
    if (page === 'student-dashboard' && !currentStudent && currentRole !== 'admin') {
      handleOpenAuth('login');
      return;
    }
    setCurrentPage(page);
  };

  const handleOpenSalaryCalc = (lpa: number = 4.5) => {
    setSalaryCalcPackage(lpa);
    setIsSalaryCalcModalOpen(true);
  };

  const handleOpenCompanyDetail = (company: Company) => {
    setSelectedCompanyForModal(company);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Navbar Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onOpenProjectCode={() => setIsProjectCodeModalOpen(true)}
        onOpenEligibility={() => setIsEligibilityModalOpen(true)}
        onOpenSalaryCalc={() => handleOpenSalaryCalc(4.5)}
      />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenProjectCode={() => setIsProjectCodeModalOpen(true)}
            onOpenEligibility={() => setIsEligibilityModalOpen(true)}
            onOpenSalaryCalc={handleOpenSalaryCalc}
            onOpenCompanyDetail={handleOpenCompanyDetail}
          />
        )}
        {currentPage === 'placements' && (
          <PlacementsPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenCompanyDetail={handleOpenCompanyDetail}
            onOpenSalaryCalc={handleOpenSalaryCalc}
          />
        )}
        {currentPage === 'internships' && (
          <InternshipsPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenCompanyDetail={handleOpenCompanyDetail}
          />
        )}
        {currentPage === 'drives' && (
          <PlacementDrivesPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        )}
        {currentPage === 'companies' && (
          <CompaniesPage
            onNavigate={handleNavigate}
            onOpenCompanyDetail={handleOpenCompanyDetail}
          />
        )}
        {currentPage === 'announcements' && (
          <AnnouncementsPage />
        )}
        {currentPage === 'preparation' && (
          <PreparationPage />
        )}
        {currentPage === 'student-dashboard' && (
          <StudentDashboard
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenCompanyDetail={handleOpenCompanyDetail}
            onOpenSalaryCalc={handleOpenSalaryCalc}
            onOpenEligibility={() => setIsEligibilityModalOpen(true)}
          />
        )}
        {currentPage === 'admin-dashboard' && (
          <AdminDashboard />
        )}
        {(currentPage === 'auth' || currentPage === 'login' || currentPage === 'register') && (
          <AuthPortalPage
            onNavigate={handleNavigate}
            initialTab={currentPage === 'register' || authMode === 'register' ? 'student-register' : 'student-login'}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenProjectCode={() => setIsProjectCodeModalOpen(true)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          setCurrentPage('student-dashboard');
        }}
      />

      {/* BCA 3rd Year Python Flask + SQLite Project Source Code Modal */}
      <ProjectCodeModal
        isOpen={isProjectCodeModalOpen}
        onClose={() => setIsProjectCodeModalOpen(false)}
      />

      {/* Interactive Eligibility Checker Modal */}
      <EligibilityCheckerModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Interactive CTC and In-Hand Pay Calculator Modal */}
      <SalaryCalculatorModal
        isOpen={isSalaryCalcModalOpen}
        initialPackageLPA={salaryCalcPackage}
        onClose={() => setIsSalaryCalcModalOpen(false)}
      />

      {/* Interactive Company Detail & Past BCA Questions Modal */}
      <CompanyDetailModal
        company={selectedCompanyForModal}
        onClose={() => setSelectedCompanyForModal(null)}
        onNavigate={handleNavigate}
      />

      {/* Interactive Floating Toast Notification */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
