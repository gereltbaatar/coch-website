"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
    ChevronLeft,
    Menu,
    FileText,
    ShoppingBag,
    LogOut,
    UserCircle,
    Settings,
    CalendarDays,
} from "lucide-react"
import Image from "next/image"
import AuthGuard from "@/components/admin/AuthGuard"
import { signOut, getCurrentUser } from "@/lib/auth"
import { toast } from "sonner"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [userEmail, setUserEmail] = useState<string>('')

    // Check if we're on login or auth pages
    const isAuthPage = pathname === '/admin/login' || pathname?.startsWith('/admin/auth')

    useEffect(() => {
        const loadUser = async () => {
            const user = await getCurrentUser()
            if (user?.email) {
                setUserEmail(user.email)
            }
        }
        loadUser()
    }, [])

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const handleSignOut = async () => {
        try {
            await signOut()
            toast.success('Амжилттай гарлаа')
            window.location.href = '/admin/login'
        } catch (error) {
            console.error('Error signing out:', error)
            toast.error('Гарахад алдаа гарлаа')
        }
    }

    const menuItems = [
        { icon: FileText, label: "Blog", href: "/admin/blog" },
        { icon: ShoppingBag, label: "Products", href: "/admin/product" },
        { icon: CalendarDays, label: "Цаг захиалга", href: "/admin/booking" },
        { icon: Settings, label: "Админ удирдлага", href: "/admin/users" },
    ]

    // If on auth page, render children without sidebar
    if (isAuthPage) {
        return <AuthGuard>{children}</AuthGuard>
    }

    return (
        <AuthGuard>
            <div className="flex h-screen bg-white overflow-hidden">
                {/* Sidebar */}
                <aside
                className={`
                    h-screen bg-[#F5F7FA] border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                    ${isCollapsed ? "w-20" : "w-[280px]"}
                `}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between">
                    <Link href="/admin" className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
                        <div className="w-10 h-10 bg-main rounded-xl flex items-center justify-center shrink-0">
                            <div className="flex items-center justify-center bg-secondary rounded-full w-6 h-6">
                                <Image src="/logo.png" alt="Logo" width={20} height={20} />
                            </div>
                        </div>

                        {!isCollapsed && (
                            <div>
                                <h2 className="font-bold text-gray-900 leading-none">Admin</h2>
                                <p className="text-xs text-gray-500 mt-1">Dashboard</p>
                            </div>
                        )}
                    </Link>

                    {!isCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}
                </div>

                {/* Collapsed Toggle */}
                {isCollapsed && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                )}

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname?.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                                    ${isActive ? "bg-white shadow-sm" : "hover:bg-white/50 hover:shadow-sm"}
                                    ${isCollapsed ? "justify-center" : ""}
                                `}
                            >
                                <item.icon
                                    size={22}
                                    className={isActive ? "text-main" : "text-gray-500 group-hover:text-gray-900"}
                                />

                                {!isCollapsed && (
                                    <span className={`flex-1 font-medium ${isActive ? "text-main" : "text-gray-600 group-hover:text-gray-900"}`}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-200">
                    {!isCollapsed ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100">
                                <UserCircle size={20} className="text-gray-600" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500">Нэвтэрсэн</p>
                                    <p className="text-sm font-medium text-gray-900 truncate">{userEmail || 'Loading...'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Гарах</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleSignOut}
                            className="w-full flex justify-center p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    )}
                </div>
            </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                    {children}
                </main>
            </div>
        </AuthGuard>
    )
}
