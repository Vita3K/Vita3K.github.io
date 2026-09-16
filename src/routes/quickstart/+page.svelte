<script lang="ts">
    import AccordionItem from "$lib/components/AccordionItem.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import { onMount } from "svelte";
    import { asset } from "$app/paths";
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

    // Initial value is just a placeholder just in case the request fails, it will be updated on the onMount function
    let urlObtained = $state(false);

    let sysdataURL = $state("");

    onMount(async () => {
        const f = await fetch(
            "https://api.allorigins.win/get?url=http://fus01.psp2.update.playstation.net/update/psp2/list/us/psp2-updatelist.xml",
        );

        if (!f.ok) {
            console.error("Failed to fetch the system data URL");
            return;
        }

        const response = await f.json();

        let parser = new DOMParser();

        const xmldoc = parser.parseFromString(response.contents, "text/xml");

        sysdataURL =
            xmldoc.getElementsByTagName("recovery")[0].childNodes[1]
                .childNodes[0].nodeValue ?? "";

        urlObtained = sysdataURL !== ""; // If the URL is not empty, then we obtained it successfully
    });
</script>

<svelte:head>
    <title>Vita3K - {m.nav_quickstart()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_quickstart()}" />
    <CompositeMeta key="description" content={m.quickstart_meta_description()} />
</svelte:head>

<section class="page-route page-route--intro-only text-center text-white">
    <div class="container">
        <PageHeader
            title={m.quickstart_quickstart()}
            description={m.quickstart_get_started()}
        />
    </div>
