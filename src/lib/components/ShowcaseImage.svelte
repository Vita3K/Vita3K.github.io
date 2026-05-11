<script lang="ts">
    import { asset } from "$app/paths";

    const { name, imageLink }: { name: string; imageLink: string } = $props();
</script>

<div class="col-lg-4 col-sm-6">
    <a
        class="portfolio-box"
        href={asset(`/img/portfolio/fullsize/${imageLink}`)}
    >
        <img
            class="img-fluid"
            src={asset(`/img/portfolio/thumbnails/${imageLink}`)}
            alt={name}
        />
        <div class="portfolio-box-caption">
            <div class="portfolio-box-caption-content">
                <div class="project-name">{name}</div>
            </div>
        </div>
    </a>
</div>
