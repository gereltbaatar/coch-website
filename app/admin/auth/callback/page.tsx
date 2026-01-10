'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { checkAdminAccess } from '@/lib/auth'
import { toast } from 'sonner'

export default function AuthCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the session from the URL hash
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error)
                    toast.error('Нэвтрэхэд алдаа гарлаа')
                    router.push('/admin/login')
                    return
                }

                if (!session) {
                    toast.error('Нэвтрэх амжилтгүй боллоо')
                    router.push('/admin/login')
                    return
                }

                // Check if user email is in admin whitelist
                const userEmail = session.user.email
                if (!userEmail) {
                    toast.error('Имэйл хаяг олдсонгүй')
                    await supabase.auth.signOut()
                    router.push('/admin/login')
                    return
                }

                const hasAccess = await checkAdminAccess(userEmail)

                if (!hasAccess) {
                    toast.error('Таны имэйл админ жагсаалтанд байхгүй байна. Системийн администратортай холбогдоно уу.')
                    await supabase.auth.signOut()
                    router.push('/admin/login')
                    return
                }

                // Success! User has admin access
                toast.success('Амжилттай нэвтэрлээ')
                router.push('/admin')
            } catch (error) {
                console.error('Error in auth callback:', error)
                toast.error('Алдаа гарлаа')
                router.push('/admin/login')
            }
        }

        handleCallback()
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-gray-600">Нэвтэрч байна...</p>
            </div>
        </div>
    )
}
