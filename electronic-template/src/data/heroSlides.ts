export interface HeroSlide {
    imgSrc: string;
    imgWidth: number;
    imgHeight: number;
    /** Layout modifier from the source template's slide backgrounds (bg-type-4/5/6). */
    bgType: string;
    /** Mirrors the slide's text column to the right instead of the left. */
    reverse: boolean;
    subTitle: string;
    /** May contain a <br /> for a two-line heading. */
    heading: string;
}

/** Rendered by the hero slider at the top of the page. */
export const heroSlides: HeroSlide[] = [
    {
        imgSrc: "/images/slider/electronic/slider-electronic-1.png",
        imgWidth: 627,
        imgHeight: 627,
        bgType: "bg-type-4 type-image-right",
        reverse: false,
        subTitle: "APPLE WATCHES COLLECTION",
        heading: "Sale up to <br /> 15% Off",
    },
    {
        imgSrc: "/images/slider/electronic/slider-electronic-2.png",
        imgWidth: 1920,
        imgHeight: 731,
        bgType: "bg-type-5",
        reverse: true,
        subTitle: "APPLE MAGSAFE CHARGER",
        heading: "Next-Level <br /> Tech",
    },
    {
        imgSrc: "/images/slider/electronic/slider-electronic-3.png",
        imgWidth: 1920,
        imgHeight: 731,
        bgType: "bg-type-6 type-image-right",
        reverse: false,
        subTitle: "ON-EAR HEADPHONES",
        heading: "Power Up <br /> Your Life",
    },
];
