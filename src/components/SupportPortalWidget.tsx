import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Phone,
  QrCode,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { OFFICES, SERVICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId } from '../types/kelvis';

interface SupportPortalWidgetProps {
  selectedRegionId: RegionId;
  onSelectRegion: (regionId: RegionId) => void;
  onOpenBooking: (regionId: RegionId, serviceId?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'desk' | 'client';
  text: string;
  timestamp: string;
  suggestedServiceId?: string;
}

const QUICK_TOPICS = [
  {
    label: 'Emergency Dispatch',
    serviceId: 'plumbing',
    prompt: 'I need urgent emergency dispatch for a site issue.',
  },
  {
    label: 'HVAC & MEP Quote',
    serviceId: 'hvac',
    prompt: 'Requesting HVAC or MEP engineering assessment.',
  },
  {
    label: 'Security & IT',
    serviceId: 'security',
    prompt: 'Looking for CCTV, access control, or IT cabling.',
  },
  {
    label: 'Multi-Site SLA',
    serviceId: 'maintenance',
    prompt: 'Interested in a multi-site maintenance contract.',
  },
];

export const SupportPortalWidget: React.FC<SupportPortalWidgetProps> = ({
  selectedRegionId,
  onSelectRegion,
  onOpenBooking,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'desk',
      text: 'Welcome to Kelvix AI Assistant. Select a hub above, pick a service topic, or ask any question for instant booking support.',
      timestamp: 'Now',
    },
  ]);

  const { t } = useLanguage();
  const threadEndRef = useRef<HTMLDivElement>(null);
  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];

  const getRegionName = (id: RegionId) =>
    id === 'germany'
      ? t.regions.germany
      : id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  const activeRegionLabel = getRegionName(activeOffice.id);

  const cleanDigits = activeOffice.phone.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
    `Hello Kelvix Solutions (${activeOffice.city}), I would like to inquire about facility services.`
  )}`;

  const hotlineLabel = `${activeRegionLabel} ${t.widget.hotlineSuffix}`;

  const whatsappLabel =
    activeOffice.id === 'germany'
      ? 'WhatsApp DE'
      : activeOffice.id === 'dubai'
        ? 'WhatsApp UAE'
        : 'WhatsApp UK';

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const inferServiceId = (query: string, explicitId?: string) => {
    if (explicitId) return explicitId;
    const lower = query.toLowerCase();
    const matched = SERVICES.find(
      (s) =>
        lower.includes(s.name.toLowerCase()) ||
        lower.includes(s.id.toLowerCase())
    );
    return matched?.id;
  };

  const handleSend = async (textToSend?: string, explicitServiceId?: string) => {
    const clean = (textToSend ?? inputValue).trim();
    if (!clean || loading) return;

    const timeLabel = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const clientMsg: ChatMessage = {
      id: `client-${Date.now()}`,
      sender: 'client',
      text: clean,
      timestamp: timeLabel,
    };

    const lower = clean.toLowerCase();
    let targetRegion = selectedRegionId;
    if (lower.includes('germany') || lower.includes('munich') || lower.includes('frankfurt')) {
      targetRegion = 'germany';
      onSelectRegion('germany');
    } else if (lower.includes('dubai') || lower.includes('uae')) {
      targetRegion = 'dubai';
      onSelectRegion('dubai');
    } else if (lower.includes('london') || lower.includes('uk')) {
      targetRegion = 'london';
      onSelectRegion('london');
    }

    setMessages((prev) => [...prev, clientMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    const suggestedServiceId = inferServiceId(clean, explicitServiceId);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, regionId: targetRegion }),
      });
      const data = await res.json();
      const replyText =
        data?.reply ||
        `Our ${activeOffice.city} Client Support team (${activeOffice.phone}) is ready to assist. Select Open Booking Form below to schedule dispatch.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `desk-${Date.now()}`,
          sender: 'desk',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          suggestedServiceId,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `desk-${Date.now()}`,
          sender: 'desk',
          text: `Our ${activeOffice.city} hotline (${activeOffice.phone}) is available 24/7. Click Open Booking Form below to schedule your technician.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          suggestedServiceId,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bottom-Left: Blinking AI Assistant Floating Trigger & Panel */}
      <div className="fixed bottom-[62px] md:bottom-5 left-3 sm:left-6 z-40 flex flex-col items-start">
        {isOpen && (
          <section
            aria-label="Kelvix AI Assistant & Client Support"
            className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[370px] rounded-2xl bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden text-[#132C40] dark:text-slate-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#132C40] text-white px-4 py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#1D72B8]/25 border border-[#2E96D8]/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#D49A4A]" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-bold leading-tight truncate flex items-center gap-2">
                    <span>{t.widget.aiChat}</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E96D8] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D49A4A]" />
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-300 truncate">
                    {activeRegionLabel} · {t.widget.deskSubtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hub Toggle Strip */}
            <div className="px-4 py-2.5 bg-[#EBF1F8] dark:bg-[#0B1724] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                {OFFICES.map((office) => {
                  const active = office.id === selectedRegionId;
                  return (
                    <button
                      key={office.id}
                      type="button"
                      onClick={() => onSelectRegion(office.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#1D72B8] text-white'
                          : 'bg-white dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:text-[#132C40] dark:hover:text-white'
                      }`}
                    >
                      {getRegionName(office.id)}
                    </button>
                  );
                })}
              </div>

              <a
                href={`tel:${activeOffice.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#132C40] dark:text-slate-200 hover:text-[#1D72B8] dark:hover:text-[#2E96D8] shrink-0 tabular-nums"
              >
                <Phone className="w-3 h-3 text-[#1D72B8] dark:text-[#2E96D8]" />
                <span dir="ltr">{activeOffice.hubCode}</span>
              </a>
            </div>

            {/* Conversation Thread */}
            <div className="p-4 space-y-3 max-h-[250px] overflow-y-auto bg-white dark:bg-[#07111C]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'client' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'client'
                        ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white rounded-br-sm'
                        : 'bg-[#EEF3F9] dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 text-[#132C40] dark:text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.sender === 'desk' && msg.id !== 'welcome' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking(selectedRegionId, msg.suggestedServiceId);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D72B8] hover:bg-[#132C40] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>{t.widget.openBooking}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.sender === 'desk' ? 'Kelvix AI' : 'You'} · {msg.timestamp}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="text-[11px] text-[#1D72B8] dark:text-[#2E96D8] font-medium px-1 animate-pulse">
                  Checking hub schedule...
                </div>
              )}
              <div ref={threadEndRef} />
            </div>

            {/* Quick Topics */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-[#0B1724] border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => handleSend(topic.prompt, topic.serviceId)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-[#132C40] hover:bg-[#132C40] dark:hover:bg-[#1D72B8] border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-[#132C40] dark:text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-[#0E2233] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.widget.quickPromptPlaceholder}
                aria-label="Ask Kelvix AI Assistant"
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-[#07111C] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#1D72B8] dark:focus:border-[#2E96D8] min-h-[38px]"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] disabled:opacity-50 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </section>
        )}

        {/* Blinking AI Assistant Pill */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Kelvix AI Assistant' : 'Open Kelvix AI Assistant'}
          className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#0E2233] hover:bg-[#132C40] text-white border border-[#2E96D8]/60 shadow-2xl transition-all cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E96D8] opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D49A4A]" />
          </span>
          <Sparkles className="w-4 h-4 text-[#2E96D8] shrink-0" />
          <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
            {t.widget.aiChat}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1D72B8]/25 border border-[#2E96D8]/40 text-[10px] font-semibold text-[#2E96D8] animate-pulse">
            {t.widget.aiAssistant}
          </span>
        </button>
      </div>

      {/* Bottom-Right: WhatsApp + QR Dispatch + 24/7 Hotline Pill Group */}
      <div className="fixed bottom-[62px] md:bottom-5 right-3 sm:right-6 z-40 flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on ${whatsappLabel} for urgent maintenance`}
          className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xl transition-colors"
        >
          <span
            className="relative flex h-2.5 w-2.5 shrink-0"
            aria-hidden="true"
          >
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-85" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current shrink-0"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.24-8.25M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.54.12.16 1.72 2.62 4.17 3.68.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29-.25-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.64.8-.78.96-.14.16-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81Z" />
          </svg>
          <span className="hidden sm:inline whitespace-nowrap">{whatsappLabel}</span>
        </a>

        <button
          type="button"
          onClick={() => setQrOpen(true)}
          aria-label="Open quick QR dispatch card"
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0E2233] hover:bg-[#132C40] text-white border border-white/15 text-xs font-semibold shadow-xl transition-colors cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-[#2E96D8]" />
          <span className="whitespace-nowrap">{t.widget.scanQr}</span>
        </button>

        <a
          href={`tel:${activeOffice.phone.replace(/\s+/g, '')}`}
          aria-label={`Call ${hotlineLabel}: ${activeOffice.phone} for urgent maintenance`}
          className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#132C40] hover:bg-[#1D72B8] text-white border border-[#D49A4A]/60 text-xs font-bold shadow-xl transition-colors"
        >
          <span
            className="relative flex h-2.5 w-2.5 shrink-0"
            aria-hidden="true"
          >
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[#D49A4A] opacity-85" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D49A4A]" />
          </span>
          <Phone className="w-3.5 h-3.5 text-[#D49A4A] shrink-0" />
          <span className="hidden lg:inline whitespace-nowrap">{hotlineLabel}</span>
          <span dir="ltr" className="lg:hidden font-mono tabular-nums text-[11px]">24/7</span>
        </a>
      </div>

      {/* Quick QR Dispatch Pass Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kelvix Quick Dispatch Pass"
          onClick={() => setQrOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 p-6 text-center text-[#132C40] dark:text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold">
                {activeRegionLabel} · {activeOffice.hubCode}
              </h3>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mx-auto w-36 h-36 rounded-2xl bg-[#EEF3F9] dark:bg-[#0B1724] border-2 border-[#132C40] dark:border-[#2E96D8] flex flex-col items-center justify-center gap-2 mb-4">
              <Building2 className="w-10 h-10 text-[#132C40] dark:text-white" />
              <span dir="ltr" className="font-mono text-xs font-bold text-[#1D72B8] dark:text-[#2E96D8]">
                {activeOffice.hubCode} · DISPATCH
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              <strong>{activeRegionLabel}</strong>:<br />
              <span dir="ltr" className="inline-block font-mono font-bold text-[#132C40] dark:text-white">
                {activeOffice.phone}
              </span>
            </p>

            <button
              type="button"
              onClick={() => {
                setQrOpen(false);
                onOpenBooking(selectedRegionId);
              }}
              className="w-full py-2.5 rounded-xl bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.widget.openBooking}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
