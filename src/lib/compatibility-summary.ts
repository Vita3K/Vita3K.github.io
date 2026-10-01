/**
 * The handful of numbers the home page shows about the compatibility list. It reads
 * the same feed as the compatibility page and counts games the same way, so the two
 * pages never disagree about a percentage.
 */

export const SUMMARY_STATUSES = [
    "Nothing",
    "Bootable",
    "Intro",
    "Menu",
    "Ingame -",
    "Ingame +",
    "Playable",
] as const;

export type SummaryStatus = (typeof SUMMARY_STATUSES)[number];

export type CompatibilitySummary = {
    /** Games with a status, online-only ones left out like on the compatibility page. */
    total: number;
    counts: Record<SummaryStatus, number>;
};

type ApiEntry = { name: string; labels: string };

/** A report carrying several statuses is read as the worst of them. */
function getStatus(labels: string): SummaryStatus | null {
    const names = new Set(
        (JSON.parse(labels) as { name: string }[]).map(({ name }) => name),
    );
    const status = SUMMARY_STATUSES.find((candidate) => names.has(candidate));

    return status ?? null;
}

function isOnlineOnly(labels: string) {
    return labels.includes('"online-only"');
}

export async function fetchCompatibilitySummary(): Promise<CompatibilitySummary> {
    const response = await fetch("https://api.vita3k.org/list/commercial");

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const { list } = (await response.json()) as { list: ApiEntry[] };
    const games = new Map<string, { rank: number; onlineOnly: boolean }>();

    for (const entry of list) {
        const key = entry.name.trim().toLowerCase();
        const status = getStatus(entry.labels);
        const rank = status ? SUMMARY_STATUSES.indexOf(status) : -1;
        const game = games.get(key) ?? { rank: -1, onlineOnly: false };

        game.rank = Math.max(game.rank, rank);
        game.onlineOnly ||= isOnlineOnly(entry.labels);
        games.set(key, game);
    }

    const counts = Object.fromEntries(
        SUMMARY_STATUSES.map((status) => [status, 0]),
    ) as Record<SummaryStatus, number>;
    let total = 0;

    for (const { rank, onlineOnly } of games.values()) {
        if (onlineOnly) {
            continue;
        }

        total++;

        if (rank >= 0) {
            counts[SUMMARY_STATUSES[rank]]++;
        }
    }

    return { total, counts };
}
