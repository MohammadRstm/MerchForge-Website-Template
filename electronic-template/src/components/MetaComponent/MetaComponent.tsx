import { useEffect } from "react";

interface MetaComponentProps {
    meta: {
        title: string;
        description?: string;
    };
}

/** Sets document.title for the page it's mounted in, restoring the default on unmount. */
export default function MetaComponent({ meta }: MetaComponentProps) {
    useEffect(() => {
        document.title = meta.title;

        return () => {
            document.title = "Electronics Store";
        };
    }, [meta.title]);

    return null;
}
