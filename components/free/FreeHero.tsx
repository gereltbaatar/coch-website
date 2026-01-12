"use client"

import { Header } from "@/components/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { trFreePage } from "@/translations/free/trFreePage";

export const FreeHero = () => {
    const { language } = useLanguage();
    const t = trFreePage[language];

    return (
        <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 min-h-[400px] sm:min-h-[450px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/FreeHeroBg.png"
                    alt="Free Resources Hero Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <Header />
            <div className="max-w-[1536px] w-full mx-auto px-5 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-black/60 mb-4">
                        {t.newStyle}
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#2a2a2a] tracking-wide leading-[1.1] min-h-[2.4em]">
                        {t.timeless} <span className="text-main italic">{t.resources}</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-[#4a4a4a] font-light leading-relaxed">
                        {t.heroDescription}
                    </p>
                    <div className="w-24 h-px bg-main/40 mx-auto mt-8"></div>
                </div>
            </div>
        </section>
    );
};
