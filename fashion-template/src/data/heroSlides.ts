export interface HeroSlide {
    imgSrc: string;
    alt: string;
    buttonText: string;
}

/** Rendered by the hero slider at the top of the page. */
export const fashionSlides: HeroSlide[] = [
    { imgSrc: "/images/slider/fashion/slider-fashion-2-1.png", alt: "slider", buttonText: "Shop Men" },
    { imgSrc: "/images/slider/fashion/slider-fashion-2-2.png", alt: "slider", buttonText: "Shop Women" },
    { imgSrc: "/images/slider/fashion/slider-fashion-2-3.png", alt: "slider", buttonText: "Shop Kid" },
];
