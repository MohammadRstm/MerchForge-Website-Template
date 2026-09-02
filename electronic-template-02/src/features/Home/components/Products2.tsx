import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useHomeSections } from "../../../hooks/useHomeSections";

/**
 * "Just Arrivals" section. The real "home-phonecase" page presents this as a
 * three-tab carousel (iPhone/Android/Personalized); ported as one flat carousel
 * instead — the real product data behind each card matters more than the tab
 * mechanic, same call made for the Categories tabs on the fashion templates.
 */
export default function Products2() {
    const { hotDeals } = useHomeSections();

    return (
        <section className="bg-white mx_40 radius-16 flat-spacing-8">
            <div className="container">
                <div className="flat-title-tab text-center wow fadeInUp">
                    <div className="box-title">
                        <p className="text-md fw-medium text-uppercase text-primary">Discover our top picks</p>
                        <h4 className="title">Just Arrivals</h4>
                    </div>
                </div>
                <div className="fl-control-sw wow fadeInUp">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-swiper sw-height"
                        slidesPerView={2}
                        spaceBetween={12}
                        speed={800}
                        observer
                        observeParents
                        slidesPerGroup={2}
                        navigation={{ nextEl: ".nav-next-deal", prevEl: ".nav-prev-deal" }}
                        pagination={{ el: ".sw-pagination-deal", clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                            1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {hotDeals.map((product, i) => (
                            <SwiperSlide className="swiper-slide" key={i}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none sw-dot-default sw-pagination-deal justify-content-center" />
                    </Swiper>
                    <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-deal" />
                    <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-deal" />
                </div>
            </div>
        </section>
    );
}
