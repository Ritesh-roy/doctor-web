import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export type HeroSlide = {
  src: string;
  alt: string;
};

export function HeroSlider({
  slides,
  interval = 5000,
  className = "",
}: {
  slides: HeroSlide[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = slides[index];

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [paused, interval, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const active = document.activeElement;
      const insideHero = containerRef.current.contains(active);
      if (!insideHero && active !== document.body) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!currentSlide) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-[32px] border border-white/60 bg-primary-soft shadow-glow ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        setPaused(false);
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touchStartX.current = null;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Clinic gallery"
    >
      <motion.img
        key={currentSlide.src}
        src={currentSlide.src}
        alt={currentSlide.alt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 block h-full w-full object-cover object-center"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Preload next image */}
      <link rel="preload" as="image" href={slides[(index + 1) % slides.length].src} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 bottom-14 grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/40 text-foreground shadow-soft backdrop-blur-md transition hover:bg-white/70"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 bottom-14 grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/40 text-foreground shadow-soft backdrop-blur-md transition hover:bg-white/70"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
