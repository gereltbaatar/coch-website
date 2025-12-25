"use client"

import { useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Underline as UnderlineIcon,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ChevronDown,
    Minus,
    Plus,
    Palette,
    Highlighter,
    Ban,
} from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { toast } from 'sonner'

// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Color presets
const TEXT_COLORS = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc',
    '#d9453d', '#e06847', '#f5a623', '#7ed321', '#4a90d9', '#9b59b6',
    '#c0392b', '#e74c3c', '#f39c12', '#27ae60', '#3498db', '#8e44ad',
    '#1abc9c', '#16a085', '#2980b9', '#2c3e50', '#e91e63', '#795548',
]

const HIGHLIGHT_COLORS = [
    '#ffffff', '#fef3cd', '#d4edda', '#d1ecf1', '#cce5ff', '#f8d7da',
    '#fff3cd', '#d4f4dd', '#c3e6cb', '#bee5eb', '#b8daff', '#f5c6cb',
    '#ffeb3b', '#cddc39', '#8bc34a', '#00bcd4', '#2196f3', '#e91e63',
    '#ff9800', '#ff5722', '#9c27b0', '#673ab7', '#3f51b5', '#009688',
]

interface TiptapEditorProps {
    content: string // JSON string
    onChange: (content: string) => void // Returns JSON string
    placeholder?: string
}

