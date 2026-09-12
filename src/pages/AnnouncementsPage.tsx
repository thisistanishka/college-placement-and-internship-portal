import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AnnouncementsPage: React.FC = () => {
  const { announcements } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Placement Drive',
    'Interview Schedule',
    'Test Dates & Venues',
    'Selected Students Lists',
    'Preparation Workshops'
  ];

  const filteredAnnouncements = announcements.filter(item => {
    const matchesCategory = selectedCategory === 'All' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Interview Schedule' && item.category.toLowerCase().includes('interview')) ||
      (selectedCategory === 'Test Dates & Venues' && item.category.toLowerCase().includes('test')) ||
      (selectedCategory === 'Selected Students Lists' && item.category.toLowerCase().includes('result')) ||
      (selectedCategory === 'Preparation Workshops' && item.category.toLowerCase().includes('workshop'));

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: string) => {
    return 'badge bg-sky-subtle text-sky-dark border border-sky-subtle';
  };

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('drive')) return 'bi-briefcase-fill';
    if (c.includes('interview')) return 'bi-calendar-check-fill';
    if (c.includes('test')) return 'bi-journal-code';
    if (c.includes('result') || c.includes('selected')) return 'bi-trophy-fill text-warning';
    return 'bi-megaphone-fill';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-fluid px-4 px-lg-5 max-w-7xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-baseline justify-content-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span>Placement Notices</span>
              <span className="mx-1.5 text-slate-400">/</span>
              <span className="text-slate-700">Official Circulars</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Notices & Official Circulars
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              Verified circulars on upcoming placement drives, aptitude test slots, interview stages, and selected candidate lists.
            </p>
          </div>
          <div className="mt-3 mt-sm-0">
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded">
              {announcements.length} Published Circulars
            </span>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="portal-card p-4 mb-6 bg-white">
          <div className="row g-3 align-items-end">
            <div className="col-lg-4 col-md-6">
              <label className="text-xs font-semibold text-slate-700 mb-1 d-block">Search Circulars</label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control text-xs"
                  placeholder="Search by keywords, dates, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 border-0 bg-transparent text-xs"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="col-lg-8 col-md-6 d-flex flex-wrap align-items-center justify-content-md-end gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm text-xs py-1.5 px-3 rounded ${
                    selectedCategory === cat
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {filteredAnnouncements.length === 0 ? (
            <div className="portal-card p-10 text-center bg-white">
              <h3 className="text-base font-semibold text-slate-900 mb-1">No Notices Found</h3>
              <p className="text-xs text-slate-500 mb-4">No announcements match the selected filter criteria.</p>
              <button
                className="btn btn-outline-primary btn-sm text-xs"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Show All Notices
              </button>
            </div>
          ) : (
            filteredAnnouncements.map(notice => (
              <div key={notice.id} className="portal-card p-4 bg-white">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2 mb-2">
                  <div className="d-flex flex-wrap align-items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {notice.category}
                    </span>
                    <span className="text-slate-500">
                      Target: <strong className="text-slate-700">{notice.targetAudience}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Posted: {notice.datePosted}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 mb-1.5">{notice.title}</h2>
                <p className="text-xs text-slate-600 mb-0 leading-relaxed">{notice.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
