import { Link } from "react-router-dom";
import { useBusiness, useCustomerAuth, resolveImageUrl } from "@merchforge/storefront-sdk";
import Nav from "./components/Nav";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";
import WishlistLength from "../../components/WishlistLength/WishlistLength";
import CartLength from "../../components/CartLength/CartLength";
import { env } from "../../config/env";

/** Site header: a top row (mobile-menu trigger, language/currency, centered logo, search/account/wishlist/cart) over a centered nav row -- the electronics template's own layout, distinct from the fashion template's single-row header. */
export default function Header() {
    const { isAuthenticated, login } = useCustomerAuth();
    const { data: business } = useBusiness();
    const logoImageSrc = resolveImageUrl(business?.logoUrl, env.origin);

    return (
        <header id="header" className="header-default">
            <div className="header-top">
                <div className="container">
                    <div className="row wrapper-header align-items-center">
                        <div className="col-md-4 col-3 d-xl-none">
                            <a href="#mobileMenu" className="mobile-menu" data-bs-toggle="offcanvas" aria-controls="mobileMenu">
                                <i className="icon icon-categories1" />
                            </a>
                        </div>

                        <div className="col-xl-5 d-none d-xl-block">
                            <div className="header-language">
                                <div className="tf-languages">
                                    <LanguageSelect topStart />
                                </div>
                                <div className="tf-currencies">
                                    <CurrencySelect topStart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-2 col-md-4 col-6 text-center">
                            <Link to="/" className="logo-header">
                                {logoImageSrc ? (
                                    <img alt={business?.name ?? "logo"} className="logo" src={logoImageSrc} height={44} />
                                ) : (
                                    <span className="logo-text">{business?.name ?? "Your Logo"}</span>
                                )}
                            </Link>
                        </div>

                        <div className="col-xl-5 col-md-4 col-3">
                            <ul className="nav-icon d-flex justify-content-end align-items-center">
                                <li className="nav-search">
                                    <a href="#search" data-bs-toggle="modal" className="nav-icon-item">
                                        <i className="icon icon-search" />
                                    </a>
                                </li>
                                <li className="nav-account">
                                    {isAuthenticated ? (
                                        <Link to="/account" className="nav-icon-item">
                                            <i className="icon icon-user" />
                                        </Link>
                                    ) : (
                                        <a
                                            href="#"
                                            className="nav-icon-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                login();
                                            }}
                                        >
                                            <i className="icon icon-user" />
                                        </a>
                                    )}
                                </li>
                                <li className="nav-wishlist">
                                    <Link to="/wish-list" className="nav-icon-item">
                                        <i className="icon icon-heart" />
                                        <span className="count-box">
                                            <WishlistLength />
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-cart">
                                    <Link to="/view-cart" className="nav-icon-item">
                                        <i className="icon icon-cart" />
                                        <span className="count-box">
                                            <CartLength />
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom d-none d-xl-block">
                <div className="container">
                    <nav className="box-navigation text-center">
                        <ul className="box-nav-menu">
                            <Nav />
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
