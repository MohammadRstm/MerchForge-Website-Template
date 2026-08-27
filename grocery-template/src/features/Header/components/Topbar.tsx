import { Fragment } from "react";
import LanguageSelect from "../../../components/LanguageSelect/LanguageSelect";
import CurrencySelect from "../../../components/CurrencySelect/CurrencySelect";

const MARQUEE_ITEMS = ["Return extended to 60 days", "Life-time Guarantes", "Limited-Time Offer"];

/** The thin announcement bar above the header: social links, a scrolling marquee, language/currency. */
export default function Topbar() {
    return (
        <div className="tf-topbar bg-light-green topbar-bg">
            <div className="container">
                <div className="topbar-wraper">
                    <div className="d-none d-xl-block flex-shrink-0">
                        <ul className="topbar-left tf-social-icon">
                            <li>
                                <a href="https://www.facebook.com/" className="social-item social-facebook">
                                    <i className="icon icon-fb" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" className="social-item social-instagram">
                                    <i className="icon icon-instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/" className="social-item social-x">
                                    <i className="icon icon-x" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.snapchat.com/" className="social-item social-snapchat">
                                    <i className="icon icon-snapchat" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="overflow-hidden">
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

                    <div className="d-none d-xl-block flex-shrink-0">
                        <div className="topbar-right">
                            <div className="tf-languages">
                                <LanguageSelect topStart />
                            </div>
                            <div className="tf-currencies">
                                <CurrencySelect topStart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
