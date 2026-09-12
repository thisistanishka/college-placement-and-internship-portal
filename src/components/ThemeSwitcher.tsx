import React from 'react';
import { useApp } from '../context/AppContext';
import { ThemeType } from '../types';

interface ThemeOption {
  id: ThemeType;
  name: string;
  primaryColor: string;
  accentColor: string;
  badgeText: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'indigo',
    name: 'Royal Indigo',
    primaryColor: '#4f46e5',
    accentColor: '#f59e0b',
    badgeText: 'Default'
  },
  {
    id: 'emerald',
    name: 'Emerald Tech',
    primaryColor: '#059669',
    accentColor: '#d97706',
    badgeText: 'Campus'
  },
  {
    id: 'sapphire',
    name: 'Sapphire Blue',
    primaryColor: '#2563eb',
    accentColor: '#f97316',
    badgeText: 'Corporate'
  },
  {
    id: 'crimson',
    name: 'Crimson Varsity',
    primaryColor: '#b91c1c',
    accentColor: '#eab308',
    badgeText: 'Varsity'
  }
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useApp();

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light btn-sm py-1.5 px-2.5 rounded d-flex align-items-center gap-2 shadow-sm"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title="Change Website Color Theme"
      >
        <div
          className="rounded-circle shadow-sm"
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: 'var(--theme-primary)',
            border: '2px solid rgba(255,255,255,0.8)'
          }}
        ></div>
        <i className="bi bi-palette-fill text-warning"></i>
        <span className="small d-none d-md-inline fw-medium">
          Color: <span className="text-capitalize">{theme}</span>
        </span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end shadow-lg p-2 rounded-3" style={{ minWidth: '220px' }}>
        <li className="px-2 py-1">
          <div className="fw-bold small text-dark font-outfit">Choose Color Palette</div>
          <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
            Updates primary accents, buttons & headers
          </div>
        </li>
        <li><hr className="dropdown-divider my-1" /></li>

        {THEME_OPTIONS.map((opt) => {
          const isActive = theme === opt.id;
          return (
            <li key={opt.id}>
              <button
                type="button"
                className={`dropdown-item rounded-2 py-1.5 px-2 d-flex align-items-center justify-content-between ${
                  isActive ? 'bg-light fw-bold text-dark' : 'text-secondary'
                }`}
                onClick={() => setTheme(opt.id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex gap-1 align-items-center">
                    <span
                      className="rounded-circle shadow-sm"
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: opt.primaryColor
                      }}
                    ></span>
                    <span
                      className="rounded-circle shadow-sm"
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: opt.accentColor
                      }}
                    ></span>
                  </div>
                  <span className="small">{opt.name}</span>
                </div>

                <div className="d-flex align-items-center gap-1">
                  <span
                    className="badge rounded-pill text-dark"
                    style={{ backgroundColor: '#f1f5f9', fontSize: '0.65rem' }}
                  >
                    {opt.badgeText}
                  </span>
                  {isActive && <i className="bi bi-check2 text-primary fw-bold ms-1"></i>}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
