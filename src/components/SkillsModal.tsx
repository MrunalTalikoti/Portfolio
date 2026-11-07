import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
                Technical Stack & Academic Profile
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[11px] text-neutral-500">CGPA 9.22 / 10</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
              Skills, Education & Co-Curriculars
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

        {/* Education & Academic Highlight */}
        <div className="p-6 sm:px-8 sm:py-5 bg-neutral-900 text-white shrink-0 border-b border-neutral-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Education
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {PORTFOLIO_DATA.personal.education.college}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                {PORTFOLIO_DATA.personal.education.degree} · {PORTFOLIO_DATA.personal.education.location}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-neutral-800/80 px-4 py-2.5 rounded-2xl border border-neutral-700/80">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">Cumulative GPA</span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">{PORTFOLIO_DATA.personal.education.cgpa}</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-700" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">Graduation</span>
                <span className="text-sm sm:text-base font-bold text-neutral-200">{PORTFOLIO_DATA.personal.education.expectedGraduation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 sm:px-8 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3 shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search technologies, frameworks, libraries (e.g. PyTorch, Azure, LangGraph)..."
            className="w-full bg-transparent text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-neutral-500 hover:text-black font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7">
          {/* Categorized Skills */}
          <div className="space-y-5">
            {PORTFOLIO_DATA.skills.map((skillGroup, idx) => {
              const matchedItems = skillGroup.items.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (searchTerm && matchedItems.length === 0) return null;

              return (
                <div key={idx} className="bg-neutral-50/70 p-4 sm:p-5 rounded-2xl border border-neutral-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">
                      {skillGroup.category}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {matchedItems.length} skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {matchedItems.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white text-black border border-neutral-200 shadow-2xs font-medium hover:border-black transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Co-Curricular & Hackathon Accolades */}
          <div className="pt-2">
            <h3 className="text-lg font-bold text-black mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Co-Curricular Achievements & Honors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.coCurricular.map((item, cIdx) => (
                <div key={cIdx} className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                      {item.org}
                    </span>
                    <h5 className="text-base font-bold text-black tracking-tight mt-1 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <span>Official Resume includes full university verification</span>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black hover:underline"
          >
            Open Resume PDF &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
