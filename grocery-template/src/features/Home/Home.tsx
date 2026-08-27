import MetaComponent from "../../components/MetaComponent/MetaComponent";
import ProductsModal from "../../components/ProductsModal/ProductsModal";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import Products from "./components/Products";
import Banner from "./components/Banner";
import Products2 from "./components/Products2";
import Banner2 from "./components/Banner2";
import Testimonials from "./components/Testimonials";
import Features from "./components/Features";

const metadata = {
    title: "Green Basket Market",
    description: "Fresh, local, and organic groceries delivered to your door.",
};

/** The storefront home page — ported from the Vineta "home-vegetable" template. */
export default function Home() {
    return (
        <>
            <MetaComponent meta={metadata} />
            <Hero />
            <Categories />
            <NewArrivals />
            <Products />
            <Banner />
            <Products2 />
            <Banner2 />
            <Testimonials />
            <Features />
            <ProductsModal />
        </>
    );
}
