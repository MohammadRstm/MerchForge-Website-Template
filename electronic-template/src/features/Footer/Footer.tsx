import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBusiness, resolveImageUrl } from "@merchforge/storefront-sdk";
import SocialLinksList from "../../components/SocialLinksList/SocialLinksList";
import { env } from "../../config/env";
import { buildWhatsAppUrl, formatAddress } from "../../utils/business";

const PAYMENT_LOGOS: Array<{ file: string; width: number; height: number }> = [
    { file: "EximBank", width: 80, height: 50 },
    { file: "ApplePay", width: 90, height: 64 },
    { file: "DinersClub", width: 90, height: 64 },
    { file: "Discover", width: 80, height: 50 },
    { file: "GooglePay", width: 90, height: 64 },
    { file: "Mastercard-2", width: 80, height: 50 },
    { file: "Mastercard", width: 90, height: 64 },
    { file: "Shop", width: 80, height: 50 },
    { file: "UnionPay", width: 80, height: 50 },
    { file: "Visa", width: 90, height: 64 },
];

/** Site footer: contact info, newsletter form, link columns, and payment logos. */
export default function Footer() {
    const { data: business } = useBusiness();
    const logoImageSrc = resolveImageUrl(business?.logoUrl, env.origin);
    const address = business ? formatAddress(business) : null;
    const whatsAppUrl = buildWhatsAppUrl(business?.whatsAppNumber);

    const [success, setSuccess] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // The source template posted to its own demo backend
        // (express-brevomail.vercel.app) — a third party unrelated to this store.
        // Point this at a real newsletter provider before shipping; for now it just
        // confirms the form works without sending anywhere.
        console.info("Newsletter signup (not yet wired to a real provider):", form.email.value);
        form.reset();
        setSuccess(true);
        handleShowMessage();
    };

    useEffect(() => {
        const headings = document.querySelectorAll<HTMLElement>(".footer-heading-mobile");

        const toggleOpen = (event: Event) => {
            const parent = (event.target as HTMLElement).closest(".footer-col-block");
            const content = parent?.querySelector<HTMLElement>(".tf-collapse-content");

            if (!parent || !content) return;

            if (parent.classList.contains("open")) {
                parent.classList.remove("open");
                content.style.height = "0px";
            } else {
                parent.classList.add("open");
                content.style.height = `${content.scrollHeight + 10}px`;
            }
        };

        headings.forEach((heading) => heading.addEventListener("click", toggleOpen));
        return () => headings.forEach((heading) => heading.removeEventListener("click", toggleOpen));
    }, []);

    return (
        <footer id="footer" className="footer-default xl-pb-70">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-top-wrap">
                        <div className="footer-logo">
                            <Link to="/">
                                {logoImageSrc ? (
                                    <img className="logo" alt={business?.name ?? "logo"} src={logoImageSrc} height={44} />
                                ) : (
                                    <span className="logo-text">{business?.name ?? "Your Logo"}</span>
                                )}
                            </Link>
                        </div>
                        <SocialLinksList socialLinks={business?.socialLinks} />
                    </div>
                </div>
            </div>

            <div className="footer-body">
                <div className="container">
                    <div className="row-footer">
                        <div className="footer-col-block s1">
                            <div className="footer-heading footer-heading-mobile text-xl fw-medium">Business Contact</div>
                            <div className="tf-collapse-content">
                                <div className="footer-contact">
                                    <ul className="footer-info">
                                        {address && (
                                            <li className="item">
                                                <span className="box-icon">
                                                    <i className="icon icon-location" />
                                                </span>
                                                <a
                                                    target="_blank"
                                                    href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                                                    rel="noreferrer"
                                                >
                                                    {address}
                                                </a>
                                            </li>
                                        )}
                                        {business?.contactPhone && (
                                            <li className="item">
                                                <span className="box-icon">
                                                    <i className="icon icon-phone" />
                                                </span>
                                                <a href={`tel:${business.contactPhone}`}>{business.contactPhone}</a>
                                            </li>
                                        )}
                                        {whatsAppUrl && (
                                            <li className="item">
                                                <span className="box-icon">
                                                    <i className="icon icon-phone" />
                                                </span>
                                                <a href={whatsAppUrl} target="_blank" rel="noreferrer">
                                                    WhatsApp
                                                </a>
                                            </li>
                                        )}
                                        {business?.contactEmail && (
                                            <li className="item">
                                                <span className="box-icon">
                                                    <i className="icon icon-mail" />
                                                </span>
                                                <a href={`mailto:${business.contactEmail}`}>{business.contactEmail}</a>
                                            </li>
                                        )}
                                    </ul>
                                    {address && (
                                        <a
                                            href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="tf-btn btn-line-dark fw-normal"
                                        >
                                            <span className="text-sm">Get Direction</span>
                                            <i className="icon-arrow-top-left fs-8" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="footer-inner-wrap footer-col-block s2">
                            <div className="footer-heading footer-heading-mobile text-xl fw-medium">Subscribe Newsletter</div>
                            <div className="tf-collapse-content">
                                <div className="footer-newsletter">
                                    <p>
                                        We invite you to register to read the latest news, offers and events about our
                                        company. We promise not spam your inbox.
                                    </p>
                                    <div className={`tfSubscribeMsg footer-sub-element ${showMessage ? "active" : ""}`}>
                                        {success ? (
                                            <p style={{ color: "rgb(52, 168, 83)" }}>You have successfully subscribed.</p>
                                        ) : (
                                            <p style={{ color: "red" }}>Something went wrong</p>
                                        )}
                                    </div>
                                    <form onSubmit={sendEmail} id="subscribe-form" className="form-newsletter">
                                        <div className="subscribe-content">
                                            <fieldset className="email">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="subscribe-email"
                                                    placeholder="Email address"
                                                    required
                                                />
                                            </fieldset>
                                            <div className="button-submit">
                                                <button className="subscribe-button animate-btn" type="submit">
                                                    <i className="icon icon-arrow-top-left" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="footer-inner-wrap s3">
                            <div className="footer-col-block inner-col">
                                <div className="footer-heading footer-heading-mobile text-xl fw-medium">About Us</div>
                                <div className="tf-collapse-content">
                                    <ul className="footer-menu-list">
                                        <li>
                                            <Link to="/about-us">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact-us">Contact Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/store-location">Our Store</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-col-block inner-col">
                                <div className="footer-heading footer-heading-mobile text-xl fw-medium">Resource</div>
                                <div className="tf-collapse-content">
                                    <ul className="footer-menu-list">
                                        <li>
                                            <Link to="/privacy-policy">Privacy Policies</Link>
                                        </li>
                                        <li>
                                            <Link to="/term-and-condition">Terms &amp; Conditions</Link>
                                        </li>
                                        <li>
                                            <Link to="/return-and-refund">Returns &amp; Refunds</Link>
                                        </li>
                                        <li>
                                            <Link to="/faq">FAQ's</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-wrap">
                        <p className="text-dark">
                            Copyright © {new Date().getFullYear()}. All Rights Reserved.
                        </p>
                        <ul className="tf-payment">
                            {PAYMENT_LOGOS.map(({ file, width, height }) => (
                                <li className="item" key={file}>
                                    <img alt={file} src={`/images/payment/${file}.png`} width={width} height={height} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
