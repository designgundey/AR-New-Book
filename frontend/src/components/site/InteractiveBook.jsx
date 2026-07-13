import React, { useRef, useState } from "react";

const BOOK_URL =
    "https://customer-assets.emergentagent.com/job_arundhati-reads/artifacts/y00dd3k4_Book.png";

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
                    width: "min(92%, 460px)",
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
                    className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-2xl"
                    style={{
                        bottom: "-8%",
                        width: "78%",
                        height: "14%",
                        background: "rgba(20, 18, 15, 0.35)",
                        transform: "translateZ(-40px)",
                    }}
                />

                {/* Back cover / depth plate */}
                <div
                    className="absolute inset-0 bg-[#7a1414]"
                    style={{
                        transform: "translateZ(-14px)",
                        borderRadius: "1px 3px 3px 1px",
                        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)",
                    }}
                />

                {/* Cover */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                        transformStyle: "preserve-3d",
                        borderRadius: "1px 3px 3px 1px",
                        boxShadow:
                            "0 40px 80px -30px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.06) inset",
                    }}
                >
                    <img
                        src={BOOK_URL}
                        alt="मेरी माँ मेरी गैंगस्टर — Book cover"
                        className="absolute inset-0 w-full h-full object-cover select-none"
                        draggable={false}
                    />

                    {/* Spine gradient (subtle depth on left edge) */}
                    <div
                        className="absolute inset-y-0 left-0 w-4 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0))",
                        }}
                    />

                    {/* Dynamic glare that follows the cursor */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(220px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.30), rgba(255,255,255,0) 55%)`,
                            mixBlendMode: "screen",
                            opacity: hovered ? 1 : 0,
                        }}
                    />

                    {/* Grain overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                            backgroundSize: "3px 3px",
                            mixBlendMode: "overlay",
                        }}
                    />
                </div>

                {/* Edition badge */}
                <div
                    className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-white/90 text-[color:var(--ink)]"
                    style={{ transform: "translateZ(30px)" }}
                >
                    Signed · 1 / 1500
                </div>
            </div>

            <div className="mt-6 text-center text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                Hardcover · राजकमल प्रकाशन
                <span className="mx-2 text-[color:var(--line)]">·</span>
                <span className="text-[color:var(--ink-soft)]">Hover to tilt</span>
            </div>
        </div>
    );
};
