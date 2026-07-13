import React from "react";
import { TID } from "../../lib/testIds";
import { InteractiveBook } from "./InteractiveBook";

export const Hero = ({ onReserve, remaining, total }) => {
    return (
        <section
            data-testid={TID.hero.section}
            className="relative border-b hairline"
        >
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Left — editorial */}
                <div className="lg:col-span-7">
                    <div className="mb-10 inline-flex items-center gap-2.5 border hairline bg-white/70 backdrop-blur px-3.5 py-1.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--accent)] opacity-60 animate-ping" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--accent)]" />
                        </span>
                        <span className="text-[10.5px] tracking-[0.24em] uppercase text-[color:var(--ink)] font-medium">
                            Signature copy
                        </span>
                        <span className="text-[color:var(--line)]">·</span>
                        <span className="hindi text-[11px] tracking-[0.08em] text-[color:var(--ink-soft)]">
                            हस्ताक्षरित प्रति
                        </span>
                    </div>

                    <h1
                        data-testid={TID.hero.titleHi}
                        className="hindi text-[52px] leading-[1.02] sm:text-6xl md:text-[76px] lg:text-[88px] font-medium text-[color:var(--ink)] tracking-[-0.03em]"
                    >
                        मेरी माँ
                        <br />
                        मेरी गैंगस्टर
                    </h1>

                    <p
                        data-testid={TID.hero.titleEn}
                        className="mt-4 text-lg md:text-xl text-[color:var(--ink-soft)] italic"
                        style={{ fontFamily: '"Google Sans", serif' }}
                    >
                        Mother Mary Comes To Me
                    </p>

                    <div className="mt-10 max-w-xl">
                        <p className="text-[15.5px] md:text-[16.5px] leading-[1.65] text-[color:var(--ink-soft)]">
                            बुकर पुरस्कार विजेता{" "}
                            <span className="text-[color:var(--ink)]">
                                अरुंधति रॉय
                            </span>{" "}
                            की पहली स्मृति-कथा — अपनी माँ मेरी रॉय के बारे में,
                            जिन्हें वे प्यार से{" "}
                            <em className="not-italic underline decoration-[color:var(--accent)]/50 underline-offset-4">
                                “मेरी गैंगस्टर”
                            </em>{" "}
                            कहती हैं। शरणस्थली भी, तूफ़ान भी।
                        </p>
                        <p className="mt-3 text-[13.5px] leading-[1.6] text-[color:var(--ink-mute)]">
                            The first memoir from Booker Prize–winning Arundhati
                            Roy — about her mother, Mary Roy, whom she lovingly
                            calls “my gangster.” Her shelter and her storm.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-5">
                        <button
                            data-testid={TID.hero.reserveCta}
                            onClick={onReserve}
                            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--brand)] text-white pl-6 pr-2 py-2 text-[14.5px] hover:bg-[color:var(--brand-soft)] transition-colors"
                        >
                            <span>Reserve your copy</span>
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/15 group-hover:bg-white/25 group-hover:translate-x-1 transition-all">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </span>
                        </button>

                        <div
                            data-testid={TID.hero.price}
                            className="flex items-baseline gap-2"
                        >
                            <span className="text-[22px] font-medium text-[color:var(--ink)]">
                                ₹550
                            </span>
                            <span className="text-xs tracking-wide text-[color:var(--ink-mute)]">
                                · free delivery
                            </span>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t hairline pt-6">
                        <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
                                Edition
                            </div>
                            <div className="mt-1 text-[15px] text-[color:var(--ink)]">
                                1 / {total}
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
                                Signed by
                            </div>
                            <div className="mt-1 text-[15px] text-[color:var(--ink)]">
                                Arundhati Roy
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
                                Remaining
                            </div>
                            <div className="mt-1 text-[15px] text-[color:var(--brand)]">
                                {remaining}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — interactive book */}
                <div className="lg:col-span-5">
                    <InteractiveBook testId={TID.hero.cover} />
                </div>
            </div>
        </section>
    );
};
