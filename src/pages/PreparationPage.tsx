import React, { useState } from 'react';
import { preparationResources } from '../mockData';
import { InteractiveQuizWidget } from '../components/InteractiveQuizWidget';

export const PreparationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('prep-aptitude');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (questionKey: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };

  const currentSection = preparationResources.find(r => r.id === activeTab) || preparationResources[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'prep-aptitude': return 'bi-calculator';
      case 'prep-coding': return 'bi-code';
      case 'prep-logical': return 'bi-puzzle';
      case 'prep-comm': return 'bi-chat-left-dots';
      case 'prep-resume': return 'bi-file-earmark-person';
      case 'prep-interview': return 'bi-person-video';
      case 'prep-mock-test': return 'bi-lightning-charge';
      default: return 'bi-book';
    }
  };

  return (
    <div className="container-fluid px-4 px-lg-5 py-4 bg-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Career Readiness & Assessment
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-1">Placement Preparation Dossier</h1>
          <p className="text-xs text-slate-500 mb-0 max-w-3xl">
            Curated preparation guides, aptitude question banks, coding benchmarks, ATS resume guidelines, and technical interview blueprints.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
            {preparationResources.length} Modules & Practice Test
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex flex-wrap gap-1.5 mb-4 border-b border-slate-200 pb-2">
        {preparationResources.map(res => (
          <button
            key={res.id}
            type="button"
            className={`py-1.5 px-3 text-xs font-semibold rounded d-flex align-items-center gap-1.5 transition-colors ${
              activeTab === res.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
            onClick={() => setActiveTab(res.id)}
          >
            <i className={`bi ${getTabIcon(res.id)}`}></i>
            <span>{res.category}</span>
          </button>
        ))}
        <button
          type="button"
          className={`py-1.5 px-3 text-xs font-semibold rounded d-flex align-items-center gap-1.5 transition-colors ${
            activeTab === 'prep-mock-test'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200'
          }`}
          onClick={() => setActiveTab('prep-mock-test')}
        >
          <i className="bi bi-lightning-charge"></i>
          <span>Interactive Quiz</span>
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'prep-mock-test' ? (
        <InteractiveQuizWidget />
      ) : (
        <div className="portal-card bg-white p-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
              {currentSection.category}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">{currentSection.title}</h2>
          <p className="text-xs text-slate-500 mb-4">{currentSection.description}</p>

          <div className="row g-4">
            {/* Left Column: Practice Questions with Explanations */}
            <div className="col-lg-7">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Practice Questions & Explanations
              </h3>

              {currentSection.sampleQuestions && currentSection.sampleQuestions.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {currentSection.sampleQuestions.map((item, idx) => {
                    const qKey = `${currentSection.id}-${idx}`;
                    const isRevealed = revealedAnswers[qKey];

                    return (
                      <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-white">
                        <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500">
                            Q{idx + 1}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm py-0.5 px-2 text-xs"
                            onClick={() => toggleAnswer(qKey)}
                          >
                            <i className={`bi ${isRevealed ? 'bi-eye-slash' : 'bi-eye'} me-1`}></i>
                            {isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}
                          </button>
                        </div>

                        <div className="text-xs font-medium text-slate-900 mb-2">{item.q}</div>

                        {isRevealed && (
                          <div className="mt-2.5 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                            <div className="font-semibold text-emerald-800 mb-1">
                              ✓ Correct Answer: {item.a}
                            </div>
                            {item.explanation && (
                              <p className="mb-0 text-slate-600 mt-1">{item.explanation}</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs">
                  No sample questions currently attached to this section. Refer to the key points and guidelines.
                </div>
              )}
            </div>

            {/* Right Column: Expert Tips & Key Points */}
            <div className="col-lg-5">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 sticky-top" style={{ top: '80px' }}>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Key Concepts & Strategy
                </h3>

                <div className="d-flex flex-column gap-2.5 text-xs">
                  {currentSection.keyPoints.map((tip, idx) => (
                    <div key={idx} className="d-flex align-items-start gap-2">
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="text-slate-700 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-200 my-3.5" />

                <div className="p-3 bg-white rounded border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-900 mb-1">
                    Placement Cell Guidance
                  </div>
                  <p className="text-slate-500 mb-0">
                    Practice at least 15 quantitative problems and 1 mock interview weekly. Utilize the placement office helpdesk for ATS resume audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
