/**
 * The nightly build feed. Every build the bot still keeps lives as a release of the
 * Vita3K-builds repository, so the list is read from the GitHub API in the browser:
 * baking it into this statically built site would ship a snapshot that goes stale the
 * day after a deploy.
 */

const RELEASES_ENDPOINT = "https://api.github.com/repos/Vita3K/Vita3K-builds/releases";

/** Where a reader goes for anything this list does not carry. */
export const BUILD_RELEASES_URL = "https://github.com/Vita3K/Vita3K-builds/releases";

/** Releases per request: a screenful of builds, without pulling half a megabyte of JSON. */
export const BUILDS_PER_PAGE = 20;

/** The body the build bot writes: `Corresponding commit: [title](url) (author)`. */
const RELEASE_BODY = /^Corresponding commit: \[([\s\S]+)\]\((\S+)\)\s+\(([\s\S]+)\)$/;

/** What is left of that body on the odd release the bot managed to cut short. */
const RELEASE_BODY_PREFIX = /^Corresponding commit:\s*\[?/;

/** The revision an artifact was built from: `vita3k-4075-69fd32ef-windows-x86_64.7z`. */
const ASSET_REVISION = /^vita3k-\d+[-_]([0-9a-f]{7,40})[-_.]/i;

const REVISION_LENGTH = 8;

export type PlatformId =
    | "windows-x64"
    | "windows-arm"
    | "macos-x64"
    | "macos-arm"
    | "appimage-x64"
    | "appimage-arm"
    | "linux-x64"
    | "linux-arm"
    | "android";

export type Build = {
    /** The build number the bot tags a release with, `4075`. */
    version: string;
    /** Short revision of the commit the build was made from, empty when unknown. */
    revision: string;
    title: string;
    author: string;
    /** Empty for the rare release that never recorded its commit. */
    commitUrl: string;
    releaseUrl: string;
    publishedAt: Date;
    downloads: Partial<Record<PlatformId, string>>;
    searchText: string;
};

type ReleaseAsset = {
    name: string;
    browser_download_url: string;
};

type Release = {
    tag_name: string;
    name: string;
    body: string | null;
    html_url: string;
    published_at: string;
    draft: boolean;
    assets: ReleaseAsset[];
};

/**
 * Which build an artifact is. Names have been through several shapes over the years
 * — `vita3k-3840-2a10d6ee_windows.7z`, `vita3k-4075-69fd32ef-windows-x86_64.7z`,
 * `windows-latest.zip` — but every one of them still says its platform out loud, and
 * the ones from before the ARM builds existed are all x64.
 */
function getPlatform(assetName: string): PlatformId | null {
    const name = assetName.toLowerCase();

    if (name.endsWith(".zsync")) {
        return null;
    }

    const arm = /arm64|aarch64/.test(name);

    if (name.endsWith(".appimage")) {
        return arm ? "appimage-arm" : "appimage-x64";
    }

    if (name.includes("android")) {
        return "android";
    }

    if (name.includes("windows")) {
        return arm ? "windows-arm" : "windows-x64";
    }

    if (name.includes("macos")) {
        return arm ? "macos-arm" : "macos-x64";
    }

    if (name.includes("ubuntu") || name.includes("linux")) {
        return arm ? "linux-arm" : "linux-x64";
    }

    return null;
}

function getRevision(assets: ReleaseAsset[], commitUrl: string) {
    const commitSha = commitUrl.split("/").pop() ?? "";

    if (/^[0-9a-f]{7,40}$/i.test(commitSha)) {
        return commitSha.slice(0, REVISION_LENGTH);
    }

    for (const asset of assets) {
        const assetRevision = ASSET_REVISION.exec(asset.name);

        if (assetRevision) {
            return assetRevision[1].slice(0, REVISION_LENGTH);
        }
    }

    return "";
}

/**
 * One download per platform. A rebuilt nightly carries the artifacts of both revisions,
 * so the ones the release itself points at win and anything left over fills the gaps.
 */
function collectDownloads(assets: ReleaseAsset[], revision: string) {
    const downloads: Partial<Record<PlatformId, string>> = {};
    const ordered =
        revision === ""
            ? assets
            : [...assets].sort(
                  (left, right) =>
                      Number(right.name.includes(revision)) - Number(left.name.includes(revision)),
              );

    for (const asset of ordered) {
        const platform = getPlatform(asset.name);

        if (platform && !downloads[platform]) {
            downloads[platform] = asset.browser_download_url;
        }
    }

    return downloads;
}

function toBuild(release: Release): Build {
    const body = (release.body ?? "").trim();
    const details = RELEASE_BODY.exec(body);
    const commitUrl = details?.[2] ?? "";
    const author = details?.[3].trim() ?? "";
    const title = (details?.[1] ?? body.replace(RELEASE_BODY_PREFIX, "")).trim() || release.name;
    const revision = getRevision(release.assets, commitUrl);

    return {
        version: release.tag_name,
        revision,
        title,
        author,
        commitUrl,
        releaseUrl: release.html_url,
        publishedAt: new Date(release.published_at),
        downloads: collectDownloads(release.assets, revision),
        searchText: [release.tag_name, revision, title, author].join(" ").toLowerCase(),
    };
}

export async function fetchBuilds(page: number) {
    const response = await fetch(`${RELEASES_ENDPOINT}?per_page=${BUILDS_PER_PAGE}&page=${page}`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const releases = (await response.json()) as Release[];

    return {
        builds: releases.filter((release) => !release.draft).map(toBuild),
        hasMore: releases.length === BUILDS_PER_PAGE,
    };
}
