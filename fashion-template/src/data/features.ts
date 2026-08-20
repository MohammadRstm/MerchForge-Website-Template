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
