import { useEffect, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import type { Product } from "../../../types/product";

interface GallerySlide {
    imgSrc: string;
}

/**
 * The source template hardcodes an 8-slide Black/Yellow/Grey mock gallery here,
 * completely unrelated to whichever product is actually being viewed, and ties each
 * slide to a color swatch. Real products don't have a photo per color variant — a
 * color here is just a hex the merchant picked, not a distinct SKU/photo — so the
 * gallery is built from the product's own uploaded photos instead, and no longer
 * syncs with which swatch is selected in ColorSelect.
 */
function buildSlides(product: Product): GallerySlide[] {
    return product.gallery.map((imgSrc) => ({ imgSrc }));
}

interface ProductGalleryProps {
    product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
    const slides = buildSlides(product);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    // Hover-zoom pane: only worth wiring up at desktop widths where the zoom pane
    // has room to render beside the image.
    useEffect(() => {
        if (window.innerWidth < 1200) return;

        const drifts: Drift[] = [];
        const pane = document.querySelector(".tf-zoom-main");
        document.querySelectorAll(".tf-image-zoom").forEach((el) => {
            drifts.push(
                new Drift(el, {
                    zoomFactor: 2,
                    paneContainer: pane,
                    inlinePane: false,
                    handleTouch: false,
                    hoverBoundingBox: true,
                    containInline: true,
                })
            );
        });

        return () => drifts.forEach((drift) => drift.destroy());
    }, [product.id]);

    // Click-to-enlarge lightbox over the gallery.
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: "#gallery-swiper-started",
            children: ".item",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();
        return () => lightbox.destroy();
    }, [product.id]);

    return (
        <>
            <Swiper
                dir="ltr"
                className="swiper tf-product-media-thumbs other-image-zoom"
                slidesPerView={4}
                direction="vertical"
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={8}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="swiper-slide stagger-item">
                        <div className="item">
                            <img className="lazyload" alt={product.title} src={slide.imgSrc} width={828} height={1241} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flat-wrap-media-product">
                <Swiper
                    modules={[Thumbs, Navigation]}
                    dir="ltr"
                    className="swiper tf-product-media-main"
                    id="gallery-swiper-started"
                    thumbs={{ swiper: thumbsSwiper }}
                    navigation={{ prevEl: ".snbp1", nextEl: ".snbn1" }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                            <a href={slide.imgSrc} target="_blank" rel="noreferrer" className="item" data-pswp-width="552px" data-pswp-height="827px">
                                <img
                                    className="tf-image-zoom lazyload"
                                    data-zoom={slide.imgSrc}
                                    alt={product.title}
                                    src={slide.imgSrc}
                                    width={828}
                                    height={1241}
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-next nav-swiper thumbs-next snbn1" />
                <div className="swiper-button-prev nav-swiper thumbs-prev snbp1" />
            </div>
        </>
    );
}
