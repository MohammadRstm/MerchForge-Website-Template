import PageTitle from "../../components/PageTitle/PageTitle";
import StoreCard from "./components/StoreCard";
import { stores } from "../../data/stores";

const MAP_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27294.62418958524!2d151.25730233429948!3d-33.82005608618041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ab8bc95a137f%3A0x358f04a7f6f5f6a6!2sGrotto%20Point%20Lighthouse!5e0!3m2!1sen!2s!4v1733976867160!5m2!1sen!2s";

export default function StoreLocation() {
    return (
        <>
            <PageTitle pageName="Store Locations" pageTitle="Store Locations" />
            <section className="s-store-location flat-spacing-13">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wg-map">
                                <iframe
                                    src={MAP_EMBED_SRC}
                                    width="100%"
                                    height="589px"
                                    style={{ border: "none" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Store locations map"
                                />
                            </div>
                            <div className="tf-grid-layout lg-col-3 sm-col-2">
                                {stores.map((store) => (
                                    <StoreCard key={store.id} store={store} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
