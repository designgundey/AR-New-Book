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
            className="relative border-b hairline overflow-hidden bg-[color:var(--paper)] min-h-[85vh] flex items-center"
        >
            {/* Base Layer: Giant background numbers with counting animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div 
                    className="text-[200px] sm:text-[300px] md:text-[450px] lg:text-[580px] font-black tracking-tighter text-[color:var(--brand)] opacity-50 leading-none select-none"
                    style={{ 
                        fontFamily: '"Google Sans", "Product Sans", -apple-system, sans-serif', 
                        fontWeight: 900 
                    }}
                >
                    {count}
                </div>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-10 w-full">
                {/* Left — Big Text and CTA only */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <h1
                        data-testid={TID.hero.titleHi}
                        className="hindi text-[52px] leading-[1.02] sm:text-6xl md:text-[82px] lg:text-[96px] font-bold text-[color:var(--ink)] tracking-[-0.03em]"
                        style={{ 
                            fontFamily: '"Google Sans", "Noto Sans Devanagari", sans-serif', 
                            fontWeight: 700 
                        }}
                    >
                        मेरी माँ
                        <br />
                        मेरी गैंगस्टर
                    </h1>

                    <p
                        data-testid={TID.hero.titleEn}
                        className="mt-6 text-2xl md:text-3xl text-[color:var(--ink-soft)] italic"
                        style={{ fontFamily: '"Google Sans", "Product Sans", sans-serif' }}
                    >
                        Mother Mary Comes To Me
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-6">
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

                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
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

                {/* Right — Floating Book Cover */}
                <div className="lg:col-span-5 flex items-center justify-center relative min-h-[360px] md:min-h-[480px]">
                    <div className="w-full relative z-10 animate-float">
                        <InteractiveBook testId={TID.hero.cover} />
                    </div>
                </div>
            </div>
        </section>
    );
};
