"use client"

import Link from "next/link"

interface ServiceDetailContentProps {
    features: string[]
    whoIsItFor: string[]
    benefits: string[]
    pricing?: {
        price: string
        duration: string
        includes: string[]
    }
    bookingLink?: string
    accentColor: string
}

export const ServiceDetailContent = ({
    features,
    whoIsItFor,
    benefits,
    pricing,
    bookingLink = "/booking",
    accentColor
}: ServiceDetailContentProps) => {
    return (
        <section className="w-full py-16 sm:py-20 bg-secondary">
            <div className="max-w-[1536px] w-full mx-auto px-5">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-2/3 space-y-16">
                        {/* Features Section */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-light text-[#2a2a2a] mb-8">
                                Юу <span className="italic" style={{ color: accentColor }}>багтсан</span> бэ
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${accentColor}20` }}
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                style={{ color: accentColor }}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-[#4a4a4a] font-light leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Is It For Section */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-light text-[#2a2a2a] mb-8">
                                Хэнд <span className="italic" style={{ color: accentColor }}>зориулсан</span> бэ
                            </h2>
                            <div className="space-y-4">
                                {whoIsItFor.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full mt-2 shrink-0"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <p className="text-[#4a4a4a] font-light leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-light text-[#2a2a2a] mb-8">
                                Ямар <span className="italic" style={{ color: accentColor }}>үр дүн</span> гарах вэ
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="p-6 bg-white rounded-2xl shadow-sm border-l-4"
                                        style={{ borderColor: accentColor }}
                                    >
                                        <div
                                            className="text-3xl font-light mb-3"
                                            style={{ color: accentColor }}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <p className="text-[#4a4a4a] font-light leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar - Booking Card */}
                    <div className="w-full lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <div
                                className="p-8 rounded-3xl text-white"
                                style={{ backgroundColor: accentColor }}
                            >
                                <h3 className="text-2xl sm:text-3xl font-light mb-4">
                                    Коучинг захиалах
                                </h3>
                                <div className="w-12 h-px bg-white/40 mb-6"></div>

                                {pricing && (
                                    <div className="mb-8">
                                        <div className="text-4xl font-light mb-2">{pricing.price}</div>
                                        <p className="text-white/80 text-sm mb-4">{pricing.duration}</p>
                                        <ul className="space-y-2">
                                            {pricing.includes.map((item, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-white/90">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <p className="text-white/80 font-light mb-8 leading-relaxed">
                                    Та надтай хамтран ажиллахыг хүсвэл доорх товчийг дарж холбогдоорой.
                                </p>

                                <Link
                                    href={bookingLink}
                                    className="group w-full inline-flex justify-center items-center gap-3 bg-white text-[#2a2a2a] font-medium text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/90"
                                >
                                    Book a Coach
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                        →
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
