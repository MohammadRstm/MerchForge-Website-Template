import { Link } from "react-router-dom";
import type { ProductCategory } from "../../../types/product";

interface CategoryTile {
    category: ProductCategory;
    label: string;
    imgSrc: string;
}

const CATEGORY_TILES: CategoryTile[] = [
    { category: "vegetables", label: "Vegetables", imgSrc: "/images/categories/vegetables.jpg" },
    { category: "fruits", label: "Fruits", imgSrc: "/images/categories/fruits.jpg" },
];

/** "Shop by Category" section — each tile pre-filters the shop page via the URL. */
export default function Categories() {
    return (
        <section className="flat-spacing-2">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Shop by Category</h4>
                    <p className="desc text-main text-md">Fresh fruits and vegetables, sourced from growers we know by name.</p>
                </div>
                <div className="tf-grid-layout tf-col-2 wow fadeInUp">
                    {CATEGORY_TILES.map((tile) => (
                        <div className="wg-cls style-circle hover-img" key={tile.category}>
                            <Link to={`/shop-default?category=${tile.category}`} className="image img-style d-block">
                                <img src={tile.imgSrc} alt={tile.label} className="lazyload" width={534} height={534} />
                            </Link>
                            <div className="cls-content text-center">
                                <Link to={`/shop-default?category=${tile.category}`} className="link text-md fw-medium">
                                    {tile.label}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
