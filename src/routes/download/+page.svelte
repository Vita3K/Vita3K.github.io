<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";

    import BuildHistory from "$lib/components/BuildHistory.svelte";
    import DownloadBox from "$lib/components/DownloadBox.svelte";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
</script>

<svelte:head>
    <title>Vita3K - {m.nav_download()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_download()}" />
    <CompositeMeta key="description" content={m.download_meta_description()} />
</svelte:head>

<section class="page-route bg-dark text-dark">
    <div class="container">
        <PageHeader title={m.download_pick_up_your_build()} />
    </div>

    <div class="container">
        <div class="row mb-5">
            <DownloadBox
                name={m.download_nightlies({ platform: "Windows" })}
                primaryText="x64"
                link="windows-latest.zip"
                secondaryText="arm"
                secondaryLink="windows-arm64-latest.zip"
                icon="fa-windows"
            />
            <DownloadBox
                name={m.download_nightlies({ platform: "macOS" })}
                primaryText="x64"
                link="macos-latest.dmg"
                secondaryText="arm"
                secondaryLink="macos-arm64-latest.dmg"
                icon="fa-apple"
            />
            <DownloadBox
                name={m.download_nightlies({ platform: "Linux AppImage" })}
                primaryText="x64"
                link="Vita3K-x86_64.AppImage"
                secondaryText="arm"
                secondaryLink="Vita3K-aarch64.AppImage"
                icon="fa-linux"
            />

            <DownloadBox
                name={m.download_nightlies({ platform: "Linux" })}
                primaryText="x64"
                link="ubuntu-latest.zip"
                secondaryText="arm"
                secondaryLink="ubuntu-aarch64-latest.zip"
                icon="fa-linux"
            />
            <DownloadBox
                name={m.download_nightlies({ platform: "Android" })}
                link="android-latest.apk"
                primaryText={m.download_download()}
                icon="fa-android"
            />
        </div>
    </div>
    <div class="container">
        <BuildHistory />
    </div>
</section>
