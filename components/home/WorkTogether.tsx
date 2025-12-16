
import { WorkTogetherCard, WorkProgram } from "./";

export const WorkTogether = () => {
    return (
        <section className="bg-secondary w-full min-h-fit">
            <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-5 py-12 sm:py-16 lg:py-24">
                <div className="flex flex-col items-center gap-6 sm:gap-8">

                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-wide text-center">Ways to Work <span className="text-main">Together</span></h2>
                    </div>
                    <div className="border border-main bg-main rounded-4xl w-full min-h-fit p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                        <div className="w-full grid-cols-1 sm:grid-cols-2 grid gap-4 sm:gap-6">
                            <WorkTogetherCard title="1:1 Coaching" description="Private sessions focused on your unique journey. Deep self-reflection, emotional awareness, and building self-trust. Flexible packages (single sessions or monthly programs)." image="/onetoone.png" />
                            <WorkTogetherCard title="Group Coaching" description="Small groups for connection and shared learning. Guided discussions, reflection exercises, and practical tools. Build confidence and awareness while learning from others' journeys." image="/group.png" />
                        </div>
                        <WorkProgram />
                    </div>

                </div>
            </div>
        </section >
    )
}