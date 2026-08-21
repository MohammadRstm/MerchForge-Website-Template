import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { brandItems } from "../../data/brands";

interface BrandsProps {
    parentClass?: string;
}

/** The brand-logo strip between the two banner sections. */
export default function Brands({ parentClass = "" }: BrandsProps) {
    return (
        <div className={parentClass}>
            <div className="container">
                <Swiper
                    dir="ltr"
                    className="swiper tf-swiper sw-brand"
                    slidesPerView={2}
                    spaceBetween={0}
                    speed={800}
                    observer
                    observeParents
                    slidesPerGroup={2}
                    pagination={{ el: ".sw-pagination-brand", clickable: true }}
                    breakpoints={{
                        575: { slidesPerView: 3 },
                        991: { slidesPerView: 4 },
                        1200: { slidesPerView: 6 },
                    }}
                    modules={[Pagination]}
                >
                    {brandItems.map((item, index) => (
                        <SwiperSlide className="swiper-slide" key={index}>
                            <div className="brand-item wow fadeInLeft" {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}>
                                <img alt="brand" src={item.imgSrc} width={360} height={171} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-brand justify-content-center" />
            </div>
        </div>
    );
}
