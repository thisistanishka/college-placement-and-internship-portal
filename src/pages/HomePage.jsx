import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { 
  samplePlacements, 
  sampleInternships, 
  sampleCompanies, 
  sampleDrives, 
  sampleAnnouncements 
} from '../data/mockData';
import { PlacementCard } from '../components/PlacementCard';
import { InternshipCard } from '../components/InternshipCard';
import { CompanyCard } from '../components/CompanyCard';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const { applyJob, applications } = useAuth();
  const navigate = useNavigate();

  const handleApply = (item, type) => {
    const res = applyJob(item, type);
    alert(res.message);
  };

  const isApplied = (company, role) => {
    return applications.some((app) => app.company === company && app.role === role);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white border-b border-sky-100 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
            <span className="text-xs font-bold text-sky-800">
              Campus Placement Season 2025 - 2026
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            College Placement & Internship Cell
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-sky-800 font-medium max-w-3xl mx-auto mb-3">
            Connecting Students with Better Career Opportunities
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            A centralized digital placement engine for students across all undergraduate & postgraduate disciplines: B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA, and M.Tech.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/placements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition text-decoration-none"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Placements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-sky-700 bg-white hover:bg-sky-50 border border-sky-200 shadow-xs transition text-decoration-none"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Find Internships</span>
            </Link>
            <Link
              to="/preparation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition text-decoration-none"
            >
              <span>Viva & Prep Modules</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PLACEMENT STATISTICS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
              Recruitment Highlights
            </h3>
            <p className="text-lg font-bold text-slate-900">
              Campus Placement Performance Metrics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* Stat 1 */}
            <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100">
              <div className="w-10 h-10 mx-auto rounded-lg bg-white text-sky-600 flex items-center justify-center mb-2 shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                50+
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                Recruiting Companies
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Top MNCs & Startups</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100">
              <div className="w-10 h-10 mx-auto rounded-lg bg-white text-sky-600 flex items-center justify-center mb-2 shadow-xs">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                100+
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                Job Opportunities
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Full-time roles</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100">
              <div className="w-10 h-10 mx-auto rounded-lg bg-white text-sky-600 flex items-center justify-center mb-2 shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                75+
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                Internship Opportunities
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Paid summer & winter</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100">
              <div className="w-10 h-10 mx-auto rounded-lg bg-white text-sky-600 flex items-center justify-center mb-2 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                500+
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                Students Placed
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">In academic batch 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING PLACEMENT DRIVES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              On-Campus Schedule
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Upcoming Placement Drives
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dates, eligibility, venue, and selection rounds for upcoming corporate visits.
            </p>
          </div>
          <Link
            to="/drives"
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none"
          >
            <span>View All Schedules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleDrives.slice(0, 2).map((drive) => (
            <div
              key={drive.id}
              className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs hover:border-sky-300 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                  {drive.package}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {drive.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">{drive.jobRole}</h4>
              <p className="text-xs font-semibold text-sky-700 mb-3">{drive.company}</p>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-sky-50/40 p-3 rounded-lg border border-sky-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span><strong>Date & Time:</strong> {drive.date} at {drive.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span><strong>Venue:</strong> {drive.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="truncate"><strong>Process:</strong> {drive.selectionProcess}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1">
                  {drive.eligibleCourses.slice(0, 3).map((c) => (
                    <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                  {drive.eligibleCourses.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{drive.eligibleCourses.length - 3} more</span>
                  )}
                </div>
                <Link
                  to="/drives"
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 text-decoration-none"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LATEST INTERNSHIPS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Student Internships
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Latest Internship Openings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified corporate internships with stipend support and pre-placement offer (PPO) potential.
            </p>
          </div>
          <Link
            to="/internships"
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none"
          >
            <span>View All Internships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sampleInternships.slice(0, 3).map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onApply={(item) => handleApply(item, 'Internship')}
              isApplied={isApplied(internship.company, internship.internshipRole)}
            />
          ))}
        </div>
      </section>

      {/* 5. RECRUITING COMPANIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Corporate Network
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Recruiting Companies
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prominent industry leaders regularly hiring through our campus placement drives.
            </p>
          </div>
          <Link
            to="/companies"
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none"
          >
            <span>Browse All Recruiters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleCompanies.slice(0, 4).map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* 6. LATEST ANNOUNCEMENTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Official Notices
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Latest Announcements
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Stay updated with circulars, workshop schedules, and round results.
            </p>
          </div>
          <Link
            to="/announcements"
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleAnnouncements.slice(0, 2).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>

      {/* 7. QUICK PREP CALLOUT BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="inline-block text-xs font-bold bg-sky-500/50 text-white px-2.5 py-0.5 rounded-full mb-2">
              Free Student Resources
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Preparing for Placement Drives & Technical Viva?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl mt-1">
              Explore 10 curated modules covering Aptitude, Logical Reasoning, DSA Basics, DBMS, Web Development, Interview Preparation, and ATS Resume Building.
            </p>
          </div>
          <Link
            to="/preparation"
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-sky-700 hover:bg-sky-50 shadow-sm transition text-decoration-none shrink-0"
          >
            Open Preparation Hub →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
