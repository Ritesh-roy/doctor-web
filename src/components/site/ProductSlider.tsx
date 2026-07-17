import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";

const items = PRODUCTS.slice(0, 10).map((p, i) => ({
  slug: p.slug,
  title: p.title,
  price: p.price,
  image: p.image,
  isNew: i < 4,
}));

export function ProductSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      if (paused) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-accent/15 px-3 py-1 text-xs font-semibold text-emerald-accent">
            <Sparkles className="h-3.5 w-3.5" /> Featured Products
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            All Therapy are Available
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 bg-white text-foreground shadow-card transition hover:-translate-y-0.5 hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 bg-white text-foreground shadow-card transition hover:-translate-y-0.5 hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              data-card
              className="group relative flex w-[75%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:w-[45%] md:w-[32%] lg:w-[23%] xl:w-[19%]"
            >
              {p.isNew && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-emerald-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                  New
                </span>
              )}
              <div className="aspect-square overflow-hidden bg-primary-soft/30">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="line-clamp-2 text-sm font-semibold text-foreground">{p.title}</div>
                <div className="mt-auto font-display text-lg font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
