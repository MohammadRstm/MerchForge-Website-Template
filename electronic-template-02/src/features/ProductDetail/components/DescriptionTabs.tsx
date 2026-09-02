import Description from "./Description";
import Material from "./Material";
import ReturnPolicies from "./ReturnPolicies";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";

const sections = [
    { id: "description", label: "Descriptions", Content: Description },
    { id: "material", label: "Care & Safety", Content: Material },
    { id: "returnPolicies", label: "Return Policies", Content: ReturnPolicies },
    { id: "additionalInfo", label: "Additional Information", Content: AdditionalInfo },
    { id: "reviews", label: "Reviews", Content: Reviews, bodyClass: "wd-customer-review" },
];

export default function DescriptionTabs() {
    return (
        <section className="flat-spacing pt-0">
            <div className="container">
                {sections.map(({ id, label, Content, bodyClass }) => (
                    <div className="widget-accordion wd-product-descriptions" key={id}>
                        <div
                            className="accordion-title collapsed"
                            data-bs-target={`#${id}`}
                            data-bs-toggle="collapse"
                            aria-expanded="true"
                            aria-controls={id}
                            role="button"
                        >
                            <span>{label}</span>
                            <span className="icon icon-arrow-down" />
                        </div>
                        <div id={id} className="collapse">
                            <div className={`accordion-body ${bodyClass ?? "widget-desc"}`}>
                                <Content />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
