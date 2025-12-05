"use client"

import { StarRating } from "../ui/StarRating";
import { useRouter } from "next/navigation";

type SuccessStoriesCardProps = {
    name: string
    initial: string
    rating: number
    testimonial: string
}

export const SuccessStoriesCard = ({ name, initial, rating, testimonial }: SuccessStoriesCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        // Navigate to success story detail page on mobile/tablet only
        if (window.innerWidth < 640) { // sm breakpoint
            router.push(`/success-stories/${name.toLowerCase().replace(/\s+/g, '-')}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="border border-main px-6 py-4 rounded-3xl min-w-[380px] flex flex-col gap-4 select-none sm:pointer-events-none cursor-pointer sm:cursor-default transition-transform active:scale-95 sm:active:scale-100"
        >
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-main/20 flex items-center justify-center shrink-0">
                    <p className="text-main text-2xl font-medium">{initial}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-black text-lg font-medium">{name}</p>
                    <StarRating rating={rating} size={18} />
                </div>
            </div>
            <p className="text-gray-700 text-base font-normal leading-relaxed">{testimonial}</p>
        </div>
    )
}