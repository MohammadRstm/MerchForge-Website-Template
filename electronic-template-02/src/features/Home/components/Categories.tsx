import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { categoryTiles } from "../../../data/collections";

/**
 * The home page's "Categories" strip — decorative tiles linking into the shop. Markup
 * ported from Vineta's real "home-phonecase" Categories section: circular tiles
 * (wg-cls style-circle), not the square ones the electronic template uses.
 */
export default function Categories() {
    return (
        <section className="flat-spacing-11">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Categories</h4>
                </div>
                <div className="wow fadeInUp">
                    <div className="fl-control-sw pos1">
                        <Swiper
                            dir="ltr"
                            className="swiper tf-swiper"
                            slidesPerView={2}
                            spaceBetween={12}
                            speed={800}
                            observer
                            observeParents
                            slidesPerGroup={2}
                            navigation={{ nextEl: ".nav-next-categories", prevEl: ".nav-prev-categories" }}
                            pagination={{ el: ".sw-pagination-categories", clickable: true }}
                            breakpoints={{
                                575: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                                768: { slidesPerView: 4, spaceBetween: 12, slidesPerGroup: 4 },
                                992: { slidesPerView: 5, spaceBetween: 24, slidesPerGroup: 4 },
                                1200: { slidesPerView: 6, spaceBetween: 24, slidesPerGroup: 4 },
                            }}
                            modules={[Pagination, Navigation]}
                        >
                            {categoryTiles.map((category, index) => (
                                <SwiperSlide className="swiper-slide" key={index}>
                                    <div className="wg-cls style-circle hover-img">
                                        <Link to="/shop-default" className="image img-style d-block">
                                            <img src={category.imgSrc} alt={category.alt} className="lazyload" width={440} height={440} />
                                        </Link>
                                        <div className="cls-content text-center">
                                            <Link to="/shop-default" className="link text-md fw-medium">
                                                {category.title}
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            <div className="d-flex d-xl-none sw-dot-default sw-pagination-categories justify-content-center" />
                        </Swiper>
                        <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-categories" />
                        <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-categories" />
                    </div>
                </div>
            </div>
        </section>
    );
}
