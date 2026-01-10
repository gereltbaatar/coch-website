'use client'

import { useState, useEffect } from 'react'
import { supabase, AdminUser } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import { ensureDefaultAdmin } from '@/lib/ensure-default-admin'
import { toast } from 'sonner'
import { Plus, Trash2, Mail, Calendar, User as UserIcon, AlertTriangle, Shield } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function AdminUsersPage() {
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('')
    const [newEmail, setNewEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<{ id: string; email: string } | null>(null)

    useEffect(() => {
        // Ensure default admin exists
        ensureDefaultAdmin().then(() => {
            loadAdminUsers()
            loadCurrentUser()
        })
    }, [])

    const loadCurrentUser = async () => {
        const user = await getCurrentUser()
        if (user?.email) {
            setCurrentUserEmail(user.email)
        }
    }

    const loadAdminUsers = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .order('created_at', { ascending: false })

            console.log('Loading admin users:', { data, error })

            if (error) {
                console.error('Error loading admin users:', error)
                toast.error('Админ хэрэглэгчдийг ачааллахад алдаа гарлаа')
                return
            }

            console.log('Setting admin users:', data)
            setAdminUsers(data || [])
        } catch (error) {
            console.error('Error loading admin users:', error)
            toast.error('Алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setEmailError('') // Clear previous errors

        if (!newEmail) {
            setEmailError('Имэйл хаяг оруулна уу')
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newEmail)) {
            setEmailError('Имэйл хаяг буруу байна')
            return
        }

        try {
            setIsAddingUser(true)
            setEmailError('') // Clear error before submitting

            // Simple insert - only email field
            const { error } = await supabase
                .from('admin_users')
                .insert({
                    email: newEmail.toLowerCase()
                })

            if (error) {
                console.error('Error adding admin user:', error)
                if (error.code === '23505') {
                    setEmailError('Энэ имэйл хаяг аль хэдийн бүртгэлтэй байна')
                } else {
                    setEmailError(`Админ хэрэглэгч нэмэхэд алдаа гарлаа: ${error.message}`)
                }
                return
            }

            // Send invitation email
            try {
                const emailResponse = await fetch('/api/send-admin-invitation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: newEmail.toLowerCase() }),
                })

                if (emailResponse.ok) {
                    toast.success('Админ хэрэглэгч амжилттай нэмэгдлээ. Урилгын имэйл илгээгдлээ! 📧')
                } else {
                    toast.success('Админ хэрэглэгч амжилттай нэмэгдлээ')
                    toast.error('Урилгын имэйл илгээхэд алдаа гарлаа. Хэрэглэгч руу дахин илгээнэ үү.')
                }
            } catch (emailError) {
                console.error('Error sending invitation email:', emailError)
                toast.success('Админ хэрэглэгч амжилттай нэмэгдлээ')
                toast.error('Урилгын имэйл илгээхэд алдаа гарлаа')
            }

            setNewEmail('')
            setEmailError('')
            loadAdminUsers()
        } catch (error) {
            console.error('Error adding admin user:', error)
            setEmailError('Алдаа гарлаа')
        } finally {
            setIsAddingUser(false)
        }
    }

    const isDefaultAdmin = (email: string) => {
        const defaultAdminEmail = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL
        return defaultAdminEmail && email.toLowerCase() === defaultAdminEmail.toLowerCase()
    }

    const openDeleteDialog = (userId: string, email: string) => {
        if (email === currentUserEmail) {
            toast.error('Өөрийгөө устгаж болохгүй')
            return
        }

        if (isDefaultAdmin(email)) {
            toast.error('Үндсэн админ хэрэглэгчийг устгах боломжгүй')
            return
        }

        setUserToDelete({ id: userId, email })
        setDeleteDialogOpen(true)
    }

    const handleDeleteUser = async () => {
        if (!userToDelete) return

        try {
            console.log('Deleting admin user:', userToDelete)

            // Delete without .select() to avoid RLS policy issues
            const { error } = await supabase
                .from('admin_users')
                .delete()
                .eq('id', userToDelete.id)

            console.log('Delete response:', { error })

            if (error) {
                console.error('Error deleting admin user:', error)
                toast.error(`Админ хэрэглэгч устгахад алдаа гарлаа: ${error.message}`)
                return
            }

            console.log('Delete successful, reloading admin users...')
            toast.success('Админ хэрэглэгч амжилттай устгагдлаа')

            // Close dialog first, then reload
            setDeleteDialogOpen(false)
            setUserToDelete(null)

            // Reload admin users list
            await loadAdminUsers()
        } catch (error) {
            console.error('Error deleting admin user:', error)
            toast.error('Алдаа гарлаа')
            setDeleteDialogOpen(false)
            setUserToDelete(null)
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ удирдлага</h1>
                <p className="text-gray-600">Админ эрхтэй хэрэглэгчдийг удирдах</p>
            </div>

            {/* Add New Admin User Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-main" />
                    Шинэ админ нэмэх
                </h2>
                <form onSubmit={handleAddUser} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Имэйл хаяг <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${emailError ? 'text-red-400' : 'text-gray-400'}`} />
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => {
                                    setNewEmail(e.target.value)
                                    setEmailError('') // Clear error on input change
                                }}
                                placeholder="admin@example.com"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                                    emailError
                                        ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                        : 'border-gray-300 focus:ring-main'
                                }`}
                            />
                        </div>
                        {/* Error Message */}
                        {emailError && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {emailError}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isAddingUser}
                        className="bg-main hover:bg-main/90 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAddingUser ? 'Нэмж байна...' : 'Админ нэмэх'}
                    </button>
                </form>
            </div>

            {/* Admin Users List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Админ жагсаалт ({adminUsers.length})
                </h2>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
                        <p className="text-gray-500 mt-2">Ачааллаж байна...</p>
                    </div>
                ) : adminUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500">Админ хэрэглэгч байхгүй байна</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {adminUsers.map((admin) => (
                            <div
                                key={admin.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-main/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-main/10 rounded-full flex items-center justify-center">
                                        <UserIcon size={20} className="text-main" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{admin.email}</p>
                                            {admin.email === currentUserEmail && (
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                    Та
                                                </span>
                                            )}
                                            {isDefaultAdmin(admin.email) && (
                                                <span className="text-xs bg-main/10 text-main px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <Shield size={12} />
                                                    Үндсэн админ
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            <p className="text-xs text-gray-400">
                                                Нэмсэн: {new Date(admin.created_at).toLocaleDateString('mn-MN')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {admin.email !== currentUserEmail && !isDefaultAdmin(admin.email) && (
                                    <button
                                        onClick={() => openDeleteDialog(admin.id, admin.email)}
                                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        title="Устгах"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                                {isDefaultAdmin(admin.email) && admin.email !== currentUserEmail && (
                                    <div className="text-gray-400 p-2" title="Үндсэн админ устгах боломжгүй">
                                        <Shield size={18} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-blue-900 mb-1">Анхааруулга</h3>
                        <p className="text-sm text-blue-700">
                            Энд нэмэгдсэн имэйл хаяг бүхий Google акаунт админ хэсэгт нэвтрэх боломжтой болно.
                            Зөвхөн итгэлтэй хүмүүсийг нэмнэ үү.
                        </p>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            Админ эрх хасах
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Та <span className="font-semibold text-gray-900">{userToDelete?.email}</span> имэйл хаягийг админ жагсаалтаас хасахдаа итгэлтэй байна уу?
                            <br />
                            <br />
                            Энэ үйлдлийг буцаах боломжгүй бөгөөд тухайн хэрэглэгч админ хэсэгт нэвтрэх эрхээ алдана.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteUser}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Устгах
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
