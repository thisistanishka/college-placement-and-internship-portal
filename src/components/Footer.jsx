import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-sky-100 text-slate-600 mt-auto">
      {/* Top Banner */}
      <div className="bg-sky-50/60 border-b border-sky-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Central Training & Placement Cell (TPO)
            </h4>
            <p className="text-xs text-slate-500">
              Empowering students across all academic disciplines with top-tier internships and campus placements.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {['B.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Com', 'B.Sc', 'BA', 'M.Tech'].map((course) => (
              <span
                key={course}
                className="text-[11px] font-semibold bg-white text-sky-700 border border-sky-200 px-2 py-0.5 rounded shadow-xs"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-sky-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-slate-900">Placement Cell</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated to career counseling, skill development, industry collaborations, and on-campus recruitment drives for all enrolled university students.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-sky-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Accredited Campus Hiring Partner</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Explore Portal
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/placements" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Full-Time Placements
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Internship Openings
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Recruiting Companies
                </Link>
              </li>
              <li>
                <Link to="/drives" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Drive Schedules
                </Link>
              </li>
              <li>
                <Link to="/preparation" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Viva & Aptitude Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Hub */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Student Corner
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  New Student Registration
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Placement Notices & Results
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="text-slate-600 hover:text-sky-600 text-decoration-none transition">
                  Officer Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2.5 text-xs">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              TPO Office Contact
            </h5>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>Block-C, Ground Floor, Administrative Complex, University Campus</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>placements@university.edu.in</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-600 shrink-0" />
              <span>+91 (011) 2876-4300 / 4301</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-400">
              Office Hours: Mon - Fri, 9:00 AM - 5:00 PM
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 College Placement & Internship Cell. Academic 3rd-Year Project.</p>
          <p>Built with React, JavaScript, Tailwind CSS & React Router</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
