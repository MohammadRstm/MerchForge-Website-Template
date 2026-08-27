export default function CustomerQuote() {
    return (
        <section className="flat-spacing-15 pt-0">
            <div className="container">
                <div className="box-testimonial-quote text-center">
                    <div className="list-star-default justify-content-center">
                        <i className="icon-star text-green" />
                        <i className="icon-star text-green" />
                        <i className="icon-star text-green" />
                        <i className="icon-star text-green" />
                        <i className="icon-star text-green" />
                    </div>
                    <p className="text-xl-2 lh-xl-32">
                        "The produce actually looks like it was picked this week, not shipped from a
                        warehouse. <br className="d-none d-lg-block" />
                        First grocery order in a while where everything showed up exactly as described."
                    </p>
                    <div className="box-author">
                        <div className="avt">
                            <img alt="Green Basket Market customer" src="/images/testimonial/tes-about.jpg" width={100} height={100} />
                        </div>
                        <p className="text-md lh-xl-26 fw-medium">A Green Basket Market customer</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
