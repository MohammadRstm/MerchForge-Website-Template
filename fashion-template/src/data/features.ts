export interface IconFeature {
    iconClass: string;
    title: string;
    description: string;
}

/** Rendered by the cart page's shipping/returns/support icon row. */
export const iconFeatures: IconFeature[] = [
    { iconClass: "icon-shipping", title: "Free Shipping", description: "Enjoy free shipping on all orders" },
    { iconClass: "icon-gift", title: "Gift Package", description: "Perfectly packaged for gifting" },
    { iconClass: "icon-return", title: "Free Returns", description: "Within 14 days for a return" },
    { iconClass: "icon-support", title: "Support Online", description: "We support customers 24/7" },
];

export interface IconTextFeature {
    icon: string;
    title: string;
    description: string;
}

/** Rendered by the About Us page's "Style Curated Just for You" icon-card carousel. */
export const styleFeatures: IconTextFeature[] = [
    {
        icon: "icon-precision",
        title: "Built to Last",
        description: "Every piece goes through the same fit and fabric checks before it earns a spot in the catalog — comfort and durability aren't an afterthought.",
    },
    {
        icon: "icon-elegance",
        title: "Simple, On Purpose",
        description: "Clean silhouettes and a restrained palette. Pieces you can mix into whatever you're already wearing, not one-and-done statement buys.",
    },
    {
        icon: "icon-fashion-body",
        title: "Made for Every Body",
        description: "A real size range on every product, not just the popular middle sizes. Fit shouldn't be the reason something's out of reach.",
    },
];
