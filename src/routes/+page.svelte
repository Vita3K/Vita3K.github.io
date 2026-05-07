<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import { resolve } from "$app/paths";
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
<section class="p-0" id="showcase">
    <div class="container-fluid p-0">
        <div class="row no-gutters popup-gallery">
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/1.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/1.webp")}
                        alt="Persona 4 Golden"
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">Persona 4 Golden</div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/2.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/2.webp")}
                        alt="Freedom Wars"
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">Freedom Wars</div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/3.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/3.webp")}
                        alt="Hatsune Miku Project DIVA X"
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">
                                Hatsune Miku Project DIVA X
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/4.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/4.webp")}
                        alt="Muramasa Rebirth"
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">Muramasa Rebirth</div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/5.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/5.webp")}
                        alt="Borderlands 2"
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">Borderlands 2</div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-4 col-sm-6">
                <a
                    class="portfolio-box"
                    href={resolve("/img/portfolio/fullsize/6.webp")}
                >
                    <img
                        class="img-fluid"
                        src={resolve("/img/portfolio/thumbnails/6.webp")}
                        alt=""
                    />
                    <div class="portfolio-box-caption">
                        <div class="portfolio-box-caption-content">
                            <div class="project-name">Soul Sacrifice Delta</div>
                        </div>
                    </div>
                </a>
            </div>
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
