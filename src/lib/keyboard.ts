import { useEffect, useState } from "react";

/**
 * True while the on-screen keyboard is covering the viewport.
 *
 * There is no "keyboard" event: browsers only shrink the *visual* viewport, so
 * a gap between `window.innerHeight` and `visualViewport.height` beyond a
 * tolerant threshold is the keyboard. The threshold matters — mobile Safari
 * reports a few pixels of difference just from a collapsing address bar, and
 * reacting to that would flicker the tab bar on every scroll.
 */
export function useKeyboardOpen(thresholdPx = 140) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const covered = window.innerHeight - viewport.height;
      // Only a genuine keyboard (not the collapsing URL bar) counts, and only
      // when the page is not zoomed in — a pinch-zoom also shrinks viewport.height.
      const zoomed = Math.abs((viewport.scale ?? 1) - 1) > 0.05;
      setOpen(!zoomed && covered > thresholdPx);
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, [thresholdPx]);

  return open;
}