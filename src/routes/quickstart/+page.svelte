<script lang="ts">
    import AccordionItem from "$lib/components/AccordionItem.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import { onMount } from "svelte";
    import { asset, resolve } from "$app/paths";
    import { reveal } from "$lib/actions/reveal";
    import { m } from "$lib/paraglide/messages.js";
    import { sanitize } from "$lib/sanitize";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";

    // The tools the dumping guide links to. They are passed into the messages rather than
    // written inside them so that a translator can move the link through the sentence
    // without being able to change where it points.
    const GC_TOOL_KIT = "https://github.com/oestriot/GcToolKit";
    const VITASHELL = "https://github.com/TheOfficialFloW/VitaShell/releases";
    const FAGDEC =
        "https://github.com/CelesteBlue-dev/PSVita-RE-tools/tree/master/FAGDec/build";
    const VITA_ORGANIZER =
        "https://github.com/vitaorganizer/vitaorganizer/releases";
    const NONPDRM = "https://github.com/TheOfficialFloW/NoNpDrm/releases";

    const VC_REDIST = "https://aka.ms/vs/17/release/vc_redist.x64.exe";
    const DISCORD = "https://discord.gg/6aGwQzh";
    const COMPAT_REPO = "https://github.com/Vita3K/compatibility/issues";

    const STEPS = [
        {
            href: "#requirements",
            title: () => m.quickstart_step_requirements(),
            desc: () => m.quickstart_step_requirements_desc(),
        },
        {
            href: resolve("/download"),
            title: () => m.quickstart_step_download(),
            desc: () => m.quickstart_step_download_desc(),
        },
        {
            href: "#firmware",
            title: () => m.quickstart_step_firmware(),
            desc: () => m.quickstart_step_firmware_desc(),
        },
        {
            href: "#dumping",
            title: () => m.quickstart_step_dump(),
            desc: () => m.quickstart_step_dump_desc(),
        },
        {
            href: "#installing",
            title: () => m.quickstart_step_play(),
            desc: () => m.quickstart_step_play_desc(),
        },
    ];

    const HARDWARE = {
        minimum: [
            {
                icon: "/img/icons/opengl.svg",
                text: () =>
                    m.quickstart_gpu_that_supports_opengl_version({
                        version: "4.4",
                    }),
            },
            {
                icon: "/img/icons/cpu.svg",
                text: () => m.quickstart_any_x86_64_cpu(),
            },
            {
                icon: "/img/icons/ram.svg",
                text: () => m.quickstart_minimum_of_Xgb_of_ram({ amount: "4" }),
            },
        ],
        recommended: [
            {
                icon: "/img/icons/vulkan.svg",
                text: () => m.quickstart_gpu_that_supports_vulkan(),
            },
            {
                icon: "/img/icons/gpu.svg",
                text: () => m.quickstart_gpu_that_supports_shader_interlock(),
            },
            {
                icon: "/img/icons/cpu.svg",
                text: () => m.quickstart_x86_64_cpu_with_avx(),
            },
            {
                icon: "/img/icons/ram.svg",
                text: () =>
                    m.quickstart_recommended_Xgb_of_ram({ amount: "8" }),
            },
        ],
    };

    const INSTALL_METHODS = [
        {
            icon: "fa-archive",
            title: () => m.quickstart_install_pkg_title(),
            desc: () => m.quickstart_install_pkg_desc(),
        },
        {
            icon: "fa-file-archive",
            title: () => m.quickstart_install_archive_title(),
            desc: () => m.quickstart_install_archive_desc(),
        },
        {
            icon: "fa-folder-open",
            title: () => m.quickstart_install_manual_title(),
            desc: () => m.quickstart_install_manual_desc(),
        },
    ];

    const TIPS = [
        {
            icon: "fa-tv",
            title: () => m.quickstart_tip_backend_title(),
            desc: () => m.quickstart_tip_backend_desc(),
        },
        {
            icon: "fa-cogs",
            title: () => m.quickstart_tip_modules_title(),
            desc: () => m.quickstart_tip_modules_desc(),
        },
        {
            icon: "fa-gamepad",
            title: () => m.quickstart_tip_controls_title(),
            desc: () => m.quickstart_tip_controls_desc(),
        },
        {
            icon: "fa-list-ul",
            title: () => m.quickstart_tip_compat_title(),
            desc: () =>
                m.quickstart_tip_compat_desc({
                    link: resolve("/compatibility"),
                }),
        },
    ];

    const TROUBLES = [
        {
            title: () => m.quickstart_trouble_dll_title(),
            desc: () => m.quickstart_trouble_dll_desc({ link: VC_REDIST }),
        },
        {
            title: () => m.quickstart_trouble_boot_title(),
            desc: () => m.quickstart_trouble_boot_desc(),
        },
        {
            title: () => m.quickstart_trouble_text_title(),
            desc: () => m.quickstart_trouble_text_desc(),
        },
        {
            title: () => m.quickstart_trouble_report_title(),
            desc: () =>
                m.quickstart_trouble_report_desc({
                    faq: resolve("/faq"),
                    compat: COMPAT_REPO,
                }),
        },
    ];

    const NEXT = [
        {
            href: resolve("/faq"),
            icon: "fa-question-circle",
            title: () => m.nav_faqs(),
            desc: () => m.quickstart_next_faq_desc(),
            external: false,
        },
        {
            href: resolve("/compatibility"),
            icon: "fa-list-ul",
            title: () => m.nav_compatibility(),
            desc: () => m.quickstart_next_compat_desc(),
            external: false,
        },
        {
            href: DISCORD,
            icon: "fa-discord",
            brand: true,
            title: () => "Discord",
            desc: () => m.quickstart_next_discord_desc(),
            external: true,
        },
    ];

    // Initial value is just a placeholder just in case the request fails, it will be updated on the onMount function
    let urlObtained = $state(false);

    let sysdataURL = $state("");

    onMount(async () => {
        const request = await fetch("https://api.vita3k.org/firmware");

        if (!request.ok) {
            console.error("Failed to fetch the system data URL");
            return;
        }

        const contentType = request.headers.get("content-type");
        if (!contentType) {
            console.warn("firmware list has no content type");
            return;
        }

        if (contentType.startsWith("application/json")) {
            // Error can be ignored in this case
            const contents = await request.json();
            console.warn(contents);
        } else if (contentType.startsWith("application/xml")) {
            const response = await request.text();

            let parser = new DOMParser();

            const xmldoc = parser.parseFromString(response, "text/xml");

            sysdataURL =
                xmldoc.getElementsByTagName("recovery")[0].childNodes[1]
                    .childNodes[0].nodeValue ?? "";
        } else {
            console.warn(`Unknown content-type: ${contentType}`);
        }

        urlObtained = sysdataURL !== ""; // If the URL is not empty, then we obtained it successfully
    });
