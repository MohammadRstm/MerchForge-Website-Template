import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShopToolbar, { type ShopCategory, type SortOption } from "./components/ShopToolbar";
import { useCatalog } from "../../hooks/useCatalog";

const VALID_CATEGORIES: ShopCategory[] = ["all", "vegetables", "fruits"];

function readCategory(searchParams: URLSearchParams): ShopCategory {
    const value = searchParams.get("category");
    return VALID_CATEGORIES.includes(value as ShopCategory) ? (value as ShopCategory) : "all";
}

/** The shop grid — reached from the home page's "Shop Vegetables/Fruits/Dairy/Bakery/Beverages" hero buttons, each pre-filtering by category via the URL. */
export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = readCategory(searchParams);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOption>("default");
    const { allProducts } = useCatalog();

    const handleCategoryChange = (next: ShopCategory) => {
        if (next === "all") {
            searchParams.delete("category");
        } else {
            searchParams.set("category", next);
        }
        setSearchParams(searchParams, { replace: true });
    };

    const products = useMemo(() => {
        let result = category === "all" ? allProducts : allProducts.filter((product) => product.category === category);

        const query = search.trim().toLowerCase();
        if (query) {
            result = result.filter((product) => product.title.toLowerCase().includes(query));
        }

        switch (sort) {
            case "price-asc":
                return [...result].sort((a, b) => a.price - b.price);
            case "price-desc":
                return [...result].sort((a, b) => b.price - a.price);
            case "title-asc":
                return [...result].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return result;
        }
    }, [allProducts, category, search, sort]);

    return (
        <>
            <PageTitle pageName="Shop" pageTitle="Shop" />
            <section className="flat-spacing-24">
                <div className="container">
                    <ShopToolbar
                        category={category}
                        onCategoryChange={handleCategoryChange}
                        search={search}
                        onSearchChange={setSearch}
                        sort={sort}
                        onSortChange={setSort}
                        resultCount={products.length}
                    />

                    {products.length ? (
                        <div className="wrapper-shop tf-grid-layout tf-col-2 lg-col-3 xl-col-4 style-1">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">No products match your filters.</div>
                    )}
                </div>
            </section>
        </>
    );
}
