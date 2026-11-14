import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, X } from 'lucide-react';
import { OFFICES, SERVICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId, ServiceCategory } from '../types/kelvis';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceId: string;
  defaultRegionId: RegionId;
  onProceedToBooking: (serviceId: string, regionId: RegionId) => void;
}

type FacilityScaleId = 'zone' | 'floor' | 'campus';

const FACILITY_SCALES: {
  id: FacilityScaleId;
  label: string;
  sublabel: string;
  multiplier: number;
}[] = [
  { id: 'zone', label: 'Single Zone', sublabel: '< 500 sqm', multiplier: 1 },
  {
    id: 'floor',
    label: 'Multi-Floor',
    sublabel: '500–2,500 sqm',
    multiplier: 2.3,
  },
  {
    id: 'campus',
    label: 'Campus / Portfolio',
    sublabel: '2,500+ sqm',
    multiplier: 4.8,
  },
];

const BASE_ESTIMATE_GBP: Record<
  Exclude<ServiceCategory, 'all' | 'engineering' | 'video-reels'>,
  [number, number]
> = {
  mep: [380, 690],
  build: [650, 1350],
  'security-it': [460, 880],
  grounds: [260, 520],
};

const CURRENCY_CONFIG: Record<
  RegionId,
  { symbol: string; rate: number; code: string }
> = {
  london: { symbol: '£', rate: 1, code: 'GBP' },
  germany: { symbol: '€', rate: 1.18, code: 'EUR' },
  dubai: { symbol: 'AED ', rate: 4.65, code: 'AED' },
};

