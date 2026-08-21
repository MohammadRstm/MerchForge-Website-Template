import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import type { Product } from "../../../types/product";

interface GallerySlide {
    color: string;
    imgSrc: string;
}

/**
 * The source template hardcodes an 8-slide Black/Yellow/Grey mock gallery here,
 * completely unrelated to whichever product is actually being viewed. Building the
 * slides from the product's own `colors` (falling back to imgSrc/imgHover when a
 * product has none) keeps the same click-a-swatch-jump-to-that-photo interaction
 * but makes the gallery actually show the product you're looking at.
 */
function buildSlides(product: Product): GallerySlide[] {
    if (product.colors && product.colors.length > 0) {
        const seen = new Set<string>();
        return product.colors.filter((color) => {
            if (seen.has(color.img)) return false;
            seen.add(color.img);
            return true;
        }).map((color) => ({ color: color.label, imgSrc: color.img }));
    }

    const slides: GallerySlide[] = [{ color: "Default", imgSrc: product.imgSrc }];
    if (product.imgHover && product.imgHover !== product.imgSrc) {
        slides.push({ color: "Default", imgSrc: product.imgHover });
    }
    return slides;
}

interface ProductGalleryProps {
    product: Product;
    activeColor: string;
    setActiveColor: (color: string) => void;
}

export default function ProductGallery({ product, activeColor, setActiveColor }: ProductGalleryProps) {
    const slides = buildSlides(product);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const mainSwiperRef = useRef<SwiperClass | null>(null);

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

    // Jump the main slider to whichever slide matches the swatch just clicked in ColorSelect.
    useEffect(() => {
        const targetIndex = slides.findIndex((slide) => slide.color === activeColor);
        if (targetIndex >= 0) {
            mainSwiperRef.current?.slideTo(targetIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only when the selected color changes, not on every slides recompute
    }, [activeColor]);

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
                    <SwiperSlide key={index} className="swiper-slide stagger-item" data-color={slide.color}>
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
                    onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        const slide = slides[swiper.activeIndex];
                        if (slide) setActiveColor(slide.color);
                    }}
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
