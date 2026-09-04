import { Fragment } from "react";

interface StarRatingInputProps {
    /** 0 means nothing picked yet. */
    value: number;
    onChange: (rating: number) => void;
    disabled?: boolean;
    /** Distinguishes the radio group and its label/input ids when more than one exists on a page. */
    name?: string;
}

/**
 * The required 1-5 star picker.
 *
 * The theme already ships a working CSS-only star picker (`.list-rating-check` in
 * public/scss/component/_product.scss) — hidden radios, hover-to-preview via sibling
 * selectors, and `flex-direction: row-reverse` so a DOM order of 5..1 renders left to
 * right as 1..5. This binds React state to that markup rather than restyling it.
 *
 * The inputs and labels must be *direct* children of `.list-rating-check`: every one
 * of those rules is a child or sibling combinator (`> input`, `> label`,
 * `input:checked ~ label`). The source template wrapped each pair in a `<span>`, which
 * broke all of them and left the raw radio buttons showing — harmless while the form
 * was decorative, but not once it does something.
 */
export default function StarRatingInput({
    value,
    onChange,
    disabled = false,
    name = "rate",
}: StarRatingInputProps) {
    return (
        <div className="list-rating-check">
            {[5, 4, 3, 2, 1].map((rating) => (
                <Fragment key={rating}>
                    <input
                        type="radio"
                        id={`${name}-star${rating}`}
                        name={name}
                        value={rating}
                        checked={value === rating}
                        disabled={disabled}
                        onChange={() => onChange(rating)}
                    />
                    <label
                        htmlFor={`${name}-star${rating}`}
                        title={`${rating} ${rating === 1 ? "star" : "stars"}`}
                    />
                </Fragment>
            ))}
        </div>
    );
}
