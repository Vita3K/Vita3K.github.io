<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";

    let {
        name,
        link,
        icon,
        primaryText,
        secondaryText = null,
        secondaryLink = null,
        recommended = false,
    }: {
        name: string;
        link: string;
        icon: string;
        primaryText: string;
        secondaryText?: string | null;
        secondaryLink?: string | null;
        recommended?: boolean;
    } = $props();

    const DOWNLOAD_URL_PREFIX =
        "https://github.com/Vita3K/Vita3K/releases/download/continuous/";

    const now = new Date().getTime();
    const linkTimed = $derived(DOWNLOAD_URL_PREFIX + link + "?time=" + now);
    const secondaryLinkTimed = $derived(
        secondaryLink ? DOWNLOAD_URL_PREFIX + secondaryLink + "?time=" + now : null,
    );
</script>

<article class="download-card" class:download-card--recommended={recommended}>
    {#if recommended}
        <span class="download-card__badge">{m.download_recommended()}</span>
    {/if}
    <i class={`fab ${icon} download-card__icon`} aria-hidden="true"></i>
    <h3 class="download-card__name">{name}</h3>
    <div class="download-card__actions">
        <a download class="btn btn-primary" href={linkTimed}>
            <i class="fas fa-download" aria-hidden="true"></i>
            {primaryText}
        </a>
        {#if secondaryText && secondaryLinkTimed}
            <a download class="btn btn-ghost" href={secondaryLinkTimed}>
                {secondaryText}
            </a>
        {/if}
    </div>
</article>
