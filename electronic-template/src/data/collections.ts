export interface CategoryTile {
    imgSrc: string;
    alt: string;
    title: string;
}

/** Rendered by the home page's "Categories" strip — decorative, links to the shop page. */
export const categoryTiles: CategoryTile[] = [
    { imgSrc: "/images/cls-categories/electronic/smartphone.png", alt: "Phones", title: "Phones" },
    { imgSrc: "/images/cls-categories/electronic/earphone.png", alt: "Earphones", title: "Earphones" },
    { imgSrc: "/images/cls-categories/electronic/keyboard.png", alt: "Keyboards", title: "Keyboards" },
    { imgSrc: "/images/cls-categories/electronic/smart-watch.png", alt: "Smart Watches", title: "Smart Watches" },
    { imgSrc: "/images/cls-categories/electronic/charge.png", alt: "Chargers", title: "Chargers" },
    { imgSrc: "/images/cls-categories/electronic/screen-protector.png", alt: "Screen Protectors", title: "Screen Protectors" },
    { imgSrc: "/images/cls-categories/electronic/headphone.png", alt: "Headphones", title: "Headphones" },
    { imgSrc: "/images/cls-categories/electronic/cable.png", alt: "Cables", title: "Cables" },
];
