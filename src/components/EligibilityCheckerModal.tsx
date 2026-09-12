import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { placements, internships, currentStudent } = useApp();

  const [cgpa, setCgpa] = useState<number>(currentStudent?.cgpa || 7.5);
  const [tenthPercent, setTenthPercent] = useState<number>(75);
  const [twelfthPercent, setTwelfthPercent] = useState<number>(72);
  const [backlogs, setBacklogs] = useState<number>(0);

  if (!isOpen) return null;

  const handleFillMyProfile = () => {
    if (currentStudent) {
      setCgpa(currentStudent.cgpa);
      setTenthPercent(82);
      setTwelfthPercent(78);
      setBacklogs(0);
    }
  };

  // Evaluate Placements
  const evaluatedPlacements = placements.map((p) => {
    const cgpaPass = cgpa >= p.requiredCgpa;
    const backlogPass = backlogs === 0 || p.eligibility.toLowerCase().includes('backlog');
    const isEligible = cgpaPass && backlogPass;

    let reason = 'Meets all minimum academic & criteria benchmarks';
    if (!cgpaPass) {
      reason = `Requires minimum ${p.requiredCgpa} CGPA (Your input: ${cgpa})`;
    } else if (!backlogPass) {
      reason = 'Company requires zero active backlogs';
    }

    return {
      opportunity: p,
      isEligible,
      reason
    };
  });

  const eligibleCount = evaluatedPlacements.filter((item) => item.isEligible).length;
  const matchPercentage = Math.round((eligibleCount / (placements.length || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
      <div className="portal-card bg-white w-full max-w-2xl overflow-hidden max-h-[90vh] d-flex flex-column">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-start">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0">Placement Eligibility Evaluator</h3>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              Simulate candidate academic eligibility against active campus placement cutoffs
            </p>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600 text-lg leading-none" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-5 bg-white overflow-y-auto flex-grow-1">
            {/* Input Controls */}
            <div className="card border shadow-sm p-3 mb-3 bg-white rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <span className="fw-bold small text-dark font-outfit">
                  <i className="bi bi-sliders text-primary me-1.5"></i> Adjust Your Academic Criteria
                </span>
                {currentStudent && (
                  <button
                    className="btn btn-outline-primary btn-sm py-0.5 px-2 small d-flex align-items-center gap-1"
                    onClick={handleFillMyProfile}
                  >
                    <i className="bi bi-person-check-fill"></i> Load {currentStudent.name.split(' ')[0]}'s Profile
                  </button>
                )}
              </div>

              <div className="row g-3">
                {/* CGPA Slider / Input */}
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">Graduation / BCA CGPA</label>
                    <span className="badge bg-primary fs-7">{cgpa.toFixed(1)} / 10.0</span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="5.0"
                    max="10.0"
                    step="0.1"
                    value={cgpa}
                    onChange={(e) => setCgpa(parseFloat(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                    <span>5.0</span>
                    <span>7.0 (First Class)</span>
                    <span>10.0</span>
                  </div>
                </div>

                {/* Active Backlogs */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary mb-1">Active / Standing Backlogs</label>
                  <div className="btn-group w-100" role="group">
                    {[0, 1, 2, 3].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`btn btn-sm ${backlogs === val ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
                        onClick={() => setBacklogs(val)}
                      >
                        {val === 0 ? '0 (Clean Record)' : `${val} Backlog${val > 1 ? 's' : ''}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 10th & 12th Percentages */}
                <div className="col-6 col-md-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">10th Aggregate %</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="40"
                    max="100"
                    value={tenthPercent}
                    onChange={(e) => setTenthPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small fw-semibold text-secondary mb-1">12th Aggregate %</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="40"
                    max="100"
                    value={twelfthPercent}
                    onChange={(e) => setTwelfthPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  />
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="w-100 p-2 rounded bg-light border d-flex align-items-center justify-content-between">
                    <span className="small text-muted">Drive Eligibility Match:</span>
                    <strong className={`small ${matchPercentage >= 70 ? 'text-success' : matchPercentage >= 40 ? 'text-warning' : 'text-danger'}`}>
                      {eligibleCount} of {placements.length} Companies ({matchPercentage}%)
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Progress Bar */}
            <div className="card border shadow-sm p-3 mb-3 bg-white rounded-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="small fw-semibold text-dark">Overall Campus Readiness Index</span>
                <span className="badge bg-dark small">{matchPercentage}% Match</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className={`progress-bar progress-bar-striped progress-bar-animated ${
                    matchPercentage >= 80 ? 'bg-success' : matchPercentage >= 50 ? 'bg-primary' : 'bg-warning'
                  }`}
                  role="progressbar"
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Evaluated Drives List */}
            <h6 className="fw-bold text-dark small font-outfit mb-2">
              <i className="bi bi-building-check text-success me-1"></i> Live Drive Qualification Breakdown
            </h6>
            <div className="d-flex flex-column gap-2">
              {evaluatedPlacements.map(({ opportunity: p, isEligible, reason }) => (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-3 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 ${
                    isEligible ? 'bg-white border-success-subtle' : 'bg-light border-danger-subtle opacity-85'
                  }`}
                >
                  <div className="d-flex align-items-start gap-2.5">
                    <div
                      className={`rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 text-white ${
                        isEligible ? 'bg-success' : 'bg-danger'
                      }`}
                      style={{ width: '32px', height: '32px' }}
                    >
                      <i className={`bi ${isEligible ? 'bi-check-lg' : 'bi-x-lg'} fs-6`}></i>
                    </div>

                    <div>
                      <div className="fw-bold text-dark small font-outfit">{p.companyName}</div>
                      <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>
                        {p.jobRole} • <span className="text-dark fw-semibold">{p.salaryPackage}</span>
                      </div>
                      <div className={`small ${isEligible ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.72rem' }}>
                        {reason}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 justify-content-end">
                    <span className={`badge ${isEligible ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`}>
                      {isEligible ? 'Eligible to Apply' : 'Cutoff Barred'}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-primary py-1 px-2 small"
                      onClick={() => {
                        onClose();
                        onNavigate('placements');
                      }}
                    >
                      Drive Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-between align-items-center">
          <span className="text-xs text-slate-500">
            Based on Placement Cell criteria guidelines.
          </span>
          <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
