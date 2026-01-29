"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-secondary flex items-center justify-center px-4">
            <div className="max-w-[1000px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <motion.div
                    className="text-center lg:text-left order-2 lg:order-1"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-main mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4">
                        Хуудас олдсонгүй
                    </h2>

                    <p className="text-gray-500 text-base mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Таны хайж буй хуудас устгагдсан эсвэл нэр нь өөрчлөгдсөн байна.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            href="/"
                            className="bg-main text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-3 hover:bg-main/90 transition-all duration-300"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Нүүр хуудас</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="bg-white text-gray-700 px-8 py-3.5 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Буцах</span>
                        </button>
                    </div>
                </motion.div>

                {/* Right - Simple Art */}
                <motion.div
                    className="relative order-1 lg:order-2 flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                        {/* Simple circle background */}
                        <div className="absolute inset-0 rounded-full bg-main/10" />

                        {/* Center element */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-main rounded-3xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-5xl sm:text-6xl font-light">?</span>
                            </div>
                        </motion.div>

                        {/* Single floating dot */}
                        <motion.div
                            className="absolute top-8 right-8 w-4 h-4 bg-main/40 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
