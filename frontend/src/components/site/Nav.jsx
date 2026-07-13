import React from "react";
import { TID } from "../../lib/testIds";
import { CountUp } from "./CountUp";

export const Nav = ({ onReserve, remaining, total }) => {
    return (
        <nav
            data-testid={TID.nav.root}
            className="sticky top-0 z-40 border-b hairline bg-[color:var(--paper)]/85 backdrop-blur"
        >
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        data-testid="nav-logo"
                        src="/assets/logo.png"
                        alt="Rajkamal Prakashan · राजकमल प्रकाशन"
                        className="h-9 md:h-10 w-auto select-none"
                        draggable={false}
                    />
                </div>

                {/* Middle — live copies counter */}
                <div
                    data-testid="nav-copies-counter"
                    className="hidden md:flex items-center gap-3"
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--brand)] opacity-70 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--brand)]" />
                    </span>
                    <div className="flex items-baseline gap-2">
                        <CountUp
                            to={remaining}
                            className="text-[19px] leading-none font-medium tracking-tight text-[color:var(--brand)]"
                            testId="nav-remaining-count"
                            duration={2000}
                        />
                        <span className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--ink-mute)]">
                            / {total} signed copies left
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="#about"
                        className="hidden lg:inline text-[13px] tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                    >
                        About
                    </a>
                    <a
                        href="#edition"
                        className="hidden lg:inline text-[13px] tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                    >
                        Edition
                    </a>
                    <button
                        data-testid={TID.nav.reserveCta}
                        onClick={onReserve}
                        className="group inline-flex items-center gap-2.5 text-[13px] pl-4 pr-2 py-1.5 rounded-full bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-soft)] transition-colors"
                    >
                        <span>Reserve Signed Copy · ₹550</span>
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/15 group-hover:bg-white/25 group-hover:translate-x-0.5 transition-all">
                            <svg
                                width="14"
                                height="14"
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
                </div>
            </div>
        </nav>
    );
};
