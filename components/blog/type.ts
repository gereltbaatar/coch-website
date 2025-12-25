export interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    hoverImage?: string;
    readTime: string;
    excerpt: string;
}