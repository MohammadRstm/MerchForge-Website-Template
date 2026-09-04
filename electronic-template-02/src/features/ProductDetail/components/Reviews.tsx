import { useEffect, useState } from "react";
import {
    useCustomerAuth,
    useMyProductReview,
    useProductReviews,
    useProductReviewSummary,
    useSubmitProductReview,
    type MerchForgeApiError,
} from "@merchforge/storefront-sdk";
import StarRating from "../../../components/StarRating/StarRating";
import StarRatingInput from "../../../components/StarRatingInput/StarRatingInput";

const PAGE_SIZE = 5;

interface ReviewsProps {
    productId: string;
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/**
 * Real customer reviews for one product: a required 1-5 rating plus an optional
 * comment.
 *
 * Three mutually exclusive things can sit where the form goes, and which one depends
 * on the customer, not the product:
 *   - signed out            -> a prompt that hands off to the platform's login
 *   - signed in, no order   -> reviews are restricted to verified purchasers
 *   - signed in, has order  -> the form, pre-filled if they already reviewed this
 *
 * The list above it is public either way.
 */
export default function Reviews({ productId }: ReviewsProps) {
    const [page, setPage] = useState(1);

    const { isAuthenticated, isLoading: authLoading, login } = useCustomerAuth();

    const { data: reviewsPage, isLoading: reviewsLoading } = useProductReviews(productId, {
        page,
        pageSize: PAGE_SIZE,
    });
    const { data: summary } = useProductReviewSummary(productId);
    const { data: eligibility, isLoading: eligibilityLoading } = useMyProductReview(productId);

    const { mutate: submitReview, isPending: isSubmitting, error: submitError } =
        useSubmitProductReview(productId);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingError, setRatingError] = useState(false);
    const [saved, setSaved] = useState(false);

    const myReview = eligibility?.myReview ?? null;

    // Pre-fills the form from the customer's existing review once it arrives, and
    // re-runs if they switch product. Keyed on the review id rather than the object so
    // a background refetch returning an equal-but-new object can't clobber edits in
    // progress.
    useEffect(() => {
        if (myReview) {
            setRating(myReview.rating);
            setComment(myReview.comment ?? "");
        } else {
            setRating(0);
            setComment("");
        }
        setSaved(false);
        setRatingError(false);
    }, [myReview?.id, productId]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // The rating is the review — a comment on its own isn't submittable. Checked
        // here so the customer sees it immediately rather than after a round trip.
        if (rating < 1) {
            setRatingError(true);
            return;
        }

        setRatingError(false);

        submitReview(
            { rating, comment: comment.trim() || null },
            {
                onSuccess: () => {
                    setSaved(true);
                    setPage(1);
                },
            }
        );
    };

    const totalPages = reviewsPage?.totalPages ?? 0;
    const reviews = reviewsPage?.items ?? [];
    const reviewCount = summary?.reviewCount ?? 0;

