import { useCallback, useRef } from 'react';

export function useSpotlight() {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, []);

  return { ref, handleMouseMove };
}

export const SPOTLIGHT_OVERLAY_CLASS =
  'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500';

export const SPOTLIGHT_OVERLAY_STYLE = {
  background:
    'radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(219,39,119,0.15), transparent 70%)',
};
