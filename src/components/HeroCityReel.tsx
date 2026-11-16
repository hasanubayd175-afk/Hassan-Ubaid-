import React, { useEffect, useState } from 'react';
import { MapPin, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { IMAGES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId } from '../types/kelvis';
import { ResilientImage } from './ResilientImage';

interface ReelClip {
  id: RegionId;
  city: string;
  label: string;
  subtitle: string;
  image: string;
}

const HERO_CLIPS: ReelClip[] = [
  {
    id: 'london',
    city: 'London, UK',
    label: 'London',
    subtitle: 'City of London & Bishopsgate Hub',
    image: IMAGES.londonHub,
  },
  {
    id: 'germany',
    city: 'Germany',
    label: 'Germany',
    subtitle: 'Frankfurt Financial District & Munich',
    image: IMAGES.germanyHub,
  },
  {
    id: 'dubai',
    city: 'Dubai, UAE',
    label: 'Dubai',
    subtitle: 'Downtown Dubai & Boulevard Plaza',
    image: IMAGES.dubaiHub,
  },
];

const CLIP_DURATION_MS = 6500;

interface HeroCityReelProps {
  onSelectRegion?: (regionId: RegionId) => void;
  children: React.ReactNode;
}

export const HeroCityReel: React.FC<HeroCityReelProps> = ({
  onSelectRegion,
  children,
}) => {
  const [clipIndex, setClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setClipIndex((prev) => (prev + 1) % HERO_CLIPS.length);
    }, CLIP_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const activeClip = HERO_CLIPS[clipIndex];

  const getCityLabel = (id: RegionId) =>
    id === 'germany'
      ? t.regions.germany
      : id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  const getCitySubtitle = (id: RegionId) =>
    id === 'germany'
      ? t.hero.germanySub
      : id === 'dubai'
        ? t.hero.dubaiSub
        : t.hero.londonSub;

  const handleSelectClip = (idx: number) => {
    setClipIndex(idx);
    onSelectRegion?.(HERO_CLIPS[idx].id);
  };

  return (
    <section
      className="relative bg-[#0B1926] text-white overflow-hidden min-h-[500px] md:min-h-[560px] flex flex-col justify-between"
    >
      {/* Full-Section GPU-Stabilized Multi-City Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {HERO_CLIPS.map((clip, idx) => {
          const isCurrent = idx === clipIndex;
          return (
            <div
              key={clip.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <ResilientImage
                src={clip.image}
                alt={`${clip.city} — ${clip.subtitle}`}
                priority={idx === 0}
                className={`w-full h-full object-cover ${
                  !prefersReducedMotion
                    ? isPlaying
                      ? 'animate-ken-burns'
                      : 'animate-ken-burns animate-ken-burns-paused'
                    : ''
                }`}
              />
            </div>
          );
        })}

        {/* Measured Contrast Scrim keeping whole-section backdrop vividly visible */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#07111C]/88 via-[#0B1926]/55 to-[#0B1926]/25" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#07111C]/80 via-transparent to-[#07111C]/35" />
      </div>

      {/* Main Hero Content Slot */}
      <div className="relative z-30 flex-1 flex items-center py-14 md:py-18">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>

      {/* Clean Bottom City Reel Bar (No Timer) */}
      <div className="relative z-30 border-t border-white/15 bg-[#07111C]/65 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm text-slate-200 min-w-0">
            <MapPin className="w-4 h-4 text-[#D49A4A] shrink-0" />
            <span className="font-semibold text-white whitespace-nowrap">
              {getCityLabel(activeClip.id)}
            </span>
            <span className="hidden sm:inline text-white/40" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline text-slate-300 truncate">
              {getCitySubtitle(activeClip.id)}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div
              role="tablist"
              aria-label="Hero showcase cities"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/10 border border-white/15"
            >
              {HERO_CLIPS.map((clip, idx) => {
                const active = idx === clipIndex;
                return (
                  <button
                    key={clip.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectClip(idx)}
                    className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#D49A4A] text-[#0E2233]'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {getCityLabel(clip.id)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause background showcase' : 'Play background showcase'}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1D72B8] border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
