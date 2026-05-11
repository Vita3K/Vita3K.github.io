<script lang="ts">
    import { resolve } from "$app/paths";

    const { name, imageLink }: { name: string; imageLink: string } = $props();
</script>

<div class="col-lg-4 col-sm-6">
    <a
        class="portfolio-box"
        href={resolve(`/img/portfolio/fullsize/${imageLink}`)}
    >
        <img
            class="img-fluid"
            src={resolve(`/img/portfolio/thumbnails/${imageLink}`)}
            alt={name}
        />
        <div class="portfolio-box-caption">
            <div class="portfolio-box-caption-content">
                <div class="project-name">{name}</div>
            </div>
        </div>
    </a>
</div>
