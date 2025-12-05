import { Star } from "lucide-react"

type StarRatingProps = {
    rating: number
    size?: number
    className?: string
}

export const StarRating = ({
    rating,
    size = 24,
    className = "",
}: StarRatingProps) => {
    const safeRating = Math.max(0, Math.min(5, rating))

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    size={size}
                    className={
                        index < safeRating
                            ? "text-main fill-main"
                            : "text-zinc-300"
                    }
                />
            ))}
        </div>
    )
}
