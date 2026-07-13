import React from "react";
import { TID } from "../../lib/testIds";

export const Edition = ({ remaining, total, reserved }) => {
    const pct = Math.min(100, Math.round((reserved / total) * 100));
    return (
        <section
            id="edition"
            data-testid={TID.edition.section}
            className="border-b hairline bg-[color:var(--paper-2)]/50"
        >
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-6 order-2 md:order-1">
                    <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                        हस्ताक्षरित संस्करण · The signed edition
                    </div>
                    <h2 className="hindi mt-5 text-3xl md:text-[40px] leading-[1.15] font-medium tracking-tight">
                        प्रत्येक प्रति पर लेखिका के हाथ के हस्ताक्षर।
                    </h2>
                    <p className="mt-3 text-[17px] md:text-[18px] italic text-[color:var(--ink-soft)]">
                        Every copy signed and numbered by the author’s hand.
                    </p>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                        <Feat
                            symbol="✎"
                            hi="नीले जेल पेन से हस्ताक्षरित"
                            en="Signed in blue gel pen"
                        />
                        <Feat
                            symbol="№"
                            hi="1 से 1500 तक क्रमांकित"
                            en="Numbered 1 to 1500"
                        />
                        <Feat
                            symbol="✦"
                            hi="हस्ताक्षरित शीर्षक-पृष्ठ"
                            en="Signed title page"
                        />
                        <Feat
                            symbol="↦"
                            hi="निःशुल्क डिलीवरी"
                            en="Free delivery"
                        />
                    </div>

                    <div
                        data-testid={TID.edition.remaining}
                        className="mt-12 max-w-xl"
                    >
                        <div className="flex items-baseline justify-between">
                            <div className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                                हस्ताक्षरित प्रतियाँ शेष · Signed copies left
                            </div>
                            <div className="text-[13px] text-[color:var(--ink-soft)]">
                                {reserved} / {total} reserved
                            </div>
                        </div>
                        <div className="mt-3 h-[3px] w-full bg-[color:var(--line)] relative overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-[color:var(--accent)]"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <div className="mt-2 text-[26px] font-medium tracking-tight">
                            {remaining}{" "}
                            <span className="text-[color:var(--ink-mute)] text-[15px] font-normal">
                                remaining
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-6 order-1 md:order-2">
                    <div className="relative aspect-[4/5] w-full max-w-[520px] mx-auto bg-white border hairline overflow-hidden">
                        <img
                            src="/assets/title-page.png"
                            alt="मेरी माँ मेरी गैंगस्टर · title page with author signature"
                            className="absolute inset-0 w-full h-full object-contain p-6 md:p-10 select-none"
                            draggable={false}
                        />
                        <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            Title page · शीर्षक-पृष्ठ
                        </div>
                        <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink)]">
                            Edition №{" "}
                            <span className="text-[color:var(--accent)]">
                                0834
                            </span>{" "}
                            / 1500
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10.5px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            <span>Signed by hand</span>
                            <span className="text-[color:var(--accent)]">
                                Blue gel pen
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Feat = ({ symbol, hi, en }) => (
    <div className="flex items-start gap-3">
        <span className="text-[color:var(--accent)] text-[18px] leading-none mt-1">
            {symbol}
        </span>
        <div>
            <div className="hindi text-[15px] text-[color:var(--ink)]">
                {hi}
            </div>
            <div className="text-[12.5px] text-[color:var(--ink-mute)] italic">
                {en}
            </div>
        </div>
    </div>
);
