"use client"

import { useRef, useEffect, useState } from "react"
import { Sub } from "@/components/home"
import { Footer } from "@/components/navigation"
import { ServiceSection, ServicesHero, ProductsSection } from "@/components/services"
import { useLanguage } from "@/lib/LanguageContext"
import { trServicesData } from "@/translations/services/trServicesData"
import { trServiceSection } from "@/translations/services/trServiceSection"

const servicesMeta = [
    {
        image: "/onetoone.png",
        backgroundColor: "#c4a99b",
        textColor: "#ffffff",
        isReversed: false,
        link: "/services/1-1"
    },
    {
        image: "/group.png",
        backgroundColor: "#8a8e75",
        textColor: "#ffffff",
        isReversed: true,
        link: "/services/group"
    },
    {
        image: "/onetoone.png",
        backgroundColor: "#2a2a2a",
        textColor: "#ffffff",
        isReversed: false,
        link: "/services/corporate"
    }
]

const ServicesPage = () => {
    const { language } = useLanguage()
    const t = trServiceSection[language]
    const servicesData = trServicesData[language]
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = entry.target.getAttribute('data-index')
                        if (idx !== null) {
                            setVisibleCards((prev) => new Set(prev).add(Number(idx)))
                        }
                    }
                })
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    return (
        <main className="min-h-screen bg-white">
            <ServicesHero />

            <div className="bg-secondary w-full min-h-fit max-w-[1536px] mx-auto px-4 sm:px-5 pb-12 sm:pb-16 lg:pb-24 pt-10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-black/5 pb-6 gap-4">
                    <div className="flex items-center gap-6">
                        <button className="text-xs font-semibold tracking-widest text-black hover:text-black/60 transition-colors uppercase">
                            <div className="flex items-center gap-3">
                                <p className="text-2xl font-semibold text-gray-800">{t.allServices}</p>
                                <svg
                                    className="w-6 h-6 text-gray-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(45 12 12)" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="border border-main bg-main rounded-4xl w-full min-h-fit p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            data-index={index}
                            ref={(el) => {
                                if (el && observerRef.current) {
                                    observerRef.current.observe(el)
                                }
                            }}
                            className={`transition-all duration-700 ease-out ${
                                visibleCards.has(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                            }`}
                            style={{
                                transitionDelay: visibleCards.has(index) ? `${index * 150}ms` : '0ms'
                            }}
                        >
                            <ServiceSection
                                {...service}
                                {...servicesMeta[index]}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    )
}

export default ServicesPage
