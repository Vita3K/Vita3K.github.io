<script lang="ts">
    import type { Pathname } from "$app/types";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { locales, localizeHref } from "$lib/paraglide/runtime";
    import favicon from "$lib/assets/favicon.ico";

    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import "bootstrap/scss/bootstrap.scss";
    import "$lib/scss/creative.scss";

    let { children } = $props();
</script>

<Navbar />

<svelte:head>
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "UA-118291431-1");
    </script>

    <link rel="icon" href={favicon} />
    <!-- Custom fonts for this template -->
    <link
        href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
        rel="stylesheet"
        type="text/css"
    />
    <link
        href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic"
        rel="stylesheet"
        type="text/css"
    />
    <title>Vita3K - Playstation Vita Emulator</title>
    <meta charset="utf-8" />
    <meta
        name="description"
        content="Vita3K is an experimental open-source Sony PlayStation Vita emulator for Windows, macOS, Linux and Android written in C++."
    />
    <meta
        name="keywords"
        content="vita3k, PSVita, PSVita emulator, PSVita emulation, PSVita, emulator, windows, macos, linux, android"
    />
    <meta name="author" content="Vita3K team" />
    <meta name="copyright" content="Vita3K team" />
    <meta property="og:title" content="Vita3K - PlayStation Vita Emulator" />
    <meta
        property="og:description"
        content="Vita3K is an experimental open-source Sony PlayStation Vita emulator for Windows, macOS, Linux and Android written in C++."
    />
    <meta property="og:image" content="https://vita3k.org/img/logo.webp" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:url" content="https://vita3k.org/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Vita3K" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@Vita3K" />
    <meta name="twitter:title" content="Vita3K - Playstation Vita Emulator" />
    <meta
        name="twitter:description"
        content="Vita3K is an experimental open-source Sony PlayStation Vita emulator for Windows, macOS, Linux and Android written in C++."
    />
    <meta name="twitter:image" content="https://vita3k.org/img/logo.webp" />
    <meta name="theme-color" content="#ffa500" />
    <!-- orange -->
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
</svelte:head>

<div style="display:none">
    {#each locales as locale (locale)}
        <a
            href={resolve(
                localizeHref(page.url.pathname, { locale }) as Pathname,
            )}>{locale}</a
        >
    {/each}
</div>

<noscript>
    <iframe
        title="gtm"
        src="https://www.googletagmanager.com/ns.html?id=UA-118291431-10"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
    >
    </iframe>
</noscript>

{@render children()}

<Footer />

<!-- Page top button -->
<a
    class="nav-link js-scroll-trigger"
    href="#"
    id="page_top"
    aria-label="Go to top"
>
</a>
