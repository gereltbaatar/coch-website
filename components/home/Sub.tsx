'use client'

import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useLanguage } from "@/lib/LanguageContext"
import { trSub } from "@/translations/home/trSub"
import { motion } from "framer-motion"

export const Sub = () => {
    const router = useRouter()
    const [clickCount, setClickCount] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const { language } = useLanguage()
    const t = trSub[language]

    const handleCoachingClick = () => {
        setClickCount((prev) => prev + 1)

        // Clear existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        // Reset counter after 2 seconds of inactivity
        timerRef.current = setTimeout(() => {
            setClickCount(0)
        }, 2000)

        // Navigate to admin after 4 clicks
        if (clickCount + 1 >= 4) {
            router.push('/admin')
            setClickCount(0)
        }
    }

    return (
        <section className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/CoachingSub.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col">

                <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto pt-20 pb-10">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-black leading-tight text-center">
                            {t.subscribe}
                        </h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-center">
                            <span className="text-main">{t.toNewsletter} </span>
                            <span className="relative inline-block text-main">
                                {t.highlight}
                                <motion.svg
                                    viewBox="0 0 200 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -top-[35%] -left-[8%] w-[116%] h-[170%] pointer-events-none"
                                >
                                    <motion.ellipse
                                        cx="100"
                                        cy="40"
                                        rx="110"
                                        ry="30"
                                        stroke="#e8b94a"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
                                    />
                                </motion.svg>
                            </span>
                        </h2>
                    </div>

                    <p className="text-black text-sm sm:text-base lg:text-lg font-light max-w-[900px] text-center leading-relaxed px-4 mb-8">
                        {t.description}
                    </p>

                    <button className="border-2 border-main px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-main hover:text-white transition-all duration-300 group mt-2">
                        <p className="text-main group-hover:text-white font-light text-xs sm:text-sm tracking-widest">{t.subscribeNow}</p>
                    </button>
                </div>

                {/* Footer Content - At the bottom */}
                <div className="border-t border-black/10 pt-8 pb-8 mt-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">

                        {/* Navigation Links */}
                        <div className="flex gap-8 sm:gap-12 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-main uppercase tracking-widest text-sm">{t.menu}</h3>
                                <nav className="flex flex-col gap-2 text-black/70 font-light text-sm sm:text-base">
                                    <a href="#" className="hover:text-main transition-colors">{t.home}</a>
                                    <a href="#about" className="hover:text-main transition-colors">{t.aboutMe}</a>
                                    <a href="#services" className="hover:text-main transition-colors">{t.services}</a>
                                </nav>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-main uppercase tracking-widest text-sm opacity-0 select-none">{t.menu}</h3>
                                <nav className="flex flex-col gap-2 text-black/70 font-light text-sm sm:text-base">
                                    <a href="#blog" className="hover:text-main transition-colors">{t.blog}</a>
                                    <a href="#contact" className="hover:text-main transition-colors">{t.contact}</a>
                                </nav>
                            </div>
                        </div>

                        {/* Socials & Copyright */}
                        <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto">
                            <div className="flex gap-6">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center lg:justify-end gap-2 sm:gap-6 text-xs sm:text-sm text-black/50 font-light">
                                <p>
                                    © 2025{' '}
                                    <span
                                        onClick={handleCoachingClick}
                                        className="cursor-default select-none"
                                    >
                                        Coaching
                                    </span>
                                    {' '}Business
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
