import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Captions,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Pause,
  Play,
  ShieldCheck,
  Video,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CLIENT_SPOTLIGHT_CLIPS } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId } from '../types/kelvis';
import { ResilientImage } from './ResilientImage';

interface ClientSuccessSpotlightProps {
  onBookRegion: (regionId: RegionId) => void;
  embedded?: boolean;
}

export const ClientSuccessSpotlight: React.FC<ClientSuccessSpotlightProps> = ({
  onBookRegion,
  embedded = false,
}) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [regionFilter, setRegionFilter] = useState<'all' | 'london' | 'germany'>(
    'all'
  );
  const [activeClipId, setActiveClipId] = useState<string>(
    CLIENT_SPOTLIGHT_CLIPS[0].id
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [theaterOpen, setTheaterOpen] = useState(false);

  const visibleClips = useMemo(() => {
    if (regionFilter === 'all') return CLIENT_SPOTLIGHT_CLIPS;
    return CLIENT_SPOTLIGHT_CLIPS.filter((c) => c.regionId === regionFilter);
  }, [regionFilter]);

  const activeIndex = useMemo(() => {
    const idx = visibleClips.findIndex((c) => c.id === activeClipId);
    return idx >= 0 ? idx : 0;
  }, [visibleClips, activeClipId]);

  const activeClip = visibleClips[activeIndex] || CLIENT_SPOTLIGHT_CLIPS[0];

  const frameIndex =
    elapsedSec >= activeClip.durationSec / 2 && activeClip.frames.length > 1
      ? 1
      : 0;
  const activeFrame = activeClip.frames[frameIndex] || activeClip.frames[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 1 >= activeClip.durationSec) {
          const nextIdx = (activeIndex + 1) % visibleClips.length;
          if (visibleClips[nextIdx]) {
            setActiveClipId(visibleClips[nextIdx].id);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeClip.durationSec, activeIndex, visibleClips]);

  const selectClip = (clipId: string) => {
    setActiveClipId(clipId);
    setElapsedSec(0);
    setIsPlaying(true);
  };

  const handleFilterChange = (nextFilter: 'all' | 'london' | 'germany') => {
    setRegionFilter(nextFilter);
    const nextList =
      nextFilter === 'all'
        ? CLIENT_SPOTLIGHT_CLIPS
        : CLIENT_SPOTLIGHT_CLIPS.filter((c) => c.regionId === nextFilter);
    if (nextList.length > 0 && !nextList.some((c) => c.id === activeClipId)) {
      setActiveClipId(nextList[0].id);
      setElapsedSec(0);
    }
  };

  const stepClip = (delta: -1 | 1) => {
    if (visibleClips.length === 0) return;
    const nextIdx =
      (activeIndex + delta + visibleClips.length) % visibleClips.length;
    selectClip(visibleClips[nextIdx].id);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPct = Math.min(
    100,
    (elapsedSec / activeClip.durationSec) * 100
  );

  return (
    <section
      id="client-spotlight"
      aria-label="Client Success Spotlight testimonial video clips"
      className={`relative overflow-hidden bg-gradient-to-br from-[#0B1928] via-[#102336] to-[#08131E] text-white transition-colors duration-200 ${
        embedded
          ? 'rounded-2xl border border-white/15 shadow-2xl py-8 md:py-12 px-4 sm:px-6 lg:px-8'
          : 'py-16 md:py-22'
      }`}
    >
      {/* Subtle Radial Studio Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(46,150,216,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(212,154,74,0.13),_transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div
        className={`relative z-10 w-full ${
          embedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }`}
      >
        {/* Centered Header + London / Germany Filter */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <span
              className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#56B4EE] inline-flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-[#D49A4A]" />
              <span>{t.spotlight.eyebrow}</span>
            </p>
            <span
              className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            {t.spotlight.titlePrefix}{' '}
            <span className="font-quote italic font-bold text-[#D49A4A] text-[1.12em] inline-block px-0.5">
              &amp;
            </span>{' '}
            {t.spotlight.titleSuffix}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.spotlight.subtitle}
          </p>

          <div
            role="tablist"
            aria-label="Filter spotlight video clips by region"
            className="mt-6 inline-flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15"
          >
            {(
              [
                { id: 'all', label: t.spotlight.filterAll },
                { id: 'london', label: t.regions.london },
                { id: 'germany', label: t.regions.germany },
              ] as const
            ).map((tab) => {
              const active = regionFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[36px] cursor-pointer ${
                    active
                      ? 'bg-[#D49A4A] text-[#0E2233] shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Studio Video Stage + Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 7 Cols: Featured Testimonial Reel Player */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden bg-white/8 backdrop-blur-md border border-white/15 shadow-2xl">
            <div className="relative aspect-[16/9] bg-[#07111C] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeClip.id}-${frameIndex}`}
                  initial={prefersReducedMotion ? false : { opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.25 }}
                  transition={{ duration: 0.55 }}
                  className="w-full h-full"
                >
                  <ResilientImage
                    src={activeFrame.image}
                    alt={`${activeClip.partnerName} — ${activeClip.clipTitle}`}
                    className={`w-full h-full object-cover animate-ken-burns ${
                      isPlaying && !prefersReducedMotion
                        ? ''
                        : 'animate-ken-burns-paused'
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#07111C] via-[#07111C]/25 to-[#07111C]/50" />

              {/* Top Overlay: Partner Pill + Metric + Action Controls */}
              <div className="absolute top-3.5 inset-x-3.5 sm:top-4 sm:inset-x-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  {activeClip.partnerLogo && (
                    <span
                      className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${
                        activeClip.logoCircleClass || 'bg-white'
                      } ring-2 ring-[#D49A4A]/70 shrink-0 shadow-md`}
                    >
                      <img
                        src={activeClip.partnerLogo}
                        alt={`${activeClip.partnerName} logo`}
                        className={
                          activeClip.partnerName.includes('Tesco')
                            ? 'w-[86%] h-auto object-contain'
                            : 'w-full h-full object-cover scale-[1.08]'
                        }
                      />
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#091826]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D49A4A] shrink-0" />
                    <span className="truncate">{t.spotlight.verifiedPartner}</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1D72B8]/85 backdrop-blur-md text-[11px] font-semibold text-white whitespace-nowrap">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{activeClip.regionLabel}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCaptionsOn((prev) => !prev)}
                    aria-pressed={captionsOn}
                    aria-label={
                      captionsOn ? t.spotlight.captionsOff : t.spotlight.captionsOn
                    }
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md border transition-colors cursor-pointer whitespace-nowrap ${
                      captionsOn
                        ? 'bg-[#D49A4A] border-[#D49A4A] text-[#0E2233]'
                        : 'bg-black/50 border-white/20 text-white hover:bg-black/75'
                    }`}
                  >
                    <Captions className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {captionsOn
                        ? t.spotlight.captionsOn
                        : t.spotlight.captionsOff}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheaterOpen(true)}
                    aria-label={t.spotlight.fullscreen}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md cursor-pointer transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Player Controls + Live Subtitle Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                {captionsOn && (
                  <div className="mb-3 inline-flex items-start gap-2 max-w-2xl px-3.5 py-2 rounded-xl bg-[#07111C]/85 backdrop-blur-md border border-white/15 text-xs text-slate-100 leading-snug shadow-lg">
                    <span
                      dir="ltr"
                      className="font-mono text-[10px] font-bold text-[#D49A4A] shrink-0 mt-0.5 tabular-nums"
                    >
                      [{activeFrame.timestamp}]
                    </span>
                    <span>{activeFrame.caption}</span>
                  </div>
                )}

                {/* Interactive Timeline Bar */}
                <div
                  role="slider"
                  aria-label="Partner video clip timeline"
                  aria-valuemin={0}
                  aria-valuemax={activeClip.durationSec}
                  aria-valuenow={elapsedSec}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      setElapsedSec((s) =>
                        Math.min(activeClip.durationSec - 1, s + 3)
                      );
                    } else if (e.key === 'ArrowLeft') {
                      setElapsedSec((s) => Math.max(0, s - 3));
                    }
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = Math.max(
                      0,
                      Math.min(1, (e.clientX - rect.left) / rect.width)
                    );
                    setElapsedSec(Math.floor(ratio * activeClip.durationSec));
                  }}
                  className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer mb-3"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#2E96D8] to-[#D49A4A] transition-[width] duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      aria-label={
                        isPlaying ? t.spotlight.pauseClip : t.spotlight.playClip
                      }
                      className="w-9 h-9 rounded-full bg-[#D49A4A] hover:bg-white text-[#0E2233] flex items-center justify-center transition-colors cursor-pointer shadow-md"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => stepClip(-1)}
                      aria-label="Previous client clip"
                      className="w-8 h-8 rounded-full bg-white/12 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepClip(1)}
                      aria-label="Next client clip"
                      className="w-8 h-8 rounded-full bg-white/12 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Live Equalizer Bars Indicator */}
                    <div
                      aria-hidden="true"
                      className="hidden sm:flex items-end gap-0.5 h-3.5 ms-2"
                    >
                      {[10, 14, 8, 13].map((heightPx, idx) => (
                        <span
                          key={idx}
                          className={`w-0.5 rounded-full bg-[#56B4EE] transition-all duration-300 ${
                            isPlaying ? 'opacity-95' : 'opacity-35'
                          }`}
                          style={{
                            height: isPlaying
                              ? `${((elapsedSec + idx * 3) % 10) + 5}px`
                              : `${Math.max(4, heightPx - 6)}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      dir="ltr"
                      className="px-2.5 py-0.5 rounded-full bg-white/12 border border-white/15 font-mono text-[10px] font-bold text-[#D49A4A] whitespace-nowrap"
                    >
                      {activeClip.outcomeMetric}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-xs text-slate-200 tabular-nums shrink-0"
                    >
                      {formatTime(elapsedSec)} / {activeClip.durationFormatted}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Partner Quote & Booking CTA Below Stage */}
            <div className="p-5 sm:p-6 flex flex-col justify-between gap-4 flex-1">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#56B4EE]">
                    {activeClip.partnerName} · {activeClip.serviceTag}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {activeClip.cityBadge}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  {activeClip.clipTitle}
                </h3>
                <blockquote className="font-quote italic text-lg sm:text-xl text-slate-100 leading-snug">
                  &ldquo;{activeClip.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    {activeClip.speakerName}
                  </p>
                  <p className="text-xs text-slate-300">{activeClip.speakerRole}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onBookRegion(activeClip.regionId)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D49A4A] hover:bg-white text-[#0E2233] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>
                    {t.spotlight.bookSimilar}{' '}
                    {activeClip.regionId === 'germany'
                      ? t.regions.germany
                      : t.regions.london}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Selectable Partner Video Reel Playlist */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {t.spotlight.clipPlaylistLabel} ({visibleClips.length})
              </p>
              <span className="text-[11px] text-[#D49A4A] font-medium">
                {t.regions.london} · {t.regions.germany}
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1 justify-between">
              {visibleClips.map((clip) => {
                const isSelected = clip.id === activeClip.id;
                return (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => selectClip(clip.id)}
                    className={`group w-full text-start rounded-2xl p-3.5 border backdrop-blur-md transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-white/14 border-[#D49A4A] ring-1 ring-[#D49A4A]/60 shadow-lg'
                        : 'bg-white/6 hover:bg-white/10 border-white/12'
                    }`}
                  >
                    <div className="relative w-28 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden bg-[#07111C] shrink-0">
                      <ResilientImage
                        src={clip.frames[0].image}
                        alt={clip.clipTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#D49A4A] text-[#0E2233]'
                              : 'bg-black/60 text-white group-hover:bg-[#1D72B8]'
                          }`}
                        >
                          {isSelected && isPlaying ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          )}
                        </span>
                      </div>
                      <span
                        dir="ltr"
                        className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 font-mono text-[10px] text-white tabular-nums"
                      >
                        {clip.durationFormatted}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                          {clip.partnerLogo && (
                            <span
                              className={`w-5 h-5 rounded-full overflow-hidden flex items-center justify-center ${
                                clip.logoCircleClass || 'bg-white'
                              } shrink-0`}
                            >
                              <img
                                src={clip.partnerLogo}
                                alt=""
                                className={
                                  clip.partnerName.includes('Tesco')
                                    ? 'w-[85%] h-auto object-contain'
                                    : 'w-full h-full object-cover scale-[1.08]'
                                }
                              />
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-[#56B4EE] truncate">
                            {clip.partnerName}
                          </span>
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-[#D49A4A] whitespace-nowrap shrink-0">
                          {clip.regionId === 'germany'
                            ? t.regions.germany
                            : t.regions.london}
                        </span>
                      </div>

                      <h4 className="font-display text-sm font-bold text-white leading-snug line-clamp-1">
                        {clip.clipTitle}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 truncate">
                        {clip.speakerName} · {clip.outcomeMetric}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Theater Lightbox for Active Video Clip */}
      {theaterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeClip.clipTitle}
          onClick={() => setTheaterOpen(false)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 bg-[#08131E] shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D49A4A]">
                  {activeClip.partnerName} · {activeClip.regionLabel}
                </p>
                <p className="font-display text-base font-bold text-white">
                  {activeClip.clipTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTheaterOpen(false)}
                aria-label="Close fullscreen clip"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <ResilientImage
                src={activeFrame.image}
                alt={activeClip.clipTitle}
                className={`w-full h-full object-cover animate-ken-burns ${
                  isPlaying && !prefersReducedMotion
                    ? ''
                    : 'animate-ken-burns-paused'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-5 flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-white max-w-2xl bg-black/60 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-white/15">
                  &ldquo;{activeClip.quote}&rdquo; — {activeClip.speakerName}
                </p>
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={
                    isPlaying ? t.spotlight.pauseClip : t.spotlight.playClip
                  }
                  className="w-11 h-11 rounded-full bg-[#D49A4A] text-[#0E2233] flex items-center justify-center shrink-0 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
