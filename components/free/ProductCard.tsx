import Image from "next/image"
import { MoveRight } from "lucide-react"

interface ProductCardProps {
    image: string
    title: string
    price: string
    originalPrice?: string
    tag?: "HOT" | "SALE" | "NEW"
    onDetailClick?: () => void
}

export const ProductCard = ({ image, title, price, originalPrice, tag, onDetailClick }: ProductCardProps) => {
    return (
        <div className="group flex flex-col items-center rounded-3xl">
            {/* Image Container */}
            <div className="w-full aspect-square rounded-3xl bg-[#FAFAFA] relative mb-6 overflow-hidden flex items-center justify-center">
                {/* Tag */}
                {tag && (
                    <span className={`absolute top-4 right-4 text-[10px] font-medium tracking-[0.2em] ${tag === 'SALE' ? 'text-red-500' : 'text-black/40'}`}>
                        {tag}
                    </span>
                )}

                {/* Image */}
                <div className="relative rounded-3xl w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Overlay with Buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <button
                        onClick={onDetailClick}
                        className="bg-white text-black px-4 py-3 rounded-full flex items-center gap-2 transform  group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                        <span className="text-xs font-medium tracking-widest uppercase">Дэлгэрэнгүй</span>
                        <MoveRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-black uppercase">
                    {title}
                </h3>
                <div className="flex items-center justify-center gap-3">
                    <span className={`text-sm font-light tracking-wider ${originalPrice ? 'text-red-500' : 'text-black'}`}>
                        {price}
                    </span>
                    {originalPrice && (
                        <span className="text-xs font-light text-black/30 line-through tracking-wider">
                            {originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
