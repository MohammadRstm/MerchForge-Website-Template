/** A colour swatch on a product card: swaps the card image on hover. */
export interface ProductColorOption {
    label: string;
    value: string;
    img: string;
}

/**
 * Placeholder catalog shape, carried over from the template's dummy data.
 *
 * This is deliberately what the SDK's real `Product` type will replace once the
 * catalog is wired to @merchforge/storefront-sdk — kept narrow (only the fields the
 * home page's cards/sliders actually render) rather than porting the filter-page
 * fields (filterSizes/filterBrands/filterColor) that nothing here uses.
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
    sizes?: string[];
    colors?: ProductColorOption[];
    saleLabel?: string | null;
    isTrending?: boolean;
    isOutofSale?: boolean;
    /** Countdown deadline in epoch ms; presence alone triggers the countdown badge. */
    countdownTimer?: number;
    /** Extra class modifier some cards use (e.g. "style-2"). */
    style?: string;
}
