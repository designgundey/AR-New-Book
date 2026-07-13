import React, { useEffect, useRef, useState } from "react";

/**
 * Animated count-up. Waits until visible, then counts to `to`.
 * Re-animates smoothly if `to` changes.
 */
export const CountUp = ({
    to = 0,
    duration = 1800,
    className = "",
    testId,
}) => {
    const ref = useRef(null);
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(false);
    const rafRef = useRef(null);
    const fromRef = useRef(0);

    // Visibility trigger
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setVisible(true);
                });
            },
            { threshold: 0.25 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Animate on visible or when target changes
    useEffect(() => {
        if (!visible) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const start = performance.now();
        const from = fromRef.current;
        const delta = to - from;
        if (delta === 0) return;
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = Math.round(from + delta * eased);
            setValue(v);
            fromRef.current = v;
            if (t < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [to, visible, duration]);

    return (
        <span
            ref={ref}
            data-testid={testId}
            className={className}
            style={{ fontVariantNumeric: "tabular-nums" }}
        >
            {value.toLocaleString("en-IN")}
        </span>
    );
};
