interface Stat {
    value: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "15+", label: "Years in electronics retail" },
    { value: "500K+", label: "Orders shipped worldwide" },
    { value: "1,200+", label: "Products in the catalog" },
    { value: "4.8/5", label: "Average customer rating" },
];

/** A quick-scan numbers strip — the kind of proof-of-scale an electronics shop leads with, unlike the fashion template's mission statement opener. */
export default function Stats() {
    return (
        <section className="flat-spacing-3 pt-0">
            <div className="container">
                <div className="row g-4 text-center">
                    {STATS.map((stat) => (
                        <div className="col-6 col-md-3" key={stat.label}>
                            <p className="display-md-2 fw-medium mb-0">{stat.value}</p>
                            <p className="text-md text-main">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