</section>
<section class="bg-dark text-white pb-5">
    <div class="container">
        <div>
            <h1 class="text-center">{m.quickstart_hardware_requirements()}</h1>
            <div class="my-5">
                <h5>
                    {m.quickstart_hardware_requirements_desc()}
                </h5>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-6 d-flex flex-column">
                    <h4 class="my-4">
                        <b>{m.quickstart_minimum_requirements()}</b>
                    </h4>
                    <div class="row no-gutters reqs">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/opengl.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>
                                {m.quickstart_gpu_that_supports_opengl_version({
                                    version: "4.4",
                                })}
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters reqs my-3">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/cpu.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>{m.quickstart_any_x86_64_cpu()}</p>
                        </div>
                    </div>
                    <div class="row no-gutters reqs">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/ram.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>
                                {m.quickstart_minimum_of_Xgb_of_ram({
                                    amount: "4",
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 d-flex flex-column">
                    <h4 class="my-4">
                        <b>{m.quickstart_recommended_requirements()}</b>
                    </h4>
                    <div class="row no-gutters reqs">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/vulkan.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>{m.quickstart_gpu_that_supports_vulkan()}</p>
                        </div>
                    </div>
                    <div class="row no-gutters reqs mt-3">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/gpu.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>
                                {m.quickstart_gpu_that_supports_shader_interlock()}
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters reqs my-3">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/cpu.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>{m.quickstart_x86_64_cpu_with_avx()}</p>
                        </div>
                    </div>
                    <div class="row no-gutters reqs">
                        <div
                            class="col-2 col-sm-1 col-lg-1 mx-2"
                            style="background: url({asset(
                                '/img/icons/ram.svg',
                            )}) no-repeat center"
                        ></div>
                        <div class="col-9 col-sm-10 col-lg-10">
                            <p>
                                {m.quickstart_recommended_Xgb_of_ram({
                                    amount: "8",
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="mt-5 pt-5">
                <h1 class="text-center">
                    {m.quickstart_software_requirements()}
                </h1>
                <div class="mt-5">
                    <h4><b>{m.quickstart_microsoft_redistributable()}</b></h4>
                    <p>
                        {@html sanitize(m.quickstart_microsoft_redistributable_desc({
                            link: "https://aka.ms/vs/17/release/vc_redist.x64.exe",
                        }))}
                    </p>
                    <h4><b>{m.quickstart_operating_system()}</b></h4>
                    <p>
                        {m.quickstart_operating_system_desc()}
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="bg-dark text-white">
    <div class="container">
        <h1 class="text-center mb-5">
            {m.quickstart_installing_the_firmware()}
        </h1>
        <div>
            <p>
                {m.quickstart_firmware_desc()}
            </p>
            <p>
                <b>
                    {@html sanitize(m.quickstart_firmware_download({
                        link: "https://www.playstation.com/en-us/support/hardware/psvita/system-software/",
                    }))}
                </b>
            </p>
            <p>
                {m.quickstart_font_firmware_desc()}
                {#if urlObtained}
                    {@html sanitize(m.quickstart_you_can_download_it_here({
                        link: sysdataURL,
                    }))}
                {:else}
                    {@html sanitize(m.quickstart_could_not_get_url())}
                {/if}
            </p>
            <p>
                {@html sanitize(m.quickstart_install_both_firmware_packages())}
            </p>
        </div>
        <div class="mt-5">
            <h4><b>{m.quickstart_managing_modules()}</b></h4>
            <p>
                {@html sanitize(m.quickstart_managing_modules_desc())}
            </p>
        </div>
    </div>
</section>
<section class="bg-dark text-white pt-5">
    <div class="container">
        <h1 class="text-center mb-5">{m.quickstart_dumping_games()}</h1>
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
        <div class="my-5">
            <h3>{m.quickstart_dumping_how_to()}</h3>
            <p class="my-3">
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
                            {@html sanitize(m.quickstart_vci_using({ link: GC_TOOL_KIT }))}
                        </h5>
                        <p class="my-3">
                            {@html sanitize(m.quickstart_vci_desc())}
                        </p>
                        <ol>
                            <li>
                                {@html sanitize(m.quickstart_vci_step_install({
                                    link: GC_TOOL_KIT,
                                }))}
                            </li>
                            <li>{m.quickstart_vci_step_insert()}</li>
                            <li>{@html sanitize(m.quickstart_vci_step_backup())}</li>
                            <li>{@html sanitize(m.quickstart_vci_step_wait())}</li>
                            <li>{@html sanitize(m.quickstart_vci_step_transfer())}</li>
                            <li>{@html sanitize(m.quickstart_vci_step_archive())}</li>
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
                            {@html sanitize(m.quickstart_fagdec_using({
                                vitashell: VITASHELL,
                                fagdec: FAGDEC,
                            }))}
                        </h5>

                        <ol>
                            <li>
                                {@html sanitize(m.quickstart_fagdec_step_download({
                                    vitashell: VITASHELL,
                                    fagdec: FAGDEC,
                                }))}
                            </li>
                            <li>
                                <ol type="A">
                                    <li>
                                        {m.quickstart_fagdec_step_cartridge()}
                                    </li>
                                    <p>
                                        {@html sanitize(m.quickstart_fagdec_step_cartridge_desc())}
                                    </p>
                                    <li>{m.quickstart_fagdec_step_digital()}</li>
                                    <p>
                                        {@html sanitize(m.quickstart_fagdec_step_digital_desc())}
                                    </p>
                                </ol>
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_fagdec_step_open_decrypted())}
                            </li>
                            <li>{m.quickstart_fagdec_step_copy()}</li>
                            <p class="my-2">
                                {m.quickstart_fagdec_note_selfs()}
                            </p>
                            <li>{m.quickstart_fagdec_step_launch()}</li>
                            <li>
                                {@html sanitize(m.quickstart_fagdec_step_decrypt_all())}
                            </li>
                            <li>{@html sanitize(m.quickstart_fagdec_step_start())}</li>
                            <li>
                                {@html sanitize(m.quickstart_fagdec_step_start_decrypt())}
                            </li>
                            <li>{m.quickstart_fagdec_step_wait()}</li>
                            <li>{@html sanitize(m.quickstart_fagdec_step_output())}</li>
                            <p class="my-3">
                                {m.quickstart_fagdec_note_merge()}
                            </p>
                            <p>
                                {@html sanitize(m.quickstart_fagdec_note_title_id())}
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
                                {@html sanitize(m.quickstart_vpk_step_download({
                                    link: VITA_ORGANIZER,
                                }))}
                            </li>
                            <li>{@html sanitize(m.quickstart_vpk_step_create())}</li>
                            <li>{@html sanitize(m.quickstart_vpk_step_select())}</li>
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
                            {@html sanitize(m.quickstart_nonpdrm_using({
                                vitashell: VITASHELL,
                                nonpdrm: NONPDRM,
                            }))}
                        </h5>
                        <ol>
                            <li>
                                {@html sanitize(m.quickstart_nonpdrm_step_download({
                                    link: VITASHELL,
                                }))}
                            </li>
                            <li>
                                <p>
                                    {@html sanitize(m.quickstart_nonpdrm_step_plugin({
                                        link: NONPDRM,
                                    }))}
                                </p>
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_nonpdrm_step_license())}
                            </li>
                            <li>
                                {@html sanitize(m.quickstart_nonpdrm_step_transfer())}
                            </li>
                            <li>{@html sanitize(m.quickstart_nonpdrm_step_zip())}</li>
                            <li>{@html sanitize(m.quickstart_nonpdrm_step_install())}</li>
                            <div class="my-2">{m.quickstart_nonpdrm_dlc()}</div>
                            <li>
                                {@html sanitize(m.quickstart_nonpdrm_dlc_step_copy())}
                            </li>
                            <li>{@html sanitize(m.quickstart_nonpdrm_dlc_step_zip())}</li>
                            <li>
                                {@html sanitize(m.quickstart_nonpdrm_dlc_step_install())}
                            </li>
                        </ol>
                    </div>
                </div>
            </AccordionItem>
        </div>
    </div>
</section>
