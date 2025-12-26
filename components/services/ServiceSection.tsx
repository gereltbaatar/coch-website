"use client"

import Image from "next/image"
import { ServiceSectionProps } from "./type"

export const ServiceSection = ({
    id,
    title,
    description,
    features,
    whoIsItFor,
    image,
    backgroundColor,
    textColor,
    isReversed = false
}: ServiceSectionProps) => {
    return (
        <section
            id={id}
            className="w-full py-5"
        >
            <div className="max-w-[1536px] w-full mx-auto px-5">
                <div
                    className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[550px] lg:min-h-[600px] rounded-3xl overflow-hidden`}
                    style={{ backgroundColor }}
                >
                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-16 px-5 sm:px-8 lg:px-12">
                        <div className={`max-w-xl ${isReversed ? 'lg:ml-auto lg:mr-8' : 'lg:mr-auto lg:ml-8'}`}>
                            <h2
                                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-6"
                                style={{ color: textColor }}
                            >
                                {title}
                            </h2>

                            <div className="w-16 h-px mb-6" style={{ backgroundColor: textColor, opacity: 0.4 }}></div>

                            <p
                                className="text-base sm:text-lg leading-relaxed mb-8 font-light"
                                style={{ color: textColor, opacity: 0.9 }}
                            >
                                {description}
                            </p>

                            {/* Features */}
                            {features.length > 0 && (
                                <div className="mb-6">
                                    <h3
                                        className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                                        style={{ color: textColor, opacity: 0.7 }}
                                    >
                                        Юу багтсан бэ
                                    </h3>
                                    <ul className="space-y-2">
                                        {features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm sm:text-base font-light"
                                                style={{ color: textColor, opacity: 0.85 }}
                                            >
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: textColor, opacity: 0.5 }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Who is it for */}
                            {whoIsItFor.length > 0 && (
                                <div className="mb-8">
                                    <h3
                                        className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                                        style={{ color: textColor, opacity: 0.7 }}
                                    >
                                        Хэнд зориулсан бэ
                                    </h3>
                                    <ul className="space-y-2">
                                        {whoIsItFor.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm sm:text-base font-light"
                                                style={{ color: textColor, opacity: 0.85 }}
                                            >
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: textColor, opacity: 0.5 }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Button */}
                            <button
                                className="group inline-flex items-center gap-3 px-8 py-3 text-sm tracking-[0.15em] uppercase border-2 rounded-full transition-all duration-300 hover:opacity-80 font-medium"
                                style={{
                                    borderColor: textColor,
                                    color: textColor,
                                    backgroundColor: 'transparent'
                                }}
                            >
                                Дэлгэрэнгүй
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                    →
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[400px] lg:min-h-full">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

