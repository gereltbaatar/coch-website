"use client"

import { useState } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { supabase, Category } from "@/lib/supabase"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Add Category Dialog
interface AddCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCategoryAdded: (category: Category) => void
}

export function AddCategoryDialog({ open, onOpenChange, onCategoryAdded }: AddCategoryDialogProps) {
    const [name, setName] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    const handleAdd = async () => {
        if (!name.trim()) {
            toast.error("Ангилалын нэр оруулна уу")
            return
        }

        setIsAdding(true)
        try {
            const { data, error } = await supabase
                .from('categories')
                .insert({ name: name.trim() })
                .select()
                .single()

            if (error) throw error

            onCategoryAdded(data)
            setName("")
            onOpenChange(false)
            toast.success("Ангилал нэмэгдлээ!")
        } catch (error) {
            console.error("Failed to add category:", error)
            toast.error("Ангилал нэмэхэд алдаа гарлаа")
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Шинэ ангилал нэмэх</DialogTitle>
                    <DialogDescription>Блогийн шинэ ангилал үүсгэнэ үү</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoryName">Ангилалын нэр</Label>
                        <Input
                            id="categoryName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Жишээ: Технологи"
                            className="rounded-xl"
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                        Болих
                    </Button>
                    <Button onClick={handleAdd} disabled={isAdding} className="rounded-xl bg-main hover:bg-main/90">
                        {isAdding ? "Нэмж байна..." : "Нэмэх"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Manage Categories Dialog
interface ManageCategoriesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: Category[]
    onCategoryUpdated: (category: Category) => void
    onCategoryDeleted: (categoryId: string) => void
}

export function ManageCategoriesDialog({
    open,
    onOpenChange,
    categories,
    onCategoryUpdated,
    onCategoryDeleted
}: ManageCategoriesDialogProps) {
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
    const [editingCategoryName, setEditingCategoryName] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleEdit = async (categoryId: string) => {
        if (!editingCategoryName.trim()) {
            toast.error("Ангилалын нэр оруулна уу")
            return
        }

        try {
            const { error } = await supabase
                .from('categories')
                .update({ name: editingCategoryName.trim() })
                .eq('id', categoryId)

            if (error) throw error

            const updatedCategory = categories.find(c => c.id === categoryId)
            if (updatedCategory) {
                onCategoryUpdated({ ...updatedCategory, name: editingCategoryName.trim() })
            }

            setEditingCategoryId(null)
            setEditingCategoryName("")
            toast.success("Ангилал шинэчлэгдлээ!")
        } catch (error) {
            console.error("Failed to edit category:", error)
            toast.error("Ангилал засахад алдаа гарлаа")
        }
    }

    const openDeleteDialog = (category: Category) => {
        setCategoryToDelete(category)
        setDeleteDialogOpen(true)
    }

    const handleDelete = async () => {
        if (!categoryToDelete) return

        setIsDeleting(true)
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryToDelete.id)

            if (error) throw error

            onCategoryDeleted(categoryToDelete.id)
            toast.success("Ангилал устгагдлаа!")
            setDeleteDialogOpen(false)
            setCategoryToDelete(null)
        } catch (error) {
            console.error("Failed to delete category:", error)
            toast.error("Ангилал устгахад алдаа гарлаа")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Ангилал удирдах</DialogTitle>
                        <DialogDescription>Ангилалуудыг засах эсвэл устгах</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[400px] overflow-y-auto py-4">
                        {categories.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">Ангилал байхгүй</p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                        {editingCategoryId === cat.id ? (
                                            <>
                                                <Input
                                                    value={editingCategoryName}
                                                    onChange={(e) => setEditingCategoryName(e.target.value)}
                                                    className="flex-1 h-9 rounded-lg"
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === 'Enter' && handleEdit(cat.id)}
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    onClick={() => handleEdit(cat.id)}
                                                >
                                                    <Check size={18} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-gray-400 hover:text-gray-600"
                                                    onClick={() => {
                                                        setEditingCategoryId(null)
                                                        setEditingCategoryName("")
                                                    }}
                                                >
                                                    <X size={18} />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-1 font-medium text-gray-700">{cat.name}</span>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-gray-400 hover:text-gray-600"
                                                    onClick={() => {
                                                        setEditingCategoryId(cat.id)
                                                        setEditingCategoryName(cat.name)
                                                    }}
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => openDeleteDialog(cat)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                            Хаах
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Ангилал устгах</DialogTitle>
                        <DialogDescription>
                            Энэ ангилалыг устгахдаа итгэлтэй байна уу?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-center text-lg font-medium text-gray-700">
                            "{categoryToDelete?.name}"
                        </p>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false)
                                setCategoryToDelete(null)
                            }}
                            className="rounded-xl"
                        >
                            Болих
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="rounded-xl"
                        >
                            {isDeleting ? "Устгаж байна..." : "Устгах"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
