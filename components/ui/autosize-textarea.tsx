"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AutosizeTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    minHeight?: number
    maxHeight?: number
}

const AutosizeTextarea = React.forwardRef<
    HTMLTextAreaElement,
    AutosizeTextareaProps
>(({ className, minHeight = 48, maxHeight = 200, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    const adjustHeight = React.useCallback(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
            textarea.style.height = `${newHeight}px`
        }
    }, [minHeight, maxHeight])

    React.useEffect(() => {
        adjustHeight()
    }, [props.value, adjustHeight])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight()
        onChange?.(e)
    }

    return (
        <textarea
            className={cn(
                "flex w-full rounded-xl border border-input bg-transparent px-3 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden",
                className
            )}
            ref={(node) => {
                textareaRef.current = node
                if (typeof ref === 'function') {
                    ref(node)
                } else if (ref) {
                    ref.current = node
                }
            }}
            onChange={handleChange}
            style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
            {...props}
        />
    )
})
AutosizeTextarea.displayName = "AutosizeTextarea"

export { AutosizeTextarea }
