"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, EyeOff, Pencil } from "lucide-react"
import { supabase, Blog } from "@/lib/supabase"
import { toast } from "sonner"
import { AddBlogContent } from "./AddBlogContent"
import NextImage from "next/image"

// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const BlogContent = () => {
    const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

    // Fetch blogs
    const fetchBlogs = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBlogs(data || [])
        } catch (error) {
            console.error("Failed to fetch blogs:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    // Toggle publish status
    const togglePublish = async (blog: Blog) => {
        try {
            const newStatus = blog.status === 'published' ? 'draft' : 'published'
            const { error } = await supabase
                .from('blogs')
                .update({ status: newStatus })
                .eq('id', blog.id)

            if (error) throw error
            fetchBlogs()
            toast.success(newStatus === 'published' ? "Нийтлэл нийтлэгдлээ!" : "Нийтлэл ноорог болголоо!")
        } catch (error) {
            console.error("Failed to update blog:", error)
            toast.error("Статус өөрчлөхөд алдаа гарлаа")
        }
    }

    // Delete blog
    const deleteBlog = async (id: string) => {
        if (!confirm("Энэ нийтлэлийг устгахдаа итгэлтэй байна уу?")) return

        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchBlogs()
            toast.success("Нийтлэл устгагдлаа!")
        } catch (error) {
            console.error("Failed to delete blog:", error)
            toast.error("Устгахад алдаа гарлаа")
        }
    }

    // Show AddBlogContent (for add or edit)
    if (view === 'add' || view === 'edit') {
        return (
            <AddBlogContent
                onBack={() => {
                    setView('list')
                    setEditingBlog(null)
                    fetchBlogs()
                }}
                editBlog={editingBlog}
            />
        )
    }

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your blog posts</p>
                </div>
                <Button
                    onClick={() => setView('add')}
                    className="rounded-full px-5 bg-main hover:bg-main/90"
                >
                    <Plus size={18} />
                    Add Blog
                </Button>
            </div>

            {/* Content area */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-main border-t-transparent rounded-full" />
                    </div>
                ) : blogs.length === 0 ? (
                    <p className="text-gray-400 text-center py-20">No blog posts yet</p>
                ) : (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-all"
                            >
                                {/* Thumbnail */}
                                {blog.cover_image ? (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                        <NextImage
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-lg bg-gray-100 shrink-0" />
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">{blog.title}</h3>
                                    <p className="text-sm text-gray-500 truncate">{blog.excerpt}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-400">
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </span>
                                        {blog.category && (
                                            <Badge variant="secondary" className="text-xs rounded-full">
                                                {blog.category}
                                            </Badge>
                                        )}
                                        <Badge
                                            variant={blog.status === 'published' ? 'default' : 'outline'}
                                            className={`text-xs rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-600 hover:bg-green-100' : 'bg-yellow-100 text-yellow-600 border-yellow-200 hover:bg-yellow-100'}`}
                                        >
                                            {blog.status === 'published' ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    <Button
                                        onClick={() => {
                                            setEditingBlog(blog)
                                            setView('edit')
                                        }}
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9"
                                        title="Edit"
                                    >
                                        <Pencil size={18} className="text-gray-500" />
                                    </Button>
                                    <Button
                                        onClick={() => togglePublish(blog)}
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9"
                                        title={blog.status === 'published' ? "Unpublish" : "Publish"}
                                    >
                                        {blog.status === 'published' ? (
                                            <EyeOff size={18} className="text-gray-500" />
                                        ) : (
                                            <Eye size={18} className="text-gray-500" />
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => deleteBlog(blog.id)}
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