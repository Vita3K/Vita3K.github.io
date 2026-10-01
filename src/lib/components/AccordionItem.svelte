<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        id,
        title,
        initiallyOpen = false,
        children,
    }: {
        id: string;
        title: string;
        initiallyOpen?: boolean;
        children: Snippet;
    } = $props();
</script>

<details class="accordion-item" {id} open={initiallyOpen}>
    <summary class="accordion-link">
        <span>{title}</span>
        <span class="accordion-chevron" aria-hidden="true"></span>
    </summary>

    <div class="accordion-body">
        {@render children()}
    </div>
</details>
