import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomerAuth } from "@merchforge/storefront-sdk";
import PageTitle from "../../components/PageTitle/PageTitle";

/**
 * The one piece of the login/signup handoff this template still owns — everything
 * past reading ?exchangeCode= and handing it to the SDK is fully SDK-internal (token
 * lifecycle, renewal, retry). Reached only via the platform's login/signup redirect,
 * never navigated to directly.
 */
export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { completeExchange } = useCustomerAuth();
    const [error, setError] = useState(false);
    const attempted = useRef(false);

    useEffect(() => {
        // Guards against React StrictMode's double-invoked effects redeeming the
        // same single-use code twice, which would fail the second time regardless.
        if (attempted.current) return;
        attempted.current = true;

        const code = searchParams.get("exchangeCode");

        if (!code) {
            navigate("/", { replace: true });
            return;
        }

        completeExchange(code)
            .then(() => navigate("/", { replace: true }))
            .catch(() => setError(true));
    }, [searchParams, navigate, completeExchange]);

    if (!error) {
        return (
            <>
                <PageTitle pageName="Signing you in" pageTitle="Signing you in" />
                <section className="flat-spacing-13">
                    <div className="container text-center">
                        <p>One moment…</p>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageTitle pageName="Sign in" pageTitle="Sign in" />
            <section className="flat-spacing-13">
                <div className="container text-center">
                    <p>We couldn't sign you in. The link may have expired — please try again.</p>
                </div>
            </section>
        </>
    );
}
