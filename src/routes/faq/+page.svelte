<script lang="ts">
    import { asset, resolve } from "$app/paths";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import { m } from "$lib/paraglide/messages.js";

    function copyLink(id: string) {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
    }

    const faqItems = [
        {
            id: "system-requirements",
            question: "What are the system requirements I need to run it?",
            answer: `
                <p>
                    The requirements for running Vita3K are still not fully known and may change during its current development stage.
                    The absolute minimum requirements for running the program are:
                </p>
                <div class="faq-specs">
                    <div>
                        <h3>PC</h3>
                        <ul>
                            <li>CPU: x86_64/ARM 64-bit CPU</li>
                            <li>GPU: OpenGL 4.4/Vulkan 1.0 capable graphics</li>
                            <li>RAM: Minimum of 4 GB RAM</li>
                            <li>OS: Windows 8/10/11, macOS 13.3 (Ventura), and Linux on a 64-bit OS</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Android</h3>
                        <ul>
                            <li>CPU: An AArch64 CPU</li>
                            <li>GPU: Vulkan 1.0 support</li>
                            <li>OS: Android 7+</li>
                        </ul>
                    </div>
                </div>
                <p>See the <a href="${resolve("/quickstart")}">Quickstart</a> for more information.</p>
            `,
        },
        {
            id: "what-is-vita3k",
            question: "What is Vita3K and where can I get it?",
            answer: `
                <p>
                    Vita3K is an open-source experimental Sony PlayStation Vita emulator for Windows, macOS, Linux, and Android written in C++.
                    It is currently capable of booting and playing commercial games.
                </p>
                <p>
                    Please check the <a href="${resolve("/compatibility")}">Compatibility List</a>.
                    The source code for Vita3K is hosted on <a href="https://github.com/Vita3K/Vita3K/">GitHub</a>.
                    You can grab the latest compiled revisions from the <a href="${resolve("/download")}">downloads page</a>.
                </p>
            `,
        },
        {
            id: "does-vita3k-support-commercial-games",
            question: "Does Vita3K support commercial games?",
            answer: `
                <p>
                    <strong>Yes</strong>. Development on the emulator is admittedly not the fastest, but is steady. We currently boast over 50% of tested games being marked as playable. Not every title is supported though, so don't expect a flawless experience. Most (but not all) exclusives are ingame or fully playable.
                </p>
                <p>
                    More games will be supported in time. It all depends on the amount of developers working on this project, their skills, and free time, etc. Ignore any estimates and guesses you find out there.
                </p>
            `,
        },
        {
            id: "multiplayer",
            question:
                "Can I play multiplayer games online with real consoles or other Vita3K users?",
            answer: `
                <p>
                    Playing commercial games online with real PlayStation Vita systems would require the user to connect to PlayStation Network which isn't very feasible due to obvious technical and legal limitations.
                </p>
                <p>
                    That said, multiplayer networking is partly implemented. Ad-Hoc is supported on some commercial games with ZeroTier/Tailscale/etc
                </p>
            `,
        },
        {
            id: "how-do-i-get-games",
            question: "How do I get games?",
            answer: `
                <p>For homebrew, get them through <a href="https://vitadb.rinnegatamante.it/">VitaDB</a>.</p>
                <p>
                    For commercial games, you should read the <a href="${resolve("/quickstart")}">quickstart guide</a>.
                </p>
            `,
        },
        {

            id: "how-do-i-run-games",
            question: "How do I run games?",
            answer: `
                <p>
                    First you have to install them. Once you do, just run the emulator and it will display a
                    <em>Game Select</em> screen.
                </p>
            `,
        },
        {
            id: "how-do-i-install-games",
            question: "How do I install games?",
            answer: `
                <p><strong>Windows, Linux, macOS, and Android</strong></p>
                <p>
                    Games can be installed directly through the emulator with
                    <code>File &gt; Install Package (.pkg)</code> or <code>File &gt; Install Archive (.zip / .vpk / .vci)</code>.
                    You can also supply them as a command-line argument to the executable or install them manually by unzipping the
                    <code>.vpk</code> into Vita3K's home directory.
                </p>
            `,
        },
        {
            id: "what-is-a-vitamin-dump",
            question:
                "What is a Vitamin dump and how does it differ from a regular dump?",
            answer: `
                <p>
                    Vitamin is, or rather was, software for dumping PS Vita games from cartridge or internal storage.
                    Those dumps generally use the <code>.vpk</code> extension.
                    They are not supported because the data inside is not properly ripped.
                </p>
                <p>
                    According to the developers of Vitamin, it should not be used because it contains bugs that can sometimes corrupt game data or save files.
                    The recommended dumping method is to use
                    <a href="https://github.com/TheOfficialFloW/NoNpDrm/releases">NoNpDrm</a> or
                    <a href="https://github.com/CelesteBlue-dev/PSVita-RE-tools/tree/master/FAGDec/build">FAGDec</a>
                    with <a href="https://github.com/TheOfficialFloW/VitaShell/releases/tag/v2.02">VitaShell</a>.
                    See the <a href="${resolve("/quickstart")}">Quickstart guide</a>.
                </p>
            `,
        },
        {
            id: "input-devices",
            question: "What input devices can I use with Vita3K?",
            answer: `
                <p>
                    Keyboard and mouse are supported, and <strong>SDL3</strong>-compliant devices can be used.
                    DualShock 4 and DualSense are usually recommended.
                    The rear touchpad is realized with right click.
                </p>
            `,
        },
        {
            id: "download-firmware",
            question: "Where do I download firmware?",
            answer: `
                <p>
                    Go to <code>Help</code> -> <code>Welcome</code> -> <code>Download Firmware</code>.
                    This will decrypt the modules only.
                </p>
                <p>
                    If you also need all firmware files, like fonts, go to
                    <code>Help</code> -> <code>Welcome</code> -> <code>Download Firmware Font Package</code>.
                </p>
            `,
        },
        {
            id: "steam-deck",
            question: "How do I play Vita3K on Steam Deck?",
            answer: `
                <p>Using Vita3K on Steam Deck:</p>
                <ol>
                    <li>Switch to Desktop Mode from the power menu.</li>
                    <li>Download the AppImage Nightlies.</li>
                    <li>Open the downloaded .AppImage file</li>
                </ol>
            `,
        },
        {
            id: "how-is-progress",
            question: "How is progress?",
            answer: `
                <p>
                    See the <a href="${resolve("/blog")}">Blog</a> or the project's social media accounts.
                    For more cutting-edge progress, see the
                    <a href="https://github.com/Vita3K/Vita3K/pulls">GitHub pull requests</a>
                    and the <strong>#development</strong> channel on the <a href="https://discord.gg/n8HV3dN">Discord server</a>.
                </p>
            `,
        },
        {
            id: "why-game-x-instead-of-game-y",
            question: "Why do you work on game X instead of game Y?",
            answer: `
                <p>
                    Vita3K is a completely hobby-driven project.
                    Developers work on what they want to do, when they want to do it.
                    Reports of problems are welcome.
                </p>
            `,
        },
        {
            id: "portable-mode",
            question: "How do i use portable mode?",
            answer: `
            <p>
                Portable mode is a configuration where EVERY file of the emulator is in the same place (or very close to) as the emulator executable itself
            </p>
            <p>To use it you must:</p>
            <ol>
                <li>Create a folder named <code>portable</code> next to the executable/.app/AppImage</li>
                <li>Open the emulator and close it to generate the folders inside <code>portable</code></li>
                <li>Once the folders are generated, place <strong>your</strong> config.yml inside <code>portable</code>, overwriting it</li>
                <li>Move your vitafs to the <code>fs</code> folder inside <code>portable</code>, you should have something like this: <code>portable/fs/ux0</code></li>
                <li>Move your patches/configs also inside <code>portable</code> these folders are self explanatory so no need to go over each one</li>
            </ol>
            `,
        },
        {
            id: "emulator-installed-files",
            question: "Where can I find the emulator's installed files?",
            answer: `
                <p>This is usually called "Vita FS", "Emulated Storage Path", or in <code>config.yml</code> as <code>pref-path</code>. The recommended method to locate these is by using the in-app button (Open in top left on PC), but this serves to document other paths too. Assuming you did not change the Vita FS and are NOT using a portable install, you should be able to safely delete your Vita3K build/folder without losing your data. The default paths are as follows.</p>

                <p><strong>Windows:</strong></p>
                <ul>
                    <li><code>config.yml</code>: In the same folder as Vita3K.exe. If you don't have file extensions turned on, it will appear as <code>config</code>.</li>
                    <li>Filesystem: <code>%APPDATA%/Vita3K/</code>. This expands to <code>C:/Users/&lt;username&gt;/AppData/Roaming/Vita3K/</code>.</li>
                    <li>Patches &amp; Textures: In the same folder as Vita3K.exe in folders named <code>patch</code> and <code>textures</code>.</li>
                    <li>Cache &amp; Logs: Also in the same folder as Vita3K.exe. They're just folders named <code>cache</code> and <code>logs</code>.</li>
                </ul>

                <p><strong>Linux:</strong> Vita3K follows the <a href="https://specifications.freedesktop.org/basedir/latest/">XDG Base Directory Specification</a> for its files. Changing <code>XDG_DATA_HOME</code>, <code>XDG_CONFIG_HOME</code>, <code>XDG_CACHE_HOME</code>, and related will change these paths; these are just the defaults.</p>
                <ul>
                    <li><code>config.yml</code>: <code>$HOME/.config/Vita3K/</code></li>
                    <li>Filesystem: <code>$HOME/.local/share/Vita3K/Vita3K/</code></li>
                    <li>Patches &amp; textures: <code>$HOME/.local/share/Vita3K/</code> in folders <code>patch</code> and <code>textures</code>.</li>
                    <li>Cache &amp; Logs: <code>$HOME/.cache/Vita3K/</code></li>
                </ul>
                <p>Where $HOME is your user home directory (i.e. <code>/home/username</code>).</p>

                <p><strong>MacOS:</strong> All MacOS files that are not the Vita3K app itself are stored in Vita3K's <a href="https://developer.apple.com/documentation/foundation/url/applicationsupportdirectory">Application Support Directory</a></p>
                <ul>
                    <li><code>config.yml</code>: <code>$HOME/"Application Support"/Vita3K/Vita3K/</code></li>
                    <li>Filesystem: <code>$HOME/"Application Support"/Vita3K/Vita3K/fs/</code></li>
                    <li>Patches, Textures, Cache, Logs: <code>$HOME/"Application Support"/Vita3K/Vita3K/</code></li>
                </ul>

                <p><strong>Android:</strong></p>
                <ul>
                    <li><code>config.yml</code>: <code>Storage/Emulated/0/Android/Data/org.vita3k.emulator/</code></li>
                    <li>Filesystem: <code>Storage/Emulated/0/Android/Data/org.vita3k.emulator/files/fs/</code></li>
                </ul>
            `,
        },
        {
            id: "contributing",
            question:
                "I'd like to create a patch, contribute, or possibly become a developer. Where do I start?",
            answer: `
                <p>
                    Contributions are welcome.
                    Check the
                    <a href="https://github.com/Vita3K/Vita3K/wiki/Coding-Style">Coding Style Guidelines</a>
                    and
                    <a href="https://github.com/Vita3K/Vita3K/wiki/Developer-Information">Developer Information</a>.
                </p>
                <p>
                    Most development discussion happens on Discord, so be sure to visit the
                    <a href="https://discord.gg/n8HV3dN">Discord server</a> in the <strong>#development</strong> channel.
                    Find something you want to implement or improve, test your changes, and send a
                    <a href="https://help.github.com/articles/using-pull-requests">pull request</a>.
                </p>
                <p>
                    You can also contribute by improving documentation, the website, translating, testing, or reporting issues.
                    The links of which can be found in this very page (top and bottom).
                </p>
            `,
        },
        {
            id: "reporting-issues",
            question:
                "There is some issue, feedback, or comment that I want to report.",
            answer: `
                <p>
                    Good. You can report it through the
                    <a href="https://github.com/Vita3K/Vita3K/issues">GitHub issue tracker</a>.
                    Before sending anything:
                </p>
                <ul>
                    <li>Check if your system matches the minimum requirements.</li>
                    <li>Check if the issue is meaningful for the team.</li>
                    <li>Search older issues and forum threads first.</li>
                    <li>Use understandable English. It does not need to be perfect, just clear.</li>
                    <li>Include details about your system, such as OS, CPU, GPU, and the <code>Vita3K.log</code> file.</li>
                    <li>Do not post individual game issues there. Use the <a href="https://github.com/Vita3K/compatibility/issues">compatibility repository</a> instead.</li>
                </ul>
            `,
        },
    ] as const;
</script>

<svelte:head>
    <title>Vita3K - {m.nav_faqs()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_faqs()}" />
    <CompositeMeta
        key="description"
        content="Vita3K frequently asked questions"
    />
</svelte:head>

<section class="page-route faq-page text-white">
    <div class="container">
        <PageHeader title="FAQs" description="Frequently asked questions." />

        <div class="faq-page__list">
            {#each faqItems as item (faqItems.indexOf(item))}
                <article class="faq-entry">
                    <div class="faq-entry__question">
                        <img
                            class="faq-entry__label"
                            src={asset("/img/icons/faq-question.svg")}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2 id={item.id}>
                            {item.question}
                            <button
                                class="faq-entry__link-btn"
                                onclick={() => copyLink(item.id)}
                                aria-label="Copy link to this section"
                                title="Copy link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                </svg>
                            </button>
                        </h2>
                    </div>

                    <div class="faq-entry__answer-row">
                        <img
                            class="faq-entry__label faq-entry__label--answer"
                            src={asset("/img/icons/faq-answer.svg")}
                            alt=""
                            aria-hidden="true"
                        />
                        <div class="faq-entry__answer">
                            {@html item.answer}
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<style>
    
</style>
