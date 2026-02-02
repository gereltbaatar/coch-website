"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BlogPostCard } from "../blog"
import { supabase, Blog as BlogType } from "@/lib/supabase"
import { useLanguage } from "@/lib/LanguageContext"
import { trBlog } from "@/translations/home/trBlog"
import { motion } from "framer-motion"

export const Blog = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { language } = useLanguage()
    const t = trBlog[language]

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(6)

            if (error) throw error
            setBlogs(data || [])
        } catch (error: unknown) {
            const err = error as { message?: string; code?: string }
            console.error("Failed to fetch blogs:", err.message, err.code)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="bg-secondary w-full min-h-fit overflow-hidden">
            <div className="w-full max-w-[1536px] mx-auto pb-12 sm:pb-16 lg:pb-24">
                <div className="w-full px-4 sm:px-6">
                    <div className="bg-main border border-secondary rounded-[2.5rem] p-8 sm:p-12 flex flex-col items-center gap-8 sm:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-secondary tracking-wide text-center">
                                {t.title1} <span className="font-medium">{t.title2}</span>
                            </h2>
                        </motion.div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center py-12">
                                    <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" />
                                </div>
                            ) : blogs.length > 0 ? (
                                blogs.map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <BlogPostCard blog={blog} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-secondary/60">
                                    {t.noPosts}
                                </div>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center w-full"
                        >
                            <Link
                                href="/blogs"
                                className="px-8 py-3 rounded-full border border-secondary text-secondary font-medium hover:bg-secondary hover:text-main transition-all duration-300"
                            >
                                {t.seeAllPosts}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
