import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Calendar, 
  BookOpen, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  FileText, 
  Users, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export function Navbar() {
  const { userRole, studentUser, adminUser, logout, setUserRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Define navigation links according to requirements
  const getNavLinks = () => {
    if (userRole === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin-dashboard' },
        { label: 'Students', path: '/admin-dashboard?tab=students' },
        { label: 'Companies', path: '/companies' },
        { label: 'Placements', path: '/placements' },
        { label: 'Internships', path: '/internships' },
        { label: 'Applications', path: '/admin-dashboard?tab=applications' },
        { label: 'Announcements', path: '/announcements' },
      ];
    } else if (userRole === 'student') {
      return [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Placements', path: '/placements' },
        { label: 'Internships', path: '/internships' },
        { label: 'My Applications', path: '/applications' },
        { label: 'Preparation', path: '/preparation' },
        { label: 'Announcements', path: '/announcements' },
        { label: 'Profile', path: '/profile' },
      ];
    } else {
      // Guest (Before login)
      return [
        { label: 'Home', path: '/' },
        { label: 'Placements', path: '/placements' },
        { label: 'Internships', path: '/internships' },
        { label: 'Companies', path: '/companies' },
        { label: 'Drives', path: '/drives' },
        { label: 'Preparation', path: '/preparation' },
        { label: 'Announcements', path: '/announcements' },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sky-100 shadow-xs">
      {/* Top Banner with Quick Role Demo for Viva presentation */}
      <div className="bg-sky-50/80 border-b border-sky-100 py-1 px-4 sm:px-8 text-[11px] text-sky-800 flex justify-between items-center">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
          <span>Central Placement & Corporate Relations Cell • All Academic Streams</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 hidden sm:inline">Demo Switcher:</span>
          <button
            onClick={() => setUserRole('guest')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
              userRole === 'guest'
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-100'
            }`}
          >
            Guest View
          </button>
          <button
            onClick={() => setUserRole('student')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
              userRole === 'student'
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-100'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
              userRole === 'admin'
                ? 'bg-sky-700 text-white border-sky-700'
                : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-100'
            }`}
          >
            Admin View
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs group-hover:bg-sky-700 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                Placement & Internship Cell
              </div>
              <div className="text-[11px] text-sky-600 font-medium">
                University Career Portal
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition text-decoration-none ${
                    active
                      ? 'bg-sky-100 text-sky-800'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons / Auth Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            {userRole === 'guest' ? (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition text-decoration-none ${
                    isActive('/login')
                      ? 'bg-sky-100 text-sky-800'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition shadow-xs text-decoration-none"
                >
                  Register
                </Link>
                <Link
                  to="/admin-login"
                  className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition text-decoration-none ml-1"
                  title="TPO Admin Portal"
                >
                  Admin Login
                </Link>
              </>
            ) : userRole === 'student' ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-decoration-none bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-md border border-sky-100 transition"
                >
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    {studentUser.name}
                  </span>
                  <span className="text-[10px] bg-sky-200 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                    {studentUser.course}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition font-medium border border-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              // Admin Logged in
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 px-3 py-1 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <div className="text-left">
                    <div className="text-xs font-bold text-sky-900 leading-none">
                      TPO Officer
                    </div>
                    <div className="text-[10px] text-sky-600 leading-none mt-0.5">
                      Admin Access
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition font-medium border border-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-sky-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Role: <span className="text-sky-600 uppercase font-bold">{userRole}</span>
            </span>
            {userRole !== 'guest' && (
              <button
                onClick={handleLogout}
                className="text-xs text-rose-600 flex items-center gap-1 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-xs font-semibold text-decoration-none ${
                isActive(link.path)
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {userRole === 'guest' && (
            <div className="pt-2 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-3 border border-sky-200 rounded text-xs font-semibold text-sky-700 bg-sky-50"
              >
                Student Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-3 rounded text-xs font-semibold text-white bg-sky-600"
              >
                Register
              </Link>
              <Link
                to="/admin-login"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 text-center py-2 px-3 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Admin Portal Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
