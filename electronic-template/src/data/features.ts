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

/** Rendered by the About Us page's "What We Care About" icon-card grid. */
export const valuesFeatures: IconTextFeature[] = [
    {
        icon: "icon-precision",
        title: "Authenticity First",
        description: "Every product is sourced from an authorized distributor or the manufacturer directly — never a grey-market reseller cutting corners.",
    },
    {
        icon: "icon-elegance",
        title: "No Upsell Pressure",
        description: "Straightforward specs and honest comparisons. We'd rather you buy the right device once than the wrong one twice.",
    },
    {
        icon: "icon-shipping",
        title: "Fast, Tracked Shipping",
        description: "Most orders leave the warehouse within 24 hours, with tracking that actually updates — not a placeholder link.",
    },
];
