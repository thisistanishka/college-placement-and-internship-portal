import React, { useState } from 'react';

interface SalaryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageLPA?: number;
}

export const SalaryCalculatorModal: React.FC<SalaryCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPackageLPA = 4.5
}) => {
  const [ctcLPA, setCtcLPA] = useState<number>(initialPackageLPA);

  if (!isOpen) return null;

  const annualCTC = ctcLPA * 100000;
  // Standard Indian IT fresher salary structure model
  const basicAnnual = annualCTC * 0.40; // 40% Basic
  const hraAnnual = basicAnnual * 0.50; // 50% of Basic
  const pfEmployeeAnnual = basicAnnual * 0.12; // 12% of Basic PF
  const profTaxAnnual = 2400; // ~₹200 per month
  const specialAllowanceAnnual = Math.max(0, annualCTC - (basicAnnual + hraAnnual + pfEmployeeAnnual + profTaxAnnual));

  const grossMonthly = (basicAnnual + hraAnnual + specialAllowanceAnnual) / 12;
  const monthlyDeductions = (pfEmployeeAnnual + profTaxAnnual) / 12;
  const inHandMonthly = Math.round(grossMonthly - monthlyDeductions);

  const presets = [
    { label: 'TCS Ignite (3.6 LPA)', lpa: 3.6 },
    { label: 'Infosys BPM (3.8 LPA)', lpa: 3.8 },
    { label: 'Cognizant (4.5 LPA)', lpa: 4.5 },
    { label: 'Zoho Dev (6.0 LPA)', lpa: 6.0 },
    { label: 'Premium Offer (8.5 LPA)', lpa: 8.5 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs d-flex align-items-center justify-content-center p-4">
      <div className="portal-card bg-white w-full max-w-2xl overflow-hidden max-h-[90vh] d-flex flex-column">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 d-flex justify-content-between align-items-start">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0">Compensation & In-Hand Pay Calculator</h3>
            <p className="text-xs text-slate-500 mb-0 mt-0.5">
              Estimate monthly take-home salary from annual campus CTC offer packages
            </p>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600 text-lg leading-none" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-5 bg-white overflow-y-auto flex-grow-1">
            {/* Quick Presets */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">Select Common BCA Offer Presets:</label>
              <div className="d-flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.lpa}
                    type="button"
                    className={`btn btn-sm py-1 px-2.5 rounded-pill ${
                      ctcLPA === p.lpa ? 'btn-primary fw-bold' : 'btn-outline-secondary bg-white'
                    }`}
                    onClick={() => setCtcLPA(p.lpa)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="card border shadow-sm p-3 mb-4 bg-white rounded-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="small fw-semibold text-dark">Annual Cost to Company (CTC)</span>
                <span className="badge bg-primary fs-6 px-3 py-1 font-outfit">
                  ₹{ctcLPA.toFixed(1)} LPA (₹{(annualCTC).toLocaleString('en-IN')} / yr)
                </span>
              </div>
              <input
                type="range"
                className="form-range my-2"
                min="2.5"
                max="15.0"
                step="0.1"
                value={ctcLPA}
                onChange={(e) => setCtcLPA(parseFloat(e.target.value))}
              />
              <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.72rem' }}>
                <span>₹2.5 LPA (Entry)</span>
                <span>₹5.0 LPA (Standard)</span>
                <span>₹10.0 LPA</span>
                <span>₹15.0 LPA (High)</span>
              </div>
            </div>

            {/* Big In-Hand Card */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="p-3 bg-white border border-primary-subtle rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="text-uppercase small fw-bold text-primary tracking-wider" style={{ fontSize: '0.72rem' }}>
                      Estimated Take-Home Pay
                    </span>
                    <div className="display-6 fw-bold text-dark font-outfit mt-1">
                      ₹{inHandMonthly.toLocaleString('en-IN')}
                      <span className="text-secondary fs-6 fw-normal"> / month</span>
                    </div>
                    <div className="small text-muted mt-1">
                      Net in-bank salary credited monthly after mandatory statutory deductions (PF + PT).
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-top d-flex justify-content-between text-muted small">
                    <span>Annual In-Hand Total:</span>
                    <strong className="text-dark">₹{(inHandMonthly * 12).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Monthly Deductions Summary */}
              <div className="col-md-6">
                <div className="p-3 bg-white border rounded-3 shadow-sm h-100">
                  <span className="text-uppercase small fw-bold text-secondary tracking-wider" style={{ fontSize: '0.72rem' }}>
                    Monthly Statutory Deductions
                  </span>
                  <div className="list-group list-group-flush small mt-2">
                    <div className="list-group-item px-0 py-1.5 d-flex justify-content-between">
                      <span className="text-muted">Employee Provident Fund (EPF 12%):</span>
                      <span className="fw-semibold text-danger">-₹{Math.round(pfEmployeeAnnual / 12).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="list-group-item px-0 py-1.5 d-flex justify-content-between">
                      <span className="text-muted">Professional Tax (PT):</span>
                      <span className="fw-semibold text-danger">-₹{Math.round(profTaxAnnual / 12).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="list-group-item px-0 py-1.5 d-flex justify-content-between border-top">
                      <span className="fw-bold text-dark">Total Monthly Deductions:</span>
                      <span className="fw-bold text-danger">-₹{Math.round(monthlyDeductions).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Components Breakdown */}
            <h6 className="fw-bold text-dark small font-outfit mb-2">
              <i className="bi bi-pie-chart-fill text-primary me-1"></i> Annual Salary Component Breakdown (₹{(annualCTC).toLocaleString('en-IN')})
            </h6>
            <div className="row g-2 text-center">
              <div className="col-3">
                <div className="p-2 bg-white rounded border">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Basic Pay (40%)</div>
                  <div className="fw-bold text-dark small">₹{Math.round(basicAnnual).toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="col-3">
                <div className="p-2 bg-white rounded border">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>HRA (20%)</div>
                  <div className="fw-bold text-dark small">₹{Math.round(hraAnnual).toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="col-3">
                <div className="p-2 bg-white rounded border">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Special Allow.</div>
                  <div className="fw-bold text-dark small">₹{Math.round(specialAllowanceAnnual).toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="col-3">
                <div className="p-2 bg-white rounded border">
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>EPF Savings/yr</div>
                  <div className="fw-bold text-success small">₹{Math.round(pfEmployeeAnnual).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 d-flex justify-content-between align-items-center">
          <span className="text-xs text-slate-500">
            Standard compensation estimates based on prevalent industry structures.
          </span>
          <button type="button" className="btn btn-outline-secondary btn-sm text-xs py-1.5 px-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
