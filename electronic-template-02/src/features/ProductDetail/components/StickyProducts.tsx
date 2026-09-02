import { useEffect, useState } from "react";
import { useShopContext } from "../../../context/Shop/useShopContext";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";
import type { Product } from "../../../types/product";

interface StickyProductsProps {
    product: Product;
}

/** Slide-up add-to-cart bar that appears once you've scrolled past the main product info. */
export default function StickyProducts({ product }: StickyProductsProps) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            document.querySelector(".tf-sticky-btn-atc")?.classList.toggle("show", window.scrollY >= 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { addProductToCart, isAddedToCartProducts, cartProducts, updateQuantity } = useShopContext();
    const isInCart = isAddedToCartProducts(product.id);
    const cartQuantity = cartProducts.find((elm) => elm.id === product.id)?.quantity ?? quantity;

    return (
        <div className="tf-sticky-btn-atc">
            <div className="container">
                <div className="tf-height-observer w-100 d-flex align-items-center">
                    <div className="tf-sticky-atc-product d-flex align-items-center">
                        <div className="tf-sticky-atc-img">
                            <img className="lazyload" alt={product.title} src={product.imgSrc} width={828} height={1241} />
                        </div>
                        <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">{product.title}</div>
                    </div>
                    <div className="tf-sticky-atc-infos">
                        <div className="tf-sticky-atc-variant-price text-center">
                            <span className="fw-medium">${product.price.toFixed(2)}</span>
                        </div>
                        <div className="tf-sticky-atc-btns">
                            <div className="tf-product-info-quantity">
                                <QuantitySelect quantity={cartQuantity} setQuantity={(qty) => (isInCart ? updateQuantity(product.id, qty) : setQuantity(qty))} />
                            </div>
                            <a
                                href="#shoppingCart"
                                data-bs-toggle="offcanvas"
                                onClick={() => addProductToCart(product.id, quantity)}
                                className="tf-btn animate-btn d-inline-flex justify-content-center"
                            >
                                {isInCart ? "Already Added" : "Add to cart"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