interface QuoteReceipt {
  referenceCode: string;
  serviceName: string;
  regionLabel: string;
  facilitySize: string;
  estimatedRange: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultServiceId,
  defaultRegionId,
  onProceedToBooking,
}) => {
  const [serviceId, setServiceId] = useState(defaultServiceId);
  const [regionId, setRegionId] = useState<RegionId>(defaultRegionId);
  const [scaleId, setScaleId] = useState<FacilityScaleId>('zone');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<QuoteReceipt | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setServiceId(defaultServiceId);
      setRegionId(defaultRegionId);
      setErrorMsg('');
    }
  }, [isOpen, defaultServiceId, defaultRegionId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) || SERVICES[0],
    [serviceId]
  );

  const activeScale = useMemo(
    () =>
      FACILITY_SCALES.find((s) => s.id === scaleId) || FACILITY_SCALES[0],
    [scaleId]
  );

  const estimate = useMemo(() => {
    const [baseMin, baseMax] = BASE_ESTIMATE_GBP[activeService.category];
    const currency = CURRENCY_CONFIG[regionId];
    const roundToTen = (val: number) => Math.round(val / 10) * 10;

    const minVal = roundToTen(baseMin * activeScale.multiplier * currency.rate);
    const maxVal = roundToTen(baseMax * activeScale.multiplier * currency.rate);

    return {
      formatted: `${currency.symbol}${minVal.toLocaleString()} – ${currency.symbol}${maxVal.toLocaleString()}`,
      code: currency.code,
    };
  }, [activeService.category, activeScale.multiplier, regionId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg('Enter your name and work email.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: activeService.id,
          serviceName: activeService.name,
          regionId,
          facilitySize: `${activeScale.label} (${activeScale.sublabel})`,
          estimatedRange: `${estimate.formatted} ${estimate.code}`,
          clientName,
          clientEmail,
          brief,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error || 'Could not submit quote request.');
        return;
      }
      setReceipt(data.quote);
      setClientName('');
      setClientEmail('');
      setBrief('');
    } catch {
      setErrorMsg('Network issue. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setReceipt(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-quote-title"
      onClick={handleCloseAndReset}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden text-[#132C40] dark:text-slate-100 max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="bg-[#132C40] dark:bg-[#0B1724] text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1D72B8]/25 border border-[#2E96D8]/40 text-[#D49A4A] flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D49A4A]">
                {t.quickQuote.eyebrow}
              </p>
              <h2
                id="quick-quote-title"
                className="font-display text-lg font-bold leading-tight text-white"
              >
                {t.quickQuote.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAndReset}
            aria-label="Close Quick Quote"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {receipt ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {t.quickQuote.loggedTitle}
                  </p>
                  <p dir="ltr" className="font-mono text-xl font-bold text-[#132C40] dark:text-white tabular-nums">
                    {receipt.referenceCode}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F6F9FC] dark:bg-[#0B1724] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.labelService}
                  </span>
                  <span className="font-semibold text-[#132C40] dark:text-white">
                    {t.services.names[activeService.id] || receipt.serviceName}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.labelHub}
                  </span>
                  <span className="font-semibold text-[#132C40] dark:text-white">
                    {receipt.regionLabel}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.labelScope}
                  </span>
                  <span className="font-semibold text-[#132C40] dark:text-white">
                    {receipt.facilitySize}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.labelEstimate}
                  </span>
                  <span dir="ltr" className="font-mono font-bold text-[#1D72B8] dark:text-[#2E96D8] tabular-nums">
                    {receipt.estimatedRange}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.quickQuote.followUpNote}
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-5 py-3 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-[#132C40] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#132C40] transition-colors cursor-pointer min-h-[44px]"
                >
                  {t.quickQuote.returnHome}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const svcId = activeService.id;
                    const regId = regionId;
                    handleCloseAndReset();
                    onProceedToBooking(svcId, regId);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>{t.quickQuote.scheduleDispatch}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs font-medium text-red-700 dark:text-red-300"
                >
                  {errorMsg}
                </div>
              )}

              {/* Live Estimate Preview Box */}
              <div className="p-4 rounded-xl bg-[#F6F9FC] dark:bg-[#0B1724] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.guideEstimate}
                  </span>
                  <span dir="ltr" className="font-mono text-xl sm:text-2xl font-bold text-[#132C40] dark:text-white tabular-nums">
                    {estimate.formatted}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {t.quickQuote.targetSla}
                  </span>
                  <span dir="ltr" className="font-mono text-xs font-semibold text-[#1D72B8] dark:text-[#2E96D8] tabular-nums">
                    {activeService.responseSla}
                  </span>
                </div>
              </div>

              {/* Service & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="quote-service"
                    className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                  >
                    {t.quickQuote.serviceDiscipline}
                  </label>
                  <select
                    id="quote-service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D72B8] min-h-[44px]"
                  >
                    {SERVICES.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {t.services.names[svc.id] || svc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    {t.quickQuote.regionalHub}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {OFFICES.map((office) => {
                      const active = office.id === regionId;
                      return (
                        <button
                          key={office.id}
                          type="button"
                          onClick={() => setRegionId(office.id)}
                          className={`px-2 py-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[44px] cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                              : 'bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {office.id === 'germany'
                            ? t.regions.germany
                            : office.id === 'dubai'
                              ? t.regions.dubai
                              : t.regions.london}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Facility Size Tier */}
              <div>
                <span className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  {t.quickQuote.facilityFootprint}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {FACILITY_SCALES.map((tier) => {
                    const active = tier.id === scaleId;
                    const localizedTier = t.quickQuote.tiers[tier.id];
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setScaleId(tier.id)}
                        className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#132C40] dark:bg-[#1D72B8] border-[#132C40] dark:border-[#1D72B8] text-white'
                            : 'bg-slate-50 dark:bg-[#0B1724] border-slate-200 dark:border-slate-700 text-[#132C40] dark:text-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-xs font-semibold truncate">
                          {localizedTier.label}
                        </span>
                        <span
                          className={`block font-mono text-[10px] tabular-nums ${
                            active ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {localizedTier.sublabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <input
                  id="quote-name"
                  type="text"
                  required
                  aria-label="Your Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t.quickQuote.namePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1D72B8] min-h-[44px]"
                />
                <input
                  id="quote-email"
                  type="email"
                  required
                  aria-label="Work Email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder={t.quickQuote.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1D72B8] min-h-[44px]"
                />
              </div>

              <input
                id="quote-brief"
                type="text"
                aria-label="Scope brief or postcode"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder={t.quickQuote.briefPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1D72B8] min-h-[44px]"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 text-sm font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] disabled:opacity-60 rounded-xl transition-colors min-h-[48px] cursor-pointer"
              >
                {submitting ? t.quickQuote.submitting : t.quickQuote.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
