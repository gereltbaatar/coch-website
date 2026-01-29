"use client"

import { Header } from "@/components/navigation"
import Image from "next/image"

interface ServiceDetailHeroProps {
    title: string
    subtitle: string
    description: string
    image: string
    backgroundColor: string
    textColor: string
}

export const ServiceDetailHero = ({
    title,
    subtitle,
    description,
    image,
    backgroundColor,
    textColor
}: ServiceDetailHeroProps) => {
    return (
        <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden min-h-[60vh]">
            <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundColor }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            <Header />

            <div className="max-w-[1536px] w-full mx-auto px-5 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2
                            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
                            style={{ color: textColor, opacity: 0.7 }}
                        >
                            {subtitle}
                        </h2>
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6"
                            style={{ color: textColor }}
                        >
                            {title}
                        </h1>
                        <div className="w-24 h-px mx-auto lg:mx-0 mb-6" style={{ backgroundColor: textColor, opacity: 0.4 }}></div>
                        <p
                            className="text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
                            style={{ color: textColor, opacity: 0.9 }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
