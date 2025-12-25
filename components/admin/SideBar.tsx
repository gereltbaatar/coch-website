"use client";

import { useState } from "react";
import {
    ChevronLeft,
    Menu,
    FileText,
    ShoppingBag,
} from "lucide-react";
import Image from "next/image";

export type TabType = "Blog" | "Products";

interface SideBarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const SideBar = ({ activeTab, onTabChange }: SideBarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const mainMenuItems: { icon: typeof FileText; label: TabType }[] = [
        { icon: FileText, label: "Blog" },
        { icon: ShoppingBag, label: "Products" },
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
                    <div className="w-10 h-10 bg-main rounded-xl flex items-center justify-center shrink-0">
                        <div className="flex items-center justify-center bg-secondary rounded-full w-6 h-6">
                            <Image src="/logo.png" alt="Logo" width={20} height={20} />
                        </div>
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
                <div>
                    <div className="space-y-1">
                        {mainMenuItems.map((item, index) => {
                            const isActive = activeTab === item.label;
                            return (
                                <div
                                    key={index}
                                    onClick={() => onTabChange(item.label)}
                                    className={`
                                        flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group
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
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

        </aside>
    );
};

export default SideBar;
