export interface HeroSlide {
    imgSrc: string;
    /** Text column width/offset — differs per slide in the source layout. */
    colClass: string;
    /** "text-dark-3" or "text-white" depending on the slide's background image. */
    textClass: string;
    /** Button style differs per slide: solid dark on light backgrounds, white outline on the dark one. */
    btnClass: string;
    subTitle: string;
    /** May contain a <br /> for a two-line heading. */
    heading: string;
}

/** Rendered by the hero slider at the top of the page — ported from Vineta's "home-phonecase" slides. */
export const heroSlides: HeroSlide[] = [
    {
        imgSrc: "/images/slider/phonecase/slider-phonecase-1.jpg",
        colClass: "col-lg-12 col-sm-6 col-12",
        textClass: "text-dark-3",
        btnClass: "tf-btn fw-normal animate-btn",
        subTitle: "Find the perfect case for your phone",
        heading: "Protect in Style",
    },
    {
        imgSrc: "/images/slider/phonecase/slider-phonecase-2.jpg",
        colClass: "col-lg-5 col-sm-6 col-12",
        textClass: "text-white",
        btnClass: "tf-btn btn-white fw-normal hover-primary",
        subTitle: "Personalized cases designed to match your unique personality.",
        heading: "Express Your Style",
    },
    {
        imgSrc: "/images/slider/phonecase/slider-phonecase-3.jpg",
        colClass: "col-lg-6 col-sm-7 col-12",
        textClass: "text-dark-3",
        btnClass: "tf-btn fw-normal animate-btn",
        subTitle: "Durable phone cases that blend protection with elegance.",
        heading: "Ultimate Protection, <br /> Sleek Design",
    },
];
