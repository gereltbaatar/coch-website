import Image from "next/image";
import Link from "next/link";
import { Diamond, User, Send } from "lucide-react";

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
                className="object-cover"
                priority
              />

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-main/20 rounded-full blur-2xl -z-10"></div>

              {/* Chat Message Bubble 1 */}
              <div className="absolute top-8 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10 animate-fade-in">
                <p className="text-sm text-gray-800">
                  Миний захиалга хэзээ эхлэх бол? 😓
                </p>
              </div>

              {/* Chat Message Bubble 2 */}
              <div className="absolute top-24 sm:top-28 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10 animate-fade-in delay-100">
                <p className="text-sm text-gray-800">
                  Захиалга өгсны дараа дунджаар хэр хурдан биелэгддэг вэ? 😅
                </p>
              </div>

              {/* Chat Message Bubble 3 */}
              <div className="absolute top-40 sm:top-48 right-4 sm:right-6 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg max-w-[280px] sm:max-w-[320px] z-10 animate-fade-in delay-200">
                <p className="text-sm text-gray-800">
                  Үнэн юм уу? 😐
                </p>
              </div>

              {/* Write to us / Administrator Card */}
              <Link
                href="/contact"
                className="absolute bottom-8 left-4 sm:left-6 md:left-8 bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-lg flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all duration-300 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <Send className="w-4 h-4 text-gray-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">
                    Напишите нам
                  </span>
                  <span className="text-xs text-gray-500">Администратор</span>
                </div>
              </Link>

              {/* Join us! Social Media Card */}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 right-4 sm:right-6 md:right-8 bg-white rounded-2xl border border-green-300 px-4 py-3 shadow-lg flex items-center gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 z-10"
              >
                <div className="w-8 h-8 rounded-full bg-[#00f2ea] flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05 6.33 6.33 0 0 0 0 12.66 6.34 6.34 0 0 0 6.33-6.33V7.29a4.85 4.85 0 0 0 3.77 4.25v-3.4a1.06 1.06 0 0 0-.09-.45z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800 ml-1">
                  Присоединяйтесь!
                </span>
              </a>
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
