<script lang="ts">
    import { onMount } from "svelte";
    import { asset } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import { nativeTitles } from "$lib/native-titles";
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
    const REGION_ORDER: REGION[] = ["USA", "EUR", "JPN", "ASIA", "INT"];

    type FIELDS = keyof typeof FIELDS;
    type ORDER_FIELDS = "titleId" | "name" | "status";
    type ORDER_TYPE = "asc" | "desc";
    type REGION = "JPN" | "USA" | "EUR" | "ASIA" | "INT";

    type ApiCompatibilityEntry = {
        name: string;
        titleId: string;
        status: FIELDS;
        issueId: number;
    };

    type CompatibilityEntry = ApiCompatibilityEntry & {
        colorClass: string;
        translatedStatus: string;
        nativeName: string;
        region: REGION;
        regionFlag: string;
        reportUrl: string;
    };

    type CompatibilityGame = {
        name: string;
        nativeNames: string[];
        searchText: string;
        titleId: string;
        status: FIELDS;
        translatedStatus: string;
        colorClass: string;
        regions: CompatibilityEntry[];
        hasMixedStatus: boolean;
    };

    type CompatibilityViews = Record<FIELDS, CompatibilityGame[]>;

    let views: CompatibilityViews = $state(createEmptyViews());
    let activeView: FIELDS = $state("Unknown");
    let currentField: ORDER_FIELDS = $state("name");
    let currentOrder: ORDER_TYPE = $state("asc");
    let searchQuery = $state("");
    let lastUpdatedAt = $state("");
    let lastUpdatedAgo = $state("");
    let isLoading = $state(true);
    let loadError = $state("");
    let selectedGame: CompatibilityGame | null = $state(null);
    let selectedRegions: REGION[] = $state([]);

    const normalizedQuery = $derived(normalizeForSearch(searchQuery.trim()));

    const filteredGames = $derived(
        sortGames(
            views[activeView].filter(filterEntries).map(restrictToSelectedRegions),
            currentField,
            currentOrder,
        ),
    );

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

    function getRegionFlag(region: REGION) {
        switch (region) {
            case "USA":
                return asset("/img/flags/us.svg");
            case "EUR":
                return asset("/img/flags/eu.svg");
            case "JPN":
                return asset("/img/flags/jp.svg");
            case "ASIA":
                return asset("/img/flags/asia.svg");
            default:
                return asset("/img/flags/unk.svg");
        }
    }

    function getRegion(titleId: string): REGION {
        if (titleId.startsWith("PCSA") || titleId.startsWith("PCSE")) {
            return "USA";
        }

        if (titleId.startsWith("PCSB") || titleId.startsWith("PCSF")) {
            return "EUR";
        }

        if (titleId.startsWith("PCSC") || titleId.startsWith("PCSG")) {
            return "JPN";
        }

        if (titleId.startsWith("PCSD") || titleId.startsWith("PCSH")) {
            return "ASIA";
        }

        return "INT";
    }

    function getRegionMeta(titleId: string) {
        const region = getRegion(titleId);

        return { region, regionFlag: getRegionFlag(region) };
    }

    /** The title a release shipped with at home, when that is not the western one. */
    function getNativeName(titleId: string) {
        return nativeTitles[titleId] ?? "";
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

    /** Summarises every release of a game into the single row the list shows. */
    function createGame(regions: CompatibilityEntry[]) {
        const sortedRegions = [...regions].sort(compareEntries);
        const representative = [...regions].sort(
            (left, right) =>
                getStatusRank(right.status) - getStatusRank(left.status) || compareEntries(left, right),
        )[0];
        const titleId = [...sortedRegions].map(({ titleId }) => titleId).sort((left, right) => left.localeCompare(right))[0];
        const uniqueStatuses = new Set(sortedRegions.map(({ status }) => status));
        const nativeNames = [...new Set(sortedRegions.map(({ nativeName }) => nativeName).filter(Boolean))];

        return {
            name: sortedRegions[0].name,
            nativeNames,
            searchText: buildSearchText(sortedRegions),
            titleId,
            status: representative.status,
            translatedStatus: representative.translatedStatus,
            colorClass: representative.colorClass,
            regions: sortedRegions,
            hasMixedStatus: uniqueStatuses.size > 1,
        } satisfies CompatibilityGame;
    }

    /**
     * Rebuilds a game out of the selected regions only, so a filtered list never
     * shows the title IDs, flags or status of a release the reader filtered out.
     */
    function restrictToSelectedRegions(game: CompatibilityGame) {
        if (selectedRegions.length === 0) {
            return game;
        }

        return createGame(game.regions.filter(({ region }) => selectedRegions.includes(region)));
    }

    function changeView(field: FIELDS) {
        activeView = field;
    }

    function orderBy(field: ORDER_FIELDS) {
        if (currentField === field) {
            currentOrder = currentOrder === "asc" ? "desc" : "asc";
        } else {
            currentField = field;
            currentOrder = "asc";
        }
    }

    function toggleRegion(region: REGION) {
        selectedRegions = selectedRegions.includes(region)
            ? selectedRegions.filter((selected) => selected !== region)
            : [...selectedRegions, region];
    }

    function clearRegions() {
        selectedRegions = [];
    }

    function getRegionCount(region: REGION) {
        return views[activeView].filter((game) => game.regions.some((entry) => entry.region === region)).length;
    }

    /** Names the result set: the status view, narrowed by whichever regions are on. */
    function getResultsTitle() {
        if (selectedRegions.length === 0) {
            return activeView === "Unknown" ? m.compatibility_all() : getTranslatedStatus(activeView);
        }

        const regions = REGION_ORDER.filter((region) => selectedRegions.includes(region)).join(" + ");

        return activeView === "Unknown" ? regions : `${getTranslatedStatus(activeView)} · ${regions}`;
    }

    /**
     * Folds case, character width and kana, so a query finds a game however it was
     * typed: "ﾍﾟﾙｿﾅ", "ぺるそな" and "ペルソナ" all have to reach the same row.
     */
    function normalizeForSearch(value: string) {
        return value
            .normalize("NFKC")
            .toLowerCase()
            .replace(/[ぁ-ゖ]/g, (kana) => String.fromCharCode(kana.charCodeAt(0) + 0x60));
    }

    /** Everything a reader may type at a game: both its names, its IDs and its regions. */
    function buildSearchText(regions: CompatibilityEntry[]) {
        const terms = regions.flatMap(({ name, nativeName, titleId, region }) => [name, nativeName, titleId, region]);

        return normalizeForSearch(terms.join(" "));
    }

    function matchesSearch(entry: CompatibilityGame) {
        if (!normalizedQuery) {
            return true;
        }

        return entry.searchText.includes(normalizedQuery);
    }

    function matchesRegions(entry: CompatibilityGame) {
        if (selectedRegions.length === 0) {
            return true;
        }

        return entry.regions.some(({ region }) => selectedRegions.includes(region));
    }

    function filterEntries(entry: CompatibilityGame) {
        return matchesSearch(entry) && matchesRegions(entry);
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
        return filteredGames;
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

        return Array.from(groupedEntries.values()).map(createGame);
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
                    nativeName: getNativeName(entry.titleId),
                    reportUrl: `https://github.com/Vita3K/compatibility/issues/${entry.issueId}`,
                } satisfies CompatibilityEntry;
            });

            views = buildViews(groupEntries(enrichedEntries));
            lastUpdatedAt = updatedAt.toLocaleString();
            lastUpdatedAgo = timeAgo(updatedAt);
            activeView = "Unknown";
        } catch (error) {
            console.error("Failed to fetch compatibility data", error);
            loadError = m.compatibility_failed_to_load();
            views = createEmptyViews();
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
                    <div class="compatibility-region-filter">
                        <div class="region-filter-chips" role="group" aria-label={m.compatibility_filter_by_region()}>
                            <button
                                type="button"
                                class="filter-chip filter-chip--all"
                                class:active={selectedRegions.length === 0}
                                aria-pressed={selectedRegions.length === 0}
                                onclick={clearRegions}
                            >
                                <span>{m.compatibility_all_regions()}</span>
                            </button>

                            {#each REGION_ORDER as region (region)}
                                <button
                                    type="button"
                                    class="filter-chip filter-chip--region"
                                    class:active={selectedRegions.includes(region)}
                                    aria-pressed={selectedRegions.includes(region)}
                                    onclick={() => toggleRegion(region)}
                                >
                                    <img class="region-flag" src={getRegionFlag(region)} alt="" />
                                    <span>{region}</span>
                                    <strong>{getRegionCount(region)}</strong>
                                </button>
                            {/each}
                        </div>
                    </div>

                    <div class="results-toolbar">
                        <div class="results-heading">
                            <h2 id="compatibility-results-heading">
                                {getResultsTitle()}
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
                                            {#each game.nativeNames as nativeName (nativeName)}
                                                <p class="compatibility-game-native-name">{nativeName}</p>
                                            {/each}
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
                            <span class="region-picker-option-id">
                                {#if region.nativeName}
                                    <span class="region-picker-option-native">{region.nativeName}</span>
                                {/if}
                                {region.titleId}
                            </span>
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
