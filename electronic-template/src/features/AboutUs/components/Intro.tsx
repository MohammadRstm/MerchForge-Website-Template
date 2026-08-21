export default function Intro() {
    return (
        <section className="flat-spacing-3 pb-0">
            <div className="container">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title">
                        <p className="display-lg-2 fw-medium">Welcome to MerchForge</p>
                        <p className="text-xl">Tech that's actually worth your money</p>
                    </div>
                    <div className="box-text">
                        <p className="text-md">
                            We test every device we list before it goes on the shelf — no drop-shipped
                            <br className="d-none d-xl-block" />
                            unknowns, no knockoffs. Just real hardware from brands we'd hand to a friend,
                            <br className="d-none d-xl-block" />
                            backed by a support team that actually answers.
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
