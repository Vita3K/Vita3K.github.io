<script lang="ts">
    const {key, content} = $props();
</script>

<svelte:head>
    <meta property="{key}" content="{content}" />
    <meta name="{key}" content="{content}" />
    <meta property="og:{key}" content="{content}" />
    <meta name="og:{key}" content="{content}" />
    <meta property="twitter:{key}" content="{content}" />
    <meta name="twitter:{key}" content="{content}" />
</svelte:head>