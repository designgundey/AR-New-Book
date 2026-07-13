import React from "react";
import { TID } from "../../lib/testIds";

export const Nav = ({ onReserve }) => {
    return (
        <nav
            data-testid={TID.nav.root}
            className="sticky top-0 z-40 border-b hairline bg-[color:var(--paper)]/85 backdrop-blur"
        >
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        data-testid="nav-logo"
                        src="/assets/logo.png"
                        alt="Rajkamal Prakashan · राजकमल प्रकाशन"
                        className="h-9 md:h-10 w-auto select-none"
                        draggable={false}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="#about"
                        className="hidden sm:inline text-[13px] tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                    >
                        About
                    </a>
                    <a
                        href="#edition"
                        className="hidden sm:inline text-[13px] tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                    >
                        Edition
                    </a>
                    <button
                        data-testid={TID.nav.reserveCta}
                        onClick={onReserve}
                        className="group inline-flex items-center gap-2.5 text-[13px] pl-4 pr-2 py-1.5 rounded-full bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-soft)] transition-colors"
                    >
                        <span>Reserve ₹550</span>
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
