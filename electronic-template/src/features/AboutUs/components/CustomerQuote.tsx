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
                        "Asked a question about compatibility before I ordered and got a real, specific
                        answer within the hour. <br className="d-none d-lg-block" />
                        First electronics store I've used where support actually knew the product."
                    </p>
                    <div className="box-author">
                        <div className="avt">
                            <img alt="MerchForge customer" src="/images/testimonial/tes-about.jpg" width={100} height={100} />
                        </div>
                        <p className="text-md lh-xl-26 fw-medium">A MerchForge customer</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
