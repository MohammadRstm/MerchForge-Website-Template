import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { env } from "../../../config/env";

/**
 * Full-width promo banner — this template's "promo banner" customization slot
 * (catalogue keys promoBannerImage/promoBannerText). Falls back to the static demo
 * "Eat Fresh, Live Well" content when the business hasn't set either.
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
                            src={imageOverride ?? "/images/banner/strawberries-promo.jpg"}
                            alt="Eat fresh, live well"
                            className="lazyload"
                            width={719}
                            height={676}
                        />
                    </div>
                    <div className="box-content">
                        <div className="box-title-banner wow fadeInUp">
                            <p className="title display-md fw-medium">{textOverride ?? "Eat Fresh, Live Well"}</p>
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
