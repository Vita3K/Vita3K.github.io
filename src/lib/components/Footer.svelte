<script lang="ts">
    import { resolve } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import logo from "$lib/assets/logo.svg";

    const currentYear = new Date().getFullYear();

    const pageLinks = [
        { href: resolve("/quickstart"), label: () => m.nav_quickstart() },
        { href: resolve("/blog"), label: () => m.nav_blog() },
        { href: resolve("/faq"), label: () => m.nav_faqs() },
        { href: resolve("/compatibility"), label: () => m.nav_compatibility() },
        { href: "https://ko-fi.com/vita3k", label: () => "Ko-fi", external: true }
    ];

    const githubLinks = [
        { href: "https://github.com/Vita3K/Vita3K", label: () => m.footer_repository(), external: true },
        { href: "https://github.com/Vita3K/Vita3K/pulls", label: () => m.footer_pull_requests(), external: true },
        {
            href: "https://github.com/Vita3K/Vita3K/graphs/contributors",
            label: () => m.footer_contributors(),
            external: true
        },
        { href: "https://github.com/Vita3K/Vita3K/commits/master", label: () => m.footer_commits(), external: true },
        { href: "https://github.com/Vita3K/Vita3K/issues", label: () => m.footer_issues(), external: true },
        { href: "https://github.com/Vita3K/Vita3K/wiki", label: () => m.footer_wiki(), external: true }
    ];

    const socialLinks = [
        { href: "https://discord.gg/6aGwQzh", label: () => "Discord", external: true },
        { href: "https://twitter.com/vita3k", label: () => "Twitter", external: true }
    ];

    const repositoryLinks = [
        { href: "https://github.com/Vita3K", label: () => "Vita3K", external: true },
        { href: "https://github.com/Vita3K/compatibility", label: () => m.footer_compatibility(), external: true },
        {
            href: "https://github.com/Vita3K/homebrew-compatibility",
            label: () => m.footer_homebrew_compatibility(),
            external: true
        },
        { href: "https://github.com/Vita3K/Vita3K.github.io", label: () => m.footer_website(), external: true }
    ];

    const sections = [
        { heading: () => m.footer_page_links(), links: pageLinks },
        { heading: () => "GitHub", links: githubLinks },
        { heading: () => m.footer_social(), links: socialLinks },
        { heading: () => m.footer_repositories(), links: repositoryLinks }
    ];
</script>

<section class="text-white" id="footer">
    <div class="container">
        <div class="footer-shell">
            <div class="footer-brand">
                <a class="footer-home" href={resolve("/")} aria-label="Vita3K home">
                    <img
                        class="footer-logo"
                        src={logo}
                        width="52"
                        height="52"
                        title="Logo by Gordon Mackay"
                        alt="Vita3K logo"
                    />
                    <div>
                        <h2>Vita3K</h2>
                    </div>
                </a>
                <p class="footer-copy">
                    {m.footer_legal_notice()}
                </p>
                <p class="footer-meta">
                    <span>&copy; 2018-{currentYear} Vita3K team</span>
                    <span>
                        Logo by Gordon Mackay
                        <a href="https://gordonmackayillustration.blogspot.co.uk/">Blog</a>
                        /
                        <a href="https://www.etsy.com/uk/shop/GMackayIllustration">Etsy</a>
                    </span>
                </p>
            </div>

            <div class="footer-links-grid">
                <!-- eslint-disable svelte/no-navigation-without-resolve -->
                {#each sections as section (section.heading())}
                    <div class="footer-section">
                        <h3>{section.heading()}</h3>
                        <ul>
                            {#each section.links as link (link.href)}
                                <li>
                                    <a
                                        class="footer-link"
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noreferrer" : undefined}
                                    >
                                        {link.label()}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
                <!-- eslint-enable svelte/no-navigation-without-resolve -->
            </div>
        </div>
    </div>
</section>
