"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export interface TestimonialData {
    headline: string
    paragraphs: string[]
    name: string
    role: string
    company?: string
    image: string
}

interface TestimonialSectionProps {
    testimonials: TestimonialData[]
    backgroundColor: string
    textColor: string
}

export const TestimonialSection = ({
    testimonials,
    backgroundColor,
    textColor
}: TestimonialSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const goToNext = () => {
        if (isAnimating || testimonials.length <= 1) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const goToPrev = () => {
        if (isAnimating || testimonials.length <= 1) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 500)
        return () => clearTimeout(timer)
    }, [currentIndex])

    const current = testimonials[currentIndex]

    return (
        <section
            className="w-full h-[500px] overflow-hidden"
            style={{ backgroundColor }}
        >
            <div className="max-w-[1536px] w-full h-full mx-auto px-5 py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full">
                    {/* Text Content */}
                    <div className="w-full lg:w-[60%] h-full flex flex-col">
                        {/* Headline with animation */}
                        <h2
                            className={`text-lg sm:text-xl lg:text-2xl xl:text-[28px] font-light leading-[1.4] mb-5 transition-all duration-500 ease-out ${
                                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                            }`}
                            style={{ color: textColor }}
                        >
                            {current.headline}
                        </h2>

                        {/* Paragraphs with staggered animation */}
                        <div className="space-y-3 flex-1 overflow-hidden">
                            {current.paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`text-xs sm:text-sm font-light leading-[1.8] transition-all duration-500 ease-out ${
                                        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                    }`}
                                    style={{
                                        color: textColor,
                                        opacity: isAnimating ? 0 : 0.85,
                                        transitionDelay: `${index * 50}ms`
                                    }}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Navigation - only show if multiple testimonials */}
                        {testimonials.length > 1 && (
                            <div className="flex items-center gap-3 mt-auto pt-4">
                                {/* Prev Button */}
                                <button
                                    onClick={goToPrev}
                                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        borderColor: textColor,
                                        color: textColor,
                                        opacity: 0.7
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={goToNext}
                                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        borderColor: textColor,
                                        color: textColor,
                                        opacity: 0.7
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Counter */}
                                <span
                                    className="text-xs font-light tracking-wider ml-2"
                                    style={{ color: textColor, opacity: 0.5 }}
                                >
                                    {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Image & Info */}
                    <div className="w-full lg:w-[40%] h-full flex flex-col">
                        <div className="flex-1 flex flex-col">
                            {/* Landscape Image with animation */}
                            <div
                                className={`relative w-full flex-1 max-h-[280px] rounded-lg overflow-hidden mb-3 transition-all duration-500 ease-out ${
                                    isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                                }`}
                            >
                                <Image
                                    src={current.image}
                                    alt={current.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name & Role with animation */}
                            <div
                                className={`transition-all duration-500 ease-out ${
                                    isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                                }`}
                                style={{ transitionDelay: '100ms' }}
                            >
                                <h3
                                    className="text-sm sm:text-base font-medium mb-0.5"
                                    style={{ color: textColor }}
                                >
                                    {current.name}
                                    {current.company && (
                                        <span className="font-normal"> of{" "}
                                            <span className="underline underline-offset-4 decoration-1">
                                                {current.company}
                                            </span>
                                        </span>
                                    )}
                                </h3>
                                <p
                                    className="text-xs italic"
                                    style={{ color: textColor, opacity: 0.7 }}
                                >
                                    {current.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
