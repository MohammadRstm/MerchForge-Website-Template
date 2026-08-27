import { createContext } from "react";
import type { ShopContextValue } from "./ShopContext";

/**
 * The raw context object, isolated in its own file: a file that exports both a
 * component and a context (or hook) breaks fast refresh.
 */
export const ShopContext = createContext<ShopContextValue | null>(null);
