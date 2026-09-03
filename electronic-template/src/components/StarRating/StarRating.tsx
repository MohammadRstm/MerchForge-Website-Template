interface StarRatingProps {
    /** 0-5. Rounded to the nearest whole star for the fill. */
    value: number;
    /** Renders "(N reviews)" after the stars when given. */
    reviewCount?: number;
    className?: string;
}

/**
 * Five stars with the first N filled, for displaying a rating.
 *
 * Uses its own `mf-star-N` classes (defined in public/scss/custom.scss) rather than
 * the theme's `.star-N` modifiers, which are scoped to
 * `.wd-customer-review .review-item .review-content` and so would silently do nothing
 * on a product card or a product heading. One component that works everywhere beats
 * two that each work in one place.
 */
export default function StarRating({ value, reviewCount, className }: StarRatingProps) {
    const filled = Math.min(5, Math.max(0, Math.round(value)));

    const label =
        reviewCount === 0
            ? "No reviews yet"
            : `Rated ${value.toFixed(1)} out of 5`;

    return (
        <div className={`product-rate ${className ?? ""}`}>
            <div className={`list-star mf-star mf-star-${filled}`} role="img" aria-label={label}>
                {Array.from({ length: 5 }, (_, index) => (
                    <i className="icon icon-star" key={index} aria-hidden="true" />
                ))}
            </div>
            {reviewCount !== undefined && (
                <span className="count-review">
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
            )}
        </div>
    );
}
