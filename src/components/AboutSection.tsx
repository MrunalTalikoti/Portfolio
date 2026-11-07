import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 w-full bg-white text-black border-t border-neutral-200/80 px-6 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400">
            01 / Identity
          </span>
          <div className="h-[1px] w-12 bg-neutral-200" />
          <span className="text-xs text-neutral-500 font-mono">Meet Mrunal</span>
        </div>

        {/* 2-column layout: Picture on the left, Simple Clean Text on the right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Picture only, vertically centered per the text length */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[380px] lg:max-w-[420px]">
              <div className="rounded-2xl overflow-hidden border border-neutral-200/90 shadow-md bg-neutral-50">
                <img
                  src="/assets/aistudio/Warm_Professional_Studio_Headshot_cbd27dbb.png"
                  alt="Mrunal Talikoti"
                  className="w-full h-auto object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Simple Clean Text without boxes or cards */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-neutral-800 leading-relaxed">
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-black leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Meet Mrunal
            </h2>

            <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-relaxed">
              I’m Mrunal, a 4th-year CSE student majoring in AIML — basically, I talk to machines so they can talk to you (hopefully without hallucinating).
            </p>

            <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-relaxed">
              I specialize in Machine Learning, Generative AI, and building autonomous agents who don’t need coffee breaks (unlike me).
            </p>

            <p className="text-[15px] sm:text-[16px] text-neutral-800 leading-relaxed">
              My tech stack includes Python, LangChain, LLMs, and occasional midnight debugging existential crises.
            </p>

            <div className="pt-1 space-y-2">
              <p className="text-[15px] sm:text-[16px] text-neutral-900 font-medium">
                When I’m not explaining to an AI why it can’t be my therapist, I’m either:
              </p>
              <ul className="space-y-1.5 pl-5 text-[15px] sm:text-[16px] text-neutral-700 list-disc">
                <li>Training models that will one day take my job</li>
                <li>Building agents that argue with each other more than my groupmates</li>
                <li>Or trying to make ChatGPT call me &ldquo;The AI Whisperer&rdquo; (still working on that)</li>
              </ul>
            </div>

            <p className="text-[15px] sm:text-[16px] font-medium text-black pt-1">
              Goal: Build cool things. Break fewer things. Maybe rule the world with AI one day (but ethically).
            </p>

            <p className="text-[15px] sm:text-[16px] font-semibold text-black pt-1">
              Let’s connect before my agents automate that too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

