import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { samplePlacements, coursesList } from '../data/mockData';
import { PlacementCard } from '../components/PlacementCard';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Briefcase, RefreshCw } from 'lucide-react';

export function PlacementsPage() {
  const [searchParams] = useSearchParams();
  const initialCompany = searchParams.get('search') || '';

  const { applyJob, applications, userRole } = useAuth();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialCompany);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Locations extracted
  const locations = ['All', 'Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Gurugram', 'Noida'];
  const jobTypes = ['All', 'Full-time'];

  // Filter logic
  const filteredPlacements = samplePlacements.filter((job) => {
    // Search
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobRole.toLowerCase().includes(searchQuery.toLowerCase());

    // Course
    const matchesCourse =
      selectedCourse === 'All' || job.eligibleCourses.includes(selectedCourse);

    // Location
    const matchesLocation =
      selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Job Type
    const matchesType =
      selectedType === 'All' || job.jobType === selectedType;

    return matchesSearch && matchesCourse && matchesLocation && matchesType;
  });

  const handleApply = (job) => {
    const res = applyJob(job, 'Placement');
    alert(res.message);
  };

  const isApplied = (company, role) => {
    return applications.some((app) => app.company === company && app.role === role);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCourse('All');
    setSelectedLocation('All');
    setSelectedType('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Campus Recruitment Drives</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Full-Time Placement Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore corporate hiring offers across Engineering, IT, Management, Commerce, and Humanities.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-sky-100 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Search Role or Company
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Software, TCS, Analyst..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
            </div>
          </div>

          {/* Filter Course */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Filter by Course / Stream
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
              {coursesList.map((course) => (
                <option key={course} value={course}>
                  {course === 'All' ? 'All Academic Streams' : course}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Job Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Job Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Job Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results summary & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredPlacements.length}</strong> active placement openings
          </span>
          {(searchQuery || selectedCourse !== 'All' || selectedLocation !== 'All' || selectedType !== 'All') && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Placements Cards Grid */}
      {filteredPlacements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlacements.map((job) => (
            <PlacementCard
              key={job.id}
              job={job}
              onApply={() => handleApply(job)}
              isApplied={isApplied(job.company, job.jobRole)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-sky-100 p-8 shadow-xs">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            No placement opportunities found matching your filters.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Try adjusting your course selection or clearing the search keyword.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default PlacementsPage;
