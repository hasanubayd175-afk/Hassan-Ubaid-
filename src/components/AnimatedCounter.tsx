import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
  liveDriftStep?: number;
  liveDriftIntervalMs?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  suffix = '',
  durationMs = 1500,
  liveDriftStep = 0,
  liveDriftIntervalMs = 3600,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [liveOffset, setLiveOffset] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setDisplayValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !isVisible) return;

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue((target + liveOffset) * eased);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        setDisplayValue(target + liveOffset);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, target, durationMs, liveOffset]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !isVisible || liveDriftStep <= 0) return;

    const timer = window.setInterval(() => {
      setLiveOffset((prev) => {
        const next = prev + liveDriftStep;
        return next > liveDriftStep * 4 ? 0 : next;
      });
    }, liveDriftIntervalMs);

    return () => window.clearInterval(timer);
  }, [isVisible, liveDriftStep, liveDriftIntervalMs]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums inline-block transition-transform duration-300">
      {formatted}
      {suffix}
    </span>
  );
};
