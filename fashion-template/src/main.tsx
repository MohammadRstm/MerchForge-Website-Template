import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MerchForgeProvider } from "@merchforge/storefront-sdk";
import App from "./App";
import { env } from "./config/env";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MerchForgeProvider apiUrl={env.apiUrl} businessId={env.businessId}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MerchForgeProvider>
    </StrictMode>
);
