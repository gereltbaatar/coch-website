import { Header } from "@/components/navigation";
import Image from "next/image";

export const BlogHero = () => {
    return (
        <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/BlogHeroBg.png"
                    alt="Blog Hero Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <Header />
            <div className="max-w-[1536px] w-full mx-auto px-5 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-black/60 mb-4">
                        Insights & Stories
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#2a2a2a] tracking-wide leading-[1.1]">
                        Latest <span className="text-main italic">Articles</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-[#4a4a4a] font-light leading-relaxed">
                        Discover insights, tips, and stories about personal growth, wellness, and living your best life.
                    </p>
                    <div className="w-24 h-px bg-main/40 mx-auto mt-8"></div>
                </div>
            </div>
        </section>
    );
};
