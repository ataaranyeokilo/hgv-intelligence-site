"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const AUTO_ADVANCE_MS = 5000;
const CARD_GAP_PX = 24;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FeaturedReportsScrollerProps = {
  children: ReactNode;
  itemCount: number;
};

export function FeaturedReportsScroller({
  children,
  itemCount,
}: FeaturedReportsScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stepPx, setStepPx] = useState(0);

  const items = Children.toArray(children);
  const loopEnabled = itemCount > 1;

  const measureStep = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const firstCard = viewport.querySelector<HTMLElement>("[data-scroll-card]");
    if (!firstCard) return;
    setStepPx(firstCard.offsetWidth + CARD_GAP_PX);
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    return () => window.removeEventListener("resize", measureStep);
  }, [measureStep, itemCount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const disableThenEnableAnimation = useCallback(() => {
    setAnimate(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loopEnabled) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      setIndex((current) => {
        if (current !== itemCount) return current;
        disableThenEnableAnimation();
        return 0;
      });
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [disableThenEnableAnimation, itemCount, loopEnabled]);

  useEffect(() => {
    if (!loopEnabled || !reduceMotion || index !== itemCount) return;
    setIndex(0);
  }, [index, itemCount, loopEnabled, reduceMotion]);

  const goNext = useCallback(() => {
    if (!loopEnabled) return;
    setAnimate(true);
    setIndex((current) => (current >= itemCount ? current : current + 1));
  }, [itemCount, loopEnabled]);

  const goPrev = useCallback(() => {
    if (!loopEnabled) return;
    if (index === 0) {
      setAnimate(false);
      setIndex(itemCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(itemCount - 1);
        });
      });
      return;
    }
    setAnimate(true);
    setIndex((current) => current - 1);
  }, [index, itemCount, loopEnabled]);

  useEffect(() => {
    if (!loopEnabled || paused || reduceMotion || stepPx === 0) return;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, loopEnabled, paused, reduceMotion, stepPx]);

  if (itemCount === 0) return null;

  const showControls = loopEnabled;
  const transitionClass =
    animate && !reduceMotion
      ? "transition-transform duration-500 ease-in-out"
      : "";

  const renderCard = (child: ReactNode, key: string) => (
    <div
      key={key}
      data-scroll-card
      className="w-[280px] shrink-0 sm:w-[320px]"
    >
      {child}
    </div>
  );

  const trackItems = loopEnabled
    ? [
        ...items.map((child, childIndex) =>
          renderCard(child, `orig-${childIndex}`),
        ),
        ...items.map((child, childIndex) =>
          renderCard(child, `clone-${childIndex}`),
        ),
      ]
    : items.map((child, childIndex) => renderCard(child, `single-${childIndex}`));

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className={`flex gap-6 ${transitionClass}`}
          style={{
            transform:
              stepPx > 0 ? `translateX(-${index * stepPx}px)` : undefined,
          }}
        >
          {trackItems}
        </div>
      </div>

      {showControls ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50"
            aria-label="Previous report"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50"
            aria-label="Next report"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
