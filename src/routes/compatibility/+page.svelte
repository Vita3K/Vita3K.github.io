<script lang="ts">
    import { onMount } from "svelte";
    import { m } from "$lib/paraglide/messages.js";

    type FIELDS =
        | "Nothing"
        | "Bootable"
        | "Intro"
        | "Menu"
        | "Ingame -"
        | "Ingame +"
        | "Playable"
        | "Unknown";

    type ORDER_FIELDS = "titleId" | "name" | "status";
    type ORDER_TYPE = "asc" | "desc";

    let views = $state({
        Nothing: [],
        Bootable: [],
        Intro: [],
        Menu: [],
        "Ingame -": [],
        "Ingame +": [],
        Playable: [],
        Unknown: [],
    });

    type CompatibilityEntry = {
        name: string;
        titleId: string;
        status: FIELDS;
        color: string;
        issueId: number;
        translatedStatus?: string;
    };

    let data: CompatibilityEntry[] = $state([]);
    let currentField: ORDER_FIELDS = $state("name");
    let currentOrder: ORDER_TYPE = $state("desc");
    let searchQuery: string = $state("");

    function timeAgo(date: Date) {
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return interval + " years ago";

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return interval + " months ago";

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + " days ago";

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + " hours ago";

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval + " minutes ago";

        return "just now";
    }

    function changeView(field: FIELDS) {
        data = views[field];
        orderBy(currentField, false);
    }

    // Angular filter
    function filterEntries(entry: CompatibilityEntry) {
        if (searchQuery == undefined || searchQuery == "") return true;
        return (
            entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.titleId.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    function orderBy(v: ORDER_FIELDS, switchOrder = true) {
        const statusOrder = [
            "Nothing",
            "Bootable",
            "Intro",
            "Menu",
            "Ingame -",
            "Ingame +",
            "Playable",
            "Unknown",
        ];

        const reversedStatusOrder = [
            "Playable",
            "Ingame +",
            "Ingame -",
            "Menu",
            "Intro",
            "Bootable",
            "Nothing",
            "Unknown",
        ];

        let order: ORDER_TYPE = currentOrder;
        let field: ORDER_FIELDS = v;

        if (switchOrder) {
            if (currentField !== v) {
                currentOrder = "asc";
            } else {
                order = currentOrder === "asc" ? "desc" : "asc";
            }
        }

        switch (field) {
            case "titleId": {
                if (order === "asc") {
                    data = data.sort((a, b) =>
                        a.titleId.localeCompare(b.titleId),
                    );
                } else {
                    data = data.sort((b, a) =>
                        a.titleId.localeCompare(b.titleId),
                    );
                }
                break;
            }
            case "name": {
                if (order === "asc") {
                    data = data.sort((a, b) => a.name.localeCompare(b.name));
                } else {
                    data = data.sort((b, a) => a.name.localeCompare(b.name));
                }
                break;
            }
            case "status": {
                if (order === "asc") {
                    data = data.sort(
                        (a, b) =>
                            statusOrder.indexOf(a.status) -
                            statusOrder.indexOf(b.status),
                    );
                } else {
                    data = data.sort(
                        (b, a) =>
                            reversedStatusOrder.indexOf(a.status) -
                            reversedStatusOrder.indexOf(b.status),
                    );
                }
                break;
            }
        }
        currentField = field;
        currentOrder = order;
    }

    onMount(async () => {
        document.title = m.compatibility_list();

        const res = await fetch("https://vita3k-api.pedro.moe/list/commercial");

        if (!res.ok) {
            console.error("Failed to fetch compatibility data");
            return;
        }

        const res_data = await res.json();
        const updatedAt = new Date(res_data.date * 1000);
        const updatedAtStr = updatedAt.toLocaleString();
        const timeAgoStr = timeAgo(updatedAt);

        const lastUpdatedAtElem = document.getElementById("lastUpdatedAt");
        const timeAgoElem = document.getElementById("timeAgo");

        if (lastUpdatedAtElem) lastUpdatedAtElem.textContent = updatedAtStr;
        if (timeAgoElem) timeAgoElem.textContent = timeAgoStr;

        views["Unknown"] = res_data.list;
        data = views["Unknown"];
        orderBy("name");

        data.forEach((e) => {
            // Unknown already has all games, no need to add it twice
            if (e.status != "Unknown") {
                switch (e.status) {
                    case "Nothing":
                        e.translatedStatus = m.nothing();
                        break;
                    case "Bootable":
                        e.translatedStatus = m.bootable();
                        break;
                    case "Intro":
                        e.translatedStatus = m.intro();
                        break;
                    case "Menu":
                        e.translatedStatus = m.menu();
                        break;
                    case "Ingame -":
                        e.translatedStatus = m.ingame_minus();
                        break;
                    case "Ingame +":
                        e.translatedStatus = m.ingame_plus();
                        break;
                    case "Playable":
                        e.translatedStatus = m.playable();
                        break;
                }
                views[e.status].push(e);
            }
        });
    });
</script>

<section class="text-white" id="compatibility">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mx-auto text-center">
                <h2 class="section-heading">{m.compatibility_list()}</h2>
                <hr class="my-4" />
                {m.emulator_undergoing_changes()}
                <br /><br />
                <p class="mb-5">
                    <input
                        style="display:inline-block;vertical-align:middle;"
                        type="text"
                        class="form-control"
                        placeholder="{m.search()}..."
                        required={true}
                        bind:value={searchQuery}
                    />
                    <br />
                    <br />{m.tags()}:
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Nothing")}
                        style="background-color: #e02020"
                        >{m.nothing()} ({views["Nothing"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Bootable")}
                        style="background-color: #7030b0"
                        >{m.bootable()} ({views["Bootable"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Intro")}
                        style="background-color: #c71585"
                        >{m.intro()} ({views["Intro"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Menu")}
                        style="background-color: #1e64dc"
                        >{m.menu()} ({views["Menu"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Ingame -")}
                        style="background-color: #e08a1e"
                        >{m.ingame_minus()} ({views["Ingame -"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Ingame +")}
                        style="background-color: #fbca04"
                        >{m.ingame_plus()} ({views["Ingame +"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Playable")}
                        style="background-color: #0e8a16"
                        >{m.playable()} ({views["Playable"].length})</a
                    >
                    <a
                        href="#"
                        class="plate"
                        onclick={() => changeView("Unknown")}
                        style="background-color: #3030ff"
                        >{m.all()} ({views["Unknown"].length})</a
                    >
                </p>
                <center>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#ff2020"
                                            >{m.nothing()} ({(
                                                (views["Nothing"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.nothing_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-nothing"
                                            style="width:{(views['Nothing']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#a060ff"
                                            >{m.bootable()} ({(
                                                (views["Bootable"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.bootable_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-bootable"
                                            style="width:{(views['Bootable']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#e632aa"
                                            >{m.intro()} ({(
                                                (views["Intro"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.intro_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-intro"
                                            style="width:{(views['Intro']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#50a0fa"
                                            >{m.menu()} ({(
                                                (views["Menu"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.menu_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-menu"
                                            style="width:{(views['Menu']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#f0a000"
                                            >{m.ingame_minus()} ({(
                                                (views["Ingame -"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.ingame_minus_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-ingame-"
                                            style="width:{(views['Ingame -']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#ffd250"
                                            >{m.ingame_plus()} ({(
                                                (views["Ingame +"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.ingame_plus_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-ingame"
                                            style="width:{(views['Ingame +']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <small
                                        ><font color="#28AA28"
                                            >{m.playable()} ({(
                                                (views["Playable"].length /
                                                    views["Unknown"].length) *
                                                100
                                            ).toFixed(2)}%):</font
                                        >
                                        <font color="#ffffff"
                                            >{m.playable_desc()}</font
                                        ></small
                                    >
                                </td>
                                <td width="25%">
                                    <div class="progress">
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated bg-playable"
                                            style="width:{(views['Playable']
                                                .length /
                                                views['Unknown'].length) *
                                                100}%"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p>
                        Last Updated at: <span id="lastUpdatedAt"></span>
                        (<span id="timeAgo"></span>)
                    </p>
                    <br />
                    <table class="table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <td
                                    ><a
                                        href="#"
                                        onclick={() => orderBy("titleId")}
                                        style="color:yellow"
                                    >
                                        <small id="titleIdHead"
                                            >Title ID {currentField ===
                                            "titleId"
                                                ? currentOrder === "asc"
                                                    ? "↓"
                                                    : "↑"
                                                : ""}</small
                                        ></a
                                    ></td
                                >
                                <td
                                    ><a
                                        href="#"
                                        onclick={() => orderBy("name")}
                                        style="color:yellow"
                                        ><small id="nameHead"
                                            >{m.entry_name()}
                                            {currentField === "name"
                                                ? currentOrder === "asc"
                                                    ? "↓"
                                                    : "↑"
                                                : ""}</small
                                        ></a
                                    ></td
                                >
                                <td
                                    ><a
                                        href="#"
                                        onclick={() => orderBy("status")}
                                        style="color:yellow"
                                        ><small id="statusHead"
                                            >{m.status()}
                                            {currentField === "status"
                                                ? currentOrder === "asc"
                                                    ? "↓"
                                                    : "↑"
                                                : ""}</small
                                        ></a
                                    ></td
                                >
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.filter( (entry) => filterEntries(entry), ) as entry (entry.titleId)}
                                <tr>
                                    <td align="left">
                                        <b><small>{entry.titleId}</small></b>
                                    </td>
                                    <td align="left">
                                        <a
                                            href="https://github.com/Vita3K/compatibility/issues/{entry.issueId}"
                                        >
                                            <small>{entry.name}</small>
                                        </a>
                                    </td>
                                    <!-- In Svelte, we use the style attribute for dynamic colors -->
                                    <td
                                        style="background-color: #{entry.color}"
                                    >
                                        <span style="color: white">
                                            <small
                                                >{entry.translatedStatus}</small
                                            >
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    </div>
</section>
