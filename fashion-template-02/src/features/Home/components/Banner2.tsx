import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import CountdownTimer from "../../../components/Countdown/Countdown";
import { env } from "../../../config/env";

/**
 * "Summer Sale" countdown banner — this template's "promo banner" customization slot
 * (catalogue keys promoBannerImage/promoBannerText). Falls back to the static demo
 * sale content when the business hasn't set either.
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
                <div className="banner-content-wrap hover-overlay-2">
                    <div className="image img-hv-overlay">
                        <img
                            src={imageOverride ?? "/images/banner/fashion-01/summer-sale.jpg"}
                            alt=""
                            className="lazyload"
                            width={1546}
                            height={743}
                        />
                    </div>
                    <div className="box-content text-center">
                        <p className="title display-md fw-medium">{textOverride ?? "Summer Sale"}</p>
                        <p className="sub text-lg">50% off, storewide</p>
                        <CountdownTimer style={2} />
                        <div className="box-btn-banner wow fadeInUp">
                            <Link to="/shop-default" className="tf-btn animate-btn">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
