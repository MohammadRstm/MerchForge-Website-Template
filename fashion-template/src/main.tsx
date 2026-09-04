import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MerchForgeProvider } from "@merchforge/storefront-sdk";
import App from "./App";
import { env } from "./config/env";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MerchForgeProvider apiUrl={env.apiUrl} businessId={env.businessId} platformUrl={env.platformUrl}>
            {/* BASE_URL is "/" in dev and in a plain build, and the template's own
                subdirectory when deployed to GitHub Pages. React Router needs it as
                the basename or every route would be resolved against the domain
                root. Trailing slash trimmed because basename must not have one. */}
            <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <App />
            </BrowserRouter>
        </MerchForgeProvider>
    </StrictMode>
);
