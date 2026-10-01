<script lang="ts">
    import { onMount } from "svelte";
    import { m } from "$lib/paraglide/messages.js";
    import { getLocale } from "$lib/paraglide/runtime";
    import { sanitize } from "$lib/sanitize";
    import { resolve } from "$app/paths";
    import { reveal } from "$lib/actions/reveal";
    import {
        fetchCompatibilitySummary,
        SUMMARY_STATUSES,
        type CompatibilitySummary,
        type SummaryStatus,
    } from "$lib/compatibility-summary";
    import logo from "$lib/assets/logo.svg";
    import HeroSymbols from "$lib/components/HeroSymbols.svelte";
    import ShowcaseImage from "$lib/components/ShowcaseImage.svelte";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";

    const PLATFORMS = [
        { name: "Windows", icon: "fa-windows" },
        { name: "macOS", icon: "fa-apple" },
        { name: "Linux", icon: "fa-linux" },
        { name: "Android", icon: "fa-android" },
    ];

    const SHOWCASE = [
        { name: "Persona 4 Golden", imageLink: "1.webp" },
        { name: "Freedom Wars", imageLink: "2.webp" },
        { name: "Hatsune Miku Project DIVA X", imageLink: "3.webp" },
        { name: "Muramasa Rebirth", imageLink: "4.webp" },
        { name: "Borderlands 2", imageLink: "5.webp" },
        { name: "Soul Sacrifice Delta", imageLink: "6.webp" },
    ];

    // Best first, so the bar reads from what works to what does not.
    const BAR_ORDER = [...SUMMARY_STATUSES].reverse();

    // The same order read down each column: statuses that reach gameplay on the left,
    // the ones that stop before it on the right.
    const LEGEND_COLUMNS: SummaryStatus[][] = [
        ["Playable", "Ingame +", "Ingame -"],
        ["Menu", "Intro", "Bootable", "Nothing"],
    ];

    const STATUS_CLASSES: Record<SummaryStatus, string> = {
        Nothing: "nothing",
        Bootable: "bootable",
        Intro: "intro",
        Menu: "menu",
        "Ingame -": "ingame-minus",
        "Ingame +": "ingame-plus",
        Playable: "playable",
    };


    let summary: CompatibilitySummary | null = $state(null);
    let summaryFailed = $state(false);
    let scrollY = $state(0);
    let lightbox: { name: string; src: string } | null = $state(null);
    let lightboxDialog: HTMLDialogElement | null = $state(null);

    function getStatusLabel(status: SummaryStatus) {
        switch (status) {
            case "Nothing":
                return m.compatibility_nothing();
            case "Bootable":
                return m.compatibility_bootable();
            case "Intro":
                return m.compatibility_intro();
            case "Menu":
                return m.compatibility_menu();
            case "Ingame -":
                return m.compatibility_ingame_minus();
            case "Ingame +":
                return m.compatibility_ingame_plus();
            default:
                return m.compatibility_playable();
        }
    }

    function getShare(status: SummaryStatus) {
        if (!summary || summary.total === 0) {
            return 0;
        }

        return (summary.counts[status] / summary.total) * 100;
    }

    function formatNumber(value: number, fractionDigits = 0) {
        return new Intl.NumberFormat(getLocale(), {
            maximumFractionDigits: fractionDigits,
            minimumFractionDigits: fractionDigits,
        }).format(value);
    }

    function openLightbox(name: string, src: string) {
        lightbox = { name, src };
        lightboxDialog?.showModal();
    }

    function closeLightbox() {
        lightboxDialog?.close();
    }

    function handleLightboxClick(event: MouseEvent) {
        if (event.target === lightboxDialog) {
            closeLightbox();
        }
    }

    onMount(() => {
        fetchCompatibilitySummary()
            .then((result) => (summary = result))
            .catch((error) => {
                console.error("Failed to fetch compatibility summary", error);
                summaryFailed = true;
            });
    });
</script>

<svelte:window bind:scrollY />

<svelte:head>
    <title>{m.meta_title()}</title>
    <!-- The compatibility card reads the feed -->
    <link rel="preconnect" href="https://api.vita3k.org" crossorigin="anonymous" />
    <CompositeMeta key="title" content={m.meta_title()} />
    <CompositeMeta key="description" content={m.home_meta_description()} />
</svelte:head>

