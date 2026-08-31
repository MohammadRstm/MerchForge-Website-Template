import { Link, useParams } from "react-router-dom";
import { useProduct } from "@merchforge/storefront-sdk";
import { toTemplateProduct } from "../../adapters/fromSdkProduct";
import Breadcrumb from "./components/Breadcrumb";
import ProductDetails from "./components/ProductDetails";
import StickyProducts from "./components/StickyProducts";
import DescriptionTabs from "./components/DescriptionTabs";
import RecommendedProducts from "./components/RecommendedProducts";
import RecentlyViewedProducts from "./components/RecentlyViewedProducts";

/**
 * Fetches this one product by id rather than searching a static array. A bad,
 * stale, or deleted-product id shows a real not-found state rather than silently
 * substituting a different, arbitrary product from the catalog — a shopper
 * following a dead link deserves to know the product is actually gone, not land
 * on a wrong one with no indication anything was off.
 */
export default function ProductDetail() {
    const { id } = useParams();
    const { data, isLoading, isError } = useProduct(id ?? "");

    if (isLoading) {
        return (
            <div className="container flat-spacing-24 text-center">
                <p>Loading product...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="container flat-spacing-24 text-center">
                <h4 className="mb-3">We couldn't find that product.</h4>
                <p className="mb-3">
                    It may have been removed or the link may be out of date.
                </p>
                <Link className="tf-btn btn-dark2 animate-btn" to="/shop-default">
                    Continue shopping
                </Link>
            </div>
        );
    }

    const product = toTemplateProduct(data);

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
