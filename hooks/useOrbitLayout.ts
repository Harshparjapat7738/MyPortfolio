"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Breathing room kept between adjacent pills' edges, and between a pill and
// the ring's own inner/outer bounds, at full (unshrunk) scale — shrinks
// along with everything else if the ring ever has to shrink pills to fit
// them all (see calculateOrbitLayout below).
const GAP_PX = 14;
const EDGE_MARGIN_PX = 10;
// However tight the ring gets, pills never shrink past this — past a
// certain point a smaller-but-legible ring (or, per the cap in Hero.tsx, a
// ring carrying fewer of the badges) is the right trade, not a pill so
// small its label stops being readable.
const MIN_SCALE = 0.78;

export interface OrbitLayout {
  /** Radius of the shared circular path, in px. */
  radiusPx: number;
  /** Uniform shrink applied to every pill (1 = full size) when the ring
   *  couldn't grow enough to fit everyone at their natural size. */
  scale: number;
  /** One offset-distance percentage per pill, in the same order passed in. */
  distances: number[];
}

/**
 * Lays a row of orbiting pills of arbitrary, unequal widths on a single
 * ring around a center photo with zero overlap — for however many pills
 * there are and however long their labels are, not just whatever count and
 * lengths it was first tuned for. Equal-angle placement (`index / count`)
 * only avoids overlap by luck, since it ignores each pill's actual
 * rendered width; this measures every pill for real and gives each one
 * exactly the arc-length its own width needs. If they still can't all fit
 * within the available ring at full size, every pill (and the gap between
 * them) shrinks by the same factor until they do.
 *
 * Returns refs to attach to the ring container, the center element the
 * ring is built around, and each pill (in order) — plus the computed
 * layout once measurement has run (null until then, so callers have a
 * sane fallback to render for that first frame).
 */
