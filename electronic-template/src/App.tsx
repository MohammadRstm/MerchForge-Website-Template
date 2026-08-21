import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../public/scss/main.scss";
import { ShopProvider } from "./context/Shop/ShopContext";
import Topbar from "./features/Header/components/Topbar";
import Header from "./features/Header/Header";
import Footer from "./features/Footer/Footer";
import Home from "./features/Home/Home";
import ProductDetail from "./features/ProductDetail/ProductDetail";
import Cart from "./features/Cart/Cart";
import Wishlist from "./features/Wishlist/Wishlist";
import Shop from "./features/Shop/Shop";
import AboutUs from "./features/AboutUs/AboutUs";
import ContactUs from "./features/ContactUs/ContactUs";
import StoreLocation from "./features/StoreLocation/StoreLocation";
import ComingSoon from "./features/ComingSoon/ComingSoon";
import NotFound from "./features/NotFound/NotFound";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import WOW from "./utlis/wow";

function App() {
    // Bootstrap's JS (offcanvas, modal, tab-switching) is only ever used client-side
    // and pulls in its own DOM globals, so it's loaded dynamically after mount
    // rather than imported at the top of the module.
    useEffect(() => {
        import("bootstrap");
    }, []);

    // Hides the header on scroll-down, shows it again on scroll-up. Reads the
    // <header> element directly rather than a ref, matching how Header renders it
    // with a fixed DOM id ("header") for the compiled CSS to target.
    useEffect(() => {
        let lastScrollTop = 0;
        const delta = 5;
        let didScroll = false;
        const header = document.querySelector<HTMLElement>("header");

        const handleScroll = () => {
            didScroll = true;
        };

        const checkScroll = () => {
            if (!didScroll || !header) return;

            const st = window.scrollY || document.documentElement.scrollTop;
            const navbarHeight = header.offsetHeight;

            if (st > navbarHeight) {
                if (st > lastScrollTop + delta) {
                    header.style.top = `-${navbarHeight}px`;
                } else if (st < lastScrollTop - delta) {
                    header.style.top = "0";
                    header.classList.add("header-bg");
                }
            } else {
                header.style.top = "";
                header.classList.remove("header-bg");
            }

            lastScrollTop = st;
            didScroll = false;
        };

        window.addEventListener("scroll", handleScroll);
        const scrollInterval = setInterval(checkScroll, 250);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(scrollInterval);
        };
    }, []);

    // Scroll-reveal: elements carrying a "wow" class (fadeInUp, fadeInLeft, ...)
    // animate in once they enter the viewport.
    useEffect(() => {
        const wow = new WOW({ mobile: false, live: false });
        wow.init();
    }, []);

    return (
        <ShopProvider>
            <Topbar />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/view-cart" element={<Cart />} />
                <Route path="/wish-list" element={<Wishlist />} />
                <Route path="/shop-default" element={<Shop />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/store-location" element={<StoreLocation />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ScrollTop />
        </ShopProvider>
    );
}

export default App;
