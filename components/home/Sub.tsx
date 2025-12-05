import Image from "next/image"

export const Sub = () => {
    return (
        <div className="min-h-screen h-full w-full bg-secondary relative overflow-hidden">
            <Image src={"/CoachingSub.png"} alt="Uyanga" fill objectFit="cover" className="object-center" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-4xl w-full">
                    {/* Title */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left flex-wrap">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-black leading-tight">Subscribe</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
                            <span className="text-main">To Our Newsletter</span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-black text-sm sm:text-base lg:text-lg font-light max-w-[900px] text-center leading-relaxed px-4">
                        Want tips to save time, boost productivity, and run your business smoother? Join my newsletter for weekly VA insights, tools, and support—straight to your inbox!
                    </p>

                    {/* Subscribe Button */}
                    <button className="border-2 border-main px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-main hover:text-white transition-all duration-300 group mt-2">
                        <p className="text-main group-hover:text-white font-light text-xs sm:text-sm tracking-widest">SUBSCRIBE NOW</p>
                    </button>

                    {/* Privacy Policy */}
                    <div className="mt-6 sm:mt-8">
                        <p className="text-black/60 text-xs sm:text-sm font-light text-center">
                            Privacy Policy | Copyright 2025 (your Business Name Here)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}