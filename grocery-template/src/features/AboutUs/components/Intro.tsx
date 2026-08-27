export default function Intro() {
    return (
        <section className="flat-spacing-3 pb-0">
            <div className="container">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title">
                        <p className="display-lg-2 fw-medium">Welcome to Green Basket Market</p>
                        <p className="text-xl">Groceries worth trusting</p>
                    </div>
                    <div className="box-text">
                        <p className="text-md">
                            We stock what we'd actually want on our own kitchen counter —
                            <br className="d-none d-xl-block" />
                            fresh fruits and vegetables sourced from growers
                            <br className="d-none d-xl-block" />
                            we know by name, not a distant catalog.
                        </p>
                    </div>
                </div>
                <div className="image radius-16 overflow-hidden">
                    <img src="/images/section/about.jpg" alt="Inside Green Basket Market" className="lazyload" width={1440} height={502} />
                </div>
            </div>
        </section>
    );
}
