"use client"

import { ServiceSectionProps } from "./type"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/LanguageContext"
import { trServiceSection } from "@/translations/services/trServiceSection"

export const ServiceSection = ({
    title,
    description,
    whoIsItFor,
    image,
    link
}: ServiceSectionProps) => {
    const { language } = useLanguage()
    const t = trServiceSection[language]

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[450px] border border-main rounded-4xl overflow-hidden">
                {/* Content Side */}
                <div className="bg-secondary p-6 rounded-3xl sm:rounded-l-3xl sm:rounded-tr-none sm:rounded-br-none flex flex-col min-h-fit">
                    <div className="flex sm:justify-between justify-center items-start mb-4">
                        <div className="w-8 h-8 rounded-full bg-main items-center justify-center sm:flex hidden">
                            <div className="w-3.5 h-3.5 rounded-full bg-white" />
                        </div>

                        <Image
                            src={image}
                            alt={title}
                            width={280}
                            height={280}
                            className="object-cover rounded-3xl sm:hidden block"
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        <h1 className="text-black text-2xl sm:text-3xl font-medium">{title}</h1>
                        <p className="text-gray-700 text-sm sm:text-base font-normal leading-relaxed">
                            {description}
                        </p>

                        {whoIsItFor && whoIsItFor.length > 0 && (
                            <div className="mt-2">
                                <h3 className="text-black text-base sm:text-lg font-medium mb-2">{t.whoIsItFor}</h3>
                                <ul className="text-gray-700 text-sm sm:text-base font-normal leading-relaxed space-y-1">
                                    {whoIsItFor.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-main mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link
                            href={link || "#"}
                            className="bg-main text-white text-sm sm:text-base font-normal px-6 sm:px-8 py-2.5 rounded-full transition-all duration-300 hover:bg-main/90 border border-main cursor-pointer transform w-fit mt-2"
                        >
                            {t.details}
                        </Link>
                    </div>
                </div>

                {/* Image Side */}
                <div className="bg-secondary rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none flex-col min-h-fit p-6 hidden sm:flex">
                    <div className="relative w-full h-full min-h-[350px]">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