export function useOrbitLayout(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [layout, setLayout] = useState<OrbitLayout | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const center = centerRef.current;
    if (!container || !center) return;

    const measure = () => {
      const containerSize = container.getBoundingClientRect().width;
      // The ring is display:none below the orbit breakpoint — nothing to
      // measure yet (widths would all read as 0 anyway).
      if (containerSize === 0) return;

      const items = itemRefs.current.slice(0, count);
      if (items.some((el) => !el)) return;
      // offsetWidth/offsetHeight are the pre-transform layout size, so a
      // scale already applied from a previous measurement (see `scale`
      // above) can't contaminate this one the way getBoundingClientRect's
      // painted size would.
      const widths = items.map((el) => el?.offsetWidth ?? 0);
      const heights = items.map((el) => el?.offsetHeight ?? 0);
      if (widths.some((w) => w === 0)) return;

      setLayout(
        calculateOrbitLayout({
          widths,
          pillHeight: Math.max(...heights),
          containerSize,
          centerSize: center.getBoundingClientRect().width,
        })
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [count]);

  return { containerRef, centerRef, itemRefs, layout };
}

function calculateOrbitLayout({
  widths,
  pillHeight,
  containerSize,
  centerSize,
}: {
  widths: number[];
  pillHeight: number;
  containerSize: number;
  centerSize: number;
}): OrbitLayout {
  const count = widths.length;
  const totalWidth = widths.reduce((sum, w) => sum + w, 0) + count * GAP_PX;
  const idealRadius = totalWidth / (2 * Math.PI);

  // Pills never rotate (offset-rotate is pinned to 0deg — that's the
  // whole point, see the module CSS), so how far a pill's own edge
  // reaches along the radius varies continuously as it travels the ring —
  // from its half-height at 12/6 o'clock to its (usually larger)
  // half-width at 3/9 o'clock. Sizing every pill for that worst-case peak
  // (its full half-width, which it only actually touches for an instant
  // per lap) would force pills this size down to an illegible sliver
  // whenever there isn't much room between the photo and the column edge
  // — the one hard, explicit requirement is that pills never overlap
  // *each other* (guaranteed below by giving each one exactly the
  // arc-length its own width needs, independent of this radius choice).
  // What's used here instead is each pill's reach *averaged* over a full
  // lap — the mean of halfW·|cosθ| + halfH·|sinθ| over θ∈[0,2π) works out
  // to (2/π)·(halfW+halfH) — so the ring is sized for what a pill
  // typically needs clear of the photo, not the one brief moment it
  // needs the most.
  const requiredClearance = Math.max(...widths.map((w) => w + pillHeight)) / Math.PI;

  // Never let the ring sit closer to center than the photo's own edge
  // (+ whichever pill needs the most clearance at its own angle), and
  // never let it grow past the container's edge (+ the same allowance),
  // so every pill stays fully clear of the photo and fully inside the
  // column, at whatever angle it ends up at. Both bounds are expressed at
  // full (unshrunk) pill size — `requiredClearance` shrinks right along
  // with everything else once `scale` is known below, which is exactly
  // what the shrink-to-fit branch solves for.
  // At any given scale s, the ring's radius has to sit inside
  // [lowerBound(s), upperBound(s)] — both shift as s does, since
  // `requiredClearance` shrinks along with the pills:
  const lowerBound = (s: number) => centerSize / 2 + requiredClearance * s + EDGE_MARGIN_PX;
  const upperBound = (s: number) => containerSize / 2 - requiredClearance * s - EDGE_MARGIN_PX;

  let scale: number;
  let radiusPx: number;

  if (lowerBound(1) <= upperBound(1)) {
    // Full size fits somewhere in the valid band. Use whichever radius is
    // closer to natural — the ring's own ideal (circumference-matching)
    // size, clamped into that band. If the band's ceiling is what ends up
    // binding (ideal was too big for the container), the *pills* still
    // need to shrink to match that smaller circumference, or they'd
    // overlap each other even while each safely clears the photo.
    scale = 1;
    radiusPx = Math.min(Math.max(idealRadius, lowerBound(1)), upperBound(1));
    if (radiusPx < idealRadius) {
      scale = radiusPx / idealRadius;
    }
  } else {
    // Doesn't fit even at full size — the band itself is empty at s=1,
    // meaning this container is simply too tight for full-size pills to
    // ever clear both the photo and its own edge at once, regardless of
    // how they're arranged around the ring. Shrink pills (and therefore
    // their clearance need) until the band opens up: since lowerBound
    // grows and upperBound shrinks with s at the same rate
    // (requiredClearance·s on each side), solving lowerBound(s) =
    // upperBound(s) gives the exact largest s where a valid radius first
    // exists.
    const band = containerSize / 2 - centerSize / 2 - 2 * EDGE_MARGIN_PX;
    scale = Math.max(band / (2 * requiredClearance), 0.01);
    radiusPx = lowerBound(scale);
  }

  // Below MIN_SCALE, pills stop being legible — floor it and recompute the
  // radius each branch would have used at that floor instead. Recomputing
  // rather than just clamping `scale` keeps the ring sized for what pills
  // actually need clearance-wise at their real (floored) size; in the rare
  // case that's still not quite enough room, .hero's own overflow:hidden
  // clips the small remainder rather than it affecting page layout.
  if (scale < MIN_SCALE) {
    scale = MIN_SCALE;
    radiusPx = Math.min(Math.max(idealRadius * scale, lowerBound(scale)), upperBound(scale));
  }

  const circumference = radiusPx * 2 * Math.PI;

  const distances: number[] = [];
  let cursor = 0;
  for (const width of widths) {
    const scaledWidth = width * scale;
    const center = cursor + scaledWidth / 2;
    distances.push(circumference > 0 ? (center / circumference) * 100 : 0);
    cursor += scaledWidth + GAP_PX * scale;
  }

  return { radiusPx, scale, distances };
}
