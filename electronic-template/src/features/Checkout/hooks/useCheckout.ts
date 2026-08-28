import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrder, MerchForgeApiError } from "@merchforge/storefront-sdk";
import { useShopContext } from "../../../context/Shop/useShopContext";

export type CheckoutFormValues = {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddressLine1: string;
    shippingAddressLine2: string;
    shippingCity: string;
    shippingState: string;
    shippingPostalCode: string;
    shippingCountry: string;
    customerNotes: string;
};

const INITIAL_VALUES: CheckoutFormValues = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingCity: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingCountry: "",
    customerNotes: "",
};

/**
 * Places the order the storefront's own cart (ShopContext, localStorage) already
 * describes. No price is sent — the SDK's createOrder call carries only
 * productId/quantity per item, and the backend resolves each item's real price and
 * stock itself (see @merchforge/storefront-sdk's CreateOrderInput doc comment).
 */
const useCheckout = () => {
    const { cartProducts, totalPrice, setCartProducts } = useShopContext();
    const navigate = useNavigate();

    const [values, setValues] = useState<CheckoutFormValues>(INITIAL_VALUES);
    const [error, setError] = useState<string | undefined>(undefined);

    const { mutate, isPending } = useCreateOrder();

    const change = (field: keyof CheckoutFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const submit = () => {
        setError(undefined);

        if (cartProducts.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        mutate(
            {
                customerName: values.customerName.trim(),
                customerEmail: values.customerEmail.trim(),
                customerPhone: values.customerPhone.trim() || undefined,
                shippingAddressLine1: values.shippingAddressLine1.trim(),
                shippingAddressLine2: values.shippingAddressLine2.trim() || undefined,
                shippingCity: values.shippingCity.trim(),
                shippingState: values.shippingState.trim() || undefined,
                shippingPostalCode: values.shippingPostalCode.trim(),
                shippingCountry: values.shippingCountry.trim(),
                customerNotes: values.customerNotes.trim() || undefined,
                items: cartProducts.map((item) => ({ productId: item.id, quantity: item.quantity })),
            },
            {
                onSuccess: (order) => {
                    // Cleared only on success — a rejected order (e.g. a sold-out
                    // item) must leave the cart untouched so the customer isn't asked
                    // to rebuild it.
                    setCartProducts([]);
                    navigate(`/order-confirmation/${order.id}`);
                },
                onError: (err) => {
                    setError(
                        err instanceof MerchForgeApiError
                            ? err.message
                            : "Couldn't place your order. Please try again."
                    );
                },
            }
        );
    };

    return {
        values,
        change,
        submit,
        isPending,
        error,
        cartProducts,
        totalPrice,
    };
};

export default useCheckout;
