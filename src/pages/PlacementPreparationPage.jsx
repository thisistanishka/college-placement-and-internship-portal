import React, { useState } from 'react';
import { prepModules } from '../data/mockData';
import { 
  BookOpen, 
  Calculator, 
  Brain, 
  Code, 
  Layers, 
  Database, 
  Globe, 
  Users, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Download,
  Award
} from 'lucide-react';

export function PlacementPreparationPage() {
  const [selectedModule, setSelectedModule] = useState(null);

  // Icon mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-sky-600" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-sky-600" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-sky-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-600" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-sky-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-sky-600" />;
      case 'FileText':
      default:
        return <FileText className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Student Career Resources</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Placement Preparation Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Comprehensive study modules covering written aptitude tests, technical viva questions, HR behavior rounds, and resume building.
        </p>
      </div>

      {/* Grid of 10 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {prepModules.map((mod) => {
          const isExpanded = selectedModule === mod.id;

          return (
            <div
              key={mod.id}
              className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs hover:border-sky-300 transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                    {getIcon(mod.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {mod.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-sky-700">
                      {mod.topics.length} Core Topics
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {mod.description}
                </p>

                {/* Syllabus List */}
                <div className="bg-sky-50/40 p-3 rounded-lg border border-sky-50 space-y-1.5 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Key Syllabus & Concepts:
                  </div>
                  {mod.topics.map((t, index) => (
                    <div key={index} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Curated by TPO Faculty
                </span>
                <button
                  onClick={() => alert(`Opening ${mod.title} study notes and practice question bank!`)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition"
                >
                  Start Practice →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Free Resume Template Download Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-base font-bold">Looking for ATS-Friendly College Resume Templates?</h4>
          <p className="text-xs text-sky-100 mt-0.5">
            Download our approved standard single-page Word & LaTeX templates formatted for undergraduate & postgraduate campus hiring.
          </p>
        </div>
        <button
          onClick={() => alert('Downloading official college placement resume template (DOCX / PDF)...')}
          className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download ATS Template</span>
        </button>
      </div>
    </div>
  );
}

export default PlacementPreparationPage;
