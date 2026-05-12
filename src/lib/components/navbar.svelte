<script lang="ts">
    import { resolve } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import { setLocale, getLocale, locales } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import VerticalSeparator from "$lib/components/VerticalSeparator.svelte";

    import logo from "$lib/assets/logo.svg";

    let selectedLocale = $state(getLocale());

    $effect(() => {
        setLocale(selectedLocale);
    });

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
                        href="https://crowdin.com/project/Vita3k"
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
                <select bind:value={selectedLocale}>
                    {#each locales as locale (locale)}
                        <option
                            value={locale}
                            selected={getLocale() === locale}
                        >
                            {m.nav_lang({}, { locale: locale })}
                        </option>
                    {/each}
                </select>
            </ul>
        </div>
    </div>
</nav>
