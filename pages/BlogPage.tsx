"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { supabase, Blog, TiptapContent } from "@/lib/supabase"
import { Footer } from "@/components/navigation"
import { CommentSection, ReactionSection } from "@/components/blog"
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react"
import { toast } from "sonner"
import { generateHTML } from "@tiptap/html"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import TiptapLink from "@tiptap/extension-link"
import TiptapImage from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import { TextStyle } from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"

interface BlogPageProps {
    id: string
}

// Extensions for generating HTML from Tiptap JSON
const extensions = [
    StarterKit,
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TiptapLink,
    TiptapImage,
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
]

// Helper to format relative time
const getRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
        return `${diffMins} минутын өмнө`
    } else if (diffHours < 24) {
        return `${diffHours} цагийн өмнө`
    } else if (diffDays < 7) {
        return `${diffDays} өдрийн өмнө`
    } else {
        return date.toLocaleDateString('mn-MN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '.')
    }
}

const BlogPage = ({ id }: BlogPageProps) => {
    const [blog, setBlog] = useState<Blog | null>(null)
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchBlog()
        fetchRecentBlogs()
    }, [id])

    // Convert Tiptap JSON to HTML
    const htmlContent = useMemo(() => {
        if (!blog?.content) return ''

        // If content is already a string (HTML or JSON string)
        if (typeof blog.content === 'string') {
            try {
                // Try to parse as JSON
                const jsonContent = JSON.parse(blog.content) as TiptapContent
                return generateHTML(jsonContent, extensions)
            } catch {
                // If parsing fails, assume it's already HTML
                return blog.content
            }
        }

        // If content is already a TiptapContent object
        return generateHTML(blog.content as TiptapContent, extensions)
    }, [blog?.content])

    const fetchBlog = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .eq('status', 'published')
                .single()

            if (error) throw error
            setBlog(data)

            // Increment view count
            if (data) {
                await supabase
                    .from('blogs')
                    .update({ views: (data.views || 0) + 1 })
                    .eq('id', data.id)
            }
        } catch (err) {
            console.error("Failed to fetch blog:", err)
            setError("Нийтлэл олдсонгүй")
        } finally {
            setIsLoading(false)
        }
    }

    const fetchRecentBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .neq('id', id)
                .order('created_at', { ascending: false })
                .limit(6)

            if (error) throw error
            setRecentBlogs(data || [])
        } catch (err) {
            console.error("Failed to fetch recent blogs:", err)
        }
    }

    if (isLoading) {
        return (
            <main className="bg-secondary min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
            </main>
        )
    }

    if (error || !blog) {
        return (
            <main className="bg-secondary min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">{error || "Нийтлэл олдсонгүй"}</h1>
                <Link
                    href="/blogs"
                    className="flex items-center gap-2 text-main hover:underline"
                >
                    <ArrowLeft size={18} />
                    Бүх нийтлэл рүү буцах
                </Link>
            </main>
        )
    }

    const formattedDate = new Date(blog.created_at).toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <main className="bg-secondary min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
                {blog.cover_image ? (
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/blogs"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-all"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Буцах</span>
                </Link>

                {/* Title on Hero */}
                <div className="w-full absolute bottom-0 left-0 right-0 py-6 p-6 sm:py-10 lg:py-16">
                    <div className="w-full max-w-[1536px] mx-auto">
                        {blog.category && (
                            <span className="inline-block px-4 py-1.5 bg-main text-white text-sm font-medium rounded-full mb-4">
                                {blog.category}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {blog.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section with Sidebar */}
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar - Recent Posts */}
                    <aside className="w-full lg:w-80 shrink-0 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-6 bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-900 mb-4">Шинэ мэдээ</h3>
                            <div className="space-y-4">
                                {recentBlogs.length > 0 ? (
                                    recentBlogs.map((recentBlog, index) => (
                                        <Link
                                            key={recentBlog.id}
                                            href={`/blogs/${recentBlog.id}`}
                                            className={`flex gap-3 group ${index !== recentBlogs.length - 1 ? 'pb-4 border-b border-dashed border-gray-200' : ''}`}
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                {recentBlog.cover_image ? (
                                                    <Image
                                                        src={recentBlog.cover_image}
                                                        alt={recentBlog.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                            </div>
                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-main transition-colors">
                                                    {recentBlog.title}
                                                </h4>
                                                <div className="flex items-center gap-1 mt-1 text-gray-400">
                                                    <Clock size={12} />
                                                    <span className="text-xs">{getRelativeTime(recentBlog.created_at)}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 text-center py-4">
                                        Бусад нийтлэл байхгүй
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 order-1 lg:order-2">
                        {/* Meta Info */}
                        <div className="w-full flex flex-wrap items-center gap-4 sm:gap-6 pb-8 border-b border-gray-200 mb-8">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={18} />
                                <span className="text-sm">{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock size={18} />
                                <span className="text-sm">{blog.reading_time} мин уншина</span>
                            </div>
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Tag size={18} />
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-sm bg-gray-100 px-2 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                                {blog.excerpt}
                            </p>
                        )}

                        {/* Blog Content - Rendered from Tiptap JSON */}
                        <article
                            className="blog-content max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />

                        {/* Share Section */}
                        <div className="w-full mt-16 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-4">Хуваалцах:</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href)
                                        toast.success("Линк хуулагдлаа!")
                                    }}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                                >
                                    Линк хуулах
                                </button>
                            </div>
                        </div>

                        {/* Reactions Section */}
                        <ReactionSection blogId={blog.id} />

                        {/* Comments Section */}
                        <CommentSection blogId={blog.id} />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}

export default BlogPage
