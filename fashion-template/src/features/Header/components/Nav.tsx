import { Link, useLocation } from "react-router-dom";
import NavProducts from "./NavProducts";
import Collections from "./Collections";
import { recentBlogPosts } from "../../../data/blogs";
import { blogMenuItems, demoItems, otherPages, productMenuItems, shopPages } from "../../../data/menu";
import type { MenuLink } from "../../../data/menu";

/** The header's five-tab mega-menu: Home, Shop, Products, Pages, Blog. */
export default function Nav() {
    const { pathname } = useLocation();

    const isMenuActive = (link: MenuLink) => link.href?.split("/")[1] === pathname.split("/")[1];
    const isMenuParentActive = (menu: MenuLink[]) => menu.some((elm) => isMenuActive(elm));

    return (
        <>
            <li className="menu-item">
                <a href="#" className="item-link">
                    Home
                    <i className="icon icon-arr-down" />
                </a>
                <div className="sub-menu mega-menu mega-home">
                    <div className="row-demo">
                        {demoItems.slice(0, 10).map((item, index) => (
                            <div className="demo-item" key={index}>
                                <Link to={item.href} className="demo-image">
                                    <img className="lazyload" alt={item.alt} src={item.imageSrc} width={item.width} height={item.height} />
                                    <div className="demo-label">
                                        {item.labels.map((label, labelIndex) => (
                                            <span key={labelIndex} className={label === "Hot" ? "demo-hot" : ""}>
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                                <Link to={item.href} className="demo-name link">
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </li>

            <li className="menu-item">
                <a href="#" className="item-link">
                    Shop
                    <i className="icon icon-arr-down" />
                </a>
                <div className="sub-menu mega-menu mega-shop">
                    <div className="wrapper-sub-menu">
                        {shopPages.map((menuItem, index) => (
                            <div className="mega-menu-item" key={index}>
                                <div className="menu-heading">{menuItem.heading}</div>
                                <ul className="menu-list">
                                    {menuItem.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                to={link.href2 ?? link.href ?? "#"}
                                                className={`menu-link-text link ${isMenuActive(link) ? "menuActive" : ""}`}
                                            >
                                                {link.text}
                                                {link.label && <span className="demo-label">{link.label}</span>}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Collections />
                </div>
            </li>

            <li className="menu-item">
                <a href="#" className="item-link">
                    Products
                    <i className="icon icon-arr-down" />
                </a>
                <div className="sub-menu mega-menu mega-tab">
                    <div className="wrapper-sub-menu-tab flat-animate-tab">
                        <ul className="menu-tab" role="tablist">
                            {productMenuItems.map((elm, i) => (
                                <li key={i} className="nav-tab-item" role="presentation">
                                    <a href={`#product${i}`} className={`tab-link ${i === 0 ? "active" : ""}`} data-bs-toggle="tab">
                                        {elm.heading}
                                        <i className="icon icon-arr-right" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content">
                            {productMenuItems.map((elm, i) => (
                                <div key={i} className={`tab-pane ${i === 0 ? "active show" : ""}`} id={`product${i}`} role="tabpanel">
                                    <ul className="menu-list">
                                        {elm.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    to={link.href ?? "#"}
                                                    className={`menu-link-text link ${isMenuActive(link) ? "menuActive" : ""}`}
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="wrapper-sub-product">
                        <NavProducts />
                    </div>
                </div>
            </li>

            <li className="menu-item position-relative">
                <a href="#" className="item-link">
                    Pages
                    <i className="icon icon-arr-down" />
                </a>
                <div className="sub-menu sub-menu-style-2">
                    <ul className="menu-list">
                        {otherPages.map((item, index) => (
                            <li key={index}>
                                <Link to={item.href ?? "#"} className={`menu-link-text link ${isMenuActive(item) ? "menuActive" : ""}`}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>

            <li className="menu-item position-relative">
                <a href="#" className={`item-link ${isMenuParentActive(blogMenuItems) ? "menuActive" : ""}`}>
                    Blog
                    <i className="icon icon-arr-down" />
                </a>
                <div className="sub-menu sub-menu-style-3">
                    <ul className="menu-list">
                        {blogMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.href ?? "#"} className={`menu-link-text link ${isMenuActive(item) ? "menuActive" : ""}`}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="wrapper-sub-blog">
                        <div className="menu-heading">Recent Posts</div>
                        <ul className="list-recent-blog">
                            {recentBlogPosts.map((post) => (
                                <li className="item" key={post.id}>
                                    <Link to={`/blog-single/${post.id}`} className="img-box">
                                        <img alt={post.alt} src={post.imageSrc} width={post.width} height={post.height} />
                                    </Link>
                                    <div className="content">
                                        <Link to={`/blog-single/${post.id}`} className="fw-medium text-sm link title">
                                            {post.title}
                                        </Link>
                                        <span className="text-xxs text-grey date-post">{post.date}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        </>
    );
}
