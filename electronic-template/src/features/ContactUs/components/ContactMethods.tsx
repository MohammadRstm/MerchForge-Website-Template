interface ContactMethod {
    icon: string;
    title: string;
    detail: string;
    href: string;
}

const METHODS: ContactMethod[] = [
    { icon: "icon-mail", title: "Email Us", detail: "support@example.com", href: "mailto:support@example.com" },
    { icon: "icon-phone", title: "Call Us", detail: "(64) 8342 1245", href: "tel:18888383022" },
    { icon: "icon-location", title: "Visit Us", detail: "123 Yarran st, Punchbowl, NSW", href: "#store-map" },
];

/** A quick-scan row of contact methods above the form — the fashion template's contact page goes straight into the map + split layout without this. */
export default function ContactMethods() {
    return (
        <section className="flat-spacing-3 pb-0">
            <div className="container">
                <div className="tf-grid-layout md-col-3">
                    {METHODS.map((method) => (
                        <a href={method.href} className="tf-icon-box style-border" key={method.title}>
                            <div className="box-icon">
                                <i className={`icon ${method.icon}`} />
                            </div>
                            <div className="content">
                                <h6>{method.title}</h6>
                                <p className="text-sm">{method.detail}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
