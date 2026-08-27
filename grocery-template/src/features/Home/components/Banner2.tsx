import { Link } from "react-router-dom";

/** Full-width "Eat Fresh, Live Well" collection banner. */
export default function Banner2() {
    return (
        <div className="s-banner-colection flat-spacing-6">
            <div className="container">
                <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
                    <div className="image img-hv-overlay">
                        <img src="/images/banner/strawberries-promo.jpg" alt="Eat fresh, live well" className="lazyload" width={719} height={676} />
                    </div>
                    <div className="box-content">
                        <div className="box-title-banner wow fadeInUp">
                            <p className="title display-md fw-medium">Eat Fresh, Live Well</p>
                            <p className="sub text-lg">
                                Discover farm-fresh, organic veggies at our store. <br />
                                Locally sourced, quality guaranteed.
                            </p>
                        </div>
                        <div className="box-btn-banner wow fadeInUp">
                            <Link to="/shop-default" className="tf-btn animate-btn">
                                Discover Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
