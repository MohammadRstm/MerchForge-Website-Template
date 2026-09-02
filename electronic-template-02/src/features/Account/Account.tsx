import PageTitle from "../../components/PageTitle/PageTitle";
import useAccountPage from "./hooks/useAccountPage";

/** The signed-in customer's profile: edit checkout-prefill details, or log out. */
export default function Account() {
    const { customer, isLoading, isError, values, change, submit, isSaving, saved, handleLogout } = useAccountPage();

    return (
        <>
            <PageTitle pageName="My Account" pageTitle="My Account" />
            <section className="flat-spacing-13">
                <div className="container" style={{ maxWidth: 640 }}>
                    {isLoading ? (
                        <p className="text-center">Loading…</p>
                    ) : isError ? (
                        <p className="text-center">Couldn't load your profile. Please try again.</p>
                    ) : (
                        <>
                            {customer && (
                                <p style={{ marginBottom: 24 }}>
                                    Signed in as <strong>{customer.email}</strong>
                                </p>
                            )}

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
                                            <label htmlFor="firstName">First name*</label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                required
                                                value={values.firstName}
                                                onChange={(e) => change("firstName", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="lastName">Last name*</label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                required
                                                value={values.lastName}
                                                onChange={(e) => change("lastName", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <fieldset>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={values.phone}
                                            onChange={(e) => change("phone", e.target.value)}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label htmlFor="addressLine1">Address</label>
                                        <input
                                            id="addressLine1"
                                            type="text"
                                            value={values.addressLine1}
                                            onChange={(e) => change("addressLine1", e.target.value)}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label htmlFor="addressLine2">Apartment, suite, etc.</label>
                                        <input
                                            id="addressLine2"
                                            type="text"
                                            value={values.addressLine2}
                                            onChange={(e) => change("addressLine2", e.target.value)}
                                        />
                                    </fieldset>

                                    <div className="cols">
                                        <fieldset>
                                            <label htmlFor="city">City</label>
                                            <input
                                                id="city"
                                                type="text"
                                                value={values.city}
                                                onChange={(e) => change("city", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="state">State/Province</label>
                                            <input
                                                id="state"
                                                type="text"
                                                value={values.state}
                                                onChange={(e) => change("state", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <div className="cols">
                                        <fieldset>
                                            <label htmlFor="postalCode">Postal code</label>
                                            <input
                                                id="postalCode"
                                                type="text"
                                                value={values.postalCode}
                                                onChange={(e) => change("postalCode", e.target.value)}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="country">Country</label>
                                            <input
                                                id="country"
                                                type="text"
                                                value={values.country}
                                                onChange={(e) => change("country", e.target.value)}
                                            />
                                        </fieldset>
                                    </div>

                                    <div className="button-submit" style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                        <button className="tf-btn animate-btn" type="submit" disabled={isSaving}>
                                            {isSaving ? "Saving…" : "Save changes"}
                                        </button>
                                        {saved && <span>Saved.</span>}
                                    </div>
                                </div>
                            </form>

                            <div style={{ marginTop: 32 }}>
                                <button type="button" className="tf-btn btn-dark2 animate-btn" onClick={handleLogout}>
                                    Log out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
