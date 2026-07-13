import React from "react";
import { TID } from "../../lib/testIds";
import { InteractiveBook } from "./InteractiveBook";

export const HeroAlternative = ({ onReserve, remaining, total }) => {
    return (
        <section
            data-testid={TID.hero.section}
            className="relative border-b hairline overflow-hidden bg-[color:var(--paper)]"
        >
            {/* Massive background numbers (watermark layout) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div 
                    className="text-[180px] sm:text-[280px] md:text-[380px] lg:text-[450px] font-bold tracking-tighter text-[color:var(--accent)]/[0.03] leading-none font-serif"
                    style={{ fontFamily: '"Georgia", serif' }}
                >
                    {remaining}
                </div>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-10">
                {/* Left — Editorial and CTA */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="mb-8 inline-flex items-center gap-2.5 border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/[0.05] backdrop-blur px-4 py-2 rounded-full w-fit">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--brand)] opacity-60 animate-ping" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--brand)]" />
                        </span>
                        <span className="text-[10px] tracking-[0.24em] uppercase text-[color:var(--brand)] font-bold">
                            Limited Signed Edition
                        </span>
                    </div>

                    <h1
                        data-testid={TID.hero.titleHi}
                        className="hindi text-[48px] leading-[1.02] sm:text-6xl md:text-[76px] lg:text-[84px] font-medium text-[color:var(--ink)] tracking-[-0.03em]"
                    >
                        मेरी माँ
                        <br />
                        मेरी गैंगस्टर
                    </h1>

                    <p
                        data-testid={TID.hero.titleEn}
                        className="mt-4 text-xl md:text-2xl text-[color:var(--ink-soft)] italic"
                        style={{ fontFamily: '"Google Sans", serif' }}
                    >
                        Mother Mary Comes To Me
                    </p>

                    <div className="mt-8 max-w-xl">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--accent)] font-semibold mb-3">
                            {remaining} of {total} Copies Available
                        </div>
                        <p className="text-[15.5px] md:text-[16.5px] leading-[1.65] text-[color:var(--ink-soft)]">
                            बुकर पुरस्कार विजेता <span className="text-[color:var(--ink)] font-medium">अरुंधति रॉय</span> की पहली बहुप्रतीक्षित स्मृति-कथा। नीले जेल पेन से हस्ताक्षरित और हाथ से क्रमांकित यह अनूठा संस्करण केवल चुनिंदा पाठकों के लिए उपलब्ध है।
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
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

                {/* Right — Floating Interactive Book Cover */}
                <div className="lg:col-span-5 flex items-center justify-center relative min-h-[360px] md:min-h-[480px]">
                    {/* Glowing background behind book */}
                    <div className="absolute w-[280px] h-[280px] bg-[color:var(--accent)]/10 rounded-full blur-[100px] pointer-events-none z-0" />
                    
                    {/* Floating wrapper */}
                    <div className="w-full relative z-10 animate-float">
                        <InteractiveBook testId={TID.hero.cover} />
                    </div>
                </div>
            </div>
        </section>
    );
};
