import React, { useState } from 'react';
import { sampleInternships, coursesList } from '../data/mockData';
import { InternshipCard } from '../components/InternshipCard';
import { useAuth } from '../context/AuthContext';
import { Search, GraduationCap, RefreshCw } from 'lucide-react';

export function InternshipsPage() {
  const { applyJob, applications } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  const workModes = ['All', 'Hybrid', 'Remote', 'On-site'];

  // Filter logic
  const filteredInternships = sampleInternships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.internshipRole.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' || internship.eligibleCourses.includes(selectedCourse);

    const matchesMode =
      selectedMode === 'All' || internship.workMode === selectedMode;

    return matchesSearch && matchesCourse && matchesMode;
  });

  const handleApply = (internship) => {
    const res = applyJob(internship, 'Internship');
    alert(res.message);
  };

  const isApplied = (company, role) => {
    return applications.some((app) => app.company === company && app.role === role);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCourse('All');
    setSelectedMode('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Student Internship Program</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Corporate Internship Openings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Gain real-world industry experience, monthly stipends, and academic project credits.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-xl border border-sky-100 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Search by Role or Company
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Frontend, Microsoft, Data..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
            </div>
          </div>

          {/* Filter Course */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Eligible Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
              {coursesList.map((course) => (
                <option key={course} value={course}>
                  {course === 'All' ? 'All Degree Programs' : course}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Work Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Work Mode
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
              {workModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode === 'All' ? 'All Work Modes (Hybrid, Remote, On-site)' : mode}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results summary & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredInternships.length}</strong> active internship drives
          </span>
          {(searchQuery || selectedCourse !== 'All' || selectedMode !== 'All') && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Internships Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onApply={() => handleApply(internship)}
              isApplied={isApplied(internship.company, internship.internshipRole)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-sky-100 p-8 shadow-xs">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            No internships found matching your filters.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition mt-2"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default InternshipsPage;
