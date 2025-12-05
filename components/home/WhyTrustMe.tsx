import Image from "next/image"

export const WhyTrustMe = () => {
    return (
        <div className="w-full min-h-screen h-full bg-secondary relative py-12 sm:py-0">
            <Image src="/WhyTrustMeTwo.png" alt="Uyanga" fill objectFit="cover" className="object-center" />
            <div className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2">
                {/* Left Side - Stats */}
                <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div className="max-w-md space-y-8 sm:space-y-12 w-full">
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-black tracking-wide">
                            Why trust me?
                        </h2>

                        {/* Stats */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">8 years</p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">Professional Experience</p>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">99%</p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">Customer Ratings</p>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-main">500+</p>
                                <p className="text-xs sm:text-sm lg:text-base font-light text-black/70 tracking-wide">Lives Transformed Through My Programs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div className="flex flex-col max-w-[400px] w-full bg-main/90 rounded-3xl p-6 sm:p-8 lg:p-14 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">Certified Expertise</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">Personalized Care</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl font-medium text-white">Rewarding Results</p>
                            <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}