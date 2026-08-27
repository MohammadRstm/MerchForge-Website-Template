export interface Testimonial {
    author: string;
    authorImg: string;
    authorImgWidth: number;
    authorImgHeight: number;
    item: string;
    price: number;
    review: string;
    testimonialImg: string;
    testimonialImgWidth: number;
    testimonialImgHeight: number;
}

/** Rendered by the "Customer Reviews" section. */
export const testimonials: Testimonial[] = [
    {
        author: "Emily T.",
        authorImg: "/images/testimonial/author/author-fs1.jpg",
        authorImgWidth: 128,
        authorImgHeight: 128,
        item: "Fresh Produce Box",
        price: 24,
        review:
            "Everything arrives so fresh, and the produce box is always packed with more than I expect. It's made weekly shopping so much easier.",
        testimonialImg: "/images/testimonial/tes-fs1.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Jessica M.",
        authorImg: "/images/testimonial/author/author-fs6.jpg",
        authorImgWidth: 96,
        authorImgHeight: 96,
        item: "Seasonal Fruit Pack",
        price: 18,
        review:
            "Great quality and the delivery is always on time. I've gotten so much of my weekly fruit here since I found this store!",
        testimonialImg: "/images/testimonial/tes-fs2.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Lisa P.",
        authorImg: "/images/testimonial/author/author-fs2.jpg",
        authorImgWidth: 128,
        authorImgHeight: 128,
        item: "Weekly Grocery Bundle",
        price: 42,
        review:
            "I was pleasantly surprised by how fast my order arrived. The customer service team was helpful and responsive. Great shopping experience!",
        testimonialImg: "/images/testimonial/tes-fs3.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Daniel R.",
        authorImg: "/images/testimonial/author/author-fs3.jpg",
        authorImgWidth: 128,
        authorImgHeight: 128,
        item: "Fresh Vegetable Basket",
        price: 15,
        review:
            "The quality of the produce exceeded my expectations. Everything feels fresh and the prices are fair.",
        testimonialImg: "/images/testimonial/tes-fs4.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
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
export const testimonials12: CartTestimonial[] = [
    {
        imgSrc: "/images/avatar/avt-1.png",
        imgWidth: 64,
        imgHeight: 64,
        name: "Priya N.",
        review: "Fresh, reliable, and always well packed. My go-to for grocery shopping now.",
    },
    {
        imgSrc: "/images/avatar/blog-author-3.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Marcus D.",
        review: "Great range of local and organic goods. Delivery is fast and everything arrives fresh.",
    },
    {
        imgSrc: "/images/avatar/blog-author-2.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Henry P.",
        review: "Easy to shop, fair prices, and the quality is consistently good. Highly recommend.",
    },
];
