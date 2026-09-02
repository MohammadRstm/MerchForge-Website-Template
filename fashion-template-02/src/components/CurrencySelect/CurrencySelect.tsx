import { useEffect, useRef, useState } from "react";

interface CurrencyOption {
    value: string;
    thumbnail: string;
    text: string;
}

const optionsData: CurrencyOption[] = [
    { value: "us", thumbnail: "/images/country/us.png", text: "United States (USD $)" },
    { value: "fr", thumbnail: "/images/country/fr.png", text: "France (EUR €)" },
    { value: "ger", thumbnail: "/images/country/ger.png", text: "Germany (EUR €)" },
    { value: "vn", thumbnail: "/images/country/vn.png", text: "Vietnam (VND ₫)" },
];

interface CurrencySelectProps {
    topStart?: boolean;
    light?: boolean;
}

/** Topbar currency dropdown. Display-only for now — nothing reads the selection or converts prices yet. */
export default function CurrencySelect({ topStart = false, light = false }: CurrencySelectProps) {
    const [selected, setSelected] = useState(optionsData[0]);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div
            ref={ref}
            onClick={() => setIsOpen((pre) => !pre)}
            className={`dropdown bootstrap-select image-select center style-default type-currencies ${light ? "color-white" : ""} dropup`}
        >
            <button
                type="button"
                tabIndex={-1}
                className={`btn dropdown-toggle btn-light ${isOpen ? "show" : ""}`}
                title="USD $ | United States"
            >
                <div className="filter-option">
                    <div className="filter-option-inner">
                        <div className="filter-option-inner-inner">
                            <img src={selected.thumbnail} width="640" height="480" alt="" />
                            {selected.text}
                        </div>
                    </div>
                </div>
            </button>

            <div
                className={`dropdown-menu ${isOpen ? "show" : ""}`}
                style={{
                    position: "absolute",
                    inset: topStart ? "" : "auto auto 0px 0px",
                    margin: 0,
                    transform: `translate(0px, ${topStart ? 22 : -20}px)`,
                }}
            >
                <ul className="dropdown-menu inner show" role="presentation" style={{ marginTop: 0, marginBottom: 0 }}>
                    {optionsData.map((option) => (
                        <li onClick={() => setSelected(option)} key={option.value}>
                            <a className={`dropdown-item ${selected.value === option.value ? "active selected" : ""}`}>
                                <span className="text">
                                    <img src={option.thumbnail} width="640" height="480" alt="" />
                                    {option.text}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
