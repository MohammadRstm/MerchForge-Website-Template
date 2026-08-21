import { useEffect } from "react";

/** The "back to top" button fixed in the corner, with a scroll-progress ring. */
export default function ScrollTop() {
    useEffect(() => {
        const goTop = document.getElementById("goTop");
        const borderProgress = document.querySelector<HTMLElement>(".border-progress");

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const progressAngle = (scrollPercent / 100) * 360;

            borderProgress?.style.setProperty("--progress-angle", `${progressAngle}deg`);

            if (goTop) {
                goTop.classList.toggle("show", scrollTop > 100);
            }
        };

        const handleGoTopClick = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        window.addEventListener("scroll", handleScroll);
        goTop?.addEventListener("click", handleGoTopClick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            goTop?.removeEventListener("click", handleGoTopClick);
        };
    }, []);

    return (
        <button id="goTop">
            <span className="border-progress"></span>
            <span className="icon icon-arrow-right"></span>
        </button>
    );
}
