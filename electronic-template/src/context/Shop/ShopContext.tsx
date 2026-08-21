import React, { useEffect, useState, type ReactNode } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { openCartModal } from "../../utlis/openCartModal";
import { ShopContext } from "./shopContextObject";
import type { Product } from "../../types/product";

export interface CartItem extends Product {
    quantity: number;
}

export interface ShopContextValue {
    cartProducts: CartItem[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
    totalPrice: number;
    addProductToCart: (id: string, qty?: number, isModal?: boolean) => void;
    isAddedToCartProducts: (id: string) => boolean;
    updateQuantity: (id: string, qty: number) => void;
    removeFromCart: (id: string) => void;

    wishList: string[];
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    isAddedtoWishlist: (id: string) => boolean;

    compareItem: string[];
    setCompareItem: React.Dispatch<React.SetStateAction<string[]>>;
    addToCompareItem: (id: string) => void;
    removeFromCompareItem: (id: string) => void;
    isAddedtoCompareItem: (id: string) => boolean;

    quickViewItem: Product | null;
    setQuickViewItem: React.Dispatch<React.SetStateAction<Product | null>>;
    quickAddItem: string | null;
    setQuickAddItem: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Cart, wishlist and compare state for the storefront, backed by localStorage.
 *
 * `addProductToCart` resolves an id against the real catalog (useCatalog, backed by
 * @merchforge/storefront-sdk) — every consumer (ProductCard, CartLength,
 * WishlistLength) reads this context by shape, not by where the data comes from, so
 * nothing downstream needed to change when the data source did.
 *
 * The context object lives in ./shopContextObject.ts and the `useShopContext` hook
 * in ./useShopContext.ts — a file that exports both a component and a
 * context/hook breaks fast refresh.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
    const { allProducts } = useCatalog();

    // Lazy initializers read localStorage exactly once, at mount — no effect
    // needed to "hydrate" state after the fact, and no render sees the empty
    // default before the stored value lands.
    const [cartProducts, setCartProducts] = useState<CartItem[]>(() => {
        const stored = JSON.parse(localStorage.getItem("cartList") ?? "null") as CartItem[] | null;
        return stored?.length ? stored : [];
    });
    const [wishList, setWishList] = useState<string[]>(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist") ?? "null") as string[] | null;
        return stored?.length ? stored : [];
    });
    const [compareItem, setCompareItem] = useState<string[]>([]);
    const [quickViewItem, setQuickViewItem] = useState<Product | null>(null);
    const [quickAddItem, setQuickAddItem] = useState<string | null>(null);

    // Derived from cartProducts every render rather than mirrored into its own
    // state — that would need an effect to stay in sync and would lag one render
    // behind every cart change.
    const totalPrice = cartProducts.reduce((accumulator, product) => accumulator + product.quantity * product.price, 0);

    const isAddedToCartProducts = (id: string) => cartProducts.some((elm) => elm.id === id);

    const addProductToCart = (id: string, qty?: number, isModal = true) => {
        if (isAddedToCartProducts(id)) {
            return;
        }

        const product = allProducts.find((elm) => elm.id === id);

        if (!product) {
            return;
        }

        const item: CartItem = { ...product, quantity: qty ?? 1 };
        setCartProducts((pre) => [...pre, item]);

        if (isModal) {
            openCartModal();
        }
    };

    const updateQuantity = (id: string, qty: number) => {
        if (!isAddedToCartProducts(id)) {
            return;
        }

        setCartProducts((pre) => pre.map((elm) => (elm.id === id ? { ...elm, quantity: qty } : elm)));
    };

    const removeFromCart = (id: string) => {
        setCartProducts((pre) => pre.filter((elm) => elm.id !== id));
    };

    const addToWishlist = (id: string) => {
        setWishList((pre) => (pre.includes(id) ? pre.filter((elm) => elm !== id) : [...pre, id]));
    };

    const removeFromWishlist = (id: string) => {
        setWishList((pre) => pre.filter((elm) => elm !== id));
    };

    const isAddedtoWishlist = (id: string) => wishList.includes(id);

    const addToCompareItem = (id: string) => {
        setCompareItem((pre) => (pre.includes(id) ? pre : [...pre, id]));
    };

    const removeFromCompareItem = (id: string) => {
        setCompareItem((pre) => pre.filter((elm) => elm !== id));
    };

    const isAddedtoCompareItem = (id: string) => compareItem.includes(id);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }, [cartProducts]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);

    const value: ShopContextValue = {
        cartProducts,
        setCartProducts,
        totalPrice,
        addProductToCart,
        isAddedToCartProducts,
        updateQuantity,
        removeFromCart,

        wishList,
        addToWishlist,
        removeFromWishlist,
        isAddedtoWishlist,

        compareItem,
        setCompareItem,
        addToCompareItem,
        removeFromCompareItem,
        isAddedtoCompareItem,

        quickViewItem,
        setQuickViewItem,
        quickAddItem,
        setQuickAddItem,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
