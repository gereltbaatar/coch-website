import Image from "next/image";

export const AboutMe = () => {
    const features = [
        "ICF-trained coach",
        "Public speaker",
        "Emotional intelligence",
        "Spiritual growth",
        "Self-awareness",
        "Inner peace",
    ];

    return (
        <section className="w-full bg-secondary py-16 sm:py-24 lg:py-32">
            <div className="max-w-[1536px] w-full mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side - Image */}
                    <div className="relative w-full aspect-4/5 lg:aspect-square rounded-[2.5rem] overflow-hidden bg-secondary/20">
                        <Image
                            src="/AboutMeImage.png"
                            alt="Uyanga - ICF-trained coach"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex flex-col space-y-8">
                        {/* Tag */}
                        <div>
                            <span className="inline-block px-6 py-2 rounded-full border border-main text-main text-sm font-medium tracking-wider uppercase">
                                About Me
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#2a2a2a] leading-[1.1]">
                            Guiding you towards <br />
                            <span className="text-main italic">clarity and confidence.</span>
                        </h2>

                        {/* Description */}
                        <div className="space-y-6 text-[#4a4a4a] text-base sm:text-lg leading-relaxed">
                            <p>
                                Hi, I'm Uyanga — an 3x certified self-awareness and spiritual
                                coach and public speaker. For a long time, I struggled with
                                doubt and self-confidence. That was my turning point — the
                                moment I chose to begin my inner work.
                            </p>
                            <p>
                                Today, I guide others on this same journey: uncovering limiting
                                beliefs, bringing hidden patterns into the light, and building
                                the confidence to step fully into one's authentic self.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-main/10 flex items-center justify-center text-main">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-[#2a2a2a] font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};