import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { IMAGES, VIDEO_CHAPTERS } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { ResilientImage } from './ResilientImage';

const GALLERY_ITEMS = [
  { id: 'g1', title: 'Facility Operations', meta: 'London', image: IMAGES.hero },
  { id: 'g2', title: 'Plumbing & Piping', meta: 'London', image: IMAGES.plumbingReal },
  { id: 'g3', title: 'Electrical Switchgear', meta: 'Munich', image: IMAGES.electricalReal },
  { id: 'g4', title: 'HVAC Plant', meta: 'Frankfurt', image: IMAGES.mepHvac },
  { id: 'g5', title: 'Architectural Painting', meta: 'Dubai', image: IMAGES.paintingReal },
  { id: 'g6', title: 'Commercial Construction', meta: 'Dubai', image: IMAGES.constructionPainting },
  { id: 'g7', title: 'Security & IT Core', meta: 'Frankfurt', image: IMAGES.securityIt },
  { id: 'g8', title: 'Corporate Cleaning', meta: 'London', image: IMAGES.cleaningReal },
  { id: 'g9', title: 'Courtyard Gardening', meta: 'London', image: IMAGES.gardeningReal },
  { id: 'g10', title: 'Pest Prevention QA', meta: 'Munich', image: IMAGES.pestControlReal },
  { id: 'g11', title: 'Campus Maintenance', meta: 'Dubai', image: IMAGES.groundsCleaning },
  { id: 'g12', title: 'Engineering Leadership', meta: 'Global', image: IMAGES.teamHubs },
  { id: 'g13', title: 'London Financial Corridor', meta: 'London', image: IMAGES.londonHub },
  { id: 'g14', title: 'Frankfurt Financial Hub', meta: 'Germany', image: IMAGES.germanyHub },
  { id: 'g15', title: 'Downtown Dubai Boulevard', meta: 'Dubai', image: IMAGES.dubaiHub },
];

