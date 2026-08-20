import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { blogItems } from "../../../data/blogs";

/** "Latest Tips & Trends" section. */
export default function Blogs() {
    return (
        <section className="flat-spacing-3 pt-0">
            <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Latest Tips &amp; Trends</h4>
                    <p className="desc text-main text-md">
                        Discover expert advice, style inspiration, and product updates on our blog.
                    </p>
                </div>
                <div className="hover-sw-nav hover-sw-2">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-swiper"
                        slidesPerView={1}
                        spaceBetween={12}
                        speed={800}
                        observer
                        observeParents
                        slidesPerGroup={1}
                        navigation={{ nextEl: ".nav-next-new", prevEl: ".nav-prev-new" }}
                        pagination={{ el: ".sw-pagination-new", clickable: true }}
                        breakpoints={{
                            577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                            1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
                        }}
                        modules={[Pagination, Navigation]}
                    >
                        {blogItems.map((item) => (
                            <SwiperSlide className="swiper-slide" key={item.id}>
                                <div className="news-item hover-img">
                                    <Link to={`/blog-single/${item.id}`} className="image-box img-style">
                                        <img src={item.imgSrc} alt={item.title} width={696} height={644} />
                                    </Link>
                                    <div className="content">
                                        <Link to={`/blog-single/${item.id}`} className="title fw-medium link text-xl text-line-clamp-2">
                                            {item.title}
                                        </Link>
                                        <Link to={`/blog-single/${item.id}`} className="btn-readmore link">
                                            Read more <i className="icon icon-arr-right" />
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="d-flex d-xl-none sw-dot-default sw-pagination-new justify-content-center" />
                    </Swiper>
                    <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-new" />
                    <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-new" />
                </div>
            </div>
        </section>
    );
}
