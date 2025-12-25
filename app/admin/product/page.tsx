"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, EyeOff, Pencil, MessageCircle, FileText } from "lucide-react"
import { supabase, Product, ProductStatus, ProductCategory } from "@/lib/supabase"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Extended product with category info
interface ProductWithCategory extends Product {
    product_categories?: { name: string } | null
}

export default function ProductListPage() {
    const [products, setProducts] = useState<ProductWithCategory[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
                    *,
                    product_categories (name)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error("Failed to fetch products:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const toggleStatus = async (product: Product) => {
        try {
            const newStatus: ProductStatus = product.status === 'active' ? 'hidden' : 'active'
            const { error } = await supabase
                .from('products')
                .update({ status: newStatus })
                .eq('id', product.id)

            if (error) throw error
            fetchProducts()
            toast.success(newStatus === 'active' ? "Идэвхжлээ!" : "Нуугдлаа!")
        } catch (error) {
            console.error("Failed to update product:", error)
            toast.error("Алдаа гарлаа")
        }
    }

    const deleteProduct = async (id: string) => {
        if (!confirm("Устгахдаа итгэлтэй байна уу?")) return

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchProducts()
            toast.success("Устгагдлаа!")
        } catch (error) {
            console.error("Failed to delete product:", error)
            toast.error("Алдаа гарлаа")
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('mn-MN').format(price) + '₮'
    }

    const getStatusBadge = (status: ProductStatus) => {
        const styles: Record<ProductStatus, string> = {
            'active': 'bg-green-100 text-green-600',
            'draft': 'bg-yellow-100 text-yellow-600',
            'hidden': 'bg-gray-100 text-gray-600'
        }
        const labels: Record<ProductStatus, string> = {
            'active': 'Идэвхтэй',
            'draft': 'Ноорог',
            'hidden': 'Нуусан'
        }
        return (
            <Badge className={`text-xs rounded-full ${styles[status]}`}>
                {labels[status]}
            </Badge>
        )
    }

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Бүтээгдэхүүн</h1>
                    <p className="text-gray-500 text-sm mt-1">Бүтээгдэхүүнүүдийг удирдах</p>
                </div>
                <Link href="/admin/product/add">
                    <Button className="rounded-full px-5 bg-main hover:bg-main/90">
                        <Plus size={18} />
                        Нэмэх
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">Бүтээгдэхүүн байхгүй</p>
                        <Link href="/admin/product/add">
                            <Button className="rounded-full px-5 bg-main hover:bg-main/90">
                                <Plus size={18} />
                                Эхний бүтээгдэхүүн нэмэх
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-all"
                            >
                                {/* Image */}
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    {product.images?.[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            No img
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{product.short_description || 'Тайлбар байхгүй'}</p>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <span className="text-sm font-medium text-main">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.product_categories?.name && (
                                            <Badge variant="secondary" className="text-xs rounded-full">
                                                {product.product_categories.name}
                                            </Badge>
                                        )}
                                        {getStatusBadge(product.status)}
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            {product.buy_type === 'fb_messenger' ? (
                                                <MessageCircle size={14} className="text-blue-500" />
                                            ) : (
                                                <FileText size={14} className="text-blue-500" />
                                            )}
                                            <span>{product.buy_type === 'fb_messenger' ? 'Messenger' : 'FB Post'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    <Link href={`/admin/product/edit?id=${product.id}`}>
                                        <Button variant="ghost" size="icon" className="h-9 w-9">
                                            <Pencil size={18} className="text-gray-500" />
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => toggleStatus(product)}
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9"
                                    >
                                        {product.status === 'active' ? (
                                            <EyeOff size={18} className="text-gray-500" />
                                        ) : (
                                            <Eye size={18} className="text-gray-500" />
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => deleteProduct(product.id)}
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-red-500 hover:bg-red-100"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
