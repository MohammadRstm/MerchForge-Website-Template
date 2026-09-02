import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { styleFeatures } from "../../../data/features";

export default function StyleCuratedCarousel() {
    return (
        <section className="flat-spacing-3 pt-0">
            <div className="container">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title">
                        <p className="display-md-2 fw-medium">What We Care About</p>
                    </div>
                    <div className="box-text">
                        <p className="text-md">
                            The short version of what guides every product we add to the catalog.
                        </p>
                    </div>
                </div>
                <Swiper
                    dir="ltr"
                    className="swiper tf-swiper"
                    slidesPerView={1}
                    spaceBetween={12}
                    speed={800}
                    observer
                    observeParents
                    pagination={{ el: ".sw-pagination-iconbox", clickable: true }}
                    breakpoints={{
                        575: { slidesPerView: 2, spaceBetween: 12 },
                        992: { slidesPerView: 3, spaceBetween: 24 },
                    }}
                    modules={[Pagination]}
                >
                    {styleFeatures.map((item) => (
                        <SwiperSlide className="swiper-slide" key={item.title}>
                            <div className="tf-icon-box style-border">
                                <div className="box-icon">
                                    <i className={`icon ${item.icon}`} />
                                </div>
                                <div className="content">
                                    <h6>{item.title}</h6>
                                    <p className="text-sm text-line-clamp-4">{item.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
                </Swiper>
            </div>
        </section>
    );
}
