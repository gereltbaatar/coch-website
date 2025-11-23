import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-secondary pt-5">
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
              <div className="absolute bottom-8 right-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">
                  Би хэрхэн өөрийгөө илүү сайн мэдэх вэ? 😓
                </p>
              </div>

              {/* Chat Message Bubble 2 */}
              <div className="absolute bottom-24 sm:bottom-28 right-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">
                  Коучинг хэр удаан үр дүн өгдөг вэ? 😅
                </p>
              </div>

              {/* Chat Message Bubble 3 */}
              <div className="absolute bottom-40 sm:bottom-44 left-4 sm:left-6 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10">
                <p className="text-sm text-gray-800">
                  Энэ миний хувьд тохирох уу? 😐
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 sm:space-y-10">
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-[#2a2a2a] leading-[1.1]">
                Helping you uncover
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1]">
                <span className="text-main italic">the power within</span>
              </h1>
            </div>

            {/* Minimalist Divider */}
            <div className="w-16 h-px bg-main/40"></div>

            {/* Description */}
            <div className="space-y-6 text-[#4a4a4a] text-base sm:text-lg leading-relaxed max-w-xl">
              <p className="font-light">
                <span className="font-medium text-main">Uyanga</span> is an
                ICF-trained coach, public speaker, and guide in emotional
                intelligence and spiritual growth.
              </p>
              <p className="font-light">
                Through her own transformative journey, she discovered the
                profound impact of self-awareness and inner work. Now, she
                dedicates herself to helping individuals uncover their true
                selves, navigate life&apos;s challenges with grace, and step
                into their fullest potential.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-main hover:bg-main/90 text-white font-light text-sm sm:text-base tracking-wide px-10 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Now
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
