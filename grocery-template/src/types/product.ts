/** A colour swatch on a product card/detail page. Rendered as a plain dot, not a photo swap -- see adapters/fromSdkProduct.ts. */
export interface ProductColorOption {
    hex: string;
    /** Best-effort human name for the tooltip (e.g. "Beige"), nearest-matched from `hex` -- the backend only stores the hex. */
    name: string;
}

/**
 * Which shop-page section a product belongs to. Green Basket Market only stocks
 * Vegetables and Fruits today -- the Grocery domain also seeds Dairy/Bakery/Beverages
 * categories for future businesses, but this storefront has no products in them yet.
 */
export type ProductCategory = "vegetables" | "fruits";

/**
 * Catalog shape the UI renders. Populated from @merchforge/storefront-sdk's own
 * `Product`/`ProductDetail` via adapters/fromSdkProduct.ts rather than matching the
 * SDK's shape 1:1 -- the SDK is deliberately generic (schemaless metadata, no
 * `imgSrc`/`colors`/`sizes`), so every template maps it to whatever fields its own
 * components were built around.
 */
export interface Product {
    id: string;
    imgSrc: string;
    imgHover: string;
    /** The full image gallery, in display order (always includes at least imgSrc). */
    gallery: string[];
    width: number;
    height: number;
    title: string;
    price: number;
    oldPrice: number | null;
    inStock: boolean;
    category: ProductCategory;
    /** ISO date the product was added to the catalog — drives the "New Arrivals" section. */
    createdAt: string;
    /** Mean of this product's visible reviews. Null when it has none — never 0, so
     *  "not rated yet" stays distinguishable from a genuinely low score. */
    averageRating: number | null;
    /** How many visible reviews the average is drawn from. */
    reviewCount: number;
    sizes?: string[];
    colors?: ProductColorOption[];
    saleLabel?: string | null;
    /** Stacked badges (e.g. "New", "Best Seller") shown by the style-2 card. */
    saleTags?: string[];
    isTrending?: boolean;
    isOutofSale?: boolean;
    /** Countdown deadline in epoch ms; presence alone triggers the countdown badge. */
    countdownTimer?: number;
    /** Extra class modifier some cards use (e.g. "style-2"). */
    style?: string;
}
