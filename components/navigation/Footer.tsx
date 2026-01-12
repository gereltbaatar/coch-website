'use client'

import { Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useLanguage } from "@/lib/LanguageContext"
import { trFooter } from "@/translations/navigation/trFooter"

export const Footer = () => {
    const router = useRouter()
    const [clickCount, setClickCount] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const { language } = useLanguage()
    const t = trFooter[language]

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
        <footer className="w-full relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/CoachingSub.png"
                    alt="Footer Background"
                    fill
                    className="object-cover object-center"
                    priority={false}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="border-t border-black/10 py-14">
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
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main text-main hover:text-white transition-all group">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main text-main hover:text-white transition-all group">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main text-main hover:text-white transition-all group">
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
        </footer>
    )
}
