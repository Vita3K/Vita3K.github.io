<script lang="ts">
    import { onMount } from "svelte";

    /**
     * The four face buttons from the original header art, redrawn so they can drift
     * and follow the pointer instead of sitting baked into a background picture.
     */
    let root: HTMLDivElement | null = $state(null);

    onMount(() => {
        const finePointer = window.matchMedia("(pointer: fine)");
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        if (!root || !finePointer.matches || reducedMotion.matches) {
            return;
        }

        let frame = 0;

        const handlePointerMove = (event: PointerEvent) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const x = event.clientX / window.innerWidth - 0.5;
                const y = event.clientY / window.innerHeight - 0.5;

                root?.style.setProperty("--pointer-x", x.toFixed(3));
                root?.style.setProperty("--pointer-y", y.toFixed(3));
            });
        };

        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", handlePointerMove);
        };
    });
</script>

<div class="hero-symbols" aria-hidden="true" bind:this={root}>
    <svg viewBox="0 0 320 320" fill="none" stroke-linecap="round">
        <defs>
            <filter id="symbol-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <g class="symbol symbol--triangle" style="--depth: 1.4; --float: 7.5s; --delay: -1s">
            <path
                d="M180 40 L208 98 L150 88 Z"
                stroke="#8fe6e6"
                stroke-width="7"
                stroke-linejoin="round"
                filter="url(#symbol-glow)"
            />
        </g>
        <g class="symbol symbol--square" style="--depth: 0.8; --float: 9s; --delay: -4s">
            <path
                d="M72 132 L120 140 L122 202 L76 188 Z"
                stroke="#f4f4f4"
                stroke-width="7"
                stroke-linejoin="round"
                filter="url(#symbol-glow)"
            />
        </g>
        <g class="symbol symbol--circle" style="--depth: 1.8; --float: 8s; --delay: -2.5s">
            <ellipse
                cx="262"
                cy="176"
                rx="20"
                ry="34"
                transform="rotate(-14 262 176)"
                stroke="#f6b9b9"
                stroke-width="7"
                filter="url(#symbol-glow)"
            />
        </g>
        <g class="symbol symbol--cross" style="--depth: 1.1; --float: 10s; --delay: -6s">
            <path
                d="M168 232 L204 290 M202 236 L170 282"
                stroke="#f4f4f4"
                stroke-width="7"
                filter="url(#symbol-glow)"
            />
        </g>
    </svg>
</div>

<style>
    .hero-symbols {
        --pointer-x: 0;
        --pointer-y: 0;

        width: 100%;
        aspect-ratio: 1;
    }

    svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .symbol {
        transform-box: fill-box;
        transform-origin: center;
        translate: calc(var(--pointer-x) * var(--depth) * -28px)
            calc(var(--pointer-y) * var(--depth) * -28px);
        transition: translate 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        animation: symbol-float var(--float) ease-in-out var(--delay) infinite;
    }

    @keyframes symbol-float {
        0%,
        100% {
            transform: translateY(0) rotate(0deg);
        }

        50% {
            transform: translateY(-10px) rotate(4deg);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .symbol {
            animation: none;
            transition: none;
        }
    }
</style>
