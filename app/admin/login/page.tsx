'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle, getCurrentUser, checkAdminAccess } from '@/lib/auth'
import { toast } from 'sonner'
import Silk from '@/components/ui/Silk'

export default function AdminLoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            const user = await getCurrentUser()
            if (user?.email) {
                const hasAccess = await checkAdminAccess(user.email)
                if (hasAccess) {
                    router.push('/admin')
                }
            }
        }
        checkAuth()
    }, [router])

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true)
            await signInWithGoogle()
        } catch (error) {
            console.error('Error signing in with Google:', error)
            toast.error('Google нэвтрэхэд алдаа гарлаа')
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* Left Side - Main Color Background */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-secondary items-center justify-center">
                {/* Logo */}
                <div className="absolute inset-0 z-0 m-3 rounded-3xl overflow-hidden">
                    <Silk
                        speed={5}
                        scale={1}
                        color="#8a8e75"
                        noiseIntensity={1.5}
                        rotation={0}
                    />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-secondary px-8">
                {/* Top Right - Sign Up Link */}
                <div className="absolute top-8 right-8 z-10">
                    <p className="text-gray-600 text-sm">
                        Бүртгэл байхгүй юу?{' '}
                        <button
                            onClick={() => toast.info('Админ эрхийн хүсэлт илгээхийн тулд системийн администратортай холбогдоно уу')}
                            className="text-main font-medium hover:underline"
                        >
                            Бүртгүүлэх
                        </button>
                    </p>
                </div>

                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ нэвтрэх</h1>
                        <p className="text-gray-600">Google акаунтаар нэвтэрнэ үү</p>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        {loading ? 'Нэвтэрч байна...' : 'Google-р нэвтрэх'}
                    </button>

                    {/* Info Text */}
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-sm text-blue-800 text-center">
                            Зөвхөн админ жагсаалтанд бүртгэлтэй Gmail хаяг нэвтрэх эрхтэй
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
