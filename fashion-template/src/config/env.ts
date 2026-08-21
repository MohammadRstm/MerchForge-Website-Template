function required(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required env var ${name}. Copy .env.example to .env and fill it in.`);
    }
    return value;
}

const apiOrigin = required("VITE_API_ORIGIN", import.meta.env.VITE_API_ORIGIN).replace(/\/+$/, "");

/**
 * The template's only link to a specific business right now: which store's catalog
 * to render. A future multi-tenant deployment would resolve this from the request's
 * hostname instead of a build-time env var, but nothing else in the app needs to
 * change for that -- everything reads businessId from here, not from a literal.
 *
 * Two derived URLs, not one: the SDK's routes live under /api, but uploaded product
 * images are static files served from the API's own origin without that prefix --
 * resolving an image against `apiUrl` instead of `origin` 404s.
 */
export const env = {
    origin: apiOrigin,
    apiUrl: `${apiOrigin}/api`,
    businessId: required("VITE_BUSINESS_ID", import.meta.env.VITE_BUSINESS_ID),
};
