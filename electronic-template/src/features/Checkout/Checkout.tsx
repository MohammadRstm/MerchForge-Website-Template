import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import useCheckout from "./hooks/useCheckout";

/** Customer/shipping form + order summary, submitting the cart ShopContext already tracks. */
export default function Checkout() {
    const { values, change, submit, isPending, error, cartProducts, totalPrice } = useCheckout();

    if (cartProducts.length === 0) {
        return (
            <>
                <PageTitle pageName="Checkout" pageTitle="Checkout" />
                <section className="flat-spacing-13">
                    <div className="container text-center">
                        <p>Your cart is empty.</p>
                        <Link className="tf-btn btn-dark2 animate-btn" to="/shop-default">
                            Continue Shopping
                        </Link>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageTitle pageName="Checkout" pageTitle="Checkout" />
            <section className="flat-spacing-13">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <form
                                className="form-default"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submit();
                                }}
                            >
                                <div className="wrap">
                                    <div className="cols">
                                        <fieldset>
                                            <label htmlFor="customerName">Full name*</label>
                                            <input
                                                id="customerName"
                                                type="text"
                                                required
                                                value={values.customerName}
                                                onChange={(e) => change("customerName", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="customerEmail">Email*</label>
                                            <input
                                                id="customerEmail"
                                                type="email"
                                                required
                                                value={values.customerEmail}
                                                onChange={(e) => change("customerEmail", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <fieldset>
                                        <label htmlFor="customerPhone">Phone</label>
                                        <input
                                            id="customerPhone"
                                            type="tel"
                                            value={values.customerPhone}
                                            onChange={(e) => change("customerPhone", e.target.value)}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label htmlFor="shippingAddressLine1">Address*</label>
                                        <input
                                            id="shippingAddressLine1"
                                            type="text"
                                            required
                                            value={values.shippingAddressLine1}
                                            onChange={(e) => change("shippingAddressLine1", e.target.value)}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label htmlFor="shippingAddressLine2">Apartment, suite, etc.</label>
                                        <input
                                            id="shippingAddressLine2"
                                            type="text"
                                            value={values.shippingAddressLine2}
                                            onChange={(e) => change("shippingAddressLine2", e.target.value)}
                                        />
                                    </fieldset>

                                    <div className="cols">
                                        <fieldset>
                                            <label htmlFor="shippingCity">City*</label>
                                            <input
                                                id="shippingCity"
                                                type="text"
                                                required
                                                value={values.shippingCity}
                                                onChange={(e) => change("shippingCity", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="shippingState">State/Province</label>
                                            <input
                                                id="shippingState"
                                                type="text"
                                                value={values.shippingState}
                                                onChange={(e) => change("shippingState", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <div className="cols">
                                        <fieldset>
                                            <label htmlFor="shippingPostalCode">Postal code*</label>
                                            <input
                                                id="shippingPostalCode"
                                                type="text"
                                                required
                                                value={values.shippingPostalCode}
                                                onChange={(e) => change("shippingPostalCode", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="shippingCountry">Country*</label>
                                            <input
                                                id="shippingCountry"
                                                type="text"
                                                required
                                                value={values.shippingCountry}
                                                onChange={(e) => change("shippingCountry", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <fieldset className="textarea">
                                        <label htmlFor="customerNotes">Order notes</label>
                                        <textarea
                                            id="customerNotes"
                                            value={values.customerNotes}
                                            onChange={(e) => change("customerNotes", e.target.value)}
                                        />
                                    </fieldset>

                                    {error && (
                                        <p role="alert" style={{ color: "#d92d20" }}>
                                            {error}
                                        </p>
                                    )}

                                    <div className="button-submit">
                                        <button className="tf-btn animate-btn" type="submit" disabled={isPending}>
                                            {isPending ? "Placing order…" : "Place order"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-5">
                            <div className="cart-box checkout-cart-box">
                                <div className="text-lg title fw-medium">Order summary</div>
                                <ul style={{ listStyle: "none", padding: 0, margin: "16px 0" }}>
                                    {cartProducts.map((item) => (
                                        <li
                                            key={item.id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 12,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <span>
                                                {item.title} × {item.quantity}
                                            </span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="cart-head">
                                    <div className="total-discount text-xl fw-medium">
                                        <span>Total:</span>
                                        <span className="total">${totalPrice.toFixed(2)} USD</span>
                                    </div>
                                    <p className="text-sm text-dark-4">
                                        Payment isn't collected yet — this confirms your order with the store.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
