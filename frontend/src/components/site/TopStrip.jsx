import React from "react";

const items = [
    "हस्ताक्षरित प्रति",
    "signed copy",
    "क्रमांकित एडिशन",
    "numbered edition",
    "नीले जेल पेन से",
    "blue gel pen",
    "निःशुल्क डिलीवरी",
    "free delivery",
    "बुकर विजेता लेखिका",
    "booker prize winner",
];

export const TopStrip = () => {
    const doubled = [...items, ...items, ...items];
    return (
        <div className="border-b hairline bg-[color:var(--paper-2)]/70 backdrop-blur-sm overflow-hidden">
            <div className="marquee-track flex whitespace-nowrap py-2.5">
                {doubled.map((t, i) => (
                    <span
                        key={i}
                        className="mx-6 text-[11px] tracking-[0.14em] uppercase text-[color:var(--ink-mute)]"
                    >
                        {t}
                        <span className="ml-6 text-[color:var(--line)]">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
};
