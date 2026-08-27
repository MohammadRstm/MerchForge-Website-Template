import { Link } from "react-router-dom";
import type { Product } from "../../../types/product";

interface BreadcrumbProps {
    product: Product;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
    return (
        <div className="breadcrumb-sec">
            <div className="container">
                <div className="breadcrumb-wrap">
                    <div className="breadcrumb-list">
                        <Link to="/" className="breadcrumb-item">
                            Home
                        </Link>
                        <div className="breadcrumb-item dot">
                            <span />
                        </div>
                        <div className="breadcrumb-item current">{product.title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
