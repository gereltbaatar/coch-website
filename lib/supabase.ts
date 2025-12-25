import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Blog block types for content
export interface BlogBlock {
    type: 'text' | 'image'
    content?: string // HTML content for text blocks
    url?: string // Image URL for image blocks
    caption?: string // Optional caption for images
}

// Tiptap JSON content type
export interface TiptapContent {
    type: 'doc'
    content: TiptapNode[]
}

export interface TiptapNode {
    type: string
    content?: TiptapNode[]
    text?: string
    marks?: { type: string; attrs?: Record<string, unknown> }[]
    attrs?: Record<string, unknown>
}

// Blog type
export interface Blog {
    id: string
    title: string
    slug: string
    content: TiptapContent | string // JSON content from Tiptap editor
    excerpt: string
    cover_image: string
    category: string // Legacy single category
    categories: string[] // Multiple categories
    tags: string[]
    status: 'draft' | 'published'
    views: number
    reading_time: number
    created_at: string
    updated_at: string
}

// Reaction type
export type EmojiType = '👍' | '❤️' | '🔥' | '💡'

export interface Reaction {
    id: string
    blog_id: string
    emoji: EmojiType
    user_ip?: string
    created_at: string
}

// Comment type
export interface Comment {
    id: string
    blog_id: string
    author_name: string
    author_email?: string
    content: string
    is_approved: boolean
    created_at: string
}

// Category type
export interface Category {
    id: string
    name: string
    created_at: string
}

// Helper function to calculate reading time from HTML content
export const calculateReadingTimeFromHtml = (htmlContent: string): number => {
    const wordsPerMinute = 200
    // Strip HTML tags and count words
    const text = htmlContent.replace(/<[^>]*>/g, '')
    const totalWords = text.split(/\s+/).filter(word => word.length > 0).length
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute))
}

// Helper function to calculate reading time from Tiptap JSON content
export const calculateReadingTimeFromJson = (content: TiptapContent): number => {
    const wordsPerMinute = 200
    let totalWords = 0

    const extractText = (nodes: TiptapNode[]): void => {
        nodes.forEach(node => {
            if (node.text) {
                totalWords += node.text.split(/\s+/).filter(word => word.length > 0).length
            }
            if (node.content) {
                extractText(node.content)
            }
        })
    }

    if (content.content) {
        extractText(content.content)
    }

    return Math.max(1, Math.ceil(totalWords / wordsPerMinute))
}

// Legacy: Helper function to calculate reading time from blocks (deprecated)
export const calculateReadingTime = (content: BlogBlock[]): number => {
    const wordsPerMinute = 200
    let totalWords = 0

    content.forEach(block => {
        if (block.type === 'text' && block.content) {
            // Strip HTML tags and count words
            const text = block.content.replace(/<[^>]*>/g, '')
            totalWords += text.split(/\s+/).filter(word => word.length > 0).length
        }
    })

    return Math.ceil(totalWords / wordsPerMinute)
}

// Generate slug from title with unique suffix
export const generateSlug = (title: string): string => {
    const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

    // Add timestamp suffix for uniqueness
    const timestamp = Date.now().toString(36)
    return `${baseSlug}-${timestamp}`
}
