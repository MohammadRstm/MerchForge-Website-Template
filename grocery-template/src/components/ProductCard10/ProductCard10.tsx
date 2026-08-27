import { Link } from "react-router-dom";
import { useShopContext } from "../../context/Shop/useShopContext";
import CountdownTimer from "../Countdown/Countdown";
import type { Product } from "../../types/product";

interface ProductCard10Props {
    product: Product;
}

/** The "style-2" card used by the product-detail page's recommendation carousels: always shows sizes/tags, no out-of-stock handling. */
export default function ProductCard10({ product }: ProductCard10Props) {
    const {
        addToCompareItem,
        isAddedtoCompareItem,
        setQuickViewItem,
        addProductToCart,
        isAddedToCartProducts,
    } = useShopContext();

    const sizes = product.sizes ?? [];
    const colors = product.colors ?? [];

    return (
        <div className="card-product style-2 card-product-size">
            <div className="card-product-wrapper">
                <Link to={`/product-detail/${product.id}`} className="product-img">
                    <img className="img-product lazyload" alt={product.title} src={product.imgSrc} width={684} height={972} />
                    <img className="img-hover lazyload" alt={product.title} src={product.imgHover} width={684} height={972} />
                </Link>
                <ul className="list-product-btn">
                    <li>
                        <a
                            href="#shoppingCart"
                            onClick={() => addProductToCart(product.id)}
                            data-bs-toggle="offcanvas"
                            className="box-icon hover-tooltip"
                        >
                            <span className="icon icon-cart2" />
                            <span className="tooltip">{isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#quickView"
                            data-bs-toggle="modal"
                            onClick={() => setQuickViewItem(product)}
                            className="box-icon quickview hover-tooltip"
                        >
                            <span className="icon icon-view" />
                            <span className="tooltip">Quick View</span>
                        </a>
                    </li>
                    <li className="compare">
                        <a
                            href="#compare"
                            data-bs-toggle="modal"
                            onClick={() => addToCompareItem(product.id)}
                            className="box-icon hover-tooltip"
                        >
                            <span className="icon icon-compare" />
                            <span className="tooltip">{isAddedtoCompareItem(product.id) ? "Already compared" : "Add to Compare"}</span>
                        </a>
                    </li>
                </ul>
                {sizes.length > 0 && (
                    <ul className="size-box">
                        {sizes.map((size) => (
                            <li key={size} className="size-item text-xs text-white">
                                {size}
                            </li>
                        ))}
                    </ul>
                )}
                {product.countdownTimer && (
                    <div className="countdown-box">
                        <span className="js-countdown">
                            <CountdownTimer style={1} />
                        </span>
                    </div>
                )}
                {product.saleTags && product.saleTags.length > 0 && (
                    <div className="on-sale-wrap flex-column">
                        {product.saleTags.map((tag) => (
                            <span key={tag} className={`on-sale-item ${tag.toLowerCase()}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="card-product-info">
                <Link to={`/product-detail/${product.id}`} className="name-product link fw-medium text-md">
                    {product.title}
                </Link>
                <p className="price-wrap fw-medium">
                    <span className={`price-new ${product.oldPrice ? "text-primary" : ""}`}>${product.price.toFixed(2)}</span>{" "}
                    {product.oldPrice && <span className="price-old">${product.oldPrice.toFixed(2)}</span>}
                </p>
                {colors.length > 0 && (
                    <ul className="list-color-product">
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
