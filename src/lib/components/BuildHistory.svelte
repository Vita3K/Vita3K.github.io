<script lang="ts">
    import { onMount } from "svelte";
    import { m } from "$lib/paraglide/messages.js";
    import { BUILD_RELEASES_URL, fetchBuilds, type Build, type PlatformId } from "$lib/builds";

    type PlatformOption = { platform: PlatformId; label: string };
    type PlatformGroup = { name: string; icon: string; options: PlatformOption[] };
    type BuildDownload = PlatformOption & { url: string };

    /** The same platform families the nightly boxes above offer, in the same order. */
    const PLATFORM_GROUPS: PlatformGroup[] = [
        {
            name: "Windows",
            icon: "fa-windows",
            options: [
                { platform: "windows-x64", label: "x64" },
                { platform: "windows-arm", label: "arm" },
            ],
        },
        {
            name: "macOS",
            icon: "fa-apple",
            options: [
                { platform: "macos-x64", label: "x64" },
                { platform: "macos-arm", label: "arm" },
            ],
        },
        {
            name: "AppImage",
            icon: "fa-linux",
            options: [
                { platform: "appimage-x64", label: "x64" },
                { platform: "appimage-arm", label: "arm" },
            ],
        },
        {
            name: "Linux",
            icon: "fa-linux",
            options: [
                { platform: "linux-x64", label: "x64" },
                { platform: "linux-arm", label: "arm" },
            ],
        },
        {
            name: "Android",
            icon: "fa-android",
            options: [{ platform: "android", label: "apk" }],
        },
    ];

    let builds: Build[] = $state([]);
    let loadedPages = $state(0);
    let hasMore = $state(false);
    let isLoading = $state(true);
    let isLoadingMore = $state(false);
    let loadError = $state("");
    let searchQuery = $state("");

    const query = $derived(searchQuery.trim().toLowerCase());
    const visibleBuilds = $derived(
        query === "" ? builds : builds.filter((build) => build.searchText.includes(query)),
    );

    /** Only the platforms a build actually shipped, so a row never offers a dead link. */
    function getDownloads(build: Build) {
        return PLATFORM_GROUPS.map((group) => ({
            ...group,
            options: group.options
                .map((option) => ({ ...option, url: build.downloads[option.platform] }))
                .filter((option): option is BuildDownload => option.url !== undefined),
        })).filter((group) => group.options.length > 0);
    }

    function formatDate(date: Date) {
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    async function loadNextPage() {
        const page = loadedPages + 1;

        isLoading = page === 1;
        isLoadingMore = page > 1;
        loadError = "";

        try {
            const { builds: nextBuilds, hasMore: moreToCome } = await fetchBuilds(page);

            builds = [...builds, ...nextBuilds];
            hasMore = moreToCome;
            loadedPages = page;
        } catch (error) {
            console.error("Failed to fetch the build list", error);
            loadError = m.download_builds_failed();
        } finally {
            isLoading = false;
            isLoadingMore = false;
        }
    }

    onMount(loadNextPage);
</script>

<section class="build-history" id="builds" aria-labelledby="build-history-title">
    <div class="build-history-heading text-center">
        <h2 id="build-history-title" class="section-heading">
            {m.download_older_versions()}
        </h2>
        <hr class="my-4" />
        <p>{m.download_older_versions_desc()}</p>
    </div>

    {#if isLoading}
        <p class="build-feedback">{m.download_builds_loading()}</p>
    {:else if loadError && builds.length === 0}
        <div class="build-feedback build-feedback--error">
            <span>{loadError}</span>
            <button type="button" class="btn btn-primary build-action" onclick={loadNextPage}>
                {m.download_try_again()}
            </button>
        </div>
    {:else}
        <label class="build-search" for="build-search">
            <span class="build-search-label">{m.download_search_builds()}</span>
            <input
                id="build-search"
                type="search"
                class="build-search-input"
                placeholder={m.download_search_builds()}
                bind:value={searchQuery}
            />
        </label>

        {#if visibleBuilds.length === 0}
            <p class="build-feedback">
                {m.download_builds_no_results()}
                {#if hasMore}
                    {m.download_builds_search_more()}
                {/if}
            </p>
        {:else}
            <div class="build-list">
                {#each visibleBuilds as build (build.version)}
                    <article class="build-card">
                        <div class="build-meta">
                            <div class="build-identity">
                                <a
                                    class="build-version"
                                    href={build.releaseUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    #{build.version}
                                </a>

                                {#if build.revision}
                                    <a
                                        class="build-revision"
                                        href={build.commitUrl || build.releaseUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {build.revision}
                                    </a>
                                {/if}

                                <time
                                    class="build-date"
                                    datetime={build.publishedAt.toISOString()}
                                >
                                    {formatDate(build.publishedAt)}
                                </time>
                            </div>

                            <p class="build-title">
                                {build.title}
                                {#if build.author}
                                    <span class="build-author">{build.author}</span>
                                {/if}
                            </p>
                        </div>

                        <div class="build-downloads">
                            {#each getDownloads(build) as group (group.name)}
                                <span class="build-platform">
                                    <span class="build-platform-name">
                                        <i class={`fab ${group.icon}`} aria-hidden="true"></i>
                                        {group.name}
                                    </span>

                                    {#each group.options as option (option.platform)}
                                        <a
                                            download
                                            class="btn build-download"
                                            href={option.url}
                                            aria-label={`${m.download_build()} ${build.version} — ${group.name} ${option.label}`}
                                        >
                                            {option.label}
                                        </a>
                                    {/each}
                                </span>
                            {/each}
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    {/if}

    <div class="build-history-footer">
        {#if loadError && builds.length > 0}
            <p class="build-feedback build-feedback--error">{loadError}</p>
        {/if}

        {#if hasMore}
            <button
                type="button"
                class="btn btn-primary btn-xl"
                onclick={loadNextPage}
                disabled={isLoadingMore}
            >
                {isLoadingMore ? m.download_builds_loading() : m.download_load_more()}
            </button>
        {/if}

        <a class="build-history-link" href={BUILD_RELEASES_URL} target="_blank" rel="noreferrer">
            {m.download_all_builds()}
        </a>
    </div>
</section>

<style>
    .build-history {
        --build-divider: rgba(255, 255, 255, 0.08);
        --build-muted: rgba(255, 255, 255, 0.64);

        display: grid;
        gap: 1rem;
        padding: 0;
        width: min(100%, 68rem);
        margin: 0 auto;
    }

    .build-history-heading h2 {
        margin: 0;
        color: #fff;
        font-size: clamp(1.85rem, 3.2vw, 2.5rem);
        font-weight: 800;
    }

    .build-history-heading p {
        margin: 0 auto;
        max-width: 42rem;
        color: rgba(255, 255, 255, 0.72);
    }

    .build-search {
        display: block;
        width: min(100%, 26rem);
        margin: 0.5rem auto 0;
    }

    .build-search-label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .build-search-input {
        width: 100%;
        min-height: 2.9rem;
        padding: 0.65rem 1.35rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 300px;
        background: rgba(255, 255, 255, 0.04);
        color: #fff;
        text-align: center;
        outline: none;
        transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
    }

    .build-search-input::placeholder {
        color: rgba(255, 255, 255, 0.45);
    }

    .build-search-input:focus {
        border-color: rgba(240, 95, 64, 0.55);
        box-shadow: 0 0 0 2px rgba(240, 95, 64, 0.12);
    }

    .build-list {
        display: grid;
        border-top: 1px solid var(--build-divider);
    }

    .build-card {
        display: grid;
        gap: 0.5rem;
        padding: 0.85rem 0.25rem;
        border-bottom: 1px solid var(--build-divider);
        transition: background 0.18s ease;
    }

    .build-card:hover {
        background: rgba(255, 255, 255, 0.025);
    }

    .build-meta {
        display: grid;
        gap: 0.3rem;
        align-content: start;
    }

    .build-identity {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.65rem;
    }

    .build-version {
        color: #fff;
        font-size: 1.05rem;
        font-weight: 800;
        letter-spacing: -0.01em;
        font-variant-numeric: tabular-nums;
        text-decoration: none;
    }

    .build-revision {
        font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
        font-size: 0.82rem;
        color: var(--build-muted);
        text-decoration: none;
    }

    .build-version:hover,
    .build-revision:hover {
        color: #f05f40;
    }

    .build-date {
        margin-left: auto;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.82rem;
        font-variant-numeric: tabular-nums;
    }

    .build-title {
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.94rem;
        line-height: 1.35;
        overflow-wrap: anywhere;
    }

    .build-author {
        color: var(--build-muted);
    }

    .build-author::before {
        content: "·";
        margin: 0 0.4rem;
        color: rgba(255, 255, 255, 0.35);
    }

    .build-downloads {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.25rem;
    }

    .build-platform {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.28rem 0.3rem 0.28rem 0.8rem;
        border-radius: 300px;
        background: rgba(255, 255, 255, 0.04);
    }

    .build-platform-name {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        margin-right: 0.15rem;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .build-platform-name i {
        color: #f05f40;
        font-size: 1.1rem;
    }

    /*
     * The page's download buttons, sized to sit on a row rather than under an icon, and
     * tinted rather than filled: a whole list of them in full orange shouts. They take
     * the page's colour on hover, where only one is ever lit at a time.
     */
    .build-download {
        --bs-btn-padding-y: 0.24rem;
        --bs-btn-padding-x: 0.7rem;
        --bs-btn-font-size: 0.72rem;
        --bs-btn-color: #ffb59f;
        --bs-btn-bg: rgba(240, 95, 64, 0.16);
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #f05f40;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #e4522f;
        --bs-btn-focus-shadow-rgb: 240, 95, 64;

        letter-spacing: 0.06em;
    }

    .build-feedback {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 0.9rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.82);
        text-align: center;
    }

    .build-feedback--error {
        border-color: rgba(255, 32, 32, 0.28);
        background: rgba(255, 32, 32, 0.12);
    }

    .build-history-footer {
        display: grid;
        justify-items: center;
        gap: 0.85rem;
    }

    .build-action {
        --bs-btn-padding-y: 0.5rem;
        --bs-btn-padding-x: 1.5rem;

        letter-spacing: 0.06em;
    }

    .build-action:disabled {
        opacity: 0.65;
    }

    .build-history-link {
        margin-top: 0.15rem;
    }

    @media (min-width: 768px) {
        .build-card {
            padding: 1rem 0.25rem;
        }
    }
</style>
