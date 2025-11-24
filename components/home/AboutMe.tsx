import Image from "next/image"

export const AboutMe = () => {
    return (
        <div className="w-full h-full bg-secondary">
            <div className="max-w-[1536px] w-full mx-auto p-5 py-12">
                <div className="w-full h-[630px] bg-main/80 rounded-3xl flex">
                    <div className="w-[500px] h-full relative overflow-hidden rounded-3xl">
                        <Image src="/AboutMeImage.png" alt="Uyanga - ICF-trained coach" fill className="object-cover object-bottom" priority />
                    </div>
                    <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center">
                        {/* Title */}
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-8"
                        >
                            About me
                        </h2>

                        {/* Introduction */}
                        <p className="text-base sm:text-lg font-medium text-white leading-relaxed mb-6">
                            Hi, I'm Uyanga — an 3x certified self-awareness and spiritual coach and public speaker.
                        </p>

                        {/* Story */}
                        <div className="space-y-4 text-base sm:text-lg font-light text-white/90 leading-loose">
                            <p>
                                For a long time, I struggled with doubt and self-confidence. These doubts weighed heavily on me and kept me from becoming the person I knew I could be. I stopped going outside altogether, hiding myself, fearing that yet another person would tell me I was not enough. That was my turning point — the moment I chose to begin my inner work.
                            </p>

                            <p>
                                Through deep reflection, I discovered a powerful truth: real change comes from within. It is not about chasing external validation, but about seeing ourselves clearly — as if looking into a mirror — and uncovering what lies on the other side.
                            </p>

                            <p>
                                Today, I guide others on this same journey: uncovering limiting beliefs, bringing hidden patterns into the light, and building the confidence to step fully into one's authentic self. My mission is to create a safe space where you can discover who you truly are, so that you can move forward with self-trust and inner peace.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}