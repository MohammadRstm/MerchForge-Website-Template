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
        item: "Crop T-shirt",
        price: 80,
        review:
            "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
        testimonialImg: "/images/testimonial/tes-fs1.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Jessica M.",
        authorImg: "/images/testimonial/author/author-fs6.jpg",
        authorImgWidth: 96,
        authorImgHeight: 96,
        item: "Short Sleeve Sweat",
        price: 100,
        review:
            "I love the dress I purchased! The fabric is so soft, and the fit is perfect. I've gotten so many compliments on it. Will definitely shop here again!",
        testimonialImg: "/images/testimonial/tes-fs2.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Lisa P.",
        authorImg: "/images/testimonial/author/author-fs2.jpg",
        authorImgWidth: 128,
        authorImgHeight: 128,
        item: "Loose Fit Tee",
        price: 120,
        review:
            "I was pleasantly surprised by how fast my order arrived. The customer service team was helpful and responsive. Great shopping experience!",
        testimonialImg: "/images/testimonial/tes-fs3.jpg",
        testimonialImgWidth: 366,
        testimonialImgHeight: 465,
    },
    {
        author: "Emily T.",
        authorImg: "/images/testimonial/author/author-fs3.jpg",
        authorImgWidth: 128,
        authorImgHeight: 128,
        item: "Crop T-shirt",
        price: 90,
        review:
            "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
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
        name: "Vinetant P.",
        review: "Stylish, comfortable, and perfect for any occasion! My new favorite fashion destination.",
    },
    {
        imgSrc: "/images/avatar/blog-author-3.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Themesflat",
        review: "Stylish, comfortable, and perfect for any occasion! My new favorite fashion destination.",
    },
    {
        imgSrc: "/images/avatar/blog-author-2.jpg",
        imgWidth: 100,
        imgHeight: 100,
        name: "Henry P.",
        review: "Stylish, comfortable, and perfect for any occasion! My new favorite fashion destination.",
    },
];
