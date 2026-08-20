import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { categories } from "../../../data/collections";

/** The category-preview slider inside the header's "Shop" mega-menu tab. */
export default function Collections() {
    return (
        <div className="wrapper-sub-collection">
            <Swiper
                dir="ltr"
                className="swiper tf-swiper hover-sw-nav wow fadeInUp"
                slidesPerView={2}
                spaceBetween={24}
                speed={800}
                observer
                observeParents
                slidesPerGroup={2}
                navigation={{ nextEl: ".nav-next-cls-header", prevEl: ".nav-prev-cls-header" }}
                pagination={{ el: ".sw-pagination-cls-header", clickable: true }}
                modules={[Pagination, Navigation]}
            >
                {categories.map((item, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                        <div className="wg-cls style-abs asp-1 hover-img">
                            {/* /shop-default doesn't exist yet, same as most placeholder links copied
                                with this page — see the note on menu.ts. */}
                            <Link to="/shop-default" className="image img-style d-block">
                                <img src={item.imgSrc} alt={item.label} className="lazyload" width={item.width} height={item.height} />
                            </Link>
                            <div className="cls-btn text-center">
                                <Link to="/shop-default" className="tf-btn btn-cls btn-white hover-dark hover-icon-2">
                                    {item.label}
                                    <i className="icon icon-arrow-top-left" />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls-header justify-content-center" />
                <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-cls-header" />
                <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-cls-header" />
            </Swiper>
        </div>
    );
}
