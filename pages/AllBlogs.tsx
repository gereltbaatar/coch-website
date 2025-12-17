"use client"

import { useState } from "react"
import { BlogPostsData } from "@/components/mock/MockDatas"
import { BlogPostCard, BlogHero } from "@/components/blog"
import { Footer } from "@/components/navigation"

const categories = ["All", "Wellness", "Personal Growth", "Psychology", "Mindfulness", "Relationships"]

const AllBlogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredPosts = selectedCategory === "All"
        ? BlogPostsData
        : BlogPostsData.filter(post => post.category === selectedCategory)

    return (
        <main className="bg-secondary min-h-screen">
            <BlogHero />

            {/* Category Filter */}
            <section className="w-full px-4 sm:px-6 pb-8">
                <div className="max-w-[1536px] mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? "bg-main text-secondary"
                                    : "bg-white border border-gray-200 text-gray-600 hover:border-main hover:text-main"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="w-full px-4 sm:px-6 pb-24">
                <div className="max-w-[1536px] mx-auto">
                    <div className="bg-main border border-secondary rounded-[2.5rem] p-8 sm:p-12">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredPosts.map((post) => (
                                    <BlogPostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-secondary text-lg">
                                    No posts found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default AllBlogs
