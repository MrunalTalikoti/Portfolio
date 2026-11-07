import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                Industry Track Record
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[11px] text-neutral-500">4 Internships</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
              Work Experience & Internships
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer text-neutral-600"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Metrics Banner */}
        <div className="px-6 sm:px-8 py-3.5 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Production Impact:</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="font-bold text-sm text-white">100k+</span>
              <span className="text-neutral-400 ml-1">Docs/Day Processed</span>
            </div>
            <div className="hidden sm:block text-neutral-700">|</div>
            <div>
              <span className="font-bold text-sm text-white">89%</span>
              <span className="text-neutral-400 ml-1">LLM Extraction Accuracy</span>
            </div>
            <div className="hidden sm:block text-neutral-700">|</div>
            <div>
              <span className="font-bold text-sm text-white">70%–90%</span>
              <span className="text-neutral-400 ml-1">Manual Effort Cut</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className="relative border-l-2 border-neutral-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-black ring-4 ring-white" />

                <div className="bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 sm:p-6 transition-all">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                        {exp.company}
                      </h3>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black text-white">
                        {exp.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-neutral-700 mb-3 flex items-center gap-2">
                    <span className="font-semibold text-black">{exp.role}</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{exp.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 mb-4 italic">
                    {exp.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    {exp.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                        <span className="text-neutral-400 select-none font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200/60">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <span>Looking for full-time & high-impact AI/Cloud roles</span>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black hover:underline flex items-center gap-1.5"
          >
            <span>Download Resume PDF</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
