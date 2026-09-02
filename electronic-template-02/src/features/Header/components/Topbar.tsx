import { Fragment } from "react";

const MARQUEE_ITEMS = ["Return extended to 60 days", "Life-time Guarantes", "Limited-Time Offer"];

/**
 * The thin announcement bar above the header: just a scrolling marquee. Unlike the
 * fashion template's Topbar, language/currency selection lives in the header's own
 * top row here (see Header.tsx), so it isn't duplicated in both places.
 */
export default function Topbar() {
    return (
        <div className="tf-topbar bg-dark-5 topbar-bg">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-6 overflow-hidden">
                        <div className="topbar-center marquee-wrapper">
                            <div className="initial-child-container">
                                {/* Repeated 5x, each item followed by its own dot element, so the CSS
                                    marquee animation scrolls a long enough strip with no visible seam. */}
                                {Array.from({ length: 5 }).map((_, repeat) =>
                                    MARQUEE_ITEMS.map((text, i) => (
                                        <Fragment key={`${repeat}-${i}`}>
                                            <div className="marquee-child-item">
                                                <p>{text}</p>
                                            </div>
                                            <div className="marquee-child-item">
                                                <span className="dot" />
                                            </div>
                                        </Fragment>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
