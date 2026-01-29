"use client";

import Image from "next/image"
import Link from "next/link"
import { WorkTogetherCardProps } from "./type"
import { useLanguage } from "@/lib/LanguageContext";
import { trWorkTogether } from "@/translations/home/trWorkTogether";

export const WorkTogetherCard = ({ title, description, image, link = "/services" }: WorkTogetherCardProps) => {
    const { language } = useLanguage();
    const t = trWorkTogether[language];

    return (
        <div className="bg-secondary p-6 rounded-3xl flex flex-col min-h-fit">
            <div className="flex sm:justify-between justify-center items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-main items-center justify-center sm:flex hidden">
                    <div className="w-3.5 h-3.5 rounded-full bg-white" />
                </div>
                <Image
                    src={image}
                    alt="image card"
                    width={280}
                    height={280}
                    className="object-cover rounded-3xl"
                />
            </div>

            <div className="flex flex-col gap-4 mt-auto">
                <h1 className="text-black text-3xl font-medium">{title}</h1>
                <p className="text-gray-700 text-base font-normal leading-relaxed">{description}</p>
                <Link
                    href={link}
                    className="bg-main text-white text-base font-normal px-8 py-2.5 rounded-full transition-all duration-300 hover:bg-main/90 border border-main cursor-pointer transform w-fit mt-2"
                >
                    {t.readMore}
                </Link>
            </div>
        </div>
    )
}
