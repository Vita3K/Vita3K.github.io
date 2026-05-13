<script lang="ts">
    import { onMount } from "svelte";
    import { asset } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";

    const FIELDS = {
        Nothing: "nothing",
        Bootable: "bootable",
        Intro: "intro",
        Menu: "menu",
        "Ingame -": "ingame-minus",
        "Ingame +": "ingame-plus",
        Playable: "playable",
        Unknown: "unknown",
    } as const;

    const STATUS_FIELDS: FIELDS[] = [
        "Nothing",
        "Bootable",
        "Intro",
        "Menu",
        "Ingame -",
        "Ingame +",
        "Playable",
    ];

    const STATUS_ORDER: FIELDS[] = [...STATUS_FIELDS, "Unknown"];
    const REGION_ORDER: REGION[] = ["USA", "EUR", "JPN", "ASIA", "UNK"];

    type FIELDS = keyof typeof FIELDS;
    type ORDER_FIELDS = "titleId" | "name" | "status";
    type ORDER_TYPE = "asc" | "desc";
    type REGION = "JPN" | "USA" | "EUR" | "ASIA" | "UNK";

    type ApiCompatibilityEntry = {
        name: string;
        titleId: string;
        status: FIELDS;
        issueId: number;
    };

    type CompatibilityEntry = ApiCompatibilityEntry & {
        colorClass: string;
        translatedStatus: string;
        region: REGION;
        regionFlag: string;
        reportUrl: string;
    };

    type CompatibilityGame = {
        name: string;
        titleId: string;
        status: FIELDS;
        translatedStatus: string;
        colorClass: string;
        regions: CompatibilityEntry[];
        hasMixedStatus: boolean;
    };

    type CompatibilityViews = Record<FIELDS, CompatibilityGame[]>;

    let views: CompatibilityViews = $state(createEmptyViews());
    let data: CompatibilityGame[] = $state([]);
    let activeView: FIELDS = $state("Unknown");
    let currentField: ORDER_FIELDS = $state("name");
    let currentOrder: ORDER_TYPE = $state("asc");
    let searchQuery = $state("");
    let lastUpdatedAt = $state("");
    let lastUpdatedAgo = $state("");
    let isLoading = $state(true);
    let loadError = $state("");
    let selectedGame: CompatibilityGame | null = $state(null);

    function createEmptyViews(): CompatibilityViews {
        return {
            Nothing: [],
            Bootable: [],
            Intro: [],
            Menu: [],
            "Ingame -": [],
            "Ingame +": [],
            Playable: [],
            Unknown: [],
        };
    }

    function timeAgo(date: Date) {
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return `${interval} years ago`;

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `${interval} months ago`;

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `${interval} days ago`;

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `${interval} hours ago`;

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `${interval} minutes ago`;

        return "just now";
    }

    function getTranslatedStatus(status: FIELDS) {
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
            case "Playable":
                return m.compatibility_playable();
            default:
                return m.compatibility_unknown();
        }
    }

    function getStatusDescription(status: FIELDS) {
        switch (status) {
            case "Nothing":
                return m.compatibility_nothing_desc();
            case "Bootable":
                return m.compatibility_bootable_desc();
            case "Intro":
                return m.compatibility_intro_desc();
            case "Menu":
                return m.compatibility_menu_desc();
            case "Ingame -":
                return m.compatibility_ingame_minus_desc();
            case "Ingame +":
                return m.compatibility_ingame_plus_desc();
            case "Playable":
                return m.compatibility_playable_desc();
            default:
                return m.compatibility_region_variation();
        }
    }

    function getRegionMeta(titleId: string) {
        if (titleId.startsWith("PCSA") || titleId.startsWith("PCSE")) {
            return { region: "USA" as REGION, regionFlag: asset("/img/flags/us.svg") };
        }

        if (titleId.startsWith("PCSB") || titleId.startsWith("PCSF")) {
            return { region: "EUR" as REGION, regionFlag: asset("/img/flags/eu.svg") };
        }

        if (titleId.startsWith("PCSC") || titleId.startsWith("PCSG")) {
            return { region: "JPN" as REGION, regionFlag: asset("/img/flags/jp.svg") };
        }

        if (titleId.startsWith("PCSD") || titleId.startsWith("PCSH")) {
            return { region: "ASIA" as REGION, regionFlag: asset("/img/flags/asia.svg") };
        }

        return { region: "UNK" as REGION, regionFlag: asset("/img/flags/unk.svg") };
    }

    function getStatusRank(status: FIELDS) {
        return STATUS_ORDER.indexOf(status);
    }

    function compareEntries(left: CompatibilityEntry, right: CompatibilityEntry) {
        return (
            REGION_ORDER.indexOf(left.region) - REGION_ORDER.indexOf(right.region) ||
            left.titleId.localeCompare(right.titleId)
        );
    }

    function compareGames(left: CompatibilityGame, right: CompatibilityGame, field: ORDER_FIELDS, order: ORDER_TYPE) {
        const direction = order === "asc" ? 1 : -1;

        switch (field) {
            case "titleId":
                return left.titleId.localeCompare(right.titleId) * direction;
            case "status":
                return (getStatusRank(left.status) - getStatusRank(right.status)) * direction;
            default:
                return left.name.localeCompare(right.name) * direction;
        }
    }

    function sortGames(entries: CompatibilityGame[], field: ORDER_FIELDS, order: ORDER_TYPE) {
        return [...entries].sort((left, right) => compareGames(left, right, field, order));
    }

    function rebuildData() {
        data = sortGames(views[activeView], currentField, currentOrder);
    }

    function changeView(field: FIELDS) {
        activeView = field;
        rebuildData();
    }

    function orderBy(field: ORDER_FIELDS) {
        if (currentField === field) {
            currentOrder = currentOrder === "asc" ? "desc" : "asc";
        } else {
            currentField = field;
            currentOrder = "asc";
        }

        rebuildData();
    }

    function filterEntries(entry: CompatibilityGame) {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            entry.name.toLowerCase().includes(query) ||
            entry.regions.some(
                ({ titleId, region }) =>
                    titleId.toLowerCase().includes(query) || region.toLowerCase().includes(query),
            )
        );
    }

    function getCompletion(field: FIELDS) {
        const total = views.Unknown.length;

        if (total === 0) {
            return 0;
        }

        return (views[field].length / total) * 100;
    }

    function getSortIndicator(field: ORDER_FIELDS) {
        if (currentField !== field) {
            return "";
        }

        return currentOrder === "asc" ? "↑" : "↓";
    }

    function getRegionSummary(game: CompatibilityGame) {
        return game.regions.map(({ titleId }) => titleId).join(" · ");
    }

    function getFilteredData() {
        return data.filter(filterEntries);
    }

    function openRegionPicker(game: CompatibilityGame) {
        selectedGame = game;
    }

    function closeRegionPicker() {
        selectedGame = null;
    }

    function handleDialogBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            closeRegionPicker();
        }
    }

    function handleWindowKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && selectedGame) {
            closeRegionPicker();
        }
    }

    function groupEntries(entries: CompatibilityEntry[]) {
        const groupedEntries = new Map<string, CompatibilityEntry[]>();

        for (const entry of entries) {
            const key = entry.name.trim().toLowerCase();
            const list = groupedEntries.get(key) ?? [];

            list.push(entry);
            groupedEntries.set(key, list);
        }

        return Array.from(groupedEntries.values()).map((regions) => {
            const sortedRegions = [...regions].sort(compareEntries);
            const representative = [...regions].sort(
                (left, right) =>
                    getStatusRank(right.status) - getStatusRank(left.status) || compareEntries(left, right),
            )[0];
            const titleId = [...sortedRegions].map(({ titleId }) => titleId).sort((left, right) => left.localeCompare(right))[0];
            const uniqueStatuses = new Set(sortedRegions.map(({ status }) => status));

            return {
                name: sortedRegions[0].name,
                titleId,
                status: representative.status,
                translatedStatus: representative.translatedStatus,
                colorClass: representative.colorClass,
                regions: sortedRegions,
                hasMixedStatus: uniqueStatuses.size > 1,
            } satisfies CompatibilityGame;
        });
    }

    function buildViews(games: CompatibilityGame[]) {
        const nextViews = createEmptyViews();

        nextViews.Unknown = games;

        for (const game of games) {
            if (game.status !== "Unknown") {
                nextViews[game.status].push(game);
            }
        }

        return nextViews;
    }

    async function loadCompatibility() {
        isLoading = true;
        loadError = "";

        try {
            const response = await fetch("https://vita3k-api.pedro.moe/list/commercial");

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const payload = (await response.json()) as {
                date: number;
                list: ApiCompatibilityEntry[];
            };

            const updatedAt = new Date(payload.date * 1000);
            const enrichedEntries = payload.list.map((entry) => {
                const regionMeta = getRegionMeta(entry.titleId);

                return {
                    ...entry,
                    ...regionMeta,
                    colorClass: FIELDS[entry.status],
                    translatedStatus: getTranslatedStatus(entry.status),
                    reportUrl: `https://github.com/Vita3K/compatibility/issues/${entry.issueId}`,
                } satisfies CompatibilityEntry;
            });

            views = buildViews(groupEntries(enrichedEntries));
            lastUpdatedAt = updatedAt.toLocaleString();
            lastUpdatedAgo = timeAgo(updatedAt);
            activeView = "Unknown";
            data = sortGames(views.Unknown, currentField, currentOrder);
        } catch (error) {
            console.error("Failed to fetch compatibility data", error);
            loadError = m.compatibility_failed_to_load();
            views = createEmptyViews();
            data = [];
        } finally {
            isLoading = false;
        }
    }

    onMount(loadCompatibility);
