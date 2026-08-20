export interface DemoItem {
    href: string;
    imageSrc: string;
    alt: string;
    width: number;
    height: number;
    name: string;
    labels: string[];
}

export interface MenuLink {
    href?: string;
    href2?: string;
    text: string;
    label?: string;
}

export interface MenuGroup {
    heading: string;
    links: MenuLink[];
}

/**
 * The header's "Home" mega-menu tab, straight from the Vineta template pack it was
 * copied from — each entry links to one of the pack's other demo storefronts
 * (electronics, furniture, jewelry, ...). None of those pages exist in this project
 * and none of this content applies to any real business, unlike the placeholders
 * below. Kept for a faithful first copy; delete or replace this tab in Nav.tsx once
 * this store's actual sections are decided.
 */
export const demoItems: DemoItem[] = [
    { href: "/", imageSrc: "/images/demo/fashion-1.jpg", alt: "home-fashion", width: 308, height: 388, name: "Fashion Style 1", labels: ["New"] },
    { href: "/home-fashion-02", imageSrc: "/images/demo/fashion-2.jpg", alt: "home-fashion", width: 308, height: 387, name: "Fashion Style 2", labels: ["New", "Hot"] },
    { href: "/home-electronic", imageSrc: "/images/demo/electronic.jpg", alt: "home-electronic", width: 308, height: 387, name: "Electronic", labels: ["New"] },
    { href: "/home-furniture", imageSrc: "/images/demo/furniture.jpg", alt: "home-furniture", width: 308, height: 387, name: "Furniture", labels: ["New"] },
    { href: "/home-fashion-women", imageSrc: "/images/demo/women-fashion.jpg", alt: "home-women-fashion", width: 308, height: 387, name: "Women Fashion", labels: ["New"] },
    { href: "/home-skincare", imageSrc: "/images/demo/comestic.jpg", alt: "home-Skincare", width: 308, height: 388, name: "Skincare", labels: ["New"] },
    { href: "/home-bicycle", imageSrc: "/images/demo/bicycle.jpg", alt: "home-bicycle", width: 308, height: 387, name: "Bicycle", labels: ["New"] },
    { href: "/home-phonecase", imageSrc: "/images/demo/phonecase.jpg", alt: "home-phonecase", width: 308, height: 387, name: "Phone Case", labels: ["New"] },
    { href: "/home-pet-accessories", imageSrc: "/images/demo/pet-accessories.jpg", alt: "home-pet", width: 308, height: 387, name: "Pet Accessories", labels: ["New"] },
    { href: "/home-sportwear", imageSrc: "/images/demo/sportwear.jpg", alt: "home-bicycle", width: 308, height: 387, name: "Sportwear", labels: ["New"] },
];

/** The header's "Shop" mega-menu tab — placeholder future pages (a shop listing hasn't been built yet). */
export const shopPages: MenuGroup[] = [
    {
        heading: "SHOP LAYOUT",
        links: [
            { href: "/shop-default", text: "Default" },
            { href: "/shop-left-sidebar", text: "Filter Left Sidebar" },
            { href: "/shop-right-sidebar", text: "Filter Right Sidebar" },
            { href: "/shop-horizontal-filter", text: "Horizontal Filter" },
            { href: "/shop-collection-list", text: "Collection List" },
        ],
    },
    {
        heading: "SHOP LISTS",
        links: [
            { href: "/shop-load-more-button", text: "Load More Button" },
            { href: "/shop-filter-sidebar", text: "Filter Sidebar" },
        ],
    },
];

/** The header's "Products" mega-menu tab — placeholder future pages (product detail hasn't been built yet). */
export const productMenuItems: MenuGroup[] = [
    {
        heading: "PRODUCT LAYOUTS",
        links: [
            { href: "/product-detail/1", text: "Product Single" },
            { href: "/product-grid/1", text: "Product Grid" },
        ],
    },
    {
        heading: "PRODUCT DETAILS",
        links: [
            { href: "/product-inner-zoom/1", text: "Product Inner Zoom" },
            { href: "/product-video/1", text: "Product Video" },
        ],
    },
];

/** The header's "Pages" mega-menu tab — placeholder future pages. */
export const otherPages: MenuLink[] = [
    { href: "/about-us", text: "About" },
    { href: "/contact-us", text: "Contact" },
    { href: "/store-location", text: "Store location" },
    { href: "/account-page", text: "My Account" },
    { href: "/faq", text: "FAQ" },
    { href: "/view-cart", text: "View cart" },
];

/** The header's "Blog" mega-menu tab — placeholder future pages. */
export const blogMenuItems: MenuLink[] = [
    { href: "/blog-list-01", text: "Blog List" },
    { href: "/blog-grid-01", text: "Blog Grid" },
];
