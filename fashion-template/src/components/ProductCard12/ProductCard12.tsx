import { Link } from "react-router-dom";
import { useShopContext } from "../../context/Shop/useShopContext";
import CountdownTimer from "../Countdown/Countdown";
import type { Product } from "../../types/product";
import StarRating from "../StarRating/StarRating";

interface ProductCard12Props {
    product: Product;
    tooltipDirection?: string;
    textCenter?: boolean;
}

/** The wishlist-grid card: an explicit remove (x) icon, no add-to-cart action, quickview + compare only. */
export default function ProductCard12({ product, tooltipDirection = "top", textCenter = false }: ProductCard12Props) {
    const { addToWishlist, isAddedtoWishlist, addToCompareItem, isAddedtoCompareItem, setQuickViewItem, removeFromWishlist } = useShopContext();

    const colors = product.colors ?? [];

    return (
        <div
            className={`card-product grid file-delete style-wishlist style-3 ${colors.length > 0 && product.sizes && product.sizes.length > 0 ? "card-product-size" : ""} ${
                product.isOutofSale ? "out-of-stock" : ""
            }`}
        >
            <i className="icon icon-close remove" onClick={() => removeFromWishlist(product.id)} />

            <div className="card-product-wrapper">
                <Link to={`/product-detail/${product.id}`} className="product-img">
                    <img className="img-product lazyload" alt={product.title} src={product.imgSrc} width={513} height={729} />
                    <img className="img-hover lazyload" alt={product.title} src={product.imgHover ?? product.imgSrc} width={513} height={729} />
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
                    <ul className="list-product-btn">
                        <li className={`wishlist ${isAddedtoWishlist(product.id) ? "addwishlist" : ""}`}>
                            <a onClick={() => addToWishlist(product.id)} className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}>
                                <span className={`icon ${isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"}`} />
                                <span className="tooltip">{isAddedtoWishlist(product.id) ? "Remove Wishlist" : "Add to Wishlist"}</span>
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
                                <span className="tooltip">{isAddedtoCompareItem(product.id) ? "Already compared" : "Add to Compare"}</span>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
            <div className={`card-product-info ${textCenter ? "text-center" : ""}`}>
                <Link to={`/product-detail/${product.id}`} className="name-product link fw-medium text-md">
                    {product.title}
                </Link>
                {/* Only shown once a product actually has reviews: a grid where every
                    unreviewed card carries five greyed-out stars is just noise. */}
                {product.reviewCount > 0 && (
                    <StarRating
                        value={product.averageRating ?? 0}
                        reviewCount={product.reviewCount}
                        className="mf-card-rate"
                    />
                )}

                <p className="price-wrap fw-medium">
                    <span className={`price-new ${product.oldPrice ? "text-primary" : ""}`}>${product.price.toFixed(2)}</span>{" "}
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
