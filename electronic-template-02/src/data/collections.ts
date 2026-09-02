export interface CategoryTile {
    imgSrc: string;
    alt: string;
    title: string;
}

/** Rendered by the home page's "Categories" strip — decorative, links to the shop page. */
export const categoryTiles: CategoryTile[] = [
    { imgSrc: "/images/cls-categories/phonecase/product-1.jpg", alt: "iPhone Cases", title: "iPhone Cases" },
    { imgSrc: "/images/cls-categories/phonecase/product-2.jpg", alt: "Android Cases", title: "Android Cases" },
    { imgSrc: "/images/cls-categories/phonecase/product-3.jpg", alt: "Watch Straps", title: "Watch Straps" },
    { imgSrc: "/images/cls-categories/phonecase/product-4.jpg", alt: "Airpod Cases", title: "Airpod Cases" },
    { imgSrc: "/images/cls-categories/phonecase/product-5.jpg", alt: "Ring Holders", title: "Ring Holders" },
    { imgSrc: "/images/cls-categories/phonecase/product-6.jpg", alt: "Customizations", title: "Customizations" },
];
