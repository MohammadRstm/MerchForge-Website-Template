import { useState } from "react";

interface BundleItem {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice: number;
    options: string[];
    checked: boolean;
}

const initialBundle: BundleItem[] = [
    {
        id: 1,
        title: "3-Port 67W Fast Wall Charger",
        image: "/images/products/electronic/3-Port67w.jpg",
        price: 35.0,
        oldPrice: 45.0,
        options: ["Black", "White"],
        checked: true,
    },
    {
        id: 2,
        title: "10000mAh Portable Power Bank",
        image: "/images/products/electronic/power-1000mAh.jpg",
        price: 29.0,
        oldPrice: 39.0,
        options: ["Black", "White"],
        checked: false,
    },
    {
        id: 3,
        title: "Tempered Glass Screen Protector, 2-Pack",
        image: "/images/products/electronic/screen-protector.jpg",
        price: 15.0,
        oldPrice: 20.0,
        options: ["Standard"],
        checked: false,
    },
];

/** Curated cross-sell bundle, independent of the product being viewed — matches the source template's own behavior. */
export default function BoughtTogether() {
    const [items, setItems] = useState(initialBundle);

    const toggleCheckbox = (id: number) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    const checkedItems = items.filter((item) => item.checked);
    const totalPrice = checkedItems.reduce((sum, item) => sum + item.price, 0);
    const totalOldPrice = checkedItems.reduce((sum, item) => sum + item.oldPrice, 0);

    return (
        <form className="tf-product-form-bundle" onSubmit={(e) => e.preventDefault()}>
            <div className="tf-bundle-products">
                {items.map((item) => (
                    <div key={item.id} className={`tf-bundle-product-item item-has-checkbox ${item.checked ? "check" : ""}`}>
                        <div className="bundle-check">
                            <input type="checkbox" className="tf-check" checked={item.checked} onChange={() => toggleCheckbox(item.id)} />
                        </div>
                        <span className="bundle-image">
                            <img alt={item.title} src={item.image} width={828} height={1241} />
                        </span>
                        <div className="bundle-info">
                            <div className="bundle-title text-sm fw-medium">{item.title}</div>
                            <div className="bundle-price text-md fw-medium">
                                <span className="new-price">${item.price.toFixed(2)}</span> <span className="old-price">${item.oldPrice.toFixed(2)}</span>
                            </div>
                            <div className="bundle-variant tf-select">
                                <select>
                                    {item.options.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bundle-total-submit">
                <div className="text">Total price:</div>
                <span className="total-price">${totalPrice.toFixed(2)} USD</span> <span className="total-price-old">${totalOldPrice.toFixed(2)} USD</span>
            </div>
            <button type="submit" className="btn-submit-total tf-btn btn-out-line-primary">
                Add selected to cart
            </button>
        </form>
    );
}
