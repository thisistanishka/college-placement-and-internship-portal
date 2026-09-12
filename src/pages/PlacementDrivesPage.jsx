import React, { useState } from 'react';
import { sampleDrives, coursesList } from '../data/mockData';
import { Calendar, Clock, MapPin, Award, CheckCircle2, Building2, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function PlacementDrivesPage() {
  const { studentUser, userRole } = useAuth();
  const [registeredDrives, setRegisteredDrives] = useState([1]);
  const [selectedCourse, setSelectedCourse] = useState('All');

  const handleRegister = (driveId, companyName) => {
    if (registeredDrives.includes(driveId)) {
      alert(`You are already registered for the ${companyName} placement drive.`);
      return;
    }
    setRegisteredDrives([...registeredDrives, driveId]);
    alert(`Slot confirmed! Your gate pass for ${companyName} campus drive has been registered.`);
  };

  const filteredDrives = sampleDrives.filter((drive) => {
    return selectedCourse === 'All' || drive.eligibleCourses.includes(selectedCourse);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>Campus Recruitment Schedule</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Placement Drives & Recruitment Itinerary
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete timetable of company presentations, online assessments, technical rounds, and HR interviews.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-sky-100 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-bold">Filter By Eligible Stream:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          >
            {coursesList.map((course) => (
              <option key={course} value={course}>
                {course === 'All' ? 'All Degrees & Departments' : course}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredDrives.length}</strong> upcoming recruitment drives
        </div>
      </div>

      {/* Drives List */}
      <div className="space-y-4">
        {filteredDrives.map((drive) => {
          const isRegistered = registeredDrives.includes(drive.id);

          return (
            <div
              key={drive.id}
              className="bg-white rounded-xl border border-sky-100 p-6 shadow-xs hover:border-sky-300 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                {/* Title & Company */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-md">
                      {drive.package}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {drive.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{drive.jobRole}</h2>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
                    <Building2 className="w-4 h-4" />
                    <span>{drive.company}</span>
                  </div>
                </div>

                {/* Registration Action */}
                <div className="shrink-0 flex items-center gap-3">
                  {isRegistered ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Gate Pass Issued
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegister(drive.id, drive.company)}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Register for Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                {/* Date & Time */}
                <div className="bg-sky-50/40 p-3 rounded-lg border border-sky-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Date & Reporting Time
                  </div>
                  <div className="font-bold text-slate-800 text-sm">{drive.date}</div>
                  <div className="text-slate-500">{drive.time} (Sharp)</div>
                </div>

                {/* Venue */}
                <div className="bg-sky-50/40 p-3 rounded-lg border border-sky-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    Campus Venue
                  </div>
                  <div className="font-bold text-slate-800 text-sm truncate">{drive.venue}</div>
                  <div className="text-slate-500">Admit card required</div>
                </div>

                {/* Selection Process */}
                <div className="bg-sky-50/40 p-3 rounded-lg border border-sky-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-sky-600" />
                    Selection Process
                  </div>
                  <div className="font-semibold text-slate-800 leading-snug">
                    {drive.selectionProcess}
                  </div>
                </div>
              </div>

              {/* Eligible Courses Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Eligible Streams:</span>
                {drive.eligibleCourses.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-medium bg-sky-50 text-sky-800 border border-sky-100 px-2 py-0.5 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacementDrivesPage;
