import React, { useState } from 'react';

// PlacementPortal.jsx - React JSX Component for College Placement Cell
export const PlacementPortal = ({ student, opportunities = [], onApply }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const courses = ['All', 'B.Tech', 'BCA', 'MCA', 'BBA', 'MBA', 'B.Com', 'B.Sc'];

  const filteredJobs = opportunities.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourse === 'All' ||
      (job.eligibleCourses && job.eligibleCourses.includes(selectedCourse));
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'eligible' && student && student.cgpa >= job.requiredCgpa);

    return matchesSearch && matchesCourse && matchesTab;
  });

  return (
    <div className="portal-container p-4 bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Campus Recruitment & Placement Engine
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore full-time placement offers, verified internship drives, and corporate hiring schedules.
        </p>
      </header>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Search by Role or Company
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="e.g. TCS, React, Software Engineer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Filter Degree / Course
            </label>
            <select
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded border transition ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Openings ({opportunities.length})
            </button>
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded border transition ${
                activeTab === 'eligible'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('eligible')}
            >
              My Eligible Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isEligible = !student || student.cgpa >= job.requiredCgpa;
          return (
            <div
              key={job.id}
              className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {job.salaryPackage || 'Competitive Stipend'}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      isEligible
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {isEligible ? 'Eligible to Apply' : `Min ${job.requiredCgpa} CGPA Required`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{job.jobRole}</h3>
                <p className="text-xs font-medium text-slate-600 mb-2">{job.companyName} • {job.location}</p>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{job.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.eligibleCourses?.map((course) => (
                    <span key={course} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">Deadline: {job.lastDate}</span>
                <button
                  disabled={!isEligible}
                  onClick={() => onApply && onApply(job)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded transition ${
                    isEligible
                      ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementPortal;
