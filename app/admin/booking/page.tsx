'use client'

import { useState, useEffect } from 'react'
import { supabase, BookingDate, BookingRequest } from '@/lib/supabase'
import { toast } from 'sonner'
import { CalendarDays, Trash2, ChevronLeft, ChevronRight, Inbox, User, Phone, Mail, MessageSquare, Clock } from 'lucide-react'

const MONGOLIAN_MONTHS = [
    "1-р сар", "2-р сар", "3-р сар", "4-р сар",
    "5-р сар", "6-р сар", "7-р сар", "8-р сар",
    "9-р сар", "10-р сар", "11-р сар", "12-р сар"
]

const MONGOLIAN_WEEKDAYS = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"]

const SERVICE_TYPE_LABELS: Record<string, string> = {
    "1:1": "1:1 Coaching",
    "group": "Group Coaching",
    "corporate": "Corporate Training"
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    new: { label: "Шинэ", bg: "bg-blue-100", text: "text-blue-700" },
    contacted: { label: "Холбогдсон", bg: "bg-yellow-100", text: "text-yellow-700" },
    completed: { label: "Дууссан", bg: "bg-green-100", text: "text-green-700" },
    cancelled: { label: "Цуцалсан", bg: "bg-red-100", text: "text-red-700" },
}

export default function AdminBookingPage() {
    const [activeTab, setActiveTab] = useState<'requests' | 'calendar'>('requests')
    const [bookingDates, setBookingDates] = useState<BookingDate[]>([])
    const [requests, setRequests] = useState<BookingRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    useEffect(() => {
        loadBookingDates()
        loadRequests()
    }, [])

    // ── Booking Dates ──
    const loadBookingDates = async () => {
        try {
            const { data, error } = await supabase
                .from('booking_dates')
                .select('*')
                .order('date', { ascending: true })

            if (error) {
                console.error('Error loading booking dates:', error)
                return
            }
            setBookingDates(data || [])
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // ── Booking Requests ──
    const loadRequests = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('booking_requests')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error loading requests:', error)
                toast.error('Хүсэлтүүдийг ачааллахад алдаа гарлаа')
                return
            }
            setRequests(data || [])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateRequestStatus = async (id: string, status: BookingRequest['status']) => {
        const { error } = await supabase
            .from('booking_requests')
            .update({ status })
            .eq('id', id)

        if (error) {
            toast.error('Төлөв шинэчлэхэд алдаа гарлаа')
            return
        }
        toast.success('Төлөв шинэчлэгдлээ')
        loadRequests()
    }

    const deleteRequest = async (id: string) => {
        if (!confirm('Энэ хүсэлтийг устгах уу?')) return

        const { error } = await supabase
            .from('booking_requests')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Устгахад алдаа гарлаа')
            return
        }
        toast.success('Хүсэлт устгагдлаа')
        loadRequests()
    }

    // ── Calendar helpers ──
    const isDateSelected = (dateStr: string) => bookingDates.some(d => d.date === dateStr)

    const toggleDate = async (dateStr: string) => {
        const existing = bookingDates.find(d => d.date === dateStr)
        if (existing) {
            const { error } = await supabase.from('booking_dates').delete().eq('id', existing.id)
            if (error) { toast.error('Өдөр устгахад алдаа гарлаа'); return }
            toast.success('Өдөр устгагдлаа')
        } else {
            const { error } = await supabase.from('booking_dates').insert({ date: dateStr })
            if (error) { toast.error('Өдөр нэмэхэд алдаа гарлаа'); return }
            toast.success('Өдөр нэмэгдлээ')
        }
        loadBookingDates()
    }

    const isPastDate = (dateStr: string) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return new Date(dateStr) < today
    }

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startDay = firstDay.getDay()
        const days: { date: string; day: number; isCurrentMonth: boolean }[] = []

        const prevMonthLastDay = new Date(year, month, 0).getDate()
        for (let i = startDay - 1; i >= 0; i--) {
            const d = prevMonthLastDay - i
            const prevMonth = month === 0 ? 11 : month - 1
            const prevYear = month === 0 ? year - 1 : year
            days.push({ date: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, isCurrentMonth: false })
        }
        for (let d = 1; d <= daysInMonth; d++) {
            days.push({ date: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, isCurrentMonth: true })
        }
        const remainingDays = 42 - days.length
        for (let d = 1; d <= remainingDays; d++) {
            const nextMonth = month === 11 ? 0 : month + 1
            const nextYear = month === 11 ? year + 1 : year
            days.push({ date: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, isCurrentMonth: false })
        }
        return days
    }

    const navigateMonth = (dir: number) => {
        const d = new Date(currentMonth)
        d.setMonth(d.getMonth() + dir)
        setCurrentMonth(d)
    }

    const isToday = (dateStr: string) => dateStr === new Date().toISOString().split('T')[0]

    const upcomingDates = bookingDates.filter(d => !isPastDate(d.date))

    const formatDateMongolian = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00')
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekday = MONGOLIAN_WEEKDAYS[date.getDay()]
        return `${date.getFullYear()} оны ${month}-р сарын ${day} (${weekday})`
    }

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${date.getFullYear()}.${month}.${day} ${hours}:${minutes}`
    }

    const days = getDaysInMonth(currentMonth)
    const newRequestsCount = requests.filter(r => r.status === 'new').length

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Цаг захиалга</h1>
                <p className="text-gray-600">Уулзалтын хүсэлт болон боломжтой өдрүүдийг удирдах</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        activeTab === 'requests'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Inbox size={16} />
                    Хүсэлтүүд
                    {newRequestsCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{newRequestsCount}</span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        activeTab === 'calendar'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <CalendarDays size={16} />
                    Өдөр тохируулах
                </button>
            </div>

            {/* ══════ Requests Tab ══════ */}
            {activeTab === 'requests' && (
                <div>
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
                            <p className="text-gray-500 mt-2">Ачааллаж байна...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Inbox size={32} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-lg">Хүсэлт ирээгүй байна</p>
                            <p className="text-gray-400 text-sm mt-1">Хэрэглэгч цаг захиалга илгээхэд энд харагдана</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((req) => {
                                const statusCfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.new
                                return (
                                    <div
                                        key={req.id}
                                        className={`bg-white rounded-xl shadow-sm border p-6 transition-colors ${
                                            req.status === 'new' ? 'border-blue-200 border-l-4 border-l-blue-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                            <div className="flex-1 space-y-3">
                                                {/* Name & Status */}
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="text-lg font-semibold text-gray-900">{req.name}</h3>
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.bg} ${statusCfg.text}`}>
                                                        {statusCfg.label}
                                                    </span>
                                                    <span className="text-xs px-2.5 py-1 rounded-full bg-main/10 text-main font-medium">
                                                        {SERVICE_TYPE_LABELS[req.service_type] || req.service_type}
                                                    </span>
                                                </div>

                                                {/* Contact info */}
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5">
                                                        <Phone size={14} className="text-gray-400" />
                                                        {req.phone}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail size={14} className="text-gray-400" />
                                                        {req.email}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <CalendarDays size={14} className="text-gray-400" />
                                                        {formatDateMongolian(req.date)}
                                                    </span>
                                                </div>

                                                {/* Message */}
                                                {req.message && (
                                                    <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                                                        <MessageSquare size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                                        <p className="text-sm text-gray-600">{req.message}</p>
                                                    </div>
                                                )}

                                                {/* Time */}
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {formatDateTime(req.created_at)}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <select
                                                    value={req.status}
                                                    onChange={(e) => updateRequestStatus(req.id, e.target.value as BookingRequest['status'])}
                                                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-main focus:border-transparent"
                                                >
                                                    <option value="new">Шинэ</option>
                                                    <option value="contacted">Холбогдсон</option>
                                                    <option value="completed">Дууссан</option>
                                                    <option value="cancelled">Цуцалсан</option>
                                                </select>
                                                <button
                                                    onClick={() => deleteRequest(req.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Устгах"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* ══════ Calendar Tab ══════ */}
            {activeTab === 'calendar' && (
                <div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Calendar */}
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ChevronLeft size={20} className="text-gray-600" />
                                </button>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {currentMonth.getFullYear()} оны {MONGOLIAN_MONTHS[currentMonth.getMonth()]}
                                </h2>
                                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ChevronRight size={20} className="text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {MONGOLIAN_WEEKDAYS.map(day => (
                                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    const selected = isDateSelected(day.date)
                                    const past = isPastDate(day.date)
                                    const today = isToday(day.date)
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => !past && day.isCurrentMonth && toggleDate(day.date)}
                                            disabled={past || !day.isCurrentMonth}
                                            className={`
                                                aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                                                ${!day.isCurrentMonth ? 'text-gray-300 cursor-default' : ''}
                                                ${day.isCurrentMonth && past ? 'text-gray-300 cursor-not-allowed' : ''}
                                                ${day.isCurrentMonth && !past && !selected ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : ''}
                                                ${selected && !past ? 'bg-main text-white hover:bg-main/90 cursor-pointer' : ''}
                                                ${selected && past ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                                                ${today && !selected ? 'ring-2 ring-main/50' : ''}
                                            `}
                                        >
                                            {day.day}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="mt-6 flex items-center gap-6 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-main"></div>
                                    <span>Боломжтой өдөр</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded ring-2 ring-main/50"></div>
                                    <span>Өнөөдөр</span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming dates list */}
                        <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <CalendarDays size={20} className="text-main" />
                                Боломжтой өдрүүд ({upcomingDates.length})
                            </h2>

                            {upcomingDates.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CalendarDays size={24} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Өдөр сонгоогүй байна</p>
                                    <p className="text-gray-400 text-xs mt-1">Календараас өдөр дарж нэмнэ үү</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {upcomingDates.map(d => (
                                        <div
                                            key={d.id}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-main/50 transition-colors"
                                        >
                                            <span className="text-sm text-gray-700">{formatDateMongolian(d.date)}</span>
                                            <button
                                                onClick={() => toggleDate(d.date)}
                                                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                                title="Устгах"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-blue-900 mb-1">Зааварчилгаа</h3>
                                <p className="text-sm text-blue-700">
                                    Календар дээрх өдөр дээр дарж уулзалт хийх боломжтой өдрийг нэмэх эсвэл хасах боломжтой.
                                    Зөвхөн энд нэмэгдсэн өдрүүд хэрэглэгчийн цаг захиалгын хуудсанд харагдана.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
