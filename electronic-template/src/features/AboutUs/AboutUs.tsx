import Intro from "./components/Intro";
import Stats from "./components/Stats";
import WhyChooseUs from "./components/WhyChooseUs";
import ValuesGrid from "./components/ValuesGrid";
import CustomerQuote from "./components/CustomerQuote";

/**
 * Structured differently from the fashion template's About page (which opens
 * straight into a mission statement): leads with a numbers strip for a quick
 * proof-of-scale, and closes with a static value-card grid instead of a carousel.
 */
export default function AboutUs() {
    return (
        <>
            <Intro />
            <Stats />
            <WhyChooseUs />
            <ValuesGrid />
            <CustomerQuote />
        </>
    );
}
