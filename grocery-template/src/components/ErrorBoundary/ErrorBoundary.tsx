import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * The storefront's one and only render-error safety net. Without this, any
 * uncaught error anywhere in the tree (a bad response shape, a null a component
 * didn't expect) takes down the entire page to a blank white screen with no
 * indication anything went wrong — a real shopper has no way to tell "broken" from
 * "still loading". A class component because React doesn't offer a hook
 * equivalent for componentDidCatch/getDerivedStateFromError.
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Storefront render error:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flat-spacing-24 text-center">
                    <div className="container">
                        <h4 className="mb-3">Something went wrong.</h4>
                        <p className="mb-3">
                            We're sorry — this page hit an unexpected error. Try
                            reloading, or head back to the homepage.
                        </p>
                        <a className="tf-btn btn-dark2 animate-btn" href="/">
                            Back to Home
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
