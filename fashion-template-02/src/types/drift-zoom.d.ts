declare module "drift-zoom" {
    interface DriftOptions {
        zoomFactor?: number;
        paneContainer?: Element | null;
        inlinePane?: boolean | number;
        handleTouch?: boolean;
        hoverBoundingBox?: boolean;
        containInline?: boolean;
    }

    export default class Drift {
        constructor(triggerElement: Element, options?: DriftOptions);
        destroy(): void;
    }
}
