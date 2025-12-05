export const Blog = () => {
    return (
        <section className="bg-secondary w-full min-h-fit overflow-hidden">
            <div className="w-full max-w-[1536px] mx-auto pb-12 sm:pb-16 lg:pb-24">
                <div className="flex flex-col items-center gap-6 sm:gap-8 bg-main rounded-3xl p-6">

                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-secondary tracking-wide text-center">Blog <span className="text-secondary">Post</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    </div>
                </div>
            </div>
        </section>
    )
}