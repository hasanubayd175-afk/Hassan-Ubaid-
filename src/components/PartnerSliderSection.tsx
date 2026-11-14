import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ClientLogoItem {
  id: string;
  name: string;
  sector: string;
  logoSrc: string;
  imgClass: string;
  circleBgClass: string;
}

const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'client-lidl',
    name: 'Lidl',
    sector: 'UK & Germany Retail',
    logoSrc: '/logos/lidl.png',
    imgClass: 'w-full h-full object-cover scale-[1.09]',
    circleBgClass: 'bg-[#FFF000]',
  },
  {
    id: 'client-tesco',
    name: 'Tesco',
    sector: 'Superstores & Logistics',
    logoSrc: '/logos/tesco.png',
    imgClass: 'w-[88%] h-auto object-contain',
    circleBgClass: 'bg-white',
  },
  {
    id: 'client-morrisons',
    name: 'Morrisons',
    sector: 'Supermarkets & Supply',
    logoSrc: '/logos/morrisons.png',
    imgClass: 'w-full h-full object-cover scale-[1.06]',
    circleBgClass: 'bg-[#0B4619]',
  },
];

// Repeat base triad 3x per half so the -50% marquee loops seamlessly on wide viewports
const MARQUEE_HALF = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
const MARQUEE_ITEMS = [...MARQUEE_HALF, ...MARQUEE_HALF];

export const PartnerSliderSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollByStep = (direction: -1 | 1) => {
    setIsPaused(true);
    if (trackContainerRef.current) {
      trackContainerRef.current.scrollBy({
        left: direction * 240,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      aria-label="Our Clients and Strategic Partners"
      className="min-h-[420px] md:min-h-[460px] flex flex-col justify-center py-14 md:py-16 bg-[#EBF1F8] dark:bg-[#0B1724] text-[#132C40] dark:text-slate-100 overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3.5 mb-2.5">
            <span
              className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D72B8] dark:text-[#2E96D8]">
              {t.partners.eyebrow}
            </p>
            <span
              className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#132C40] dark:text-white [text-wrap:balance]">
            {t.partners.headingPrefix}{' '}
            <span className="font-quote italic font-bold text-[#C98A35] dark:text-[#D49A4A] text-[1.12em] inline-block px-0.5">
              &amp;
            </span>{' '}
            {t.partners.headingSuffix}
          </h2>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label="Slide clients left"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-white dark:bg-[#102336] border border-slate-300 dark:border-slate-700 text-[#132C40] dark:text-slate-100 hover:bg-[#132C40] dark:hover:bg-[#1D72B8] hover:text-white hover:border-[#132C40] transition-colors cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? 'Resume client slider' : 'Pause client slider'}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-white dark:bg-[#102336] border border-slate-300 dark:border-slate-700 text-[#132C40] dark:text-slate-100 hover:bg-[#132C40] dark:hover:bg-[#1D72B8] hover:text-white hover:border-[#132C40] transition-colors cursor-pointer shadow-sm"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label="Slide clients right"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-white dark:bg-[#102336] border border-slate-300 dark:border-slate-700 text-[#132C40] dark:text-slate-100 hover:bg-[#132C40] dark:hover:bg-[#1D72B8] hover:text-white hover:border-[#132C40] transition-colors cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Bleed Fitted Round Client Logo Medallions */}
      <div
        ref={trackContainerRef}
        dir="ltr"
        className="relative z-10 w-full overflow-x-auto no-scrollbar"
      >
        <div
          className="animate-partner-marquee gap-8 sm:gap-10 px-6 items-start py-4"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {MARQUEE_ITEMS.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="group shrink-0 flex flex-col items-center text-center gap-3.5"
            >
              <div
                className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden flex items-center justify-center ${client.circleBgClass} ring-2 ring-[#D49A4A]/45 ring-offset-4 ring-offset-[#EBF1F8] dark:ring-offset-[#0B1724] shadow-lg group-hover:ring-[#D49A4A] group-hover:scale-[1.04] transition-all duration-300`}
              >
                <img
                  src={client.logoSrc}
                  alt={`${client.name} client logo`}
                  loading="lazy"
                  className={client.imgClass}
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-sm sm:text-base font-bold text-[#132C40] dark:text-white tracking-tight">
                  {client.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {client.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
