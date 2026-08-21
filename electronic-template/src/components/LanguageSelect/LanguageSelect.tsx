import { useEffect, useRef, useState } from "react";

interface LanguageOption {
    id: string;
    label: string;
}

const languageOptions: LanguageOption[] = [
    { id: "en", label: "English" },
    { id: "vt", label: "Vietnam" },
];

interface LanguageSelectProps {
    topStart?: boolean;
}

/** Topbar language dropdown. Display-only for now — nothing reads the selection yet. */
export default function LanguageSelect({ topStart = false }: LanguageSelectProps) {
    const [selected, setSelected] = useState(languageOptions[0]);
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
            className="dropdown bootstrap-select image-select center style-default type-languages dropup"
            onClick={() => setIsOpen((pre) => !pre)}
            ref={ref}
        >
            <button type="button" tabIndex={-1} className={`btn dropdown-toggle btn-light ${isOpen ? "show" : ""}`}>
                <div className="filter-option">
                    <div className="filter-option-inner">
                        <div className="filter-option-inner-inner">{selected.label}</div>
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
                    {languageOptions.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => setSelected(option)}
                            className={selected.id === option.id ? "selected active" : ""}
                        >
                            <a className={`dropdown-item ${selected.id === option.id ? "active selected" : ""}`}>
                                <span className="text">{option.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
