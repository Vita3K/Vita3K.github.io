<script lang="ts">
    import { resolve } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import { setLocale, getLocale, locales } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import VerticalSeparator from "$lib/components/VerticalSeparator.svelte";
    import { onMount } from "svelte";

    import logo from "$lib/assets/logo.svg";

    // Real spoken languages the site itself is translated into.
    // ("pirate" is a joke locale, so it's intentionally excluded here.)
    const SUPPORTED_LOCALES = ["en", "es"];
    const GOOGLE_TRANSLATE_VALUE = "google-translate";
    const GOOGLE_TRANSLATE_COOKIE = "googtrans";

    let currentSelectValue: string = $state(getLocale());
    let showGoogleTranslateOption = $state(false);
    let googleTranslateLabel = $state("");
    let googleTranslateLangCode = $state("en");
    let translated = $state(false);

    function readCookie(name: string): string | null {
        const match = document.cookie.match(
            new RegExp("(?:^|; )" + name + "=([^;]*)"),
        );
        return match ? decodeURIComponent(match[1]) : null;
    }

    function writeCookie(name: string, value: string) {
        document.cookie = `${name}=${value};path=/`;
    }

    function clearCookie(name: string) {
        // Google's widget writes `googtrans` with a domain attribute (e.g.
        // `.vita3k.org`), and a cookie carrying a domain can only be deleted by
        // a delete that names the same domain. Clear every scope it may live
        // under, otherwise the cookie survives the reload and the page just
        // gets translated again.
        const { hostname } = location;
        const domains: (string | null)[] = [null, hostname, `.${hostname}`];

        const parts = hostname.split(".");
        for (let i = 1; i < parts.length - 1; i++) {
            const parent = parts.slice(i).join(".");
            domains.push(parent, `.${parent}`);
        }

        for (const domain of domains) {
            document.cookie =
                `${name}=;path=/;max-age=0` +
                (domain ? `;domain=${domain}` : "");
        }
    }

    function ensureGoogleTranslateWidgetLoaded() {
        if (document.getElementById("google-translate-script")) return;

        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                { pageLanguage: "en", autoDisplay: false },
                "google_translate_element",
            );
        };

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.head.appendChild(script);
    }

    // Google's own script re-applies inline `!important` styles to show its
    // banner and push the page down, which beats our stylesheet rules. Keep
    // forcing it back off whenever it tries.
    function suppressGoogleBanner() {
        const hideBanner = () => {
            // The banner's class name is obfuscated and differs between widget
            // versions, so match every top-level `skiptranslate` iframe.
            document
                .querySelectorAll<HTMLElement>("iframe.skiptranslate")
                .forEach((frame) =>
                    frame.style.setProperty("display", "none", "important"),
                );
            document.body.style.setProperty("top", "0px", "important");
        };

        hideBanner();

        const observer = new MutationObserver(hideBanner);
        observer.observe(document.body, {
            childList: true,
            attributes: true,
            attributeFilter: ["style"],
        });
    }

    onMount(() => {
        suppressGoogleBanner();

        const browserLang = navigator.language.split("-")[0].toLowerCase();
        googleTranslateLangCode = browserLang;

        try {
            googleTranslateLabel = new Intl.DisplayNames([browserLang], {
                type: "language",
            }).of(browserLang) as string;
        } catch {
            googleTranslateLabel = browserLang;
        }

        showGoogleTranslateOption = !SUPPORTED_LOCALES.includes(browserLang);
        translated = !!readCookie(GOOGLE_TRANSLATE_COOKIE);

        if (translated) {
            ensureGoogleTranslateWidgetLoaded();
            currentSelectValue = GOOGLE_TRANSLATE_VALUE;
        }
    });

    function handleLocaleSelect(event: Event) {
        const value = (event.currentTarget as HTMLSelectElement).value;

        if (value === GOOGLE_TRANSLATE_VALUE) {
            if (!translated) {
                writeCookie(
                    GOOGLE_TRANSLATE_COOKIE,
                    `/en/${googleTranslateLangCode}`,
                );
                ensureGoogleTranslateWidgetLoaded();
                location.reload();
            }
            return;
        }

        currentSelectValue = value;

        if (translated) {
            clearCookie(GOOGLE_TRANSLATE_COOKIE);
            // `setLocale` skips its reload when the locale is unchanged, and the
            // site locale doesn't change while Google translates on top of it.
            // Reload explicitly so the translated DOM is actually reverted,
            // otherwise there is no way back once Google's banner is hidden.
            setLocale(value as (typeof locales)[number], { reload: false });

            // Google also re-applies the translation from a `#googtrans(..)`
            // hash, so drop it instead of doing a plain reload.
            if (location.hash.includes("googtrans")) {
                location.href = location.pathname + location.search;
            } else {
                location.reload();
            }
            return;
        }

        setLocale(value as (typeof locales)[number]);
    }

    let navCollapsed = $state(true);
    function toggleNavbar() {
        navCollapsed = !navCollapsed;
    }

    function collapseNavbar() {
        navCollapsed = true;
    }
