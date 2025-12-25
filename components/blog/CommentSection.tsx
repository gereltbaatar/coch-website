"use client"

import { useState, useEffect } from "react"
import { supabase, Comment } from "@/lib/supabase"
import { toast } from "sonner"
import { Clock } from "lucide-react"

interface CommentSectionProps {
    blogId: string
}

export const CommentSection = ({ blogId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userIp, setUserIp] = useState<string>("")
    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        fetchComments()
        getUserIp()
    }, [blogId])

    const getUserIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            setUserIp(data.ip)
        } catch {
            setUserIp("Unknown")
        }
    }

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('blog_id', blogId)
                .order('created_at', { ascending: false })

            if (error) throw error
            setComments(data || [])
        } catch (error) {
            console.error("Failed to fetch comments:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!content.trim()) {
            toast.error("Сэтгэгдлээ оруулна уу")
            return
        }

        setIsSubmitting(true)
        try {
            // Use name if provided, otherwise use IP address format
            const authorName = name.trim()
                ? `${name.trim()} [${userIp}]`
                : `Зочин [${userIp}]`

            const { error } = await supabase
                .from('comments')
                .insert({
                    blog_id: blogId,
                    author_name: authorName,
                    content: content.trim(),
                    is_approved: true
                })

            if (error) throw error

            toast.success("Сэтгэгдэл амжилттай нэмэгдлээ!")
            fetchComments() // Refresh comments list
            setName("")
            setContent("")
        } catch (error) {
            console.error("Failed to submit comment:", error)
            toast.error("Сэтгэгдэл илгээхэд алдаа гарлаа")
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('mn-MN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '.')
    }

    return (
        <div className="w-full mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                Сэтгэгдэл ({comments.length})
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Та сэтгэгдэл бичихдээ хууль зүйн болон ёс суртахууныг баримтална уу.
            </p>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Нэрээ бичнэ үү"
                        className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:ring-2 focus:ring-main outline-none transition-all text-gray-700 placeholder:text-gray-400"
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Сэтгэгдлээ бичнэ үү"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-100  rounded-lg border focus:ring-2 focus:ring-main outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-main text-white rounded-lg font-medium hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Илгээж байна..." : "Илгээх"}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-main border-t-transparent rounded-full" />
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={comment.id} className={`py-4 ${index !== comments.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-main">{comment.author_name}</span>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-sm">{formatDate(comment.created_at)}</span>
                                </div>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        Одоогоор сэтгэгдэл байхгүй байна. Та эхний сэтгэгдлээ үлдээгээрэй!
                    </p>
                )}
            </div>
        </div>
    )
}
