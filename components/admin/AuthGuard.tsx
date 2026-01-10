'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCurrentUser, checkAdminAccess } from '@/lib/auth'
import { toast } from 'sonner'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            // Skip auth check for login and callback pages
            if (pathname === '/admin/login' || pathname?.startsWith('/admin/auth')) {
                setIsAuthorized(true)
                setIsLoading(false)
                return
            }

            try {
                const user = await getCurrentUser()

                if (!user || !user.email) {
                    // Don't show toast on initial load, just redirect
                    router.push('/admin/login')
                    setIsLoading(false)
                    return
                }

                const hasAccess = await checkAdminAccess(user.email)

                if (!hasAccess) {
                    toast.error('Таны имэйл админ жагсаалтанд байхгүй байна')
                    router.push('/admin/login')
                    setIsLoading(false)
                    return
                }

                setIsAuthorized(true)
            } catch (error) {
                console.error('Auth check error:', error)
                // Don't show error toast, just redirect
                router.push('/admin/login')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [pathname, router])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Шалгаж байна...</p>
                </div>
            </div>
        )
    }

    if (!isAuthorized) {
        return null
    }

    return <>{children}</>
}
