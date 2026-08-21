import type { Store } from "../../../data/stores";

interface StoreCardProps {
    store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
    return (
        <div className="box-store">
            <div className="content">
                <p className="title">
                    <i className="icon icon-location" style={{ marginRight: 6 }} />
                    {store.name}
                </p>
                <ul className="contact-list">
                    <li>
                        <p>
                            Address:{" "}
                            <a className="link" href={store.addressHref} target="_blank" rel="noreferrer">
                                {store.address}
                            </a>
                        </p>
                    </li>
                    <li>
                        <p>
                            Phone number: <a className="link" href={store.phoneHref}>{store.phone}</a>
                        </p>
                    </li>
                    <li>
                        <p>
                            Email: <a className="link" href={`mailto:${store.email}`}>{store.email}</a>
                        </p>
                    </li>
                    <li>
                        <p>
                            Open: <span className="text-main">{store.hours}</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div className="bot">
                <a href={store.addressHref} target="_blank" rel="noreferrer" className="tf-btn btn-line">
                    Get direction
                    <i className="icon-arrow-top-left" />
                </a>
            </div>
        </div>
    );
}
