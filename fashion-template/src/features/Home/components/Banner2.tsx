import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { env } from "../../../config/env";

/**
 * Full-width promo banner — this template's "promo banner" customization slot
 * (catalogue keys promoBannerImage/promoBannerText). Falls back to the static demo
 * "Effortless Chic" content when the business hasn't set either.
 */
export default function Banner2() {
    const { data: business } = useBusiness();
    const imageOverride = resolveImageUrl(
        typeof business?.templateFields.promoBannerImage === "string" ? business.templateFields.promoBannerImage : null,
        env.origin
    );
    const textOverride =
        typeof business?.templateFields.promoBannerText === "string" ? business.templateFields.promoBannerText : null;

    return (
        <div className="s-banner-colection flat-spacing-6">
            <div className="container">
                <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
                    <div className="image img-hv-overlay">
                        <img
                            src={imageOverride ?? "/images/banner/fashion-2.jpg"}
                            alt=""
                            className="lazyload"
                            width={719}
                            height={676}
                        />
                    </div>
                    <div className="box-content">
                        <div className="box-title-banner wow fadeInUp">
                            <p className="title display-md fw-medium">{textOverride ?? "Effortless Chic"}</p>
                            <p className="sub text-lg">
                                Achieve effortless style with pieces made for <br />
                                everyday wear
                            </p>
                        </div>
                        <div className="box-btn-banner wow fadeInUp">
                            <Link to="/shop-sub-collection" className="tf-btn animate-btn">
                                Explore Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
