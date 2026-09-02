import { useState } from "react";
import type { Product } from "../../../types/product";

interface SizeSelectProps {
    product: Product;
}

/** Hidden entirely for products with no size options, rather than showing the source's fixed S/M/L/XL placeholder. */
export default function SizeSelect({ product }: SizeSelectProps) {
    const sizes = product.sizes ?? [];
    const [activeSize, setActiveSize] = useState(sizes[0] ?? "");

    if (sizes.length === 0) return null;

    return (
        <div className="variant-picker-item variant-size">
            <div className="variant-picker-label">
                <div>
                    Size:
                    <span className="variant-picker-label-value value-currentSize">{activeSize}</span>
                </div>
                <a href="#sizeGuide" data-bs-toggle="modal" className="size-guide link">
                    Size Guide
                </a>
            </div>
            <div className="variant-picker-values">
                {sizes.map((size) => (
                    <span key={size} className={`size-btn ${activeSize === size ? "active" : ""}`} onClick={() => setActiveSize(size)}>
                        {size}
                    </span>
                ))}
            </div>
        </div>
    );
}
