import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { heroSlides } from "../../../data/heroSlides";
import { env } from "../../../config/env";

/**
 * The full-bleed hero slider at the top of the page — fades between slides on
 * autoplay. Only the first slide's image/headline are ever business-customizable
 * (catalogue keys heroImage/heroHeadline); the rest stay static demo content.
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
        <div className="tf-slideshow slider-electronic slider-default">
            <Swiper
                className="swiper tf-sw-slideshow slider-effect-fade"
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true, el: ".spd11" }}
                dir="ltr"
            >
                {heroSlides.map((slide, index) => {
                    const isFirst = index === 0;
                    const imgSrc = (isFirst && heroImageOverride) || slide.imgSrc;

                    return (
                        <SwiperSlide key={index} className={`swiper-slide${slide.reverse ? " reverse-slide" : ""}`}>
                            <div className={`slider-wrap ${slide.bgType}`}>
                                <div className="image">
                                    <img src={imgSrc} alt="slider" className="lazyload" width={slide.imgWidth} height={slide.imgHeight} />
                                </div>
                                <div className="box-content">
                                    <div className="container">
                                        <div className="row">
                                            <div
                                                className={
                                                    slide.reverse
                                                        ? "offset-lg-8 col-lg-4 col-sm-6 offset-6 col-12"
                                                        : "col-lg-12 col-12 col-sm-6"
                                                }
                                            >
                                                <div className="content-slider">
                                                    <div className="box-title-slider">
                                                        <p className="sub text-md fw-medium fade-item fade-item-1 text-dark-3">{slide.subTitle}</p>
                                                        {isFirst && heroHeadline ? (
                                                            <h2 className="heading fw-medium fade-item fade-item-2 text-dark-3">
                                                                {heroHeadline}
                                                            </h2>
                                                        ) : (
                                                            <h2
                                                                className="heading fw-medium fade-item fade-item-2 text-dark-3"
                                                                dangerouslySetInnerHTML={{ __html: slide.heading }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="box-btn-slider fade-item fade-item-3">
                                                        <Link to="/shop-default" className="tf-btn btn-dark2 animate-btn">
                                                            Shop Now
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

                <div className="wrap-pagination">
                    <div className="container">
                        <div className="sw-dots sw-pagination-slider justify-content-center spd11" />
                    </div>
                </div>
            </Swiper>
        </div>
    );
}
