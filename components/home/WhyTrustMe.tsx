import Image from "next/image"

export const WhyTrustMe = () => {
    return (
        <div className="w-full min-h-screen h-full bg-secondary relative">
            <Image src="/WhyTrustMeTwo.png" alt="Uyanga" fill objectFit="cover" className="object-center" />
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Stats */}
                <div className="flex items-center justify-center p-8 lg:p-12">
                    <div className="max-w-md space-y-12">
                        {/* Title */}
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black tracking-wide">
                            Why trust me?
                        </h2>

                        {/* Stats */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-5xl sm:text-6xl font-light text-main">8 years</p>
                                <p className="text-sm sm:text-base font-light text-black/70 tracking-wide">Professional Experience</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-5xl sm:text-6xl font-light text-main">99%</p>
                                <p className="text-sm sm:text-base font-light text-black/70 tracking-wide">Customer Ratings</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-5xl sm:text-6xl font-light text-main">500+</p>
                                <p className="text-sm sm:text-base font-light text-black/70 tracking-wide">Lives Transformed Through My Programs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-8 lg:p-12">

                    <div className="flex flex-col max-w-[400px] bg-main opacity-50 rounded-3xl p-14 gap-3">

                        <div className="">
                            <p className="">Certified Expertise </p>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>

                        <div className="">
                            <p className="">Personalized Care</p>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>

                        <div className="">
                            <p className="">Rewarding Results</p>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}