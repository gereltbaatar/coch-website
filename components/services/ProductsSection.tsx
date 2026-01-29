"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { MoveRight } from "lucide-react"
import { supabase, Product } from "@/lib/supabase"
import { ProductDetailDialog } from "@/components/free/ProductDetailDialog"

export const ProductsSection = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('status', 'active')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error("Failed to fetch products:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return `₮ ${price.toLocaleString()}`
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
    }

    const handleCloseDialog = () => {
        setSelectedProduct(null)
    }

    // Setup Intersection Observer for scroll animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardId = entry.target.getAttribute('data-card-id')
                        if (cardId) {
                            setVisibleCards((prev) => new Set(prev).add(cardId))
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    return (
        <section className="w-full bg-white py-12 sm:py-16">
            <div className="max-w-[1536px] w-full mx-auto px-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-black/10 pb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 border-b-2 border-main pb-1">
                            БҮХ БҮТЭЭГДЭХҮҮН
                        </h2>
                        <svg
                            className="w-5 h-5 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(45 12 12)" />
                        </svg>
                    </div>

                    <div className="text-xs sm:text-sm font-medium tracking-wider text-main">
                        {!isLoading && `${products.length} БҮТЭЭГДЭХҮҮН`}
                    </div>
                </div>

                {/* Loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">Бүтээгдэхүүн байхгүй байна</p>
                    </div>
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                data-card-id={product.id}
                                ref={(el) => {
                                    if (el && observerRef.current) {
                                        observerRef.current.observe(el)
                                    }
                                }}
                                className={`transition-all duration-700 ease-out ${
                                    visibleCards.has(product.id)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-12'
                                }`}
                                style={{
                                    transitionDelay: visibleCards.has(product.id) ? `${index % 4 * 100}ms` : '0ms'
                                }}
                            >
                                <div className="group flex flex-col items-center rounded-3xl">
                                    {/* Image Container */}
                                    <div className="w-full aspect-square rounded-3xl bg-[#FAFAFA] relative mb-6 overflow-hidden flex items-center justify-center">
                                        {/* Tag */}
                                        {product.discount_price && (
                                            <span className="absolute top-4 right-4 text-[10px] font-medium tracking-[0.2em] text-red-500">
                                                SALE
                                            </span>
                                        )}

                                        {/* Image */}
                                        <div className="relative rounded-3xl w-full h-full transition-transform duration-500 group-hover:scale-105">
                                            <Image
                                                src={product.images?.[0] || "/placeholder.png"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Overlay with Button */}
                                        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors duration-300 flex md:items-center md:justify-center items-end justify-start p-4 md:p-0 gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                            <button
                                                onClick={() => handleProductClick(product)}
                                                className="bg-white text-black px-4 py-3 rounded-full flex items-center gap-2 transform transition-all duration-300 shadow-lg"
                                            >
                                                <span className="text-xs font-medium tracking-widest uppercase">Дэлгэрэнгүй</span>
                                                <MoveRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xs font-semibold tracking-[0.2em] text-black uppercase">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className={`text-sm font-light tracking-wider ${product.discount_price ? 'text-red-500' : 'text-black'}`}>
                                                {formatPrice(product.discount_price || product.price)}
                                            </span>
                                            {product.discount_price && (
                                                <span className="text-xs font-light text-black/30 line-through tracking-wider">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Product Detail Dialog */}
                <ProductDetailDialog
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={handleCloseDialog}
                />
            </div>
        </section>
    )
}
