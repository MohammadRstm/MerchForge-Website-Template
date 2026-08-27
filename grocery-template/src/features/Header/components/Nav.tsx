import { NavLink } from "react-router-dom";

interface NavItem {
    to: string;
    label: string;
    /** Matches nested routes too (e.g. "/product-detail/1"); plain items only match their exact path. */
    end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { to: "/about-us", label: "About Us" },
    { to: "/shop-default", label: "Shop" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/store-location", label: "Location" },
];

/** The header's top-level nav — a single-project storefront doesn't need the source template's demo/shop-layout mega-menus. The logo already links home, so "Home" isn't a separate item. */
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
