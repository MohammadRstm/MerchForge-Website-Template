import type { Product } from "../../../types/product";

interface ProductHeadingProps {
    product: Product;
}

/**
 * The source's version takes a `product` prop but never actually reads it — every
 * product page shows the same hardcoded placeholder title/price no matter which item
 * you're viewing. Wiring the real title/price/sale/stock through here is what makes
 * this page track the product you're actually on.
 */
export default function ProductHeading({ product }: ProductHeadingProps) {
    const inStock = product.inStock;

    return (
        <div className={`tf-product-heading ${inStock ? "" : "pb-0 border-0"}`}>
            <h5 className="product-name fw-medium">{product.title}</h5>
            <div className="product-rate">
                <div className="list-star">
                    <i className="icon icon-star" />
                    <i className="icon icon-star" />
                    <i className="icon icon-star" />
                    <i className="icon icon-star" />
                    <i className="icon icon-star" />
                </div>
                <span className="count-review">(5 reviews)</span>
            </div>
            <div className="product-price">
                <div className="display-sm price-new price-on-sale">${product.price.toFixed(2)}</div>
                {product.oldPrice && <div className="display-sm price-old">${product.oldPrice.toFixed(2)}</div>}
                {product.saleLabel.map((label) => (
                    <span key={label} className="badge-sale">
                        {label}
                    </span>
                ))}
            </div>
            {inStock ? (
                <div className="product-stock">
                    <span className="stock in-stock">In Stock</span>
                </div>
            ) : (
                <>
                    <div className="product-stock">
                        <span className="stock out-stock">Out of Stock</span>
                    </div>
                    <button type="button" className="tf-btn btn-out-stock" disabled>
                        This product is currently unavailable
                    </button>
                </>
            )}
        </div>
    );
}
