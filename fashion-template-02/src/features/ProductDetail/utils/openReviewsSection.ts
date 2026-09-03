export const REVIEWS_SECTION_ID = "reviews";

/**
 * Opens the Reviews accordion section and scrolls to it.
 *
 * A plain `href="#reviews"` does not work here: the section is a Bootstrap
 * `.collapse` that starts closed, so the browser scrolls to a zero-height element and
 * the reviews stay hidden. Clicking the accordion's own toggle drives Bootstrap
 * through its normal path — which is already wired up by `data-bs-toggle` — rather
 * than importing the Collapse API just for this.
 */
export function openReviewsSection(): void {
    const panel = document.getElementById(REVIEWS_SECTION_ID);

    if (!panel) {
        return;
    }

    if (!panel.classList.contains("show")) {
        const toggle = document.querySelector<HTMLElement>(
            `[data-bs-target="#${REVIEWS_SECTION_ID}"]`
        );
        toggle?.click();
    }

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
}
