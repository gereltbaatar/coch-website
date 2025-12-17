import { ProductCard } from "./ProductCard";

const products = [
    {
        id: 1,
        title: "Ceramic Vase",
        price: "$ 89.00",
        image: "/Product1.png",
        tag: "HOT" as const
    },
    {
        id: 2,
        title: "Geometric Clock",
        price: "$ 129.00",
        originalPrice: "$ 149.00",
        image: "/Product2.png",
        tag: "SALE" as const
    },
    {
        id: 3,
        title: "Concrete Planter",
        price: "$ 59.00",
        image: "/Product3.png",
    },
    {
        id: 4,
        title: "Minimalist Lamp",
        price: "$ 199.00",
        image: "/Product1.png", // Reusing for demo
    },
    {
        id: 5,
        title: "Desk Organizer",
        price: "$ 45.00",
        image: "/Product2.png", // Reusing for demo
        tag: "NEW" as const
    },
    {
        id: 6,
        title: "Wall Art Frame",
        price: "$ 79.00",
        originalPrice: "$ 99.00",
        image: "/Product3.png", // Reusing for demo
        tag: "SALE" as const
    }
];

export const ProductList = () => {
    return (
        <section className="w-full bg-white container mx-auto px-4 sm:px-6 lg:px-8 pb-24">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-black/5 pb-6 gap-4">
                <div className="flex items-center gap-6">
                    <button className="text-xs font-semibold tracking-widest text-black hover:text-black/60 transition-colors uppercase">
                        Show Sidebar
                    </button>
                    <div className="h-4 w-px bg-black/10"></div>
                    <button className="text-black hover:text-black/60 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="2" transform="matrix(1 0 0 -1 0 10)" fill="currentColor" />
                            <rect width="18" height="2" transform="matrix(1 0 0 -1 0 5)" fill="currentColor" />
                            <rect width="18" height="2" transform="matrix(1 0 0 -1 0 15)" fill="currentColor" />
                        </svg>
                    </button>
                    <button className="text-black hover:text-black/60 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" fill="currentColor" />
                            <rect x="10" width="8" height="8" rx="1" fill="currentColor" />
                            <rect y="10" width="8" height="8" rx="1" fill="currentColor" />
                            <rect x="10" y="10" width="8" height="8" rx="1" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-black/40">
                    SHOWING 1-12 OF 30 RESULTS
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        tag={product.tag}
                    />
                ))}
            </div>
        </section>
    );
};
