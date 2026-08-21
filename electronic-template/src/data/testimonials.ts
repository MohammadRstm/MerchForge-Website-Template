export interface Testimonial {
    name: string;
    review: string;
    image: string;
    product: string;
    price: string;
    delay: string;
}

/** Rendered by the "Happy Customers" section. */
export const testimonials: Testimonial[] = [
    {
        name: "Ryan T.",
        review: "The AirPods Pro arrived fast and sound incredible. Noise cancellation is a game changer for my commute.",
        image: "/images/avatar/avt-1.png",
        product: "Apple AirPods Pro 2 Wireless Earbuds",
        price: "$170.00",
        delay: "0s",
    },
    {
        name: "Priya K.",
        review: "My Galaxy S21 works flawlessly and the price beat every other store I checked. Packaging was excellent too.",
        image: "/images/avatar/blog-author-1.jpg",
        product: "Galaxy S21 5G 128GB Unlocked Smartphone",
        price: "$399.00",
        delay: "0.1s",
    },
    {
        name: "Marcus D.",
        review: "Great customer service and the smart watch battery life is exactly as advertised. Will shop here again.",
        image: "/images/avatar/blog-author-2.jpg",
        product: "Samsung Galaxy 5 LTE Smart Watch",
        price: "$170.00",
        delay: "0.2s",
    },
    {
        name: "Elena V.",
        review: "Ordered a charger and a power bank together — both well made and shipped in one fast, tidy package.",
        image: "/images/avatar/blog-author-3.jpg",
        product: "10000mAh Portable Power Bank",
        price: "$29.00",
        delay: "0.3s",
    },
];

export interface CartTestimonial {
    imgSrc: string;
    imgWidth: number;
    imgHeight: number;
    name: string;
    review: string;
}

/** Rendered by the cart page sidebar's testimonial swiper. */
export const cartTestimonials: CartTestimonial[] = [
    {
        imgSrc: "/images/avatar/avt-1.png",
        imgWidth: 64,
        imgHeight: 64,
        name: "Ryan T.",
        review: "Fast shipping and genuine parts every time. My go-to store for electronics.",
    },
    {
        imgSrc: "/images/avatar/blog-author-3.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Priya K.",
        review: "Fast shipping and genuine parts every time. My go-to store for electronics.",
    },
    {
        imgSrc: "/images/avatar/blog-author-2.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Marcus D.",
        review: "Fast shipping and genuine parts every time. My go-to store for electronics.",
    },
];
