import Lenis from 'lenis';

let activeLenis: Lenis | null = null;

function isInsideScrollableContainer(node: HTMLElement | null): boolean {
  let current: HTMLElement | null = node;
  while (current && current !== document.body && current !== document.documentElement) {
    if (
      current.hasAttribute('data-lenis-prevent') ||
      current.getAttribute('role') === 'dialog' ||
      current.classList.contains('gm-style') ||
      current.classList.contains('leaflet-container')
    ) {
      return true;
    }

    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    const canScrollY =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      current.scrollHeight > current.clientHeight + 2;

    if (canScrollY) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}

export function initSmoothScroll(prefersReducedMotion: boolean): () => void {
  if (typeof window === 'undefined' || prefersReducedMotion) {
    return () => {};
  }

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.92,
    syncTouch: false,
    autoRaf: true,
    anchors: {
      offset: -72,
    },
    prevent: (node) => isInsideScrollableContainer(node),
  });

  activeLenis = lenis;

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          lenis.resize();
        })
      : null;

  if (resizeObserver) {
    resizeObserver.observe(document.body);
  }

  return () => {
    resizeObserver?.disconnect();
    lenis.destroy();
    if (activeLenis === lenis) {
      activeLenis = null;
    }
  };
}

export function scrollToTopSmooth(): void {
  if (activeLenis) {
    activeLenis.scrollTo(0, {
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function resizeSmoothScroll(): void {
  activeLenis?.resize();
}
