import type { ProductCategory } from "../types/product";

export interface HeroSlide {
    imgSrc: string;
    alt: string;
    headline: string;
    tagline: string;
    buttonText: string;
    category: ProductCategory;
}

/** Rendered by the hero slider at the top of the page — each slide links to the shop page pre-filtered to its category. */
export const fashionSlides: HeroSlide[] = [
    {
        imgSrc: "/images/slider/fashion-01/slider-1.png",
        alt: "slider",
        headline: "Style Redefined",
        tagline: "Discover the latest trends in fashion that speak your style.",
        buttonText: "Shop Collection",
        category: "women",
    },
    {
        imgSrc: "/images/slider/fashion-01/slider-2.png",
        alt: "slider",
        headline: "Elegance Redefined",
        tagline: "Discover timeless styles for every occasion.",
        buttonText: "Shop Collection",
        category: "women",
    },
    {
        imgSrc: "/images/slider/fashion-01/slider-3.png",
        alt: "slider",
        headline: "Elevate Your Wardrobe",
        tagline: "Timeless pieces to refresh your look for every season.",
        buttonText: "Shop Collection",
        category: "men",
    },
];
