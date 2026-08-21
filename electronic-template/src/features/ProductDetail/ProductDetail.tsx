import { useParams } from "react-router-dom";
import { useProduct } from "@merchforge/storefront-sdk";
import { toTemplateProduct } from "../../adapters/fromSdkProduct";
import { useCatalog } from "../../hooks/useCatalog";
import Breadcrumb from "./components/Breadcrumb";
import ProductDetails from "./components/ProductDetails";
import StickyProducts from "./components/StickyProducts";
import DescriptionTabs from "./components/DescriptionTabs";
import RecommendedProducts from "./components/RecommendedProducts";
import RecentlyViewedProducts from "./components/RecentlyViewedProducts";

/**
 * Fetches this one product by id rather than searching a static array. Falls back to
 * the first catalog product on a bad/unknown id instead of a not-found state,
 * matching the source template's own behavior of never showing an empty page.
 */
export default function ProductDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useProduct(id ?? "");
    const { allProducts, isLoading: catalogLoading } = useCatalog();

    if (isLoading || (isError && catalogLoading)) {
        return (
            <div className="container flat-spacing-24 text-center">
                <p>Loading product...</p>
            </div>
        );
    }

    const product = data ? toTemplateProduct(data) : allProducts[0];

    if (!product) {
        return (
            <div className="container flat-spacing-24 text-center">
                <p>This product isn't available right now.</p>
            </div>
        );
    }

    return (
        <>
            <Breadcrumb product={product} />
            <ProductDetails product={product} />
            <DescriptionTabs />
            <RecommendedProducts />
            <RecentlyViewedProducts />
            <StickyProducts product={product} />
        </>
    );
}
