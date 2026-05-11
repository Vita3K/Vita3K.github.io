<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import { asset, resolve } from "$app/paths";
    import ShowcaseImage from "$lib/components/ShowcaseImage.svelte";
</script>

<header
    class="masthead text-center text-white d-flex"
    style="background-image: url({asset('/img/header.webp')});"
>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <h1>
                    <strong>Vita3K</strong>
                </h1>
                <hr />
            </div>
            <div class="col-lg-8 mx-auto">
                <p class="text-faded mb-5">{m.home_description()}</p>
                <a class="btn btn-primary btn-xl" href="#about"
                    >{m.home_find_out_more()}</a
                >
            </div>
        </div>
    </div>
</header>
<section class="bg-primary" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading text-white">
                    {m.home_about_vita3k()}
                </h2>
                <hr class="light my-4" />
                <p class="text-faded mb-4">
                    {m.home_vita3k_description()}
                    <br />
                    {m.home_legal_notice()}
                </p>
            </div>
        </div>
    </div>
</section>
<section class="bg-dark text-white" id="blog">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading text-white">{m.home_whats_new()}</h2>
                <hr class="light my-4" />
                <p class="text-faded mb-4">
                    {m.home_blog_description()}<br /><br />
                    <a class="btn btn-primary btn-xl" href={resolve("/blog")}
                        >{m.home_blog()}</a
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
                    {m.home_check_out_what_currently_runs()}
                </h2>
                <hr class="my-4" />
                <p class="mb-5">
                    {@html m.home_the_emulator_can_run_some_commercial_games()}
                    <br />
                    {@html m.home_check_out_their_compatibility_list({
                        link: resolve("/compatibility"),
                    })}
                    <br />
                    <br />
                    <!-- {@html m.home_several_homebrew_games_are_also_supported()} -->
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
            <ShowcaseImage
                name="Hatsune Miku Project DIVA X"
                imageLink="3.webp"
            />
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
                <h2 class="section-heading">{m.home_show_us_your_love()}</h2>
                <hr class="my-4" />
                <p class="mb-5">
                    {@html m.home_ko_fi_page({
                        link: "https://ko-fi.com/vita3k/",
                    })}
                </p>
            </div>
        </div>
        <div class="row">
            <div class="container text-center">
                <i class="fa fa-coffee fa-3x mb-3 sr-contact"></i>
                <p>
                    <a
                        class="btn btn-light btn-xl sr-button"
                        href="https://ko-fi.com/vita3k/tiers"
                        >{m.home_become_a_supporter()}</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>
