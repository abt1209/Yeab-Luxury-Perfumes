import React, { useRef, useState, useEffect } from 'react';
import { Perfume } from '../../types';
import { motion } from 'motion/react';
import { Star, Eye, Compass, Award, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HorizontalSyncGalleryProps {
  perfumes: Perfume[];
  colors: Record<string, string>;
  onInspect: (perfume: Perfume) => void;
  isDarkMode?: boolean;
}

export default function HorizontalSyncGallery({
  perfumes,
  colors,
  onInspect,
  isDarkMode = false
}: HorizontalSyncGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
  const [isCoasting, setIsCoasting] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0, time: 0 });
  const velocityRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, time: 0 });
  const coastAnimationFrameRef = useRef<number | null>(null);

  // State to track active visual card in viewport
  const [activeIndex, setActiveIndex] = useState(0);

  // Cancel any ongoing coast/inertia animation
  const stopCoasting = () => {
    if (coastAnimationFrameRef.current) {
      cancelAnimationFrame(coastAnimationFrameRef.current);
      coastAnimationFrameRef.current = null;
    }
    setIsCoasting(false);
    velocityRef.current = 0;
  };

  // Drag handoff handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    stopCoasting();

    // Only drag with left click
    if (e.button !== 0) return;

    setIsDragging(true);
    const container = containerRef.current;
    
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: container.scrollLeft,
      time: performance.now(),
    };

    lastMousePosRef.current = {
      x: e.clientX,
      time: performance.now(),
    };
    
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    
    // Prevent default scrolling behaviour and text selection
    e.preventDefault();

    const container = containerRef.current;
    const clientX = e.clientX;
    const currentTime = performance.now();

    const dx = clientX - dragStartRef.current.x;

    // Direct offset update
    container.scrollLeft = dragStartRef.current.scrollLeft - dx;

    // Track instant velocity
    const dt = currentTime - lastMousePosRef.current.time;
    if (dt > 0) {
      const instantaneousVelocity = (clientX - lastMousePosRef.current.x) / dt;
      // Exponential moving average for velocity
      velocityRef.current = velocityRef.current * 0.4 + instantaneousVelocity * 0.6;
    }

    lastMousePosRef.current = {
      x: clientX,
      time: currentTime,
    };
  };

  const handleMouseUpOrLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!containerRef.current) return;

    // If the release happened with a substantial flick velocity
    const velocity = velocityRef.current;
    const absVelocity = Math.abs(velocity);

    if (absVelocity > 0.05) {
      // Start momentum coasting
      setIsCoasting(true);
      let speed = velocity * 13; // momentum ratio multiplier
      const friction = 0.94; // deceleration factor

      const coast = () => {
        if (!containerRef.current) {
          stopCoasting();
          return;
        }

        containerRef.current.scrollLeft -= speed;
        speed *= friction;

        if (Math.abs(speed) > 0.15) {
          coastAnimationFrameRef.current = requestAnimationFrame(coast);
        } else {
          stopCoasting();
          snapToNearest();
        }
      };

      coastAnimationFrameRef.current = requestAnimationFrame(coast);
    } else {
      snapToNearest();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    stopCoasting();

    const touch = e.touches[0];
    const container = containerRef.current;

    setIsDragging(true);
    dragStartRef.current = {
      x: touch.clientX,
      scrollLeft: container.scrollLeft,
      time: performance.now(),
    };

    lastMousePosRef.current = {
      x: touch.clientX,
      time: performance.now(),
    };
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const container = containerRef.current;
    const clientX = touch.clientX;
    const currentTime = performance.now();

    const dx = clientX - dragStartRef.current.x;
    container.scrollLeft = dragStartRef.current.scrollLeft - dx;

    const dt = currentTime - lastMousePosRef.current.time;
    if (dt > 0) {
      const instantaneousVelocity = (clientX - lastMousePosRef.current.x) / dt;
      velocityRef.current = velocityRef.current * 0.4 + instantaneousVelocity * 0.6;
    }

    lastMousePosRef.current = {
      x: clientX,
      time: currentTime,
    };
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const velocity = velocityRef.current;
    const absVelocity = Math.abs(velocity);

    if (absVelocity > 0.05) {
      setIsCoasting(true);
      let speed = velocity * 11;
      const friction = 0.94;

      const coast = () => {
        if (!containerRef.current) {
          stopCoasting();
          return;
        }

        containerRef.current.scrollLeft -= speed;
        speed *= friction;

        if (Math.abs(speed) > 0.15) {
          coastAnimationFrameRef.current = requestAnimationFrame(coast);
        } else {
          stopCoasting();
          snapToNearest();
        }
      };

      coastAnimationFrameRef.current = requestAnimationFrame(coast);
    } else {
      snapToNearest();
    }
  };

  // Handle snapping to nearest card element logically
  const snapToNearest = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.children;
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    const nearestCard = cards[nearestIndex] as HTMLElement;
    if (nearestCard) {
      const targetScrollLeft = nearestCard.offsetLeft - (container.offsetWidth - nearestCard.offsetWidth) / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      setActiveIndex(nearestIndex);
    }
  };

  // Sync active index based on scroll events (trackpads or touchscreens)
  const handleScroll = () => {
    // If dragging or coasting manually via JS, let that handle the index
    if (isDragging || isCoasting || !containerRef.current) return;

    const container = containerRef.current;
    const cards = container.children;
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }
    setActiveIndex(nearestIndex);
  };

  // Clean-up animation frame on unmount
  useEffect(() => {
    return () => {
      if (coastAnimationFrameRef.current) {
        cancelAnimationFrame(coastAnimationFrameRef.current);
      }
    };
  }, []);

  if (perfumes.length === 0) {
    return (
      <div className="border border-dashed p-12 rounded-3xl text-center flex flex-col items-center justify-center max-w-xl mx-auto my-6 bg-[#FAF9F5] border-[#ecebe7] dark:bg-black dark:border-[#c19253]/30">
        <AlertCircle className="text-gray-300 mb-3" size={24} />
        <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-[#c19253]">No Perfumes Found</h4>
        <p className="text-xs text-gray-500 max-w-xs mt-1">
          Adjust your active audience or collection filters to uncover our majestic blends.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 relative overflow-hidden pb-4">
      {/* Decorative top header line */}
      <div className="flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#c19253]/10 text-[#c19253] dark:bg-[#c19253]/20">
            <Compass size={14} className="animate-spin-slow" />
          </span>
          <div>
            <span className="text-[10px] tracking-[0.25em] font-extrabold uppercase text-[#c19253] block">
              Curated Horizon Showcase
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 dark:text-gray-300 font-bold uppercase tracking-wider">
                Interactive Flick Deck • {perfumes.length} Fragrances
              </span>
            </div>
          </div>
        </div>

        {/* Carousel indicators showing progress */}
        <div className="flex items-center gap-1.5">
          {perfumes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const card = container.children[idx] as HTMLElement;
                if (card) {
                  const targetScrollLeft = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                  container.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth'
                  });
                  setActiveIndex(idx);
                }
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeIndex
                  ? "w-6 bg-[#c19253]"
                  : "w-1.5 bg-gray-200 dark:bg-white/20 hover:bg-gray-300 dark:hover:bg-[#c19253]/25"
              )}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Draggable viewport */}
      <div className="relative w-full">
        {/* Left ambient fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fdfdfc] to-transparent pointer-events-none z-10 dark:from-black" />
        
        {/* Scroll Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
          className={cn(
            "flex gap-6 overflow-x-auto select-none px-6 py-4 cursor-grab active:cursor-grabbing scrollbar-none",
            // Use native snap alignment only when NOT actively dragging or decelerating via JS
            (!isDragging && !isCoasting) ? "snap-x snap-mandatory scroll-smooth" : "snap-none"
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {perfumes.map((perfume, idx) => {
            const isCenter = idx === activeIndex;
            return (
              <div
                key={perfume.id}
                className={cn(
                  "snap-center flex-shrink-0 w-[290px] sm:w-[350px] md:w-[420px] rounded-3xl overflow-hidden transition-all duration-500 relative flex flex-col md:flex-row border shadow-md",
                  isCenter
                    ? "scale-[1.01] border-[#c19253]/40 bg-white shadow-xl dark:bg-black dark:border-[#c19253]/40 shadow-[#c19253]/5"
                    : "scale-[0.97] opacity-60 bg-white/70 border-[#ecebe7] dark:bg-black/50 dark:border-[#c19253]/15"
                )}
              >
                {/* 1. Left side Full-Bleed Elegant Portrait Background Image (drags along beautifully) */}
                <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-full relative overflow-hidden bg-gray-50 flex items-center justify-center dark:bg-black">
                  <img
                    src={perfume.mainImage}
                    alt={perfume.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out pointer-events-none"
                    referrerPolicy=" referrer"
                  />
                  
                  {/* Absolute visual overlay tags */}
                  <span className="absolute top-4 left-4 border border-[#c19253]/35 px-2 py-0.5 rounded-md text-[8px] font-mono font-black tracking-widest bg-[#0a0614]/80 text-[#c19253] shadow-sm">
                    {perfume.code}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-[9px] font-extrabold px-2.5 py-1 rounded-full bg-[#0a0614]/85 text-[#c19253] backdrop-blur-md shadow-md border border-[#c19253]/15">
                    <Star size={10} className="fill-[#c19253] text-[#c19253]" />
                    <span>{perfume.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* 2. Detailed Scent Placard content text description column */}
                <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-7 flex flex-col justify-between relative bg-white dark:bg-black transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold tracking-[0.2em] px-2.5 py-0.5 rounded uppercase text-[#c19253] bg-[#c19253]/10 dark:bg-[#c19253]/20">
                        {perfume.brand}
                      </span>
                      {perfume.category === 'Luxury Perfume' ? (
                        <span className="text-[8px] font-extrabold tracking-widest uppercase flex items-center gap-1 text-[#c19253]">
                          <Award size={10} /> Luxury
                        </span>
                      ) : (
                        <span className="text-[8px] font-extrabold tracking-widest uppercase flex items-center gap-1 text-gray-400">
                          <Sparkles size={10} /> {perfume.category}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-gray-950 dark:text-[#c19253] line-clamp-1">
                        {perfume.name}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-gray-400 dark:text-gray-400 line-clamp-2 italic font-serif">
                        "{perfume.description}"
                      </p>
                    </div>

                    {/* Accords representation bars for high visual interest */}
                    <div className="space-y-2 pt-1 border-t border-[#ecebe7] dark:border-[#c19253]/15">
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-gray-400">Accords Composition</span>
                      <div className="space-y-1.5">
                        {perfume.accords.slice(0, 3).map((accord, i) => {
                          const barBg = colors[accord.name] || accord.color || '#ecebe7';
                          return (
                            <div key={i} className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px] font-mono">
                                <span className="text-gray-500 dark:text-gray-300 font-bold">{accord.name}</span>
                                <span className="text-gray-400">{accord.value}%</span>
                              </div>
                              <div className="h-1 bg-gray-100 dark:bg-black border dark:border-[#c19253]/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${accord.value}%`,
                                    backgroundColor: barBg
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scent notes summary dots */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {perfume.notes.top.slice(0, 2).map((note, i) => (
                        <span key={i} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-black dark:border dark:border-[#c19253]/20 dark:text-gray-300">
                          Top: {note.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action elements Footer row */}
                  <div className="space-y-3 pt-4 mt-4 border-t border-[#ecebe7] dark:border-[#c19253]/15">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.2em] font-extrabold uppercase text-gray-400">Value investment</span>
                      <span className="text-sm font-serif font-black tracking-wide text-gray-950 dark:text-[#c19253]">
                        {perfume.price.toLocaleString()} ETB
                      </span>
                    </div>

                    <button
                      onClick={() => onInspect(perfume)}
                      className="w-full py-2 bg-[#111] hover:bg-neutral-800 text-white rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 dark:bg-[#c19253] dark:text-black dark:hover:bg-white"
                    >
                      <Eye size={12} />
                      Inspect Scent
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right ambient fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fdfdfc] to-transparent pointer-events-none z-10 dark:from-black" />
      </div>
    </div>
  );
}
