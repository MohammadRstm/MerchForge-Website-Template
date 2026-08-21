/**
 * Type declaration for the vendored wow.js scroll-reveal library (wow.js itself
 * stays plain JS — it's self-contained DOM-manipulation code with no React
 * dependency, not worth a speculative TypeScript port).
 */
export interface WowOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    callback?: (box: HTMLElement) => void;
    scrollContainer?: string | null;
}

export default class WOW {
    constructor(options?: WowOptions);
    init(): void;
    sync(): void;
}
