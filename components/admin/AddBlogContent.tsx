"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { TiptapEditor } from "./TiptapEditor"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { supabase, calculateReadingTimeFromJson, TiptapContent, Category, generateSlug, Blog } from "@/lib/supabase"
import { toast } from "sonner"
import NextImage from "next/image"

// shadcn/ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
    DialogTrigger,
} from "@/components/ui/dialog"

interface AddBlogContentProps {
    onBack: () => void
    editBlog?: Blog | null
}

export const AddBlogContent = ({ onBack, editBlog }: AddBlogContentProps) => {
    const isEditMode = !!editBlog

    const [title, setTitle] = useState(editBlog?.title || "")
    const [category, setCategory] = useState(editBlog?.category || "")
    const [excerpt, setExcerpt] = useState(editBlog?.excerpt || "")
    const [coverImage, setCoverImage] = useState(editBlog?.cover_image || "")
    const [tags, setTags] = useState<string[]>(editBlog?.tags || [])
    const [tagInput, setTagInput] = useState("")
    const [content, setContent] = useState(
        typeof editBlog?.content === 'string' ? editBlog.content :
        editBlog?.content ? JSON.stringify(editBlog.content) : ""
    )
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Categories state
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const coverInputRef = useRef<HTMLInputElement>(null)

    // Fetch categories
    useEffect(() => {
        fetchCategories()
    }, [])

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

    // Add new category
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.error("Ангилалын нэр оруулна уу")
            return
        }

        setIsAddingCategory(true)
        try {
            const { data, error } = await supabase
                .from('categories')
                .insert({
                    name: newCategoryName.trim()
                })
                .select()
                .single()

            if (error) throw error

            // Add to local state and select it
            setCategories([...categories, data])
            setCategory(data.name)
            setNewCategoryName("")
            setDialogOpen(false)
        } catch (error) {
            console.error("Failed to add category:", error)
            toast.error("Ангилал нэмэхэд алдаа гарлаа")
        } finally {
            setIsAddingCategory(false)
        }
    }

    // Add tag
    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput("")
        }
    }

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    // Handle cover image upload
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

    // Save blog
    const handleSave = async (status: 'draft' | 'published') => {
        if (!title.trim()) {
            toast.error("Гарчиг оруулна уу")
            return
        }

        setIsSaving(true)
        try {
            const slug = generateSlug(title)
            // Parse JSON content and calculate reading time
            let readingTime = 1
            try {
                const jsonContent = JSON.parse(content) as TiptapContent
                readingTime = calculateReadingTimeFromJson(jsonContent)
            } catch {
                // If parsing fails, use default reading time
            }

            const blogData = {
                title,
                slug,
                content,
                excerpt,
                cover_image: coverImage,
                category,
                tags,
                status,
                reading_time: readingTime
            }

            if (isEditMode && editBlog) {
                // Update existing blog
                const { error } = await supabase
                    .from('blogs')
                    .update(blogData)
                    .eq('id', editBlog.id)

                if (error) throw error
                toast.success(status === 'published' ? "Нийтлэл амжилттай шинэчлэгдлээ!" : "Ноорог хадгалагдлаа!")
            } else {
                // Insert new blog
                const { error } = await supabase
                    .from('blogs')
                    .insert(blogData)

                if (error) throw error
                toast.success(status === 'published' ? "Нийтлэл амжилттай нийтлэгдлээ!" : "Ноорог хадгалагдлаа!")
            }

            onBack()
        } catch (error) {
            console.error("Failed to save blog:", error)
            toast.error("Хадгалахад алдаа гарлаа")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? "Нийтлэл засах" : "Шинэ нийтлэл"}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {isEditMode ? "Блог нийтлэл засварлах" : "Блог нийтлэл үүсгэх"}
                        </p>
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
                        {isSaving ? "Хадгалж байна..." : isEditMode ? "Хадгалах" : "Нийтлэх"}
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

                {/* Category & Excerpt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Ангилал <span className="text-red-500">*</span></Label>
                        <div className="flex gap-2">
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="h-12 rounded-xl flex-1">
                                    <SelectValue placeholder={isLoadingCategories ? "Уншиж байна..." : "Ангилал сонгох"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Add Category Dialog */}
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-12 w-12 rounded-xl shrink-0"
                                    >
                                        <Plus size={20} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Шинэ ангилал нэмэх</DialogTitle>
                                        <DialogDescription>
                                            Блогийн шинэ ангилал үүсгэнэ үү
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="categoryName">Ангилалын нэр</Label>
                                            <Input
                                                id="categoryName"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                placeholder="Жишээ: Технологи"
                                                className="rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setDialogOpen(false)}
                                            className="rounded-xl"
                                        >
                                            Болих
                                        </Button>
                                        <Button
                                            onClick={handleAddCategory}
                                            disabled={isAddingCategory}
                                            className="rounded-xl bg-main hover:bg-main/90"
                                        >
                                            {isAddingCategory ? "Нэмж байна..." : "Нэмэх"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Товч тайлбар <span className="text-red-500">*</span></Label>
                        <Input
                            id="excerpt"
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Богино тайлбар..."
                            className="h-12 rounded-xl"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <Label>Түлхүүр үгс <span className="text-red-500">*</span></Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="px-3 py-1 rounded-full text-sm gap-1"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-red-500 ml-1"
                                >
                                    <X size={14} />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            placeholder="Түлхүүр үг нэмэх..."
                            className="flex-1 h-10 rounded-xl"
                        />
                        <Button
                            onClick={addTag}
                            variant="secondary"
                            className="rounded-xl"
                        >
                            Нэмэх
                        </Button>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label>Нүүр зураг <span className="text-red-500">*</span></Label>
                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                    />
                    {coverImage ? (
                        <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                            <NextImage
                                src={coverImage}
                                alt="Cover"
                                fill
                                className="object-cover"
                            />
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
                            <span className="text-gray-500">
                                {isUploading ? "Оруулж байна..." : "Нүүр зураг оруулах"}
                            </span>
                        </button>
                    )}
                </div>

                {/* Blog Content - Single Tiptap Editor */}
                <div className="space-y-2">
                    <Label>Нийтлэлийн агуулга <span className="text-red-500">*</span></Label>
                    <TiptapEditor
                        key={editBlog?.id || 'new'}
                        content={content}
                        onChange={setContent}
                    />
                </div>
            </div>
        </div>
    )
}
