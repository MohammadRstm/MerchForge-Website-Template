import { useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../../components/Countdown/Countdown";

export default function ComingSoon() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // No mailing list wired up yet — this just confirms the signup form works.
        console.info("Notify-me signup (not yet wired to a real list):", (form.elements.namedItem("email-form") as HTMLInputElement).value);
        form.reset();
        setSubmitted(true);
    };

    return (
        <section className="s-coming-soon">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wg-coming-soon">
                            <p className="title text-center">New Arrivals, Coming Soon</p>
                            <p className="text-md sub text-main text-center">
                                The next drop is still in production. Leave your email
                                <br />
                                and we'll let you know the moment it's live.
                            </p>
                            <div className="wg-countdown">
                                <span className="js-countdown">
                                    <CountdownTimer style={2} />
                                </span>
                            </div>
                            <div className="form-email-wrap">
                                {submitted ? (
                                    <p className="text-center" style={{ color: "rgb(52, 168, 83)" }}>
                                        You're on the list — we'll email you when it drops.
                                    </p>
                                ) : (
                                    <form onSubmit={handleSubmit} className="form-newsletter">
                                        <div className="subscribe-content">
                                            <fieldset className="email">
                                                <input
                                                    type="email"
                                                    name="email-form"
                                                    className="subscribe-email"
                                                    placeholder="Your email address"
                                                    required
                                                />
                                            </fieldset>
                                            <div className="button-submit">
                                                <button className="tf-btn animate-btn" type="submit">
                                                    <span className="text-sm">Get Notify</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="bot">
                                <Link to="/" className="tf-btn btn-fill hover-primary animate-btn">
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
