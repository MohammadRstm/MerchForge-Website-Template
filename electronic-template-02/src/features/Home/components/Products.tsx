import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useHomeSections } from "../../../hooks/useHomeSections";

/** "Featured Collections" section — heading/eyebrow ported from Vineta's real "home-phonecase" copy. */
export default function Products() {
    const { topPicks } = useHomeSections();

    return (
        <section className="flat-spacing-8 bg-surface">
            <div className="container">
                <div className="flat-title style-between align-items-end wow fadeInUp">
                    <div className="box-title">
                        <p className="text-md fw-medium text-uppercase text-primary">Discover our top picks</p>
                        <h4 className="title">Featured Collections</h4>
                    </div>
                    <Link to="/shop-default" className="btn-underline">
                        View all
                    </Link>
                </div>
                <div className="fl-control-sw">
                    <Swiper
                        dir="ltr"
                        className="sw-height swiper tf-swiper"
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
                        {topPicks.map((product) => (
                            <SwiperSlide className="swiper-slide" key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none sw-dot-default sw-pagination-top-pick justify-content-center" />
                    </Swiper>
                    <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-top-pick" />
                    <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-top-pick" />
                </div>
            </div>
        </section>
    );
}
