"use client";

import { useState } from "react";
import {
    Search,
    Calendar,
    Timer,
    Bell,
    Settings,
    ChevronLeft,
    Menu,
    Plus,
    LayoutGrid,
    Target,
    Zap,
    Users
} from "lucide-react";
import Image from "next/image";

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const mainMenuItems = [
        { icon: Search, label: "Search" },
        { icon: Calendar, label: "Calendar" },
        { icon: Timer, label: "Timer", active: true },
        { icon: Bell, label: "Notification", badge: "99+" },
        { icon: Settings, label: "Settings" },
    ];

    const projectItems = [
        { icon: LayoutGrid, label: "Formahaus Project", color: "text-blue-500" },
        { icon: Target, label: "Studio Noto", color: "text-orange-500" },
        { icon: Zap, label: "Pink Cell Studio", color: "text-pink-500", badge: "8" },
        { icon: Users, label: "Oblik Project", color: "text-green-500" },
        { icon: LayoutGrid, label: "Line Art Task", color: "text-gray-500" },
    ];

    return (
        <aside
            className={`
                h-screen bg-[#F5F7FA] border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                ${isCollapsed ? "w-20" : "w-[280px]"}
            `}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shrink-0">
                        <div className="w-4 h-4 bg-white rounded-full translate-y-[-2px]" />
                    </div>

                    {!isCollapsed && (
                        <div>
                            <h2 className="font-bold text-gray-900 leading-none">Taskloop</h2>
                            <p className="text-xs text-gray-500 mt-1">Free Trial</p>
                        </div>
                    )}
                </div>

                {!isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}
            </div>

            {/* Collapsed Toggle (Centered if collapsed) */}
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

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 py-2 space-y-8">

                {/* Main Menu */}
                <div>
                    {!isCollapsed && (
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            Main Menu
                        </h3>
                    )}
                    <div className="space-y-1">
                        {mainMenuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group
                                    ${item.active ? "bg-white shadow-sm" : "hover:bg-white/50 hover:shadow-sm"}
                                    ${isCollapsed ? "justify-center" : ""}
                                `}
                            >
                                <item.icon
                                    size={22}
                                    className={`
                                        ${item.active ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}
                                    `}
                                />

                                {!isCollapsed && (
                                    <span className={`flex-1 font-medium ${item.active ? "text-gray-900" : "text-gray-600"}`}>
                                        {item.label}
                                    </span>
                                )}

                                {!isCollapsed && item.badge && (
                                    <span className="bg-purple-100 text-purple-600 text-xs font-bold px-2 py-0.5 rounded-md">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Projects */}
                <div>
                    {!isCollapsed && (
                        <div className="flex items-center justify-between px-2 mb-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                My Projects
                            </h3>
                            <ChevronLeft className="-rotate-90 text-gray-400" size={14} />
                        </div>
                    )}
                    <div className="space-y-1">
                        {projectItems.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all hover:bg-white/50 hover:shadow-sm group
                                    ${isCollapsed ? "justify-center" : ""}
                                `}
                            >
                                <item.icon size={22} className={`${item.color}`} />

                                {!isCollapsed && (
                                    <span className="flex-1 font-medium text-gray-600 group-hover:text-gray-900">
                                        {item.label}
                                    </span>
                                )}

                                {!isCollapsed && item.badge && (
                                    <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accounts */}
                <div>
                    {!isCollapsed && (
                        <div className="flex items-center justify-between px-2 mb-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Accounts
                            </h3>
                            <Plus className="text-gray-400" size={16} />
                        </div>
                    )}
                    <div
                        className={`
                            flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/50
                            ${isCollapsed ? "justify-center" : ""}
                        `}
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-300 relative overflow-hidden">
                            {/* Placeholder for avatar */}
                            <Image
                                src="https://ui-avatars.com/api/?name=Zulkifli+Syukur&background=random"
                                alt="User"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {!isCollapsed && (
                            <span className="font-medium text-gray-700">Zulkifli Syukur</span>
                        )}
                    </div>
                </div>

            </div>

            {/* Upgrade Logic - Bottom */}
            {!isCollapsed && (
                <div className="p-4 m-4 bg-linear-to-br from-white to-purple-50 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden">
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                            🚀
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <h4 className="font-bold text-gray-900 mb-1">Upgrade to Pro!</h4>
                        <p className="text-xs text-gray-500">Unlock all Taskloop features by upgrading to Pro.</p>
                    </div>
                    <button className="w-full py-2.5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-purple-200">
                        Upgrade Now
                    </button>
                    {/* Decorative blurred circles via CSS could go here */}
                </div>
            )}
        </aside>
    );
};

export default SideBar;
