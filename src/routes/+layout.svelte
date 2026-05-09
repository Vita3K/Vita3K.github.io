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
