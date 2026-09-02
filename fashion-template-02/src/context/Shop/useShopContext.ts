import { useContext } from "react";
import { ShopContext } from "./shopContextObject";

/** Split into its own file so ShopContext.tsx only exports the component (fast-refresh friendly). */
export function useShopContext() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error("useShopContext must be used within a <ShopProvider>.");
    }

    return context;
}
