<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import { resolve } from "$app/paths";
</script>

<section class="text-white" id="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>{m.footer_page_links()}</h3>
                <ul>
                    <li><a href={resolve("/quickstart")}>{m.nav_quickstart()}</a></li>
                    <li><a href={resolve("/blog")}>{m.nav_blog()}</a></li>
                    <li><a href={resolve("/faq")}>{m.nav_faqs()}</a></li>
                    <li>
                        <a href={resolve("/compatibility")}
                            >{m.nav_compatibility()}</a
                        >
                    </li>
                    <li><a href="https://ko-fi.com/vita3k">Ko-fi</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>GitHub</h3>
                <ul>
                    <li>
                        <a href="https://github.com/Vita3K/Vita3K">{m.footer_repository()}</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/Vita3K/Vita3K/pulls"
                            >{m.footer_pull_requests()}</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://github.com/Vita3K/Vita3K/graphs/contributors"
                            >{m.footer_contributors()}</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://github.com/Vita3K/Vita3K/commits/master"
                            >{m.footer_commits()}</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/Vita3K/Vita3K/issues"
                            >{m.footer_issues()}</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/Vita3K/Vita3K/wiki">{m.footer_wiki()}</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>{m.footer_social()}</h3>
                <ul>
                    <li><a href="https://discord.gg/6aGwQzh">Discord</a></li>
                    <li><a href="https://twitter.com/vita3k">Twitter</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>{m.footer_repositories()}</h3>
                <ul>
                    <li><a href="https://github.com/Vita3K">Vita3K</a></li>
                    <li>
                        <a href="https://github.com/Vita3K/compatibility"
                            >{m.footer_compatibility()}</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://github.com/Vita3K/homebrew-compatibility"
                            >{m.footer_homebrew_compatibility()}</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/Vita3K/Vita3K.github.io"
                            >{m.footer_website()}</a
                        >
                    </li>
                </ul>
            </div>
            <div class="col-lg-8 mx-auto text-center">
                <hr class="my-4" />
                <p class="mb-5">
                    <br />
                    {m.footer_legal_notice()}
                    <br />
                    <br /> Copyright © 2018-2026 Vita3K team
                    <br />
                    Logo by Gordon Mackay -
                    <a href="https://gordonmackayillustration.blogspot.co.uk/"
                        >{m.nav_blog()}</a
                    >
                    -
                    <a href="https://www.etsy.com/uk/shop/GMackayIllustration"
                        >Etsy</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>
