import React from "react";
import { TID } from "../../lib/testIds";

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
                            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--ink)] text-[color:var(--paper)] px-6 py-3.5 text-[14.5px] hover:bg-[color:var(--accent)] transition-colors"
                        >
                            <span>अपनी प्रति सुरक्षित करें</span>
                            <span className="opacity-60 text-[12px]">·</span>
                            <span className="opacity-80 text-[12.5px]">
                                Reserve your copy
                            </span>
                            <span className="translate-x-0 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </button>

                        <div
                            data-testid={TID.hero.price}
                            className="flex items-baseline gap-2"
                        >
                            <span className="text-[22px] font-medium text-[color:var(--ink)]">
                                ₹1499
                            </span>
                            <span className="text-sm line-through text-[color:var(--ink-mute)]">
                                ₹1999
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
                            <div className="mt-1 text-[15px] text-[color:var(--accent)]">
                                {remaining}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — cover object */}
                <div className="lg:col-span-5">
                    <div className="relative">
                        <div className="absolute -inset-6 md:-inset-10 bg-[color:var(--paper-2)] rounded-[2px]" />
                        <div className="relative aspect-[3/4] w-full max-w-[420px] ml-auto shadow-[0_30px_80px_-30px_rgba(26,26,26,0.35)]">
                            <img
                                data-testid={TID.hero.cover}
                                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80"
                                alt="Book cover — मेरी माँ मेरी गैंगस्टर"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                            <div className="absolute left-5 right-5 bottom-5 text-white">
                                <div className="text-[10px] tracking-[0.22em] uppercase opacity-80">
                                    Arundhati Roy
                                </div>
                                <div className="hindi text-[22px] leading-tight font-medium mt-1">
                                    मेरी माँ मेरी गैंगस्टर
                                </div>
                                <div className="text-[11px] italic opacity-80 mt-0.5">
                                    Mother Mary Comes To Me
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 text-[10px] tracking-[0.18em] uppercase px-2 py-1 bg-white/85 text-[color:var(--ink)]">
                                Signed · 1/1500
                            </div>
                        </div>
                        <div className="mt-6 text-right text-[11px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            Hardcover · राजकमल प्रकाशन
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
