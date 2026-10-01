/**
 * Fades an element up into place the first time it scrolls into view.
 *
 * The hidden starting state is only applied from here, never from the stylesheet,
 * so the prerendered page stays fully readable when scripts are off, and readers who
 * asked for reduced motion simply get the content where it already is.
 */
export function reveal(node: HTMLElement, delay = 0) {
    if (
        typeof IntersectionObserver === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    node.classList.add("reveal");
    node.style.setProperty("--reveal-delay", `${delay}ms`);

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    node.classList.add("reveal--visible");
                    observer.disconnect();
                }
            }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
}

