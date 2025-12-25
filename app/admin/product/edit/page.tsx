"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, X } from "lucide-react"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

const PRODUCT_CATEGORIES = [
    "Ном",
    "Сургалт",
    "Coaching",
    "Бусад"
]

export default function EditProductPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productId = searchParams.get('id')

    const [isLoadingProduct, setIsLoadingProduct] = useState(true)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const imageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const fetchProduct = async () => {
        setIsLoadingProduct(true)
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single()

            if (error) throw error

            if (data) {
                setName(data.name || "")
                setDescription(data.description || "")
                setPrice(data.price?.toString() || "")
                setCategory(data.category || "")
                setImage(data.image || "")
            }
        } catch (error) {
            console.error("Failed to fetch product:", error)
            toast.error("Бүтээгдэхүүн олдсонгүй")
            router.push("/admin/product")
        } finally {
            setIsLoadingProduct(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setImage(url)
        } catch (error) {
            console.error("Failed to upload image:", error)
            toast.error("Зураг оруулахад алдаа гарлаа")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSave = async (status: 'active' | 'inactive') => {
        if (!name.trim()) {
            toast.error("Бүтээгдэхүүний нэр оруулна уу")
            return
        }

        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            toast.error("Зөв үнэ оруулна уу")
            return
        }

        setIsSaving(true)
        try {
            const productData = {
                name: name.trim(),
                description: description.trim(),
                price: Number(price),
                category,
                image,
                status
            }

            const { error } = await supabase
                .from('products')
                .update(productData)
                .eq('id', productId)

            if (error) throw error
            toast.success(status === 'active' ? "Бүтээгдэхүүн амжилттай шинэчлэгдлээ!" : "Ноорог хадгалагдлаа!")
            router.push("/admin/product")
        } catch (error) {
            console.error("Failed to save product:", error)
            toast.error("Хадгалахад алдаа гарлаа")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoadingProduct) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
            </div>
        )
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/product">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Бүтээгдэхүүн засах</h1>
                        <p className="text-gray-500 text-sm mt-1">Бүтээгдэхүүн засварлах</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => handleSave('inactive')}
                        disabled={isSaving}
                        variant="outline"
                        className="rounded-full px-5"
                    >
                        Ноорог хадгалах
                    </Button>
                    <Button
                        onClick={() => handleSave('active')}
                        disabled={isSaving}
                        className="rounded-full px-5 bg-main hover:bg-main/90"
                    >
                        {isSaving ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Нэр <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Бүтээгдэхүүний нэр..."
                        className="h-12 rounded-xl"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Тайлбар</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Бүтээгдэхүүний тайлбар..."
                        rows={4}
                        className="rounded-xl resize-none"
                    />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Үнэ <span className="text-red-500">*</span></Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                            className="h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Ангилал</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Ангилал сонгох" />
                            </SelectTrigger>
                            <SelectContent>
                                {PRODUCT_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Product Image */}
                <div className="space-y-2">
                    <Label>Зураг</Label>
                    <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {image ? (
                        <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                            <NextImage src={image} alt="Product" fill className="object-cover" />
                            <Button
                                onClick={() => setImage("")}
                                variant="destructive"
                                size="icon"
                                className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    ) : (
                        <button
                            onClick={() => imageInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full h-64 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-main hover:bg-main/5 transition-all"
                        >
                            <Upload size={32} className="text-gray-400" />
                            <span className="text-gray-500">{isUploading ? "Оруулж байна..." : "Зураг оруулах"}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
