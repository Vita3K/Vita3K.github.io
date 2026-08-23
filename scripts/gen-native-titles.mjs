// Regenerates src/lib/native-titles.ts, the PS Vita native-language title database.
// Usage: npm run gen:native-titles
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SOURCE = "https://kood.info/pstic/json/ps3_psp_psv_tid_cid.json";
const OUTPUT = fileURLToPath(new URL("../src/lib/native-titles.ts", import.meta.url));

/** Retail and PSN title IDs handed out to PS Vita releases. */
const VITA_TITLE_ID = /^PCS[A-Z]\d{5}$/;

/** Kana, CJK ideographs and Hangul: the scripts a native title is written in. */
const NATIVE_SCRIPT =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/;

const response = await fetch(SOURCE);

if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
}

const lastModified = response.headers.get("last-modified") ?? "unknown";
const database = await response.json();

/**
 * The upstream lists every name a release is known by, in no fixed order and with
 * the localised one missing entirely for most western titles: the first name written
 * in a native script is the one worth keeping.
 */
const titles = Object.entries(database)
    .filter(([titleId]) => VITA_TITLE_ID.test(titleId))
    .map(([titleId, entry]) => [titleId, (entry?.title ?? []).find((title) => NATIVE_SCRIPT.test(title))])
    .filter(([, nativeTitle]) => nativeTitle !== undefined)
    .sort(([left], [right]) => left.localeCompare(right));

const contents = [
    "// GENERATED FILE, DO NOT EDIT. Run `npm run gen:native-titles` to refresh it.",
    `// Source: ${SOURCE}`,
    `// Upstream last modified: ${lastModified}`,
    `// ${titles.length} titles`,
    "",
    "export const nativeTitles: Readonly<Record<string, string>> = {",
    ...titles.map(([titleId, nativeTitle]) => `\t${JSON.stringify(titleId)}: ${JSON.stringify(nativeTitle)},`),
    "};",
    "",
].join("\n");

writeFileSync(OUTPUT, contents);

console.log(`Wrote ${titles.length} native titles to ${OUTPUT}`);
