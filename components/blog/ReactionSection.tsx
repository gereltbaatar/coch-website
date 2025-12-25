"use client"

import { useState, useEffect } from "react"
import { supabase, EmojiType } from "@/lib/supabase"
import { toast } from "sonner"

interface ReactionSectionProps {
    blogId: string
}

interface ReactionCount {
    emoji: EmojiType
    count: number
}

const EMOJI_OPTIONS: EmojiType[] = ['👍', '❤️', '🔥', '💡']

export const ReactionSection = ({ blogId }: ReactionSectionProps) => {
    const [reactions, setReactions] = useState<ReactionCount[]>([])
    const [userReaction, setUserReaction] = useState<EmojiType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReactions()
        checkUserReaction()
    }, [blogId])

    const fetchReactions = async () => {
        try {
            const { data, error } = await supabase
                .from('reactions')
                .select('emoji')
                .eq('blog_id', blogId)

            if (error) throw error

            // Count reactions by emoji
            const counts: Record<EmojiType, number> = {
                '👍': 0,
                '❤️': 0,
                '🔥': 0,
                '💡': 0
            }

            data?.forEach((reaction) => {
                const emoji = reaction.emoji as EmojiType
                if (counts[emoji] !== undefined) {
                    counts[emoji]++
                }
            })

            setReactions(
                EMOJI_OPTIONS.map(emoji => ({
                    emoji,
                    count: counts[emoji]
                }))
            )
        } catch (error) {
            console.error("Failed to fetch reactions:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const checkUserReaction = async () => {
        // Get user IP for tracking (simple approach)
        const userIp = await getUserIp()
        if (!userIp) return

        try {
            const { data, error } = await supabase
                .from('reactions')
                .select('emoji')
                .eq('blog_id', blogId)
                .eq('user_ip', userIp)
                .single()

            if (data && !error) {
                setUserReaction(data.emoji as EmojiType)
            }
        } catch (error) {
            // User hasn't reacted yet
        }
    }

    const getUserIp = async (): Promise<string | null> => {
        try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            return data.ip
        } catch {
            // Fallback to localStorage for anonymous tracking
            let anonId = localStorage.getItem('anon_reaction_id')
            if (!anonId) {
                anonId = 'anon_' + Math.random().toString(36).substring(2, 15)
                localStorage.setItem('anon_reaction_id', anonId)
            }
            return anonId
        }
    }

    const handleReaction = async (emoji: EmojiType) => {
        const userIp = await getUserIp()
        if (!userIp) {
            toast.error("Алдаа гарлаа")
            return
        }

        try {
            if (userReaction === emoji) {
                // Remove reaction
                const { error } = await supabase
                    .from('reactions')
                    .delete()
                    .eq('blog_id', blogId)
                    .eq('user_ip', userIp)

                if (error) throw error
                setUserReaction(null)
                toast.success("Reaction хасагдлаа")
            } else if (userReaction) {
                // Update existing reaction
                const { error } = await supabase
                    .from('reactions')
                    .update({ emoji })
                    .eq('blog_id', blogId)
                    .eq('user_ip', userIp)

                if (error) throw error
                setUserReaction(emoji)
                toast.success("Reaction шинэчлэгдлээ")
            } else {
                // Add new reaction
                const { error } = await supabase
                    .from('reactions')
                    .insert({
                        blog_id: blogId,
                        emoji,
                        user_ip: userIp
                    })

                if (error) throw error
                setUserReaction(emoji)
                toast.success("Баярлалаа!")
            }

            fetchReactions()
        } catch (error) {
            console.error("Failed to handle reaction:", error)
            toast.error("Reaction илгээхэд алдаа гарлаа")
        }
    }

    const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0)

    return (
        <div className="w-full mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center gap-4">
                <p className="text-gray-600 font-medium">
                    Энэ нийтлэл таньд таалагдсан уу?
                </p>

                <div className="flex items-center gap-3">
                    {isLoading ? (
                        <div className="animate-spin w-6 h-6 border-2 border-main border-t-transparent rounded-full" />
                    ) : (
                        reactions.map(({ emoji, count }) => (
                            <button
                                key={emoji}
                                onClick={() => handleReaction(emoji)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:scale-105 ${userReaction === emoji
                                    ? 'border-main bg-main/10'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="text-xl">{emoji}</span>
                                <span className={`text-sm font-medium ${userReaction === emoji ? 'text-main' : 'text-gray-600'
                                    }`}>
                                    {count}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
