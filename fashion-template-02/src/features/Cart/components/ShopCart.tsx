import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useShopContext } from "../../../context/Shop/useShopContext";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";
import { iconFeatures } from "../../../data/features";
import { testimonials12 } from "../../../data/testimonials";

/**
 * Gift wrap, discount code and shipping-estimate are decorative in the source
 * template too (no backend to apply them to) — preserved as static controls rather
 * than fabricating fake discount/shipping logic. Checkout now leads to a real
 * Checkout page (see src/features/Checkout); the terms-and-conditions link still
 * has no page behind it.
 */
export default function ShopCart() {
    const { cartProducts, totalPrice, updateQuantity, removeFromCart } = useShopContext();

    return (
        <div className="flat-spacing-2 pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="tf-page-cart-main">
                            <form className="form-cart" onSubmit={(e) => e.preventDefault()}>
                                {cartProducts.length ? (
                                    <table className="table-page-cart">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts.map((product) => (
                                                <tr key={product.id} className="tf-cart-item file-delete">
                                                    <td className="tf-cart-item_product">
                                                        <Link to={`/product-detail/${product.id}`} className="img-box">
                                                            <img alt={product.title} src={product.imgSrc} width={684} height={972} />
                                                        </Link>
                                                        <div className="cart-info">
                                                            <Link to={`/product-detail/${product.id}`} className="name text-md link fw-medium">
                                                                {product.title}
                                                            </Link>
                                                            <span className="remove-cart link remove" onClick={() => removeFromCart(product.id)}>
                                                                Remove
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="tf-cart-item_price text-center">
                                                        <span className="cart-price price-on-sale text-md fw-medium">${product.price.toFixed(2)}</span>
                                                    </td>
                                                    <td className="tf-cart-item_quantity" data-cart-title="Quantity">
                                                        <QuantitySelect quantity={product.quantity} setQuantity={(qty) => updateQuantity(product.id, qty)} />
                                                    </td>
                                                    <td className="tf-cart-item_total text-center" data-cart-title="Total">
                                                        <div className="cart-total total-price text-md fw-medium">
                                                            ${(product.price * product.quantity).toFixed(2)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-4">
                                        Your Cart is empty. Start adding favorite products to cart!{" "}
                                        <Link className="tf-btn btn-dark2 animate-btn mt-3" to="/">
                                            Explore Products
                                        </Link>
                                    </div>
                                )}
                                <div className="check-gift">
                                    <input type="checkbox" className="tf-check" id="checkGift" />
                                    <label htmlFor="checkGift" className="label text-dark-4">
                                        Add gift wrap. Only<span className="fw-medium">$10.00.</span> (You can choose or not)
                                    </label>
                                </div>
                                <div className="box-ip-discount">
                                    <input type="text" placeholder="Discount code" />
                                    <button type="button" className="tf-btn radius-6 btn-out-line-dark-2">
                                        Apply
                                    </button>
                                </div>
                                <div className="cart-note">
                                    <label htmlFor="note" className="text-md fw-medium">
                                        Special instructions for seller
                                    </label>
                                    <textarea id="note" defaultValue="" />
                                </div>
                            </form>
                            <div className="fl-iconbox wow fadeInUp">
                                <Swiper
                                    dir="ltr"
                                    className="swiper tf-swiper sw-auto"
                                    slidesPerView={1}
                                    spaceBetween={12}
                                    speed={800}
                                    observer
                                    observeParents
                                    slidesPerGroup={1}
                                    pagination={{ el: ".sw-pagination-iconbox", clickable: true }}
                                    breakpoints={{
                                        575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                                        768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
                                        1200: { slidesPerView: "auto", spaceBetween: 24 },
                                    }}
                                    modules={[Pagination, Navigation]}
                                >
                                    {iconFeatures.map((feature) => (
                                        <SwiperSlide key={feature.title} className="swiper-slide">
                                            <div className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                                                <div className="box-icon">
                                                    <i className={`icon ${feature.iconClass}`} />
                                                </div>
                                                <div className="content">
                                                    <div className="title text-uppercase">{feature.title}</div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="tf-page-cart-sidebar">
                            <form className="cart-box shipping-cart-box" onSubmit={(e) => e.preventDefault()}>
                                <div className="text-lg title fw-medium">Shipping estimates</div>
                                <fieldset className="field">
                                    <label htmlFor="country" className="text-sm">
                                        Country
                                    </label>
                                    <input type="text" id="country" placeholder="United State" />
                                </fieldset>
                                <fieldset className="field">
                                    <label htmlFor="state" className="text-sm">
                                        State/Province
                                    </label>
                                    <input type="text" id="state" placeholder="State/Province" />
                                </fieldset>
                                <fieldset className="field">
                                    <label htmlFor="code" className="text-sm">
                                        Zipcode
                                    </label>
                                    <input type="text" id="code" placeholder="41000" />
                                </fieldset>
                                <button type="button" className="tf-btn btn-dark2 animate-btn w-100">
                                    Estimate
                                </button>
                            </form>
                            <form onSubmit={(e) => e.preventDefault()} className="cart-box checkout-cart-box">
                                <div className="cart-head">
                                    <div className="total-discount text-xl fw-medium">
                                        <span>Total:</span>
                                        <span className="total">${totalPrice.toFixed(2)} USD</span>
                                    </div>
                                    <p className="text-sm text-dark-4">Taxes and shipping calculated at checkout</p>
                                </div>
                                <div className="check-agree">
                                    <input type="checkbox" className="tf-check" id="check-agree" />
                                    <label htmlFor="check-agree" className="label text-dark-4">
                                        I agree with
                                        <Link to="/term-and-condition" className="text-dark-4 fw-medium text-underline link">
                                            term and conditions
                                        </Link>
                                    </label>
                                </div>
                                <div className="checkout-btn">
                                    <Link to="/checkout" className="tf-btn btn-dark2 animate-btn w-100">
                                        Checkout
                                    </Link>
                                </div>
                                <div className="cart-imgtrust">
                                    <p className="text-center text-sm text-dark-1">We accept</p>
                                    <div className="cart-list-social">
                                        {["Visa", "Mastercard", "PayPal", "ApplePay"].map((brand) => (
                                            <div className="payment-item" key={brand}>
                                                <img alt={brand} src={`/images/payment/${brand}.png`} width={46} height={33} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                            <div className="cart-box testimonial-cart-box">
                                <Swiper
                                    dir="ltr"
                                    className="swiper tf-swiper"
                                    slidesPerView={1}
                                    spaceBetween={12}
                                    speed={800}
                                    pagination={{ el: ".sw-pagination-iconbox", clickable: true }}
                                    navigation={{ nextEl: ".nav-next-tes", prevEl: ".nav-prev-tes" }}
                                    modules={[Pagination, Navigation]}
                                >
                                    {testimonials12.map((testimonial) => (
                                        <SwiperSlide className="swiper-slide" key={testimonial.name}>
                                            <div className="box-testimonial-main">
                                                <span className="quote icon-quote5" />
                                                <div className="content">
                                                    <div className="list-star-default">
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <i className="icon-star" key={i} />
                                                        ))}
                                                    </div>
                                                    <p className="text-review text-md text-main">{testimonial.review}</p>
                                                    <div className="box-author">
                                                        <div className="img">
                                                            <img alt={testimonial.name} src={testimonial.imgSrc} width={testimonial.imgWidth} height={testimonial.imgHeight} />
                                                        </div>
                                                        <span className="name text-sm fw-medium">{testimonial.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div className="box-nav-swiper">
                                        <div className="swiper-button-prev nav-swiper nav-prev-tes" />
                                        <div className="swiper-button-next nav-swiper nav-next-tes" />
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
