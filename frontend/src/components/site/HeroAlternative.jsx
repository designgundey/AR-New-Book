import React, { useEffect, useState } from "react";
import { TID } from "../../lib/testIds";
import { InteractiveBook } from "./InteractiveBook";

export const HeroAlternative = ({ onReserve, remaining, total }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = null;
        const duration = 2000; // 2 seconds
        const from = 0;
        const to = remaining;
        
        let animationFrameId;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(from + (to - from) * eased));
            
            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(step);
            }
        };

        animationFrameId = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [remaining]);

    return (
        <section
            data-testid={TID.hero.section}
            className="relative border-b hairline overflow-hidden bg-[color:var(--paper)] min-h-[90vh] flex items-center py-16"
        >
            {/* Base Layer: Giant background numbers with counting animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div 
                    className="text-[200px] sm:text-[300px] md:text-[450px] lg:text-[580px] font-black tracking-tighter text-[color:var(--brand)] leading-none select-none animate-soft-blink"
                    style={{ 
                        fontFamily: '"Google Sans", "Product Sans", -apple-system, sans-serif', 
                        fontWeight: 900 
                    }}
                >
                    {count}
                </div>
            </div>

            {/* Content Container: Centered Column Layout */}
            <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col items-center text-center z-10 w-full">
                
                {/* Top Section — Center Aligned Titles */}
                <div className="flex flex-col items-center max-w-4xl">
                    {/* Centered Premium Signature Copy Bubble */}
                    <div className="mb-6 inline-flex items-center gap-2.5 border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/[0.07] backdrop-blur px-4 py-2 rounded-full w-fit">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--accent)] opacity-60 animate-ping" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--accent)]" />
                        </span>
                        <span className="text-[10px] tracking-[0.24em] uppercase text-[color:var(--accent)] font-bold">
                            Signature Copy
                        </span>
                        <span className="text-[color:var(--accent)]/40">·</span>
                        <span className="hindi text-[11px] tracking-[0.08em] text-[color:var(--accent)] font-medium">
                            हस्ताक्षरित प्रति
                        </span>
                    </div>

                    <h1
                        data-testid={TID.hero.titleHi}
                        className="hindi text-[44px] leading-[1.1] sm:text-[60px] md:text-[76px] lg:text-[84px] font-bold text-[color:var(--ink)] tracking-[-0.03em] text-center"
                        style={{ 
                            fontFamily: '"Google Sans", "Noto Sans Devanagari", sans-serif', 
                            fontWeight: 700 
                        }}
                    >
                        मेरी माँ मेरी गैंगस्टर
                    </h1>

                    <p
                        data-testid={TID.hero.titleEn}
                        className="mt-5 text-xl sm:text-2xl md:text-3xl text-[color:var(--ink-soft)] italic text-center font-normal"
                        style={{ fontFamily: '"Google Sans", "Product Sans", sans-serif' }}
                    >
                        Mother Mary Comes To Me
                    </p>
                </div>

                {/* Middle Section — Centered Floating Book Cover */}
                <div className="w-full max-w-[420px] my-10 flex items-center justify-center relative min-h-[300px] md:min-h-[420px] z-10 animate-float">
                    {/* Glowing backdrop behind the book */}
                    <div className="absolute w-[240px] h-[240px] bg-[color:var(--accent)]/10 rounded-full blur-[80px] pointer-events-none z-0" />
                    <InteractiveBook testId={TID.hero.cover} />
                </div>

                {/* Bottom Section — Center Aligned Order Now CTA & Price */}
                <div className="flex flex-col items-center gap-6 z-20">
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        <button
                            onClick={onReserve}
                            className="group inline-flex items-center gap-3.5 rounded-full bg-[color:var(--brand)] text-white pl-7 pr-2.5 py-2.5 text-[15px] font-medium hover:bg-[color:var(--brand-soft)] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-red-500/10"
                        >
                            <span>Order Now</span>
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:translate-x-1 transition-all">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </span>
                        </button>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                                <span className="text-[26px] font-bold text-[color:var(--ink)]">
                                    ₹550
                                </span>
                                <span className="text-[13px] tracking-wide text-[color:var(--brand)] font-semibold uppercase">
                                    Paperback Edition
                                </span>
                            </div>
                            <span className="text-[11px] text-[color:var(--ink-mute)] mt-0.5">
                                Free Courier Shipping Across India
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
