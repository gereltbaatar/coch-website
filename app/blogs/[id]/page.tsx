import BlogPage from "@/pages/BlogPage"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params
    return <BlogPage id={id} />
}
