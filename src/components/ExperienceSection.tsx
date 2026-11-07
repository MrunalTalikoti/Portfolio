import React from 'react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenExperienceModal: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onOpenExperienceModal,
}) => {
  return (
    <section
      id="experience"
      className="relative z-10 w-full bg-white text-black border-t border-neutral-200 px-6 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400">
            03 / Experience
          </span>
          <div className="h-[1px] w-12 bg-neutral-200" />
          <span className="text-xs text-neutral-500 font-mono">Industry &amp; Production AI</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-black leading-[1.15]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Professional Work Experience
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              4 engineering internships driving high-throughput LLM pipelines, autonomous multi-agent systems, and machine learning infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={onOpenExperienceModal}
              className="px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer border border-neutral-200"
            >
              Detailed Timeline Modal &rarr;
            </button>
          </div>
        </div>

        {/* True Vertical Timeline (No blocks or cards) */}
        <div className="relative border-l border-neutral-200 ml-3 sm:ml-6 pl-8 sm:pl-12 space-y-12 sm:space-y-16">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceItem, idx: number) => (
            <div key={exp.id} className="relative group">
              {/* Continuous Timeline Node */}
              <div
                className="absolute -left-[38px] sm:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-black ring-4 ring-white transition-transform duration-200 group-hover:scale-125"
                aria-hidden="true"
              />

              {/* Responsive 2-Column Timeline Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                {/* Left sub-column: Period, Company, Type, Location */}
                <div className="md:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-black tracking-tight">
                      {exp.period}
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] uppercase font-semibold tracking-wider bg-black text-white px-2 py-0.5 rounded-full font-mono">
                        Current / Latest
                      </span>
                    )}
                  </div>

                  <h4
                    className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight pt-0.5"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {exp.company}
                  </h4>

                  <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span>{exp.type}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Right sub-column: Role, Summary, Highlights, Stack */}
                <div className="md:col-span-8 space-y-3.5">
                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-neutral-700 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {exp.role}
                  </h3>

                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-1">
                    {exp.highlights.map((highlight: string, hIdx: number) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <span className="text-neutral-400 font-mono select-none mt-0.5">&mdash;</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack inline */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 font-mono">
                    <span className="text-neutral-400 font-sans font-medium">Stack:</span>
                    {exp.skills.map((skill: string, sIdx: number) => (
                      <React.Fragment key={skill}>
                        <span className="text-neutral-800">{skill}</span>
                        {sIdx < exp.skills.length - 1 && (
                          <span className="text-neutral-300">&middot;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action Link to Modal */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenExperienceModal}
                      className="text-xs font-semibold text-black hover:opacity-60 transition-opacity flex items-center gap-1 cursor-pointer underline underline-offset-4"
                    >
                      <span>View verified role details</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