</script>

<svelte:head>
    <title>Vita3K - {m.nav_quickstart()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_quickstart()}" />
    <CompositeMeta
        key="description"
        content={m.quickstart_meta_description()}
    />
</svelte:head>

<section
    class="page-route page-route--intro-only bg-dark text-center text-white"
>
    <div class="container">
        <PageHeader
            title={m.quickstart_quickstart()}
            description={m.quickstart_get_started()}
        />
    </div>
</section>

<section class="qs-section qs-steps-section text-white">
    <div class="container">
        <h2 class="qs-heading qs-heading--small">
            {m.quickstart_steps_title()}
        </h2>
        <ol class="qs-steps">
            {#each STEPS as step, index (step.href)}
                <li use:reveal={index * 70}>
                    <a class="qs-step" href={step.href}>
                        <span class="qs-step__number">{index + 1}</span>
                        <strong>{step.title()}</strong>
                        <span>{step.desc()}</span>
                    </a>
                </li>
            {/each}
        </ol>
    </div>
</section>

<section class="qs-section text-white" id="requirements">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_hardware_requirements()}</h2>
        <p class="qs-lead">{m.quickstart_hardware_requirements_desc()}</p>

        <div class="qs-grid qs-grid--2">
            <div class="qs-card" use:reveal>
                <h3 class="qs-card__title">
                    {m.quickstart_minimum_requirements()}
                </h3>
                <ul class="qs-reqs">
                    {#each HARDWARE.minimum as req (req.text())}
                        <li>
                            <img src={asset(req.icon)} alt="" />
                            <span>{req.text()}</span>
                        </li>
                    {/each}
                </ul>
            </div>
            <div class="qs-card qs-card--accent" use:reveal={90}>
                <h3 class="qs-card__title">
                    {m.quickstart_recommended_requirements()}
                </h3>
                <ul class="qs-reqs">
                    {#each HARDWARE.recommended as req (req.text())}
                        <li>
                            <img src={asset(req.icon)} alt="" />
                            <span>{req.text()}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <h2 class="qs-heading qs-heading--sub">
            {m.quickstart_software_requirements()}
        </h2>
        <div class="qs-grid qs-grid--2">
            <div class="qs-card" use:reveal>
                <h3 class="qs-card__title">
                    <i class="fab fa-windows" aria-hidden="true"></i>
                    {m.quickstart_microsoft_redistributable()}
                </h3>
                <p>
                    {@html sanitize(
                        m.quickstart_microsoft_redistributable_desc({
                            link: VC_REDIST,
                        }),
                    )}
                </p>
            </div>
            <div class="qs-card" use:reveal={90}>
                <h3 class="qs-card__title">
                    <i class="fas fa-desktop" aria-hidden="true"></i>
                    {m.quickstart_operating_system()}
                </h3>
                <p>{m.quickstart_operating_system_desc()}</p>
            </div>
        </div>
    </div>
</section>

<section class="qs-section text-white" id="firmware">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_installing_the_firmware()}</h2>
        <p class="qs-lead">{m.quickstart_firmware_desc()}</p>

        <ol class="qs-timeline">
            <li use:reveal>
                <p>
                    {@html sanitize(
                        m.quickstart_firmware_download({
                            link: "https://www.playstation.com/en-us/support/hardware/psvita/system-software/",
                        }),
                    )}
                </p>
            </li>
            <li use:reveal={80}>
                <p>
                    {m.quickstart_font_firmware_desc()}
                    {#if urlObtained}
                        {@html sanitize(
                            m.quickstart_you_can_download_it_here({
                                link: sysdataURL,
                            }),
                        )}
                    {:else}
                        {@html sanitize(m.quickstart_could_not_get_url())}
                    {/if}
                </p>
            </li>
            <li use:reveal={160}>
                <p>
                    {@html sanitize(
                        m.quickstart_install_both_firmware_packages(),
                    )}
                </p>
            </li>
        </ol>

        <div class="qs-card qs-card--note" use:reveal>
            <h3 class="qs-card__title">
                <i class="fas fa-cubes" aria-hidden="true"></i>
                {m.quickstart_managing_modules()}
            </h3>
            <p>{@html sanitize(m.quickstart_managing_modules_desc())}</p>
        </div>
    </div>
</section>
<section class="qs-section text-white" id="dumping">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_dumping_games()}</h2>
        <div class="qs-card qs-card--prose">
            <p>
                {@html sanitize(m.quickstart_dumping_no_piracy())}
            </p>
            <p>
                {@html sanitize(m.quickstart_dumping_supported_formats())}
            </p>
            <p>
                {@html sanitize(m.quickstart_dumping_vita_fs_defaults())}
                <br />{@html sanitize(m.quickstart_dumping_vita_fs_windows())}
                <br />{@html sanitize(m.quickstart_dumping_vita_fs_linux())}
                <br />{@html sanitize(m.quickstart_dumping_vita_fs_macos())}
            </p>
        </div>
        <div class="qs-dump-methods">
            <h3 class="qs-heading qs-heading--sub">
                {m.quickstart_dumping_how_to()}
            </h3>
            <p class="qs-lead">
                {m.quickstart_dumping_how_to_desc()}
            </p>

            <AccordionItem
                id="vci"
                title={m.quickstart_vci_title()}
                initiallyOpen={false}
            >
                <div class="answer">
                    <div class="padding-wrapper">
                        <p class="my-3"></p>
                        <h5>
                            {@html sanitize(
                                m.quickstart_vci_using({ link: GC_TOOL_KIT }),
                            )}
                        </h5>
                        <p class="my-3">
                            {@html sanitize(m.quickstart_vci_desc())}
                        </p>
                        <ol>
                            <li>
                                {@html sanitize(
                                    m.quickstart_vci_step_install({
                                        link: GC_TOOL_KIT,
                                    }),
                                )}
                            </li>
                            <li>{m.quickstart_vci_step_insert()}</li>
                            <li>
                                {@html sanitize(m.quickstart_vci_step_backup())}
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_vci_step_wait())}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_vci_step_transfer(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_vci_step_archive(),
                                )}
                            </li>
                        </ol>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem
                id="fagdec"
                title={m.quickstart_fagdec_title()}
                initiallyOpen={false}
            >
                <div class="answer">
                    <div class="padding-wrapper">
                        <p class="my-3"></p>
                        <h5>
                            {@html sanitize(
                                m.quickstart_fagdec_using({
                                    vitashell: VITASHELL,
                                    fagdec: FAGDEC,
                                }),
                            )}
                        </h5>

                        <ol>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_download({
                                        vitashell: VITASHELL,
                                        fagdec: FAGDEC,
                                    }),
                                )}
                            </li>
                            <li>
                                <ol type="A">
                                    <li>
                                        {m.quickstart_fagdec_step_cartridge()}
                                    </li>
                                    <p>
                                        {@html sanitize(
                                            m.quickstart_fagdec_step_cartridge_desc(),
                                        )}
                                    </p>
                                    <li>
                                        {m.quickstart_fagdec_step_digital()}
                                    </li>
                                    <p>
                                        {@html sanitize(
                                            m.quickstart_fagdec_step_digital_desc(),
                                        )}
                                    </p>
                                </ol>
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_open_decrypted(),
                                )}
                            </li>
                            <li>{m.quickstart_fagdec_step_copy()}</li>
                            <p class="my-2">
                                {m.quickstart_fagdec_note_selfs()}
                            </p>
                            <li>{m.quickstart_fagdec_step_launch()}</li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_decrypt_all(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_start(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_start_decrypt(),
                                )}
                            </li>
                            <li>{m.quickstart_fagdec_step_wait()}</li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_fagdec_step_output(),
                                )}
                            </li>
                            <p class="my-3">
                                {m.quickstart_fagdec_note_merge()}
                            </p>
                            <p>
                                {@html sanitize(
                                    m.quickstart_fagdec_note_title_id(),
                                )}
                            </p>
                        </ol>
                    </div>
                </div>

                <div class="answer">
                    <div class="padding-wrapper">
                        <h5 class="my-3">{m.quickstart_vpk_title()}</h5>
                        <p class="my-3">
                            {m.quickstart_vpk_desc()}
                        </p>
                        <ol>
                            <li>
                                {@html sanitize(
                                    m.quickstart_vpk_step_download({
                                        link: VITA_ORGANIZER,
                                    }),
                                )}
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_vpk_step_create())}
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_vpk_step_select())}
                            </li>
                            <p>
                                {m.quickstart_vpk_note_progress()}
                            </p>
                        </ol>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem
                id="nonprdm"
                title={m.quickstart_nonpdrm_title()}
                initiallyOpen={false}
            >
                <div class="answer">
                    <div class="padding-wrapper">
                        <p class="my-3"></p>
                        <h5>
                            {@html sanitize(
                                m.quickstart_nonpdrm_using({
                                    vitashell: VITASHELL,
                                    nonpdrm: NONPDRM,
                                }),
                            )}
                        </h5>
                        <ol>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_step_download({
                                        link: VITASHELL,
                                    }),
                                )}
                            </li>
                            <li>
                                <p>
                                    {@html sanitize(
                                        m.quickstart_nonpdrm_step_plugin({
                                            link: NONPDRM,
                                        }),
                                    )}
                                </p>
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_step_license(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_step_transfer(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_step_zip(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_step_install(),
                                )}
                            </li>
                            <div class="my-2">{m.quickstart_nonpdrm_dlc()}</div>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_dlc_step_copy(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_dlc_step_zip(),
                                )}
                            </li>
                            <li>
                                {@html sanitize(
                                    m.quickstart_nonpdrm_dlc_step_install(),
                                )}
                            </li>
                        </ol>
                    </div>
                </div>
            </AccordionItem>
        </div>
    </div>
