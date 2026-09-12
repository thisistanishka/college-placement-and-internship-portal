import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  topic: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'DBMS / SQL',
    question: 'Which SQL clause is used to filter groups created by the GROUP BY statement?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
    correctIndex: 1,
    explanation: 'HAVING filters aggregated groups (e.g. HAVING COUNT(*) > 2), whereas WHERE filters individual rows before aggregation occurs.'
  },
  {
    id: 2,
    topic: 'OOPs Concepts',
    question: 'Which OOP feature refers to the ability of an object or method to take on multiple forms?',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
    correctIndex: 2,
    explanation: 'Polymorphism (Greek for "many forms") allows methods to perform different behaviors based on the object instance (method overloading and overriding).'
  },
  {
    id: 3,
    topic: 'Data Structures',
    question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'In a balanced BST, each comparison halves the remaining search space, resulting in O(log N) average time complexity.'
  },
  {
    id: 4,
    topic: 'Python / Web Tech',
    question: 'What is the HTTP status code returned for a successfully created resource on a RESTful server?',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correctIndex: 1,
    explanation: 'HTTP 201 Created is the standard status code returned when a POST request successfully creates a new record or resource on the server.'
  },
  {
    id: 5,
    topic: 'Quantitative Aptitude',
    question: 'A train 120m long passes a pole in 6 seconds. What is the speed of the train in km/hr?',
    options: ['60 km/hr', '72 km/hr', '80 km/hr', '90 km/hr'],
    correctIndex: 1,
    explanation: 'Speed = Distance / Time = 120 / 6 = 20 m/s. Converting to km/hr: 20 * (18 / 5) = 72 km/hr.'
  }
];

export const InteractiveQuizWidget: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <div className="portal-card bg-white overflow-hidden">
      {/* Quiz Header */}
      <div className="px-5 py-4 border-b border-slate-200 d-flex align-items-center justify-content-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-0">Placement Assessment Mock Quiz</h3>
          <p className="text-xs text-slate-500 mb-0 mt-0.5">
            Evaluate your core technical fundamentals & aptitude in 5 quick questions
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
            {answeredCount} / {QUIZ_QUESTIONS.length} Answered
          </span>
          {submitted && (
            <button className="btn btn-outline-secondary btn-sm py-1 px-2.5 text-xs" onClick={resetQuiz}>
              Retake
            </button>
          )}
        </div>
      </div>

      {/* Quiz Body */}
      <div className="p-5 bg-white">
        {submitted && (
          <div
            className={`p-4 mb-4 rounded-lg border text-xs d-flex align-items-center justify-content-between ${
              score >= 4
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : score >= 2
                ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                : 'bg-rose-50/60 border-rose-200 text-rose-900'
            }`}
          >
            <div>
              <div className="font-bold text-sm">Your Score: {score} / {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)</div>
              <div className="mt-1">
                {score >= 4
                  ? 'Strong performance! You demonstrate clear grasp of technical screening rounds.'
                  : 'Good review attempt. Study the brief explanations below to reinforce any missed concepts.'}
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-sm text-xs bg-white ms-3 whitespace-nowrap" onClick={resetQuiz}>
              Try Again
            </button>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correctIndex;

            return (
              <div key={q.id} className="p-4 rounded-lg border border-slate-200 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 text-xs font-semibold d-inline-flex align-items-center justify-content-center">
                      {qIndex + 1}
                    </span>
                    <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                      {q.topic}
                    </span>
                  </div>

                  {submitted && (
                    <span className={`badge text-[11px] font-medium ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {isCorrect ? 'Correct (+1)' : 'Incorrect'}
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-slate-900 mb-3">{q.question}</div>

                {/* Options Grid */}
                <div className="row g-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let btnClass = 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        btnClass = 'bg-slate-50/50 border-slate-200 text-slate-400';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-slate-900 text-white border-slate-900 font-medium';
                    }

                    return (
                      <div key={optIdx} className="col-12 col-md-6">
                        <button
                          type="button"
                          className={`btn btn-sm w-100 text-start py-2 px-3 rounded text-xs d-flex align-items-center justify-content-between border ${btnClass}`}
                          onClick={() => handleSelect(q.id, optIdx)}
                          disabled={submitted}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correctIndex && (
                            <i className="bi bi-check-circle-fill text-emerald-600 ms-1"></i>
                          )}
                          {submitted && isSelected && optIdx !== q.correctIndex && (
                            <i className="bi bi-x-circle-fill text-rose-600 ms-1"></i>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {submitted && (
                  <div className="mt-3 p-3 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Explanation:</span> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="btn btn-primary btn-sm py-2 px-4 text-xs font-semibold d-inline-flex align-items-center gap-1.5"
              onClick={() => setSubmitted(true)}
              disabled={answeredCount === 0}
            >
              Submit & Check Answers ({answeredCount} / {QUIZ_QUESTIONS.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
