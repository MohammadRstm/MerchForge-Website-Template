import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import { fashionSlides } from "../../../data/heroSlides";
import { env } from "../../../config/env";

/**
 * The hero slider at the top of the page. Only the first slide's image/headline are
 * ever business-customizable (see the platform's website-customization catalogue,
 * keys heroImage/heroHeadline) — the remaining slides stay static demo content, same
 * curated-scope decision every template using this carousel makes.
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
        <div className="tf-slideshow slider-fashion-1">
            <Swiper
                className="swiper tf-sw-slideshow"
                spaceBetween={0}
                slidesPerView={1}
                speed={800}
                loop
                autoplay={{ delay: 5000 }}
                pagination={{ el: ".spd-fade", clickable: true }}
                modules={[Pagination, Autoplay]}
                dir="ltr"
            >
                {fashionSlides.map((item, index) => {
                    const isFirst = index === 0;
                    const imgSrc = (isFirst && heroImageOverride) || item.imgSrc;
                    const headline = (isFirst && heroHeadline) || item.headline;

                    return (
                        <SwiperSlide className="swiper-slide" key={index}>
                            <div className="fs-cls hover-img">
                                <div className="img-style image">
                                    <img src={imgSrc} alt={item.alt} className="lazyload" width={1920} height={939} />
                                </div>
                                <div className="content align-items-center text-center">
                                    <h3 className="hero-slide-headline">{headline}</h3>
                                    <p className="text-lg">{item.tagline}</p>
                                    <Link to={`/shop-default?category=${item.category}`} className="tf-btn btn-white hover-icon-2 hover-dark">
                                        {item.buttonText}
                                        <i className="icon-arrow-right icon" />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                <div className="sw-dot-default spd-fade justify-content-center" />
            </Swiper>
        </div>
    );
}
