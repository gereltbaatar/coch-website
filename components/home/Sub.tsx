import Image from "next/image"

export const Sub = () => {
    return (
        <div className="min-h-screen h-full w-full bg-secondary relative">
            <Image src={"/CoachingSub.png"} alt="Uyanga" fill objectFit="cover" className="object-center" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center gap-30">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl sm:text-5xl font-light tracking-wide text-black leading-tight">Subscribe</h2>
                        <h2 className="text-3xl sm:text-5xl font-light tracking-wide leading-tight">
                            <span className="text-main">To Our Newsletter</span>
                        </h2>
                    </div>
                    <p className="text-black text-lg font-light max-w-[900px] text-center leading-relaxed">Want tips to save time, boost productivity, and run your business smoother? Join my newsletter for weekly VA insights, tools, and support—straight to your inbox!</p>
                </div>

                <button className="border-2 border-main px-8 py-3 rounded-xl hover:bg-main hover:text-white transition-all duration-300 group">
                    <p className="text-main group-hover:text-white font-light text-sm tracking-widest">SUBSCRIBE NOW</p>
                </button>

                <div className="">
                    <p className="">Privacy Policy |  Copyright 2025  ( your Business Name Here )</p>
                </div>
            </div>
        </div>
    )
}