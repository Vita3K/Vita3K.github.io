<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
    <title>404 - {m.error_page_not_found()}</title>
</svelte:head>

<div class="container text-center text-white" style="padding: 100px 0">
    <!-- TODO: Support other kinds of errors (5xx and other 4xx) -->
    <h1>404 - {m.error_page_not_found()}</h1>
    <p>{m.error_page_not_found_desc()}</p>
</div>
