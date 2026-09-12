import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company } from '../types';
import { companyInterviewData } from '../data/companyDetails';

interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
  onNavigate
}) => {
  const { placements, internships, isBookmarked, toggleBookmark, currentStudent, applyForOpportunity, hasStudentApplied } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'rounds' | 'questions'>('overview');
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  if (!company) return null;

  const interviewData = companyInterviewData[company.id];

  // Company opportunities
  const companyPlacements = placements.filter((p) => p.companyId === company.id);
  const companyInternships = internships.filter((i) => i.companyId === company.id);

  const toggleQuestionReveal = (idx: number) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
      <div className="portal-card bg-white w-full max-w-3xl overflow-hidden max-h-[90vh] d-flex flex-column">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 font-bold d-flex align-items-center justify-content-center border border-slate-200 text-base"
            >
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 mb-0">{company.name}</h3>
                <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                  Verified Recruiter
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-0 mt-0.5">
                {company.location} • {company.industry}
              </p>
            </div>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600 text-lg leading-none" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Nav Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 pt-2">
          <div className="d-flex gap-2">
            <button
              type="button"
              className={`py-2 px-3 text-xs font-semibold rounded-t border-t border-x -mb-[1px] ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 border-slate-200'
                  : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview & Opportunities
            </button>
            <button
              type="button"
              className={`py-2 px-3 text-xs font-semibold rounded-t border-t border-x -mb-[1px] ${
                activeTab === 'rounds'
                  ? 'bg-white text-slate-900 border-slate-200'
                  : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('rounds')}
            >
              Hiring Process ({interviewData?.interviewRounds.length || 3} Rounds)
            </button>
            <button
              type="button"
              className={`py-2 px-3 text-xs font-semibold rounded-t border-t border-x -mb-[1px] ${
                activeTab === 'questions'
                  ? 'bg-white text-slate-900 border-slate-200'
                  : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('questions')}
            >
              Past Questions ({interviewData?.bcaQuestions.length || 0})
            </button>
          </div>
        </div>

        <div className="p-5 bg-white overflow-y-auto flex-grow-1">
            {/* TAB 1: OVERVIEW & ACTIVE DRIVES */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Bar */}
                <div className="row g-2 mb-4 text-center">
                  <div className="col-4">
                    <div className="p-2.5 bg-light rounded border">
                      <div className="small text-muted" style={{ fontSize: '0.72rem' }}>College Alumni Hired</div>
                      <div className="fw-bold text-dark fs-5 font-outfit">
                        {interviewData?.pastHiresCount || 85}+ Students
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2.5 bg-light rounded border">
                      <div className="small text-muted" style={{ fontSize: '0.72rem' }}>TPO Recruiter Rating</div>
                      <div className="fw-bold text-warning fs-5 font-outfit">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {interviewData?.tpoRating || 4.7} / 5.0
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2.5 bg-light rounded border">
                      <div className="small text-muted" style={{ fontSize: '0.72rem' }}>Typical BCA Package</div>
                      <div className="fw-bold text-success fs-5 font-outfit">
                        {interviewData?.averagePackage || '3.5 - 4.5 LPA'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark font-outfit mb-2">About the Company</h6>
                  <p className="text-secondary small lh-base">{company.description}</p>
                  <div className="d-flex align-items-center gap-3 text-secondary small">
                    <span>
                      <i className="bi bi-envelope me-1 text-primary"></i>
                      {company.contactEmail || 'campus@recruiting.com'}
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      <i className="bi bi-globe me-1"></i> Visit Corporate Career Portal &rarr;
                    </a>
                  </div>
                </div>

                {/* Open Drives from this Company */}
                <h6 className="fw-bold text-dark font-outfit mb-2">
                  <i className="bi bi-briefcase-fill text-primary me-1.5"></i> Open Opportunities from {company.name}
                </h6>

                {companyPlacements.length === 0 && companyInternships.length === 0 ? (
                  <div className="p-3 rounded bg-light border text-center text-muted small">
                    No active drives currently open from this recruiter. Check announcements for upcoming schedules.
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {companyPlacements.map((p) => {
                      const bookmarked = isBookmarked(`placement-${p.id}`);
                      const applied = hasStudentApplied('placement', p.id);
                      return (
                        <div key={p.id} className="p-3 rounded border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-primary">Full-Time Placement</span>
                              <strong className="text-dark small font-outfit">{p.jobRole}</strong>
                            </div>
                            <div className="text-secondary small mt-1" style={{ fontSize: '0.78rem' }}>
                              Package: <span className="fw-bold text-success">{p.salaryPackage}</span> • Min CGPA: <strong>{p.requiredCgpa}</strong> • Drive Date: {p.driveDate}
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <button
                              className={`btn btn-sm btn-outline-secondary bookmark-btn ${bookmarked ? 'text-warning' : ''}`}
                              onClick={() => toggleBookmark(`placement-${p.id}`)}
                              title={bookmarked ? 'Remove from Shortlist' : 'Bookmark this Drive'}
                            >
                              <i className={`bi ${bookmarked ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
                            </button>
                            {applied ? (
                              <span className="badge bg-success py-1.5 px-2.5">
                                <i className="bi bi-check-circle-fill me-1"></i> Applied
                              </span>
                            ) : (
                              <button
                                className="btn btn-primary btn-sm py-1 px-3 fw-semibold"
                                onClick={() => {
                                  onClose();
                                  onNavigate('placements');
                                }}
                              >
                                View & Apply
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {companyInternships.map((i) => {
                      const bookmarked = isBookmarked(`internship-${i.id}`);
                      const applied = hasStudentApplied('internship', i.id);
                      return (
                        <div key={i.id} className="p-3 rounded border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-info text-dark">Internship</span>
                              <strong className="text-dark small font-outfit">{i.role}</strong>
                            </div>
                            <div className="text-secondary small mt-1" style={{ fontSize: '0.78rem' }}>
                              Stipend: <span className="fw-bold text-success">{i.stipend}</span> • Duration: {i.duration} • {i.locationType}
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <button
                              className={`btn btn-sm btn-outline-secondary bookmark-btn ${bookmarked ? 'text-warning' : ''}`}
                              onClick={() => toggleBookmark(`internship-${i.id}`)}
                              title={bookmarked ? 'Remove from Shortlist' : 'Bookmark this Internship'}
                            >
                              <i className={`bi ${bookmarked ? 'bi-star-fill text-warning' : 'bi-star'}`}></i>
                            </button>
                            {applied ? (
                              <span className="badge bg-success py-1.5 px-2.5">
                                <i className="bi bi-check-circle-fill me-1"></i> Applied
                              </span>
                            ) : (
                              <button
                                className="btn btn-outline-primary btn-sm py-1 px-3 fw-semibold"
                                onClick={() => {
                                  onClose();
                                  onNavigate('internships');
                                }}
                              >
                                View & Apply
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SELECTION PROCESS & ROUNDS */}
            {activeTab === 'rounds' && (
              <div>
                <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-lightbulb-fill text-info fs-5"></i>
                  <span>Standard hiring pipeline followed by {company.name} during BCA on-campus recruitment drives.</span>
                </div>

                <div className="d-flex flex-column gap-3">
                  {(interviewData?.interviewRounds || [
                    { round: 1, title: 'Online Assessment', duration: '60 Min', focus: 'Aptitude & Coding', tips: 'Practice time management' },
                    { round: 2, title: 'Technical Interview', duration: '30 Min', focus: 'SQL & OOPs', tips: 'Know your major project' },
                    { round: 3, title: 'HR Round', duration: '15 Min', focus: 'Culture fit & Communication', tips: 'Express eagerness to learn' }
                  ]).map((round) => (
                    <div key={round.round} className="card border shadow-sm rounded-3 p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center"
                            style={{ width: '28px', height: '28px', fontSize: '0.85rem' }}
                          >
                            {round.round}
                          </span>
                          <h6 className="fw-bold text-dark font-outfit mb-0">{round.title}</h6>
                        </div>
                        <span className="badge bg-secondary-subtle text-dark small">{round.duration}</span>
                      </div>

                      <div className="small text-secondary mb-2">
                        <strong>Key Focus Areas:</strong> {round.focus}
                      </div>

                      <div className="p-2.5 rounded bg-warning bg-opacity-10 border border-warning border-opacity-25 small text-dark d-flex align-items-start gap-2">
                        <i className="bi bi-pin-angle-fill text-warning flex-shrink-0 mt-0.5"></i>
                        <span><strong>TPO Selection Tip:</strong> {round.tips}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PAST BCA QUESTIONS */}
            {activeTab === 'questions' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-secondary">
                    Real questions asked to our BCA students in previous {company.name} placement drives:
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm py-0.5 px-2 small"
                    onClick={() => {
                      const allKeys: Record<number, boolean> = {};
                      interviewData?.bcaQuestions.forEach((_, idx) => {
                        allKeys[idx] = true;
                      });
                      setRevealedQuestions(allKeys);
                    }}
                  >
                    Reveal All Answers
                  </button>
                </div>

                <div className="d-flex flex-column gap-2.5">
                  {(interviewData?.bcaQuestions || []).map((q, idx) => {
                    const isRevealed = !!revealedQuestions[idx];
                    return (
                      <div key={idx} className="card border rounded-3 p-3 shadow-sm">
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                          <div className="d-flex align-items-start gap-2">
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle mt-0.5">
                              {q.topic}
                            </span>
                            <span className="fw-semibold text-dark small">{q.question}</span>
                          </div>
                          <span className="badge bg-light text-muted border small flex-shrink-0">
                            {q.frequency}
                          </span>
                        </div>

                        {/* Toggle Answer Button */}
                        <button
                          type="button"
                          className="btn btn-link p-0 text-start text-decoration-none small text-primary fw-semibold d-inline-flex align-items-center gap-1 mt-1"
                          onClick={() => toggleQuestionReveal(idx)}
                        >
                          <i className={`bi ${isRevealed ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                          <span>{isRevealed ? 'Hide Model Answer' : 'Click to View Model Answer'}</span>
                        </button>

                        {isRevealed && (
                          <div className="mt-2 p-2.5 bg-light rounded border border-secondary-subtle small text-dark lh-base animate-fade-in">
                            <div className="fw-semibold text-success small mb-1">
                              <i className="bi bi-check-circle-fill me-1"></i> Recommended Fresher Answer:
                            </div>
                            {q.sampleAnswer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-between align-items-center">
          <span className="text-xs text-slate-500">
            Campus Placement Cell • Hiring Partner Dossier
          </span>
          <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
