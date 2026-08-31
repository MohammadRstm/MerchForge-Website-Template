/**
 * Rendered instead of the whole storefront when useBusiness() genuinely fails —
 * an unknown/misconfigured businessId, or the API being unreachable. There's no
 * meaningful fallback content to show without a real business (no name, no logo,
 * no catalog owner), so this replaces the entire page rather than letting Header/
 * Footer/every product section each render their own broken-looking empty state.
 */
export default function StoreUnavailable() {
    return (
        <div className="flat-spacing-24 text-center" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="container">
                <h4 className="mb-3">This store isn't available right now.</h4>
                <p>
                    We couldn't load this storefront. Please check the link and try
                    again shortly.
                </p>
            </div>
        </div>
    );
}
