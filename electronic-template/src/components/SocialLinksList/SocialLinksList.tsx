import type { SocialLinks } from "@merchforge/storefront-sdk";

const PLATFORMS: Array<{ key: keyof SocialLinks; iconClass: string; itemClass: string; label: string }> = [
    { key: "facebook", iconClass: "icon-fb", itemClass: "social-facebook", label: "Facebook" },
    { key: "instagram", iconClass: "icon-instagram", itemClass: "social-instagram", label: "Instagram" },
    { key: "twitter", iconClass: "icon-x", itemClass: "social-x", label: "Twitter / X" },
    { key: "tikTok", iconClass: "icon-tiktok", itemClass: "social-tiktok", label: "TikTok" },
    { key: "youTube", iconClass: "icon-youtube", itemClass: "social-youtube", label: "YouTube" },
    { key: "linkedIn", iconClass: "icon-linkedin", itemClass: "social-linkedin", label: "LinkedIn" },
];

type SocialLinksListProps = {
    socialLinks: SocialLinks | undefined;
    className?: string;
};

/**
 * Renders only the platforms this business has actually configured — never a
 * placeholder link to an unset/example profile. Returns null entirely when none are
 * set, so a caller doesn't need its own extra empty-state check around this.
 */
export default function SocialLinksList({ socialLinks, className = "tf-social-icon style-large" }: SocialLinksListProps) {
    const active = PLATFORMS.filter((platform) => !!socialLinks?.[platform.key]);

    if (active.length === 0) return null;

    return (
        <ul className={className}>
            {active.map((platform) => (
                <li key={platform.key}>
                    <a
                        href={socialLinks![platform.key]!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-item ${platform.itemClass}`}
                        aria-label={platform.label}
                    >
                        <i className={`icon ${platform.iconClass}`} />
                    </a>
                </li>
            ))}
        </ul>
    );
}
