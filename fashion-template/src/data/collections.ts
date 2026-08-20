export interface Collection {
    imgSrc: string;
    label: string;
    width: number;
    height: number;
}

/** Rendered inside the header's "Shop" mega-menu tab. */
export const categories: Collection[] = [
    { imgSrc: "/images/cls-categories/fashion/men-2.jpg", label: "Men", width: 540, height: 540 },
    { imgSrc: "/images/cls-categories/fashion/women.jpg", label: "Women", width: 540, height: 540 },
    { imgSrc: "/images/cls-categories/fashion/accessories.jpg", label: "Accessories", width: 696, height: 773 },
    { imgSrc: "/images/cls-categories/fashion/sportwear.jpg", label: "Sportwear", width: 696, height: 773 },
];
