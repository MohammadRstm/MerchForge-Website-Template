import MetaComponent from "../../components/MetaComponent/MetaComponent";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Banner2 from "./components/Banner2";
import FeatureTagline from "./components/FeatureTagline";
import Products2 from "./components/Products2";
import Banner from "./components/Banner";
import Testimonials from "./components/Testimonials";

const metadata = {
    title: "Phone Case Store",
    description: "Protective, stylish phone cases for every device.",
};

/** The storefront home page — ported from the Vineta "home-phonecase" template. */
export default function Home() {
    return (
        <>
            <MetaComponent meta={metadata} />
            <Hero />
            <Categories />
            <Products />
            <Banner2 />
            <FeatureTagline />
            <Products2 />
            <Banner />
            <Testimonials />
        </>
    );
}
