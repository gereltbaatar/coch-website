import Image from "next/image"
import { Facebook, Instagram, Linkedin, Send } from "lucide-react"

export const Sub = () => {
    return (
        <section className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/CoachingSub.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col">

                <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto pt-20 pb-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap mb-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-black leading-tight">
                            Subscribe
                        </h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
                            <span className="text-main">To Our Newsletter</span>
                        </h2>
                    </div>

                    <p className="text-black text-sm sm:text-base lg:text-lg font-light max-w-[900px] text-center leading-relaxed px-4 mb-8">
                        Want tips to save time, boost productivity, and run your business smoother? Join my newsletter for weekly VA insights, tools, and support—straight to your inbox!
                    </p>

                    <button className="border-2 border-main px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-main hover:text-white transition-all duration-300 group mt-2">
                        <p className="text-main group-hover:text-white font-light text-xs sm:text-sm tracking-widest">SUBSCRIBE NOW</p>
                    </button>
                </div>

                {/* Footer Content - At the bottom */}
                <div className="border-t border-black/10 pt-8 pb-8 mt-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">

                        {/* Navigation Links */}
                        <div className="flex gap-8 sm:gap-12 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-main uppercase tracking-widest text-sm">Menu</h3>
                                <nav className="flex flex-col gap-2 text-black/70 font-light text-sm sm:text-base">
                                    <a href="#" className="hover:text-main transition-colors">Home</a>
                                    <a href="#about" className="hover:text-main transition-colors">About Me</a>
                                    <a href="#services" className="hover:text-main transition-colors">Services</a>
                                </nav>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-main uppercase tracking-widest text-sm opacity-0 select-none">Menu</h3>
                                <nav className="flex flex-col gap-2 text-black/70 font-light text-sm sm:text-base">
                                    <a href="#blog" className="hover:text-main transition-colors">Blog</a>
                                    <a href="#contact" className="hover:text-main transition-colors">Contact</a>
                                </nav>
                            </div>
                        </div>

                        {/* Socials & Copyright */}
                        <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto">
                            <div className="flex gap-6">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full hover:bg-main hover:text-white transition-all group">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center lg:justify-end gap-2 sm:gap-6 text-xs sm:text-sm text-black/50 font-light">
                                <p>© 2025 Coaching Business</p>
                                <span className="hidden sm:inline">•</span>
                                <a href="#" className="hover:text-main transition-colors">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}