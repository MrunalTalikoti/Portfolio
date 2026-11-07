import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenProjectModal: (projectId: string) => void;
}

type ProjectFilter = 'all' | 'patents-research' | 'agentic' | 'industry';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProjectModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'patents-research') {
      return project.id === 'meta-agent' || project.id === 'factless';
    }
    if (activeFilter === 'agentic') {
      return project.id === 'meta-agent' || project.id === 'factless' || project.id === 'clover';
    }
    if (activeFilter === 'industry') {
      return project.id === 'analog-workflow' || project.id === 'privacy-ai';
    }
    return true;
  });

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#fbfbfb] text-black border-t border-neutral-200 px-6 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400">
            02 / Projects
          </span>
          <div className="h-[1px] w-12 bg-neutral-200" />
          <span className="text-xs text-neutral-500 font-mono">Inventions &amp; Engineering</span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-black leading-[1.15]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Featured Projects
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Patent-pending autonomous systems, SLM fine-tuning studios, and production machine learning pipelines built to scale.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/70 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-xs px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-white text-black shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              All Works ({PORTFOLIO_DATA.projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('patents-research')}
              className={`text-xs px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'patents-research'
                  ? 'bg-white text-black shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Patent &amp; Research
            </button>
            <button
              onClick={() => setActiveFilter('agentic')}
              className={`text-xs px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'agentic'
                  ? 'bg-white text-black shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Agentic &amp; LLMs
            </button>
            <button
              onClick={() => setActiveFilter('industry')}
              className={`text-xs px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'industry'
                  ? 'bg-white text-black shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Industry Pipelines
            </button>
          </div>
        </div>

        {/* Featured Novelty Hero Card: Meta-Agent (Patent Invention) */}
        {filteredProjects.some((p) => p.id === 'meta-agent') && (
          <div
            onClick={() => onOpenProjectModal('meta-agent')}
            className="mb-8 rounded-2xl bg-white border border-neutral-200/90 hover:border-black/40 p-6 sm:p-9 transition-all duration-200 shadow-xs cursor-pointer group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <span className="font-semibold text-black uppercase tracking-wider text-[11px]">
                    Indian Patent No. 202621005880
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span>System Architect &amp; Inventor</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-emerald-700 font-medium">Patent Pending</span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-black group-hover:text-neutral-700 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Meta-Agent: Autonomous Agent Synthesis &amp; Orchestration
                </h3>

                <p className="mt-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
                  A comprehensive system and method for the automatic generation of specialized AI agents. Features hierarchical orchestration of multiple sub-agents to synthesize, validate, and deploy autonomous agents directly from natural language specifications.
                </p>

                <div className="mt-5 space-y-2 text-xs sm:text-sm text-neutral-600">
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-400 select-none">&mdash;</span>
                    <span>Hierarchical DAG execution manager with automated dynamic context load balancing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-400 select-none">&mdash;</span>
                    <span>Distributed worker architecture powered by Celery, Redis caching, and JWT + OAuth security.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-neutral-400 select-none">&mdash;</span>
                    <span>Integrated secure object storage and automated self-optimizing code generation packages.</span>
                  </div>
                </div>
              </div>

              {/* Right column: Key novelty summary & CTA */}
              <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-100 pt-5 lg:pt-0 lg:pl-7">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                    Core Technologies
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-700 font-mono">
                    <span>Anthropic Models</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>Celery</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>Docker</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>DAG Execution</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>Redis</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span>AWS S3</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-black group-hover:underline underline-offset-4 flex items-center gap-1.5">
                    <span>Inspect Patent Architecture</span>
                    <span>&rarr;</span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">01</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Grid for remaining projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects
            .filter((p) => p.id !== 'meta-agent')
            .map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project.id)}
                className="rounded-2xl bg-white border border-neutral-200/90 hover:border-black/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-xs cursor-pointer group"
              >
                <div>
                  {/* Metadata line */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2.5">
                    <span className="font-semibold text-black uppercase tracking-wider text-[11px]">
                      {project.badge || 'Project'}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="truncate">{project.subtitle}</span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-neutral-700 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-neutral-700 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Achievements bullet list */}
                  <div className="mt-4 space-y-1.5 text-xs text-neutral-600">
                    {project.achievements.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-neutral-400 select-none">&mdash;</span>
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer: Tech Stack & CTA */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-500 font-mono mb-4">
                    {project.techStack.slice(0, 5).map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {i < Math.min(project.techStack.length, 5) - 1 && (
                          <span className="text-neutral-300">&middot;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-black group-hover:underline underline-offset-4 flex items-center gap-1">
                      <span>View Specifications</span>
                      <span>&rarr;</span>
                    </span>
                    <span className="text-neutral-400 font-mono">0{idx + 2}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
