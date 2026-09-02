import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import CountdownTimer from "../../../components/Countdown/Countdown";
import { env } from "../../../config/env";

/**
 * "Limited-Time Sale" countdown banner — markup ported from Vineta's actual
 * s-banner-countdown/banner-cd-phonecase section. This template's "promo banner 2"
 * customization slot (catalogue keys promoBanner2Image/promoBanner2Text). Falls back
 * to the static demo sale content when the business hasn't set either.
 */
export default function Banner2() {
    const { data: business } = useBusiness();
    const imageOverride = resolveImageUrl(
        typeof business?.templateFields.promoBanner2Image === "string" ? business.templateFields.promoBanner2Image : null,
        env.origin
    );
    const textOverride =
        typeof business?.templateFields.promoBanner2Text === "string" ? business.templateFields.promoBanner2Text : null;

    return (
        <section className="s-banner-countdown banner-cd-phonecase">
            <div className="banner-wrap">
                <div className="banner-content text-center">
                    <div className="box-title">
                        <h4>{textOverride ?? "Limited-Time Sale"}</h4>
                        <p className="sub text-md">Get your favorite cases at a discount</p>
                    </div>
                    <div className="box-countdown">
                        <div className="wg-countdown">
                            <span className="js-countdown d-flex justify-content-center">
                                <CountdownTimer style={2} />
                            </span>
                        </div>
                    </div>
                    <div className="box-btn">
                        <Link to="/shop-default" className="tf-btn fw-normal animate-btn">
                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className="image">
                    <img src={imageOverride ?? "/images/banner/cd-phonecase.jpg"} alt="" className="lazyload" />
                </div>
            </div>
        </section>
    );
}
