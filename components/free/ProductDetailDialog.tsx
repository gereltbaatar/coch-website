"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/supabase"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/LanguageContext"
import { trFreePage } from "@/translations/free/trFreePage"

interface ProductDetailDialogProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export const ProductDetailDialog = ({ product, isOpen, onClose }: ProductDetailDialogProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const { language } = useLanguage()
    const t = trFreePage[language]

    const formatPrice = (price: number) => {
        return `₮${price.toLocaleString()}`
    }

    const handleBuy = () => {
        if (product?.buy_link) {
            window.open(product.buy_link, '_blank')
        }
    }

    const nextImage = () => {
        if (product?.images) {
            setSelectedImageIndex((prev) =>
                prev === product.images.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevImage = () => {
        if (product?.images) {
            setSelectedImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
            )
        }
    }

    // Reset image index when product changes
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose()
            setSelectedImageIndex(0)
        }
    }

    if (!product) return null

    const images = product.images || []
    const currentImage = images[selectedImageIndex] || "/placeholder.png"

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden rounded-3xl gap-0">
                <VisuallyHidden>
                    <DialogTitle>{product.name}</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col md:flex-row min-h-[500px] max-h-[90vh]">
                    {/* Left: Image Gallery */}
                    <div className="md:w-[55%] p-6 md:p-8 flex flex-col bg-gray-50">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
                            <Image
                                src={currentImage}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-x-1"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-secondary" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:translate-x-1"
                                    >
                                        <ChevronRight className="w-5 h-5 text-secondary" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex gap-2 pt-4 overflow-x-auto pb-2 justify-center">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all ${selectedImageIndex === index
                                            ? 'ring-2 ring-main ring-offset-2'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="md:w-[45%] p-6 md:p-8 flex flex-col overflow-y-auto">
                        {/* Product Name */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            {product.discount_price ? (
                                <>
                                    <span className="text-2xl font-bold text-red-500">
                                        {formatPrice(product.discount_price)}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                                        SALE
                                    </span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.short_description && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    {t.description}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.short_description}
                                </p>
                            </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1 min-h-4" />

                        {/* Buy Button */}
                        <Button
                            onClick={handleBuy}
                            size="lg"
                            className="w-full py-5 bg-main hover:bg-main/90 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                            {product.buy_type === 'fb_messenger' ? (
                                <>
                                    <MessageCircle className="w-5 h-5" />
                                    {t.messengerConnect}
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
                                    {t.goToFacebookPost}
                                </>
                            )}
                        </Button>

                        {/* Buy Type Info */}
                        <p className="text-center text-xs text-gray-400 mt-3">
                            {product.buy_type === 'fb_messenger'
                                ? t.messengerOrder
                                : t.facebookOrder
                            }
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
