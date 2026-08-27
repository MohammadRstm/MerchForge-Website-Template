import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import CartLength from "../../components/CartLength/CartLength";

interface HeaderProps {
    fullWidth?: boolean;
}

/** Site header: mobile-menu trigger, mega-menu nav, logo, and the search/cart icons. No login or wishlist -- not useful for this storefront. */
export default function Header({ fullWidth = false }: HeaderProps) {
    return (
        <header id="header" className="header-default">
            <div className={fullWidth ? "container-full" : "container"}>
                <div className="row wrapper-header align-items-center">
                    <div className="col-md-4 col-3 d-xl-none">
                        <a href="#mobileMenu" className="mobile-menu" data-bs-toggle="offcanvas" aria-controls="mobileMenu">
                            <i className="icon icon-categories1" />
                        </a>
                    </div>

                    <div className="col-xxl-5 col-xl-6 d-none d-xl-block">
                        <nav className="box-navigation text-center">
                            <ul className="box-nav-menu justify-content-start">
                                <Nav />
                            </ul>
                        </nav>
                    </div>

                    <div className="col-xl-2 col-md-4 col-6 text-xxl-center">
                        <Link to="/" className="logo-header">
                            <img alt="logo" className="logo" src="/images/logo/logo.svg" width={148} height={44} />
                        </Link>
                    </div>

                    <div className="col-xxl-5 col-xl-4 col-md-4 col-3">
                        <ul className="nav-icon d-flex justify-content-end align-items-center">
                            <li className="nav-search">
                                <a href="#search" data-bs-toggle="modal" className="nav-icon-item">
                                    <i className="icon icon-search" />
                                </a>
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
        </header>
    );
}
