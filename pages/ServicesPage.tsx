"use client"

import { Sub } from "@/components/home"
import { Footer } from "@/components/navigation"
import { ServiceSection, ServicesHero, ProductsSection } from "@/components/services"
import { ServiceSectionProps } from "@/components/services/type"

const servicesData: ServiceSectionProps[] = [
    {
        id: "1-1-coaching",
        title: "1:1 Coaching",
        description: "Таны бизнесийн аяллын хажууд зөвлөгөө, урам, дэмжлэг байхад ид шид болдог. Хэрэв та хүн чанараа хүндэтгэсэн хурдаар цэцэглэн хөгжих бизнес рүү тэмүүлж байгаа бол, би таны аялалд хамтрахдаа маш их баяртай байх болно.",
        features: [
            "Таны бизнест тохирсон хувийн стратеги",
            "Долоо хоног бүрийн 1:1 уулзалт",
            "Slack/Messenger-ээр тасралтгүй дэмжлэг",
            "Бизнесийн зорилго, төлөвлөгөө боловсруулах",
            "Сэтгэл зүйн блок, саад бэрхшээлийг даван туулах"
        ],
        whoIsItFor: [
            "Бизнесээ эхлүүлж буй эсвэл өсгөхийг хүсч буй хүмүүс",
            "Өөрийгөө хөгжүүлэхийг хүсч буй бизнес эрхлэгчид",
            "Стресс, burnout-аас гарч баланс олохыг хүсч буй хүмүүс",
            "Зөөлөн, тогтвортой арга барилаар ажиллахыг хүсч буй хүмүүс"
        ],
        image: "/onetoone.png",
        backgroundColor: "#c4a99b",
        textColor: "#ffffff",
        isReversed: false,
        link: "/services/1-1"
    },
    {
        id: "group-coaching",
        title: "Your Simple & Spacious Business",
        description: "Энэ бол миний групп программ бөгөөд би танд тав тухтай ажлын долоо хоног, тогтвортой орлого, бизнес дээрээ хүн чанараа хүндэтгэх боломжийг олгоно. 150 гаруй гишүүд энгийн бөгөөд тав тухтай арга барилыг сурч байна.",
        features: [
            "Сар бүрийн групп коучинг уулзалтууд",
            "Хамтын суралцах орчин",
            "Бизнесийн загвар, хэрэгслүүд",
            "Нийгэмлэгийн дэмжлэг",
            "Онлайн сургалтын материалууд"
        ],
        whoIsItFor: [
            "Адилхан сэтгэлгээтэй хүмүүстэй холбогдохыг хүсч буй бизнес эрхлэгчид",
            "Илүү хямд үнээр коучингийн ашиг тусыг авахыг хүсч буй хүмүүс",
            "Групп орчинд илүү сайн суралцдаг хүмүүс",
            "Бусдын туршлагаас суралцахыг хүсч буй хүмүүс"
        ],
        image: "/group.png",
        backgroundColor: "#8a8e75",
        textColor: "#ffffff",
        isReversed: true,
        link: "/services/group"
    },
    {
        id: "corporate-training",
        title: "Corporate Training & Workshops",
        description: "Таны байгууллагын ажилтнуудын хөгжил, багийн хамтын ажиллагаа, манлайллын ур чадварыг дээшлүүлэх зориулалттай сургалт, workshop-ууд. Байгууллагын соёл, үнэ цэнийг бэхжүүлэхэд туслана.",
        features: [
            "Байгууллагад тохирсон customized хөтөлбөр",
            "Манлайлал ба удирдлагын ур чадвар",
            "Багийн хамтын ажиллагааны сургалт",
            "Стресс менежмент, ажлын байрны сэтгэл зүй",
            "Workshop, team building арга хэмжээ"
        ],
        whoIsItFor: [
            "Ажилтнуудынхаа хөгжилд анхаарч буй байгууллагууд",
            "Багийн хамтын ажиллагааг сайжруулахыг хүсч буй удирдлагууд",
            "Ажлын байрны соёлыг өөрчлөхийг хүсч буй компаниуд",
            "Манлайллын ур чадварыг хөгжүүлэхийг хүсч буй менежерүүд"
        ],
        image: "/onetoone.png",
        backgroundColor: "#2a2a2a",
        textColor: "#ffffff",
        isReversed: false,
        link: "/services/corporate"
    }
]

const ServicesPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <ServicesHero />

            {/* Service Sections */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-black/5 pb-6 gap-4">
                <div className="flex items-center gap-6">
                    <button className="text-xs font-semibold tracking-widest text-black hover:text-black/60 transition-colors uppercase">
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-semibold text-gray-800">All Services</p>
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(45 12 12)" />
                            </svg>
                        </div>
                    </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-black/40">
                    3
                </div>
            </div>

            <div className="bg-secondary w-full min-h-fit max-w-[1536px] mx-auto px-4 sm:px-5 py-12 sm:py-16 lg:py-24">
                <div className="border border-main bg-main rounded-4xl w-full min-h-fit p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                    {servicesData.map((service) => (
                        <ServiceSection key={service.id} {...service} />
                    ))}
                </div>
            </div>

            <Footer />
        </main >
    )
}

export default ServicesPage
