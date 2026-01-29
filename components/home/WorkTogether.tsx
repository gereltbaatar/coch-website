"use client";

import { WorkTogetherCard, WorkProgram } from "./";
import { useLanguage } from "@/lib/LanguageContext";
import { trWorkTogether } from "@/translations/home/trWorkTogether";

export const WorkTogether = () => {
    const { language } = useLanguage();
    const t = trWorkTogether[language];

    return (
        <section className="bg-secondary w-full min-h-fit">
            <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-5 py-12 sm:py-16 lg:py-24">
                <div className="flex flex-col items-center gap-6 sm:gap-8">

                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-wide text-center">{t.title1} <span className="text-main">{t.title2}</span></h2>
                    </div>
                    <div className="border border-main bg-main rounded-4xl w-full min-h-fit p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                        <div className="w-full grid-cols-1 sm:grid-cols-2 grid gap-4 sm:gap-6">
                            <WorkTogetherCard title={t.oneToOneTitle} description={t.oneToOneDesc} image="/onetoone.png" link="/services/1-1" />
                            <WorkTogetherCard title={t.groupTitle} description={t.groupDesc} image="/group.png" link="/services/group" />
                        </div>
                        <WorkProgram />
                    </div>

                </div>
            </div>
        </section>
    )
}
