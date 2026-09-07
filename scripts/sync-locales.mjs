// Decides which of the languages Crowdin just downloaded the site actually ships,
// and rewrites project.inlang/settings.json to match.
// Usage: node scripts/sync-locales.mjs   (see .github/workflows/crowdin-sync.yml)
import { appendFileSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const TRANSLATIONS = fileURLToPath(new URL("../translations", import.meta.url));
const SETTINGS = fileURLToPath(new URL("../project.inlang/settings.json", import.meta.url));

/** Locales written by hand in this repository. Crowdin never sends them, so they are never judged. */
const UNMANAGED_LOCALES = new Set(["pirate"]);

/**
 * The language picker labels every entry with that language's own `nav_lang`. A language
 * missing it falls back to the source string and shows up in the menu as a second "English",
 * so it is not ready to ship however much of the rest is translated.
 */
const REQUIRED_MESSAGE = "nav_lang";

/** Share of the site a language has to reach before visitors are offered it. */
const MIN_COMPLETION = Number(process.env.MIN_COMPLETION || 80);

const settingsSource = readFileSync(SETTINGS, "utf8");
const settings = JSON.parse(settingsSource);
const { baseLocale } = settings;
const shipping = new Set(settings.locales);

function messagesOf(locale) {
    const file = `${TRANSLATIONS}/${locale}/website.json`;

    if (!existsSync(file)) {
        return {};
    }

    try {
        return JSON.parse(readFileSync(file, "utf8"));
    } catch (error) {
        // A truncated download should cost one language, not the whole sync.
        console.warn(`Ignoring unreadable ${file}: ${error.message}`);
        return {};
    }
}

const sourceKeys = Object.keys(messagesOf(baseLocale));

if (sourceKeys.length === 0) {
    throw new Error(`No source messages found for the base locale "${baseLocale}"`);
}

const downloaded = readdirSync(TRANSLATIONS, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((locale) => locale !== baseLocale && !UNMANAGED_LOCALES.has(locale))
    .sort();

const rows = [];

for (const locale of downloaded) {
    const messages = messagesOf(locale);

    // The download runs with `skip_untranslated_strings`, so a key being present in the
    // file is the same thing as it having been translated.
    const translated = sourceKeys.filter(
        (key) => typeof messages[key] === "string" && messages[key].trim() !== ""
    ).length;
    const completion = Math.round((translated / sourceKeys.length) * 100);
    const named = typeof messages[REQUIRED_MESSAGE] === "string" && messages[REQUIRED_MESSAGE].trim() !== "";

    // A language already on the site stays on it: Crowdin losing ground over a month is a
    // reason to read the diff, not to take a language away from the people using it.
    if (shipping.has(locale)) {
        rows.push({
            locale,
            completion,
            enabled: false,
            status: "Shipping",
            note: named ? "" : `\`${REQUIRED_MESSAGE}\` is no longer translated`,
        });
        continue;
    }

    if (completion >= MIN_COMPLETION && named) {
        shipping.add(locale);
        rows.push({ locale, completion, enabled: true, status: "**Enabled**", note: "new language" });
        continue;
    }

    // Nothing reads a language that is not in settings.json, so leave no half-translated
    // files behind for the reviewer to scroll past.
    rmSync(`${TRANSLATIONS}/${locale}`, { recursive: true, force: true });
    rows.push({
        locale,
        completion,
        enabled: false,
        status: "Skipped",
        note: completion < MIN_COMPLETION ? `under ${MIN_COMPLETION}%` : `\`${REQUIRED_MESSAGE}\` not translated`,
    });
}

const locales = [baseLocale, ...[...shipping].filter((locale) => locale !== baseLocale).sort()];

// Rewriting the file when the list has not moved would reformat it into a diff that says
// nothing, and a pull request whose only content is that reformatting.
if (locales.join() !== settings.locales.join()) {
    settings.locales = locales;

    // settings.json is committed with CRLF, and rewriting it with LF would bury the one line
    // that changed under a whole-file diff.
    const eol = settingsSource.includes("\r\n") ? "\r\n" : "\n";
    writeFileSync(SETTINGS, `${JSON.stringify(settings, null, "\t")}\n`.replaceAll("\n", eol));
}

const table =
    rows.length === 0
        ? ["Crowdin returned no languages."]
        : [
              "| Language | Translated | Status |",
              "| --- | ---: | --- |",
              ...rows.map(
                  (row) => `| \`${row.locale}\` | ${row.completion}% | ${row.status}${row.note ? ` — ${row.note}` : ""} |`
              ),
          ];

const text = [
    "## Languages",
    "",
    `A new language goes live once **${MIN_COMPLETION}%** of the site is translated and \`${REQUIRED_MESSAGE}\` has a translation; languages already on the site are always kept.`,
    "",
    ...table,
    "",
].join("\n");

console.log(text);

for (const target of [process.env.REPORT_PATH, process.env.GITHUB_STEP_SUMMARY]) {
    if (target) {
        appendFileSync(target, `${text}\n`);
    }
}

if (process.env.GITHUB_OUTPUT) {
    const added = rows.filter((row) => row.enabled).map((row) => row.locale);
    appendFileSync(process.env.GITHUB_OUTPUT, `enabled=${added.join(",")}\n`);
}
