import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useHomeSections } from "../../../hooks/useHomeSections";

/** "Today's Picks" section. */
export default function Products2() {
    const { limitedTimeDeals } = useHomeSections();

    return (
        <section>
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Today's Picks</h4>
                    <p className="desc text-main text-md">
                        Curated for you, updated as the catalog changes
                    </p>
                </div>
                <div className="hover-sw-nav hover-sw-2 wow fadeInUp">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-swiper wrap-sw-over"
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
                        {limitedTimeDeals.map((product, i) => (
                            <SwiperSlide key={i}>
                                <ProductCard product={product} styleClass={product.style} tooltipDirection="top" />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none mt_5 sw-dot-default sw-pagination-deal justify-content-center" />
                    </Swiper>
                    <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-deal" />
                    <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-deal" />
                </div>
            </div>
        </section>
    );
}
