"use client";

import { useState } from "react";
import SideBar, { TabType } from "@/components/admin/SideBar";
import { BlogContent } from "@/components/admin/BlogContent";
import { ProductContent } from "@/components/admin/ProductContent";

const AdminHomePage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Blog");

    const renderContent = () => {
        switch (activeTab) {
            case "Blog":
                return <BlogContent />;
            case "Products":
                return <ProductContent />;
            default:
                return <BlogContent />;
        }
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <SideBar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                {renderContent()}
            </main>
        </div>
    )
}

export default AdminHomePage