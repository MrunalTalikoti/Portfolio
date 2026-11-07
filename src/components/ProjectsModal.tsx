import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProjectId?: string | null;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  selectedProjectId,
}) => {
  const [filter, setFilter] = useState<'all' | 'agent' | 'llm' | 'ml'>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  if (!isOpen) return null;

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'agent') return p.id === 'meta-agent' || p.id === 'factless';
    if (filter === 'llm') return p.id === 'clover' || p.id === 'meta-agent' || p.id === 'factless';
    if (filter === 'ml') return p.id === 'analog-workflow' || p.id === 'clover';
    return true;
  });

  const detailItem = activeProject || PORTFOLIO_DATA.projects.find((p) => p.id === selectedProjectId) || null;

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
                Portfolio Showcase
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[11px] text-neutral-500">5 Selected Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
              Engineering & AI Projects
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

        {/* Filter Bar */}
        <div className="px-6 sm:px-8 py-3 bg-neutral-50/80 border-b border-neutral-100 flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-500 font-medium mr-1">Filter:</span>
          {(['all', 'agent', 'llm', 'ml'] as const).map((key) => {
            const labels = {
              all: 'All Projects',
              agent: 'Multi-Agent Systems',
              llm: 'LLMs & Fine-Tuning',
              ml: 'Machine Learning',
            };
            return (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                  setActiveProject(null);
                }}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                  filter === key
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {detailItem && (
            <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative border border-neutral-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2.5 py-0.5 rounded-full">
                  {detailItem.badge || 'Featured Work'}
                </span>
                <button
                  onClick={() => setActiveProject(null)}
                  className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  View All Projects &darr;
                </button>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {detailItem.title}
              </h3>
              <p className="text-sm text-neutral-400 mb-4">{detailItem.subtitle}</p>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-5">
                {detailItem.description}
              </p>

              <div className="space-y-2 mb-5">
                <span className="text-xs font-semibold text-neutral-300 block">Key Architecture & Highlights:</span>
                {detailItem.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <span className="text-neutral-500 font-bold select-none">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800">
                {detailItem.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => {
              const isSelected = detailItem?.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                        {project.badge || 'Project'}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">Explore &rarr;</span>
                    </div>

                    <h4 className="text-lg font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {project.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium mb-3">{project.subtitle}</p>

                    <p className="text-xs sm:text-sm text-neutral-700 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 pt-3 border-t border-neutral-100">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-neutral-400">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <span>Source code & architectures available on GitHub</span>
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black hover:underline flex items-center gap-1.5"
          >
            <span>github.com/MrunalTalikoti</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
