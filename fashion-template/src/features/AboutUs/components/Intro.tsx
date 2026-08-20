export default function Intro() {
    return (
        <section className="flat-spacing-3 pb-0">
            <div className="container">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title">
                        <p className="display-lg-2 fw-medium">Welcome to MerchForge</p>
                        <p className="text-xl">Clothes worth keeping</p>
                    </div>
                    <div className="box-text">
                        <p className="text-md">
                            We put together a catalog of everyday pieces we'd actually wear ourselves —
                            <br className="d-none d-xl-block" />
                            nothing trend-chasing, nothing disposable. Just clean design, real fabric,
                            <br className="d-none d-xl-block" />
                            and sizing that doesn't stop at "medium".
                        </p>
                    </div>
                </div>
                <div className="image radius-16 overflow-hidden">
                    <img src="/images/section/about.jpg" alt="Inside the MerchForge studio" className="lazyload" width={1440} height={502} />
                </div>
            </div>
        </section>
    );
}
