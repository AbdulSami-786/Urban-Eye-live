import { useState, useEffect, useSyncExternalStore } from "react";

// While the pointer is over a product card, flip through the lens tints the
// selected frame colour is sold in, so the shopper sees the range without
// clicking into the product. Lives in its own file so the card components stay
// fast-refresh friendly.
const LENS_CYCLE_MS = 900;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange) {
  const mq = window.matchMedia?.(REDUCED_MOTION_QUERY);
  if (!mq) return () => {};
  mq.addEventListener?.("change", onChange);
  return () => mq.removeEventListener?.("change", onChange);
}

export function usePrefersReducedMotion() {
  // useSyncExternalStore reads the current value during render, so there's no
  // effect writing state on mount (which would cause a second render pass).
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false,
    () => false
  );
}

// `count` is how many tints the frame comes in, `active` whether the card is
// hovered/focused, and `resetKey` (the frame colour) restarts the cycle when
// the shopper picks a different swatch, so the rail never points at a tint from
// the previous frame. Returns the index of the tint to show.
export function useLensCycle(count, active, resetKey) {
  // `step` counts how far into the current hover we are. The interval only ever
  // increments it, and the effect's cleanup returns it to 0 when the pointer
  // leaves or the frame colour changes — so each hover starts on the default
  // tint without any state being written during render or on mount.
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  const canCycle = active && count > 1 && !reduced;

  useEffect(() => {
    if (!canCycle) return;
    const id = setInterval(() => setStep((s) => s + 1), LENS_CYCLE_MS);
    return () => {
      clearInterval(id);
      setStep(0);
    };
  }, [canCycle, count, resetKey]);

  if (!canCycle) return 0;
  return step % count;
}
