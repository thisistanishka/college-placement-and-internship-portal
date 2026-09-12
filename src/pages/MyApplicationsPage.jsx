import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, Building2, Calendar, CheckCircle2, Clock, ArrowUpRight, Search } from 'lucide-react';

export function MyApplicationsPage() {
  const { applications, studentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = ['All', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Interview':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Shortlisted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Applied':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Student Application Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Placement & Internship Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track hiring stage progress, interview invitations, and final job offers.
          </p>
        </div>

        <Link
          to="/placements"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition text-decoration-none self-start sm:self-auto"
        >
          <span>Explore More Openings</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Applied</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{applications.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-amber-600 uppercase">Shortlisted</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">
            {applications.filter((a) => a.status === 'Shortlisted').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-sky-600 uppercase">Interview Stage</div>
          <div className="text-2xl font-extrabold text-sky-600 mt-1">
            {applications.filter((a) => a.status === 'Interview').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-emerald-600 uppercase">Final Selected</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {applications.filter((a) => a.status === 'Selected').length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-sky-100 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-md text-xs font-semibold border transition ${
                filterStatus === st
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-sky-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-sky-50/60 border-b border-sky-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-sky-50/30 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {app.company[0]}
                      </div>
                      <span className="truncate max-w-[200px]">{app.company}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {app.role}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {app.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {app.appliedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alert(`Details for application ID #${app.id}: ${app.role} at ${app.company}. Current status: ${app.status}.`)}
                        className="text-sky-600 hover:text-sky-800 font-semibold text-xs transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No applications matching the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyApplicationsPage;
