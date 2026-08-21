import { useState } from "react";
import { useShopContext } from "../../../context/Shop/useShopContext";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";
import ProductGallery from "./ProductGallery";
import ProductHeading from "./ProductHeading";
import ColorSelect from "./ColorSelect";
import BoughtTogether from "./BoughtTogether";
import type { Product } from "../../../types/product";

interface ProductDetailsProps {
    product: Product;
}

/** The two-column media + info layout: gallery/zoom on the left, variant pickers and cart actions on the right. */
export default function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeColor, setActiveColor] = useState(product.colors?.[0]?.hex ?? "");
    const { addProductToCart, isAddedToCartProducts, addToWishlist, isAddedtoWishlist, addToCompareItem, isAddedtoCompareItem, cartProducts, updateQuantity } =
        useShopContext();

    const isInCart = isAddedToCartProducts(product.id);
    const cartQuantity = cartProducts.find((elm) => elm.id === product.id)?.quantity ?? quantity;

    return (
        <section className="flat-single-product">
            <div className="tf-main-product section-image-zoom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tf-product-media-wrap sticky-top">
                                <div className="product-thumbs-slider">
                                    <ProductGallery product={product} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tf-zoom-main" />
                            <div className="tf-product-info-wrap position-relative">
                                <div className="tf-product-info-list other-image-zoom">
                                    <ProductHeading product={product} />
                                    <div className="tf-product-variant">
                                        <ColorSelect product={product} activeColor={activeColor} setActiveColor={setActiveColor} />
                                    </div>
                                    {product.inStock && (
                                        <div className="tf-product-total-quantity">
                                            <div className="group-btn">
                                                <QuantitySelect
                                                    quantity={cartQuantity}
                                                    setQuantity={(qty) => (isInCart ? updateQuantity(product.id, qty) : setQuantity(qty))}
                                                />
                                                <a
                                                    href="#shoppingCart"
                                                    data-bs-toggle="offcanvas"
                                                    onClick={() => addProductToCart(product.id, quantity)}
                                                    className="tf-btn hover-primary btn-add-to-cart"
                                                >
                                                    {isInCart ? "Already Added" : "Add to cart"}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="tf-product-extra-link">
                                        <a
                                            onClick={() => addToWishlist(product.id)}
                                            className={`product-extra-icon link btn-add-wishlist ${isAddedtoWishlist(product.id) ? "added-wishlist" : ""}`}
                                        >
                                            <i className="icon add icon-heart" />
                                            <span className="add">Add to wishlist</span>
                                            <i className="icon added icon-trash" />
                                            <span className="added">Remove from wishlist</span>
                                        </a>
                                        <a
                                            href="#compare"
                                            data-bs-toggle="modal"
                                            onClick={() => addToCompareItem(product.id)}
                                            className="product-extra-icon link"
                                        >
                                            <i className="icon icon-compare2" />
                                            {isAddedtoCompareItem(product.id) ? "Already compared" : "Add to Compare"}
                                        </a>
                                    </div>
                                    <div className="tf-product-trust-seal text-center">
                                        <p className="text-md text-dark-2 text-seal fw-medium">Guarantee Safe Checkout:</p>
                                        <ul className="list-card">
                                            {["Visa", "DinersClub", "Mastercard", "Stripe", "PayPal", "GooglePay", "ApplePay"].map((brand) => (
                                                <li className="card-item" key={brand}>
                                                    <img alt={brand} src={`/images/payment/${brand}.png`} width={90} height={64} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="tf-product-delivery-return">
                                        <div className="product-delivery">
                                            <div className="icon icon-car2" />
                                            <p className="text-md">
                                                Estimated delivery time:<span className="fw-medium">3-5 days international</span>
                                            </p>
                                        </div>
                                        <div className="product-delivery">
                                            <div className="icon icon-shipping3" />
                                            <p className="text-md">
                                                Free shipping on<span className="fw-medium">all orders over $150</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tf-product-fbt">
                                    <div className="title text-xl fw-medium">Frequently Bought Together</div>
                                    <BoughtTogether />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
