"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Header, Footer } from "@/components/navigation"
import { useLanguage } from "@/lib/LanguageContext"
import { trBooking } from "@/translations/booking/trBooking"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Mail, Phone, Clock, ArrowRight, CheckCircle2, Calendar } from "lucide-react"

const BookingPage = () => {
    const { language } = useLanguage()
    const t = trBooking[language]
    const searchParams = useSearchParams()
    const serviceFromUrl = searchParams?.get("service") || ""
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        date: "",
        serviceType: serviceFromUrl,
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from("booking_requests")
                .insert({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    date: formData.date,
                    service_type: formData.serviceType,
                    message: formData.message,
                    status: "new"
                })

            if (error) {
                console.error("Error submitting booking:", error)
                return
            }

            setIsSuccess(true)
        } catch (err) {
            console.error("Error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setFormData({ name: "", phone: "", email: "", date: "", serviceType: "", message: "" })
        setIsSuccess(false)
    }

    const [availableDates, setAvailableDates] = useState<string[]>([])
    const [datesLoading, setDatesLoading] = useState(true)

    useEffect(() => {
        const fetchAvailableDates = async () => {
            try {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const threeWeeksLater = new Date(today)
                threeWeeksLater.setDate(today.getDate() + 21)

                const todayStr = today.toISOString().split("T")[0]
                const endStr = threeWeeksLater.toISOString().split("T")[0]

                const { data, error } = await supabase
                    .from("booking_dates")
                    .select("date")
                    .gte("date", todayStr)
                    .lte("date", endStr)
                    .order("date", { ascending: true })

                if (!error && data) {
                    setAvailableDates(data.map(d => d.date))
                }
            } catch (err) {
                console.error("Error fetching booking dates:", err)
            } finally {
                setDatesLoading(false)
            }
        }

        fetchAvailableDates()
    }, [])

    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr + "T00:00:00")
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekdays = language === "mn"
            ? ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"]
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const weekday = weekdays[date.getDay()]

        if (language === "mn") {
            return `${month}/${day} (${weekday})`
        }
        return `${month}/${day} (${weekday})`
    }

    return (
        <main className="min-h-screen bg-secondary">
            {/* Hero */}
            <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden">
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/FreeHeroBg.png"
                        alt="Booking Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
                <Header />
                <div className="max-w-[1536px] w-full mx-auto px-5 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-black/60 mb-4">
                            {t.subtitle}
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#2a2a2a] tracking-wide leading-[1.1]">
                            {t.titlePart1} <span className="text-main italic">{t.titlePart2}</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-[#4a4a4a] font-light leading-relaxed">
                            {t.description}
                        </p>
                        <div className="w-24 h-px bg-main/40 mx-auto mt-8"></div>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="w-full pt-10 sm:pt-16 pb-16 sm:pb-24">
                <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-5">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Left - Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="w-full lg:w-2/3"
                        >
                            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-main" />
                                        </div>
                                        <h3 className="text-3xl font-light text-[#2a2a2a] mb-3">{t.successTitle}</h3>
                                        <p className="text-[#4a4a4a] font-light text-lg max-w-md mb-8">{t.successMessage}</p>
                                        <button
                                            onClick={handleReset}
                                            className="px-8 py-3 bg-main text-white rounded-full font-medium hover:bg-main/90 transition-all duration-300"
                                        >
                                            {t.sendAnother}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#2a2a2a] mb-2 tracking-wide">
                                                {t.nameLabel}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t.namePlaceholder}
                                                required
                                                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-400 transition-colors duration-300"
                                            />
                                        </div>

                                        {/* Phone & Email row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-sm font-medium text-[#2a2a2a] mb-2 tracking-wide">
                                                    {t.phoneLabel}
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder={t.phonePlaceholder}
                                                    required
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-400 transition-colors duration-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#2a2a2a] mb-2 tracking-wide">
                                                    {t.emailLabel}
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder={t.emailPlaceholder}
                                                    required
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-400 transition-colors duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Date Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#2a2a2a] mb-4 tracking-wide">
                                                <Calendar className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                                                {t.dateLabel}
                                            </label>
                                            {datesLoading ? (
                                                <div className="flex items-center gap-2 text-gray-400 text-sm py-2">
                                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                                                    {language === "mn" ? "Ачааллаж байна..." : "Loading..."}
                                                </div>
                                            ) : availableDates.length === 0 ? (
                                                <p className="text-gray-400 text-sm py-2">
                                                    {language === "mn"
                                                        ? "Одоогоор боломжтой өдөр байхгүй байна"
                                                        : "No available dates at the moment"}
                                                </p>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    {availableDates.map((date) => (
                                                        <button
                                                            key={date}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, date }))}
                                                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                                formData.date === date
                                                                    ? "bg-main text-white shadow-md"
                                                                    : "bg-gray-50 text-gray-600 hover:bg-main/10 hover:text-main"
                                                            }`}
                                                        >
                                                            {formatDateDisplay(date)}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Service Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#2a2a2a] mb-4 tracking-wide">
                                                {t.serviceTypeLabel}
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {[
                                                    { value: "1:1", label: t.serviceType11 },
                                                    { value: "group", label: t.serviceTypeGroup },
                                                    { value: "corporate", label: t.serviceTypeCorporate }
                                                ].map((type) => (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, serviceType: type.value }))}
                                                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                                                            formData.serviceType === type.value
                                                                ? "bg-main text-white shadow-md"
                                                                : "bg-gray-50 text-gray-600 hover:bg-main/10 hover:text-main border border-gray-200"
                                                        }`}
                                                    >
                                                        {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#2a2a2a] mb-2 tracking-wide">
                                                {t.messageLabel}
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder={t.messagePlaceholder}
                                                rows={4}
                                                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-400 resize-none transition-colors duration-300"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.date || !formData.serviceType}
                                            className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-main hover:bg-main/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-base tracking-wide px-10 py-4 rounded-full transition-all duration-300"
                                        >
                                            {isSubmitting ? t.sending : t.submitButton}
                                            {!isSubmitting && (
                                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                            )}
                                            {isSubmitting && (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Right - Info Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="w-full lg:w-1/3"
                        >
                            <div className="lg:sticky lg:top-32 space-y-6">
                                {/* Info Card */}
                                <div className="bg-main text-white rounded-3xl p-8 sm:p-10">
                                    <h3 className="text-2xl font-light mb-6">{t.infoTitle}</h3>
                                    <div className="w-12 h-px bg-white/30 mb-6"></div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-sm">{t.infoEmail}</p>
                                                <p className="font-light">hello@example.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-sm">{t.infoPhone}</p>
                                                <p className="font-light">+976 9999 9999</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-sm">{t.infoSchedule}</p>
                                                <p className="font-light">{t.scheduleValue}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-sm">{t.responseTime}</p>
                                                <p className="font-light">{t.responseValue}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default BookingPage
