import Description from "./Description";
import Material from "./Material";
import ReturnPolicies from "./ReturnPolicies";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";

/**
 * The static sections, which render the same content on every product and so take no
 * props. Reviews is deliberately not one of them — it needs the product id — and is
 * appended separately below.
 */
const sections = [
    { id: "description", label: "Descriptions", Content: Description },
    { id: "material", label: "Care & Safety", Content: Material },
    { id: "returnPolicies", label: "Return Policies", Content: ReturnPolicies },
    { id: "additionalInfo", label: "Additional Information", Content: AdditionalInfo },
];

const REVIEWS_SECTION_ID = "reviews";

interface DescriptionTabsProps {
    productId: string;
}

interface AccordionSectionProps {
    id: string;
    label: string;
    bodyClass?: string;
    children: React.ReactNode;
}

function AccordionSection({ id, label, bodyClass, children }: AccordionSectionProps) {
    return (
        <div className="widget-accordion wd-product-descriptions">
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
                <div className={`accordion-body ${bodyClass ?? "widget-desc"}`}>{children}</div>
            </div>
        </div>
    );
}

export default function DescriptionTabs({ productId }: DescriptionTabsProps) {
    return (
        <section className="flat-spacing pt-0">
            <div className="container">
                {sections.map(({ id, label, Content }) => (
                    <AccordionSection id={id} label={label} key={id}>
                        <Content />
                    </AccordionSection>
                ))}

                <AccordionSection
                    id={REVIEWS_SECTION_ID}
                    label="Reviews"
                    bodyClass="wd-customer-review"
                >
                    <Reviews productId={productId} />
                </AccordionSection>
            </div>
        </section>
    );
}
