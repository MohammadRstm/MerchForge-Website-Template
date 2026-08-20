import MetaComponent from "../../components/MetaComponent/MetaComponent";
import ProductsModal from "../../components/ProductsModal/ProductsModal";
import Brands from "../../components/Brands/Brands";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Products from "./components/Products";
import Banner from "./components/Banner";
import Products2 from "./components/Products2";
import Banner2 from "./components/Banner2";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Features from "./components/Features";

const metadata = {
    title: "Fashion Store",
    description: "Shop the latest fashion.",
};

/** The storefront home page — ported from the Vineta "home-fashion-02" template. */
export default function Home() {
    return (
        <>
            <MetaComponent meta={metadata} />
            <Hero />
            <NewArrivals />
            <Products />
            <Banner />
            <Products2 />
            <Banner2 />
            <Brands />
            <Testimonials />
            <Blogs />
            <Features />
            <ProductsModal />
        </>
    );
}
