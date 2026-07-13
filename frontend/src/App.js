import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Toaster } from "sonner";
import { Nav } from "./components/site/Nav";
import { Hero } from "./components/site/Hero";
import { About } from "./components/site/About";
import { Edition } from "./components/site/Edition";
import { ReservationForm } from "./components/site/ReservationForm";
import { Footer } from "./components/site/Footer";
import { SignatureIntro } from "./components/site/SignatureIntro";
import { TID } from "./lib/testIds";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://arundhati-reads.preview.emergentagent.com";
const API = `${BACKEND_URL}/api`;

function App() {
    const [inv, setInv] = useState({
        total: 1500,
        reserved: 0,
        remaining: 1500,
        price_inr: 550,
    });
    const [introDone, setIntroDone] = useState(false);
    const formRef = useRef(null);

    const loadInventory = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API}/inventory`);
            setInv(data);
        } catch (e) {
            /* silent */
        }
    }, []);

    useEffect(() => {
        loadInventory();
    }, [loadInventory]);

    const scrollToForm = useCallback(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    // Simple reveal-on-scroll
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("in");
                });
            },
            { threshold: 0.14 },
        );
        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div className="App paper-bg">
            {!introDone && <SignatureIntro onDone={() => setIntroDone(true)} />}
            <Toaster position="top-center" richColors />
            <Nav
                onReserve={scrollToForm}
                remaining={inv.remaining}
                total={inv.total}
            />

            <main>
                <div className="reveal in">
                    <Hero
                        onReserve={scrollToForm}
                        remaining={inv.remaining}
                        total={inv.total}
                    />
                </div>

                <div className="reveal">
                    <About />
                </div>

                <div className="reveal">
                    <Edition
                        remaining={inv.remaining}
                        total={inv.total}
                        reserved={inv.reserved}
                    />
                </div>

                <section
                    id="reserve"
                    data-testid={TID.form.section}
                    className="border-b hairline"
                >
                    <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-4">
                            <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                                Reserve now
                            </div>
                            <h2 className="mt-5 text-3xl md:text-[42px] leading-[1.15] font-medium tracking-tight">
                                Reserve your numbered copy.
                            </h2>
                            <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-[color:var(--ink-mute)]">
                                Be one of 1500. Your edition number is reserved
                                the moment you pay, and ships straight to your
                                door at launch.
                            </p>
                        </div>
                        <div className="md:col-span-8">
                            <ReservationForm
                                ref={formRef}
                                onReserved={loadInventory}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
