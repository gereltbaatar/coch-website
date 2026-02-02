"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { trAboutMe } from "@/translations/home/trAboutMe";
import { motion } from "framer-motion";

export const AboutMe = () => {
    const { language } = useLanguage();
    const t = trAboutMe[language];

    const features = [
        t.features.icfCoach,
        t.features.publicSpeaker,
        t.features.emotionalIntelligence,
        t.features.spiritualGrowth,
        t.features.selfAwareness,
        t.features.innerPeace,
    ];

    return (
        <section className="w-full bg-secondary py-16 sm:py-24 lg:py-32">
            <div className="max-w-[1536px] w-full mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-4/5 lg:aspect-square rounded-[2.5rem] overflow-hidden bg-secondary/20"
                    >
                        <Image
                            src="/AboutMeImage.png"
                            alt="Uyanga - ICF-trained coach"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col space-y-8"
                    >
                        {/* Tag */}
                        <div>
                            <span className="inline-block px-6 py-2 rounded-full border border-main text-main text-sm font-medium tracking-wider uppercase">
                                {t.tag}
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#2a2a2a] leading-[1.1]">
                            {t.title1} <br />
                            <span className="relative inline-block text-main italic pb-2">
                                {t.title2}
                                <motion.svg
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute bottom-0 left-0 h-[10px]"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        d="M2 8.5C20 3.5 60 2 100 4.5C140 7 180 5 220 3.5C260 2 285 6 298 8"
                                        stroke="#e8b94a"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                                    />
                                </motion.svg>
                            </span>
                        </h2>

                        {/* Description */}
                        <div className="space-y-6 text-[#4a4a4a] text-base sm:text-lg leading-relaxed">
                            <p>{t.description1}</p>
                            <p>{t.description2}</p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-main/10 flex items-center justify-center text-main">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-[#2a2a2a] font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
