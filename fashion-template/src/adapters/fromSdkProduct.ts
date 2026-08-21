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
import type { Product, ProductCategory, ProductColorOption } from "../types/product";
import { env } from "../config/env";

const FALLBACK_IMAGE = "/images/products/fashion/product-1.jpg";
const DEFAULT_WIDTH = 684;
const DEFAULT_HEIGHT = 972;

/**
 * A small reference palette for turning a merchant-picked hex back into a human name
 * for the swatch tooltip -- the backend only stores the hex (see the color-wheel
 * picker in the dashboard), so this is always a best-effort nearest match, not a
 * lookup of an actual stored name.
 */
const NAMED_COLORS: { name: string; hex: string }[] = [
    { name: "Black", hex: "#1A1A1A" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Grey", hex: "#9B9B9B" },
    { name: "Beige", hex: "#E8D9C5" },
    { name: "Yellow", hex: "#F5D547" },
    { name: "Orange", hex: "#F0A868" },
    { name: "Purple", hex: "#9B59B6" },
    { name: "Light Purple", hex: "#C9A9DD" },
    { name: "Blue", hex: "#4A90D9" },
    { name: "Light Blue", hex: "#A8D0E6" },
    { name: "Green", hex: "#5C9E68" },
    { name: "Red", hex: "#D64545" },
    { name: "Pink", hex: "#E4A6C7" },
    { name: "Brown", hex: "#8B5E3C" },
    { name: "Navy", hex: "#2C3E60" },
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
    return lower === "men" || lower === "women" || lower === "kids" ? (lower as ProductCategory) : "men";
}

function toColorOptions(product: SdkProduct): ProductColorOption[] {
    const hexes = getMetadataValue<string[]>(product, "colors") ?? [];
    return hexes.map((hex) => ({ hex, name: nearestColorName(hex) }));
}

/**
 * Maps one SDK product to the template's own view shape. Colour swatches lose the
 * per-colour photo the source template's mock data had (this business's colours are
 * plain hex values with no linked image) -- ProductGallery now cycles the product's
 * real image gallery instead, independently of which swatch is selected.
 */
export function toTemplateProduct(product: SdkProduct): Product {
    const main = getMainImage(product);
    const gallery = getGalleryImages(product);
    const hover = gallery.find((image) => image.url !== main?.url) ?? main;

    const discount = getDiscountPercent(product);
    const stockStatus = getStockStatus(product);

    const galleryUrls = gallery.map((image) => resolveImageUrl(image.url, env.origin)).filter((url): url is string => url != null);

    return {
        id: product.id,
        imgSrc: resolveImageUrl(main?.url, env.origin) ?? FALLBACK_IMAGE,
        imgHover:
            resolveImageUrl(hover?.url, env.origin) ?? resolveImageUrl(main?.url, env.origin) ?? FALLBACK_IMAGE,
        gallery: galleryUrls.length > 0 ? galleryUrls : [FALLBACK_IMAGE],
        width: main?.width ?? DEFAULT_WIDTH,
        height: main?.height ?? DEFAULT_HEIGHT,
        title: product.title,
        price: product.price,
        oldPrice: product.compareAtPrice,
        inStock: stockStatus !== "out-of-stock",
        category: toCategory(product.category.name),
        createdAt: product.createdAt,
        sizes: getMetadataValue<string[]>(product, "sizes") ?? [],
        colors: toColorOptions(product),
        saleLabel: discount != null ? `${discount}% Off` : null,
        saleTags: product.tags.filter((tag) => tag !== "Trending"),
        isTrending: product.tags.includes("Trending"),
        isOutofSale: stockStatus === "out-of-stock",
        countdownTimer:
            isSaleActive(product) && product.saleEndsAt
                ? new Date(product.saleEndsAt).getTime() - Date.now()
                : undefined,
    };
}

export function toTemplateProducts(products: SdkProduct[]): Product[] {
    return products.map(toTemplateProduct);
}
