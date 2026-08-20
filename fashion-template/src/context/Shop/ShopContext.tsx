import React, { useEffect, useState, type ReactNode } from "react";
import { allProducts } from "../../data/products";
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
    addProductToCart: (id: number, qty?: number, isModal?: boolean) => void;
    isAddedToCartProducts: (id: number) => boolean;
    updateQuantity: (id: number, qty: number) => void;

    wishList: number[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
    isAddedtoWishlist: (id: number) => boolean;

    compareItem: number[];
    setCompareItem: React.Dispatch<React.SetStateAction<number[]>>;
    addToCompareItem: (id: number) => void;
    removeFromCompareItem: (id: number) => void;
    isAddedtoCompareItem: (id: number) => boolean;

    quickViewItem: Product;
    setQuickViewItem: React.Dispatch<React.SetStateAction<Product>>;
    quickAddItem: number;
    setQuickAddItem: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Cart, wishlist and compare state for the storefront, backed by localStorage.
 *
 * Placeholder data layer: `addProductToCart`/`quickViewItem` resolve an id against
 * `allProducts` in src/data/products.ts, the dummy catalog. Once the SDK is wired
 * in, swap that lookup for real product data — every consumer (ProductCard,
 * CartLength, WishlistLength) reads this context by shape, not by where the data
 * comes from, so nothing downstream needs to change.
 *
 * The context object lives in ./shopContextObject.ts and the `useShopContext` hook
 * in ./useShopContext.ts — a file that exports both a component and a
 * context/hook breaks fast refresh.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
    // Lazy initializers read localStorage exactly once, at mount — no effect
    // needed to "hydrate" state after the fact, and no render sees the empty
    // default before the stored value lands.
    const [cartProducts, setCartProducts] = useState<CartItem[]>(() => {
        const stored = JSON.parse(localStorage.getItem("cartList") ?? "null") as CartItem[] | null;
        return stored?.length ? stored : [];
    });
    const [wishList, setWishList] = useState<number[]>(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist") ?? "null") as number[] | null;
        return stored?.length ? stored : [1, 2, 3];
    });
    const [compareItem, setCompareItem] = useState<number[]>([1, 2, 3]);
    const [quickViewItem, setQuickViewItem] = useState<Product>(allProducts[0]);
    const [quickAddItem, setQuickAddItem] = useState<number>(1);

    // Derived from cartProducts every render rather than mirrored into its own
    // state — that would need an effect to stay in sync and would lag one render
    // behind every cart change.
    const totalPrice = cartProducts.reduce((accumulator, product) => accumulator + product.quantity * product.price, 0);

    const isAddedToCartProducts = (id: number) => cartProducts.some((elm) => elm.id === id);

    const addProductToCart = (id: number, qty?: number, isModal = true) => {
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

    const updateQuantity = (id: number, qty: number) => {
        if (!isAddedToCartProducts(id)) {
            return;
        }

        setCartProducts((pre) => pre.map((elm) => (elm.id === id ? { ...elm, quantity: qty } : elm)));
    };

    const addToWishlist = (id: number) => {
        setWishList((pre) => (pre.includes(id) ? pre.filter((elm) => elm !== id) : [...pre, id]));
    };

    const removeFromWishlist = (id: number) => {
        setWishList((pre) => pre.filter((elm) => elm !== id));
    };

    const isAddedtoWishlist = (id: number) => wishList.includes(id);

    const addToCompareItem = (id: number) => {
        setCompareItem((pre) => (pre.includes(id) ? pre : [...pre, id]));
    };

    const removeFromCompareItem = (id: number) => {
        setCompareItem((pre) => pre.filter((elm) => elm !== id));
    };

    const isAddedtoCompareItem = (id: number) => compareItem.includes(id);

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
