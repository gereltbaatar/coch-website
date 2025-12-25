"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, X } from "lucide-react"
import { TiptapEditor } from "@/components/admin/TiptapEditor"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { supabase, calculateReadingTimeFromJson, TiptapContent, Category, generateSlug } from "@/lib/supabase"
import { toast } from "sonner"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { AddCategoryDialog, ManageCategoriesDialog } from "@/components/admin/CategoryDialogs"

export default function EditBlogPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const blogId = searchParams?.get('id') ?? null

    const [isLoadingBlog, setIsLoadingBlog] = useState(true)
    const [title, setTitle] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [excerpt, setExcerpt] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false)

    const coverInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (blogId) {
            fetchBlog()
        }
        fetchCategories()
    }, [blogId])

    const fetchBlog = async () => {
        setIsLoadingBlog(true)
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', blogId)
                .single()

            if (error) throw error

            if (data) {
                setTitle(data.title || "")
                // Support both old single category and new multiple categories
                const cats = data.categories || (data.category ? [data.category] : [])
                setSelectedCategories(cats)
                setExcerpt(data.excerpt || "")
                setCoverImage(data.cover_image || "")
                setTags(data.tags || [])
                setContent(
                    typeof data.content === 'string' ? data.content :
                        data.content ? JSON.stringify(data.content) : ""
                )
            }
        } catch (error) {
            console.error("Failed to fetch blog:", error)
            toast.error("Нийтлэл олдсонгүй")
            router.push("/admin/blog")
        } finally {
            setIsLoadingBlog(false)
        }
    }

    const fetchCategories = async () => {
        setIsLoadingCategories(true)
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true })

            if (error) throw error
            setCategories(data || [])
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        } finally {
            setIsLoadingCategories(false)
        }
    }

    const handleCategoryAdded = (category: Category) => {
        setCategories([...categories, category])
        setSelectedCategories([...selectedCategories, category.name])
    }

    const handleCategoryUpdated = (updatedCategory: Category) => {
        const oldCategory = categories.find(c => c.id === updatedCategory.id)
        setCategories(categories.map(c =>
            c.id === updatedCategory.id ? updatedCategory : c
        ))
        if (oldCategory && selectedCategories.includes(oldCategory.name)) {
            setSelectedCategories(selectedCategories.map(c =>
                c === oldCategory.name ? updatedCategory.name : c
            ))
        }
    }

    const handleCategoryDeleted = (categoryId: string) => {
        const deletedCategory = categories.find(c => c.id === categoryId)
        setCategories(categories.filter(c => c.id !== categoryId))
        if (deletedCategory) {
            setSelectedCategories(selectedCategories.filter(c => c !== deletedCategory.name))
        }
    }

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setCoverImage(url)
        } catch (error) {
            console.error("Failed to upload cover image:", error)
            toast.error("Зураг оруулахад алдаа гарлаа")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSave = async (status: 'draft' | 'published') => {
        if (!title.trim()) {
            toast.error("Гарчиг оруулна уу")
            return
        }

        if (!blogId) {
            toast.error("Blog ID олдсонгүй")
            return
        }

        setIsSaving(true)
        try {
            const slug = generateSlug(title)
            let readingTime = 1
            let parsedContent: TiptapContent | string = content

            try {
                const jsonContent = JSON.parse(content) as TiptapContent
                readingTime = calculateReadingTimeFromJson(jsonContent)
                parsedContent = jsonContent
            } catch {
                // If parsing fails, use default reading time and string content
            }

            const blogData = {
                title,
                slug,
                content: parsedContent,
                excerpt,
                cover_image: coverImage,
                category: selectedCategories[0] || "", // Keep first category for backwards compatibility
                categories: selectedCategories,
                tags,
                status,
                reading_time: readingTime,
                updated_at: new Date().toISOString()
            }

            console.log("Saving blog data:", blogData)
            console.log("Blog ID:", blogId)

            const { data, error } = await supabase
                .from('blogs')
                .update(blogData)
                .eq('id', blogId)
                .select()

            console.log("Response data:", data)
            console.log("Response error:", error)
            console.log("Error message:", error?.message)
            console.log("Error details:", error?.details)
            console.log("Error hint:", error?.hint)
            console.log("Error code:", error?.code)

            if (error) {
                console.error("Supabase error full:", JSON.stringify(error, null, 2))
                throw new Error(error.message || "Database error")
            }

            if (!data || data.length === 0) {
                throw new Error("No rows updated - blog may not exist")
            }

            toast.success(status === 'published' ? "Нийтлэл амжилттай шинэчлэгдлээ!" : "Ноорог хадгалагдлаа!")
            router.push("/admin/blog")
        } catch (error) {
            console.error("Failed to save blog:", error)
            toast.error("Хадгалахад алдаа гарлаа")
        } finally {
            setIsSaving(false)
        }
    }

    // Convert categories to MultiSelect options
    const categoryOptions = categories.map(cat => ({
        id: cat.id,
        label: cat.name,
        value: cat.name
    }))

    if (isLoadingBlog) {
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
                    <Link href="/admin/blog">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Нийтлэл засах</h1>
                        <p className="text-gray-500 text-sm mt-1">Блог нийтлэл засварлах</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => handleSave('draft')}
                        disabled={isSaving}
                        variant="outline"
                        className="rounded-full px-5"
                    >
                        Ноорог хадгалах
                    </Button>
                    <Button
                        onClick={() => handleSave('published')}
                        disabled={isSaving}
                        className="rounded-full px-5 bg-main hover:bg-main/90"
                    >
                        {isSaving ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Гарчиг <span className="text-red-500">*</span></Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Нийтлэлийн гарчиг..."
                        className="h-12 rounded-xl"
                    />
                </div>

                {/* Category - MultiSelect */}
                <div className="space-y-2">
                    <Label>Ангилал <span className="text-red-500">*</span></Label>
                    <MultiSelect
                        options={categoryOptions}
                        selected={selectedCategories}
                        onChange={setSelectedCategories}
                        placeholder="Ангилал сонгох..."
                        emptyMessage="Ангилал олдсонгүй"
                        isLoading={isLoadingCategories}
                        onAddNew={() => setAddDialogOpen(true)}
                        onEdit={() => setManageCategoriesOpen(true)}
                        addNewLabel="Нэмэх"
                        editLabel="Засах"
                    />



                </div>

                {/* Category Dialogs */}
                <AddCategoryDialog
                    open={addDialogOpen}
                    onOpenChange={setAddDialogOpen}
                    onCategoryAdded={handleCategoryAdded}
                />

                <ManageCategoriesDialog
                    open={manageCategoriesOpen}
                    onOpenChange={setManageCategoriesOpen}
                    categories={categories}
                    onCategoryUpdated={handleCategoryUpdated}
                    onCategoryDeleted={handleCategoryDeleted}
                />

                {/* Excerpt */}
                <div className="space-y-2">
                    <Label htmlFor="excerpt">Товч тайлбар <span className="text-red-500">*</span></Label>
                    <AutosizeTextarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Богино тайлбар..."
                        minHeight={48}
                        maxHeight={150}
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <Label>Түлхүүр үгс</Label>
                    <Input
                        type="text"
                        value={tags.join(", ")}
                        onChange={(e) => {
                            const value = e.target.value
                            if (value.trim() === "") {
                                setTags([])
                            } else {
                                setTags(value.split(",").map(t => t.trim()).filter(t => t !== ""))
                            }
                        }}
                        placeholder="алдаа, дотоод өсөлт, сэтгэл зүй, өөрийгөө уучлах..."
                        className="h-12 rounded-xl"
                    />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label>Нүүр зураг</Label>
                    <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    {coverImage ? (
                        <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                            <NextImage src={coverImage} alt="Cover" fill className="object-cover" />
                            <Button
                                onClick={() => setCoverImage("")}
                                variant="destructive"
                                size="icon"
                                className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    ) : (
                        <button
                            onClick={() => coverInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full h-64 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-main hover:bg-main/5 transition-all"
                        >
                            <Upload size={32} className="text-gray-400" />
                            <span className="text-gray-500">{isUploading ? "Оруулж байна..." : "Нүүр зураг оруулах"}</span>
                        </button>
                    )}
                </div>

                {/* Blog Content */}
                <div className="space-y-2">
                    <Label>Нийтлэлийн агуулга <span className="text-red-500">*</span></Label>
                    <TiptapEditor key={blogId} content={content} onChange={setContent} />
                </div>
            </div>
        </div>
    )
}
