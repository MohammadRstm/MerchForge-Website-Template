export interface BlogPost {
    id: number;
    imgSrc: string;
    title: string;
}

/** Rendered by the "Latest Tips & Trends" section. */
export const blogItems: BlogPost[] = [
    { id: 1, imgSrc: "/images/blog/blog-7.jpg", title: "Seasonal Style Guide: Trends to Watch for This Year" },
    { id: 2, imgSrc: "/images/blog/blog-8.jpg", title: "Upcoming Style Trends: What to Wear This Season" },
    { id: 3, imgSrc: "/images/blog/blog-9.jpg", title: "Fashion Trends of the Year: Styles You Can't Miss" },
    { id: 4, imgSrc: "/images/blog/blog-7.jpg", title: "Seasonal Style Guide: Trends to Watch for This Year" },
];

export interface RecentBlogPost {
    id: number;
    imageSrc: string;
    alt: string;
    title: string;
    date: string;
    width: number;
    height: number;
}

/** Rendered inside the header's "Blog" mega-menu tab. */
export const recentBlogPosts: RecentBlogPost[] = [
    {
        id: 39,
        imageSrc: "/images/blog/recent-1.jpg",
        alt: "img-recent-blog",
        title: "The Power of Monochrome: Styling One Color",
        date: "Sep 19 2024",
        width: 128,
        height: 128,
    },
    {
        id: 40,
        imageSrc: "/images/blog/recent-2.jpg",
        alt: "img-recent-blog",
        title: "10 Must-Have Accessories for Every Season",
        date: "Sep 19 2024",
        width: 128,
        height: 128,
    },
    {
        id: 41,
        imageSrc: "/images/blog/recent-3.jpg",
        alt: "img-recent-blog",
        title: "How to Elevate Your Look with Layering",
        date: "Sep 19 2024",
        width: 128,
        height: 128,
    },
];
