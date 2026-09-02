export interface Store {
    id: number;
    name: string;
    address: string;
    addressHref: string;
    phone: string;
    phoneHref: string;
    email: string;
    hours: string;
}

/** Rendered by the Store Location page. Same central phone/email as the footer — one support line for every location. */
export const stores: Store[] = [
    {
        id: 1,
        name: "Flagship — Sydney",
        address: "123 Yarran st, Punchbowl, NSW 2196, Australia",
        addressHref: "https://www.google.com/maps?q=123+Yarran+st,+Punchbowl,+NSW+2196,+Australia",
        phone: "(64) 8342 1245",
        phoneHref: "tel:18888383022",
        email: "support@example.com",
        hours: "8am - 7pm, Mon - Sat",
    },
    {
        id: 2,
        name: "Melbourne",
        address: "48 Collins St, Melbourne, VIC 3000, Australia",
        addressHref: "https://www.google.com/maps?q=48+Collins+St,+Melbourne,+VIC+3000,+Australia",
        phone: "(64) 8342 1245",
        phoneHref: "tel:18888383022",
        email: "support@example.com",
        hours: "9am - 6pm, Mon - Sat",
    },
    {
        id: 3,
        name: "Brisbane",
        address: "210 Queen St, Brisbane, QLD 4000, Australia",
        addressHref: "https://www.google.com/maps?q=210+Queen+St,+Brisbane,+QLD+4000,+Australia",
        phone: "(64) 8342 1245",
        phoneHref: "tel:18888383022",
        email: "support@example.com",
        hours: "9am - 6pm, Mon - Sat",
    },
];
