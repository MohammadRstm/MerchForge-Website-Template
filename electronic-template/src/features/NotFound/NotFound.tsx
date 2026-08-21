import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flat-spacing-24 text-center">
            <div className="container">
                <h4 className="mb-3">Page not found</h4>
                <Link className="tf-btn btn-dark2 animate-btn" to="/">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
