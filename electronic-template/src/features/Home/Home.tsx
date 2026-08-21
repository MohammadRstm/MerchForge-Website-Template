import MetaComponent from "../../components/MetaComponent/MetaComponent";
import Brands from "../../components/Brands/Brands";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Banner from "./components/Banner";
import Products2 from "./components/Products2";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Features from "./components/Features";

const metadata = {
    title: "Electronics Store",
    description: "Shop the latest electronics.",
};

/** The storefront home page — ported from the Vineta "home-electronic" template. */
export default function Home() {
    return (
        <>
            <MetaComponent meta={metadata} />
            <Hero />
            <Marquee />
            <Categories />
            <Products />
            <Banner />
            <Products2 />
            <Testimonials />
            <Brands parentClass="flat-spacing-2" />
            <Blogs />
            <Features />
        </>
    );
}