export const TiptapEditor = ({ content, onChange, placeholder = "Нийтлэлийн агуулгаа энд бичнэ үү..." }: TiptapEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [linkDialogOpen, setLinkDialogOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState("")
    const [linkTitle, setLinkTitle] = useState("")
    const [isEditingLink, setIsEditingLink] = useState(false)
    const [zoom, setZoom] = useState(100)
    const [currentColor, setCurrentColor] = useState("#000000")
    const [currentHighlight, setCurrentHighlight] = useState("#ffeb3b")

    // Parse initial content - can be JSON string or empty
    const initialContent = content ? (() => {
        try {
            return JSON.parse(content)
        } catch {
            // If not valid JSON, return empty doc
            return { type: 'doc', content: [] }
        }
    })() : { type: 'doc', content: [] }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-main underline',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: initialContent,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            // Return JSON string instead of HTML
            onChange(JSON.stringify(editor.getJSON()))
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3',
            },
        },
    })

    if (!editor) {
        return null
    }

    const openLinkDialog = () => {
        const previousUrl = editor.getAttributes('link').href || ""
        const { from, to } = editor.state.selection
        const hasSelection = from !== to

        // Get selected text if any
        let selectedText = ""
        if (hasSelection) {
            selectedText = editor.state.doc.textBetween(from, to)
        }

        setLinkUrl(previousUrl)
        setLinkTitle(selectedText || previousUrl)
        setIsEditingLink(!!previousUrl)
        setLinkDialogOpen(true)
    }

    const addLink = () => {
        if (linkUrl) {
            const { from, to } = editor.state.selection
            const hasSelection = from !== to

            if (hasSelection) {
                // Apply link to selected text
                editor.chain().focus().setLink({ href: linkUrl }).run()
            } else {
                // No selection - insert the link title (or URL if no title) as clickable text
                const displayText = linkTitle.trim() || linkUrl
                editor
                    .chain()
                    .focus()
                    .insertContent(`<a href="${linkUrl}">${displayText}</a>`)
                    .run()
            }
        }
        closeLinkDialog()
    }

    const removeLink = () => {
        editor.chain().focus().unsetLink().run()
        closeLinkDialog()
    }

    const closeLinkDialog = () => {
        setLinkDialogOpen(false)
        setLinkUrl("")
        setLinkTitle("")
        setIsEditingLink(false)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
            console.error("Failed to upload image:", error)
            toast.error("Зураг оруулахад алдаа гарлаа")
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const getCurrentHeading = () => {
        if (editor.isActive('heading', { level: 1 })) return 'H1'
        if (editor.isActive('heading', { level: 2 })) return 'H2'
        if (editor.isActive('heading', { level: 3 })) return 'H3'
        return 'H'
    }

    const getCurrentList = () => {
        if (editor.isActive('bulletList')) return 'bullet'
        if (editor.isActive('orderedList')) return 'ordered'
        return null
    }

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 bg-gray-50/50">
                {/* Zoom controls */}
                <button
                    type="button"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-1.5 rounded hover:bg-gray-100 cursor-pointer text-gray-500"
                >
                    <Minus size={16} />
                </button>
                <span className="text-sm text-gray-600 min-w-[40px] text-center">{zoom}%</span>
                <button
                    type="button"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-1.5 rounded hover:bg-gray-100 cursor-pointer text-gray-500"
                >
                    <Plus size={16} />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Heading Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer text-gray-600 text-sm font-medium"
                        >
                            {getCurrentHeading()}
                            <ChevronDown size={14} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            className="cursor-pointer"
                        >
                            <span className="text-sm">Paragraph</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className="cursor-pointer"
                        >
                            <span className="text-2xl font-bold">Heading 1</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className="cursor-pointer"
                        >
                            <span className="text-xl font-semibold">Heading 2</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className="cursor-pointer"
                        >
                            <span className="text-lg font-medium">Heading 3</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* List Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer text-gray-600"
                        >
                            {getCurrentList() === 'ordered' ? <ListOrdered size={18} /> : <List size={18} />}
                            <ChevronDown size={14} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className="cursor-pointer"
                        >
                            <List size={16} className="mr-2" />
                            <span>Bullet List</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className="cursor-pointer"
                        >
                            <ListOrdered size={16} className="mr-2" />
                            <span>Numbered List</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className="cursor-pointer"
                        >
                            <Quote size={16} className="mr-2" />
                            <span>Quote</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Text formatting */}
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive('bold')
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive('italic')
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive('strike')
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <Strikethrough size={18} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive('underline')
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <UnderlineIcon size={18} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={openLinkDialog}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive('link')
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <LinkIcon size={18} />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Text Color */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="p-1.5 rounded cursor-pointer hover:bg-gray-100 text-gray-600 transition-colors flex flex-col items-center"
                        >
                            <Palette size={18} />
                            <div
                                className="w-4 h-1 rounded-full mt-0.5"
                                style={{ backgroundColor: currentColor }}
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3" align="start">
                        <div className="grid grid-cols-6 gap-1.5">
                            {TEXT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => {
                                        setCurrentColor(color)
                                        editor.chain().focus().setColor(color).run()
                                    }}
                                    className={`w-6 h-6 rounded cursor-pointer border-2 transition-all hover:scale-110 ${
                                        currentColor === color ? 'border-gray-800' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentColor('#000000')
                                    editor.chain().focus().unsetColor().run()
                                }}
                                className="w-6 h-6 rounded cursor-pointer border-2 border-gray-200 transition-all hover:scale-110 flex items-center justify-center bg-white"
                                title="Өнгө арилгах"
                            >
                                <Ban size={14} className="text-gray-400" />
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Highlight Color */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={`p-1.5 rounded cursor-pointer transition-colors flex flex-col items-center ${
                                editor.isActive('highlight')
                                    ? 'bg-purple-100 text-purple-600'
                                    : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            <Highlighter size={18} />
                            <div
                                className="w-4 h-1 rounded-full mt-0.5"
                                style={{ backgroundColor: currentHighlight }}
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3" align="start">
                        <div className="grid grid-cols-6 gap-1.5">
                            {HIGHLIGHT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => {
                                        setCurrentHighlight(color)
                                        editor.chain().focus().toggleHighlight({ color }).run()
                                    }}
                                    className={`w-6 h-6 rounded cursor-pointer border-2 transition-all hover:scale-110 ${
                                        currentHighlight === color ? 'border-gray-800' : 'border-gray-200'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    editor.chain().focus().unsetHighlight().run()
                                }}
                                className="w-6 h-6 rounded cursor-pointer border-2 border-gray-200 transition-all hover:scale-110 flex items-center justify-center bg-white"
                                title="Тодруулга арилгах"
                            >
                                <Ban size={14} className="text-gray-400" />
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Text alignment */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive({ textAlign: 'left' })
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive({ textAlign: 'center' })
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive({ textAlign: 'right' })
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <AlignRight size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`p-1.5 rounded cursor-pointer transition-colors ${
                        editor.isActive({ textAlign: 'justify' })
                            ? 'bg-purple-100 text-purple-600'
                            : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                    <AlignJustify size={18} />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Image */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 rounded cursor-pointer hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    {isUploading ? (
                        <div className="w-[18px] h-[18px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <ImageIcon size={18} />
                    )}
                </button>

                <div className="flex-1" />

                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-1.5 rounded cursor-pointer hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <Undo size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-1.5 rounded cursor-pointer hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <Redo size={18} />
                </button>
            </div>

            {/* Editor */}
            <div style={{ fontSize: `${zoom}%` }}>
                <EditorContent editor={editor} />
            </div>

            {/* Link Dialog */}
            <Dialog open={linkDialogOpen} onOpenChange={closeLinkDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditingLink ? "Линк засах" : "Линк нэмэх"}</DialogTitle>
                        <DialogDescription>
                            {isEditingLink
                                ? "Линкийн мэдээллийг засварлана уу"
                                : "Текст сонгосон бол линк болгоно, эсвэл шинэ линк оруулна"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="linkUrl">Page or URL</Label>
                            <Input
                                id="linkUrl"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com эсвэл mailto:email@example.com"
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkTitle">Link title</Label>
                            <Input
                                id="linkTitle"
                                value={linkTitle}
                                onChange={(e) => setLinkTitle(e.target.value)}
                                placeholder="Харагдах текст"
                                className="rounded-xl"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        {isEditingLink && (
                            <Button
                                variant="destructive"
                                onClick={removeLink}
                                className="rounded-xl sm:mr-auto"
                            >
                                Линк устгах
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={closeLinkDialog}
                            className="rounded-xl"
                        >
                            Болих
                        </Button>
                        <Button
                            onClick={addLink}
                            disabled={!linkUrl.trim()}
                            className="rounded-xl bg-main hover:bg-main/90"
                        >
                            {isEditingLink ? "Хадгалах" : "Нэмэх"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
