"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X, Plus, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface MultiSelectOption {
    id: string
    label: string
    value: string
}

interface MultiSelectProps {
    options: MultiSelectOption[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    emptyMessage?: string
    isLoading?: boolean
    onAddNew?: () => void
    onEdit?: () => void
    addNewLabel?: string
    editLabel?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Сонгох...",
    emptyMessage = "Олдсонгүй.",
    isLoading = false,
    onAddNew,
    onEdit,
    addNewLabel = "Шинэ нэмэх",
    editLabel = "Засах",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value))
        } else {
            onChange([...selected, value])
        }
    }

    const handleRemove = (value: string, e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        onChange(selected.filter((v) => v !== value))
    }

    return (
        <div className={cn("flex gap-2 items-start", className)}>
            {/* Combobox with selected items inside */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "flex-1 justify-between rounded-xl font-normal hover:bg-transparent",
                            selected.length > 0 ? "h-auto min-h-12 py-2" : "h-12"
                        )}
                    >
                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {selected.length > 0 ? (
                                selected.map((value) => {
                                    const option = options.find((o) => o.value === value)
                                    return (
                                        <Badge
                                            key={value}
                                            variant="secondary"
                                            className="px-2.5 py-1 rounded-full text-sm gap-1 bg-secondary text-main font-medium"
                                        >
                                            {option?.label || value}
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                onClick={(e) => handleRemove(value, e)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        handleRemove(value, e as unknown as React.MouseEvent)
                                                    }
                                                }}
                                                className="hover:text-red-500 ml-0.5 cursor-pointer"
                                            >
                                                <X size={14} />
                                            </span>
                                        </Badge>
                                    )
                                })
                            ) : (
                                <span className="text-muted-foreground">{placeholder}</span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Хайх..." />
                        <CommandList>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-6">
                                    <div className="animate-spin w-5 h-5 border-2 border-main border-t-transparent rounded-full" />
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.id}
                                                value={option.value}
                                                onSelect={() => handleSelect(option.value)}
                                                className="cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selected.includes(option.value)
                                                            ? "opacity-100 text-main"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Action buttons */}
            {onAddNew && (
                <Button
                    type="button"
                    variant="secondary"
                    className="h-12 rounded-xl"
                    onClick={onAddNew}
                >
                    <Plus size={16} className="mr-1" />
                    {addNewLabel}
                </Button>
            )}
            {onEdit && (
                <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl"
                    onClick={onEdit}
                >
                    <Pencil size={16} className="mr-1" />
                    {editLabel}
                </Button>
            )}
        </div>
    )
}
