import type { Product } from "../../../types/product";

interface ColorSelectProps {
    product: Product;
    activeColor: string;
    setActiveColor: (color: string) => void;
}

/**
 * Hidden entirely for products with no color variants, rather than showing the
 * source's fixed Black/Yellow/Grey placeholder. `activeColor` tracks a hex value now
 * (colors have no name of their own, only a hex the merchant picked from the wheel) —
 * the swatch dot renders that hex directly instead of a fixed `bg-*` class, so it
 * shows the merchant's actual chosen color rather than one of a handful of presets.
 */
export default function ColorSelect({ product, activeColor, setActiveColor }: ColorSelectProps) {
    const colors = product.colors ?? [];
    if (colors.length === 0) return null;

    const activeName = colors.find((color) => color.hex === activeColor)?.name ?? "";

    return (
        <div className="variant-picker-item variant-color">
            <div className="variant-picker-label">
                Colors:
                <span className="text-title variant-picker-label-value value-currentColor" style={{ textTransform: "capitalize" }}>
                    {activeName}
                </span>
            </div>
            <div className="variant-picker-values">
                {colors.map((color) => (
                    <div
                        key={color.hex}
                        onClick={() => setActiveColor(color.hex)}
                        className={`hover-tooltip tooltip-bot color-btn ${activeColor === color.hex ? "active" : ""}`}
                    >
                        <span className="check-color swatch-value" style={{ backgroundColor: color.hex }} />
                        <span className="tooltip">{color.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
