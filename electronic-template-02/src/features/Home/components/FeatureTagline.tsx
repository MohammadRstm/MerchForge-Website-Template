const FEATURES = [
    {
        iconClass: "icon-protection",
        title: "Durable Protection",
        text: "Our cases are designed to withstand drops and scratches, keeping your phone safe.",
    },
    {
        iconClass: "icon-designs",
        title: "Stylish Designs",
        text: "Choose from a wide range of trendy and unique designs that suit your style.",
    },
    {
        iconClass: "icon-fit",
        title: "Perfect Fit",
        text: "Each case is precisely crafted to fit your phone model, ensuring easy access to all buttons and ports.",
    },
    {
        iconClass: "icon-quality",
        title: "Affordable Quality",
        text: "Enjoy premium protection without breaking the bank.",
    },
];

/**
 * "What Make Us Different?" section — markup ported from Vineta's actual
 * banner-tagline-phonecase block: a background image with a 4-item icon list
 * overlaid on top. Static demo content, not business-customizable.
 */
export default function FeatureTagline() {
    return (
        <section className="flat-spacing-3">
            <div className="container-3">
                <div className="banner-tagline-phonecase hover-img hover-shine">
                    <div className="image shine-item img-style">
                        <img src="/images/banner/phonecase.jpg" alt="" className="lazyload" />
                    </div>
                    <div className="content wow fadeInUp">
                        <h4>What Make Us Different?</h4>
                        <ul className="list-tagline">
                            {FEATURES.map((feature) => (
                                <li key={feature.title}>
                                    <div className="icon">
                                        <i className={feature.iconClass} />
                                    </div>
                                    <div className="box-text">
                                        <h6>{feature.title}</h6>
                                        <p className="text-md">{feature.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
