"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"
import { ProductDetailDialog } from "./ProductDetailDialog"
import { supabase, Product } from "@/lib/supabase"

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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

    // Format price to display format
    const formatPrice = (price: number) => {
        return `₮ ${price.toLocaleString()}`
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
    }

    const handleCloseDialog = () => {
        setSelectedProduct(null)
    }

    return (
        <section className="w-full bg-white max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-black/5 pb-6 gap-4">
                <div className="flex items-center gap-6">
                    <button className="text-xs font-semibold tracking-widest text-black hover:text-black/60 transition-colors uppercase">
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-semibold text-gray-800">Бүх бүтээгдэхүүн</p>
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" transform="rotate(45 12 12)" />
                            </svg>
                        </div>
                    </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-black/40">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.images?.[0] || "/placeholder.png"}
                            title={product.name}
                            price={formatPrice(product.discount_price || product.price)}
                            originalPrice={product.discount_price ? formatPrice(product.price) : undefined}
                            tag={product.discount_price ? "SALE" : undefined}
                            onDetailClick={() => handleProductClick(product)}
                        />
                    ))}
                </div>
            )}

            {/* Product Detail Dialog */}
            <ProductDetailDialog
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={handleCloseDialog}
            />
        </section>
    )
}
