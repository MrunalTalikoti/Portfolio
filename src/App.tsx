/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { ProjectsModal } from './components/ProjectsModal';
import { ExperienceModal } from './components/ExperienceModal';
import { ResearchModal } from './components/ResearchModal';
import { SkillsModal } from './components/SkillsModal';
import { ContactModal } from './components/ContactModal';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active Portfolio Modals
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showExperience, setShowExperience] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Track window scroll for navbar backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter hook for Mrunal's portfolio intro
  const typewriterText =
    'Building autonomous multi-agent systems, SLM fine-tuning studios, and 100k+ doc/day AI extraction pipelines. What are we building next?';
  const { displayed, done: typingDone } = useTypewriter({
    text: typewriterText,
    speed: 34,
    startDelay: 500,
  });

  // Action pills appear 400ms after page load, independently of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Video scrubbing refs and handlers
  const videoRef = useRef<HTMLVideoElement>(null);
  const contactVideoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const hasPendingSeekRef = useRef<boolean>(false);

  // Apply seek to video (synchronizing both hero video and contact section video)
  const executeSeek = useCallback(() => {
    const video = videoRef.current;
    const contactVideo = contactVideoRef.current;
    const duration = video?.duration || contactVideo?.duration;
    if (!duration || Number.isNaN(duration)) {
      isSeekingRef.current = false;
      return;
    }
    isSeekingRef.current = true;
    try {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        video.currentTime = targetTimeRef.current;
      }
      if (contactVideo && contactVideo.duration && !Number.isNaN(contactVideo.duration)) {
        contactVideo.currentTime = targetTimeRef.current;
      }
    } catch {
      isSeekingRef.current = false;
    }
  }, []);

  // Window mousemove handler for horizontal video scrubbing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        targetTimeRef.current = video.currentTime || 0;
        return;
      }

      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;

      const newTarget = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        executeSeek();
      } else {
        hasPendingSeekRef.current = true;
      }
    };

    // Touch device support for mobile scrubbing
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
        if (videoRef.current) {
          targetTimeRef.current = videoRef.current.currentTime || 0;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video || e.touches.length === 0) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;

      targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));

      if (!isSeekingRef.current) {
        executeSeek();
      } else {
        hasPendingSeekRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [executeSeek]);

  // onSeeked handler to queue next seek if targetTime moved while seeking
  const handleSeeked = useCallback(() => {
    if (hasPendingSeekRef.current) {
      hasPendingSeekRef.current = false;
      executeSeek();
    } else {
      isSeekingRef.current = false;
    }
  }, [executeSeek]);

  // Copy email to clipboard handler
  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const email = PORTFOLIO_DATA.personal.email;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fcfcfc] text-black overflow-x-hidden selection:bg-black selection:text-white">
      {/* Background Video (mouse-scrub controlled, positioned to the right side ~70-78%) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fcfcfc]">
        <video
          ref={videoRef}
          src="/assets/aistudio/kling_20261107_VIDEO_Animate__5401_0_e2502cd0.mp4"
          muted
          playsInline
          preload="auto"
          onSeeked={handleSeeked}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              targetTimeRef.current = videoRef.current.currentTime || 0;
            }
          }}
          className="w-full h-full object-cover sm:translate-x-[12%] md:translate-x-[28%] lg:translate-x-[30%] transition-transform duration-300"
          style={{ objectPosition: '70% center' }}
        />
      </div>

      {/* NAVBAR (fixed, z-index: 30) */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 w-full px-6 sm:px-10 md:px-14 py-4 sm:py-5 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/70 shadow-xs' : 'bg-transparent'
        }`}
      >
        {/* Logo (left) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className="text-[19px] sm:text-[22px] tracking-tight text-black cursor-pointer font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowProjects(false);
              setShowExperience(false);
              setShowResearch(false);
              setShowSkills(false);
              setShowContact(false);
            }}
          >
            {PORTFOLIO_DATA.personal.name}&reg;
          </span>
          <span
            className="text-[21px] sm:text-[24px] text-black select-none leading-none pointer-events-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            &#x2733;&#xFE0E;
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          className="hidden md:flex items-center text-[16px] lg:text-[18px] font-normal text-black tracking-tight"
          aria-label="Portfolio Navigation"
        >
          <a
            href="#about"
            className="hover:opacity-60 transition-opacity cursor-pointer text-black"
          >
            About
          </a>
          <span className="select-none text-neutral-400">,&nbsp;</span>
          <a
            href="#projects"
            className="hover:opacity-60 transition-opacity cursor-pointer text-black"
          >
            Projects
          </a>
          <span className="select-none text-neutral-400">,&nbsp;</span>
          <a
            href="#experience"
            className="hover:opacity-60 transition-opacity cursor-pointer text-black"
          >
            Experience
          </a>
          <span className="select-none text-neutral-400">,&nbsp;</span>
          <button
            onClick={() => setShowResearch(true)}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-black text-[16px] lg:text-[18px]"
          >
            Research &amp; Patent
          </button>
          <span className="select-none text-neutral-400">,&nbsp;</span>
          <button
            onClick={() => setShowSkills(true)}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-black text-[16px] lg:text-[18px]"
          >
            Skills &amp; Education
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-4 text-[16px] lg:text-[18px] tracking-tight">
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline underline-offset-3 hover:opacity-60 transition-opacity cursor-pointer flex items-center gap-1.5"
            title="View Mrunal Talikoti's Resume"
          >
            <span>Resume (PDF)</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="text-black underline underline-offset-3 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer focus:outline-none z-40"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-5 h-[2px] bg-black duration-300 transition-all ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : 'rotate-0 translate-y-0'
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-black duration-300 transition-all ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-black duration-300 transition-all ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : 'rotate-0 translate-y-0'
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 35) */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-[35] flex flex-col justify-center px-8 gap-6 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#about"
          className="text-left text-[26px] sm:text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          Meet Mrunal
        </a>
        <a
          href="#projects"
          className="text-left text-[26px] sm:text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          Projects
        </a>
        <a
          href="#experience"
          className="text-left text-[26px] sm:text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          Experience
        </a>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setShowResearch(true);
          }}
          className="text-left text-[26px] sm:text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Research &amp; Patent
        </button>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setShowSkills(true);
          }}
          className="text-left text-[26px] sm:text-[28px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Skills &amp; Education
        </button>
        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[26px] sm:text-[28px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>Resume (PDF)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="text-left text-[26px] sm:text-[28px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>

      {/* HERO SECTION (Viewport 1) */}
      <main className="relative z-[1] w-full min-h-screen flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden">
        {/* Content container: spacious and balanced */}
        <div className="max-w-[550px] relative z-10 pt-20 md:pt-0">
          {/* 1. Blurred intro label with optimal sizing */}
          <div
            className="pointer-events-none select-none mb-3 sm:mb-4 tracking-tight"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 20px)',
              lineHeight: 1.35,
              fontWeight: 400,
              color: '#000',
              filter: 'blur(2.8px)',
            }}
          >
            Hey there, I&apos;m Mrunal Talikoti,
            <br />
            AI &amp; Cloud Engineer · Indian Patent Holder · 4x Intern
          </div>

          {/* 2. Typewriter text with prominent, legible size */}
          <p
            className="text-black mb-5 sm:mb-6 min-h-[52px] select-text tracking-tight font-normal"
            style={{
              fontSize: 'clamp(18px, 2.2vw, 22.5px)',
              lineHeight: 1.42,
            }}
          >
            {displayed}
            {!typingDone && (
              <span
                className="inline-block w-[2px] h-[1.12em] bg-black align-middle ml-[3px] animate-cursor-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons with comfortable touch targets */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* White pill 0: Meet Mrunal (Scroll down) */}
            <a
              href="#about"
              className="inline-flex items-center justify-center bg-black text-white border border-black rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-neutral-800 transition-all duration-200 shadow-2xs gap-1.5"
            >
              <span>Meet Mrunal</span>
              <span>&darr;</span>
            </a>

            {/* White pill 1: Featured Projects */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-all duration-200 shadow-2xs"
            >
              Featured Projects
            </a>

            {/* White pill 2: Work Experience */}
            <a
              href="#experience"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-all duration-200 shadow-2xs"
            >
              Work Experience
            </a>

            {/* White pill 3: Research & Patent */}
            <button
              onClick={() => setShowResearch(true)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-all duration-200 shadow-2xs"
            >
              Research &amp; Patent
            </button>

            {/* White pill 4: Skills & Education */}
            <button
              onClick={() => setShowSkills(true)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-all duration-200 shadow-2xs"
            >
              Skills &amp; Education
            </button>

            {/* Outline pill button: Reach me: mrunaltalikoti2@gmail.com with copy icon */}
            <button
              onClick={handleCopyEmail}
              title="Click to copy email address"
              className="text-neutral-900 bg-transparent border border-neutral-800/80 rounded-full text-[13px] sm:text-[14.5px] px-4 sm:px-4.5 py-[0.4em] font-medium whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span>
                Reach me:{' '}
                <span className="underline underline-offset-2">
                  {PORTFOLIO_DATA.personal.email}
                </span>
              </span>
              {copied ? (
                /* Checked indicator */
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-emerald-500"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2.5 6.5 5 9 9.5 3.5" />
                </svg>
              ) : (
                /* Small 11x11 copy icon (two overlapping rectangles) */
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="7" height="7" rx="1" />
                  <path d="M8 4V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </main>

      {/* SECTION 2: TRANSITION TO ABOUT ME PAGE */}
      <AboutSection />

      {/* SECTION 3: TRANSITION TO PROJECTS PAGE */}
      <ProjectsSection
        onOpenProjectModal={(projectId) => {
          setSelectedProjectId(projectId);
          setShowProjects(true);
        }}
      />

      {/* SECTION 4: TRANSITION TO EXPERIENCE PAGE */}
      <ExperienceSection
        onOpenExperienceModal={() => setShowExperience(true)}
      />

      {/* SECTION 5: GET IN TOUCH PAGE WITH ANIMATED BODY VIDEO */}
      <ContactSection
        contactVideoRef={contactVideoRef}
        onSeeked={handleSeeked}
        onLoadedMetadata={() => {
          if (contactVideoRef.current && videoRef.current) {
            contactVideoRef.current.currentTime = videoRef.current.currentTime || 0;
          }
        }}
        onCopyEmail={handleCopyEmail}
        copied={copied}
      />

      {/* Copied Feedback Toast */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2 animate-fade-in pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Copied {PORTFOLIO_DATA.personal.email} to clipboard</span>
        </div>
      )}

      {/* Portfolio Modals */}
      <ProjectsModal
        isOpen={showProjects}
        onClose={() => {
          setShowProjects(false);
          setSelectedProjectId(null);
        }}
        selectedProjectId={selectedProjectId}
      />

      <ExperienceModal
        isOpen={showExperience}
        onClose={() => setShowExperience(false)}
      />

      <ResearchModal
        isOpen={showResearch}
        onClose={() => setShowResearch(false)}
      />

      <SkillsModal
        isOpen={showSkills}
        onClose={() => setShowSkills(false)}
      />

      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
}
