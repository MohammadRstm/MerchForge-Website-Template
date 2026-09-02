import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import CountdownTimer from "../../../components/Countdown/Countdown";
import { env } from "../../../config/env";

/**
 * "Summer Sale" countdown banner — markup ported from Vineta's actual
 * s-banner-countdown/banner-cd-fashion section. This template's "promo banner"
 * customization slot (catalogue keys promoBannerImage/promoBannerText). Falls back
 * to the static demo sale content when the business hasn't set either.
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
        <section>
            <div className="container">
                <div className="s-banner-countdown banner-cd-fashion">
                    <div className="image">
                        <img
                            src={imageOverride ?? "/images/banner/fashion-01/summer-sale.jpg"}
                            alt=""
                            className="lazyload"
                            width={1546}
                            height={743}
                        />
                    </div>
                    <div className="banner-content text-center">
                        <div className="box-title wow fadeInUp">
                            <p className="season text-md fw-medium">Summer Sale</p>
                            <h2 className="fw-medium">{textOverride ?? "50% Off"}</h2>
                            <p className="sub text-md fw-medium">Storewide, for a limited time</p>
                        </div>
                        <div className="box-countdown d-flex justify-content-center wow fadeInUp">
                            <div className="wg-countdown-2">
                                <span className="js-countdown">
                                    <CountdownTimer style={2} />
                                </span>
                            </div>
                        </div>
                        <div className="box-btn wow fadeInUp">
                            <Link to="/shop-default" className="tf-btn btn-white hover-primary">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
