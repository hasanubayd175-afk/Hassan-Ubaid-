import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  X,
} from 'lucide-react';
import { INITIAL_REVIEWS, SERVICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { CustomerReview, RegionId } from '../types/kelvis';

export const ReviewsSection: React.FC = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [regionFilter, setRegionFilter] = useState<'all' | RegionId>('all');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const [authorName, setAuthorName] = useState('');
  const [organization, setOrganization] = useState('');
  const [regionId, setRegionId] = useState<RegionId>('london');
  const [serviceName, setServiceName] = useState(SERVICES[0].name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const filteredReviews = useMemo(() => {
    if (regionFilter === 'all') return reviews;
    return reviews.filter((r) => r.regionId === regionFilter);
  }, [reviews, regionFilter]);

  const safeSpotlightIndex =
    filteredReviews.length > 0 ? spotlightIndex % filteredReviews.length : 0;
  const activeSpotlight = filteredReviews[safeSpotlightIndex] || reviews[0];

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return '5.0';
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!authorName.trim() || !comment.trim()) {
      setErrorMsg('Name and feedback are required.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          organization,
          regionId,
          serviceName,
          rating,
          comment,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not submit review.');
        return;
      }

      setReviews((prev) => [data.review, ...prev]);
      setSpotlightIndex(0);
      setRegionFilter('all');
      setAuthorName('');
      setOrganization('');
      setComment('');
      setRating(5);
      setFormOpen(false);
    } catch {
      setErrorMsg('Network issue. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="trusted-owners"
      className="relative overflow-hidden min-h-[480px] md:min-h-[520px] flex items-center py-14 md:py-16 bg-gradient-to-br from-[#DCE8F5] via-[#E9EFF7] to-[#F3EDE3] dark:from-[#0B1928] dark:via-[#0F2133] dark:to-[#091522] transition-colors duration-200"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(29,114,184,0.12),_transparent_52%),radial-gradient(circle_at_bottom_left,_rgba(212,154,74,0.14),_transparent_52%)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <span
              className="w-10 h-px bg-gradient-to-r from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D72B8] dark:text-[#2E96D8]">
              {t.reviews.eyebrowPrefix} · {averageRating}
              {t.reviews.ratingSuffix}
            </p>
            <span
              className="w-10 h-px bg-gradient-to-l from-transparent to-[#D49A4A]"
              aria-hidden="true"
            />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#132C40] dark:text-white [text-wrap:balance]">
            {t.reviews.headingPrefix}{' '}
            <span className="font-quote italic font-bold text-[#C98A35] dark:text-[#D49A4A] text-[1.12em] inline-block px-0.5">
              &amp;
            </span>{' '}
            {t.reviews.headingSuffix}
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div
              role="tablist"
              aria-label="Filter reviews by region"
              className="inline-flex items-center gap-1 p-1 bg-white/90 dark:bg-[#102336] backdrop-blur-sm border border-slate-300/80 dark:border-slate-700 rounded-lg"
            >
              {(
                [
                  { id: 'all', label: t.reviews.all },
                  { id: 'london', label: t.regions.london },
                  { id: 'germany', label: t.regions.germany },
                  { id: 'dubai', label: t.regions.dubai },
                ] as const
              ).map((tab) => {
                const active = regionFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setRegionFilter(tab.id);
                      setSpotlightIndex(0);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[36px] cursor-pointer ${
                      active
                        ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1D72B8] hover:bg-[#132C40] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] rounded-lg min-h-[40px] whitespace-nowrap cursor-pointer transition-colors"
            >
              {t.reviews.writeReview}
            </button>
          </div>
        </div>

        {/* Single Clean Editorial Testimonial Spotlight */}
        {activeSpotlight && (
          <div className="max-w-4xl mx-auto">
            <article className="p-7 sm:p-10 rounded-2xl bg-[#132C40] dark:bg-[#102336] dark:border dark:border-slate-800 border-t-4 border-t-[#D49A4A] text-white flex flex-col justify-between gap-8 shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Quote className="w-8 h-8 text-[#D49A4A]" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < activeSpotlight.rating
                            ? 'text-[#D49A4A] fill-[#D49A4A]'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Distinct Editorial Testimonial Typography */}
                <blockquote className="font-quote italic font-semibold text-2xl sm:text-[1.75rem] leading-[1.38] text-white">
                  &ldquo;{activeSpotlight.comment}&rdquo;
                </blockquote>
              </div>

              <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-base font-bold text-white">
                    {activeSpotlight.authorName}
                  </p>
                  <p className="text-xs text-slate-300">
                    {activeSpotlight.organization} · {activeSpotlight.regionLabel} ·{' '}
                    <span className="text-[#D49A4A] font-semibold">
                      {activeSpotlight.serviceName}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {filteredReviews.length > 1 && (
                    <div className="flex items-center gap-1.5 mr-1">
                      {filteredReviews.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSpotlightIndex(idx)}
                          aria-label={`View testimonial ${idx + 1}`}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === safeSpotlightIndex
                              ? 'w-6 bg-[#D49A4A]'
                              : 'w-2 bg-white/25 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setSpotlightIndex(
                        (safeSpotlightIndex - 1 + filteredReviews.length) %
                          filteredReviews.length
                      )
                    }
                    aria-label="Previous testimonial"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D49A4A] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSpotlightIndex(
                        (safeSpotlightIndex + 1) % filteredReviews.length
                      )
                    }
                    aria-label="Next testimonial"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D49A4A] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {formOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Submit a review"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0E2233] border border-slate-200 dark:border-slate-700 p-6 text-[#132C40] dark:text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">{t.reviews.modalTitle}</h3>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={t.reviews.namePlaceholder}
                  className="px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white min-h-[44px]"
                />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={t.reviews.companyPlaceholder}
                  className="px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value as RegionId)}
                  className="px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white min-h-[44px]"
                >
                  <option value="london">{t.regions.london}</option>
                  <option value="germany">{t.regions.germany}</option>
                  <option value="dubai">{t.regions.dubai}</option>
                </select>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white min-h-[44px]"
                >
                  {SERVICES.map((svc) => (
                    <option key={svc.id} value={svc.name}>
                      {t.services.names[svc.id] || svc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  {t.reviews.ratingLabel}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} stars`}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= rating
                            ? 'text-[#D49A4A] fill-[#D49A4A]'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.reviews.experiencePlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 rounded-xl text-[#132C40] dark:text-white"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 text-sm font-semibold text-white bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] dark:hover:text-[#0E2233] rounded-xl min-h-[44px] cursor-pointer"
              >
                {submitting ? t.reviews.publishing : t.reviews.publishReview}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
