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

/** Rendered by the About Us page's "What We Care About" icon-card carousel. */
export const styleFeatures: IconTextFeature[] = [
    {
        icon: "icon-precision",
        title: "Freshness Checked",
        description: "Every delivery gets checked for quality before it earns a spot on the shelf — freshness and ripeness aren't an afterthought.",
    },
    {
        icon: "icon-elegance",
        title: "Honest Sourcing",
        description: "We tell you where it's from and how it's grown. No vague labels, no guessing what's actually in your cart.",
    },
    {
        icon: "icon-fashion-body",
        title: "Something for Every Diet",
        description: "Vegan, vegetarian, gluten-free, dairy-free — real dietary tags on every product, not just a small corner of the store.",
    },
];
