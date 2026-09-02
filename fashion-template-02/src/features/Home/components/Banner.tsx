import { Link } from "react-router-dom";

const CATEGORY_TILES = [
    { label: "Women", category: "women", imgSrc: "/images/categories/fashion-01/women.jpg" },
    { label: "Men", category: "men", imgSrc: "/images/categories/fashion-01/men.jpg" },
    { label: "Accessories", category: "women", imgSrc: "/images/categories/fashion-01/accessories.jpg" },
    { label: "Sportwear", category: "men", imgSrc: "/images/categories/fashion-01/sportwear.jpg" },
] as const;

/** "Shop by Category" tile grid. */
export default function Banner() {
    return (
        <section className="flat-spacing-3 pt-0">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Shop by Category</h4>
                </div>
                <div className="tf-grid-layout tf-col-4 wow fadeInUp">
                    {CATEGORY_TILES.map((tile) => (
                        <Link
                            key={tile.label}
                            to={`/shop-default?category=${tile.category}`}
                            className="collection-position-1 hover-img"
                        >
                            <div className="img-style">
                                <img
                                    src={tile.imgSrc}
                                    alt={tile.label}
                                    className="lazyload"
                                    width={540}
                                    height={540}
                                />
                            </div>
                            <div className="content">
                                <span className="fw-medium">{tile.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
