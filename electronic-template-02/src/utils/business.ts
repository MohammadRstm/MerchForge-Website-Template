import type { Business, BusinessHours } from "@merchforge/storefront-sdk";

/**
 * WhatsAppNumber is stored as digits/E.164 only, never a full URL — the wa.me link is
 * meant to be built client-side, here, not stored as a link (a stored link would be
 * an arbitrary-redirect risk the backend deliberately avoids).
 */
export function buildWhatsAppUrl(whatsAppNumber: string | null | undefined): string | null {
    if (!whatsAppNumber) return null;
    const digits = whatsAppNumber.replace(/[^0-9]/g, "");
    return digits ? `https://wa.me/${digits}` : null;
}

type AddressFields = Pick<Business, "addressLine1" | "addressLine2" | "city" | "state" | "postalCode" | "country">;

/** Null when no part of the address has been set — callers should hide the row entirely rather than render an empty one. */
export function formatAddress(business: AddressFields): string | null {
    const parts = [
        business.addressLine1,
        business.addressLine2,
        business.city,
        business.state,
        business.postalCode,
        business.country,
    ].filter((part): part is string => !!part);

    return parts.length > 0 ? parts.join(", ") : null;
}

const WEEK_DAYS: Array<keyof BusinessHours> = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

const DAY_LABELS: Record<keyof BusinessHours, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
};

export type BusinessHoursLine = { day: string; text: string };

/**
 * One line per day the business has actually configured — a day with no stored
 * value at all is omitted rather than shown as "Closed", since those mean different
 * things (BusinessHoursDay's own null-vs-explicitly-closed distinction).
 */
export function formatBusinessHoursLines(hours: BusinessHours | undefined): BusinessHoursLine[] {
    if (!hours) return [];

    return WEEK_DAYS.filter((day) => hours[day] != null).map((day) => {
        const value = hours[day]!;
        return {
            day: DAY_LABELS[day],
            text: value.closed ? "Closed" : `${value.open ?? "?"} – ${value.close ?? "?"}`,
        };
    });
}
