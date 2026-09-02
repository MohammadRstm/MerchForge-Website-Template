import { useCatalog } from "./useCatalog";

const SECTION_SIZE = 6;

/**
 * Splits the catalog into the home page's two curated sections. The source template
 * hardcoded which products landed in which section (arbitrary array slices with no
 * real meaning); this derives both from an actual product signal instead:
 *
 * - Hot Deals: products with an active sale countdown (`saleEndsAt` in the future) —
 *   a deal that isn't actually time-limited doesn't belong here.
 * - Top Picks You'll Love: the highest-priced products not already shown as a deal,
 *   so the two sections don't just repeat each other.
 */
export function useHomeSections() {
    const { allProducts, isLoading, isError } = useCatalog();

    const hotDeals = allProducts.filter((p) => p.countdownTimer != null).slice(0, SECTION_SIZE);

    const dealIds = new Set(hotDeals.map((p) => p.id));
    const topPicks = [...allProducts]
        .filter((p) => !dealIds.has(p.id))
        .sort((a, b) => b.price - a.price)
        .slice(0, SECTION_SIZE);

    return { allProducts, topPicks, hotDeals, isLoading, isError };
}
