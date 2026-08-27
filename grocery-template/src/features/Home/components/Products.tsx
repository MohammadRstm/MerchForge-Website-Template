import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useHomeSections } from "../../../hooks/useHomeSections";

/** "Top Picks You'll Love" section. */
export default function Products() {
    const { topPicks } = useHomeSections();

    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Top Picks You'll Love</h4>
                    <p className="desc text-main text-md">
                        Explore our most popular picks that customers can't get enough of
                    </p>
                </div>
                <div className="hover-sw-nav hover-sw-2">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-swiper wrap-sw-over"
                        slidesPerView={2}
                        spaceBetween={12}
                        speed={800}
                        observer
                        observeParents
                        slidesPerGroup={2}
                        navigation={{ nextEl: ".nav-next-top-pick", prevEl: ".nav-prev-top-pick" }}
                        pagination={{ el: ".sw-pagination-top-pick", clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                            1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {topPicks.map((product, i) => (
                            <SwiperSlide key={i}>
                                <ProductCard product={product} tooltipDirection="top" styleClass={product.style} />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none mt_5 sw-dot-default sw-pagination-top-pick justify-content-center" />
                    </Swiper>
                    <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-top-pick" />
                    <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-top-pick" />
                </div>
            </div>
        </section>
    );
}
