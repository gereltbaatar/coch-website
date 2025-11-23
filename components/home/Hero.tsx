import Image from "next/image";
import Link from "next/link";
import { Diamond } from "lucide-react";

export const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-secondary pt-20 sm:pt-24">
      <div className="max-w-[1536px] w-full mx-auto px-5 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Left Section - Portrait */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-center">
            <div className="relative h-[650px] w-full rounded-3xl overflow-hidden">
              <Image
                src="/HeroImage.jpg"
                alt="Uyanga - ICF-trained coach"
                fill
                className="object-cover object-bottom"
                priority
              />

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-main/20 rounded-full blur-2xl -z-10"></div>

              {/* Chat Message Bubble 1 */}
              <div className="absolute top-8 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">
                  Миний захиалга хэзээ эхлэх бол? 😓
                </p>
              </div>

              {/* Chat Message Bubble 2 */}
              <div className="absolute top-24 sm:top-28 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">
                  Захиалга өгсны дараа дунджаар хэр хурдан биелэгддэг вэ? 😅
                </p>
              </div>

              {/* Chat Message Bubble 3 */}
              <div className="absolute top-40 sm:top-48 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">Үнэн юм уу? 😐</p>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#3a3a3a] leading-tight">
              Helping you uncover
              <br />
              <span className="text-main">the power within</span>
            </h1>

            {/* Divider with Diamonds */}
            <div className="flex items-center gap-2 py-2">
              <Diamond className="w-3 h-3 text-main fill-main" />
              <div className="flex-1 h-px bg-main/30"></div>
              <Diamond className="w-3 h-3 text-main fill-main" />
            </div>

            {/* Description */}
            <div className="space-y-4 text-[#3a3a3a] text-base sm:text-lg leading-relaxed max-w-2xl">
              <p>
                <span className="font-semibold text-main">Uyanga</span> is an
                ICF-trained coach, public speaker, and guide in emotional
                intelligence and spiritual growth.
              </p>
              <p>
                Through her own transformative journey, she discovered the
                profound impact of self-awareness and inner work. Now, she
                dedicates herself to helping individuals uncover their true
                selves, navigate life&apos;s challenges with grace, and step
                into their fullest potential.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-block bg-main hover:bg-main/90 text-white font-semibold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
