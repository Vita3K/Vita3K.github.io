<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import { resolve } from "$app/paths";
    import ShowcaseImage from "$lib/components/ShowcaseImage.svelte";
</script>

<header class="masthead text-center text-white d-flex">
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <h1>
                    <strong>Vita3K</strong>
                </h1>
                <hr />
            </div>
            <div class="col-lg-8 mx-auto">
                <p class="text-faded mb-5">{m.description()}</p>
                <a
                    class="btn btn-primary btn-xl js-scroll-trigger"
                    href="#about">{m.find_out_more()}</a
                >
            </div>
        </div>
    </div>
</header>
<section class="bg-primary" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading text-white">{m.about_vita3k()}</h2>
                <hr class="light my-4" />
                <p class="text-faded mb-4">
                    {m.vita3k_description()}
                    <br />
                    {m.legal_notice()}
                </p>
            </div>
        </div>
    </div>
</section>
<section class="bg-dark text-white" id="blog">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading text-white">{m.whats_new()}</h2>
                <hr class="light my-4" />
                <p class="text-faded mb-4">
                    {m.blog_description()}<br /><br />
                    <a
                        class="btn btn-primary btn-xl js-scroll-trigger"
                        href={resolve("/blog")}>{m.blog()}</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>

<!-- WHAT RUNS -->

<section class="bg-white text-dark" id="compatibility">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading">
                    {m.check_out_what_currently_runs()}
                </h2>
                <hr class="my-4" />
                <p class="mb-5">
                    {@html m.the_emulator_can_run_some_commercial_games()}
                    <br />
                    {@html m.check_out_their_compatibility_list({
                        link: resolve("/compatibility"),
                    })}
                    <br />
                    <br />
                    <!-- {@html m.several_homebrew_games_are_also_supported()} -->
                </p>
            </div>
        </div>
    </div>
</section>

<!-- SHOWCASE -->

<section class="p-0" id="showcase">
    <div class="container-fluid p-0">
        <div class="row no-gutters popup-gallery">
            <ShowcaseImage name="Persona 4 Golden" imageLink="1.webp" />
            <ShowcaseImage name="Freedom Wars" imageLink="2.webp" />
            <ShowcaseImage name="Hatsune Miku Project DIVA X" imageLink="3.webp" />
            <ShowcaseImage name="Muramasa Rebirth" imageLink="4.webp" />
            <ShowcaseImage name="Borderlands 2" imageLink="5.webp" />
            <ShowcaseImage name="Soul Sacrifice Delta" imageLink="6.webp" />
        </div>
    </div>
</section>

<!-- DONATE -->

<section class="bg-white text-dark" id="donate">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading">{m.show_us_your_love()}</h2>
                <hr class="my-4" />
                <p class="mb-5">{@html m.ko_fi_page()}</p>
            </div>
        </div>
        <div class="row">
            <div class="container text-center">
                <i class="fa fa-coffee fa-3x mb-3 sr-contact"></i>
                <p>
                    <a
                        class="btn btn-light btn-xl sr-button"
                        href="https://ko-fi.com/vita3k/tiers"
                        >{m.become_a_supporter()}</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>
