<script lang="ts">
    import { onMount } from "svelte";
    import { m } from "$lib/paraglide/messages.js";

    const { data } = $props();
    const posts = data.posts;

    onMount(() => {
        console.log(posts);
    });
</script>

<!-- <section id="blog-header" class="text-white">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mx-auto text-center">
                <h3>Blog</h3>
            </div>
        </div>
    </div>
</section> -->

<section class="blog-body bg-dark text-white">
    <div class="container" id="blog-container">
        {#each posts as post (post.slug)}
            <div class="row blog-post">
                <div class="col-lg-12 mx-auto text-center">
                    <h2 class="blog-post-title section-heading">
                        <a href={post.url}>
                            {post.meta.title}
                        </a>
                    </h2>
                    <!-- Show a truncated preview (excerpt) of the HTML content -->
                    <div class="blog-post-body mb-5">
                        {@html post.excerpt}
                    </div>
                    <div class="blog-post-author">
                        <a href={post.url} class="read-more">{m.read_more()}</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
