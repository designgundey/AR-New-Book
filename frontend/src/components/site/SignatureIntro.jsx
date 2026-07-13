import React, { useEffect, useState } from "react";

const SIGNATURE_URL = "/assets/signature.png";

/**
 * Full-screen signature intro. Draws the signature left→right on the paper
 * background, holds briefly, then fades out to reveal the site.
 * Duration: ~3s total.
 */
export const SignatureIntro = ({ onDone }) => {
    const [phase, setPhase] = useState("draw"); // draw → hold → fade → done

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("hold"), 2100);
        const t2 = setTimeout(() => setPhase("fade"), 2500);
        const t3 = setTimeout(() => {
            setPhase("done");
            onDone && onDone();
        }, 3200);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onDone]);

    if (phase === "done") return null;

    return (
        <div
            data-testid="signature-intro"
            className={`fixed inset-0 z-[100] flex items-center justify-center paper-bg transition-opacity duration-700 ${
                phase === "fade"
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-6 px-6">
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-[color:var(--ink-mute)]">
                    Signed by hand
                </div>

                <div
                    className="relative"
                    style={{
                        width: "min(70vw, 640px)",
                        aspectRatio: "1220 / 700",
                    }}
                >
                    <img
                        src={SIGNATURE_URL}
                        alt="Arundhati Roy signature"
                        className="absolute inset-0 w-full h-full object-contain signature-draw"
                    />
                </div>

                <div className="text-[11px] tracking-[0.24em] uppercase text-[color:var(--ink-mute)]">
                    Arundhati Roy · अरुंधति रॉय
                </div>
            </div>
        </div>
    );
};
