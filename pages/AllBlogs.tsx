"use client"

import { useState, useEffect } from "react"
import { BlogPostCard, BlogHero } from "@/components/blog"
import { Footer } from "@/components/navigation"
import { supabase, Blog } from "@/lib/supabase"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"

const AllBlogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [categories, setCategories] = useState<string[]>(["All"])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch blogs and categories
    useEffect(() => {
        fetchBlogs()
        fetchCategories()
    }, [])

    const fetchBlogs = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBlogs(data || [])
        } catch (error) {
            console.error("Failed to fetch blogs:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('name')
                .order('name', { ascending: true })

            if (error) throw error
            const categoryNames = data?.map((cat: { name: string }) => cat.name) || []
            setCategories(["All", ...categoryNames])
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        }
    }

    const filteredBlogs = selectedCategory === "All"
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory)

    return (
        <main className="bg-secondary min-h-screen flex flex-col gap-10">
            <BlogHero />

            <section className="w-full px-4 sm:px-6">
                <div className="max-w-[1536px] mx-auto flex justify-center">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-semibold text-gray-800">All Blogs</p>
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(45 12 12)" />
                            </svg>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 transition-all duration-300 hover:shadow-md focus:outline-none">
                                    <span className="text-sm font-medium text-gray-700">{selectedCategory}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[200px] rounded-2xl p-2">
                                {categories.map((category) => (
                                    <DropdownMenuItem
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer ${selectedCategory === category
                                            ? "bg-main/10 text-main"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        {category}
                                        {selectedCategory === category && (
                                            <Check className="w-4 h-4" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="w-full px-4 sm:px-6 pb-24">
                <div className="max-w-[1536px] mx-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {filteredBlogs.map((blog) => (
                                <BlogPostCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                No posts found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default AllBlogs
