import React from 'react';

// Navbar.jsx - React JSX Navigation Bar Component
export function Navbar({ currentPage, onNavigate, currentRole, onToggleRole, studentName }) {
  const navItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'placements', label: 'Placements' },
    { id: 'internships', label: 'Internships' },
    { id: 'companies', label: 'Recruiters' },
    { id: 'drives', label: 'Drive Schedule' },
    { id: 'prep', label: 'Viva & Prep' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            TP
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              TPO Placement Portal
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Career & Corporate Relations Cell
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                currentPage === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info & Toggle */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-900">
              {currentRole === 'admin' ? 'TPO Officer' : studentName || 'Candidate'}
            </div>
            <div className="text-[10px] text-slate-500 capitalize">
              Role: {currentRole}
            </div>
          </div>

          <button
            onClick={onToggleRole}
            className="text-xs px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
          >
            Switch to {currentRole === 'student' ? 'Admin' : 'Student'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
