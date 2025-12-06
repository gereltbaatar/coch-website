import { BlogPostsData } from "../mock/MockDatas";
import { BlogPostCard } from "../blog";

export const Blog = () => {
    return (
        <section className="bg-secondary w-full min-h-fit overflow-hidden">
            <div className="w-full max-w-[1536px] mx-auto pb-12 sm:pb-16 lg:pb-24">
                <div className="w-full px-4 sm:px-6">
                    <div className="bg-main border border-secondary rounded-[2.5rem] p-8 sm:p-12 flex flex-col items-center gap-8 sm:gap-12">
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-secondary tracking-wide text-center">
                                Blog <span className="font-medium">Posts</span>
                            </h2>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {BlogPostsData.map((post) => (
                                <BlogPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
