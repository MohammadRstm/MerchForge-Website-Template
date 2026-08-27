import type { ProductCategory } from "../types/product";

export interface HeroSlide {
    imgSrc: string;
    alt: string;
    buttonText: string;
    category: ProductCategory;
}

/** Rendered by the hero slider at the top of the page — each slide links to the shop page pre-filtered to its category. */
export const groceryHeroSlides: HeroSlide[] = [
    { imgSrc: "/images/products/vegetable-hero/hero-vegetables.jpg", alt: "Fresh vegetables", buttonText: "Shop Vegetables", category: "vegetables" },
    { imgSrc: "/images/products/vegetable-hero/hero-fruits.jpg", alt: "Fresh fruits", buttonText: "Shop Fruits", category: "fruits" },
    { imgSrc: "/images/products/vegetable-hero/hero-fruits-2.jpg", alt: "Fresh berries", buttonText: "Shop Fruits", category: "fruits" },
];
