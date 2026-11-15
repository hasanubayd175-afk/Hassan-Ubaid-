import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Film,
  Globe,
  Grid,
  HelpCircle,
  Home,
  LayoutGrid,
  MapPin,
  Menu,
  Moon,
  Newspaper,
  Pause,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Sun,
  Video,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import {
  CLIENT_SPOTLIGHT_CLIPS,
  ENGINEERING_SERVICE_IDS,
  OFFICES,
  SERVICES,
} from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { RegionId, ServiceCategory } from '../types/kelvis';
import { scrollToTopSmooth } from '../utils/smoothScroll';

const LANG_OPTIONS: { code: LanguageCode; label: string; title: string }[] = [
  { code: 'en', label: 'EN', title: 'English' },
  { code: 'de', label: 'DE', title: 'Deutsch' },
  { code: 'ar', label: 'عربي', title: 'العربية (Dubai)' },
];

export type MainTabId =
  | 'home'
  | 'services'
  | 'media'
  | 'team'
  | 'book';

interface NavbarProps {
  activeTab: MainTabId;
  onSelectTab: (tab: MainTabId) => void;
  selectedRegionId: RegionId;
  onSelectRegion: (regionId: RegionId) => void;
  onSelectService: (serviceId: string) => void;
  onSelectServiceCategory?: (category: ServiceCategory) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  selectedRegionId,
  onSelectRegion,
  onSelectService,
  onSelectServiceCategory,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'services' | 'corporate' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsIndex, setNewsIndex] = useState(0);
  const [newsPaused, setNewsPaused] = useState(false);
  const [hoveredRegionTarget, setHoveredRegionTarget] = useState<string | null>(
    null
  );
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothScrollScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const { language, setLanguage, t } = useLanguage();

  const regionalNews = useMemo(
    () => [
      {
        id: 'news-ldn',
        tag: t.news.ldnTag,
        regionId: 'london' as RegionId,
        headline: t.news.ldnHeadline,
        cta: t.news.ldnCta,
      },
      {
        id: 'news-de',
        tag: t.news.deTag,
        regionId: 'germany' as RegionId,
        headline: t.news.deHeadline,
        cta: t.news.deCta,
      },
      {
        id: 'news-dxb',
        tag: t.news.dxbTag,
        regionId: 'dubai' as RegionId,
        headline: t.news.dxbHeadline,
        cta: t.news.dxbCta,
      },
      {
        id: 'news-sla',
        tag: t.news.slaTag,
        regionId: 'london' as RegionId,
        headline: t.news.slaHeadline,
        cta: t.news.slaCta,
      },
    ],
    [t]
  );

  useEffect(() => {
    if (newsPaused) return;
    const timer = window.setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % regionalNews.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [newsPaused, regionalNews.length]);

  const activeNews = regionalNews[newsIndex] || regionalNews[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setOpenDropdown(null);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setOpenDropdown(null);
      }
    };
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SERVICES.slice(0, 6);
    return SERVICES.filter(
      (svc) =>
        svc.name.toLowerCase().includes(q) ||
        svc.categoryLabel.toLowerCase().includes(q) ||
        svc.tagline.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredOffices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return OFFICES;
    return OFFICES.filter(
      (office) =>
        office.city.toLowerCase().includes(q) ||
        office.country.toLowerCase().includes(q) ||
        office.addressLine1.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleNav = (tab: MainTabId) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    onSelectTab(tab);
    scrollToTopSmooth();
  };

  return (
    <>
      {/* Top Regional Hubs Utility Bar */}
      <div className="hidden lg:block relative z-50 bg-[#0E2233] text-slate-200 border-b border-[#132C40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-semibold text-white shrink-0">
              {t.nav.regionalHubs}
            </span>
            {OFFICES.map((office) => {
              const targetKey = `link-${office.id}`;
              const isTipVisible = hoveredRegionTarget === targetKey;
              const compliance = t.nav.regionCompliance[office.id];
              const regionFull =
                office.id === 'germany'
                  ? t.regions.germanyFull
                  : office.id === 'dubai'
                    ? t.regions.dubaiFull
                    : t.regions.londonFull;
              const tipId = `nav-compliance-${targetKey}`;

              return (
                <div
                  key={office.id}
                  className="relative"
                  onMouseEnter={() => setHoveredRegionTarget(targetKey)}
                  onMouseLeave={() =>
                    setHoveredRegionTarget((prev) =>
                      prev === targetKey ? null : prev
                    )
                  }
                >
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    aria-describedby={tipId}
                    onFocus={() => setHoveredRegionTarget(targetKey)}
                    onBlur={() =>
                      setHoveredRegionTarget((prev) =>
                        prev === targetKey ? null : prev
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap py-1"
                  >
                    <MapPin className="w-3 h-3 text-[#2E96D8] shrink-0" />
                    <span>
                      {office.id === 'germany'
                        ? t.regions.germany
                        : office.id === 'dubai'
                          ? t.regions.dubai
                          : t.regions.london}
                      :
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono font-semibold text-white tabular-nums"
                    >
                      {office.phone}
                    </span>
                  </a>

                  <AnimatePresence>
                    {isTipVisible && (
                      <motion.div
                        id={tipId}
                        role="tooltip"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: -4, scale: 0.97 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -4, scale: 0.97 }
                        }
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="pointer-events-none absolute left-0 top-full mt-2 w-80 rounded-xl bg-[#091826]/95 backdrop-blur-md border border-[#D49A4A]/50 p-4 text-start shadow-2xl z-50"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute bottom-full left-5 -mb-px w-2.5 h-2.5 rotate-45 bg-[#091826] border-l border-t border-[#D49A4A]/50"
                        />
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#D49A4A]">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>{t.nav.complianceLabel}</span>
                          </span>
                          <span className="text-xs font-semibold text-sky-200 bg-white/10 px-2 py-0.5 rounded">
                            {regionFull}
                          </span>
                        </div>
                        <div
                          dir="ltr"
                          className="flex flex-wrap items-center gap-1.5 mb-2.5"
                        >
                          {compliance.certs.map((cert) => (
                            <span
                              key={cert}
                              className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 font-mono text-xs font-semibold text-white"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                          {compliance.summary}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-400">
              {t.nav.dispatch247}
            </span>
            <div
              role="group"
              aria-label="Select regional hub"
              className="inline-flex items-center p-0.5 rounded-full bg-white/10 border border-white/15"
            >
              {OFFICES.map((office) => {
                const active = selectedRegionId === office.id;
                const targetKey = `pill-${office.id}`;
                const isTipVisible = hoveredRegionTarget === targetKey;
                const compliance = t.nav.regionCompliance[office.id];
                const regionFull =
                  office.id === 'germany'
                    ? t.regions.germanyFull
                    : office.id === 'dubai'
                      ? t.regions.dubaiFull
                      : t.regions.londonFull;
                const tipId = `nav-compliance-${targetKey}`;

                return (
                  <div
                    key={office.id}
                    className="relative"
                    onMouseEnter={() => setHoveredRegionTarget(targetKey)}
                    onMouseLeave={() =>
                      setHoveredRegionTarget((prev) =>
                        prev === targetKey ? null : prev
                      )
                    }
                  >
                    <button
                      type="button"
                      aria-describedby={tipId}
                      onFocus={() => setHoveredRegionTarget(targetKey)}
                      onBlur={() =>
                        setHoveredRegionTarget((prev) =>
                          prev === targetKey ? null : prev
                        )
                      }
                      onClick={() => onSelectRegion(office.id)}
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#2E96D8] text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {office.hubCode}
                    </button>

                    <AnimatePresence>
                      {isTipVisible && (
                        <motion.div
                          id={tipId}
                          role="tooltip"
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, y: -4, scale: 0.97 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: -4, scale: 0.97 }
                          }
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="pointer-events-none absolute right-0 top-full mt-2.5 w-80 rounded-xl bg-[#091826]/95 backdrop-blur-md border border-[#D49A4A]/50 p-4 text-start shadow-2xl z-50"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute bottom-full right-4 -mb-px w-2.5 h-2.5 rotate-45 bg-[#091826] border-l border-t border-[#D49A4A]/50"
                          />
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#D49A4A]">
                              <ShieldCheck className="w-4 h-4 shrink-0" />
                              <span>{t.nav.complianceLabel}</span>
                            </span>
                            <span className="text-xs font-semibold text-sky-200 bg-white/10 px-2 py-0.5 rounded">
                              {regionFull}
                            </span>
                          </div>
                          <div
                            dir="ltr"
                            className="flex flex-wrap items-center gap-1.5 mb-2.5"
                          >
                            {compliance.certs.map((cert) => (
                              <span
                                key={cert}
                                className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 font-mono text-xs font-semibold text-white"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                            {compliance.summary}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#D49A4A]" />
              <span>{t.nav.clientDispatch}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1926]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 text-[#132C40] dark:text-slate-100 transition-colors duration-200"
      >
        {/* Slim Top GPU-Spring Scroll Progress Indicator */}
        <div
          aria-hidden="true"
          className="w-full h-[3px] bg-slate-100 dark:bg-slate-800 overflow-hidden"
        >
          <motion.div
            style={{
              scaleX: prefersReducedMotion ? scrollYProgress : smoothScrollScaleX,
            }}
            className="h-full w-full origin-left bg-gradient-to-r from-[#1D72B8] via-[#2E96D8] to-[#D49A4A]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
          {/* Left: Kelvix Solutions Vector Emblem + Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 font-display text-base md:text-lg font-bold tracking-tight text-[#132C40] dark:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-7 h-7 shrink-0"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="28"
                height="28"
                rx="6"
                fill="#132C40"
                stroke="#D49A4A"
                strokeWidth="1.5"
              />
              <path
                d="M10 8.5v15M10 16l7.5-7.5M13.5 16L22 23.5"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="21.5" cy="9.5" r="2.2" fill="#2E96D8" />
            </svg>
            <span>Kelvix Solutions</span>
          </button>

          {/* Center Tabs */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-2 lg:gap-4 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                  : 'text-[#132C40] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-[#2E96D8] dark:text-[#D49A4A]' : 'text-[#1D72B8] dark:text-[#2E96D8]'}`} />
              <span>{t.nav.homePage}</span>
            </button>

            {/* Services & Solutions Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openDropdown === 'services'}
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === 'services' ? null : 'services'
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-slate-100 dark:bg-slate-800 text-[#132C40] dark:text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/70'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8]" />
                <span>{t.nav.servicesSolutions}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'services' && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50">
                  <div className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectServiceCategory?.('all');
                        handleNav('services');
                      }}
                      className="w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center justify-between gap-2.5 cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <LayoutGrid className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8] shrink-0" />
                        <span className="truncate">{t.nav.all13Services}</span>
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-slate-400 shrink-0">
                        {SERVICES.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectServiceCategory?.('engineering');
                        handleNav('services');
                      }}
                      className="w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center justify-between gap-2.5 cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <Cpu className="w-4 h-4 text-[#D49A4A] shrink-0" />
                        <span className="truncate">{t.nav.engineeringSolutions}</span>
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-slate-400 shrink-0">
                        {ENGINEERING_SERVICE_IDS.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectServiceCategory?.('video-reels');
                        handleNav('services');
                      }}
                      className="w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center justify-between gap-2.5 cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <Video className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8] shrink-0" />
                        <span className="truncate">{t.services.catVideoReels}</span>
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-slate-400 shrink-0">
                        {CLIENT_SPOTLIGHT_CLIPS.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectServiceCategory?.('faqs');
                        handleNav('services');
                      }}
                      className="w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center justify-between gap-2.5 cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <HelpCircle className="w-4 h-4 text-[#D49A4A] shrink-0" />
                        <span className="truncate">{t.services.catFaqs}</span>
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-slate-400 shrink-0">
                        {t.faq.items.length}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Corporate Hub Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openDropdown === 'corporate'}
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === 'corporate' ? null : 'corporate'
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'media' || activeTab === 'team'
                    ? 'bg-slate-100 dark:bg-slate-800 text-[#132C40] dark:text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/70'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8]" />
                <span>{t.nav.corporateHub}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'corporate' && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50">
                  <button
                    type="button"
                    onClick={() => handleNav('media')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center gap-2.5 cursor-pointer"
                  >
                    <Film className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8]" />
                    <span>{t.nav.photosVideo}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('team')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center gap-2.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8]" />
                    <span>{t.nav.clientsTeam}</span>
                  </button>
                  <a
                    href="#locations"
                    onClick={() => setOpenDropdown(null)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#132C40] dark:hover:text-white flex items-center gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-[#D49A4A]" />
                    <span>{t.nav.globalOfficesMap}</span>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Quick Search + Language Switcher + Theme Switcher + Primary CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search services and offices"
              className="hidden 2xl:inline-flex items-center gap-2.5 px-3 py-2 text-sm text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-[#132C40] hover:bg-slate-100 dark:hover:bg-[#193A54] border border-slate-200 dark:border-slate-700 rounded-lg min-h-[38px] cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>{t.nav.searchPlaceholder}</span>
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-[#0B1926] border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-300">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="2xl:hidden min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#132C40] hover:bg-slate-100 dark:hover:bg-[#193A54] text-slate-600 dark:text-slate-200 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher: English | Deutsch | Arabic */}
            <div
              role="group"
              aria-label="Select application language"
              className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#132C40] shrink-0"
            >
              <Globe
                className="hidden sm:block w-3.5 h-3.5 text-[#1D72B8] dark:text-[#2E96D8] mx-1.5 shrink-0"
                aria-hidden="true"
              />
              {LANG_OPTIONS.map((opt) => {
                const active = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    title={opt.title}
                    aria-pressed={active}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Theme Switcher: Classic Light <-> Midnight Professional */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to Classic Light theme'
                  : 'Switch to Midnight Professional theme'
              }
              title={
                theme === 'dark'
                  ? 'Theme: Midnight Professional (Switch to Classic Light)'
                  : 'Theme: Classic Light (Switch to Midnight Professional)'
              }
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#132C40] hover:bg-slate-100 dark:hover:bg-[#193A54] text-sm font-semibold text-[#132C40] dark:text-slate-100 min-h-[38px] cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-[#D49A4A] shrink-0" />
                  <span className="hidden xl:inline">{t.nav.classicLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#1D72B8] shrink-0" />
                  <span className="hidden xl:inline">{t.nav.midnight}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('book')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-sm font-semibold text-white bg-[#1D72B8] hover:bg-[#132C40] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.bookService}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#132C40] dark:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0B1926] border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'home', label: t.nav.mobileMenuHome },
                  { id: 'services', label: t.nav.mobileMenuServices },
                  { id: 'media', label: t.nav.mobileMenuMedia },
                  { id: 'team', label: t.nav.mobileMenuTeam },
                  { id: 'book', label: t.nav.mobileMenuBook },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-3.5 py-2.5 text-sm font-medium rounded-lg min-h-[44px] ${
                    activeTab === item.id
                      ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                      : 'bg-slate-100 dark:bg-[#132C40] text-[#132C40] dark:text-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onToggleTheme}
                className="text-left px-3.5 py-2.5 text-sm font-medium rounded-lg min-h-[44px] bg-slate-100 dark:bg-[#132C40] text-[#132C40] dark:text-slate-100 flex items-center gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#D49A4A]" />
                    <span>{t.nav.classicLight}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#1D72B8]" />
                    <span>{t.nav.midnightTheme}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Top Live News Tracker Strip */}
      <div
        aria-label="Live regional news tracker"
        className="bg-[#0E2233] text-white border-b border-[#1D72B8]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1D72B8] text-white font-bold text-xs tracking-wider uppercase shrink-0">
              <Newspaper className="w-3.5 h-3.5 text-[#D49A4A]" />
              <span>{t.nav.liveNews}</span>
            </span>

            <span dir="ltr" className="hidden sm:inline font-mono text-xs text-slate-400 shrink-0 tabular-nums">
              0{newsIndex + 1}/0{regionalNews.length}
            </span>

            <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-white/10 border border-white/15 text-xs font-semibold text-[#D49A4A] tracking-wide shrink-0">
              {activeNews.tag}
            </span>

            <p className="text-slate-100 truncate font-medium">
              {activeNews.headline}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (activeNews.id === 'news-sla') {
                  handleNav('services');
                } else {
                  onSelectRegion(activeNews.regionId);
                  handleNav('book');
                }
              }}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#D49A4A] hover:bg-[#c18739] text-[#0E2233] font-bold text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{activeNews.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setNewsPaused((p) => !p)}
              aria-label={newsPaused ? 'Resume live news tracker' : 'Pause live news tracker'}
              className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center cursor-pointer"
            >
              {newsPaused ? (
                <Play className="w-3 h-3 ml-0.5" />
              ) : (
                <Pause className="w-3 h-3" />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setNewsIndex(
                  (prev) => (prev - 1 + regionalNews.length) % regionalNews.length
                )
              }
              aria-label="Previous news update"
              className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setNewsIndex((prev) => (prev + 1) % regionalNews.length)
              }
              aria-label="Next news update"
              className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Command-K Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search Kelvix Solutions services and regional hubs"
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white dark:bg-[#0E2233] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden text-[#132C40] dark:text-slate-100"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.nav.searchModalPlaceholder}
                className="w-full text-sm text-[#132C40] dark:text-white bg-transparent placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="p-1 text-slate-400 hover:text-[#132C40] dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {t.nav.servicesHeading}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {filteredServices.map((svc) => (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        onSelectService(svc.id);
                      }}
                      className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#132C40] border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-[#132C40] dark:text-white">
                        {t.services.names[svc.id] || svc.name}
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-[#1D72B8] dark:text-[#2E96D8]">
                        {svc.responseSla}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {t.nav.hubsHeading}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {filteredOffices.map((office) => (
                    <button
                      key={office.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        onSelectRegion(office.id);
                        onSelectTab('book');
                      }}
                      className="text-left p-3 rounded-lg bg-slate-50 dark:bg-[#132C40] hover:bg-slate-100 dark:hover:bg-[#193A54] border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#132C40] dark:text-white">
                        {office.id === 'germany'
                          ? t.regions.germany
                          : office.id === 'dubai'
                            ? t.regions.dubai
                            : t.regions.london}
                      </p>
                      <p dir="ltr" className="font-mono text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                        {office.phone}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile thumb-zone bottom bar (52px) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B1926]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 h-[52px] text-[#132C40] dark:text-slate-100"
      >
        <div className="grid grid-cols-4 h-full items-center">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              activeTab === 'home' ? 'text-[#132C40] dark:text-white font-semibold' : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.nav.mobileHome}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNav('services')}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              activeTab === 'services' ? 'text-[#132C40] dark:text-white font-semibold' : 'text-slate-400'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.nav.mobileServices}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNav('media')}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              activeTab === 'media' ? 'text-[#132C40] dark:text-white font-semibold' : 'text-slate-400'
            }`}
          >
            <Film className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.nav.mobileMedia}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNav('book')}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              activeTab === 'book' ? 'text-[#1D72B8] dark:text-[#D49A4A] font-semibold' : 'text-slate-400'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.nav.mobileBook}</span>
          </button>
        </div>
      </nav>
    </>
  );
};
