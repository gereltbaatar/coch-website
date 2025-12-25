import { Header, Footer } from "@/components/navigation"
import { FreeHero, ProductList } from "@/components/free"

const FreePage = () => {
    return (
        <main className="min-h-screen bg-white flex flex-col gap-10">
            <FreeHero />
            <ProductList />
            <Footer />
        </main>
    )
}

export default FreePage