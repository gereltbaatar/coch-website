import { Plus } from "lucide-react";

export const ProductContent = () => {
    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your products</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-main text-white rounded-full font-medium hover:bg-main/90 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Content area */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[400px] h-full">
                <p className="text-gray-400 text-center py-20">No products yet</p>
            </div>
        </div>
    )
}