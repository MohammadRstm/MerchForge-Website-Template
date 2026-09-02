import { Link } from "react-router-dom";

const CATEGORY_TILES = [
    { label: "Women", category: "women", imgSrc: "/images/categories/fashion-01/women.jpg" },
    { label: "Men", category: "men", imgSrc: "/images/categories/fashion-01/men.jpg" },
    { label: "Accessories", category: "women", imgSrc: "/images/categories/fashion-01/accessories.jpg" },
    { label: "Sportwear", category: "men", imgSrc: "/images/categories/fashion-01/sportwear.jpg" },
] as const;

/**
 * "Categories" section — markup ported from Vineta's actual category-card component
 * (wg-cls/style-abs/asp-1/hover-img, cls-btn), which the source template runs inside
 * a Women/Men tabbed swiper carousel. Kept as one flat row here rather than porting
 * the tab-switching too: the cards themselves are what needed to render correctly,
 * and the real product data behind each tile matters more than the tab mechanic.
 */
export default function Banner() {
    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Categories</h4>
                </div>
                <div className="tf-grid-layout tf-col-4 wow fadeInUp">
                    {CATEGORY_TILES.map((tile) => (
                        <div key={tile.label} className="wg-cls style-abs asp-1 hover-img">
                            <Link to={`/shop-default?category=${tile.category}`} className="image img-style d-block">
                                <img src={tile.imgSrc} alt={tile.label} className="lazyload" width={540} height={540} />
                            </Link>
                            <div className="cls-btn text-center">
                                <Link to={`/shop-default?category=${tile.category}`} className="tf-btn btn-cls btn-white hover-dark hover-icon-2">
                                    {tile.label}
                                    <i className="icon icon-arrow-top-left" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
