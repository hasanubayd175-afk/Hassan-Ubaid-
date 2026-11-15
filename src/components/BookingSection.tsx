import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { OFFICES, SERVICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { BookingRecord, RegionId } from '../types/kelvis';
import { ResilientImage } from './ResilientImage';

interface BookingSectionProps {
  selectedServiceId: string;
  selectedRegionId: RegionId;
  onChangeService: (serviceId: string) => void;
  onChangeRegion: (regionId: RegionId) => void;
}

const TIME_WINDOWS = [
  '08:00–12:00',
  '12:00–16:00',
  '16:00–20:00',
  '24/7 Emergency',
];

const PROPERTY_TYPES: Array<'Commercial' | 'Residential' | 'Industrial'> = [
  'Commercial',
  'Residential',
  'Industrial',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServiceId,
  selectedRegionId,
  onChangeService,
  onChangeRegion,
}) => {
  const { t } = useLanguage();
  const todayStr = new Date().toISOString().split('T')[0];

  const [propertyType, setPropertyType] = useState<
    'Commercial' | 'Residential' | 'Industrial'
  >('Commercial');
  const [preferredDate, setPreferredDate] = useState(todayStr);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS[0]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingRecord | null>(null);
  const [recentBookings, setRecentBookings] = useState<
    Array<Partial<BookingRecord>>
  >([]);

  const activeService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];
  const activeServiceLabel =
    t.services.names[activeService.id] || activeService.name;
  const getRegionName = (id: RegionId) =>
    id === 'germany'
      ? t.regions.germany
      : id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => (res.ok ? res.json() : { bookings: [] }))
      .then((data) => {
        if (Array.isArray(data.bookings)) {
          setRecentBookings(data.bookings);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !clientName.trim() ||
      !clientEmail.trim() ||
      !clientPhone.trim() ||
      !siteAddress.trim()
    ) {
      setErrorMsg('Complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: activeService.id,
          serviceName: activeService.name,
          regionId: activeOffice.id,
          propertyType,
          preferredDate,
          timeWindow,
          clientName,
          clientEmail,
          clientPhone,
          siteAddress,
          notes,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not confirm booking.');
        return;
      }

      setConfirmedBooking(data.booking);
      setRecentBookings((prev) => [data.booking, ...prev].slice(0, 4));
      setClientName('');
      setClientEmail('');
      setClientPhone('');
      setSiteAddress('');
      setNotes('');
    } catch {
      setErrorMsg('Network issue. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="book"
      className="py-16 md:py-24 bg-[#EBF1F8] dark:bg-[#07111C] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#132C40] dark:text-white">
            {t.booking.heading}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-1.5">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Tesla-Style Visual Preview + Selection */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900">
              <ResilientImage
                src={activeService.image}
                alt={activeServiceLabel}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-neutral-300">
                    {getRegionName(activeOffice.id)} ·{' '}
                    <span dir="ltr" className="font-mono tabular-nums">
                      {activeService.responseSla} {t.services.sla}
                    </span>
                  </span>
                  <p className="font-display text-xl font-bold text-white">
                    {activeServiceLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="booking-service-select"
                  className="block text-sm font-medium text-neutral-600 dark:text-slate-300 mb-1.5"
                >
                  {t.booking.serviceLabel}
                </label>
                <select
                  id="booking-service-select"
                  value={activeService.id}
                  onChange={(e) => onChangeService(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-base font-medium bg-white dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 focus:border-[#132C40] dark:focus:border-[#2E96D8] rounded-xl text-[#132C40] dark:text-white focus:outline-none min-h-[44px]"
                >
                  {SERVICES.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {t.services.names[svc.id] || svc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  {t.booking.regionLabel}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {OFFICES.map((office) => {
                    const active = office.id === selectedRegionId;
                    return (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => onChangeRegion(office.id)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] cursor-pointer ${
                          active
                            ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                            : 'bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500'
                        }`}
                      >
                        {getRegionName(office.id)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  {t.booking.propertyLabel}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {PROPERTY_TYPES.map((pt) => {
                    const active = propertyType === pt;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPropertyType(pt)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] cursor-pointer ${
                          active
                            ? 'bg-[#2E96D8] text-white'
                            : 'bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500'
                        }`}
                      >
                        {pt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Streamlined Checkout / Confirmation */}
          <div className="lg:col-span-7 bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-8 rounded-2xl">
            {confirmedBooking ? (
              <div className="py-4">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {t.booking.confirmedLabel}
                    </p>
                    <h3
                      dir="ltr"
                      className="font-display text-2xl font-bold text-neutral-950 dark:text-white font-mono tabular-nums"
                    >
                      {confirmedBooking.referenceCode}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1724] border border-slate-100 dark:border-slate-800 text-sm sm:text-base mb-6">
                  <div>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 block">
                      {t.booking.serviceLabel}
                    </span>
                    <span className="font-semibold text-neutral-950 dark:text-white">
                      {t.services.names[confirmedBooking.serviceId] ||
                        confirmedBooking.serviceName}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 block">
                      {t.booking.regionLabel}
                    </span>
                    <span className="font-semibold text-neutral-950 dark:text-white">
                      {confirmedBooking.regionLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 block">
                      {t.booking.windowLabel}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-block font-semibold text-neutral-950 dark:text-white tabular-nums"
                    >
                      {confirmedBooking.preferredDate} · {confirmedBooking.timeWindow}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 block">
                      {t.booking.addressPlaceholder.replace(' *', '')}
                    </span>
                    <span className="font-semibold text-neutral-950 dark:text-white truncate block">
                      {confirmedBooking.siteAddress}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="px-6 py-3 text-sm sm:text-base font-semibold text-white bg-neutral-950 dark:bg-[#1D72B8] hover:bg-neutral-800 dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] rounded-xl min-h-[44px] cursor-pointer transition-colors"
                >
                  {t.booking.newBooking}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-transparent dark:border-red-900 text-sm font-medium text-red-700 dark:text-red-300"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-medium text-neutral-600 dark:text-slate-300 mb-1"
                    >
                      {t.booking.dateLabel}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="booking-date"
                        type="date"
                        min={todayStr}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full ps-10 pe-3.5 py-2.5 text-sm sm:text-base bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px] tabular-nums"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="booking-window"
                      className="block text-sm font-medium text-neutral-600 dark:text-slate-300 mb-1"
                    >
                      {t.booking.windowLabel}
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-neutral-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="booking-window"
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full ps-10 pe-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                      >
                        {TIME_WINDOWS.map((win) => (
                          <option key={win} value={win}>
                            {win}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    id="client-name"
                    type="text"
                    required
                    aria-label={t.booking.fullNamePlaceholder}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={t.booking.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                  />
                  <input
                    id="client-phone"
                    type="tel"
                    dir="ltr"
                    required
                    aria-label={t.booking.phonePlaceholder}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={t.booking.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    id="client-email"
                    type="email"
                    required
                    aria-label={t.booking.emailPlaceholder}
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={t.booking.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                  />
                  <input
                    id="site-address"
                    type="text"
                    required
                    aria-label={t.booking.addressPlaceholder}
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    placeholder={t.booking.addressPlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                  />
                </div>

                <input
                  id="booking-notes"
                  type="text"
                  aria-label={t.booking.notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.booking.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#132C40] dark:focus:ring-[#2E96D8] min-h-[44px]"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm sm:text-base font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1C3D58] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] disabled:opacity-60 rounded-xl transition-colors min-h-[48px] cursor-pointer"
                >
                  {submitting
                    ? t.booking.confirming
                    : `${t.booking.confirmPrefix} ${activeServiceLabel} ${t.booking.confirmSuffix}`.trim()}
                </button>
              </form>
            )}

            {recentBookings.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                {recentBookings.slice(0, 3).map((bk) => (
                  <div
                    key={bk.id || bk.referenceCode}
                    dir="ltr"
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono tabular-nums"
                  >
                    {bk.referenceCode} · {bk.serviceName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
