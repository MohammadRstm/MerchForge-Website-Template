import {
    getMainImage,
    getGalleryImages,
    getDiscountPercent,
    getStockStatus,
    isSaleActive,
    getMetadataValue,
    resolveImageUrl,
    type Product as SdkProduct,
} from "@merchforge/storefront-sdk";
import type { Product, ProductCategory, ProductColorOption, StockProgress } from "../types/product";
import { env } from "../config/env";

const FALLBACK_IMAGE = "/images/products/electronic/airpod-pro-black.jpg";
const DEFAULT_WIDTH = 513;
const DEFAULT_HEIGHT = 540;
/** Nominal "fully stocked" ceiling for the progress bar's width -- real stock counts have no fixed max, so this just scales the bar sensibly. */
const STOCK_CEILING = 40;

/**
 * A small reference palette for turning a merchant-picked hex back into a human name
 * for the swatch tooltip -- the backend only stores the hex (see the color-wheel
 * picker in the dashboard), so this is always a best-effort nearest match, not a
 * lookup of an actual stored name.
 */
const NAMED_COLORS: { name: string; hex: string }[] = [
    { name: "Black", hex: "#1A1A1A" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Space Grey", hex: "#8E8E93" },
    { name: "Grey", hex: "#9B9B9B" },
    { name: "Beige", hex: "#E8D9C5" },
    { name: "Red", hex: "#D64545" },
    { name: "Pink", hex: "#E4A6C7" },
    { name: "Violet", hex: "#8A2BE2" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Blue", hex: "#4A90D9" },
    { name: "Green", hex: "#5C9E68" },
    { name: "Orange", hex: "#F0A868" },
    { name: "Yellow", hex: "#F5D547" },
];

function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function hexDistanceSquared(a: string, b: string): number {
    const [ar, ag, ab] = hexToRgb(a);
    const [br, bg, bb] = hexToRgb(b);
    return (ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2;
}

export function nearestColorName(hex: string): string {
    let closest = NAMED_COLORS[0]!;
    let closestDistance = Infinity;

    for (const candidate of NAMED_COLORS) {
        const distance = hexDistanceSquared(hex, candidate.hex);
        if (distance < closestDistance) {
            closest = candidate;
            closestDistance = distance;
        }
    }

    return closest.name;
}

function toCategory(name: string): ProductCategory {
    const lower = name.toLowerCase();
    return lower === "phones" || lower === "laptops" || lower === "accessories" ? (lower as ProductCategory) : "accessories";
}

function toColorOptions(product: SdkProduct): ProductColorOption[] {
    const hexes = getMetadataValue<string[]>(product, "colors") ?? [];
    return hexes.map((hex) => ({ hex, name: nearestColorName(hex) }));
}

function toProgress(product: SdkProduct): StockProgress | undefined {
    const status = getStockStatus(product);
    if (status === "untracked" || product.stockQuantity == null) return undefined;

    const available = product.stockQuantity;
    const widthPct = Math.max(4, Math.min(100, Math.round((available / STOCK_CEILING) * 100)));

    if (status === "out-of-stock") {
        return { width: "0%", color: "bg-red-3", available: 0, textColor: "text-red-2" };
    }
    if (status === "low-stock") {
        return { width: `${widthPct}%`, color: "bg-orange-3", available, textColor: "text-red-2" };
    }
    return { width: `${widthPct}%`, color: "bg-green-2", available, textColor: "text-success-5" };
}

/** Maps one SDK product to the template's own view shape. */
export function toTemplateProduct(product: SdkProduct): Product {
    const main = getMainImage(product);
    const gallery = getGalleryImages(product);
    const hover = gallery.find((image) => image.url !== main?.url) ?? main;

    const discount = getDiscountPercent(product);
    const stockStatus = getStockStatus(product);

    const galleryUrls = gallery.map((image) => resolveImageUrl(image.url, env.origin)).filter((url): url is string => url != null);

    const saleLabel: string[] = [];
    if (discount != null) saleLabel.push(`${discount}% Off`);
    if (product.tags.includes("Trending")) saleLabel.push("Trending");
    for (const tag of product.tags) {
        if (tag !== "Trending") saleLabel.push(tag);
    }

    return {
        id: product.id,
        imgSrc: resolveImageUrl(main?.url, env.origin) ?? FALLBACK_IMAGE,
        imgHover: resolveImageUrl(hover?.url, env.origin) ?? resolveImageUrl(main?.url, env.origin) ?? FALLBACK_IMAGE,
        gallery: galleryUrls.length > 0 ? galleryUrls : [FALLBACK_IMAGE],
        width: main?.width ?? DEFAULT_WIDTH,
        height: main?.height ?? DEFAULT_HEIGHT,
        title: product.title,
        price: product.price,
        oldPrice: product.compareAtPrice,
        inStock: stockStatus !== "out-of-stock",
        category: toCategory(product.category.name),
        createdAt: product.createdAt,
        colors: toColorOptions(product),
        saleLabel,
        countdownTimer:
            isSaleActive(product) && product.saleEndsAt ? new Date(product.saleEndsAt).getTime() - Date.now() : undefined,
        progress: toProgress(product),
    };
}

export function toTemplateProducts(products: SdkProduct[]): Product[] {
    return products.map(toTemplateProduct);
}
