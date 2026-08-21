/** A colour swatch on a product card: swaps the card image on hover. */
export interface ProductColorOption {
    label: string;
    value: string;
    img: string;
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
 * Placeholder catalog shape, carried over from the template's dummy data.
 *
 * This is deliberately what the SDK's real `Product` type will replace once the
 * catalog is wired to @merchforge/storefront-sdk — kept narrow (only the fields the
 * home page's cards/sliders actually render).
 */
export interface Product {
    id: number;
    imgSrc: string;
    imgHover: string;
    width: number;
    height: number;
    title: string;
    price: number;
    oldPrice: number | null;
    inStock: boolean;
    category: ProductCategory;
    /** ISO date the product was added to the catalog — drives the "New Arrivals" section. */
    createdAt: string;
    colors?: ProductColorOption[];
    /** Stacked badges, e.g. ["20% Off", "Trending"]. Never null; empty when none. */
    saleLabel: string[];
    /** Countdown deadline in epoch ms; presence alone triggers the countdown badge. */
    countdownTimer?: number;
    /** Remaining-stock bar shown on the "Hot Deals" card. */
    progress?: StockProgress;
}
