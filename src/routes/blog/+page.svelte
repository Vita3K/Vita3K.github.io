<script lang="ts">
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import { m } from "$lib/paraglide/messages.js";

    const { data } = $props();
    const posts = data.posts;
</script>

<svelte:head>
    <title>Vita3K - {m.nav_blog()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_blog()}" />
    <CompositeMeta
        key="description"
        content="Vita3K blog - {posts.length} posts"
    />
</svelte:head>

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
                    <h5>
                        <font color="#777777">
                            {@html m.blog_written_by({
                                author: post.meta.author,
                            })}
                        </font>
                    </h5>
                    <!-- Show a truncated preview (excerpt) of the HTML content -->
                    <div class="blog-post-body mb-5">
                        {@html post.excerpt}
                    </div>
                    <div class="blog-post-author">
                        <a href={post.url} class="read-more"
                            >{m.blog_read_more()}</a
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
