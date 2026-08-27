export default function WhyChooseUs() {
    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="flat-title-2 text-center">
                    <p className="display-md-2 fw-medium">Why Shop With Us</p>
                    <p className="text-md text-main">
                        A neighborhood grocer, kept small on purpose — every item is one we're willing to
                        <br className="d-none d-lg-block" />
                        stand behind, not just move off the shelf.
                    </p>
                </div>
                <div className="row">
                    <div className="col-xl-7 col-md-6">
                        <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
                            <li className="item">
                                <h6>Sourced Responsibly</h6>
                                <p className="text-md">
                                    We work with a short list of local farms and producers we've actually visited,
                                    not the cheapest bid — fair pay and mindful farming aren't a marketing line here.
                                </p>
                            </li>
                            <li className="item">
                                <h6>Freshness First</h6>
                                <p className="text-md">
                                    Short supply chains and small batches — produce that moves fast off the truck
                                    and onto the shelf, not out of a warehouse.
                                </p>
                            </li>
                            <li className="item">
                                <h6>Straightforward Service</h6>
                                <p className="text-md">
                                    Real people behind the support inbox, clear ingredient and storage info up
                                    front, and returns that don't require a fight.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-5 col-md-6">
                        <div className="image radius-16 overflow-hidden w-100 h-100">
                            <img
                                src="/images/section/about-2.jpg"
                                alt="Fresh groceries at Green Basket Market"
                                className="lazyload w-100 h-100 object-fit-cover"
                                width={586}
                                height={586}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
