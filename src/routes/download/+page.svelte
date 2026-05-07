<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";

    import DownloadBox from "$lib/components/DownloadBox.svelte";
</script>

<section class="bg-dark text-dark" id="download">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="section-heading text-white">
                    {m.pick_up_your_build()}
                </h2>
                <hr class="my-4" />
            </div>
        </div>
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
                primaryText={m.download()}
                icon="fa-android"
            />
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto text-center">
                <p class="">
                    <a href="https://github.com/Vita3K/Vita3K-builds/releases"
                        >{m.older_versions()}</a
                    >
                </p>
            </div>
        </div>
    </div>
</section>
