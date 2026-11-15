import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Cpu,
  GitCompareArrows,
  HelpCircle,
  LayoutGrid,
  Leaf,
  Plus,
  ShieldCheck,
  Video,
  Wrench,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CLIENT_SPOTLIGHT_CLIPS,
  ENGINEERING_SERVICE_IDS,
  SERVICES,
} from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId, ServiceCategory, ServiceItem } from '../types/kelvis';
import { ClientSuccessSpotlight } from './ClientSuccessSpotlight';
import { FaqSection } from './FaqSection';
import { ResilientImage } from './ResilientImage';
import { ServiceComparisonTable } from './ServiceComparisonTable';

interface ServicesSectionProps {
  selectedServiceId: string;
  onBookService: (serviceId: string) => void;
  onBookRegion?: (regionId: RegionId) => void;
  activeCategory?: ServiceCategory;
  onChangeCategory?: (category: ServiceCategory) => void;
}

const DEFAULT_COMPARE_IDS = ['hvac', 'electrical', 'plumbing'];

const CATEGORIES: {
  id: ServiceCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'all', label: 'All 13', icon: LayoutGrid },
  { id: 'engineering', label: 'Engineering Services & Solutions', icon: Cpu },
  {
    id: 'video-reels',
    label: 'Partner Video Reels & Field Results',
    icon: Video,
  },
  { id: 'faqs', label: 'FAQs & Compliance', icon: HelpCircle },
  { id: 'mep', label: 'MEP', icon: Wrench },
  { id: 'build', label: 'Build', icon: Building2 },
  { id: 'security-it', label: 'Security & IT', icon: ShieldCheck },
  { id: 'grounds', label: 'Grounds', icon: Leaf },
];

const CATEGORY_ICON_MAP: Record<
  Exclude<ServiceCategory, 'all' | 'engineering' | 'video-reels' | 'faqs'>,
  React.ComponentType<{ className?: string }>
