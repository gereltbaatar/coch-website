import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/lib/supabase"

interface BlogPostCardProps {
    blog: Blog
    featured?: boolean
}

export const BlogPostCard = ({ blog, featured = false }: BlogPostCardProps) => {
    // Format date
    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return (
        <Link href={`/blogs/${blog.id}`}>
            <div className={`group relative w-full overflow-hidden rounded-3xl cursor-pointer ${featured ? 'h-[500px] sm:h-[550px] lg:h-[600px]' : 'h-[400px] sm:h-[450px]'}`}>
                {/* Background Image */}
                {blog.cover_image ? (
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Date Badge - appears on hover */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    {formattedDate}
                </div>



                {/* Arrow Button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:bg-main group-hover:scale-110">
                    <svg
                        className="w-4 h-4 text-gray-800 -rotate-45 transition-all duration-300 group-hover:text-white group-hover:rotate-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-white/60 text-xs">{blog.reading_time} min read</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                        {blog.title}
                    </h3>
                    {/* <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                        {blog.excerpt}
                    </p> */}
                </div>
            </div>
        </Link>
    )
}
