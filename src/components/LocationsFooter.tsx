import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { IMAGES, OFFICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId } from '../types/kelvis';
import { GlobalOfficesMap } from './GlobalOfficesMap';
import { ResilientImage } from './ResilientImage';

interface LocationsFooterProps {
  selectedRegionId: RegionId;
  onSelectRegion: (regionId: RegionId) => void;
  onBookInRegion: (regionId: RegionId) => void;
  onOpenServices: () => void;
  onOpenMedia: () => void;
  onOpenTeam: () => void;
}

const HUB_PHOTOS: Record<RegionId, string> = {
  london: IMAGES.londonHub,
  germany: IMAGES.germanyHub,
  dubai: IMAGES.dubaiHub,
};

export const LocationsFooter: React.FC<LocationsFooterProps> = ({
  selectedRegionId,
  onSelectRegion,
  onBookInRegion,
  onOpenServices,
  onOpenMedia,
  onOpenTeam,
}) => {
  const { t, language } = useLanguage();
  const [focusTrigger, setFocusTrigger] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'submitting' | 'subscribed' | 'already' | 'error'
  >('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterStatus('error');
      setNewsletterError(t.footer.newsletterInvalid);
      return;
    }

    setNewsletterStatus('submitting');
    setNewsletterError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          language,
          regionId: selectedRegionId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNewsletterStatus('error');
        setNewsletterError(data?.error || t.footer.newsletterInvalid);
        return;
      }
      setNewsletterEmail('');
      setNewsletterStatus(data?.alreadySubscribed ? 'already' : 'subscribed');
    } catch {
      setNewsletterStatus('error');
      setNewsletterError(t.footer.newsletterInvalid);
    }
  };

  const getRegionName = (id: RegionId) =>
    id === 'germany'
      ? t.regions.germany
      : id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  const getRegionFull = (id: RegionId) =>
    id === 'germany'
      ? t.regions.germanyFull
      : id === 'dubai'
        ? t.regions.dubaiFull
        : t.regions.londonFull;

  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeOffice.lat},${activeOffice.lng}`;
  const activeHubPhoto = HUB_PHOTOS[activeOffice.id] || IMAGES.londonHub;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="locations"
      className="bg-[#0E2233] dark:bg-[#050C14] text-white pt-14 pb-28 md:pt-16 md:pb-24 border-t border-white/10 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Executive Section Header & Regional Selector */}
        <div className="mx-auto max-w-3xl text-center pb-8 border-b border-white/10">
          <div className="flex items-center justify-center gap-3.5 mb-2.5">
            <span
              className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2E96D8]">
              {t.footer.eyebrow}
            </p>
            <span
              className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            {t.footer.headingPrefix}{' '}
            <span className="font-quote italic font-bold text-[#D49A4A] text-[1.12em] inline-block px-0.5">
              &amp;
            </span>{' '}
            {t.footer.headingSuffix}
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div
              role="tablist"
              aria-label="Regional Headquarters Locations"
              className="inline-flex items-center gap-1 p-1 bg-[#132C40] border border-white/10 rounded-xl"
            >
              {OFFICES.map((office) => {
                const active = office.id === selectedRegionId;
                return (
                  <button
                    key={office.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      onSelectRegion(office.id);
                      setFocusTrigger((n) => n + 1);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1D72B8] text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {getRegionFull(office.id)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onBookInRegion(activeOffice.id)}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#D49A4A] hover:bg-[#c18739] text-[#0E2233] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0"
            >
              <span>
                {t.footer.bookPrefix} {getRegionName(activeOffice.id)}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Balanced 12-Column Primary Split: Interactive Map + Selected HQ Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <GlobalOfficesMap
              selectedRegionId={selectedRegionId}
              focusTrigger={focusTrigger}
              onSelectRegion={onSelectRegion}
              onBookInRegion={onBookInRegion}
            />
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#132C40] border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between">
            {/* Skyline Header */}
            <div className="relative aspect-[16/9] bg-[#0B1926] overflow-hidden shrink-0">
              <ResilientImage
                src={activeHubPhoto}
                alt={`${activeOffice.city} Regional Headquarters skyline`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132C40] via-[#132C40]/30 to-transparent" />
              <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium text-[#D49A4A]">
                    {activeOffice.country} · {t.footer.regionalHubTag}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {activeOffice.id === 'germany'
                      ? `${t.regions.germany} · ${activeOffice.city}`
                      : getRegionName(activeOffice.id)}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-xs border border-emerald-400/35 text-[10px] font-semibold text-emerald-200 whitespace-nowrap">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span>{t.footer.liveActive}</span>
                  </span>
                  <span dir="ltr" className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                    {activeOffice.hubCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Headquarters Details */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2E96D8] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <p className="font-medium text-white">
                      {activeOffice.addressLine1}
                    </p>
                    <p className="text-slate-300">{activeOffice.addressLine2}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {t.footer.coveragePrefix} {activeOffice.coverage}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <a
                    href={`tel:${activeOffice.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 font-mono font-semibold text-white hover:text-[#D49A4A] tabular-nums transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2E96D8] shrink-0" />
                    <span dir="ltr" className="truncate">{activeOffice.phone}</span>
                  </a>
                  <a
                    href={`mailto:${activeOffice.email}`}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#2E96D8] shrink-0" />
                    <span dir="ltr" className="truncate">{activeOffice.email}</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <a
                  href={externalMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl border border-white/15 bg-[#0E2233] hover:bg-[#1D72B8] text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>{t.footer.openInMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={() => onBookInRegion(activeOffice.id)}
                  className="py-2.5 px-4 rounded-xl bg-[#D49A4A] hover:bg-[#c18739] text-[#0E2233] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.footer.scheduleDispatch}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Discreet Editorial Newsletter Subscription Strip */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-1.5">
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D49A4A]">
              {t.footer.newsletterEyebrow}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white [text-wrap:balance]">
              {t.footer.newsletterTitlePrefix}{' '}
              <span className="font-quote italic font-normal text-[#D49A4A] text-[1.12em] px-0.5">
                {t.footer.newsletterTitleEmphasis}
              </span>{' '}
              <span className="font-quote italic text-slate-400 font-normal px-0.5">
                &amp;
              </span>{' '}
              {t.footer.newsletterTitleSuffix}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {t.footer.newsletterDescription}
            </p>
          </div>

          <div className="lg:col-span-5">
            {newsletterStatus === 'subscribed' || newsletterStatus === 'already' ? (
              <div
                role="status"
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#132C40]/80 border border-emerald-400/30 text-xs text-emerald-200"
              >
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {newsletterStatus === 'already'
                      ? t.footer.newsletterAlready
                      : t.footer.newsletterSuccess}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setNewsletterStatus('idle')}
                  className="text-[11px] font-semibold text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer shrink-0"
                >
                  ×
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-1.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-white/20 focus-within:border-[#D49A4A] transition-colors">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {t.footer.newsletterEyebrow}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    dir="ltr"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') {
                        setNewsletterStatus('idle');
                        setNewsletterError('');
                      }
                    }}
                    placeholder={t.footer.newsletterPlaceholder}
                    className="flex-1 min-w-0 bg-transparent px-1 py-2 text-xs sm:text-sm font-light tracking-wide text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'submitting'}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#132C40] hover:bg-[#D49A4A] text-slate-100 hover:text-[#0E2233] border border-white/15 hover:border-[#D49A4A] text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {newsletterStatus === 'submitting'
                        ? t.footer.newsletterSubmitting
                        : t.footer.newsletterButton}
                    </span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                </div>
                {newsletterStatus === 'error' && newsletterError && (
                  <p role="alert" className="text-[11px] text-amber-300">
                    {newsletterError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Quiet Navigation, Social & Copyright Footer Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {t.footer.copyrightPrefix}{' '}
            <span className="font-quote italic font-semibold text-[#D49A4A]">
              &amp;
            </span>{' '}
            {t.footer.copyrightSuffix}
          </p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300"
          >
            <button
              type="button"
              onClick={onOpenServices}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.footer.navServices}
            </button>
            <button
              type="button"
              onClick={onOpenMedia}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.footer.navGallery}
            </button>
            <button
              type="button"
              onClick={onOpenTeam}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.footer.navTeam}
            </button>
            <button
              type="button"
              onClick={() => onBookInRegion(activeOffice.id)}
              className="hover:text-[#D49A4A] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.footer.navBook}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[
                {
                  name: 'LinkedIn',
                  href: 'https://linkedin.com',
                  svg: (
                    <path
                      fill="currentColor"
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                    />
                  ),
                },
                {
                  name: 'Instagram',
                  href: 'https://instagram.com',
                  svg: (
                    <path
                      fill="currentColor"
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z"
                    />
                  ),
                },
                {
                  name: 'X',
                  href: 'https://x.com',
                  svg: (
                    <path
                      fill="currentColor"
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  ),
                },
                {
                  name: 'YouTube',
                  href: 'https://youtube.com',
                  svg: (
                    <path
                      fill="currentColor"
                      d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z"
                    />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kelvix Solutions on ${social.name}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#132C40] hover:bg-[#1D72B8] border border-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>

            <span className="text-white/15" aria-hidden="true">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 font-semibold text-[#D49A4A] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
