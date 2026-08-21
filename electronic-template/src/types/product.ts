/** A colour swatch on a product card/detail page. Rendered as a plain dot, not a photo swap -- see adapters/fromSdkProduct.ts. */
export interface ProductColorOption {
    hex: string;
    /** Best-effort human name for the tooltip (e.g. "Beige"), nearest-matched from `hex` -- the backend only stores the hex. */
    name: string;
}

/** Which shop-page section a product belongs to. */
export type ProductCategory = "phones" | "laptops" | "accessories";

/** How many units are left, shown as a progress bar on the "Hot Deals" card. */
export interface StockProgress {
    /** CSS width, e.g. "70%" -- how full the bar renders. */
    width: string;
    color: string;
    available: number;
    textColor: string;
}

/**
 * Catalog shape the UI renders. Populated from @merchforge/storefront-sdk's own
 * `Product`/`ProductDetail` via adapters/fromSdkProduct.ts rather than matching the
 * SDK's shape 1:1 -- the SDK is deliberately generic (schemaless metadata, no
 * `imgSrc`/`colors`), so every template maps it to whatever fields its own
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
    /** ISO date the product was added to the catalog. */
    createdAt: string;
    colors?: ProductColorOption[];
    /** Stacked badges, e.g. ["20% Off", "Trending"]. Never null; empty when none. */
    saleLabel: string[];
    /** Countdown deadline in epoch ms; presence alone triggers the countdown badge. */
    countdownTimer?: number;
    /** Remaining-stock bar shown on the "Hot Deals" card, derived from real stockQuantity. */
    progress?: StockProgress;
}
