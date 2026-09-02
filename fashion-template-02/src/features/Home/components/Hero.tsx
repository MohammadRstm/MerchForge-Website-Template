import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { fashionSlides } from "../../../data/heroSlides";
import { env } from "../../../config/env";

/**
 * The hero slider at the top of the page — markup ported from Vineta's actual
 * "Fashion Style 1" slider (slider-viewport/slider-fashion-1/slider-default,
 * slider-wrap/box-content/content-slider), not the 3-card layout Style 2 uses.
 * Only the first slide's image/headline are ever business-customizable (see the
 * platform's website-customization catalogue, keys heroImage/heroHeadline) — the
 * remaining slides stay static demo content, same curated-scope decision every
 * template using this carousel makes.
 */
export default function Hero() {
    const { data: business } = useBusiness();
    const heroImageOverride = resolveImageUrl(
        typeof business?.templateFields.heroImage === "string" ? business.templateFields.heroImage : null,
        env.origin
    );
    const heroHeadline =
        typeof business?.templateFields.heroHeadline === "string" ? business.templateFields.heroHeadline : null;

    return (
        <section className="tf-slideshow slider-viewport slider-fashion-1 slider-default">
            <Swiper
                className="swiper tf-sw-slideshow slider-effect-fade"
                effect="fade"
                loop
                speed={800}
                autoplay={{ delay: 5000 }}
                pagination={{ el: ".spd-fade", clickable: true }}
                modules={[Pagination, Autoplay, EffectFade]}
                dir="ltr"
            >
                {fashionSlides.map((item, index) => {
                    const isFirst = index === 0;
                    const imgSrc = (isFirst && heroImageOverride) || item.imgSrc;
                    const headline = (isFirst && heroHeadline) || item.headline;

                    return (
                        <SwiperSlide key={index}>
                            <div className={`slider-wrap bg-type-${index + 1}`}>
                                <div className="image">
                                    <img src={imgSrc} alt={item.alt} className="lazyload" width={1920} height={939} />
                                </div>
                                <div className="box-content">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 col-12 col-sm-6">
                                                <div className="content-slider">
                                                    <div className="box-title-slider">
                                                        <h2 className="heading fw-medium text-dark-5">{headline}</h2>
                                                        <p className="sub text-md text-dark-5">{item.tagline}</p>
                                                    </div>
                                                    <div className="box-btn-slider">
                                                        <Link to={`/shop-default?category=${item.category}`} className="tf-btn btn-dark2 animate-btn">
                                                            {item.buttonText}
                                                            <i className="icon icon-arr-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                <div className="sw-dot-default spd-fade justify-content-center" />
            </Swiper>
        </section>
    );
}
