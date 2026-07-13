import React from "react";
import { TID } from "../../lib/testIds";

export const Footer = () => (
    <footer
        data-testid={TID.footer.root}
        className="border-t hairline bg-[color:var(--paper-2)]/40"
    >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="hindi text-[20px] font-medium">
                    मेरी माँ मेरी गैंगस्टर
                </div>
                <div className="mt-1 text-[12.5px] italic text-[color:var(--ink-mute)]">
                    Mother Mary Comes To Me · Arundhati Roy
                </div>
            </div>
            <div className="text-[13px] text-[color:var(--ink-soft)]">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)] mb-2">
                    Publisher
                </div>
                Rajkamal Prakashan · राजकमल प्रकाशन
                <br />
                Signed limited edition — 1500 numbered copies
            </div>
            <div className="text-[13px] text-[color:var(--ink-soft)]">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)] mb-2">
                    Support
                </div>
                support@rajkamal.example
                <br />
                Mon–Sat · 10:00–18:00 IST
            </div>
        </div>
        <div className="border-t hairline">
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-[11.5px] tracking-[0.14em] uppercase text-[color:var(--ink-mute)]">
                <div>© {new Date().getFullYear()} · All rights reserved</div>
                <div>
                    Set in <span className="text-[color:var(--ink)]">Google Sans</span>
                </div>
            </div>
        </div>
    </footer>
);
