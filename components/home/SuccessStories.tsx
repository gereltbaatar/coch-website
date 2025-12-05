"use client"

import { SuccessStoriesCard } from "./SuccessStoriesCard"
import { SuccessStoriesData } from "../mock/MockDatas"

export const SuccessStories = () => {
    return (
        <section className="bg-secondary w-full min-h-fit overflow-hidden">
            <div className="w-full mx-auto pb-12 sm:pb-16 lg:pb-24">
                <div className="flex flex-col items-center gap-6 sm:gap-8">

                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black tracking-wide text-center">Success <span className="text-main">Stories</span></h2>
                    </div>

                    <div className="relative w-full overflow-hidden group">
                        <div className="flex gap-6 animate-scroll">
                            {/* First set of cards */}
                            {SuccessStoriesData.map((story) => (
                                <SuccessStoriesCard
                                    key={`first-${story.id}`}
                                    name={story.name}
                                    initial={story.initial}
                                    rating={story.rating}
                                    testimonial={story.testimonial}
                                />
                            ))}
                            {/* Duplicate set for seamless loop */}
                            {SuccessStoriesData.map((story) => (
                                <SuccessStoriesCard
                                    key={`second-${story.id}`}
                                    name={story.name}
                                    initial={story.initial}
                                    rating={story.rating}
                                    testimonial={story.testimonial}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
                
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>
        </section >
    )
}