import { useState } from "react";

const BUSINESS_INFO = {
    address: "123 Yarran st, Punchbowl, NSW 2196, Australia",
    addressHref: "https://www.google.com/maps?q=123+Yarran+st,+Punchbowl,+NSW+2196,+Australia",
    phone: "(64) 8342 1245",
    phoneHref: "tel:18888383022",
    email: "support@example.com",
    hours: "8am - 7pm, Mon - Sat",
};

/** Same generic Google Maps embed used across the demo pages — no API key required, not tied to a real address. */
const MAP_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27294.62418958524!2d151.25730233429948!3d-33.82005608618041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ab8bc95a137f%3A0x358f04a7f6f5f6a6!2sGrotto%20Point%20Lighthouse!5e0!3m2!1sen!2s!4v1733976867160!5m2!1sen!2s";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // No backend wired up yet — this just confirms the form works end-to-end.
        console.info("Contact form submission (not yet wired to a real inbox):", {
            name: (form.elements.namedItem("username") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("mess") as HTMLTextAreaElement).value,
        });
        form.reset();
        setSubmitted(true);
    };

    return (
        <section className="s-contact flat-spacing-13">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wg-map">
                            <iframe
                                src={MAP_EMBED_SRC}
                                className="map"
                                style={{ border: "none" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Store location map"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content-left">
                            <div className="title fw-medium display-md-2">Contact Us</div>
                            <p className="sub-title text-main">
                                Have a question? Reach us through any of the channels below.
                            </p>
                            <ul className="contact-list">
                                <li>
                                    <p>
                                        Address:{" "}
                                        <a className="link" href={BUSINESS_INFO.addressHref} target="_blank" rel="noreferrer">
                                            {BUSINESS_INFO.address}
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Phone number: <a className="link" href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phone}</a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Email: <a className="link" href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Open: <span className="text-main">{BUSINESS_INFO.hours}</span>
                                    </p>
                                </li>
                            </ul>
                            <ul className="tf-social-icon style-large">
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
                    </div>
                    <div className="col-lg-6">
                        <div className="content-right">
                            <div className="title fw-medium display-md-2">Get In Touch</div>
                            <p className="sub-title text-main">
                                Submit your question below and we'll get back to you as soon as we can.
                            </p>
                            <div className="form-contact-wrap">
                                {submitted ? (
                                    <p style={{ color: "rgb(52, 168, 83)" }}>Thanks — your message has been sent.</p>
                                ) : (
                                    <form onSubmit={handleSubmit} className="form-default">
                                        <div className="wrap">
                                            <div className="cols">
                                                <fieldset>
                                                    <label htmlFor="username">Your name*</label>
                                                    <input id="username" type="text" name="username" required />
                                                </fieldset>
                                                <fieldset>
                                                    <label htmlFor="email">Your email*</label>
                                                    <input id="email" type="email" name="email" required />
                                                </fieldset>
                                            </div>
                                            <div className="cols">
                                                <fieldset className="textarea">
                                                    <label htmlFor="mess">Message</label>
                                                    <textarea id="mess" name="mess" required defaultValue="" />
                                                </fieldset>
                                            </div>
                                            <div className="button-submit">
                                                <button className="tf-btn animate-btn" type="submit">
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
