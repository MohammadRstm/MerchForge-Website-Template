import { Link } from "react-router-dom";
import { useShopContext } from "../../context/Shop/useShopContext";
import CountdownTimer from "../Countdown/Countdown";
import type { Product } from "../../types/product";

interface ProductCardProps {
    product: Product;
    styleClass?: string;
    tooltipDirection?: string;
    textCenter?: boolean;
    ratioClass?: string;
}

/**
 * The catalog card used everywhere a product renders: sliders, mega-menus, the
 * hurry-up popup. Reads/writes cart, wishlist, compare and quick-view state from
 * ShopContext — swap ShopContext's data source later and this needs no changes.
 */
export default function ProductCard({
    product,
    styleClass = "style-1",
    tooltipDirection = "left",
    textCenter = false,
    ratioClass = "",
}: ProductCardProps) {
    const {
        addToWishlist,
        isAddedtoWishlist,
        addToCompareItem,
        isAddedtoCompareItem,
        setQuickViewItem,
        addProductToCart,
        isAddedToCartProducts,
    } = useShopContext();

    const sizes = product.sizes ?? [];
    const colors = product.colors ?? [];

    return (
        <div
            className={`card-product ${sizes.length > 0 ? "card-product-size" : ""} ${
                product.isOutofSale ? "out-of-stock" : ""
            } ${styleClass}`}
        >
            <div className={`card-product-wrapper ${ratioClass}`}>
                <Link to={`/product-detail/${product.id}`} className="product-img">
                    <img className="img-product lazyload" alt={product.title} src={product.imgSrc} width={513} height={729} />
                    <img className="img-hover lazyload" alt={product.title} src={product.imgHover} width={513} height={729} />
                </Link>

                {product.saleLabel && (
                    <div className="on-sale-wrap">
                        <span className="on-sale-item">{product.saleLabel}</span>
                    </div>
                )}
                {product.isTrending && (
                    <div className="on-sale-wrap">
                        <span className="on-sale-item trending">Trending</span>
                    </div>
                )}
                {product.countdownTimer && (
                    <div className="countdown-box">
                        <span className="js-countdown">
                            <CountdownTimer style={1} />
                        </span>
                    </div>
                )}

                {!product.isOutofSale && (
                    <>
                        <ul className="list-product-btn">
                            {!styleClass.includes("style-3") && (
                                <li>
                                    <a
                                        href="#shoppingCart"
                                        data-bs-toggle="offcanvas"
                                        onClick={() => addProductToCart(product.id)}
                                        className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                                    >
                                        <span className="icon icon-cart2" />
                                        <span className="tooltip">
                                            {isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
                                        </span>
                                    </a>
                                </li>
                            )}
                            <li className={`wishlist ${isAddedtoWishlist(product.id) ? "addwishlist" : ""}`}>
                                <a
                                    onClick={() => addToWishlist(product.id)}
                                    className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                                >
                                    <span className={`icon ${isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"}`} />
                                    <span className="tooltip">
                                        {isAddedtoWishlist(product.id) ? "Remove Wishlist" : "Add to Wishlist"}
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#quickView"
                                    data-bs-toggle="modal"
                                    onClick={() => setQuickViewItem(product)}
                                    className={`hover-tooltip tooltip-${tooltipDirection} box-icon quickview`}
                                >
                                    <span className="icon icon-view" />
                                    <span className="tooltip">Quick View</span>
                                </a>
                            </li>
                            <li className="compare">
                                <a
                                    href="#compare"
                                    onClick={() => addToCompareItem(product.id)}
                                    data-bs-toggle="modal"
                                    className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                                >
                                    <span className="icon icon-compare" />
                                    <span className="tooltip">
                                        {isAddedtoCompareItem(product.id) ? "Already compared" : "Add to Compare"}
                                    </span>
                                </a>
                            </li>
                        </ul>

                        {styleClass.includes("style-3") && (
                            <div className="product-btn-main">
                                <a
                                    href="#shoppingCart"
                                    data-bs-toggle="offcanvas"
                                    className="btn-main-product"
                                    onClick={() => addProductToCart(product.id)}
                                >
                                    <span className="icon icon-cart2" />
                                    <span className="text-md fw-medium">
                                        {isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
                                    </span>
                                </a>
                            </div>
                        )}

                        {sizes.length > 0 && (
                            <ul className="size-box">
                                {sizes.map((size) => (
                                    <li className="size-item text-xs text-white" key={size}>
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>

            <div className={`card-product-info ${textCenter ? "text-center" : ""}`}>
                <Link to={`/product-detail/${product.id}`} className="name-product link fw-medium text-md">
                    {product.title}
                </Link>
                <p className="price-wrap fw-medium">
                    <span className={`price-new ${product.oldPrice ? "text-primary" : ""}`}>
                        ${product.price.toFixed(2)}
                    </span>{" "}
                    {product.oldPrice && <span className="price-old text-dark">${product.oldPrice.toFixed(2)}</span>}
                </p>

                {colors.length > 0 && (
                    <ul className={`list-color-product ${textCenter ? "justify-content-center" : ""}`}>
                        {colors.map((color) => (
                            <li
                                className={`list-color-item color-swatch hover-tooltip tooltip-bot ${
                                    color.hex.toUpperCase() === "#FFFFFF" ? "line" : ""
                                }`}
                                key={color.hex}
                            >
                                <span className="tooltip color-filter">{color.name}</span>
                                <span className="swatch-value" style={{ backgroundColor: color.hex }} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
