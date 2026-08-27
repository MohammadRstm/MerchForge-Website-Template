import { Link } from "react-router-dom";

/** Two-tile promo banner: fresh produce and seasonal fruit. */
export default function Banner() {
    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="tf-grid-layout lg-col-2 grid-cls-suppermarket">
                    <div className="s-cls bg-gradient-3 style-absolute abs-left-bottom hover-img">
                        <Link to="/shop-default?category=vegetables" className="image d-block img-style">
                            <img src="/images/section/vegetable-1-real.png" alt="Fresh produce" className="lazyload" width={1062} height={620} />
                        </Link>
                        <div className="content wow fadeInUp">
                            <div className="box-title">
                                <h5>Fresh Produce Everyday</h5>
                                <p className="text-sm">Straight from the farm to your kitchen.</p>
                            </div>
                            <div className="box-btn">
                                <Link to="/shop-default?category=vegetables" className="tf-btn animate-btn">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="s-cls bg-gradient-4 style-absolute abs-left-bottom hover-img">
                        <Link to="/shop-default?category=fruits" className="image d-block img-style">
                            <img src="/images/banner/oranges-promo.jpg" alt="Seasonal fruit" className="lazyload" width={1062} height={620} />
                        </Link>
                        <div className="content wow fadeInUp">
                            <div className="box-title">
                                <h5>Seasonal Fruit, Picked Fresh</h5>
                                <p className="text-sm">Support sustainable farming with every purchase.</p>
                            </div>
                            <div className="box-btn">
                                <Link to="/shop-default?category=fruits" className="tf-btn animate-btn">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
