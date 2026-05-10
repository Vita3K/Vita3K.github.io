<script lang="ts">
    let {
        name,
        link,
        icon,
        primaryText,
        secondaryText = null,
        secondaryLink = null,
    } = $props();

    const DOWNLOAD_URL_PREFIX =
        "https://github.com/Vita3K/Vita3K/releases/download/continuous/";

    const now = new Date().getTime();
    const linkTimed = DOWNLOAD_URL_PREFIX + link + "?time=" + now;
    const secondaryLinkTimed = secondaryLink
        ? DOWNLOAD_URL_PREFIX + secondaryLink + "?time=" + now
        : null;
</script>

<div class="col-lg-3 col-md-6 text-center ml-auto mr-auto">
    <div class="service-box mt-5 mx-auto">
        <i class={`fab fa-4x ${icon} text-primary mb-3 sr-icons`}></i>
        <h3 class="text-white">{name}</h3>
        <a
            download
            class="btn btn-primary btn-xl"
            href={linkTimed}>{primaryText}</a
        >
        {#if secondaryText}
            <a
                download
                class="btn btn-primary btn-xl"
                href={secondaryLinkTimed}>{secondaryText}</a
            >
        {/if}
    </div>
</div>
