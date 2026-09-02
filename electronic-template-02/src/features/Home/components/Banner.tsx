import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { env } from "../../../config/env";

/**
 * "See Our Cases in Action" banner — markup ported from Vineta's actual
 * s-banner-colection/banner-cls-phonecase section. This template's "promo banner"
 * customization slot (catalogue keys promoBannerImage/promoBannerText). Falls back
 * to the static demo content when the business hasn't set either.
 */
export default function Banner() {
    const { data: business } = useBusiness();
    const imageOverride = resolveImageUrl(
        typeof business?.templateFields.promoBannerImage === "string" ? business.templateFields.promoBannerImage : null,
        env.origin
    );
    const textOverride =
        typeof business?.templateFields.promoBannerText === "string" ? business.templateFields.promoBannerText : null;

    return (
        <section className="s-banner-colection banner-cls-phonecase flat-spacing-2">
            <div className="container-full">
                <div className="banner-content">
                    <div className="box-content wow fadeInUp">
                        <div className="box-title-banner">
                            <p className="sub text-xl text-dark-3">Discover the features that make our cases stand out</p>
                            <h2 className="title display-xl-2 fw-medium text-dark-3">{textOverride ?? "See Our Cases in Action"}</h2>
                        </div>
                        <div className="box-btn-banner">
                            <Link to="/shop-default" className="tf-btn animate-btn fw-normal hover-icon">
                                Shop Collection
                                <i className="icon icon-arrow1-top-left fs-12" />
                            </Link>
                        </div>
                    </div>
                    <div className="image">
                        <img src={imageOverride ?? "/images/banner/case.jpg"} alt="" className="lazyload" />
                    </div>
                </div>
            </div>
        </section>
    );
}