    return (
        <>
            <div className="review-heading">
                <h6 className="title">Customer review</h6>
                {/* The histogram belongs inside .box-rate-review, not beside it:
                    .wd-customer-review is a flex row whose left column (.review-heading)
                    is capped at 289px, so a breakdown rendered as a third flex child
                    shrinks to its own content and the bars collapse to a few pixels. */}
                <div className="box-rate-review">
                    <div className="rating-summary">
                        <StarRating value={summary?.averageRating ?? 0} reviewCount={reviewCount} />
                        {summary?.averageRating != null && (
                            <span className="text-md rating-average">
                                {summary.averageRating.toFixed(1)}/5.0
                            </span>
                        )}
                    </div>

                    {reviewCount > 0 && summary && (
                        <div className="mf-rating-breakdown">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = summary.ratingBreakdown[String(star)] ?? 0;
                                const percent = reviewCount === 0 ? 0 : (count / reviewCount) * 100;

                                return (
                                    <div className="rating-breakdown-item" key={star}>
                                        <div className="rating-score">
                                            <span className="text-sm">{star}</span>
                                            <i className="icon icon-star" aria-hidden="true" />
                                        </div>
                                        <div className="rating-bar">
                                            <div className="value" style={{ width: `${percent}%` }} />
                                        </div>
                                        <span className="text-sm">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="review-section">
                {reviewsLoading ? (
                    <p className="text text-sm text-main-4">Loading reviews…</p>
                ) : reviews.length === 0 ? (
                    <p className="text text-sm text-main-4">
                        No reviews yet. Be the first to review this product.
                    </p>
                ) : (
                    <ul className="review-list">
                        {reviews.map((review) => (
                            <li className="review-item" key={review.id}>
                                <div className="review-content">
                                    <div className="review-info">
                                        <div className="review-meta">
                                            <span className="review-author fw-medium text-md">
                                                {review.authorDisplayName}
                                            </span>
                                            <span className="review-date text-sm">
                                                {formatDate(review.createdAt)}
                                            </span>
                                        </div>
                                        <StarRating value={review.rating} />
                                    </div>
                                    {review.comment && (
                                        <p className="text text-sm text-main-4">{review.comment}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {totalPages > 1 && (
                    <div className="mf-review-pagination">
                        <button
                            type="button"
                            className="tf-btn btn-dark2 animate-btn"
                            disabled={page <= 1}
                            onClick={() => setPage((current) => current - 1)}
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            type="button"
                            className="tf-btn btn-dark2 animate-btn"
                            disabled={page >= totalPages}
                            onClick={() => setPage((current) => current + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Waiting on authLoading matters: isAuthenticated is false during the
                    silent refresh on every page load, so rendering the signed-out
                    prompt first would flash it at customers who are signed in. */}
                {authLoading ? null : !isAuthenticated ? (
                    <div className="mf-review-gate" id="form-review">
                        <h6 className="title">Write a review</h6>
                        <p className="mf-review-gate__text text text-sm text-main-4">
                            Sign in to review this product.
                        </p>
                        <button
                            type="button"
                            className="tf-btn animate-btn"
                            onClick={() => login()}
                        >
                            Sign in to review
                        </button>
                    </div>
                ) : eligibilityLoading ? null : !eligibility?.canReview ? (
                    <div className="mf-review-gate" id="form-review">
                        <h6 className="title">Write a review</h6>
                        <p className="mf-review-gate__text text text-sm text-main-4">
                            Only customers who have ordered this product can review it.
                        </p>
                    </div>
                ) : (
                    <form id="form-review" onSubmit={handleSubmit} className="form-review">
                        <h6 className="title">{myReview ? "Edit your review" : "Write a review"}</h6>
                        <p className="note text-md text-main-4">
                            Your rating is required. Your review is optional.
                        </p>

                        {myReview?.isHidden && (
                            <p className="mf-review-status is-error text-sm">
                                This business has hidden your review, so it isn't shown on this page.
                            </p>
                        )}

                        <div className="box-rating">
                            <span className="text-md">Your rating *</span>
                            <StarRatingInput
                                value={rating}
                                onChange={(next) => {
                                    setRating(next);
                                    setRatingError(false);
                                    setSaved(false);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        {ratingError && (
                            <p className="mf-review-status is-error text-sm">
                                Please pick a rating before submitting.
                            </p>
                        )}

                        <textarea
                            name="note"
                            id="note"
                            placeholder="Your review (optional)"
                            value={comment}
                            disabled={isSubmitting}
                            onChange={(event) => {
                                setComment(event.target.value);
                                setSaved(false);
                            }}
                        />

                        <button type="submit" className="tf-btn animate-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting…" : myReview ? "Update review" : "Submit"}
                        </button>

                        {submitError && (
                            <p className="mf-review-status is-error text-sm">
                                {(submitError as MerchForgeApiError).message ??
                                    "Something went wrong. Please try again."}
                            </p>
                        )}

                        {saved && !submitError && (
                            <p className="mf-review-status text-sm">Thanks — your review has been saved.</p>
                        )}
                    </form>
                )}
            </div>
        </>
    );
}
