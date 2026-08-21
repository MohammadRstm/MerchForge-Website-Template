import type { ProductCategory } from "../types/product";

export interface HeroSlide {
    imgSrc: string;
    alt: string;
    buttonText: string;
    category: ProductCategory;
}

/** Rendered by the hero slider at the top of the page — each slide links to the shop page pre-filtered to its category. */
export const fashionSlides: HeroSlide[] = [
    { imgSrc: "/images/slider/fashion/slider-fashion-2-1.png", alt: "slider", buttonText: "Shop Men", category: "men" },
    { imgSrc: "/images/slider/fashion/slider-fashion-2-2.png", alt: "slider", buttonText: "Shop Women", category: "women" },
    { imgSrc: "/images/slider/fashion/slider-fashion-2-3.png", alt: "slider", buttonText: "Shop Kid", category: "kids" },
];
