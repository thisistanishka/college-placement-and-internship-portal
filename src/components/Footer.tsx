import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenProjectCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenProjectCode }) => {
  return (
    <footer className="footer-light pt-5 pb-3 border-top border-sky-subtle mt-auto">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4 mb-4">
          {/* Col 1: Placement Cell Profile */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-sky-subtle text-sky-dark rounded-3 p-2 d-flex align-items-center justify-content-center border border-sky-subtle shadow-xs" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-mortarboard-fill fs-5"></i>
              </div>
              <div>
                <h6 className="mb-0 fw-bold font-outfit text-navy-primary">UNIVERSITY PLACEMENT & INTERNSHIP CELL</h6>
                <span className="small text-sky-dark fw-semibold">Central Training & Placement Division</span>
              </div>
            </div>
            <p className="text-muted small pe-lg-3 lh-base">
              Dedicated to bridging academia and industry by coordinating full-time recruitment drives, corporate internships, soft-skills bootcamps, and technical mentoring for graduating students across all courses (B.Tech, BCA, MCA, BBA, MBA, B.Com, B.Sc, BA).
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-white text-navy-primary border border-sky-subtle"><i className="bi bi-check2-circle text-success me-1"></i>NAAC 'A++' Accredited</span>
              <span className="badge bg-white text-navy-primary border border-sky-subtle"><i className="bi bi-shield-check text-sky-dark me-1"></i>UGC & AICTE Recognized</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold text-navy-primary mb-3 text-uppercase small tracking-wide">Portal Navigation</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('home')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Home
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('placements')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Placements
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('internships')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Internships
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('drives')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Placement Drives
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('companies')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Partner Companies
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('announcements')}>
                  <i className="bi bi-chevron-right me-1 text-sky-dark"></i> Notice Board
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Preparation & Project */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="fw-bold text-navy-primary mb-3 text-uppercase small tracking-wide">Preparation & Viva</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('preparation')}>
                  <i className="bi bi-check2 me-1 text-sky-dark"></i> Aptitude & Numerical Ability
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('preparation')}>
                  <i className="bi bi-check2 me-1 text-sky-dark"></i> Coding & Technical Questions
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('preparation')}>
                  <i className="bi bi-check2 me-1 text-sky-dark"></i> HR Interview STAR Method
                </button>
              </li>
              <li>
                <button className="btn btn-link text-muted text-decoration-none p-0 text-start small hover-text-primary" onClick={() => onNavigate('preparation')}>
                  <i className="bi bi-check2 me-1 text-sky-dark"></i> ATS Resume Writing Tips
                </button>
              </li>
              <li>
                <button className="btn btn-link text-sky-dark text-decoration-none p-0 text-start small fw-bold hover-text-primary" onClick={onOpenProjectCode}>
                  <i className="bi bi-code-square me-1"></i> Python Flask & SQLite Code Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Cell Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-navy-primary mb-3 text-uppercase small tracking-wide">T&P Cell Helpdesk</h6>
            <div className="small text-muted d-flex flex-column gap-2">
              <div className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt text-sky-dark mt-0.5"></i>
                <span>TPO Block, Ground Floor, Central Academic Tower, University Campus</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-sky-dark"></i>
                <span>placement.cell@university.edu.in</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-sky-dark"></i>
                <span>+91 (011) 2659-7000 / Ext: 412</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-clock text-sky-dark"></i>
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-sky-subtle my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted gap-2">
          <div>
            © {new Date().getFullYear()} College Placement & Internship Cell Portal. Developed by 3rd-Year Students.
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-sky-subtle text-navy-primary border border-sky-subtle">
              Tech Stack: Python Flask • SQLite3 • HTML/CSS • JavaScript • Bootstrap 5
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
