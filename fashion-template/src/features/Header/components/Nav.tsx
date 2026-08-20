import { NavLink } from "react-router-dom";

interface NavItem {
    to: string;
    label: string;
    /** Matches nested routes too (e.g. "/product-detail/1"); plain items only match their exact path. */
    end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { to: "/", label: "Home", end: true },
    { to: "/about-us", label: "About Us" },
    { to: "/store-location", label: "Location" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/coming-soon", label: "Coming Soon" },
];

/** The header's top-level nav — a single-project storefront doesn't need the source template's demo/shop-layout mega-menus. */
export default function Nav() {
    return (
        <>
            {NAV_ITEMS.map((item) => (
                <li className="menu-item" key={item.to}>
                    <NavLink to={item.to} end={item.end} className={({ isActive }) => `item-link ${isActive ? "menuActive" : ""}`}>
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </>
    );
}
