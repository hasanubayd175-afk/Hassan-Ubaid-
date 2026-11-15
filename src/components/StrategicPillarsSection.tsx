import React, { useState } from 'react';
import { ArrowRight, Building2, ShieldCheck, Wrench } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { IMAGES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface StrategicPillarsSectionProps {
  onOpenServices: (serviceId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

interface PillarCard {
  id: string;
  index: string;
  badgeLabel: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  image: string;
  imageAlt: string;
  actionType: 'services' | 'book';
  serviceId: string;
  icon: React.ReactNode;
}

const PILLARS: PillarCard[] = [
  {
    id: 'mep',
    index: '01',
    badgeLabel: 'MEP & Critical Engineering',
    title: 'Hard MEP & HVAC Systems',
    description:
      'Precision commercial plumbing, HV/LV electrical switchgear, central chiller overhauls, and preventive mechanical care.',
    bullets: [
      'HVAC Chillers, VRF & Air Handling Units',
      'HV/LV Electrical & Thermal Diagnostics',
      '45–60 Min Priority Emergency SLA Dispatch',
    ],
    ctaLabel: 'Explore MEP Specifications',
    image: IMAGES.mepHvac,
    imageAlt: 'Kelvix mechanical and HVAC engineering technicians',
    actionType: 'services',
    serviceId: 'hvac',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: 'build',
    index: '02',
    badgeLabel: 'Turnkey Build & Grounds',
    title: 'Construction, Fit-Out & Care',
    description:
      'Complete commercial build-outs, architectural painting, corporate hygiene, courtyard landscaping, and ISO pest proofing.',
    bullets: [
      'Commercial Construction & Interior Retrofits',
      'Architectural Coatings & Institutional Hygiene',
      'Landscaping & Preventive Pest Monitoring',
    ],
    ctaLabel: 'View All 13 Specialist Trades',
    image: IMAGES.constructionPainting,
    imageAlt: 'Commercial construction and architectural finishing project',
    actionType: 'services',
    serviceId: 'construction',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    id: 'security-it',
    index: '03',
    badgeLabel: '24/7 Smart Infrastructure',
    title: 'Security, IT & Site Dispatch',
    description:
      'Enterprise structured fiber cabling, biometric access control, perimeter CCTV arrays, and unified multi-site SLA contracts.',
    bullets: [
      'Biometric Access & HD CCTV Integration',
      'Structured Fiber Cabling & Wi-Fi 7 Cores',
      'Direct London, Germany & Dubai Dispatch',
    ],
    ctaLabel: 'Schedule Site Dispatch',
    image: IMAGES.securityIt,
    imageAlt: 'Enterprise security systems and IT network infrastructure',
    actionType: 'book',
    serviceId: 'security',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

export const StrategicPillarsSection: React.FC<StrategicPillarsSectionProps> = ({
  onOpenServices,
  onOpenBooking,
}) => {
  const [featuredId, setFeaturedId] = useState<string>('mep');
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="strategic-pillars"
      className="bg-[#EBF1F8] dark:bg-[#0B1724] text-[#132C40] dark:text-slate-100 min-h-[480px] md:min-h-[520px] flex items-center py-14 md:py-16 transition-colors duration-200"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1D72B8] dark:text-[#2E96D8] mb-2">
            {t.pillars.eyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#132C40] dark:text-white [text-wrap:balance]">
            {t.pillars.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.pillars.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PILLARS.map((pillar, pillarIdx) => {
            const isHighlighted = featuredId === pillar.id;
            const localized = t.pillars.cards[pillarIdx];
            return (
              <article
                key={pillar.id}
                onMouseEnter={() => setFeaturedId(pillar.id)}
                className={`group rounded-2xl bg-white/95 dark:bg-[#102336] backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'border-2 border-[#1D72B8] dark:border-[#2E96D8] ring-4 ring-[#1D72B8]/12 dark:ring-[#2E96D8]/15 shadow-[0_18px_40px_-15px_rgba(29,114,184,0.28)]'
                    : 'border border-slate-200/90 dark:border-slate-800 hover:border-[#1D72B8]/60 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Card Photo Header with Number + Category Icon Overlay */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mb-5">
                    <ResilientImage
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2233]/85 via-[#0E2233]/20 to-transparent" />

                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md font-mono text-xs font-bold tracking-wider ${
                        isHighlighted
                          ? 'bg-[#1D72B8] text-white'
                          : 'bg-[#132C40]/90 text-white'
                      }`}
                    >
                      {pillar.index}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isHighlighted
                            ? 'bg-[#1D72B8] text-white'
                            : 'bg-white/95 text-[#132C40]'
                        }`}
                      >
                        {pillar.icon}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">
                        {localized.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3
                    className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors ${
                      isHighlighted
                        ? 'text-[#1D72B8] dark:text-[#2E96D8]'
                        : 'text-[#132C40] dark:text-white'
                    }`}
                  >
                    {localized.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {localized.description}
                  </p>

                  {/* 3 Clean Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {localized.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                            isHighlighted ? 'bg-[#1D72B8] dark:bg-[#2E96D8]' : 'bg-[#D49A4A]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link Row */}
                <button
                  type="button"
                  onClick={() =>
                    pillar.actionType === 'book'
                      ? onOpenBooking(pillar.serviceId)
                      : onOpenServices(pillar.serviceId)
                  }
                  className={`pt-4 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between text-sm sm:text-base font-semibold transition-colors cursor-pointer ${
                    isHighlighted
                      ? 'text-[#1D72B8] dark:text-[#2E96D8]'
                      : 'text-[#132C40] dark:text-slate-200 group-hover:text-[#1D72B8] dark:group-hover:text-[#2E96D8]'
                  }`}
                >
                  <span>{localized.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
