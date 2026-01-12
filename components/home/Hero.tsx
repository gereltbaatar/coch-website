"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { trHero } from "@/translations/home/trHero";

export const Hero = () => {
  const { language } = useLanguage();
  const t = trHero[language];

  return (
    <section className="w-full h-full bg-secondary pt-24 sm:pt-28 lg:pt-32">
      <div className="max-w-[1536px] w-full h-full mx-auto px-5 py-6">
        <div className="w-full h-full flex flex-1 flex-col-reverse lg:flex-row items-center lg:items-stretch gap-8 lg:gap-10">
          {/* Left Section - Portrait */}
          <div className="flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl xl:text-8xl font-light tracking-tight text-[#2a2a2a] leading-[1.1] text-center md:text-start">
                {t.title1} <br />
                <span className="text-main italic">{t.title2}</span>
              </h1>
            </div>

            <div className="w-24 sm:w-32 h-px bg-main/40"></div>

            {/* Description */}
            <div className="space-y-6 text-[#4a4a4a] text-base sm:text-lg leading-relaxed max-w-xl">
              <p className="font-light">
                <span className="font-medium text-main">Uyanga</span> {t.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex justify-center items-center gap-3 bg-main hover:bg-main/90 text-white font-medium text-sm sm:text-lg tracking-wide px-8 py-3 sm:px-12 sm:py-4 rounded-full transition-all duration-300 cursor-pointer transform"
              >
                {t.bookNow}
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="group inline-flex justify-center items-center gap-3 bg-transparent text-main font-medium border-2 border-main text-sm sm:text-lg tracking-wide px-8 py-3 sm:px-12 sm:py-4 rounded-full transition-all duration-300 cursor-pointer transform hover:bg-main/5"
              >
                {t.contactNow}
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-full h-full lg:w-1/2 flex justify-center lg:justify-center">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[730px] w-full rounded-3xl overflow-hidden">
              <Image
                src="/HeroImage.jpg"
                alt="Uyanga - ICF-trained coach"
                fill
                className="object-cover object-bottom"
                priority
              />

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-main/20 rounded-full blur-2xl -z-10"></div>

              {/* Chat Message Bubble 1 */}
              <div className="absolute bottom-8 right-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[240px] sm:max-w-[320px] z-10">
                <p className="text-xs sm:text-sm text-gray-800">
                  {t.chatBubble1} 😓
                </p>
              </div>

              {/* Chat Message Bubble 2 */}
              <div className="absolute bottom-24 sm:bottom-28 right-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[240px] sm:max-w-[320px] z-10">
                <p className="text-xs sm:text-sm text-gray-800">
                  {t.chatBubble2} 😅
                </p>
              </div>

              {/* Chat Message Bubble 3 */}
              <div className="absolute bottom-40 sm:bottom-44 left-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[240px] sm:max-w-[320px] z-10">
                <p className="text-xs sm:text-sm text-gray-800">
                  {t.chatBubble3} 😐
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
