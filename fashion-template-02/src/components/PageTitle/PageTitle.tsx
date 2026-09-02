import { Link } from "react-router-dom";

interface PageTitleProps {
    pageName: string;
    pageTitle: string;
}

/** The centered "Home / X" banner used atop non-home pages (cart, wishlist, ...). */
export default function PageTitle({ pageName, pageTitle }: PageTitleProps) {
    return (
        <section className="tf-page-title">
            <div className="container">
                <div className="box-title text-center">
                    <h4 className="title">{pageTitle}</h4>
                    <div className="breadcrumb-list">
                        <Link className="breadcrumb-item" to="/">
                            Home
                        </Link>
                        <div className="breadcrumb-item dot">
                            <span />
                        </div>
                        <div className="breadcrumb-item current">{pageName}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
