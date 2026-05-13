<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";

    import DownloadBox from "$lib/components/DownloadBox.svelte";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
</script>

<svelte:head>
    <title>Vita3K - {m.nav_download()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_download()}" />
    <CompositeMeta
        key="description"
        content="Vita3K download page for the latest builds"
    />
</svelte:head>

<section class="page-route bg-dark text-dark">
    <div class="container">
        <PageHeader title={m.download_pick_up_your_build()} />
    </div>

    <div class="container">
        <div class="row mb-5">
            <DownloadBox
                name="Windows Nightlies"
                primaryText="x64"
                link="windows-latest.zip"
                secondaryText="arm"
                secondaryLink="windows-arm64-latest.zip"
                icon="fa-windows"
            />
            <DownloadBox
                name="macOS Nightlies"
                primaryText="x64"
                link="macos-latest.dmg"
                secondaryText="arm"
                secondaryLink="macos-arm64-latest.dmg"
                icon="fa-apple"
            />
            <DownloadBox
                name="Linux AppImage Nightlies"
                primaryText="x64"
                link="Vita3K-x86_64.AppImage"
                secondaryText="arm"
                secondaryLink="Vita3K-aarch64.AppImage"
                icon="fa-linux"
            />

            <DownloadBox
                name="Linux Nightlies"
                primaryText="x64"
                link="ubuntu-latest.zip"
                secondaryText="arm"
                secondaryLink="ubuntu-aarch64-latest.zip"
                icon="fa-linux"
            />
            <DownloadBox
                name="Android Nightlies"
                link="android-latest.apk"
                primaryText={m.download_download()}
                icon="fa-android"
            />
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <p class="">
                    <a href="https://github.com/Vita3K/Vita3K-builds/releases"
                        >{m.download_older_versions()}</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>
