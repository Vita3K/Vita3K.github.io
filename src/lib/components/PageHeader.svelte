<script lang="ts">
    import { onMount } from "svelte";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        description?: string;
        children?: Snippet;
    }

    let { title, description = "", children }: Props = $props();
    let dividerElement: HTMLDivElement | null = null;

    function randomBetween(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function updateDividerMotion() {
        if (!dividerElement) {
            return;
        }

        dividerElement.style.setProperty(
            "--divider-duration",
            `${randomBetween(1.8, 3.8).toFixed(2)}s`,
        );
        dividerElement.style.setProperty(
            "--divider-background-position",
            `${randomBetween(0, 100).toFixed(2)}%`,
        );
        dividerElement.style.setProperty(
            "--divider-background-size",
            `${randomBetween(170, 280).toFixed(0)}%`,
        );
        dividerElement.style.setProperty(
            "--divider-offset",
            `${randomBetween(-10, 10).toFixed(2)}%`,
        );
        dividerElement.style.setProperty(
            "--divider-scale",
            randomBetween(1.45, 2.35).toFixed(2),
        );
        dividerElement.style.setProperty(
            "--divider-opacity",
            randomBetween(0.78, 1).toFixed(2),
        );
    }

    onMount(() => {
        if (!dividerElement) {
            return;
        }

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let timeoutId: number | undefined;

        const scheduleMotion = () => {
            if (motionQuery.matches) {
                return;
            }

            updateDividerMotion();
            timeoutId = window.setTimeout(scheduleMotion, randomBetween(1400, 3200));
        };

        const handleMotionChange = (event: MediaQueryListEvent) => {
            window.clearTimeout(timeoutId);

            if (event.matches) {
                return;
            }

            scheduleMotion();
        };

        scheduleMotion();
        motionQuery.addEventListener("change", handleMotionChange);

        return () => {
            window.clearTimeout(timeoutId);
            motionQuery.removeEventListener("change", handleMotionChange);
        };
    });
</script>

<header class="page-header">
    <div class="page-header__inner">
        <h1 class="page-header__title">{title}</h1>

        <div class="page-header__divider" aria-hidden="true" bind:this={dividerElement}></div>

        {#if description}
            <p class="page-header__description">{description}</p>
        {/if}

        {#if children}
            <div class="page-header__meta">
                {@render children()}
            </div>
        {/if}
    </div>
</header>

<style>
    .page-header {
        margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
    }

    .page-header__inner {
        width: min(100%, 54rem);
        margin: 0 auto;
        text-align: center;
    }

    .page-header__title {
        margin: 0;
        color: #fff;
        font-size: clamp(2rem, 4.4vw, 3.1rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
        text-wrap: balance;
    }

    .page-header__divider {
        --divider-duration: 2.8s;
        --divider-background-position: 48%;
        --divider-background-size: 220%;
        --divider-offset: 0%;
        --divider-scale: 1.8;
        --divider-opacity: 0.94;

        position: relative;
        width: clamp(4.5rem, 10vw, 7rem);
        height: 0.28rem;
        margin: 1.35rem auto 0;
        border-radius: 999px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 1.5rem rgba(240, 95, 64, 0.15);
    }

    .page-header__divider::before {
        content: "";
        position: absolute;
        inset: -0.15rem;
        border-radius: inherit;
        background: linear-gradient(
            90deg,
            rgba(240, 95, 64, 0.2) 0%,
            rgba(240, 95, 64, 0.85) 18%,
            rgba(255, 209, 127, 0.96) 38%,
            rgba(255, 168, 88, 0.88) 54%,
            rgba(240, 95, 64, 0.7) 74%,
            rgba(240, 95, 64, 0.15) 100%
        );
        background-position: var(--divider-background-position) 50%;
        background-size: var(--divider-background-size) 100%;
        opacity: var(--divider-opacity);
        transform: translate3d(var(--divider-offset), 0, 0) scaleX(var(--divider-scale));
        transform-origin: center;
        transition:
            background-position var(--divider-duration) cubic-bezier(0.22, 1, 0.36, 1),
            background-size var(--divider-duration) cubic-bezier(0.22, 1, 0.36, 1),
            transform var(--divider-duration) cubic-bezier(0.22, 1, 0.36, 1),
            opacity var(--divider-duration) ease;
        will-change: background-position, background-size, transform, opacity;
    }

    .page-header__divider::after {
        content: "";
        position: absolute;
        inset: -0.4rem -0.6rem;
        border-radius: inherit;
        background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 195, 128, 0.28) 0%,
            rgba(240, 95, 64, 0.08) 45%,
            transparent 75%
        );
        opacity: calc(var(--divider-opacity) * 0.9);
        filter: blur(0.45rem);
        pointer-events: none;
    }

    .page-header__description {
        margin: 0.95rem auto 0;
        color: rgba(255, 255, 255, 0.72);
        font-size: 1rem;
        line-height: 1.7;
        text-wrap: balance;
    }

    .page-header__meta {
        margin-top: 0.9rem;
    }

    @media (max-width: 767px) {
        .page-header {
            margin-bottom: 1.75rem;
        }

        .page-header__description {
            font-size: 0.95rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .page-header__divider::before {
            transition: none;
        }
    }
</style>