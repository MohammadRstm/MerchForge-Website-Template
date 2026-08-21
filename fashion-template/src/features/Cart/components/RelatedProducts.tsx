import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useCatalog } from "../../../hooks/useCatalog";

export default function RelatedProducts() {
    const { allProducts } = useCatalog();
    const related = allProducts.slice(0, 8);

    return (
        <section className="flat-spacing pt-0">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">You May Also Like</h4>
                </div>
                <div className="fl-control-sw pos2">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-swiper wrap-sw-over"
                        slidesPerView={2}
                        spaceBetween={12}
                        speed={800}
                        observer
                        observeParents
                        slidesPerGroup={2}
                        navigation={{ nextEl: ".nav-next-also", prevEl: ".nav-prev-also" }}
                        pagination={{ el: ".sw-pagination-also", clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                            1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {related.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} styleClass="style-2" tooltipDirection="top" />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none sw-dot-default sw-pagination-also justify-content-center" />
                    </Swiper>
                    <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-also" />
                    <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-also" />
                </div>
            </div>
        </section>
    );
}
