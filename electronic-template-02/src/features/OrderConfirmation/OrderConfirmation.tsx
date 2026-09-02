import { Link, useParams } from "react-router-dom";
import { useOrder } from "@merchforge/storefront-sdk";
import PageTitle from "../../components/PageTitle/PageTitle";

/** Reached right after Checkout, or by revisiting /order-confirmation/:orderId directly — the order id itself is the only credential (see the SDK's Order doc comment). */
export default function OrderConfirmation() {
    const { orderId } = useParams<{ orderId: string }>();
    const { data: order, isLoading, isError } = useOrder(orderId);

    return (
        <>
            <PageTitle pageName="Order Confirmation" pageTitle="Thank You!" />
            <section className="flat-spacing-13">
                <div className="container" style={{ maxWidth: 720 }}>
                    {isLoading ? (
                        <p className="text-center">Loading your order…</p>
                    ) : isError || !order ? (
                        <div className="text-center">
                            <p>We couldn't find that order.</p>
                            <Link className="tf-btn btn-dark2 animate-btn" to="/">
                                Back to Home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="text-center" style={{ marginBottom: 24 }}>
                                Your order has been placed. A confirmation was sent to{" "}
                                <strong>{order.customerEmail}</strong>.
                            </p>

                            <div className="cart-box checkout-cart-box" style={{ marginBottom: 24 }}>
                                <div className="text-lg title fw-medium">
                                    Order #{order.id.slice(0, 8).toUpperCase()}
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, margin: "16px 0" }}>
                                    {order.items.map((item) => (
                                        <li
                                            key={item.productId}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 12,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <span>
                                                {item.productTitle} × {item.quantity}
                                            </span>
                                            <span>${item.lineTotal.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="cart-head">
                                    <div className="total-discount text-xl fw-medium">
                                        <span>Total:</span>
                                        <span className="total">${order.total.toFixed(2)} USD</span>
                                    </div>
                                </div>
                            </div>

                            <p>
                                <strong>Shipping to:</strong>
                                <br />
                                {order.shippingAddressLine1}
                                {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""}
                                <br />
                                {order.shippingCity}
                                {order.shippingState ? `, ${order.shippingState}` : ""} {order.shippingPostalCode}
                                <br />
                                {order.shippingCountry}
                            </p>

                            <div className="text-center" style={{ marginTop: 24 }}>
                                <Link className="tf-btn btn-dark2 animate-btn" to="/shop-default">
                                    Continue Shopping
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
