import React from 'react';
import { ArrowRight, GitCompareArrows, Plus, RotateCcw, X } from 'lucide-react';
import { SERVICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { ServiceItem } from '../types/kelvis';
import { ResilientImage } from './ResilientImage';

interface ServiceComparisonTableProps {
  compareIds: string[];
  onToggleCompare: (serviceId: string) => void;
  onReplaceSlot: (slotIndex: number, nextServiceId: string) => void;
  onResetDefault: () => void;
  onClearAll: () => void;
  onBookService: (serviceId: string) => void;
  limitWarning: string | null;
  onDismissWarning: () => void;
}

export const ServiceComparisonTable: React.FC<ServiceComparisonTableProps> = ({
  compareIds,
  onToggleCompare,
  onReplaceSlot,
  onResetDefault,
  onClearAll,
  onBookService,
  limitWarning,
  onDismissWarning,
}) => {
  const { t, isRtl } = useLanguage();

  const specRows: {
    key: string;
    label: string;
    renderValue: (service: ServiceItem) => React.ReactNode;
  }[] = [
    {
      key: 'category',
      label: t.comparison.rows.discipline,
      renderValue: (svc) => (
        <span className="text-sm font-medium text-[#132C40] dark:text-slate-100">
          {t.services.categories[svc.categoryLabel] || svc.categoryLabel}
        </span>
      ),
    },
    {
      key: 'sla',
      label: t.comparison.rows.responseSla,
      renderValue: (svc) => (
        <span
          dir="ltr"
          className="inline-block font-mono text-sm sm:text-base font-bold text-[#1D72B8] dark:text-[#2E96D8] tabular-nums"
        >
          {svc.responseSla}
        </span>
      ),
    },
    {
      key: 'dispatchTier',
      label: t.comparison.rows.dispatchTier,
      renderValue: (svc) => (
        <span className="text-sm font-semibold text-[#132C40] dark:text-white">
          {svc.specs.dispatchTier}
        </span>
      ),
    },
    {
      key: 'emergencySupport',
      label: t.comparison.rows.emergencySupport,
      renderValue: (svc) => (
        <span className="text-sm text-slate-700 dark:text-slate-200">
          {svc.specs.emergencySupport}
        </span>
      ),
    },
    {
      key: 'certifications',
      label: t.comparison.rows.certifications,
      renderValue: (svc) => (
        <span
          dir="ltr"
          className="inline-block font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        >
          {svc.specs.certifications}
        </span>
      ),
    },
    {
      key: 'inspectionFrequency',
      label: t.comparison.rows.inspectionFrequency,
      renderValue: (svc) => (
        <span className="text-sm text-slate-700 dark:text-slate-200">
          {svc.specs.inspectionFrequency}
        </span>
      ),
    },
    {
      key: 'warrantyPeriod',
      label: t.comparison.rows.warrantyPeriod,
      renderValue: (svc) => (
        <span
          dir="ltr"
          className="inline-block font-mono text-sm font-medium text-[#132C40] dark:text-slate-100 tabular-nums"
        >
          {svc.specs.warrantyPeriod}
        </span>
      ),
    },
    {
      key: 'coverageRegions',
      label: t.comparison.rows.coverageRegions,
      renderValue: (svc) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {svc.specs.coverageRegions}
        </span>
      ),
    },
    {
      key: 'typicalDeliverables',
      label: t.comparison.rows.typicalDeliverables,
      renderValue: (svc) => (
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {svc.specs.typicalDeliverables}
        </p>
      ),
    },
  ];

  const selectedServices = compareIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is ServiceItem => Boolean(s));

  const remainingServices = SERVICES.filter((s) => !compareIds.includes(s.id));
  const emptySlotsCount = Math.max(0, 3 - selectedServices.length);

  return (
    <section
      id="service-comparison"
      aria-labelledby="comparison-heading"
      className="mt-12 md:mt-16 pt-10 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[#D49A4A]" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-wider uppercase text-[#1D72B8] dark:text-[#2E96D8]">
              {t.comparison.eyebrow}
            </p>
          </div>
          <h2
            id="comparison-heading"
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#132C40] dark:text-white [text-wrap:balance]"
          >
            {t.comparison.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
            {t.comparison.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#132C40] dark:text-slate-200 tabular-nums">
            <GitCompareArrows className="w-4 h-4 text-[#1D72B8] dark:text-[#2E96D8]" />
            <span dir="ltr">{selectedServices.length} / 3</span>
            <span>{t.comparison.selectedOf3}</span>
          </span>

          <button
            type="button"
            onClick={onResetDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/15 text-[#132C40] dark:text-slate-200 hover:border-[#1D72B8] dark:hover:border-[#2E96D8] transition-colors cursor-pointer min-h-[38px] whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.comparison.top3Mep}</span>
          </button>

          {selectedServices.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap"
            >
              {t.comparison.clearAll}
            </button>
          )}
        </div>
      </div>

      {/* Inline Selection Limit Notice */}
      {limitWarning && (
        <div
          role="status"
          className="mb-5 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 flex items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <span>{limitWarning}</span>
          <button
            type="button"
            onClick={onDismissWarning}
            aria-label="Dismiss notice"
            className="p-1 rounded-md hover:bg-amber-200/50 dark:hover:bg-amber-900/60 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comparison Matrix Glass Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/15 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full min-w-[760px] border-collapse ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="border-b border-slate-200/70 dark:border-white/10">
                <th
                  scope="col"
                  className="sticky start-0 z-10 w-[210px] min-w-[180px] align-bottom p-5 bg-[#EBF1F8]/85 dark:bg-[#0B1724]/85 backdrop-blur-md border-e border-slate-200/70 dark:border-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.comparison.techParameter}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal">
                    {t.comparison.compareUpTo3}
                  </p>
                </th>

                {selectedServices.map((service, slotIdx) => (
                  <th
                    key={service.id}
                    scope="col"
                    className="w-[260px] min-w-[230px] align-top p-4 sm:p-5 border-r last:border-r-0 border-slate-200/70 dark:border-white/10 bg-white/10 backdrop-blur-md"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0E2233]">
                        <ResilientImage
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2233]/80 via-transparent to-transparent" />
                        <button
                          type="button"
                          onClick={() => onToggleCompare(service.id)}
                          aria-label={`Remove ${service.name} from comparison`}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span
                          dir="ltr"
                          className="absolute bottom-2 left-2.5 text-[11px] font-mono font-semibold text-[#D49A4A] tabular-nums"
                        >
                          {service.responseSla} {t.services.sla}
                        </span>
                      </div>

                      <div>
                        <label
                          htmlFor={`compare-slot-${slotIdx}`}
                          className="sr-only"
                        >
                          Select service for comparison column {slotIdx + 1}
                        </label>
                        <select
                          id={`compare-slot-${slotIdx}`}
                          value={service.id}
                          onChange={(e) => onReplaceSlot(slotIdx, e.target.value)}
                          className="w-full px-3 py-2 text-sm font-display font-bold bg-[#F6F9FC] dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-lg text-[#132C40] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D72B8] dark:focus:ring-[#2E96D8] cursor-pointer"
                        >
                          {SERVICES.map((opt) => {
                            const usedInOtherSlot =
                              opt.id !== service.id &&
                              compareIds.includes(opt.id);
                            return (
                              <option
                                key={opt.id}
                                value={opt.id}
                                disabled={usedInOtherSlot}
                              >
                                {t.services.names[opt.id] || opt.name}
                                {usedInOtherSlot ? ` (${t.comparison.selectedOf3})` : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </th>
                ))}

                {Array.from({ length: emptySlotsCount }).map((_, idx) => {
                  const slotNumber = selectedServices.length + idx + 1;
                  return (
                    <th
                      key={`empty-slot-${slotNumber}`}
                      scope="col"
                      className="w-[260px] min-w-[230px] align-middle p-5 border-r last:border-r-0 border-slate-200/70 dark:border-white/10 bg-white/10 backdrop-blur-md"
                    >
                      <div className="rounded-xl border border-dashed border-slate-300/80 dark:border-white/20 bg-white/10 backdrop-blur-sm p-4 text-center space-y-3">
                        <div className="w-9 h-9 mx-auto rounded-full bg-white/20 dark:bg-[#132C40] text-[#1D72B8] dark:text-[#2E96D8] flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-semibold text-[#132C40] dark:text-slate-200">
                          {t.comparison.slotLabel} {slotNumber}
                        </p>
                        <select
                          aria-label={`Add service to slot ${slotNumber}`}
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              onToggleCompare(e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2 text-xs font-medium bg-white/10 backdrop-blur-md border border-slate-300/70 dark:border-white/20 rounded-lg text-[#132C40] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D72B8] cursor-pointer"
                        >
                          <option value="" className="bg-white dark:bg-[#0B1724] text-[#132C40] dark:text-white">
                            {t.comparison.addServicePlaceholder}
                          </option>
                          {remainingServices.map((svc) => (
                            <option
                              key={svc.id}
                              value={svc.id}
                              className="bg-white dark:bg-[#0B1724] text-[#132C40] dark:text-white"
                            >
                              {t.services.names[svc.id] || svc.name} ({svc.responseSla})
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {selectedServices.length > 0 ? (
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/10">
                {specRows.map((row) => (
                  <tr
                    key={row.key}
                    className="hover:bg-white/15 dark:hover:bg-white/5 transition-colors"
                  >
                    <th
                      scope="row"
                      className="sticky start-0 z-10 px-5 py-4 text-sm font-semibold text-[#132C40] dark:text-slate-200 bg-[#EBF1F8]/85 dark:bg-[#0B1724]/85 backdrop-blur-md border-e border-slate-200/70 dark:border-white/10 align-top"
                    >
                      {row.label}
                    </th>
                    {selectedServices.map((service) => (
                      <td
                        key={`${service.id}-${row.key}`}
                        className="px-5 py-4 border-r last:border-r-0 border-slate-200/60 dark:border-white/10 align-top"
                      >
                        {row.renderValue(service)}
                      </td>
                    ))}
                    {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                      <td
                        key={`empty-${row.key}-${idx}`}
                        className="px-5 py-4 border-r last:border-r-0 border-slate-200/60 dark:border-white/10 text-sm text-slate-400 dark:text-slate-600 align-top"
                      >
                        —
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Dispatch Booking Row */}
                <tr className="bg-white/10 backdrop-blur-md">
                  <th
                    scope="row"
                    className="sticky start-0 z-10 px-5 py-4 text-sm font-semibold text-[#132C40] dark:text-slate-200 bg-[#EBF1F8]/85 dark:bg-[#0B1724]/85 backdrop-blur-md border-e border-slate-200/70 dark:border-white/10"
                  >
                    {t.comparison.rows.scheduleService}
                  </th>
                  {selectedServices.map((service) => (
                    <td
                      key={`${service.id}-action`}
                      className="px-5 py-4 border-r last:border-r-0 border-slate-200/60 dark:border-white/10"
                    >
                      <button
                        type="button"
                        onClick={() => onBookService(service.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] transition-colors cursor-pointer min-h-[40px] whitespace-nowrap"
                      >
                        <span>
                          {t.services.bookPrefix} {t.services.names[service.id] || service.name}
                        </span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                    <td
                      key={`empty-action-${idx}`}
                      className="px-5 py-4 border-r last:border-r-0 border-slate-200/60 dark:border-white/10"
                    />
                  ))}
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    {t.comparison.emptyState}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};
