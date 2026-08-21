import { useParams } from "react-router-dom";
import { allProducts } from "../../data/products";
import Breadcrumb from "./components/Breadcrumb";
import ProductDetails from "./components/ProductDetails";
import StickyProducts from "./components/StickyProducts";
import DescriptionTabs from "./components/DescriptionTabs";
import RecommendedProducts from "./components/RecommendedProducts";
import RecentlyViewedProducts from "./components/RecentlyViewedProducts";

/** Falls back to the first catalog product rather than a not-found state, matching the source template's own behavior. */
export default function ProductDetail() {
    const { id } = useParams();
    const product = allProducts.find((elm) => elm.id === Number(id)) ?? allProducts[0];

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
