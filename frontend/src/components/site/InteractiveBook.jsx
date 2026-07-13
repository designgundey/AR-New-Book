import React, { useRef, useState } from "react";

const BOOK_URL = "/assets/book.png";

/**
 * Interactive book with mouse-tracked 3D tilt + soft glare.
 */
export const InteractiveBook = ({ testId }) => {
    const wrapRef = useRef(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: -8 });
    const [glare, setGlare] = useState({ x: 50, y: 30 });
    const [hovered, setHovered] = useState(false);

    const onMove = (e) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; // 0..1
        const y = (e.clientY - r.top) / r.height; // 0..1
        const ry = (x - 0.5) * 22; // horizontal rotation
        const rx = (0.5 - y) * 16; // vertical rotation
        setTilt({ rx, ry });
        setGlare({ x: x * 100, y: y * 100 });
    };

    const onLeave = () => {
        setTilt({ rx: 0, ry: -8 });
        setGlare({ x: 50, y: 30 });
        setHovered(false);
    };

    const onEnter = () => setHovered(true);

    return (
        <div
            ref={wrapRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onMouseEnter={onEnter}
            className="relative"
            style={{ perspective: "1400px" }}
            data-testid={testId}
        >
            {/* Ambient stage */}
            <div
                className="absolute -inset-8 md:-inset-12 rounded-[3px] pointer-events-none transition-opacity duration-500"
                style={{
                    background:
                        "radial-gradient(60% 60% at 50% 40%, rgba(26,75,132,0.10), transparent 70%)",
                    opacity: hovered ? 1 : 0.6,
                }}
            />

            {/* Book */}
            <div
                className="relative mx-auto"
                style={{
                    width: "min(92%, 480px)",
                    aspectRatio: "3 / 4",
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transformStyle: "preserve-3d",
                    transition: hovered
                        ? "transform 90ms linear"
                        : "transform 500ms cubic-bezier(.22,.61,.36,1)",
                }}
            >
                {/* Soft floor shadow */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-2xl pointer-events-none"
                    style={{
                        bottom: "-4%",
                        width: "72%",
                        height: "10%",
                        background: "rgba(20, 18, 15, 0.28)",
                        transform: "translateZ(-40px)",
                    }}
                />

                {/* Book image — transparent PNG shown directly, no clipping plate */}
                <img
                    src={BOOK_URL}
                    alt="मेरी माँ मेरी गैंगस्टर — Book cover"
                    className="relative w-full h-full object-contain select-none"
                    draggable={false}
                    style={{
                        filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.28)) drop-shadow(0 6px 10px rgba(0,0,0,0.18))",
                    }}
                />

                {/* Dynamic glare that follows the cursor */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(220px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.20), rgba(255,255,255,0) 55%)`,
                        mixBlendMode: "screen",
                        opacity: hovered ? 1 : 0,
                    }}
                />

                {/* Edition badge */}
                <div
                    className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 bg-[color:var(--accent)] text-white font-medium rounded-sm"
                    style={{ transform: "translateZ(30px)" }}
                >
                    Signed · 1 / 1500
                </div>
            </div>

            <div className="mt-6 text-center text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                Paperback · राजकमल प्रकाशन
                <span className="mx-2 text-[color:var(--line)]">·</span>
                <span className="text-[color:var(--ink-soft)]">Hover to tilt</span>
            </div>
        </div>
    );
};
