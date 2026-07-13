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
                        src="https://customer-assets.emergentagent.com/job_arundhati-reads/artifacts/twqhvq20_logo%20rkp.png"
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
                        className="text-[13px] px-4 py-2 rounded-full bg-[color:var(--ink)] text-[color:var(--paper)] hover:bg-[color:var(--accent)] transition-colors"
                    >
                        Reserve — ₹1499
                    </button>
                </div>
            </div>
        </nav>
    );
};
