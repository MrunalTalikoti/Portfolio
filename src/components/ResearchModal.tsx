import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchModal: React.FC<ResearchModalProps> = ({ isOpen, onClose }) => {
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
                Intellectual Property & Publications
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[11px] text-neutral-500">1 Patent & 2 Papers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
              Patents, Research & Credentials
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

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Featured Patent Card */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Indian Patent Filed
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Patent No. 202621005880
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                A System and a Method for Generation of an Agent
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-4 font-mono">
                Jurisdiction: Controller General of Patents, Designs & Trade Marks (India) · Inventor: Mrunal Talikoti
              </p>

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-5">
                Invented an autonomous hierarchical orchestration architecture allowing generative multi-agent systems to synthesize, validate, execute, and monitor domain-specific autonomous software agents directly from user prompts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs text-neutral-300 bg-neutral-800/60 p-4 rounded-xl border border-neutral-700/50">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&check;</span>
                  <span>Hierarchical orchestration of specialized sub-agents</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&check;</span>
                  <span>Dynamic context management & load balancing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&check;</span>
                  <span>DAG-based workflow execution engine</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&check;</span>
                  <span>Secure artifact & code distribution layer</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['Multi-Agent Architecture', 'Hierarchical Orchestration', 'DAG Execution', 'Autonomous Systems'].map(
                  (tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Research Papers Grid */}
          <h3 className="text-lg font-bold text-black pt-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Conference Papers & Clinical Collaborations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.research
              .filter((r) => r.type !== 'Patent' && r.type !== 'Certification')
              .map((paper) => (
                <div
                  key={paper.id}
                  className="bg-neutral-50/70 border border-neutral-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white">
                        {paper.type}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">{paper.identifier || paper.status}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-black tracking-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {paper.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium mb-3">{paper.venueOrOrg}</p>

                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                      {paper.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-neutral-200">
                    {paper.techOrFocus.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-700 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Industry Certifications */}
          <h3 className="text-lg font-bold text-black pt-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Certifications & Verified Credentials
          </h3>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Microsoft</span>
                  <h5 className="text-sm font-bold text-black mt-1">Generative AI Certification</h5>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
                  &check; Verified Credential
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Hugging Face</span>
                  <h5 className="text-sm font-bold text-black mt-1">AI Agents Mastery</h5>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
                  &check; Verified Credential
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">DeepLearning.AI</span>
                  <h5 className="text-sm font-bold text-black mt-1">RAG Systems Specialization</h5>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
                  &check; Verified Credential
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <span>Inquiries regarding patent licensing or paper reprints:</span>
          <a
            href="mailto:mrunaltalikoti2@gmail.com?subject=Patent%20and%20Research%20Inquiry"
            className="font-medium text-black hover:underline"
          >
            mrunaltalikoti2@gmail.com &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