</script>

<nav
    class="navbar navbar-expand-lg navbar-light fixed-top bg-dark"
    id="mainNav"
>
    <div class="container">
        <a class="nav-link" href={resolve("/")} on:click={collapseNavbar}>
            <img
                class="logo"
                src={logo}
                width="32"
                height="32"
                title="Logo by Gordon Mackay"
                alt="Home"
            />
        </a>
        <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            aria-controls="navbarResponsive"
            aria-expanded={!navCollapsed}
            aria-label="Toggle navigation"
            on:click={toggleNavbar}
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="navbar-collapse collapse"
            class:show={!navCollapsed}
            id="navbarResponsive"
        >
            <ul class="navbar-nav ml-auto text-center">
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link
                    {page.url.pathname === resolve('/quickstart')
                            ? 'active'
                            : ''}"
                        href={resolve("/quickstart")}
                        on:click={collapseNavbar}>{m.nav_quickstart()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link
                        {page.url.pathname.startsWith(resolve('/blog'))
                            ? 'active'
                            : ''}"
                        href={resolve("/blog")}
                        on:click={collapseNavbar}>{m.nav_blog()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link
                        {page.url.pathname === resolve('/faq') ? 'active' : ''}"
                        href={resolve("/faq")}
                        on:click={collapseNavbar}>{m.nav_faqs()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link
                        {page.url.pathname === resolve('/download')
                            ? 'active'
                            : ''}"
                        href={resolve("/download")}
                        on:click={collapseNavbar}>{m.nav_download()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link
                        {page.url.pathname === resolve('/compatibility')
                            ? 'active'
                            : ''}"
                        href={resolve("/compatibility")}
                        on:click={collapseNavbar}>{m.nav_compatibility()}</a
                    >
                </li>
                <VerticalSeparator />
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://discord.gg/6aGwQzh"
                        on:click={collapseNavbar}>Discord</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://github.com/Vita3K"
                        on:click={collapseNavbar}>GitHub</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://crowdin.vita3k.org"
                        on:click={collapseNavbar}>{m.nav_translate()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://ko-fi.com/vita3k"
                        on:click={collapseNavbar}>{m.nav_donate()}</a
                    >
                </li>
                <VerticalSeparator />
                <select value={currentSelectValue} on:change={handleLocaleSelect}>
                    {#each locales as locale (locale)}
                        <option value={locale}>
                            {m.nav_lang({}, { locale: locale })}
                        </option>
                    {/each}
                    {#if showGoogleTranslateOption}
                        <option value={GOOGLE_TRANSLATE_VALUE}>
                            🌐 {googleTranslateLabel}
                        </option>
                    {/if}
                </select>
                <div id="google_translate_element" class="d-none"></div>
            </ul>
        </div>
    </div>
</nav>
