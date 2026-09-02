import { useShopContext } from "../../context/Shop/useShopContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import ShopCart from "./components/ShopCart";
import RelatedProducts from "./components/RelatedProducts";

const FREE_SHIPPING_THRESHOLD = 100;

export default function Cart() {
    const { totalPrice } = useShopContext();
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
    const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

    return (
        <>
            <PageTitle pageName="Cart" pageTitle="Shopping Cart" />
            <div className="flat-spacing-24">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-sm-8">
                            <div className="tf-cart-head text-center">
                                <p className="text-xl-3 title text-dark-4">
                                    {remaining > 0 ? (
                                        <>
                                            Spend <span className="fw-medium">${remaining.toFixed(2)}</span> more to get{" "}
                                            <span className="fw-medium">Free Shipping</span>
                                        </>
                                    ) : (
                                        <span className="fw-medium">You've unlocked Free Shipping!</span>
                                    )}
                                </p>
                                <div className="progress-sold tf-progress-ship">
                                    <div className="value" style={{ width: `${progress}%` }} data-progress={progress}>
                                        <i className="icon icon-car" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShopCart />
            <RelatedProducts />
        </>
    );
}
