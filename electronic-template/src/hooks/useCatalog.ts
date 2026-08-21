import { useProducts } from "@merchforge/storefront-sdk";
import { toTemplateProducts } from "../adapters/fromSdkProduct";

/**
 * The full catalog, adapted to the template's own Product shape. Every page that
 * used to import `allProducts`/`products1`/`products2`/`products3` from
 * data/products.ts calls this instead — pageSize is set high enough to cover the
 * whole catalog in one request since nothing here paginates yet.
 *
 * Multiple components calling this independently is intentional and cheap: React
 * Query dedupes by query key, so every caller shares the same one request/cache
 * entry rather than each firing its own.
 */
export function useCatalog() {
    const query = useProducts({ pageSize: 100, sortBy: "CreatedAt", sortDescending: true });

    return {
        allProducts: query.data ? toTemplateProducts(query.data.items) : [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
