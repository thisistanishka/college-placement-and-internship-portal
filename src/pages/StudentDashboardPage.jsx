import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Calendar, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Building2,
  Clock,
  Award
} from 'lucide-react';
import { 
  samplePlacements, 
  sampleInternships, 
  sampleDrives, 
  sampleAnnouncements 
} from '../data/mockData';
import { DashboardCard } from '../components/DashboardCard';
import { PlacementCard } from '../components/PlacementCard';
import { AnnouncementCard } from '../components/AnnouncementCard';

export function StudentDashboardPage() {
  const { studentUser, applications, applyJob } = useAuth();

  // Filter recommended opportunities for the student's degree
  const recommendedPlacements = samplePlacements.filter(
    (job) => job.eligibleCourses.includes(studentUser.course) && Number(studentUser.cgpa) >= Number(job.requiredCgpa)
  );

  const handleApply = (job) => {
    const res = applyJob(job, 'Placement');
    alert(res.message);
  };

  const isApplied = (company, role) => {
    return applications.some((app) => app.company === company && app.role === role);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME MESSAGE BANNER */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              Student ID: {studentUser.studentId}
            </span>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              {studentUser.course} • {studentUser.year}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {studentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl mt-1 leading-relaxed">
            Your placement profile is active. You have {recommendedPlacements.length} recommended opportunities matching your CGPA ({studentUser.cgpa}) and degree ({studentUser.course}).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-sky-800 hover:bg-sky-50 shadow-sm transition text-decoration-none flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </Link>
          <Link
            to="/applications"
            className="px-4 py-2 rounded-lg text-xs font-bold bg-sky-500/40 hover:bg-sky-500/60 text-white border border-white/30 transition text-decoration-none flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Applications ({applications.length})</span>
          </Link>
        </div>
      </div>

      {/* 2. DASHBOARD METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Placements */}
        <DashboardCard
          title="Available Placements"
          count={samplePlacements.length}
          description="Active corporate full-time job openings"
          icon={Briefcase}
          linkTo="/placements"
          linkText="Browse Placements"
          badgeText="Hiring Now"
        />

        {/* Card 2: Available Internships */}
        <DashboardCard
          title="Available Internships"
          count={sampleInternships.length}
          description="Verified summer & 6-month internships"
          icon={GraduationCap}
          linkTo="/internships"
          linkText="Browse Internships"
          badgeText="Paid Stipends"
        />

        {/* Card 3: My Applications */}
        <DashboardCard
          title="My Applications"
          count={applications.length}
          description="Submitted job & internship forms"
          icon={FileText}
          linkTo="/applications"
          linkText="Track Status"
          badgeText="In Progress"
        />

        {/* Card 4: Upcoming Drives */}
        <DashboardCard
          title="Upcoming Drives"
          count={sampleDrives.length}
          description="Scheduled campus recruitment visits"
          icon={Calendar}
          linkTo="/drives"
          linkText="View Schedule"
          badgeText="Next 30 Days"
        />
      </div>

      {/* 3. RECOMMENDED OPPORTUNITIES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Personalized Recommendations</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Recommended for {studentUser.course} Students
            </h2>
          </div>
          <Link
            to="/placements"
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition text-decoration-none"
          >
            View All ({samplePlacements.length}) →
          </Link>
        </div>

        {recommendedPlacements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedPlacements.slice(0, 4).map((job) => (
              <PlacementCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job)}
                isApplied={isApplied(job.company, job.jobRole)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-sky-100">
            <p className="text-xs text-slate-500">
              No specific recommendations found for {studentUser.course}. Explore all placement listings!
            </p>
          </div>
        )}
      </section>

      {/* 4. UPCOMING DRIVES QUICK PREVIEW & LATEST ANNOUNCEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Placement Drives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Next Scheduled Placement Drives
            </h3>
            <Link to="/drives" className="text-xs font-semibold text-sky-700 hover:text-sky-800 text-decoration-none">
              Full Schedule →
            </Link>
          </div>

          <div className="space-y-3">
            {sampleDrives.slice(0, 3).map((drive) => (
              <div
                key={drive.id}
                className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sky-300 transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {drive.package}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Drive Date: {drive.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{drive.jobRole}</h4>
                  <div className="text-xs font-medium text-slate-600">
                    {drive.company} • <span className="text-slate-400">{drive.venue}</span>
                  </div>
                </div>

                <Link
                  to="/drives"
                  className="px-3 py-1.5 rounded text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-center text-decoration-none shrink-0"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Latest Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Latest Notices
            </h3>
            <Link to="/announcements" className="text-xs font-semibold text-sky-700 hover:text-sky-800 text-decoration-none">
              All Notices →
            </Link>
          </div>

          <div className="space-y-3">
            {sampleAnnouncements.slice(0, 2).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
