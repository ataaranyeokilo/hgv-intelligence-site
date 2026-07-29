"use client";

import { useCallback, useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { IconChart } from "@/components/ui/icons";

export type FeaturedIntelligenceSlide = {
  id: string;
  title: string;
  categoryBadge: string;
  summary: string;
  href: string;
};

const AUTO_ADVANCE_MS = 7000;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
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

type FeaturedIntelligenceCarouselProps = {
  slides: FeaturedIntelligenceSlide[];
};

export function FeaturedIntelligenceCarousel({
  slides,
}: FeaturedIntelligenceCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, index]);

  if (count === 0) return null;

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="flex items-stretch gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="hidden shrink-0 self-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50 sm:inline-flex"
          aria-label="Previous featured report"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => {
                const isActive = slideIndex === index;
                return (
                  <article
                    key={slide.id}
                    className={`w-full shrink-0 flex-none p-5 sm:p-6 ${isActive ? "" : "pointer-events-none"}`}
                    aria-hidden={!isActive}
                  >
                    <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      <IconChart className="h-4 w-4 shrink-0" />
                      FEATURED INTELLIGENCE
                    </p>
                    <span className="mt-3 inline-flex rounded-sm border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
                      {slide.categoryBadge}
                    </span>
                    {isActive ? (
                      <h2
                        className="mt-3 text-xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-2xl"
                        aria-live="polite"
                      >
                        {slide.title}
                      </h2>
                    ) : (
                      <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-2xl">
                        {slide.title}
                      </h2>
                    )}
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                      {slide.summary}
                    </p>
                    <ButtonLink href={slide.href} className="mt-5">
                      Read report →
                    </ButtonLink>
                  </article>
                );
              })}
            </div>
          </div>

          {count > 1 ? (
            <div className="flex items-center justify-center gap-3 border-t border-neutral-100 px-5 py-4">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 sm:hidden"
                aria-label="Previous featured report"
              >
                <ChevronIcon direction="left" />
              </button>
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Featured reports"
              >
                {slides.map((slide, dotIndex) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === index}
                    aria-label={`Go to slide ${dotIndex + 1}: ${slide.title}`}
                    onClick={() => goTo(dotIndex)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      dotIndex === index
                        ? "bg-neutral-900"
                        : "bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 sm:hidden"
                aria-label="Next featured report"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="hidden shrink-0 self-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50 sm:inline-flex"
          aria-label="Next featured report"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
