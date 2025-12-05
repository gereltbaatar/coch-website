import Image from "next/image"

export const WorkProgram = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[550px]">
            <div className="bg-secondary p-6 rounded-3xl sm:rounded-l-3xl sm:rounded-tr-none sm:rounded-br-none flex flex-col min-h-fit">
                <div className="flex sm:justify-between justify-center items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-main items-center justify-center sm:flex hidden">
                        <div className="w-3.5 h-3.5 rounded-full bg-white" />
                    </div>

                    <Image
                        src={"/onetoone.png"}
                        alt="image card"
                        width={280}
                        height={280}
                        className="object-cover rounded-3xl sm:hidden block"
                    />
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                    <h1 className="text-black text-3xl font-medium">Self-Discovery Program</h1>
                    <p className="text-gray-700 text-base font-normal leading-relaxed">
                        Structured programs with exercises, journaling, and reflection guides.
                        Perfect for anyone new to self-awareness work.
                        Online resources and workbooks to support your growth step by step.
                    </p>
                    <button className="bg-main text-white text-base font-normal px-8 py-2.5 rounded-full transition-all duration-300 hover:bg-main/90 border border-main cursor-pointer transform w-fit mt-2">
                        Read More
                    </button>
                </div>
            </div>
            <div className="bg-secondary rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none flex-col min-h-fit p-6 hidden sm:flex">
                <div className="relative w-full h-full">
                    <Image
                        src="/onetoone.png"
                        alt="Self-Discovery Program"
                        fill
                        className="object-cover rounded-3xl"
                    />
                </div>
            </div>
        </div>
    )
}