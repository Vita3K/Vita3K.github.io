<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import { resolve } from "$app/paths";
</script>

<section class="text-white" id="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>　Page Links</h3>
                <ul>
                    <li><a href={resolve("/quickstart")}>Quickstart</a></li>
                    <li><a href={resolve("/blog")}>Blog</a></li>
                    <li><a href={resolve("/faq")}>FAQs</a></li>
                    <li><a href={resolve("/compatibility")}>Compatibility List</a></li>
                    <li><a href="https://ko-fi.com/vita3k">ko-fi</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>　GitHub</h3>
                <ul>
                    <li><a href="https://github.com/Vita3K/Vita3K">Repository</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K/pulls">Pull Requests</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K/graphs/contributors">Contributors</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K/commits/master">Commits</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K/issues">Issues</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K/wiki">Wiki</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>　Social</h3>
                <ul>
                    <li><a href="https://discord.gg/6aGwQzh">Discord</a></li>
                    <li><a href="https://twitter.com/vita3k">Twitter</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h3>　Repos</h3>
                <ul>
                    <li><a href="https://github.com/Vita3K">Vita3K</a></li>
                    <li><a href="https://github.com/Vita3K/compatibility">Compatibility</a></li>
                    <li><a href="https://github.com/Vita3K/homebrew-compatibility">Homebrew Compatibility</a></li>
                    <li><a href="https://github.com/Vita3K/Vita3K.github.io">Website</a></li>
                </ul>
            </div>
            <div class="col-lg-8 mx-auto text-center">
                <hr class="my-4" />
                <p class="mb-5">
                    <br>
                    {m.playstation_trademarks()} {m.the_emulator_is_not_related_to_sony()}
                    <br>
                    <br> Copyright © 2018-2026 Vita3K team
                    <br> {m.logo_by()} Gordon Mackay - <a href="https://gordonmackayillustration.blogspot.co.uk/">Blog</a> - <a href="https://www.etsy.com/uk/shop/GMackayIllustration">Etsy</a>
                </p>
            </div>
        </div>
    </div>
</section>

