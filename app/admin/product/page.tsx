"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, EyeOff, Pencil } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import NextImage from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    status: 'active' | 'inactive'
    created_at: string
}

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
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
            const newStatus = product.status === 'active' ? 'inactive' : 'active'
            const { error } = await supabase
                .from('products')
                .update({ status: newStatus })
                .eq('id', product.id)

            if (error) throw error
            fetchProducts()
            toast.success(newStatus === 'active' ? "Бүтээгдэхүүн идэвхжлээ!" : "Бүтээгдэхүүн идэвхгүй болголоо!")
        } catch (error) {
            console.error("Failed to update product:", error)
            toast.error("Статус өөрчлөхөд алдаа гарлаа")
        }
    }

    const deleteProduct = async (id: string) => {
        if (!confirm("Энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) return

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchProducts()
            toast.success("Бүтээгдэхүүн устгагдлаа!")
        } catch (error) {
            console.error("Failed to delete product:", error)
            toast.error("Устгахад алдаа гарлаа")
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('mn-MN').format(price) + '₮'
    }

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your products</p>
                </div>
                <Link href="/admin/product/add">
                    <Button className="rounded-full px-5 bg-main hover:bg-main/90">
                        <Plus size={18} />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Content area */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-gray-400 text-center py-20">No products yet</p>
                ) : (
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-all"
                            >
                                {/* Thumbnail */}
                                {product.image ? (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                        <NextImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-lg bg-gray-100 shrink-0" />
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{product.description}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm font-medium text-main">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.category && (
                                            <Badge variant="secondary" className="text-xs rounded-full">
                                                {product.category}
                                            </Badge>
                                        )}
                                        <Badge
                                            variant={product.status === 'active' ? 'default' : 'outline'}
                                            className={`text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-600 hover:bg-green-100' : 'bg-yellow-100 text-yellow-600 border-yellow-200 hover:bg-yellow-100'}`}
                                        >
                                            {product.status === 'active' ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    <Link href={`/admin/product/edit?id=${product.id}`}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9"
                                            title="Edit"
                                        >
                                            <Pencil size={18} className="text-gray-500" />
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => toggleStatus(product)}
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9"
                                        title={product.status === 'active' ? "Deactivate" : "Activate"}
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
                                        className="h-9 w-9 text-red-500 hover:bg-red-100 hover:text-red-600"
                                        title="Delete"
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
