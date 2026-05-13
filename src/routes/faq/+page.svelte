<script>
    import { asset, resolve } from "$app/paths";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import { m } from "$lib/paraglide/messages.js";

    const faqItems = [
        {
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
                            <li>CPU: CPU with the x86_64 instruction set</li>
                            <li>GPU: OpenGL 4.4 capable graphics</li>
                            <li>RAM: Minimum of 4 GB RAM</li>
                            <li>OS: Windows 8/10/11, macOS, and Linux on a 64-bit OS</li>
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
            question: "What is Vita3K and where can I get it?",
            answer: `
                <p>
                    Vita3K is an open-source experimental Sony PlayStation Vita emulator for Windows, macOS, Linux, and Android written in C++.
                    It is currently capable of booting and playing commercial games.
                </p>
                <p>
                    Please check the <a href="${resolve("/compatibility")}">Compatibility List</a>.
                    The source code for Vita3K is hosted on <a href="https://github.com/Vita3K/Vita3K/">GitHub</a>.
                    You can grab the latest compiled revisions from the <a href="${resolve("/")}">home page</a>.
                </p>
            `,
        },
        {
            question: "Does Vita3K support commercial games?",
            answer: `
                <p>
                    <strong>Some</strong>. Please see the <a href="${resolve("/compatibility")}">Compatibility List</a>.
                    The emulator is in an early stage of development and many features required to run commercial games have not been implemented yet.
                </p>
                <p>
                    Currently, many games made with GameMaker Engine work flawlessly.
                    More games will be supported when the hardware and firmware emulation becomes accurate enough to run them.
                    Ignore outside estimates and guesses.
                </p>
            `,
        },
        {
            question: "How do I get games?",
            answer: `
                <p>For homebrew, get them through <a href="https://vitadb.rinnegatamante.it/">VitaDB</a>.</p>
                <p>
                    For commercial games, dump them with <a href="https://github.com/TheOfficialFloW/NoNpDrm/releases">NoNpDrm</a>.
                    If the game is known not to work with NoNpDrm, you can optionally replace the executable with a
                    <a href="https://github.com/CelesteBlue-dev/PSVita-RE-tools/tree/master/FAGDec/build">FAGDec</a> dump.
                    Vitamin dumps are <strong>not</strong> supported.
                </p>
            `,
        },
        {
            question: "How do I run games?",
            answer: `
                <p>
                    First you have to install them. Once you do, just run the emulator and it will display a
                    <em>Game Select</em> screen.
                </p>
            `,
        },
        {
            question: "How do I install games?",
            answer: `
                <p><strong>Windows</strong></p>
                <p>
                    Right-click a <code>.vpk</code>, open Properties, and click <code>Change...</code> to associate
                    <code>Vita3K.exe</code> with <code>.vpk</code> files. Double-clicking should work after that.
                    Alternatively, drag and drop games onto <code>Vita3K.exe</code>.
                </p>
                <p><strong>Windows, Linux, macOS, and Android</strong></p>
                <p>
                    Games can be installed directly through the emulator with
                    <code>File &gt; Install .pkg</code> or <code>File &gt; Install .zip .vpk</code>.
                    You can also supply them as a command-line argument to the executable or install them manually by unzipping the
                    <code>.vpk</code> into Vita3K's home directory.
                </p>
            `,
        },
        {
            question: "Where are games installed?",
            answer: `
                <p>
                    They are installed in the Vita3K home directory under
                    <code>&lt;Vita3K_home_dir&gt;/ux0/app/&lt;Title_ID&gt;</code>.
                    Defaults are:
                </p>
                <ul>
                    <li>Windows: <code>C:/Users/&quot;username&quot;/AppData/Roaming/Vita3K/Vita3K</code></li>
                    <li>Linux: <code>~/.local/share/Vita3K/Vita3K</code></li>
                    <li>Android: <code>Android/data/org.vita3k.emulator/files</code></li>
                </ul>
                <p>
                    You can change it by editing the <code>pref-path</code> entry in <code>config.yml</code>.
                </p>
            `,
        },
        {
            question: "What is a Vitamin dump and how does it differ from a regular dump?",
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
            question: "Why can't I play Vita3K?",
            answer: `
                <p>
                    See the <a href="${resolve("/quickstart")}">Quickstart</a> for more information.
                    If you are using Dynarmic for the CPU backend, changing to Unicorn may work, in exchange for extremely slow speeds.
                </p>
                <p>
                    If the Quickstart guide and this page do not solve your problem, ask in the <strong>#help</strong> channel on the
                    <a href="https://discord.gg/n8HV3dN">Discord server</a>.
                    Be sure to report your OS, Vita3K version, and PC configuration.
                </p>
            `,
        },
        {
            question: "What input devices can I use with Vita3K?",
            answer: `
                <p>
                    Keyboard and mouse are supported, and <strong>SDL2</strong>-compliant devices can be used.
                    DualShock 4 and DualSense are usually recommended.
                    The rear touchpad is realized with right click.
                </p>
            `,
        },
        {
            question: "Can I play multiplayer games online with real consoles or other Vita3K users?",
            answer: `
                <p>
                    Playing commercial games online with real PlayStation Vita systems would require PlayStation Network connectivity,
                    which is not very feasible because of technical and legal limitations.
                </p>
                <p>
                    That said, networking is partly implemented and some <strong>homebrew</strong> multiplayer games like
                    <a href="https://github.com/Rinnegatamante/vitaQuake">vitaQuake</a> work fine.
                </p>
            `,
        },
        {
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
            question: "How do I play Vita3K on Steam Deck?",
            answer: `
                <p>Using Vita3K on Steam Deck:</p>
                <ol>
                    <li>Switch to Desktop Mode from the power menu.</li>
                    <li>Open Konsole.</li>
                    <li>
                        Run <code>mkdir Vita3K &amp;&amp; cd Vita3K &amp;&amp; wget https://github.com/Vita3K/Vita3K/releases/download/continuous/ubuntu-latest.zip</code>
                        or use this <a href="https://github.com/Vita3K/Vita3K/releases/download/continuous/ubuntu-latest.zip">direct link</a>.
                    </li>
                    <li>Run <code>unzip ubuntu-latest.zip</code>.</li>
                    <li>Run <code>chmod +x Vita3K &amp;&amp; ./Vita3K</code>.</li>
                </ol>
                <p>
                    This should run Vita3K in desktop mode, which is usually preferred since game mode can compress the aspect ratio into a tiny square.
                </p>
            `,
        },
        {
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
            question: "I'd like to create a patch, contribute, or possibly become a developer. Where do I start?",
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
                    You can also contribute by participating in testing through the
                    <a href="https://github.com/Vita3K/compatibility/issues">compatibility repository</a>.
                </p>
            `,
        },
        {
            question: "There is some issue, feedback, or comment that I want to report.",
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
    ];
</script>

<svelte:head>
    <title>Vita3K - {m.nav_faqs()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_faqs()}" />
    <CompositeMeta key="description" content="Vita3K frequently asked questions" />
</svelte:head>

<section class="faq-page text-white">
    <div class="container">
        <div class="faq-page__header text-center">
            <h1>FAQs</h1>
            <p class="text-faded mb-0">Frequently asked questions.</p>
        </div>

        <div class="faq-page__list">
            {#each faqItems as item}
                <article class="faq-entry">
                    <div class="faq-entry__question">
                        <img
                            class="faq-entry__label"
                            src={asset("/img/icons/faq-question.svg")}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2>{item.question}</h2>
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