<header class="home-hero text-white">
    <div class="home-hero__backdrop" aria-hidden="true"></div>

    <div class="container home-hero__grid">
        <div class="home-hero__copy">
            <img
                class="home-hero__logo"
                src={logo}
                width="88"
                height="88"
                alt={m.footer_logo_alt()}
            />
            <h1 class="home-hero__title">Vita3K</h1>
            <p class="home-hero__lead">{m.home_description()}</p>

            <div class="home-hero__actions">
                <a class="btn btn-primary btn-xl" href={resolve("/download")}>
                    <i class="fas fa-download" aria-hidden="true"></i>
                    {m.nav_download()}
                </a>
                <a class="btn btn-ghost btn-xl" href={resolve("/quickstart")}>
                    {m.nav_quickstart()}
                </a>
            </div>

            <ul class="home-hero__platforms">
                {#each PLATFORMS as platform (platform.name)}
                    <li>
                        <i class={`fab ${platform.icon}`} aria-hidden="true"></i>
                        {platform.name}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="home-hero__art">
            <HeroSymbols />
        </div>
    </div>

    <a
        class="home-hero__scroll"
        class:home-hero__scroll--hidden={scrollY > 24}
        href="#about"
    >
        <span>{m.home_find_out_more()}</span>
        <span class="home-hero__scroll-line" aria-hidden="true"></span>
    </a>
</header>

<section class="home-section home-about bg-primary text-white" id="about">
    <div class="home-about__watermark" aria-hidden="true">
        <span>△</span><span>○</span><span>✕</span><span>□</span>
    </div>
    <div class="container">
        <div class="home-narrow text-center" use:reveal>
            <h2 class="home-heading">{m.home_about_vita3k()}</h2>
            <hr class="light" />
            <p class="home-about__lead">{m.home_vita3k_description()}</p>
            <p class="home-about__notice">{m.home_legal_notice()}</p>
            <a
                class="btn btn-light-ghost btn-xl"
                href="https://github.com/Vita3K/Vita3K"
                target="_blank"
                rel="noreferrer"
            >
                <i class="fab fa-github" aria-hidden="true"></i>
                GitHub
            </a>
        </div>
    </div>
</section>

<section class="home-section home-blog bg-dark text-white" id="blog">
    <div class="container">
        <div class="home-narrow text-center" use:reveal>
            <h2 class="home-heading">{m.home_whats_new()}</h2>
            <hr class="light" />
            <p class="text-faded mb-5">{m.home_blog_description()}</p>
        </div>

        <div class="text-center">
            <a class="btn btn-primary btn-xl" href={resolve("/blog")}>
                {m.home_blog()}
            </a>
        </div>
    </div>
</section>

<section class="home-section home-compat bg-white text-dark" id="compatibility">
    <div class="container">
        <div class="home-compat__grid">
            <div class="home-compat__copy" use:reveal>
                <h2 class="home-heading">
                    {m.home_check_out_what_currently_runs()}
                </h2>
                <hr class="home-compat__rule" />
                <p>
                    {@html sanitize(
                        m.home_the_emulator_can_run_some_commercial_games(),
                    )}
                    <br />
                    {@html sanitize(
                        m.home_check_out_their_compatibility_list({
                            link: resolve("/compatibility"),
                        }),
                    )}
                </p>
                <a class="btn btn-primary btn-xl" href={resolve("/compatibility")}>
                    {m.nav_compatibility()}
                    <span aria-hidden="true">→</span>
                </a>
            </div>

            {#if !summaryFailed}
                <div
                    class="compat-card"
                    class:compat-card--loading={!summary}
                    aria-busy={!summary}
                    use:reveal={120}
                >
                    <div class="compat-card__headline">
                        <span class="compat-card__figure">
                            {#if summary}
                                {formatNumber(getShare("Playable"), 1)}<small>%</small>
                            {:else}
                                <span class="compat-card__skeleton"></span>
                            {/if}
                        </span>
                        <span class="compat-card__label">
                            <span class="status-dot bg-playable"></span>
                            {m.compatibility_playable()}
                        </span>
                    </div>

                    <div class="compat-card__bar" role="presentation">
                        {#each BAR_ORDER as status (status)}
                            <span
                                class={`bg-${STATUS_CLASSES[status]}`}
                                style={`flex-grow: ${summary ? summary.counts[status] : 1}`}
                                title={`${getStatusLabel(status)} · ${formatNumber(getShare(status), 1)}%`}
                            ></span>
                        {/each}
                    </div>

                    <div class="compat-card__legend">
                        {#each LEGEND_COLUMNS as column, columnIndex (columnIndex)}
                            <ul>
                                {#each column as status (status)}
                                    <li>
                                        <span
                                            class={`status-dot bg-${STATUS_CLASSES[status]}`}
                                        ></span>
                                        <span class="compat-card__legend-name"
                                            >{getStatusLabel(status)}</span
                                        >
                                        <span class="compat-card__legend-value">
                                            {summary
                                                ? `${formatNumber(getShare(status), 1)}%`
                                                : "—"}
                                        </span>
                                    </li>
                                {/each}
                            </ul>
                        {/each}
                    </div>

                    {#if summary}
                        <p class="compat-card__total">
                            {formatNumber(summary.total)}
                            {m.compatibility_games()}
                        </p>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</section>

<section class="home-showcase p-0" id="showcase">
    <div class="home-showcase__grid">
        {#each SHOWCASE as shot (shot.imageLink)}
            <ShowcaseImage
                name={shot.name}
                imageLink={shot.imageLink}
                onopen={openLightbox}
            />
        {/each}
    </div>
</section>

<section class="home-section home-donate bg-white text-dark" id="donate">
    <div class="container">
        <div class="donate-card" use:reveal>
            <div class="donate-card__icon" aria-hidden="true">
                <i class="fas fa-coffee"></i>
                <i class="fas fa-heart donate-card__heart"></i>
            </div>
            <h2 class="home-heading">{m.home_show_us_your_love()}</h2>
            <p>
                {@html sanitize(
                    m.home_ko_fi_page({ link: "https://ko-fi.com/vita3k/" }),
                )}
            </p>
            <a
                class="btn btn-primary btn-xl"
                href="https://ko-fi.com/vita3k/tiers"
                target="_blank"
                rel="noreferrer"
            >
                {m.home_become_a_supporter()}
            </a>
        </div>
    </div>
</section>

<dialog
    class="lightbox"
    bind:this={lightboxDialog}
    onclick={handleLightboxClick}
    onclose={() => (lightbox = null)}
    aria-label={lightbox?.name}
>
    {#if lightbox}
        <figure>
            <img src={lightbox.src} alt={lightbox.name} width="3840" height="2176" />
            <figcaption>{lightbox.name}</figcaption>
        </figure>
        <button
            type="button"
            class="lightbox__close"
            onclick={closeLightbox}
            aria-label={m.compatibility_close()}
        >
            ✕
        </button>
    {/if}
</dialog>
