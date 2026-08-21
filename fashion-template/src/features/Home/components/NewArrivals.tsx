import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useCatalog } from "../../../hooks/useCatalog";

const NEW_ARRIVALS_COUNT = 8;

/** "New Arrivals" section — the most recently added products, newest first. */
export default function NewArrivals() {
    const { allProducts } = useCatalog();

    // Sorted by `createdAt`, not array position — whatever gets added most recently
    // to the real catalog shows up here automatically, which is the whole point: a
    // quick visual check that a newly-added product actually made it in.
    const newArrivals = [...allProducts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, NEW_ARRIVALS_COUNT);

    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">New Arrivals</h4>
                    <p className="desc text-main text-md">The latest additions to the catalog, newest first</p>
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
                        navigation={{ nextEl: ".nav-next-new-arrivals", prevEl: ".nav-prev-new-arrivals" }}
                        pagination={{ el: ".sw-pagination-new-arrivals", clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                            1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {newArrivals.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} tooltipDirection="top" styleClass={product.style} />
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none mt_5 sw-dot-default sw-pagination-new-arrivals justify-content-center" />
                    </Swiper>
                    <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-new-arrivals" />
                    <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-new-arrivals" />
                </div>
            </div>
        </section>
    );
}
