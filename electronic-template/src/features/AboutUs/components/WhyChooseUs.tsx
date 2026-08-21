export default function WhyChooseUs() {
    return (
        <section className="flat-spacing-3">
            <div className="container">
                <div className="flat-title-2 text-center">
                    <p className="display-md-2 fw-medium">Why Shop With Us</p>
                    <p className="text-md text-main">
                        A tighter catalog than the big marketplaces, kept that way on purpose —
                        <br className="d-none d-lg-block" />
                        every listing is something we'd actually recommend, not just resell.
                    </p>
                </div>
                <div className="row">
                    <div className="col-xl-7 col-md-6">
                        <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
                            <li className="item">
                                <h6>Genuine Stock Only</h6>
                                <p className="text-md">
                                    We buy direct from authorized distributors, not grey-market resellers — every
                                    device ships with its real warranty intact.
                                </p>
                            </li>
                            <li className="item">
                                <h6>Tested Before It Ships</h6>
                                <p className="text-md">
                                    Every unit is powered on and checked before it leaves our warehouse, not just
                                    pulled off a pallet and boxed.
                                </p>
                            </li>
                            <li className="item">
                                <h6>Support That Knows the Product</h6>
                                <p className="text-md">
                                    Our team actually uses what we sell, so setup and troubleshooting questions get
                                    real answers, not a script.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-5 col-md-6">
                        <div className="image radius-16 overflow-hidden w-100 h-100">
                            <img
                                src="/images/section/about-2.jpg"
                                alt="Inside the MerchForge warehouse"
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
