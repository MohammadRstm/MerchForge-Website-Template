import { Link } from "react-router-dom";
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
        <div className="tf-slideshow slider-fashion-2">
            <Swiper
                className="swiper tf-sw-slideshow"
                spaceBetween={15}
                breakpoints={{
                    0: { slidesPerView: 1.5 },
                    575: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                }}
                dir="ltr"
            >
                {fashionSlides.map((item, index) => {
                    const isFirst = index === 0;
                    const imgSrc = (isFirst && heroImageOverride) || item.imgSrc;

                    return (
                        <SwiperSlide className="swiper-slide" key={index}>
                            <div className="fs-cls hover-img">
                                <div className="img-style image">
                                    <img src={imgSrc} alt={item.alt} className="lazyload" width={610} height={840} />
                                </div>
                                <div className="content">
                                    {isFirst && heroHeadline && (
                                        <h3 className="hero-slide-headline">{heroHeadline}</h3>
                                    )}
                                    <Link to={`/shop-default?category=${item.category}`} className="tf-btn btn-white hover-icon-2 hover-dark">
                                        {item.buttonText}
                                        <i className="icon-arrow-right icon" />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
