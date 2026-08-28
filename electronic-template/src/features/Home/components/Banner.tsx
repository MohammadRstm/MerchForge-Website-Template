import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { env } from "../../../config/env";

/**
 * Single-image promo banner between the two product sections — this template's
 * "promo banner" customization slot (catalogue keys promoBannerImage/promoBannerText).
 * Falls back to the static demo content when the business hasn't set either.
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
        <div className="s-banner-colection banner-cls-electric flat-spacing-3">
            <div className="container">
                <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
                    <div className="image">
                        <img
                            alt="Phone"
                            className="lazyload"
                            src={imageOverride ?? "/images/banner/phone.png"}
                            width={763}
                            height={570}
                        />
                    </div>
                    <div className="box-content">
                        <div className="box-title-banner wow fadeInUp">
                            <p className="title display-md fw-medium">{textOverride ?? "Unmatched Performance"}</p>
                            <p className="sub text-md text-main">Upgrade your devices with cutting-edge technology.</p>
                        </div>
                        <div className="box-btn-banner wow fadeInUp">
                            <Link to="/shop-default" className="tf-btn btn-dark2 animate-btn">
                                Shop Now
                                <i className="icon icon-arr-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
