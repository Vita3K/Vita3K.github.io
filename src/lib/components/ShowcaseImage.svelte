<script lang="ts">
    import { asset } from "$app/paths";

    const {
        name,
        imageLink,
        onopen,
    }: {
        name: string;
        imageLink: string;
        onopen?: (name: string, src: string) => void;
    } = $props();

    const fullsize = asset(`/img/portfolio/fullsize/${imageLink}`);

    /** Keeps the plain link working for new tabs and no-script readers. */
    function handleClick(event: MouseEvent) {
        if (!onopen || event.metaKey || event.ctrlKey || event.shiftKey) {
            return;
        }

        event.preventDefault();
        onopen(name, fullsize);
    }
</script>

<a class="showcase-tile" href={fullsize} onclick={handleClick}>
    <img
        src={asset(`/img/portfolio/thumbnails/${imageLink}`)}
        alt={name}
        width="960"
        height="544"
        loading="lazy"
        decoding="async"
    />
    <span class="showcase-tile__caption">{name}</span>
</a>
