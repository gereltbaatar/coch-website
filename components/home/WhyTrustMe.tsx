'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import CountUp from "react-countup"
import { useLanguage } from "@/lib/LanguageContext"
import { trWhyTrustMe } from "@/translations/home/trWhyTrustMe"

export const WhyTrustMe = () => {
    const [startCount, setStartCount] = useState(false)
    const statsRef = useRef<HTMLDivElement>(null)
    const { language } = useLanguage()
    const t = trWhyTrustMe[language]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !startCount) {
                        setStartCount(true)
                    }
                })
            },
            {
                threshold: 0.8,
                rootMargin: '0px',
            }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current)
            }
        }
    }, [startCount])

    return (
        <div className="w-full min-h-screen h-full bg-secondary relative py-12 sm:py-0">
            <Image src="/WhyTrustMeTwo.png" alt="Uyanga" fill objectFit="cover" className="object-center" />
            <div className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2">
                {/* Left Side - Stats */}
                <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div ref={statsRef} className="max-w-md space-y-8 sm:space-y-12 w-full">
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-black tracking-wide">
                            {t.title}
                        </h2>

                        {/* Stats */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">
                                    {startCount ? (
                                        <CountUp start={0} end={8} duration={2.5} />
                                    ) : (
                                        "0"
                                    )}{" "}
                                    {t.years}
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">{t.professionalExperience}</p>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">
                                    {startCount ? (
                                        <CountUp start={0} end={99} duration={2.5} suffix="%" />
                                    ) : (
                                        "0%"
                                    )}
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">{t.customerRatings}</p>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">
                                    {startCount ? (
                                        <CountUp start={0} end={500} duration={2.5} suffix="+" />
                                    ) : (
                                        "0+"
                                    )}
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">{t.livesTransformed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div className="flex flex-col max-w-[400px] w-full bg-main/90 rounded-3xl p-6 sm:p-8 lg:p-14 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">{t.certifiedExpertise}</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">{t.certifiedExpertiseDesc}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">{t.personalizedCare}</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">{t.personalizedCareDesc}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">{t.rewardingResults}</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">{t.rewardingResultsDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
