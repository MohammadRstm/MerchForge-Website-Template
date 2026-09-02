import { valuesFeatures } from "../../../data/features";

/** A static card grid, not a carousel — a deliberately different rhythm from the fashion template's swiper-based "Style Curated" section. */
export default function ValuesGrid() {
    return (
        <section className="flat-spacing-3 pt-0">
            <div className="container">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title">
                        <p className="display-md-2 fw-medium">What We Care About</p>
                    </div>
                    <div className="box-text">
                        <p className="text-md">The short version of what guides every product we list.</p>
                    </div>
                </div>
                <div className="tf-grid-layout md-col-3">
                    {valuesFeatures.map((item) => (
                        <div className="tf-icon-box style-border" key={item.title}>
                            <div className="box-icon">
                                <i className={`icon ${item.icon}`} />
                            </div>
                            <div className="content">
                                <h6>{item.title}</h6>
                                <p className="text-sm text-line-clamp-4">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
