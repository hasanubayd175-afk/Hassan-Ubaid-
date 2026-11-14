import React, { useEffect, useState } from 'react';
import { ArrowRight, Calculator, Info } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AnimatedCounter } from './components/AnimatedCounter';
import { BookingSection } from './components/BookingSection';
import { ClientsTeamSection } from './components/ClientsTeamSection';
import { HeroCityReel } from './components/HeroCityReel';
import { LocationsFooter } from './components/LocationsFooter';
import { MediaShowreelSection } from './components/MediaShowreelSection';
import { MainTabId, Navbar } from './components/Navbar';
import { PartnerSliderSection } from './components/PartnerSliderSection';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { StrategicPillarsSection } from './components/StrategicPillarsSection';
import { SupportPortalWidget } from './components/SupportPortalWidget';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { RegionId, ServiceCategory } from './types/kelvis';

const DELIVERY_MILESTONES = [
  {
    key: 'projectsDelivered' as const,
    target: 1400,
    decimals: 0,
    suffix: '+',
    label: 'Projects Delivered',
    progress: 92,
    liveDriftStep: 1,
  },
  {
    key: 'certifiedEngineers' as const,
    target: 180,
    decimals: 0,
    suffix: '+',
    label: 'Certified Workforce Engineers',
    progress: 86,
    liveDriftStep: 1,
  },
  {
    key: 'managedFootprint' as const,
    target: 1.8,
    decimals: 1,
    suffix: 'M+ sqm',
    label: 'Managed Asset Footprint',
    progress: 94,
    liveDriftStep: 0.1,
  },
  {
    key: 'slaCompliance' as const,
    target: 99.4,
    decimals: 1,
    suffix: '%',
    label: '24/7 SLA Compliance',
    progress: 99,
    liveDriftStep: 0,
  },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<MainTabId>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('hvac');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('london');
  const [quickQuoteOpen, setQuickQuoteOpen] = useState(false);
  const [activeMilestoneTip, setActiveMilestoneTip] = useState<string | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    return 'light';
  });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kelvix-theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const switchTab = (tab: MainTabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    switchTab('book');
  };

  const handleBookRegion = (regionId: RegionId) => {
    setSelectedRegionId(regionId);
    switchTab('book');
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#EBF1F8] dark:bg-[#07111C] text-[#132C40] dark:text-slate-100 transition-colors duration-200"
    >
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 dark:text-amber-200 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        activeTab={activeTab}
        onSelectTab={switchTab}
        selectedRegionId={selectedRegionId}
        onSelectRegion={setSelectedRegionId}
        onSelectService={handleBookService}
        onSelectServiceCategory={setServiceCategory}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 flex flex-col bg-[#EBF1F8] dark:bg-[#07111C] transition-colors duration-200">
        {activeTab === 'home' && (
          <>
            {/* Whole-Section Full-Bleed Multi-City Video Hero (No Timer) */}
            <HeroCityReel onSelectRegion={setSelectedRegionId}>
              <div className="max-w-3xl">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3 mb-4"
                >
                  <span className="w-8 h-px bg-[#D49A4A]" aria-hidden="true" />
                  <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2E96D8]">
                    {t.hero.eyebrow}
                  </p>
                </motion.div>

                <motion.h1
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.15,
                    delay: prefersReducedMotion ? 0 : 0.16,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold tracking-tight leading-[1.08] text-white mb-7 [text-wrap:balance] drop-shadow-sm"
                >
                  {t.hero.headlinePrefix}{' '}
                  <span className="font-quote italic font-bold text-[#D49A4A] text-[1.12em] inline-block px-0.5">
                    &amp;
                  </span>{' '}
                  {t.hero.headlineSuffix}
                </motion.h1>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: prefersReducedMotion ? 0 : 0.36,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => switchTab('book')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#0E2233] bg-[#D49A4A] hover:bg-white rounded-lg transition-colors min-h-[48px] whitespace-nowrap cursor-pointer shadow-lg"
                  >
                    <span>{t.hero.bookService}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickQuoteOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/12 hover:bg-white/22 border border-white/30 backdrop-blur-md rounded-lg transition-colors min-h-[48px] whitespace-nowrap cursor-pointer shadow-lg"
                  >
                    <Calculator className="w-4 h-4 text-[#D49A4A]" />
                    <span>{t.hero.quickQuote}</span>
                  </button>
                </motion.div>
              </div>
            </HeroCityReel>

            {/* 2nd Section: Three Strategic Pillars — Modern Photo-Header Card System */}
            <StrategicPillarsSection
              onOpenServices={(serviceId) => {
                if (serviceId) setSelectedServiceId(serviceId);
                switchTab('services');
              }}
              onOpenBooking={(serviceId) => {
                if (serviceId) setSelectedServiceId(serviceId);
                switchTab('book');
              }}
            />

            {/* 3rd Section: Project Delivery Milestones & Operational Workforce Scale */}
            <section
              id="milestones"
              className="relative bg-gradient-to-br from-[#0F2437] via-[#132C40] to-[#0B1B2B] dark:from-[#08131E] dark:via-[#0C1B2A] dark:to-[#07111C] text-white overflow-x-clip py-16 md:py-24 transition-colors duration-200"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(46,150,216,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(212,154,74,0.14),_transparent_55%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />

              <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-12 md:mb-14">
                  <div className="flex items-center justify-center gap-3.5 mb-3">
                    <span
                      className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#56B4EE]">
                      {t.milestones.eyebrow}
                    </p>
                    <span
                      className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-bold tracking-tight leading-tight text-white [text-wrap:balance]">
                    {t.milestones.titlePrefix}{' '}
                    <span className="font-quote italic font-bold text-[#D49A4A] text-[1.14em] inline-block px-1">
                      &amp;
                    </span>{' '}
                    {t.milestones.titleSuffix}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-slate-300">
                    {t.regions.london} · {t.regions.germany} · {t.regions.dubai}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {DELIVERY_MILESTONES.map((item, idx) => {
                    const isTooltipOpen = activeMilestoneTip === item.key;
                    const methodology = t.milestones.methodologies[item.key];
                    const tooltipId = `milestone-tip-${item.key}`;

                    return (
                      <motion.div
                        key={item.label}
                        tabIndex={0}
                        aria-describedby={tooltipId}
                        onMouseEnter={() => setActiveMilestoneTip(item.key)}
                        onMouseLeave={() =>
                          setActiveMilestoneTip((prev) =>
                            prev === item.key ? null : prev
                          )
                        }
                        onFocus={() => setActiveMilestoneTip(item.key)}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                            setActiveMilestoneTip((prev) =>
                              prev === item.key ? null : prev
                            );
                          }
                        }}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { y: [0, -5, 0] }
                        }
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.4 }
                            : {
                                opacity: { duration: 0.7, delay: idx * 0.1 },
                                y: {
                                  duration: 4.4,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: idx * 0.45,
                                },
                              }
                        }
                        className={`group relative bg-white/8 hover:bg-white/12 dark:bg-[#102336]/85 dark:hover:bg-[#132C40] backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-7 text-center shadow-lg hover:shadow-2xl hover:border-[#D49A4A]/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#56B4EE] transition-all flex flex-col items-center justify-between gap-5 cursor-help ${
                          isTooltipOpen ? 'z-30' : 'z-10'
                        }`}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
                        >
                          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2E96D8] via-[#56B4EE] to-[#D49A4A] opacity-85 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <button
                          type="button"
                          aria-label={`${t.milestones.methodologyLabel}: ${t.milestones[item.key]}`}
                          aria-expanded={isTooltipOpen}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMilestoneTip((prev) =>
                              prev === item.key ? null : item.key
                            );
                          }}
                          className={`absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                            isTooltipOpen
                              ? 'bg-[#D49A4A] text-[#0E2233] border-[#D49A4A]'
                              : 'bg-white/10 text-slate-300 border-white/20 group-hover:text-[#D49A4A] group-hover:border-[#D49A4A]/55'
                          }`}
                        >
                          <Info className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>

                        <AnimatePresence>
                          {isTooltipOpen && (
                            <motion.div
                              id={tooltipId}
                              role="tooltip"
                              initial={
                                prefersReducedMotion
                                  ? { opacity: 1 }
                                  : { opacity: 0, y: 8, scale: 0.97 }
                              }
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={
                                prefersReducedMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 6, scale: 0.97 }
                              }
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-[min(19.5rem,calc(100vw-2.5rem))] rounded-xl bg-[#091826]/95 backdrop-blur-md text-white border border-[#D49A4A]/50 p-4 text-start shadow-2xl z-40"
                            >
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D49A4A]">
                                  {t.milestones.methodologyLabel}
                                </span>
                                <span className="text-[10px] font-medium text-sky-200/90 bg-white/10 px-2 py-0.5 rounded">
                                  {methodology.source}
                                </span>
                              </div>
                              <p className="font-display text-xs font-bold text-white mb-1">
                                {methodology.title}
                              </p>
                              <p className="text-[11px] leading-relaxed text-slate-200">
                                {methodology.detail}
                              </p>
                              <span
                                aria-hidden="true"
                                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 rotate-45 bg-[#091826] border-r border-b border-[#D49A4A]/50"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="pt-1 flex flex-col items-center">
                          <p
                            dir="ltr"
                            className="font-display text-3xl sm:text-[2.5rem] font-bold text-white tracking-tight leading-none tabular-nums"
                          >
                            <AnimatedCounter
                              target={item.target}
                              decimals={item.decimals}
                              suffix={item.suffix}
                              liveDriftStep={item.liveDriftStep}
                            />
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-slate-200 mt-3 leading-snug max-w-[18ch]">
                            {t.milestones[item.key]}
                          </p>
                        </div>

                        <div className="w-full space-y-2">
                          <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                            <motion.div
                              initial={prefersReducedMotion ? false : { width: '0%' }}
                              whileInView={{ width: `${item.progress}%` }}
                              viewport={{ once: false, amount: 0.2 }}
                              transition={{
                                duration: 1.4,
                                delay: 0.15 * idx,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-[#2E96D8] via-[#56B4EE] to-[#D49A4A]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Trusted by Premier Asset Owners in London & Germany */}
            <ReviewsSection />

            {/* Round-Shape Sliding Clients & Strategic Partners Showcase */}
            <PartnerSliderSection />
          </>
        )}

        {/* Dedicated Services Tab (All 13 Services with Real Photos) */}
        {activeTab === 'services' && (
          <div className="relative bg-[#EBF1F8] dark:bg-[#07111C]">
            <div className="bg-[#132C40] dark:bg-[#0B1724] text-white py-10 border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#D49A4A] mb-1">
                    {t.services.directoryEyebrow}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    {t.services.directoryTitle}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {t.regions.london} · {t.regions.germany} · {t.regions.dubai}
                </p>
              </div>
            </div>
            <ServicesSection
              selectedServiceId={selectedServiceId}
              onBookService={handleBookService}
              onBookRegion={handleBookRegion}
              activeCategory={serviceCategory}
              onChangeCategory={setServiceCategory}
            />
          </div>
        )}

        {/* Photos & Video Tab */}
        {activeTab === 'media' && <MediaShowreelSection />}

        {/* Clients & Team Tab */}
        {activeTab === 'team' && (
          <ClientsTeamSection onBookRegion={handleBookRegion} />
        )}

        {/* Booking Tab */}
        {activeTab === 'book' && (
          <BookingSection
            selectedServiceId={selectedServiceId}
            selectedRegionId={selectedRegionId}
            onChangeService={setSelectedServiceId}
            onChangeRegion={setSelectedRegionId}
          />
        )}
      </main>

      {/* Global Map + Address Details + Quiet Navigation Footer */}
      <LocationsFooter
        selectedRegionId={selectedRegionId}
        onSelectRegion={setSelectedRegionId}
        onBookInRegion={handleBookRegion}
        onOpenServices={() => switchTab('services')}
        onOpenMedia={() => switchTab('media')}
        onOpenTeam={() => switchTab('team')}
      />

      {/* Non-Intrusive Bottom Client Support & Dispatch Portal */}
      <SupportPortalWidget
        selectedRegionId={selectedRegionId}
        onSelectRegion={setSelectedRegionId}
        onOpenBooking={(regionId, serviceId) => {
          setSelectedRegionId(regionId);
          if (serviceId) setSelectedServiceId(serviceId);
          switchTab('book');
        }}
      />
      {/* Quick Quote Preliminary Estimator Overlay */}
      <QuickQuoteModal
        isOpen={quickQuoteOpen}
        onClose={() => setQuickQuoteOpen(false)}
        defaultServiceId={selectedServiceId}
        defaultRegionId={selectedRegionId}
        onProceedToBooking={(svcId, regId) => {
          setSelectedServiceId(svcId);
          setSelectedRegionId(regId);
          switchTab('book');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
