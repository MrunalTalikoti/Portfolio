import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  contactVideoRef: React.RefObject<HTMLVideoElement | null>;
  onSeeked?: () => void;
  onLoadedMetadata?: () => void;
  onCopyEmail: (e: React.MouseEvent) => void;
  copied: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactVideoRef,
  onSeeked,
  onLoadedMetadata,
  onCopyEmail,
  copied,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('Project Collaboration / Opportunity');
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleCopyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
      } else {
        const ta = document.createElement('textarea');
        ta.value = PORTFOLIO_DATA.personal.phone;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      // fallback
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyContent = `Hi Mrunal,\n\n${message}\n\nFrom: ${name || 'A Collaborator'} (${senderEmail || 'Not provided'})`;
    const mailto = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailto;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full min-h-screen bg-[#fcfcfc] text-black border-t border-neutral-200 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Animated Body Video (mouse-scrubbed, identical to home page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#fcfcfc]">
        <video
          ref={contactVideoRef}
          src="/assets/aistudio/kling_20261107_VIDEO_Animate__5401_0_e2502cd0.mp4"
          muted
          playsInline
          preload="auto"
          onSeeked={onSeeked}
          onLoadedMetadata={onLoadedMetadata}
          className="w-full h-full object-cover sm:translate-x-[12%] md:translate-x-[28%] lg:translate-x-[30%] opacity-40 md:opacity-100 transition-transform duration-300"
          style={{ objectPosition: '70% center' }}
        />
        {/* Soft gradient mask for mobile so text is always high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/90 md:via-[#fcfcfc]/70 md:to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-20 sm:pt-28 pb-12">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400">
            04 / Contact
          </span>
          <div className="h-[1px] w-12 bg-neutral-200" />
          <span className="text-xs text-neutral-500 font-mono">Get in Touch</span>
        </div>

        {/* 2-Column Split: Form and Info on the Left, Animated Body on the Right */}
        <div className="max-w-xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-black leading-[1.15]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Let&apos;s Build Something Remarkable.
          </h2>
          <p className="mt-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
            Whether you are looking to architect autonomous agent systems, collaborate on SLM research, or explore engineering roles, my inbox is open.
          </p>

          {/* Quick Contact Action Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
            >
              <span>{copied ? 'Copied Email!' : 'Copy Email Address'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>

            <button
              onClick={handleCopyPhone}
              className="inline-flex items-center gap-2 bg-white text-black border border-neutral-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:border-black transition-colors cursor-pointer"
            >
              <span>{copiedPhone ? 'Copied Phone!' : PORTFOLIO_DATA.personal.phone}</span>
            </button>

            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-100 text-black border border-neutral-200 px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span>Resume (PDF)</span>
              <span>&darr;</span>
            </a>
          </div>

          {/* Interactive Message Dispatch Form */}
          <form
            onSubmit={handleSendMessage}
            className="mt-8 bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-sm space-y-4"
          >
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-neutral-600 mb-1">
                Inquiry Topic
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-black focus:outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
              >
                <option value="Project Collaboration / Opportunity">Project Collaboration / Engineering Opportunity</option>
                <option value="Full-Time / SWE Internship Role">Full-Time / SWE Internship Role</option>
                <option value="Meta-Agent Patent / Architecture Licensing">Meta-Agent Patent / Architecture Inquiry</option>
                <option value="General Conversation / Connect">General AI &amp; Agent Conversation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="ada@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-black focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-600 mb-1">
                Message / Details
              </label>
              <textarea
                id="contact-message"
                rows={3}
                required
                placeholder="Tell me about your team, ideas, or what we should build next..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-black focus:outline-none focus:border-black focus:bg-white transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Send Message</span>
                <span>&rarr;</span>
              </button>

              <span className="text-xs text-neutral-500 font-mono">
                Direct: {PORTFOLIO_DATA.personal.email}
              </span>
            </div>

            {sentNotice && (
              <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-black flex items-center gap-2 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Email client opened! If it didn&apos;t trigger, feel free to use the copy button above.</span>
              </div>
            )}
          </form>

          {/* Social Profiles & Coordinates */}
          <div className="mt-8 pt-5 border-t border-neutral-200/80 flex flex-wrap items-center gap-6 text-xs text-neutral-600 font-medium">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <span>&nearr;</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <span>&nearr;</span>
            </a>
            <span className="text-neutral-300">&middot;</span>
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
      </div>

      {/* QUIET SITE FOOTER (integrated seamlessly at the bottom of the last page) */}
      <footer className="relative z-10 w-full bg-white/80 backdrop-blur-md border-t border-neutral-200 px-6 sm:px-10 md:px-14 lg:px-20 py-8 text-neutral-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-black" style={{ fontFamily: 'var(--font-heading)' }}>
              {PORTFOLIO_DATA.personal.name}&reg;
            </span>
            <span>&middot;</span>
            <span>{PORTFOLIO_DATA.personal.location}</span>
            <span>&middot;</span>
            <span className="text-neutral-500">B.Tech Computer Engineering (AIML) &middot; CGPA 9.22/10</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Resume PDF &darr;
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1 font-medium text-black"
            >
              <span>Back to top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
