<script lang="ts">
    let { id, title, initiallyOpen, children } = $props();

    let open = $state(initiallyOpen);

    const toggle = () => (open = !open);
</script>

<div class="accordion-item">
    <div role="tab" id="{id}Header">
        <button
            type="button"
            class="accordion-link"
            class:collapsed={!open}
            aria-expanded={open}
            aria-controls={id}
            onclick={toggle}
        >
            {title}
            <i class="icon ion-md-add-circle"></i>
            <i class="icon ion-md-remove-circle"></i>
        </button>
    </div>

    <div
        class="collapse"
        class:show={open}
        {id}
        role="tabpanel"
        aria-labelledby="{id}Header"
        data-parent="#accordion"
    >
        {@render children()}
    </div>
</div>
