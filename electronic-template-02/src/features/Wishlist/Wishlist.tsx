import { Link } from "react-router-dom";
import { useShopContext } from "../../context/Shop/useShopContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProductCard12 from "../../components/ProductCard12/ProductCard12";
import { useCatalog } from "../../hooks/useCatalog";

export default function Wishlist() {
    const { wishList } = useShopContext();
    const { allProducts } = useCatalog();
    const items = allProducts.filter((product) => wishList.includes(product.id));

    return (
        <>
            <PageTitle pageName="Wishlist" pageTitle="My Wishlist" />
            <section className="s-account flat-spacing-4 pt_0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {items.length ? (
                                <div className="wrapper-shop tf-grid-layout tf-col-2 lg-col-3 xl-col-4 style-1">
                                    {items.map((product) => (
                                        <ProductCard12 key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div>Your wishlist is empty. Start adding favorite products to wishlist!</div>
                                    <Link className="tf-btn btn-dark2 animate-btn mt-3" to="/">
                                        Explore Products
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