export const MediaShowreelSection: React.FC = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'photos' | 'video'>('photos');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [theaterOpen, setTheaterOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    title: string;
    meta: string;
    image: string;
  } | null>(null);

  const activeChapter = VIDEO_CHAPTERS[chapterIndex];
  const frameIndex =
    elapsedSec >= activeChapter.durationSec / 2 && activeChapter.frames.length > 1
      ? 1
      : 0;
  const activeFrame = activeChapter.frames[frameIndex];

  useEffect(() => {
    if (!isPlaying || viewMode !== 'video') return;
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 1 >= activeChapter.durationSec) {
          setChapterIndex((c) => (c + 1) % VIDEO_CHAPTERS.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, viewMode, activeChapter.durationSec]);

  const selectChapter = (idx: number) => {
    setChapterIndex(idx);
    setElapsedSec(0);
    setIsPlaying(true);
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
    (elapsedSec / activeChapter.durationSec) * 100
  );

  return (
    <div className="py-10 md:py-14 bg-[#EBF1F8] dark:bg-[#07111C] text-[#132C40] dark:text-slate-100 min-h-[60vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D72B8] dark:text-[#2E96D8] mb-2">
              {t.media.eyebrowPrefix}{' '}
              <span className="font-quote italic font-bold text-[#C98A35] dark:text-[#D49A4A] text-[1.2em] inline-block px-0.5">
                &amp;
              </span>{' '}
              {t.media.eyebrowSuffix}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#132C40] dark:text-white">
              {t.media.title}
            </h1>
          </div>
          <div
            role="tablist"
            aria-label="Media format"
            className="inline-flex items-center gap-1 p-1 bg-white dark:bg-[#102336] rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'photos'}
              onClick={() => setViewMode('photos')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-h-[38px] cursor-pointer ${
                viewMode === 'photos'
                  ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
              }`}
            >
              {t.media.realPhotos} ({GALLERY_ITEMS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'video'}
              onClick={() => setViewMode('video')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-h-[38px] cursor-pointer ${
                viewMode === 'video'
                  ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
              }`}
            >
              {t.media.videos}
            </button>
          </div>
        </div>

        {viewMode === 'photos' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#102336] border border-slate-200 dark:border-slate-800 shadow-sm text-left cursor-pointer aspect-[4/3]"
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3.5">
                  <p className="text-[11px] text-neutral-300">{item.meta}</p>
                  <p className="font-display text-sm font-semibold text-white truncate">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 aspect-[16/9]">
              <ResilientImage
                key={`${activeChapter.id}-${frameIndex}`}
                src={activeFrame.image}
                alt={activeChapter.title}
                className={`w-full h-full object-cover transition-opacity duration-700 animate-ken-burns ${
                  isPlaying ? '' : 'animate-ken-burns-paused'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              <button
                type="button"
                onClick={() => setTheaterOpen(true)}
                aria-label="Fullscreen theater view"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <p className="text-xs text-neutral-300 mb-1">
                  {activeChapter.regionLabel}
                </p>
                <h3 className="font-display text-lg sm:text-2xl font-semibold text-white mb-4">
                  {activeChapter.title}
                </h3>

                <div
                  role="slider"
                  aria-label="Film timeline"
                  aria-valuemin={0}
                  aria-valuemax={activeChapter.durationSec}
                  aria-valuenow={elapsedSec}
                  tabIndex={0}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = Math.max(
                      0,
                      Math.min(1, (e.clientX - rect.left) / rect.width)
                    );
                    setElapsedSec(Math.floor(ratio * activeChapter.durationSec));
                  }}
                  className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer mb-4"
                >
                  <div
                    className="h-full bg-white transition-[width] duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectChapter(
                          (chapterIndex - 1 + VIDEO_CHAPTERS.length) %
                            VIDEO_CHAPTERS.length
                        )
                      }
                      aria-label="Previous film"
                      className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectChapter(
                          (chapterIndex + 1) % VIDEO_CHAPTERS.length
                        )
                      }
                      aria-label="Next film"
                      className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <span dir="ltr" className="font-mono text-xs text-neutral-300 tabular-nums">
                    {formatTime(elapsedSec)} / {activeChapter.durationFormatted}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {VIDEO_CHAPTERS.map((chap, idx) => {
                const active = idx === chapterIndex;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => selectChapter(idx)}
                    className={`group relative rounded-xl overflow-hidden aspect-[16/9] border text-left cursor-pointer transition-all ${
                      active
                        ? 'border-[#132C40] dark:border-[#2E96D8] ring-2 ring-[#132C40] dark:ring-[#2E96D8]'
                        : 'border-slate-200 dark:border-slate-700 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={chap.frames[0].image}
                      alt={chap.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
                      <span className="font-display text-xs sm:text-sm font-medium text-white truncate">
                        {chap.title}
                      </span>
                      <span dir="ltr" className="font-mono text-[11px] text-neutral-300 tabular-nums shrink-0">
                        {chap.durationFormatted}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {theaterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeChapter.title}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-6xl rounded-2xl overflow-hidden border border-neutral-800 bg-black">
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
              <p className="font-display text-sm font-semibold text-white">
                {activeChapter.title}
              </p>
              <button
                type="button"
                onClick={() => setTheaterOpen(false)}
                aria-label="Close"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden">
              <ResilientImage
                src={activeFrame.image}
                alt={activeChapter.title}
                className={`w-full h-full object-cover animate-ken-burns ${
                  isPlaying ? '' : 'animate-ken-burns-paused'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800"
          >
            <div className="relative aspect-[16/10]">
              <ResilientImage
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close"
                className="absolute top-3 right-3 min-w-[44px] min-h-[44px] rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-white">
                {lightboxImage.title}
              </h3>
              <span className="text-xs text-neutral-400">{lightboxImage.meta}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