</script>

<svelte:head>
    <title>Vita3K - {m.nav_compatibility()}</title>
    <CompositeMeta key="title" content={`Vita3K - ${m.nav_compatibility()}`} />
    <CompositeMeta key="description" content="Vita3K compatibility list for +3000 Games" />
</svelte:head>

<svelte:window onkeydown={handleWindowKeydown} />

<section class="page-route text-white compatibility-page" id="compatibility">
    <div class="container">
        <div class="compatibility-shell">
            <PageHeader
                title={m.compatibility_compatibility_list()}
                description={m.compatibility_emulator_undergoing_changes()}
            >
                {#if !isLoading && !loadError && lastUpdatedAt}
                    <p class="compatibility-updated">
                        <span>{m.compatibility_last_updated()}:</span>
                        <strong>{lastUpdatedAt}</strong>
                        <span class="compatibility-update-age">({lastUpdatedAgo})</span>
                    </p>
                {/if}
            </PageHeader>

            {#if isLoading}
                <div class="compatibility-feedback">{m.compatibility_loading()}</div>
            {:else if loadError}
                <div class="compatibility-feedback compatibility-feedback--error">{loadError}</div>
            {:else}
                <div class="compatibility-status-legend" role="list">
                    {#each STATUS_FIELDS as field (field)}
                        <button
                            type="button"
                            class="status-row"
                            class:active={activeView === field}
                            onclick={() => changeView(field)}
                        >
                            <div class="status-row-copy">
                                <span class="status-row-label">
                                    <span class={`status-row-dot bg-${FIELDS[field]}`}></span>
                                    <strong>{getTranslatedStatus(field)} ({getCompletion(field).toFixed(2)}%):</strong>
                                </span>
                                <span class="status-row-description">{getStatusDescription(field)}</span>
                            </div>

                            <div class="status-row-metrics">
                                <span class="status-row-count">{views[field].length}</span>
                                <div class="status-row-track">
                                    <div
                                        class={`status-row-bar bg-${FIELDS[field]}`}
                                        style={`width: ${getCompletion(field)}%`}
                                    ></div>
                                </div>
                            </div>
                        </button>
                    {/each}
                </div>

                <div class="compatibility-filter-strip" role="toolbar" aria-label={m.compatibility_tags()}>
                    <button
                        type="button"
                        class="filter-chip filter-chip--all"
                        class:active={activeView === "Unknown"}
                        aria-pressed={activeView === "Unknown"}
                        onclick={() => changeView("Unknown")}
                    >
                        <span>{m.compatibility_all()}</span>
                        <strong>{views.Unknown.length}</strong>
                    </button>

                    {#each STATUS_FIELDS as field (field)}
                        <button
                            type="button"
                            class={`filter-chip bg-${FIELDS[field]}`}
                            class:active={activeView === field}
                            aria-pressed={activeView === field}
                            onclick={() => changeView(field)}
                        >
                            <span class={`filter-chip-dot bg-${FIELDS[field]}`}></span>
                            <span>{getTranslatedStatus(field)}</span>
                            <strong>{views[field].length}</strong>
                        </button>
                    {/each}
                </div>

                <section class="compatibility-results-panel" aria-labelledby="compatibility-results-heading">
                    <div class="results-toolbar">
                        <div class="results-heading">
                            <h2 id="compatibility-results-heading">
                                {activeView === "Unknown" ? m.compatibility_all() : getTranslatedStatus(activeView)}
                            </h2>
                            <p>{getFilteredData().length} {m.compatibility_games()}</p>
                        </div>

                        <label class="compatibility-search" for="compatibility-search">
                            <span class="compatibility-search-label">{m.compatibility_search()}</span>
                            <input
                                id="compatibility-search"
                                type="search"
                                class="compatibility-search-input"
                                placeholder={m.compatibility_search()}
                                bind:value={searchQuery}
                            />
                        </label>

                        <div class="sort-toolbar" role="toolbar" aria-label={m.compatibility_sort_by()}>
                            <button
                                type="button"
                                class="sort-chip"
                                class:active={currentField === "name"}
                                aria-pressed={currentField === "name"}
                                onclick={() => orderBy("name")}
                            >
                                <span>{m.compatibility_name()}</span>
                                <strong>{getSortIndicator("name")}</strong>
                            </button>
                            <button
                                type="button"
                                class="sort-chip"
                                class:active={currentField === "titleId"}
                                aria-pressed={currentField === "titleId"}
                                onclick={() => orderBy("titleId")}
                            >
                                <span>{m.compatibility_title_id()}</span>
                                <strong>{getSortIndicator("titleId")}</strong>
                            </button>
                            <button
                                type="button"
                                class="sort-chip"
                                class:active={currentField === "status"}
                                aria-pressed={currentField === "status"}
                                onclick={() => orderBy("status")}
                            >
                                <span>{m.compatibility_status()}</span>
                                <strong>{getSortIndicator("status")}</strong>
                            </button>
                        </div>
                    </div>

                    <div class="compatibility-column-headings" aria-hidden="true">
                        <span>{m.compatibility_game()}</span>
                        <span>{m.compatibility_status()}</span>
                        <span>{m.compatibility_report()}</span>
                    </div>

                    {#if getFilteredData().length === 0}
                        <div class="compatibility-feedback compatibility-feedback--empty">
                            {m.compatibility_no_results()}
                        </div>
                    {:else}
                        <div class="compatibility-game-list">
                            {#each getFilteredData() as game (game.name)}
                                <article class="compatibility-game-card">
                                    <div class="compatibility-game-main">
                                        <div class="compatibility-game-copy">
                                            <h3>{game.name}</h3>
                                            <p class="compatibility-game-ids">{getRegionSummary(game)}</p>
                                            <div class="compatibility-game-flags" aria-label={m.compatibility_regions()}>
                                                {#each game.regions as region (region.titleId)}
                                                    <span class="compatibility-flag-pill" title={`${region.region} • ${region.titleId}`}>
                                                        <img
                                                            class="region-flag"
                                                            src={region.regionFlag}
                                                            alt={region.region}
                                                        />
                                                        <span>{region.region}</span>
                                                    </span>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="compatibility-game-status">
                                        <span class={`status-badge bg-${game.colorClass}`}>
                                            {game.translatedStatus}
                                        </span>

                                        {#if game.hasMixedStatus}
                                            <span class="status-variation-note">
                                                {m.compatibility_region_variation()}
                                            </span>
                                        {/if}
                                    </div>

                                    <div class="compatibility-game-action">
                                        {#if game.regions.length === 1}
                                            <a
                                                class="report-trigger"
                                                href={game.regions[0].reportUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                        {m.compatibility_view_report()}
                                            </a>
                                        {:else}
                                            <button
                                                type="button"
                                                class="report-trigger"
                                                onclick={() => openRegionPicker(game)}
                                            >
                                                        {m.compatibility_view_report()}
                                            </button>
                                        {/if}
                                    </div>
                                </article>
                            {/each}
                        </div>
                    {/if}
                </section>
            {/if}
        </div>
    </div>

    {#if selectedGame}
        <div class="compatibility-dialog-backdrop" role="presentation" onclick={handleDialogBackdropClick}>
            <div class="compatibility-dialog" role="dialog" aria-modal="true" aria-labelledby="region-picker-title">
                <div class="compatibility-dialog-header">
                    <div>
                        <p class="compatibility-dialog-eyebrow">{m.compatibility_regions()}</p>
                        <h2 id="region-picker-title">{selectedGame.name}</h2>
                    </div>

                    <button type="button" class="compatibility-dialog-close" onclick={closeRegionPicker}>
                        {m.compatibility_close()}
                    </button>
                </div>

                <p class="compatibility-dialog-copy">{m.compatibility_choose_region_help()}</p>

                <div class="region-picker-toolbar" role="toolbar" aria-label={m.compatibility_regions()}>
                    {#each selectedGame.regions as region (region.titleId)}
                        <a
                            class="region-picker-option"
                            href={region.reportUrl}
                            target="_blank"
                            rel="noreferrer"
                            onclick={closeRegionPicker}
                        >
                            <span class="region-picker-option-meta">
                                <img class="region-flag" src={region.regionFlag} alt={region.region} />
                                <strong>{region.region}</strong>
                            </span>
                            <span class="region-picker-option-id">{region.titleId}</span>
                            <span class={`region-picker-option-status bg-${region.colorClass}`}>
                                {region.translatedStatus}
                            </span>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</section>
