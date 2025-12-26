"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MessageCircle, FileText, Plus, Pencil, Trash2, ImagePlus } from "lucide-react"
import { supabase, ProductStatus, ProductBuyType, ProductCategory } from "@/lib/supabase"
import { uploadMultipleToCloudinary } from "@/lib/cloudinary"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Image type - can be existing URL or new file with preview
interface ImageItem {
    type: 'url' | 'file'
    url?: string
    file?: File
    preview: string
}

// Format number with commas (1000 -> 1,000)
const formatPrice = (value: string) => {
    const num = value.replace(/[^\d]/g, '')
    if (!num) return ''
    return Number(num).toLocaleString('en-US')
}

// Remove commas for raw number (1,000 -> 1000)
const unformatPrice = (value: string) => {
    return value.replace(/,/g, '')
}

export default function EditProductPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productId = searchParams?.get('id')

    const [isLoadingProduct, setIsLoadingProduct] = useState(true)
    const [name, setName] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [price, setPrice] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [buyType, setBuyType] = useState<ProductBuyType>("fb_messenger")
    const [buyLink, setBuyLink] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    // Images state
    const [images, setImages] = useState<ImageItem[]>([])
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

    // Categories state
    const [categories, setCategories] = useState<ProductCategory[]>([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [isSavingCategory, setIsSavingCategory] = useState(false)

    useEffect(() => {
        fetchCategories()
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
                setShortDescription(data.short_description || "")
                setPrice(formatPrice(data.price?.toString() || ""))
                setDiscountPrice(data.discount_price ? formatPrice(data.discount_price.toString()) : "")
                setSelectedCategory(data.category || "")
                setBuyType(data.buy_type || "fb_messenger")
                setBuyLink(data.buy_link || "")
                // Load existing images
                if (data.images && Array.isArray(data.images)) {
                    setImages(data.images.map((url: string) => ({
                        type: 'url' as const,
                        url,
                        preview: url
                    })))
                }
            }
        } catch (error) {
            console.error("Failed to fetch product:", error)
            toast.error("Бүтээгдэхүүн олдсонгүй")
            router.push("/admin/product")
        } finally {
            setIsLoadingProduct(false)
        }
    }

    const fetchCategories = async () => {
        setIsLoadingCategories(true)
        try {
            const { data, error } = await supabase
                .from('product_categories')
                .select('*')
                .order('name')

            if (error) throw error
            setCategories(data || [])
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        } finally {
            setIsLoadingCategories(false)
        }
    }

    // Handle image selection - creates local preview, no upload yet
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Max 5 images limit
        const remainingSlots = 5 - images.length
        if (remainingSlots <= 0) {
            toast.error("Хамгийн ихдээ 5 зураг оруулах боломжтой")
            return
        }

        const filesToAdd = Array.from(files).slice(0, remainingSlots)

        const newImages: ImageItem[] = filesToAdd.map(file => ({
            type: 'file' as const,
            file,
            preview: URL.createObjectURL(file)
        }))

        setImages(prev => [...prev, ...newImages].slice(0, 5))
        toast.success(`${filesToAdd.length} зураг нэмэгдлээ`)
        e.target.value = ''
    }

    const handleRemoveImage = (index: number) => {
        setImages(prev => {
            const img = prev[index]
            // Revoke URL only for file type (blob URLs)
            if (img.type === 'file') {
                URL.revokeObjectURL(img.preview)
            }
            return prev.filter((_, i) => i !== index)
        })
    }

    // Drag and drop handlers for reordering images
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault()
        if (draggedIndex === null || draggedIndex === dropIndex) return

        // Reorder images
        setImages(prev => {
            const newImages = [...prev]
            const draggedItem = newImages[draggedIndex]
            newImages.splice(draggedIndex, 1)
            newImages.splice(dropIndex, 0, draggedItem)
            return newImages
        })
        setDraggedIndex(null)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    const handleAddCategory = () => {
        setEditingCategory(null)
        setNewCategoryName("")
        setCategoryDialogOpen(true)
    }

    const handleEditCategory = (category: ProductCategory) => {
        setEditingCategory(category)
        setNewCategoryName(category.name)
        setCategoryDialogOpen(true)
    }

    const handleDeleteCategory = async (category: ProductCategory) => {
        if (!confirm(`"${category.name}" ангиллыг устгахдаа итгэлтэй байна уу?`)) return

        try {
            const { error } = await supabase
                .from('product_categories')
                .delete()
                .eq('id', category.id)

            if (error) throw error
            toast.success("Ангилал устгагдлаа!")
            fetchCategories()
            if (selectedCategory === category.id) {
                setSelectedCategory("")
            }
        } catch (error) {
            console.error("Failed to delete category:", error)
            toast.error("Устгахад алдаа гарлаа")
        }
    }

    const handleSaveCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.error("Ангиллын нэр оруулна уу")
            return
        }

        setIsSavingCategory(true)
        try {
            if (editingCategory) {
                const { error } = await supabase
                    .from('product_categories')
                    .update({ name: newCategoryName.trim() })
                    .eq('id', editingCategory.id)

                if (error) throw error
                toast.success("Ангилал шинэчлэгдлээ!")
            } else {
                const { error } = await supabase
                    .from('product_categories')
                    .insert({ name: newCategoryName.trim() })

                if (error) throw error
                toast.success("Ангилал нэмэгдлээ!")
            }

            setCategoryDialogOpen(false)
            fetchCategories()
        } catch (error) {
            console.error("Failed to save category:", error)
            toast.error("Хадгалахад алдаа гарлаа")
        } finally {
            setIsSavingCategory(false)
        }
    }

    const handleSave = async (status: ProductStatus) => {
        if (!name.trim()) {
            toast.error("Бүтээгдэхүүний нэр оруулна уу")
            return
        }

        const rawPrice = unformatPrice(price)
        if (!rawPrice || isNaN(Number(rawPrice)) || Number(rawPrice) <= 0) {
            toast.error("Зөв үнэ оруулна уу")
            return
        }

        if (!buyLink.trim()) {
            toast.error("Худалдан авах линк оруулна уу")
            return
        }

        setIsSaving(true)
        try {
            // Process images - upload new files to Cloudinary
            const existingUrls = images.filter(img => img.type === 'url').map(img => img.url!)
            const newFiles = images.filter(img => img.type === 'file').map(img => img.file!)

            let uploadedUrls: string[] = []
            if (newFiles.length > 0) {
                toast.info("Зураг upload хийж байна...")
                uploadedUrls = await uploadMultipleToCloudinary(newFiles)
            }

            // Combine URLs in correct order
            const finalImages: string[] = []
            let existingIndex = 0
            let uploadedIndex = 0
            for (const img of images) {
                if (img.type === 'url') {
                    finalImages.push(existingUrls[existingIndex++])
                } else {
                    finalImages.push(uploadedUrls[uploadedIndex++])
                }
            }

            const rawDiscountPrice = unformatPrice(discountPrice)
            const productData = {
                name: name.trim(),
                short_description: shortDescription.trim(),
                images: finalImages,
                price: Number(rawPrice),
                discount_price: rawDiscountPrice ? Number(rawDiscountPrice) : null,
                status,
                buy_type: buyType,
                buy_link: buyLink.trim(),
                category: selectedCategory || null
            }

            const { error } = await supabase
                .from('products')
                .update(productData)
                .eq('id', productId)

            if (error) throw error

            toast.success("Бүтээгдэхүүн шинэчлэгдлээ!")
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
                        onClick={() => handleSave('draft')}
                        disabled={isSaving}
                        variant="outline"
                        className="rounded-full px-5"
                    >
                        Ноорог
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

                {/* Short Description */}
                <div className="space-y-2">
                    <Label htmlFor="shortDescription">Товч тайлбар</Label>
                    <textarea
                        id="shortDescription"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Бүтээгдэхүүний товч тайлбар..."
                        rows={2}
                        className="w-full min-h-[80px] px-3 py-2 rounded-xl border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        style={{ fieldSizing: 'content' } as React.CSSProperties}
                    />
                </div>

                {/* Images */}
                <div className="space-y-3">
                    <Label>Бүтээгдэхүүний зураг (5 хүртэл)</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Main Image - Left side */}
                        <div className="aspect-square">
                            {images[0] ? (
                                <div
                                    className={`relative group w-full h-full cursor-grab active:cursor-grabbing ${draggedIndex === 0 ? 'opacity-50 scale-95' : ''} transition-all`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, 0)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, 0)}
                                    onDragEnd={handleDragEnd}
                                >
                                    <img
                                        src={images[0].preview}
                                        alt="Main product"
                                        className="w-full h-full object-cover rounded-2xl border border-gray-200 pointer-events-none"
                                    />
                                    <div className="absolute top-2 left-2 bg-main text-white rounded-full px-2 py-0.5 text-xs font-medium">
                                        Эхний
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(0)}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        Устгах
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer block w-full h-full">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageSelect}
                                        className="hidden"
                                        disabled={isSaving}
                                    />
                                    <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <ImagePlus size={28} className="text-gray-400" />
                                        <span className="text-sm text-gray-500">Зураг оруулах</span>
                                        <span className="text-xs text-gray-400">Олон зураг сонгох боломжтой</span>
                                    </div>
                                </label>
                            )}
                        </div>

                        {/* Right side - 2x2 grid for 4 additional images */}
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="aspect-square">
                                    {images[index] ? (
                                        <div
                                            className={`relative group w-full h-full cursor-grab active:cursor-grabbing ${draggedIndex === index ? 'opacity-50 scale-95' : ''} transition-all`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <img
                                                src={images[index].preview}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover rounded-xl border border-gray-200 pointer-events-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                            >
                                                Устгах
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer block w-full h-full">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageSelect}
                                                className="hidden"
                                                disabled={isSaving}
                                            />
                                            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-gray-300 hover:bg-gray-50 transition-colors bg-gray-50/50">
                                                <ImagePlus size={18} className="text-gray-400" />
                                            </div>
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price and Discount Price */}
                <div className="flex w-full gap-4">
                    <div className="space-y-2 w-full">
                        <Label htmlFor="price">Үнэ <span className="text-red-500">*</span></Label>
                        <Input
                            id="price"
                            type="text"
                            inputMode="numeric"
                            value={price}
                            onChange={(e) => setPrice(formatPrice(e.target.value))}
                            placeholder="0"
                            className="h-12 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2 w-full">
                        <Label htmlFor="discountPrice">Хямдралтай үнэ</Label>
                        <Input
                            id="discountPrice"
                            type="text"
                            inputMode="numeric"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(formatPrice(e.target.value))}
                            placeholder="0"
                            className="h-12 rounded-xl"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="flex w-full gap-4">
                    <div className="space-y-2 w-full">
                        <Label>Ангилал</Label>
                        <div className="flex gap-2">
                            {isLoadingCategories ? (
                                <div className="flex-1 h-12 rounded-xl border border-gray-200 flex items-center justify-center">
                                    <div className="animate-spin w-5 h-5 border-2 border-main border-t-transparent rounded-full" />
                                </div>
                            ) : categories.length === 0 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12 rounded-xl text-gray-500 justify-start"
                                    onClick={handleAddCategory}
                                >
                                    <Plus size={16} className="mr-2" />
                                    Ангилал нэмэх
                                </Button>
                            ) : (
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="flex-1 h-12 rounded-xl">
                                        <SelectValue placeholder="Ангилал сонгох..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {categories.length > 0 && (
                                <>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="h-12 rounded-xl"
                                        onClick={handleAddCategory}
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Нэмэх
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 rounded-xl"
                                        onClick={() => setManageCategoriesOpen(true)}
                                    >
                                        <Pencil size={16} className="mr-1" />
                                        Засах
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buy Type & Link */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <MessageCircle size={18} className="text-blue-600" />
                        Худалдан авах тохиргоо
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Төрөл <span className="text-red-500">*</span></Label>
                            <Select value={buyType} onValueChange={(v) => setBuyType(v as ProductBuyType)}>
                                <SelectTrigger className="h-12 rounded-xl bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fb_messenger">
                                        <div className="flex items-center gap-2">
                                            <MessageCircle size={16} />
                                            Facebook Messenger
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="fb_post">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} />
                                            Facebook Post
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="buyLink">Линк <span className="text-red-500">*</span></Label>
                            <Input
                                id="buyLink"
                                type="url"
                                value={buyLink}
                                onChange={(e) => setBuyLink(e.target.value)}
                                placeholder={buyType === 'fb_messenger' ? 'https://m.me/yourpage' : 'https://facebook.com/...'}
                                className="h-12 rounded-xl bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Dialog */}
            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Ангилал засах" : "Ангилал нэмэх"}</DialogTitle>
                        <DialogDescription>Ангиллын нэрийг оруулна уу</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Ангиллын нэр..."
                            className="rounded-xl"
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveCategory()}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCategoryDialogOpen(false)} className="rounded-xl">
                            Болих
                        </Button>
                        <Button
                            onClick={handleSaveCategory}
                            disabled={isSavingCategory || !newCategoryName.trim()}
                            className="rounded-xl bg-main hover:bg-main/90"
                        >
                            {isSavingCategory ? "..." : "Хадгалах"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Manage Categories Dialog */}
            <Dialog open={manageCategoriesOpen} onOpenChange={setManageCategoriesOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Ангиллууд удирдах</DialogTitle>
                        <DialogDescription>Ангиллуудыг засах эсвэл устгах</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 max-h-[400px] overflow-y-auto">
                        {categories.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">Ангилал байхгүй байна</p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <div
                                        key={cat.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                                    >
                                        <span className="font-medium">{cat.name}</span>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditCategory(cat)}
                                                className="h-8 px-2"
                                            >
                                                <Pencil size={14} className="mr-1" />
                                                Засах
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteCategory(cat)}
                                                className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={14} className="mr-1" />
                                                Устгах
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setManageCategoriesOpen(false)} className="rounded-xl">
                            Хаах
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