> = {
  mep: Wrench,
  build: Building2,
  'security-it': ShieldCheck,
  grounds: Leaf,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceId,
  onBookService,
  onBookRegion,
  activeCategory: controlledCategory,
  onChangeCategory,
}) => {
  const [internalCategory, setInternalCategory] =
    useState<ServiceCategory>('all');
  const activeCategory = controlledCategory ?? internalCategory;
  const setActiveCategory = (nextCat: ServiceCategory) => {
    setInternalCategory(nextCat);
    onChangeCategory?.(nextCat);
  };
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>(DEFAULT_COMPARE_IDS);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const categoryLabels: Record<ServiceCategory, string> = {
    all: t.services.catAll,
    engineering: t.services.catEngineering,
    'video-reels': t.services.catVideoReels,
    faqs: t.services.catFaqs,
    mep: t.services.catMep,
    build: t.services.catBuild,
    'security-it': t.services.catSecurityIt,
    grounds: t.services.catGrounds,
  };

  const getTabCount = (catId: ServiceCategory): number => {
    if (catId === 'all') return SERVICES.length;
    if (catId === 'engineering') return ENGINEERING_SERVICE_IDS.length;
    if (catId === 'video-reels') return CLIENT_SPOTLIGHT_CLIPS.length;
    if (catId === 'faqs') return t.faq.items.length;
    return SERVICES.filter((svc) => svc.category === catId).length;
  };

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return SERVICES;
    if (activeCategory === 'engineering') {
      return SERVICES.filter((svc) =>
        (ENGINEERING_SERVICE_IDS as readonly string[]).includes(svc.id)
      );
    }
    return SERVICES.filter((svc) => svc.category === activeCategory);
  }, [activeCategory]);

  const handleToggleCompare = (serviceId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(serviceId)) {
        setLimitWarning(null);
        return prev.filter((id) => id !== serviceId);
      }
      if (prev.length >= 3) {
        setLimitWarning(t.services.limitWarning);
        return prev;
      }
      setLimitWarning(null);
      return [...prev, serviceId];
    });
  };

  const handleReplaceSlot = (slotIndex: number, nextServiceId: string) => {
    setLimitWarning(null);
    setCompareIds((prev) => {
      if (prev.includes(nextServiceId)) return prev;
      const updated = [...prev];
      updated[slotIndex] = nextServiceId;
      return updated;
    });
  };

  const scrollToComparison = () => {
    const el = document.getElementById('service-comparison');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const iconHoverVariant = prefersReducedMotion
    ? undefined
    : {
        rest: { scale: 1, rotate: 0, y: 0 },
        hover: {
          scale: 1.15,
          rotate: -6,
          y: -1,
          transition: { type: 'spring' as const, stiffness: 420, damping: 16 },
        },
      };

  const isDetailCompared = detailService
    ? compareIds.includes(detailService.id)
    : false;

  const isSpecialTab =
    activeCategory === 'video-reels' || activeCategory === 'faqs';

  return (
    <div className="relative overflow-hidden py-8 md:py-12 bg-gradient-to-br from-[#E1ECF7] via-[#EBF1F8] to-[#DBE7F4] dark:from-[#050E18] dark:via-[#081625] dark:to-[#0B1F33] transition-colors duration-300">
      {/* Subtle Ambient Light Layer for Glass Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#1D72B8]/10 dark:bg-[#2E96D8]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/5 w-80 h-80 rounded-full bg-[#D49A4A]/10 dark:bg-[#D49A4A]/10 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Vertical Category Tabs Rail (including Engineering, Video Reels & FAQs in Vertical Form) */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white/45 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/15 p-3 shadow-sm">
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Service categories"
                className="flex flex-col gap-1.5"
              >
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat.id;
                  const Icon = cat.icon;
                  const count = getTabCount(cat.id);
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      initial="rest"
                      whileHover="hover"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                      className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all text-start cursor-pointer min-h-[44px] ${
                        active
                          ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-white/10 hover:text-[#132C40] dark:hover:text-white'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <motion.span
                          variants={iconHoverVariant}
                          className={`inline-flex items-center justify-center shrink-0 ${
                            active
                              ? 'text-[#D49A4A] dark:text-white'
                              : 'text-[#1D72B8] dark:text-[#56B4EE]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.span>
                        <span className="truncate">
                          {categoryLabels[cat.id] || cat.label}
                        </span>
                      </span>

                      <span
                        dir="ltr"
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md tabular-nums shrink-0 ${
                          active
                            ? 'bg-white/15 text-[#D49A4A] dark:text-white'
                            : 'bg-slate-200/75 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Content Panel */}
          <div className="flex-1 min-w-0 w-full">
            {!isSpecialTab && (
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-300/60 dark:border-white/10">
                <div>
                  <p className="font-display text-lg sm:text-xl font-bold text-[#132C40] dark:text-white">
                    {categoryLabels[activeCategory]}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t.services.selectUpTo3}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToComparison}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/70 dark:border-white/15 text-[#132C40] dark:text-white hover:border-[#1D72B8] dark:hover:border-[#2E96D8] shadow-sm transition-colors cursor-pointer min-h-[42px] whitespace-nowrap"
                >
                  <GitCompareArrows className="w-4 h-4 text-[#1D72B8] dark:text-[#56B4EE]" />
                  <span>{t.services.compareSpecs}</span>
                  <span
                    dir="ltr"
                    className="font-mono text-[#1D72B8] dark:text-[#D49A4A] tabular-nums"
                  >
                    ({compareIds.length}/3)
                  </span>
                </button>
              </div>
            )}

            {/* Dedicated Engineering Services & Solutions Executive Banner */}
            {activeCategory === 'engineering' && (
              <div className="mb-6 rounded-2xl p-6 sm:p-7 bg-[#132C40]/92 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  <div className="max-w-3xl">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#D49A4A] mb-1.5">
                      {t.services.engineeringBanner.eyebrow}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                      {t.services.engineeringBanner.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                      {t.services.engineeringBanner.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      <span
                        dir="ltr"
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-xs font-semibold text-[#56B4EE]"
                      >
                        {t.services.engineeringBanner.standardsChip}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D49A4A]/20 border border-[#D49A4A]/45 text-xs font-semibold text-[#D49A4A]">
                        {t.services.engineeringBanner.slaChip}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => onBookService('hvac')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D49A4A] hover:bg-white text-[#0E2233] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shadow-md"
                    >
                      <span>{t.services.engineeringBanner.bookCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Views: Video Reels | FAQs (Vertical Accordion) | Single-Column Vertical Service List */}
            {activeCategory === 'video-reels' ? (
              <ClientSuccessSpotlight
                embedded
                onBookRegion={(reg) => {
                  if (onBookRegion) {
                    onBookRegion(reg);
                  } else {
                    onBookService('hvac');
                  }
                }}
              />
            ) : activeCategory === 'faqs' ? (
              <FaqSection
                embedded
                onBookConsultation={() => onBookService('hvac')}
              />
            ) : (
              <>
                {/* One Long Single-Column Vertical Service List */}
                <div className="flex flex-col gap-3.5">
                  {filteredServices.map((service, idx) => {
                    const isSelected = selectedServiceId === service.id;
                    const isCompared = compareIds.includes(service.id);
                    const CategoryIcon =
                      CATEGORY_ICON_MAP[
                        service.category as Exclude<
                          ServiceCategory,
                          'all' | 'engineering' | 'video-reels' | 'faqs'
                        >
                      ] || Wrench;
                    const localizedName =
                      t.services.names[service.id] || service.name;
                    const localizedCategory =
                      t.services.categories[service.categoryLabel] ||
                      service.categoryLabel;

                    return (
                      <motion.div
                        key={service.id}
                        layout={!prefersReducedMotion}
                        initial="rest"
                        whileHover="hover"
                        className={`group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-white/10 backdrop-blur-md border transition-all shadow-sm hover:shadow-xl ${
                          isCompared
                            ? 'border-[#D49A4A] ring-2 ring-[#D49A4A]/65'
                            : isSelected
                              ? 'border-[#1D72B8] ring-2 ring-[#1D72B8]/80'
                              : 'border-white/70 dark:border-white/15 hover:border-[#1D72B8]/60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-stretch">
                          {/* Photo Thumbnail */}
                          <button
                            type="button"
                            onClick={() => setDetailService(service)}
                            aria-label={`Inspect ${localizedName} details`}
                            className="relative sm:w-56 md:w-64 aspect-[16/10] sm:aspect-auto sm:min-h-[156px] shrink-0 overflow-hidden bg-[#0E2233] cursor-pointer focus:outline-none"
                          >
                            <ResilientImage
                              src={service.image}
                              alt={localizedName}
                              fallbackTitle={localizedName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2233]/80 via-[#0E2233]/20 to-transparent" />

                            <motion.span
                              variants={iconHoverVariant}
                              aria-hidden="true"
                              className="absolute top-3 start-3 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 text-[#D49A4A] flex items-center justify-center shadow-sm"
                            >
                              <CategoryIcon className="w-4 h-4" />
                            </motion.span>

                            <span
                              dir="ltr"
                              className="absolute bottom-3 start-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-sm border border-white/15 font-mono text-xs font-semibold text-[#D49A4A] tabular-nums"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>
                                {service.responseSla} {t.services.sla}
                              </span>
                            </span>
                          </button>

                          {/* Details & Actions Column */}
                          <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    dir="ltr"
                                    className="font-mono text-xs font-bold text-slate-400 dark:text-slate-400 tabular-nums"
                                  >
                                    {String(idx + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-xs font-semibold text-[#1D72B8] dark:text-[#56B4EE]">
                                    {localizedCategory}
                                  </span>
                                </div>

                                <span
                                  dir="ltr"
                                  className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 px-2.5 py-0.5 rounded-md"
                                >
                                  {service.specs.certifications}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => setDetailService(service)}
                                className="text-start cursor-pointer group/title"
                              >
                                <h3 className="font-display text-lg sm:text-xl font-bold text-[#132C40] dark:text-white group-hover/title:text-[#1D72B8] dark:group-hover/title:text-[#56B4EE] transition-colors leading-snug">
                                  {localizedName}
                                </h3>
                              </button>

                              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-200 mt-1 leading-relaxed">
                                {service.tagline}
                              </p>
                            </div>

                            <div className="pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-300">
                                {service.specs.dispatchTier} ·{' '}
                                <span dir="ltr" className="font-mono font-medium">
                                  {service.specs.warrantyPeriod}
                                </span>
                              </span>

                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleCompare(service.id)}
                                  aria-pressed={isCompared}
                                  aria-label={
                                    isCompared
                                      ? `Remove ${localizedName} from comparison`
                                      : `Add ${localizedName} to comparison`
                                  }
                                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                                    isCompared
                                      ? 'bg-[#D49A4A] border-[#D49A4A] text-[#0E2233] shadow-sm'
                                      : 'bg-white/60 dark:bg-white/10 hover:bg-[#1D72B8]/15 border-slate-200 dark:border-white/15 text-[#132C40] dark:text-white'
                                  }`}
                                >
                                  {isCompared ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 shrink-0" />
                                      <span>{t.services.comparing}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5 shrink-0" />
                                      <span>{t.services.compare}</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setDetailService(service)}
                                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-[#132C40] dark:text-white transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <span>{t.nav.viewDirectory}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onBookService(service.id)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                                >
                                  <span>{t.services.bookPrefix}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Interactive Side-by-Side Comparison Table */}
                <ServiceComparisonTable
                  compareIds={compareIds}
                  onToggleCompare={handleToggleCompare}
                  onReplaceSlot={handleReplaceSlot}
                  onResetDefault={() => {
                    setLimitWarning(null);
                    setCompareIds(DEFAULT_COMPARE_IDS);
                  }}
                  onClearAll={() => {
                    setLimitWarning(null);
                    setCompareIds([]);
                  }}
                  onBookService={onBookService}
                  limitWarning={limitWarning}
                  onDismissWarning={() => setLimitWarning(null)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {detailService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={detailService.name}
          onClick={() => setDetailService(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white dark:bg-[#0E2233] dark:border dark:border-slate-700 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="relative aspect-[16/10] bg-neutral-900">
              <ResilientImage
                src={detailService.image}
                alt={detailService.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setDetailService(null)}
                aria-label="Close service details"
                className="absolute top-3 right-3 min-w-[44px] min-h-[44px] rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-slate-400 mb-1">
                <span>
                  {t.services.categories[detailService.categoryLabel] ||
                    detailService.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span
                  dir="ltr"
                  className="font-mono tabular-nums text-[#1D72B8] dark:text-[#2E96D8]"
                >
                  {detailService.responseSla} {t.services.sla}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.regions.london} · {t.regions.germany} · {t.regions.dubai}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white mb-2">
                {t.services.names[detailService.id] || detailService.name}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
                {detailService.tagline}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-slate-200/80 dark:border-white/15 text-sm mb-6">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    {t.services.standards}
                  </span>
                  <span
                    dir="ltr"
                    className="inline-block font-mono font-semibold text-[#132C40] dark:text-white"
                  >
                    {detailService.specs.certifications}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    {t.services.warranty}
                  </span>
                  <span className="font-semibold text-[#132C40] dark:text-white">
                    {detailService.specs.warrantyPeriod}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleCompare(detailService.id);
                    setDetailService(null);
                    scrollToComparison();
                  }}
                  className={`sm:w-auto px-4 py-3.5 text-sm font-semibold rounded-xl border transition-colors min-h-[48px] cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                    isDetailCompared
                      ? 'bg-[#D49A4A] border-[#D49A4A] text-[#0E2233]'
                      : 'bg-slate-50 dark:bg-[#102336] border-slate-200 dark:border-slate-700 text-[#132C40] dark:text-white hover:border-[#1D72B8]'
                  }`}
                >
                  <GitCompareArrows className="w-4 h-4 shrink-0" />
                  <span>
                    {isDetailCompared
                      ? t.services.removeCompare
                      : t.services.compareSpecs}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const id = detailService.id;
                    setDetailService(null);
                    onBookService(id);
                  }}
                  className="flex-1 py-3.5 px-5 text-sm font-semibold text-white bg-neutral-950 dark:bg-[#1D72B8] hover:bg-blue-700 dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] rounded-xl transition-colors min-h-[48px] cursor-pointer"
                >
                  {t.services.bookPrefix}{' '}
                  {t.services.names[detailService.id] || detailService.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
