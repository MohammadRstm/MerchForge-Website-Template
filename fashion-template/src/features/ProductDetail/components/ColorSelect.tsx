import type { Product } from "../../../types/product";

interface ColorSelectProps {
    product: Product;
    activeColor: string;
    setActiveColor: (color: string) => void;
}

/** Hidden entirely for products with no color variants, rather than showing the source's fixed Black/Yellow/Grey placeholder. */
export default function ColorSelect({ product, activeColor, setActiveColor }: ColorSelectProps) {
    const colors = product.colors ?? [];
    if (colors.length === 0) return null;

    return (
        <div className="variant-picker-item variant-color">
            <div className="variant-picker-label">
                Colors:
                <span className="text-title variant-picker-label-value value-currentColor" style={{ textTransform: "capitalize" }}>
                    {activeColor}
                </span>
            </div>
            <div className="variant-picker-values">
                {colors.map((color) => (
                    <div
                        key={color.value}
                        onClick={() => setActiveColor(color.label)}
                        className={`hover-tooltip tooltip-bot color-btn ${activeColor === color.label ? "active" : ""}`}
                    >
                        <span className={`check-color swatch-value ${color.value}`} />
                        <span className="tooltip">{color.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
