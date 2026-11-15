import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  HelpCircle,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

type FaqFilter = 'all' | 'compliance' | 'operations' | 'methodology';

interface FaqSectionProps {
  embedded?: boolean;
  onBookConsultation?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  embedded = false,
  onBookConsultation,
}) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FaqFilter>('all');
  const [openId, setOpenId] = useState<string>(
    t.faq.items[0]?.id || 'faq-certs'
  );

  const visibleItems = useMemo(() => {
    if (activeFilter === 'all') return t.faq.items;
    return t.faq.items.filter((item) => item.category === activeFilter);
  }, [activeFilter, t.faq.items]);

  const filterButtons: {
    id: FaqFilter;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'all', label: t.faq.allCategories, icon: HelpCircle },
    {
      id: 'compliance',
      label: t.faq.categories.compliance,
      icon: ShieldCheck,
    },
    { id: 'operations', label: t.faq.categories.operations, icon: Globe2 },
    { id: 'methodology', label: t.faq.categories.methodology, icon: Wrench },
  ];

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const handleFilterChange = (nextFilter: FaqFilter) => {
    setActiveFilter(nextFilter);
    const matching =
      nextFilter === 'all'
        ? t.faq.items
        : t.faq.items.filter((item) => item.category === nextFilter);
    if (matching.length > 0 && !matching.some((item) => item.id === openId)) {
      setOpenId(matching[0].id);
    }
  };

  const getCategoryIcon = (category: 'compliance' | 'operations' | 'methodology') => {
    if (category === 'compliance') return ShieldCheck;
    if (category === 'operations') return Globe2;
    return Wrench;
  };

  const innerContent = (
    <div className={embedded ? 'space-y-6' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
      {/* Section Heading */}
      <div className={embedded ? 'text-start' : 'text-center mx-auto max-w-3xl mb-10'}>
        <div
          className={`flex items-center gap-3 mb-3 ${
            embedded ? 'justify-start' : 'justify-center'
          }`}
        >
          {!embedded && (
            <span
              className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
          )}
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#1D72B8] dark:text-[#56B4EE]">
            {t.faq.eyebrow}
          </p>
          <span
            className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
            aria-hidden="true"
          />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#132C40] dark:text-white [text-wrap:balance]">
          {t.faq.headingPrefix}{' '}
          <span className="font-quote italic font-bold text-[#D49A4A] text-[1.12em] inline-block px-0.5">
            &amp;
          </span>{' '}
          {t.faq.headingSuffix}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.faq.subtitle}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div
        className={`flex flex-wrap items-center gap-2 ${
          embedded ? 'justify-start' : 'justify-center mb-8'
        }`}
      >
        <div
          role="tablist"
          aria-label={t.faq.eyebrow}
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-sm"
        >
          {filterButtons.map((btn) => {
            const Icon = btn.icon;
            const active = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFilterChange(btn.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#132C40] dark:hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    active ? 'text-[#D49A4A]' : 'text-[#1D72B8] dark:text-[#56B4EE]'
                  }`}
                />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Accordion Stack */}
      <div className="flex flex-col gap-3">
        {visibleItems.map((item, idx) => {
          const isOpen = openId === item.id;
          const CatIcon = getCategoryIcon(item.category);
          const panelId = `${embedded ? 'svc-' : 'home-'}faq-panel-${item.id}`;
          const buttonId = `${embedded ? 'svc-' : 'home-'}faq-btn-${item.id}`;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border backdrop-blur-md transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-[#0E2233] border-[#1D72B8]/55 dark:border-[#D49A4A]/60 shadow-lg'
                  : 'bg-white/75 dark:bg-white/8 hover:bg-white dark:hover:bg-white/12 border-slate-200/85 dark:border-white/15 shadow-sm'
              }`}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(item.id)}
                  className="w-full px-5 sm:px-6 py-4.5 sm:py-5 text-start flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D72B8]"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span
                      className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isOpen
                          ? 'bg-[#132C40] dark:bg-[#1D72B8] text-[#D49A4A] dark:text-white border-transparent'
                          : 'bg-[#EBF1F8] dark:bg-white/10 text-[#1D72B8] dark:text-[#56B4EE] border-slate-200/80 dark:border-white/15'
                      }`}
                    >
                      <CatIcon className="w-4 h-4" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          dir="ltr"
                          className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-400 tabular-nums"
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-[#1D72B8] dark:text-[#56B4EE]">
                          {t.faq.categories[item.category]}
                        </span>
                        <span
                          dir="ltr"
                          className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-[#132C40] dark:text-[#D49A4A] border border-slate-200/80 dark:border-white/10"
                        >
                          {item.badge}
                        </span>
                      </div>

                      <span className="block font-display text-base sm:text-lg font-bold text-[#132C40] dark:text-white leading-snug">
                        {item.question}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#D49A4A]/15 border-[#D49A4A]/50 text-[#D49A4A]'
                        : 'bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/15 text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-0 ps-[4.125rem] sm:ps-[4.375rem] border-t border-slate-100 dark:border-white/10">
                      <p className="pt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Engineering Consultation Prompt */}
      {onBookConsultation && (
        <div className="mt-8 rounded-2xl p-5 sm:p-6 bg-[#132C40] dark:bg-[#0E2233] border border-[#1D72B8]/35 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <p className="text-sm sm:text-base font-medium text-slate-200">
            {t.faq.ctaPrompt}
          </p>
          <button
            type="button"
            onClick={onBookConsultation}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D49A4A] hover:bg-white text-[#0E2233] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.faq.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 bg-[#F6F9FC] dark:bg-[#08131E] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200"
    >
      {innerContent}
    </section>
  );
};
