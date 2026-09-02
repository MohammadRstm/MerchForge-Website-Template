import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlides } from "../../../data/heroSlides";
import { env } from "../../../config/env";

/**
 * The hero slider at the top of the page — markup ported from Vineta's actual
 * "home-phonecase" slider (tf-slideshow/slider-phonecase/slider-default), which unlike
 * the electronic template's slides has no bg-type modifier and a distinct text-column
 * width per slide instead. Only the first slide's image/headline are ever
 * business-customizable (catalogue keys heroImage/heroHeadline); the rest stay static
 * demo content, same curated-scope decision every template using this carousel makes.
 *
 * The static slides' own heading uses dangerouslySetInnerHTML because it may embed a
 * <br /> for a two-line layout — safe for this developer-authored demo copy, but a
 * business-supplied headline must never go through that same path (a stored-XSS
 * vector against that business's own storefront visitors), so the override renders
 * as plain text instead.
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
        <section className="tf-slideshow slider-phonecase slider-default">
            <Swiper
                className="swiper tf-sw-slideshow slider-effect-fade"
                effect="fade"
                loop
                speed={800}
                autoplay={{ delay: 5000 }}
                pagination={{ el: ".spd-phonecase", clickable: true }}
                modules={[Pagination, Autoplay, EffectFade]}
                dir="ltr"
            >
                {heroSlides.map((slide, index) => {
                    const isFirst = index === 0;
                    const imgSrc = (isFirst && heroImageOverride) || slide.imgSrc;

                    return (
                        <SwiperSlide key={index} className="swiper-slide">
                            <div className="slider-wrap">
                                <div className="image">
                                    <img src={imgSrc} alt="slider" className="lazyload" />
                                </div>
                                <div className="box-content">
                                    <div className="container">
                                        <div className="row">
                                            <div className={slide.colClass}>
                                                <div className="content-slider">
                                                    <div className="box-title-slider">
                                                        {isFirst && heroHeadline ? (
                                                            <h2 className={`heading display-xl-2 fw-medium fade-item fade-item-1 ${slide.textClass}`}>
                                                                {heroHeadline}
                                                            </h2>
                                                        ) : (
                                                            <h2
                                                                className={`heading display-xl-2 fw-medium fade-item fade-item-1 ${slide.textClass}`}
                                                                dangerouslySetInnerHTML={{ __html: slide.heading }}
                                                            />
                                                        )}
                                                        <p className={`sub text-xl fade-item fade-item-2 ${slide.textClass}`}>{slide.subTitle}</p>
                                                    </div>
                                                    <div className="box-btn-slider fade-item fade-item-3">
                                                        <Link to="/shop-default" className={slide.btnClass}>
                                                            Shop Collection
                                                            <i className="icon icon-arrow-top-left" />
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
                <div className="wrap-pagination">
                    <div className="container">
                        <div className="sw-dots style-2 sw-pagination-slider justify-content-center spd-phonecase" />
                    </div>
                </div>
            </Swiper>
        </section>
    );
}
