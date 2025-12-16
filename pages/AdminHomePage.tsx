import SideBar from "@/components/admin/SideBar";

const AdminHomePage = () => {
    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <SideBar />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin</p>
                </header>

                {/* Content Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-40"></div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-40"></div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-40"></div>
                </div>
            </main>
        </div>
    )
}

export default AdminHomePage