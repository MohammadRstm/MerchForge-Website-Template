import { Fragment } from "react";

const MARQUEE_ITEMS = ["50% Off On Selected Items", "New Arrival"];

/** The scrolling sale banner between the hero and the categories row. */
export default function Marquee() {
    return (
        <div className="marquee-sale bg-light-green-2">
            <div className="marquee-wrapper">
                <div className="initial-child-container">
                    {Array.from({ length: 7 }).map((_, repeat) =>
                        MARQUEE_ITEMS.map((text, i) => (
                            <Fragment key={`${repeat}-${i}`}>
                                <div className="marquee-child-item">
                                    <p className="display-xs fw-medium">{text}</p>
                                </div>
                                <div className="marquee-child-item">
                                    <i className="icon-flash-star" />
                                </div>
                            </Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
