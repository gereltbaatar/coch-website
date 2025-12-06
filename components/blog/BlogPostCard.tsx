import Image from "next/image"
import { BlogPost } from "./type"
import { ArrowRight } from "lucide-react"

interface BlogPostCardProps {
    post: BlogPost
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
    return (
        <div className="border border-secondary rounded-4xl p-6">

            <div className="group flex flex-col gap-4 cursor-pointer bg-secondary rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                        {post.category}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-medium text-gray-900 leading-snug group-hover:text-main transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm font-medium text-main mt-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}