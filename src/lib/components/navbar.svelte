<script lang="ts">
    import { resolve } from "$app/paths";
    import { m } from "$lib/paraglide/messages.js";
    import VerticalSeparator from "$lib/components/VerticalSeparator.svelte";
</script>

<nav class="navbar navbar-expand-lg navbar-light fixed-top bg-dark" id="mainNav">
    <div class="container">
        <a class="nav-link" href={resolve("/")}>
            <img
                class="logo"
                src="/img/logo.svg"
                width="32"
                height="32"
                title="Logo by Gordon Mackay"
                alt="Home"
            />
        </a>
        <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto text-center">
                <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" href={resolve("/quickstart")}
                        >{m.quickstart()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a class="nav-link js-scroll-trigger" href={resolve("/blog")}
                        >{m.blog()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" href={resolve("/faq")}>{m.faqs()}</a>
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link js-scroll-trigger"
                        href={resolve("/download")}>{m.download()}</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a class="nav-link js-scroll-trigger" href={resolve("/compatibility")}
                        >{m.compatibility()}</a
                    >
                </li>
                <VerticalSeparator />
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link js-scroll-trigger"
                        href="https://discord.gg/6aGwQzh">Discord</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link js-scroll-trigger"
                        href="https://github.com/Vita3K">GitHub</a
                    >
                </li>
                <li class="nav-item d-flex align-items-center">
                    <a
                        class="nav-link js-scroll-trigger"
                        href="https://ko-fi.com/vita3k">{m.donate()}</a
                    >
                </li>
                <VerticalSeparator />
                <li class="nav-item">
                    <a
                        class="nav-link js-scroll-trigger"
                        href="#"
                        data-toggle="modal"
                        data-target="#language"
                    >
                        lang
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
