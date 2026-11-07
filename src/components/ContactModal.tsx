import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Project Inquiry / Opportunity',
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2400);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2400);
      }
    } catch {
      // fallback
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                Get in Touch
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[11px] text-neutral-500">Pune, India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
              Connect with Mrunal Talikoti
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

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Resume PDF Download Banner */}
          <div className="bg-neutral-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-neutral-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Official Document</span>
              <h4 className="text-base font-bold text-white mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Mrunal_Talikoti_Resume.pdf
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Full engineering history, patent specifications, publication details & coursework.
              </p>
            </div>
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Mrunal_Talikoti_Resume.pdf"
              className="px-4 py-2.5 bg-white text-black text-xs font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Download PDF</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Card */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email Address</span>
                <p className="text-xs sm:text-sm font-semibold text-black mt-1 select-all break-all">
                  {PORTFOLIO_DATA.personal.email}
                </p>
              </div>
              <div className="pt-3 mt-2 border-t border-neutral-200 flex items-center justify-between">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-xs font-medium text-black hover:underline"
                >
                  Open Mail App &rarr;
                </a>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                  className="text-xs text-neutral-600 hover:text-black font-medium cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Direct Phone</span>
                <p className="text-xs sm:text-sm font-semibold text-black mt-1 select-all">
                  {PORTFOLIO_DATA.personal.phone}
                </p>
              </div>
              <div className="pt-3 mt-2 border-t border-neutral-200 flex items-center justify-between">
                <a
                  href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                  className="text-xs font-medium text-black hover:underline"
                >
                  Call Directly &rarr;
                </a>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.phone, 'phone')}
                  className="text-xs text-neutral-600 hover:text-black font-medium cursor-pointer"
                >
                  {copiedPhone ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Social / Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-black transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">LinkedIn Profile</span>
                <p className="text-xs sm:text-sm font-bold text-black mt-0.5">mrunal-talikoti-931766295</p>
              </div>
              <span className="text-neutral-400 group-hover:text-black transition-colors">&rarr;</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-black transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">GitHub Profile</span>
                <p className="text-xs sm:text-sm font-bold text-black mt-0.5">github.com/MrunalTalikoti</p>
              </div>
              <span className="text-neutral-400 group-hover:text-black transition-colors">&rarr;</span>
            </a>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleSendMessage} className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
            <h4 className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-heading)' }}>
              Send Direct Message
            </h4>

            <div>
              <label className="text-[11px] font-medium text-neutral-600 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-black"
                placeholder="e.g. AI Engineer Role / Project Collaboration"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-600 block mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-black resize-none"
                placeholder="Hello Mrunal, I saw your work on Meta-Agent and multi-agent systems..."
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-neutral-500">Dispatches via your default email client</span>
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Send via Email &rarr;
              </button>
            </div>

            {sentNotice && (
              <p className="text-xs text-emerald-600 font-medium pt-1">
                &check; Opening email composer...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
