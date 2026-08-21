interface Review {
    id: number;
    name: string;
    date: string;
    avatar: string;
    rating: number;
    comment: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Emily R.",
        date: "Mar 3rd, 2025",
        avatar: "/images/avatar/blog-author-1.jpg",
        rating: 4,
        comment:
            "Works exactly as described and arrived well within the estimated delivery window. Build quality feels premium for the price. Would buy again!",
    },
    {
        id: 2,
        name: "James L.",
        date: "Mar 3rd, 2025",
        avatar: "/images/avatar/blog-author-2.jpg",
        rating: 5,
        comment: "Setup took two minutes and battery life has been excellent so far. Support was quick to answer a question I had before ordering.",
    },
    {
        id: 3,
        name: "Sophia M.",
        date: "Mar 3rd, 2025",
        avatar: "/images/avatar/blog-author-3.jpg",
        rating: 5,
        comment: "This is my go-to store for electronics now. Prices are fair, packaging is secure, and everything I've ordered has arrived genuine.",
    },
];

/** Static example reviews — no backend to submit the form to, so the "Write a review" form is decorative, matching the source template. */
export default function Reviews() {
    return (
        <>
            <div className="review-heading">
                <h6 className="title">Customer review</h6>
                <div className="box-rate-review">
                    <div className="rating-summary">
                        <ul className="list-star">
                            <li>
                                <i className="icon icon-star" />
                            </li>
                            <li>
                                <i className="icon icon-star" />
                            </li>
                            <li>
                                <i className="icon icon-star" />
                            </li>
                            <li>
                                <i className="icon icon-star" />
                            </li>
                            <li>
                                <span className="count-star text-md">({reviews.length})</span>
                            </li>
                        </ul>
                        <span className="text-md rating-average">4.5/5.0</span>
                    </div>
                </div>
                <a href="#form-review" className="tf-btn btn-dark2 animate-btn">
                    Write a review
                </a>
            </div>
            <div className="review-section">
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li className="review-item" key={review.id}>
                            <div className="review-avt">
                                <img alt={review.name} src={review.avatar} width={100} height={100} />
                            </div>
                            <div className="review-content">
                                <div className="review-info">
                                    <div className="review-meta">
                                        <span className="review-author fw-medium text-md">{review.name}</span>
                                        <span className="review-date text-sm">{review.date}</span>
                                    </div>
                                    <div className={`list-star ${review.rating === 4 ? "star-4" : ""}`}>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <i className="icon icon-star" key={index} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text text-sm text-main-4">{review.comment}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <form id="form-review" onSubmit={(e) => e.preventDefault()} className="form-review">
                    <h6 className="title">Write a review</h6>
                    <p className="note text-md text-main-4">Your email address will not be published. Required fields are marked *</p>
                    <div className="box-rating">
                        <span className="text-md">Your rating *</span>
                        <div className="list-rating-check">
                            {[5, 4, 3, 2, 1].map((n) => (
                                <span key={n}>
                                    <input type="radio" id={`star${n}`} name="rate" defaultValue={n} />
                                    <label htmlFor={`star${n}`} title="text" />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="group-2-ip">
                        <input type="text" placeholder="Name *" />
                        <input type="email" placeholder="Email *" />
                    </div>
                    <textarea name="note" id="note" placeholder="Your review *" defaultValue="" />
                    <button type="submit" className="tf-btn animate-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