</section>

<section class="qs-section text-white" id="installing">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_installing_games()}</h2>
        <p class="qs-lead">{m.quickstart_installing_games_desc()}</p>

        <div class="qs-grid qs-grid--3">
            {#each INSTALL_METHODS as method, index (method.icon)}
                <div class="qs-card" use:reveal={index * 80}>
                    <span class="qs-card__icon" aria-hidden="true">
                        <i class={`fas ${method.icon}`}></i>
                    </span>
                    <h3 class="qs-card__title">{method.title()}</h3>
                    <p>{@html sanitize(method.desc())}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="qs-section text-white" id="first-steps">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_first_steps()}</h2>
        <p class="qs-lead">{m.quickstart_first_steps_desc()}</p>

        <div class="qs-grid qs-grid--2">
            {#each TIPS as tip, index (tip.icon + index)}
                <div class="qs-card qs-card--row" use:reveal={(index % 2) * 80}>
                    <span class="qs-card__icon" aria-hidden="true">
                        <i class={`fas ${tip.icon}`}></i>
                    </span>
                    <div>
                        <h3 class="qs-card__title">{tip.title()}</h3>
                        <p>{@html sanitize(tip.desc())}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="qs-section text-white" id="troubleshooting">
    <div class="container">
        <h2 class="qs-heading">{m.quickstart_troubleshooting()}</h2>

        <div class="qs-troubles">
            {#each TROUBLES as trouble, index (index)}
                <details class="qs-trouble" use:reveal={index * 60}>
                    <summary>
                        <i class="fas fa-wrench" aria-hidden="true"></i>
                        <span>{trouble.title()}</span>
                    </summary>
                    <p>{@html sanitize(trouble.desc())}</p>
                </details>
            {/each}
        </div>
    </div>
</section>

<section class="qs-section qs-next text-white">
    <div class="container">
        <h2 class="qs-heading qs-heading--small">
            {m.quickstart_next_title()}
        </h2>
        <div class="qs-grid qs-grid--3">
            {#each NEXT as link, index (link.href)}
                <a
                    class="qs-card qs-card--link"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    use:reveal={index * 80}
                >
                    <span class="qs-card__icon" aria-hidden="true">
                        <i class={`${link.brand ? "fab" : "fas"} ${link.icon}`}
                        ></i>
                    </span>
                    <h3 class="qs-card__title">
                        {link.title()} <span aria-hidden="true">→</span>
                    </h3>
                    <p>{link.desc()}</p>
                </a>
            {/each}
        </div>
    </div>
</section>
