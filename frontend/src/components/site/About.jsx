import React from "react";
import { TID } from "../../lib/testIds";

export const About = () => {
    return (
        <section
            id="about"
            data-testid={TID.about.section}
            className="border-b hairline"
        >
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                    <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                        पुस्तक के बारे में · About the book
                    </div>
                </div>
                <div className="md:col-span-8">
                    <h2 className="hindi text-3xl md:text-[42px] leading-[1.15] font-medium tracking-tight">
                        एक बेटी, एक माँ, और वह भाषा
                        <br className="hidden md:block" /> जो दोनों के बीच बची
                        रही।
                    </h2>
                    <p
                        className="mt-3 text-[17px] md:text-[19px] text-[color:var(--ink-soft)]"
                        style={{ fontStyle: "italic" }}
                    >
                        A daughter, a mother, and the language that survived
                        between them.
                    </p>

                    <div className="mt-10 space-y-6 max-w-2xl">
                        <p className="text-[15.5px] leading-[1.75] text-[color:var(--ink-soft)]">
                            माँ की मृत्यु के बाद उमड़ी यादों और भावनाओं के बीच
                            से जन्मी यह किताब{" "}
                            <span className="text-[color:var(--ink)]">
                                अरुंधति रॉय
                            </span>{" "}
                            की अब तक की सबसे निजी रचना है। यह उनकी माँ मेरी रॉय
                            की कहानी है — एक असाधारण शिक्षिका और आंदोलनकारी,
                            जिन्होंने 1986 में स्त्रियों के समान संपत्ति-अधिकार
                            का ऐतिहासिक मुकदमा जीता।
                        </p>
                        <p className="text-[14px] leading-[1.75] text-[color:var(--ink-mute)]">
                            Born from the flood of memory that followed her
                            mother’s death, this is Arundhati Roy’s most
                            personal work yet — the story of Mary Roy, an
                            extraordinary educator and activist who won a
                            landmark Supreme Court case securing equal
                            inheritance rights for women in 1986.
                        </p>

                        <div className="pt-6 border-t hairline grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <Fact
                                labelHi="लेखिका"
                                labelEn="Author"
                                value="Arundhati Roy"
                            />
                            <Fact
                                labelHi="अनुवाद"
                                labelEn="Translator"
                                value="Prabhat Singh"
                            />
                            <Fact
                                labelHi="प्रकाशक"
                                labelEn="Publisher"
                                value="Rajkamal Prakashan"
                            />
                            <Fact
                                labelHi="भाषा"
                                labelEn="Language"
                                value="हिंदी"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Fact = ({ labelHi, labelEn, value }) => (
    <div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
            {labelHi} · {labelEn}
        </div>
        <div className="mt-1 text-[14.5px] text-[color:var(--ink)]">
            {value}
        </div>
    </div>
);
