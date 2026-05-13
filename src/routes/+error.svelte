<script lang="ts">
    import { onMount } from "svelte";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";

    let shouldRedirect = true;

    if (typeof window !== "undefined") {
        const url = window.location.pathname;
        if (url.endsWith(".html")) {
            shouldRedirect = true;
            let newUrl = url.replace(/\.html$/, "");
            if (newUrl == "/index") {
                newUrl = "/";
            }
            goto(
                resolve(newUrl + window.location.search + window.location.hash),
                {
                    replaceState: true,
                },
            );
        } else {
            shouldRedirect = false;
        }
    }
</script>

<svelte:head>
    {#if !shouldRedirect}
        <title>404 Not Found</title>
    {/if}
</svelte:head>

{#if !shouldRedirect}
    <div class="container text-center text-white" style="padding: 100px 0">
        <!-- TODO: Support other kinds of errors (5xx and other 4xx) -->
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    </div>
{/if}
