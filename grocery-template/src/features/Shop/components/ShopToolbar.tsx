import type { ProductCategory } from "../../../types/product";

export type ShopCategory = ProductCategory | "all";
export type SortOption = "default" | "price-asc" | "price-desc" | "title-asc";

const CATEGORY_TABS: { value: ShopCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: "Sort by (Default)" },
    { value: "title-asc", label: "Name: A-Z" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

interface ShopToolbarProps {
    category: ShopCategory;
    onCategoryChange: (category: ShopCategory) => void;
    search: string;
    onSearchChange: (search: string) => void;
    sort: SortOption;
    onSortChange: (sort: SortOption) => void;
    resultCount: number;
}

export default function ShopToolbar({ category, onCategoryChange, search, onSearchChange, sort, onSortChange, resultCount }: ShopToolbarProps) {
    return (
        <div className="tf-shop-control">
            <div className="tf-group-filter d-flex align-items-center flex-wrap" style={{ gap: 8 }}>
                {CATEGORY_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        className={`tf-btn radius-6 ${category === tab.value ? "btn-dark2" : "btn-out-line-dark-2"}`}
                        onClick={() => onCategoryChange(tab.value)}
                    >
                        <span className="text-sm">{tab.label}</span>
                    </button>
                ))}
            </div>

            <form className="form-search" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 280 }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <button type="submit">
                    <i className="icon icon-search" />
                </button>
            </form>

            <div className="tf-select" style={{ minWidth: 200 }}>
                <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)}>
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div id="product-count-grid" className="count-text">
                <span className="count">{resultCount}</span> product{resultCount !== 1 ? "s" : ""} found
            </div>
        </div>
    );
}
